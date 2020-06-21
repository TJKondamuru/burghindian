import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import {clientAPI} from "../Components/clientAPI";
import Link from 'next/link';
import {Editor} from 'react-draft-wysiwyg'

export default function Profile({secret, dispatch})
{
    const [form, setForm] = useState('new-post');
    const [myposts, setMyposts] = useState({login:secret, posts:[], replies:[], comments:[]});
    const [selected, setSelected] = useState('');
    const [loading, setLoading] = useState(false);
    const [visitedPosts, setVisitedPosts] = useState({});

    const setMypostsUpdateSecret = mynewposts=>{
        //debugger;
        if(mynewposts.login !== myposts.login)
            dispatch({type:'secret-update', secret:mynewposts.login})  
        
        setMyposts(mynewposts);

    }
    const myPostsSelected  = (postid)=>{
        setSelected(postid);
        setForm('new-post');
    };
    
    const buttonMgmt = <>
        {form==='new-post' && <div className="alert alert-success">
            <h4>Manage Posts</h4>
            <small>Edit/Delete your Posts. Check any private comments.</small>
            <p className="mt-3"><button className="btn btn-outline-info"  onClick={e=>setForm('home')}>Manage Posts</button></p>
        </div>}
        {form==='home' && <div className="alert alert-success">
            <h4>{selected.length === 0 ? 'Create Your Post': 'Update Your Post'}</h4>
            {selected.length === 0 && <Link href="/posts/terms-conditions"><a><small className="text-primary">By submitting your post, you agree to our terms and conditions</small></a></Link>}
            {selected.length !== 0 && <small>Update your post, add images (or) edit details.</small>}
            <p className="mt-3">
                <button className="btn btn-outline-info" onClick={e=>setForm('new-post')}>{selected.length === 0 ? 'Create Your Post': 'Update Your Post'}</button>            
            </p>
        </div>}
    </>
    return (
        
        <>
            {form==='new-post' &&<div className="m-3">
                <div className="float-left">
                    <h4>{selected.length === 0 ? 'Create Your Ad': 'Update Your Ad'} {loading && <img src="/images/loader.gif" alt="loading" className="mr-1"/>} </h4>
                </div>
            </div>}
            {form==='home' &&<div className="m-3">
                <div className="float-left"><h4>Manage Posts {loading && <img src="/images/loader.gif" alt="loading" className="mr-1"/>}</h4></div>
            </div>}
            {form === 'home' && <MyPosts myposts={myposts}  setMyposts={setMypostsUpdateSecret} setLoading={setLoading} setSelected={myPostsSelected} selected={selected} buttonMgmt={buttonMgmt} />}
            {form === 'new-post' && <NewPost selected={selected} setSelected={setSelected} setLoading={setLoading}  visitedPosts={visitedPosts} setVisitedPosts={setVisitedPosts} buttonMgmt={buttonMgmt}  />}
        </>
    )
}
function NewPost(props){
    let def={header:'', trigger:false, postid:'', post:{}, files:{}, posttype:'regular', password:''};
    const {selected, setSelected, setLoading, visitedPosts, setVisitedPosts, buttonMgmt} = props;
    const[form,setForm] = useState(def);
    const[spinner, setSpinner] = useState(false);
    const [wygState, setwygState] = useState(EditorState.createEmpty());
    const [prop, setProp] = useState({});
    const clearForm = ()=>{
        if(form.posttype === 'regular')
            setwygState(EditorState.createEmpty())
        else
            setProp({});
        setForm(def);
        setSelected('');
    }
    const editorStateChg = newstate=>{
        setwygState(newstate);
        setForm({...form, post:JSON.stringify(convertToRaw(wygState.getCurrentContent()))});
    }
    const setFormWithProp = (newprop)=>{
        setForm({...form, post:newprop});
        setProp(newprop);
    }
    const savepost=()=>{
        setForm({...form, trigger:true});
        if(form.header.length > 0){
            setSpinner(true);
            const uploadfiles = new Promise(async (resolve, reject)=>{
                const cloneFilesList = (linklist)=>{
                    let keys = Object.keys(form.files);
                    let linkKeys = Object.keys(linklist);
                    let cloneObj = {};
                    for(let i = 0; i < keys.length; i++){
                        if(form.files[keys[i]].status === 'New' && !form.files[keys[i]].active)
                            continue;
                        if(form.files[keys[i]].status === 'New' && form.files[keys[i]].active){
                            let matchlink = linkKeys.find(x=>x.indexOf(keys[i]) > -1);    
            
                            cloneObj[keys[i]] = {...form.files[keys[i]], status:'Upload', link:linklist[matchlink]};
                            delete cloneObj[keys[i]].blob;
                        }
                        else
                            cloneObj[keys[i]] = {...form.files[keys[i]]};
                    }
                    return cloneObj;
                }

                const formData = new FormData();
                let noempty = false;
                let aryKeys = Object.keys(form.files);
                for(let i = 0; i < aryKeys.length; i++){
                    if(form.files[aryKeys[i]].active && form.files[aryKeys[i]].status === 'New'){
                        formData.append(form.files[aryKeys[i]].name, form.files[aryKeys[i]].blob);
                        noempty = true;
                    }
                }
                if(noempty)
                {
                    clientAPI.uploadImages({body:formData, method:'POST'}).then(data=>{
                        
                        let newObj = cloneFilesList(data.uploadfiles);
                        resolve(newObj);
                    }).catch(err=>{
                        //debugger;
                        reject(err);
                    })
                }
                else
                    resolve({...form.files})
            });

            uploadfiles.then(allfiles=>{
                let data = {header:form.header,owner:form.password, post:form.post, posttype:form.posttype, files:allfiles};
                if(form.postid.length > 0)
                    data['postid'] = form.postid;
                
                setLoading(true);
                
                clientAPI.createPost(data).then(postjson=>{
                    let {[postjson.data.postid]:_, ...otherposts} = visitedPosts;
                    setVisitedPosts(otherposts);
                    setForm({...form, trigger:false, postid:postjson.data.postid, files:allfiles});
                    

                }).catch(reason=>console.log(reason)).finally(final=>{
                    setLoading(false);
                    setSpinner(false);
                });
            });
        }
    }
    useEffect(()=>{
        if(selected.length > 0){
            setLoading(true);
            clientAPI.showPost(selected, visitedPosts, setVisitedPosts).then(res=>{
                let posttype = res.posttype ? res.posttype : 'regular';
                setForm({...form, header:res.header, postid:selected, files:res.files, post:res.post, posttype});
                if(res.post && Object.keys(res.post).length > 0 && posttype === 'regular')
                    setwygState( EditorState.createWithContent(convertFromRaw(JSON.parse(res.post))));
                if(res.post && Object.keys(res.post).length > 0 && posttype === 'accom')
                    setProp(res.post);
                
                setLoading(false);
            });
        }
    },[]);

    return (
        <>
            <div className="row">
                <div className="col-lg-5 col-md-12  mb-3">
                    
                    <div className="input-group mb-3 mt-3">
                        <div className="input-group-prepend"><span className="input-group-text">Header</span></div>
                        <input type="text"  className={"form-control " + (form.header.length === 0 && form.trigger ? " is-invalid" : "")}
                        value={form.header} onChange={e=>setForm({...form, header:e.target.value})}
                        readOnly={!(!form.postid || form.postid.length === 0)}></input>
                    </div>

                    {(!form.postid || form.postid.length === 0) && <><div className="input-group mt-3">
                        <div className="input-group-prepend"><span className="input-group-text">Your Secret</span></div>
                        <input type="text"  className={"form-control " + (form.password.length === 0 && form.trigger ? " is-invalid" : "")}
                        value={form.password} onChange={e=>setForm({...form, password:e.target.value})}></input>
                        
                    </div><small className="text-info"><b>You will need secret to edit/delete your post</b></small></>}
                    <div className="input-group mt-3">
                        {!(form.posttype === 'regular' && form.postid.length > 0) && <div className="input-group-prepend h-50">
                            <span className="input-group-text">Is it for Accommodation</span>
                            <div className="input-group-text"><input type="checkbox" checked={form.posttype === 'accom'} 
                                disabled={!(!form.postid || form.postid.length === 0)}
                                onChange={e=>setForm({...form, posttype:e.target.checked ? 'accom' : 'regular'})} /></div>
                        </div>}
                    </div>
                </div>
                <div className="col-lg-5">{buttonMgmt}</div>
            </div>
            <div className="row">
                <div className="col-lg-11 col-md-12">
                    <Editor editorState={wygState} readOnly={false} editorClassName="wysiwyg-editor editor-images shadow" onEditorStateChange={editorStateChg} />
                    {form.posttype !== 'regular' && <Accommodation prop={prop} setProp={setFormWithProp} />}
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <ManageFiles files={form.files} setFiles={files=>setForm({...form, files})}/>
                    <div style={{textAlign:"left"}} className="m-3">
                        <button  onClick={e=>savepost()} className="btn-info btn-sm">
                        {spinner && <span className="spinner-border spinner-border-sm"></span>}{form.postid.length > 0 ? 'Update' : 'Create'}
                        </button>
                        <button  onClick={e=>clearForm()} className="btn-danger btn-sm ml-3">Clear</button>
                    </div>
                </div>
            </div>
        </>
    )
}
function ManageFiles(props){
    const {files, setFiles} = props;
    
    const SelecUploadFiles = list =>{
        let obj = {};
        for(let i = 0; i < list.length; i++)
            obj[list[i].name] = {name:list[i].name, link:'', blob:list[i], size:list[i].size, active:true, status:'New', stamp:Number(new Date())};
        setFiles({...files, ...obj});
    };
    const UplodFileChange = (key, nprops) =>{
        setFiles({...files, [key]:{...files[key], ...nprops}})
    }
    return (<div style={{textAlign:"left"}} className="mt-3 border rounded border-dark p-3">
        
        <div className="input-group mb-1">
            {/*<div className="input-group-prepend"><span className="input-group-text">upload files</span></div>*/}
            <input type="file" id="fileupload" onChange={e=>SelecUploadFiles(e.target.files)} multiple="multiple" />
        </div>
        <div className="mt-3">
            <table className="table table-sm table-striped table-bordered">
                <thead>
                    <tr className="table-active"><th style={{width:"50px"}}></th><th style={{width:"125px"}}>Status</th><th>Name</th></tr>
                </thead>
                <tbody>
                    {files && Object.keys(files).map(key=><tr key={key} style={{'opacity': files[key].active ? '1' :'.5' }}>
                        <td>
                            <input type="checkbox" style={{width:"25px", height:"25px"}} className="form-control" checked={files[key].active} onChange={e=>UplodFileChange(key, {active:e.target.checked})} ></input>
                        </td>
                        <td>{files[key].status}</td>
                        <td>
                            {files[key].link && <a href={files[key].link} target="_blank" rel="noopener noreferrer" style={{color:"#428bca"}}><b>{files[key].name}</b></a>}
                            {!files[key].link && <span>{files[key].name}</span>}
                        </td>
                    </tr>)}
                    {(Object.keys(files).length === 0) && <tr><td colSpan="3"><b>No Images Uploaded</b></td>
                        
                    </tr>}
                </tbody>
            </table>
        </div>
    </div>);
}
function Accommodation(props){
    const {prop, setProp} = props;
    const accomtree={'Notes':'', 'Accommodation Type':['Share Room', 'Sub Lease', 'Independent Room'], 'Gender':['Male', 'Female', 'No preference'], 'Lease Type':['Long Term (6 - 12 months)','Short Term (1-6 months)','Paying Guest'],
    'House Type':['2 Bed - 2 Bath', '2 Bed - 1 Bath', '1 Bed - 1 Bath', 'Studio'],
    'Vegetarian':['Yes. Vegetarian', 'Non-veg is ok'], 'Smoking':['No Smoking', 'Smoking is Ok', 'outside only'],
    'Amenities' : ['Furnished', 'TV / Cable', 'Working Internet', 'Fitness Center'], 'Amenities2':['Swimming Pool', 'Car Park', 'Visitors Parking', 'Laundry Service']
    };
    return(
        <>
            <div className="row">
                <div className="form-group col-lg-6">
                    <label htmlFor="notes">Notes</label>
                    <textarea className="form-control" id="notes" rows="3" value={prop.Notes ? prop.Notes : ''} onChange={e=>setProp({...prop, Notes:e.target.value})} ></textarea>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    {Object.keys(accomtree).filter(x=>x !== 'Notes').map((x, index)=>
                        
                        <ul className="list-group list-group-horizontal-sm mb-3" key={index}>
                            <li className="list-group-item"><div className="input-group-prepend"><span className="input-group-text"><b>{x}</b></span></div></li>
                            {accomtree[x].map(item=> <li className="list-group-item" key={item}>
                                <div className="input-group">
                                    <div className="input-group-prepend h-50">
                                        <label className="input-group-text" htmlFor={x+index+item}>{item}</label>
                                        <div className="input-group-text">
                                            <input type="checkbox" checked={!!prop[item]} onChange={e=>setProp({...prop, [item]:e.target.checked})}  name={x+index+item} id={x+index+item} />
                                        </div>
                                    </div>
                                </div>
                            </li>)}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );

}
function MyPosts(props)
{
    const {myposts, setSelected, selected, setMyposts, setLoading, buttonMgmt} = props;
    const [form, setForm] = useState({login:myposts.login, trigger:false})
    const[spinner, setSpinner] = useState(false);
    const clearPosts = ()=>{
        setMyposts({...myposts, posts:[], login:''});
        setForm({login:'', trigger:false});
    }
    //useEffect(()=>{if(form.login.trim().length > 0) refreshPosts();}, []);
    const refreshPosts = ()=>{
        //debugger;
        setForm({...form, trigger:true});
        if(form.login.trim().length > 0)
        {
            setLoading(true);
            setSpinner(true);
            
            clientAPI.showUserPosts(form.login).then(res=>{
                setSpinner(false);
                setLoading(false);
                setMyposts({...myposts, posts:res.data.posts, replies:res.data.replies, login:form.login});
            });
        };
    }

    const removePosts = ()=>{
        let postids = Object.keys(deletes).filter(x=>deletes[x]);
        //debugger;
        if(postids.length > 0)
        {
            setSpinner(true);
            setLoading(true);
            
            clientAPI.deleteUserPost({owner:form.login, postids}).then(res=>{
                setSpinner(false);
                setLoading(false);
                let postsLeft = myposts.posts.filter(post=>!deletes[post.postid]);
                setDeletes({});
                setSelected('');
                setMyposts({...myposts, posts:postsLeft});
            });
        }
        
    }
    const [deletes, setDeletes] = useState({});
    return (
        <>
        {myposts.login.length === 0 && <div className="row">
            <div className="col-lg-5 col-md-12 border border-dark rounded m-3 p-3">
                <div className="input-group mt-3">
                    <div className="input-group-prepend"><span className="input-group-text">Your Secret</span></div>
                    <input type="text"  className={"form-control " + (form.login.length === 0 && form.trigger ? " is-invalid" : "")}
                    value={form.header} onChange={e=>setForm({...form, login:e.target.value})}></input>
                </div>
                <small className="text-info">
                    If you forget your secret, please email us at <b>burghindianit@gmail.com</b>, try to include any part of secret you can remember.
                </small>
                
                <p><button  onClick={e=>refreshPosts()} className="btn-info btn-sm mt-3">
                    {spinner && <span className="spinner-border spinner-border-sm"></span>} Search
                </button>
                </p>
            </div>
            <div className="col-lg-5">{buttonMgmt}</div>
        </div>}
        {myposts.login.length > 0 && <div className="row">
            <div className="col-lg-5 col-md-12 border border-primary shadow  rounded m-3 p-3">
                <div className="input-group mb-3 mt-3">
                    <div className="input-group-prepend"><span className="input-group-text">Your Secret</span></div>
                    <input type="text"  className="form-control" defaultValue={myposts.login} readOnly={true}></input>
                </div>
                <button  onClick={e=>clearPosts()} className="btn-info btn-sm">Clear</button>
                <button  onClick={e=>refreshPosts()} className="btn-success btn-sm ml-2">Refresh</button>
            </div>
            <div className="col-lg-5">{buttonMgmt}</div>
        </div>}

        {myposts.posts.length > 0 && <div className="row">
            <div className="col-lg-8 col-md-12 m-3">
                <p><b>Double click on row to edit post</b></p>
                <table className="table table-sm table-striped mt-3 table-bordered">
                    <thead><tr className="table-active"><th></th><th>Header</th><th>visits</th></tr></thead>
                    <tbody>
                        {myposts.posts.map(mypost=>
                        <tr onDoubleClick={e=>{setSelected(mypost.postid)}} key={mypost.postid} className={selected === mypost.postid ? "bg-light" : ""}>
                            <td style={{minWidth:"50px"}}><input type="checkbox" className="form-control" checked={!!deletes[mypost.postid]}  style={{height:"25px"}}
                            onChange={e=>setDeletes({...deletes, [mypost.postid]:e.target.checked})}/>
                            </td><td>{mypost.header}</td><td>{mypost.visits}</td>
                        </tr>
                        )}    
                    </tbody>   
                </table>
                <div style={{textAlign:"left"}}>
                    <button  onClick={e=>removePosts()} className="btn-info btn-sm">
                        {spinner && <span className="spinner-border spinner-border-sm"></span>} Remove Posts
                    </button>
                </div> 
            </div>
        </div>}
        {myposts.replies.length > 0 && <div className="row">
            <div className="col-lg-8 col-md-12" style={{top:"-40px"}}>
            <div className="comment_content col-lg-4">
                <div className="mt-5">
                    <h4>Private Comments</h4>
                    {myposts.replies.map(each =>
                         <blockquote key={each.when}>
                         <span>{each.text}</span>
                         <footer className="blockquote-footer">{each.by} @ {each.when}</footer>
                     </blockquote>
                    )}   
                </div>
            </div>  
            </div>
        </div>}
        </>
    )
}