import React, { useState, useEffect} from "react";
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../Components/layout';
import GridPaging, {splitPages} from '../../Components/gridPaging';
import {serverAPI} from '../../Components/serverapi';
import AllPosts from '../../Components/allPosts';

function UserPosts({accoms, userposts, social, state, dispatch}){
    return (
        <div className="container">
          <Head>
            <title>Burgh Indian - User - Posts</title>
            <link rel="icon" href="/favicon.png" />
          </Head>
          <Layout state={state} dispatch={dispatch}>
              <UserPostsObj accoms={accoms} userposts={userposts} social={social} />
          </Layout>
        </div>
    )
}
function UserPostsObj({accoms, userposts, social, state}){

  const displayaccoms = splitPages(accoms, item=>true);
  const [currentPage, setCurrentPage] = useState(0);
  

  return (
    <div>
      <div className="main_content">
        <section className="event_section post_page padding">
          <div className="container">
             <div className="row">
                <div className="col-lg-6">
                  <h4>Posts from Telegram</h4>
                  <div className="row mt-2">
                    <div className="col-lg-12 clear float-right mb-3">
                        <GridPaging currentPage={currentPage} setCurrentPage={setCurrentPage} pagecount={displayaccoms.length} />
                    </div>
                  </div>
                  <ul className="list-group list-group-flush">
                    {displayaccoms[currentPage] && displayaccoms[currentPage].map((item, index)=>
                      <li className="list-group-item list-group-item-action flex-column align-items-start mb-2" key={index}>
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">{item.user}</h5>
                          <small className="text-muted">{item.postedon}</small>
                        </div>
                        <p className="mb-1">{item.desc}</p>
                        <small className="text-muted">
                          <b>
                              <Link href="/articles/post-id-link-join-indian-community-telegram-group"><a style={{color:"rgb(66, 139, 202)"}} target="open">Read this notes to learn about contacting post owner</a></Link>
                          </b>
                        </small>
                      </li>
                    )}
                  </ul>
                </div>
                {<div className="col-lg-6">
                  <h4>User submitted Posts</h4>
                  <AllPosts posts={userposts} social={social} />
                </div>}
             </div>
          </div>
        </section>
      </div>
    </div>
  )  
}



export const getServerSideProps = async () => {
    const allposts = await serverAPI.allPosts();
    let unsortaccom = Object.values(allposts['accoms']);
    unsortaccom.sort((a,b)=>new Date(b.postedon) - new Date(a.postedon))

    return {props:{accoms:unsortaccom, userposts:Object.values(allposts['userposts']), social:Object.values(allposts['social'])}}
}

export default UserPosts;