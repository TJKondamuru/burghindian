import React, { useState, useEffect } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Head from 'next/head';
import {serverAPI} from '../../Components/serverapi';
import Layout from '../../Components/layout';
import {TopHeading} from '../../Components/topHeading';
import {stateToHTML} from 'draft-js-export-html';

const Comments = dynamic(()=>import('../../Components/comments').then(mod=>mod.default), {ssr:false})

//const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false })
/*import Comments from '../Components/Comments'*/


function Articles({attrs, all, wygHTML, articleId, state, dispatch}){
    return (
        <div className="container">
            <Head>
                <title>Burgh Indian - {attrs.heading}</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Layout>
                <ArticlesPage attrs={attrs} all={all} wygHTML={wygHTML} articleId={articleId} comments={state['comments']} dispatch={dispatch} />
            </Layout>
        </div>
    )
}

function ArticlesPage({attrs, all, wygHTML, articleId, comments, dispatch}) {
    //const [wygState, setwygState] = useState(EditorState.createWithContent(convertFromRaw(wygStateObj)));
    const [commentCount, setCommentCount] = useState(0);
    const editorStateChg = newstate => {
        setwygState(newstate);
    }
    return (
        <section className="main_content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12"><TopHeading heading={attrs.heading} visits={attrs.visits} comments={commentCount} /></div>
                    <div className="col-lg-12">
                        <div className="card rdw-editor-wrapper">
                            <div className="card-body wysiwyg editor-images rdw-editor-main">
                                <div className="DraftEditor-root">
                                    <div className="DraftEditor-editorContainer">
                                        <div className="public-DraftEditor-content" style={{outline: 'none', whiteSpace:'pre-wrap', overflowWrap:'break-word'}}>
                                            <div dangerouslySetInnerHTML={{__html:wygHTML}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                        /*<Editor editorState={wygState} wrapperClassName="card" editorClassName="card-body wysiwyg editor-images" readOnly={true} toolbarHidden={false}
                        onEditorStateChange={editorStateChg} />*/
                        }
                    </div>
                    <div className="col-lg-12">
                        <div className="row recent_bottom_detail m-1">
                            <div className="col-lg-12"><h5>Latest Articles</h5></div> 
                            {all.map((item, index) => {
                            return (
                                <div className="col-lg-6"  key={index}>
                                    <div className="article_text">
                                        <span className="no">{index + 1}</span>
                                        <div className="article_right_text">
                                            <Link href={"/articles/" + item.articleId}><a className="h5">{item.heading}</a></Link>
                                            <p>{item.liner}</p>
                                        </div>
                                    </div>
                                </div>
                            );})}
                        </div>
                    </div>
                    <div className="col-lg-12"><Comments comments={comments} dispatch={dispatch} postid={articleId} setCommentCount={setCommentCount} /></div>
                </div>
            </div>
        </section>
    )
}

export async function getStaticPaths(){
    const homepage = await serverAPI.home();
    const paths = homepage['home-page-articles'].map(item => ({
        params: { articleId: item.entry.postid},
      }))
    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    
    const homepage = await serverAPI.home();
    const all = homepage['home-page-articles'].map(item=>({articleId:item.entry.postid, heading:item.entry.heading, liner:item.entry.liner}));
    const response = await serverAPI.showArticle(params.articleId);
    //const wygStateObj = JSON.parse(response.article.article);
    const wygHTML = stateToHTML(convertFromRaw(JSON.parse(response.article.article)));
    const attrs = {visits:response.visits, heading:response.article.heading};
    return {
        props: {attrs, all, wygHTML, articleId : params.articleId}, // will be passed to the page component as props
      }

}

export default Articles;