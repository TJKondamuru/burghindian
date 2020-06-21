import React, { useState, useEffect } from "react";
import Head from 'next/head';
import Layout from '../../Components/layout';
import dynamic from 'next/dynamic';
const Profile = dynamic(()=> import('../../Components/profile').then(mod=>mod.default), {ssr:false})

export default function AddPost({dispatch, state}){
    
    return (
        <div className="container">
            <Head>
            <title>Burgh Indian - Add Post</title>
            <link rel="icon" href="/favicon.png" />
            </Head>
            <Layout state={state} dispatch={dispatch}>
                <div className="main_content">
                    <section className="event_section post_page padding">
                        <div className="container card shadow"><Profile dispatch={dispatch} secret={state['secret']} /></div>
                    </section>
                </div>
            </Layout>
        </div>
    )
}



