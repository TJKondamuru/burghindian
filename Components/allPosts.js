import React, { useState} from "react";
import GridPaging, {splitPages} from './gridPaging';
import SocialGrps from './socialGrps';
import Link from 'next/link';
const { DateTime } = require("luxon");

export default function AllPosts({posts, social}){
    //const {posts, dispatch, home, show1PageAlways} = {...props};

    const displayposts = splitPages(posts.sort((a, b)=>b.stamp-a.stamp), item=>true)
    const [currentPage, setCurrentPage] = useState(0);
    
    const MakeUrl = (owner, header) =>{
        let ary = owner.split('-');
        let lastbar = ary[ary.length - 1];
        if(isNaN(lastbar) || owner.toLowerCase().indexOf('post-id-link') > -1)
            return '/articles/' +  owner;
        return '/show-post/' + header.replace(/\W/g, '-') + '-' + lastbar;
        
    }
    const postdt = num =>{
        const dt = DateTime.fromMillis(num);
        return dt.isValid ? dt.day + '-' + dt.monthShort + '-' + dt.year : '';
    }
    
    return (
        <>
            {/*<div className="main_content">
                <section className="event_section post_page padding">
                    <div className="container"><h1 className="text-center h3">All Posts</h1></div>
                </section>
            </div>*/}
            
            <div className="row">
                <div className="col-lg-12 clear float-right mb-3">
                    <GridPaging currentPage={currentPage} setCurrentPage={setCurrentPage} pagecount={displayposts.length} />
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12 mt-2">
                    <ul className="list-group list-group-flush">
                        {displayposts[currentPage] && displayposts[currentPage].map((item, index)=>
                        <li className="list-group-item list-group-item-action flex-column align-items-start mb-2" key={index}>
                            {/*<div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{item.header}</h5>
                                <small class="text-muted">{item.stamp}</small>
                            </div>*/}
                            <p className="mb-1">
                                <b><Link href={MakeUrl(item.owner, item.header)}><a style={{color:"#428bca"}}>{item.header}</a></Link></b>
                            </p>
                            <small className="text-muted"><b>Posted on {postdt(item.stamp)} » Visits {item.visits}</b></small>
                        </li>
                        )}
                        {Object.keys(social).length > 0 && 
                        <li className="list-group-item list-group-item-action flex-column align-items-start mb-2 p-3 h6" style={{backgroundColor:"#e9ecef"}}>
                            <p className="mb-1"><b>Sorry!</b> not many posts yet. You can check below active groups to find more posts by Pittsburgh Indians.</p>
                        </li>}
                    </ul>
                    {Object.keys(social).length > 0 && <SocialGrps social={social} smallversion={true} />}
                </div>
            </div>
        </>
    );
}