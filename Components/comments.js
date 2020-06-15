import React, { useState, useEffect } from 'react';
import {clientAPI} from "./clientAPI";

function Comments(props){
    const {dispatch, comments, postid, setCommentCount} = props
    const [commentlist, setCommentList] = useState([]);
    const [comment, setComment] = useState({ postid: '', text: '', by: '', trigger:false, private:false })
    const [cspinner, setCSpinner] = useState(false);
    useEffect(()=>{
        debugger;
        clientAPI.comments(dispatch, comments).then(arycomments=>{
            setCommentList(arycomments);
        })
    }, [])
    const postComments = () => {
        const sort = (key1, key2)=> key1.length ===0 || key2.length ===0 ? 0 :  parseFloat(key1.split('-')[1].trim()) - parseFloat(key2.split('-')[1].trim());
        if (!postid || postid.length === 0) return [];
        let filtercmts = commentlist.filter(x => x['comment-key'].indexOf(postid) > -1).sort((key1, key2)=>sort(key2['comment-key'], key1['comment-key']));
        setCommentCount(filtercmts.length);
        
        return filtercmts;
    }
    const saveComment = () => {
        //debugger;
        
        setComment({...comment, trigger:true});
        if(comment.text.trim().length > 0 && comment.by.trim().length > 0)
        {
            setCSpinner(true);
            const newcomment = { postid: postid, comment: { text: comment.text, by: comment.by, when: (new Date()).toLocaleString() }, reply:comment.private ? 'Y' : 'N'};
            clientAPI.createComment(newcomment, dispatch).then(arycomments => {
                setComment({ ...comment, text: '', by: '', trigger:false, private:false});
                setCommentList(arycomments);
                setCSpinner(false);
            });
        }
    };
    return (
        <div className="recent_bottom_detail mt-4">
        <div className="row">
            <div className="col-lg-6">
                <h5>Leave a Comment</h5>
                <div className="form-group col-md-6">
                    <label><b>Name <span>*</span></b></label>
                    <input type="text" placeholder="Nick Name" className={"form-control " + (comment.by.length === 0 && comment.trigger ? " is-invalid" : "")} 
                    value={comment.by} onChange={e=>setComment({...comment, by:e.target.value})} />
                </div>
                <div className="form-group col-md-10">
                    <label><b>Comment</b><span>*</span></label>
                    <textarea className={"form-control " + (comment.text.length === 0 && comment.trigger ? " is-invalid" : "")} 
                    placeholder="Enter your comment..." rows="5" value={comment.text}  onChange={e=>setComment({...comment, text:e.target.value})}></textarea>
                </div>
                <div className="form-group form-check ml-3">
                    <input type="checkbox" className="form-check-input" id="private" checked={!!comment.private}  onChange={e=>setComment({...comment, private:e.target.checked})}/>
                    <label className="form-check-label" htmlFor="private"><b>Mark it private</b></label>
                    <small className="form-text text-muted">Mark it private, if you are including any contact details.</small>
                </div>
                <div className="col-md-12">
                    <div className="form-btn">
                        <button className="button orange_btn border-0" onClick={e=>saveComment()}>{cspinner && <span className="spinner-border spinner-border-sm"></span>}Submit</button>
                    </div>
                </div>
            </div>
            <div className="comment_content col-lg-4">
                <div className="mt-5">
                    {postComments().map(each =>
                         <blockquote key={each.when}>
                         <span>{each.text}</span>
                         <footer className="blockquote-footer">{each.by} @ {each.when}</footer>
                     </blockquote>
                    )}   
                </div>
            </div>   
        </div>
    </div>
    );
}
export default Comments;