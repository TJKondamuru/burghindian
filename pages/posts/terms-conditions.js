import React, { Component } from "react";
import Head from 'next/head';
import Layout from '../../Components/layout';
import { convertFromRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {serverAPI} from '../../Components/serverapi';
function TermsConditions({wygHTML}){
    return (
        <div className="container">
            <Head>
                <title>Burgh Indian - Terms and Conditions</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <TermsConditionsPage wygHTML={wygHTML} />
            </Layout>
        </div>
    )
}
function TermsConditionsPage({wygHTML}){
    return (
        <section className="main_content">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card rdw-editor-wrapper mb-5">
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
                    </div>
                </div>
            </div>
        </section>
    )
}
export async function getStaticProps() {
    const response = await serverAPI.showArticle('post-id-link-burgh-terms-conditions');
    const wygHTML = stateToHTML(convertFromRaw(JSON.parse(response.article.article)));
    return {
        props: {wygHTML}, // will be passed to the page component as props
      }
}

export default TermsConditions;