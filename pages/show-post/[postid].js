import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../Components/layout';
import {serverAPI} from '../../Components/serverapi';
import {TopHeading} from '../../Components/topHeading';
import AllPosts from '../../Components/allPosts';
import { EditorState, convertFromRaw } from 'draft-js';
import dynamic from 'next/dynamic';
const Comments = dynamic(()=>import('../../Components/comments').then(mod=>mod.default), {ssr:false})
const Editor = dynamic(()=>import('react-draft-wysiwyg').then(mod=>mod.Editor), {ssr:false})

function ShowPost({postid, form, posttype, wygRaw, prop, allposts, state, dispatch}) {
    return (
      <div className="container">
        <Head>
          <title>Burgh Indian - {form.header}</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Layout>
            <ShowPostObj form={form} posttype={posttype} wygRaw={wygRaw} prop={prop} postid={postid} allposts={allposts}
             comments={state['comments']} dispatch={dispatch}/>
        </Layout>
      </div>
    )
}

function ShowPostObj({postid, form, posttype, wygRaw, prop, comments, allposts, dispatch}){
  const [modalimage, setModalImage] = useState('');
  const [commentCount, setCommentCount] = useState(0);
  const [wygState, setwygState] = useState(EditorState.createEmpty());
  useEffect(()=>{
    if(posttype === 'regular')
        setwygState(EditorState.createWithContent(convertFromRaw(wygRaw)));
  },[])
  useEffect(()=>{
      if(modalimage.length > 0)
        document.body.classList.add('body--popup--open');
      else
        document.body.classList.remove('body--popup--open');
    }, [modalimage]);
  return (
      <div className="main_content">
          <section className="event_section post_page padding">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-8">
                          {form.header && <>
                              <TopHeading heading={form.header} visits={form.visits} comments={commentCount} />
                              {posttype === 'regular' && 
                              <Editor editorState={wygState} readOnly={true} editorClassName="wysiwyg-editor editor-images shadow" 
                              onEditorStateChange={setwygState} toolbarHidden={true} />
                              }
                              {posttype !== 'regular' && <Accommodation prop={prop} />}
                              {Object.keys(form.files).length > 0 &&
                                  <div className="card-columns mt-2">
                                      {Object.keys(form.files).filter(x=>form.files[x].active)
                                      .map(x=><img src={form.files[x].link}  key={form.files[x].stamp} alt={form.files[x].name} className="img-thumbnail"  style={{cursor:"pointer"}}
                                              onDoubleClick={e=> setModalImage(form.files[x].link)} />)}
                                  </div>
                              }
                              <Comments comments={comments} dispatch={dispatch} postid={postid} setCommentCount={setCommentCount} />
                          </>}
                      </div>
                      <div className="col-lg-4">
                          <AllPosts posts={allposts} social={{}} />
                      </div>
                  </div>
              </div>
          </section>
          {modalimage.length > 0 && <div className="gallery_modal modal">
              <div className="modal-dialog">
              <div className="modal-content">
                  <button type="button" className="close_btn" onClick={e=>setModalImage('')}><img src='/images/modal_close.png' alt="" className="img-fluid" /></button>
                  <div className="modal-body modal-div"><img className="card-img-top" src={modalimage} alt={modalimage} /></div>
              </div>
              </div>        
          </div>}
      </div>
  )
}

function Accommodation(props){
  const {prop} = props;
  const spellcheck = x=>{
      if(x==='Accomidation Type')
          return 'Accommodation Type';
      else return x;
  }
  const accomtree={'Accomidation Type':['Share Room', 'Sub Lease', 'Independent Room'], 'Gender':['Male', 'Female', 'No preference'], 'Lease Type':['Long Term (6 - 12 months)','Short Term (1-6 months)','Paying Guest'],
  'House Type':['2 Bed - 2 Bath', '2 Bed - 1 Bath', '1 Bed - 1 Bath', 'Studio'],
  'Vegetarian':['Yes. Vegetarian', 'Non-veg is ok'], 'Smoking':['No Smoking', 'Smoking is Ok', 'outside only'],
  'Amenities' : ['Furnished', 'TV / Cable', 'Working Internet', 'Fitness Center'], 'Amenities2':['Swimming Pool', 'Car Park', 'Visitors Parking', 'Laundry Service']
  };
  return(
      
      <div className="comment_content card shadow">
          <div className="card-header" style={{whiteSpace:"pre-line"}}>{prop.Notes}</div>
          <div className="card-body">
              <table className="table table-striped table-hover">
                  <caption style={{captionSide:"top"}}><b>Utilities</b></caption>
                  <tbody>
                      {Object.keys(accomtree).map((x, index)=>
                        {
                            let selecText = accomtree[x].filter(opt=>!!prop[opt]).join(' ; ').trim();
                            return (selecText.length > 0 && <tr key={index}>
                              <td style={{width:"250px"}}><b>{spellcheck(x)}</b></td>
                              <td>{selecText}</td>
                            </tr>)
                        }
                      )}
                  </tbody>
              </table>
          </div>
      </div>
  )
}

export async function getServerSideProps({ params }) {
  let ary = params.postid.split('-');
  let postid = '';
  let wygRaw = {};
  let prop = {};

  if(ary[ary.length - 1] !== '0')
    postid = 'post-id-' + ary[ary.length - 1];

  if(postid.length === 0)
    return {props:{form: {}}}

  const form = await serverAPI.showPost(postid);
  let posttype = form.posttype ? form.posttype : 'regular';

  if(posttype === 'regular')
    wygRaw = JSON.parse(form.post);
  if(posttype === 'accom')
    prop = form.post;

  const allposts = await serverAPI.onlyPosts();
  return {props:{postid, form, posttype, wygRaw, prop, allposts}};
}

export default ShowPost;