import React, {useState}  from "react";
import GridFilter, {flatmap} from '../../Components/gridFilter';
import Head from 'next/head';
import Layout from '../../Components/layout';
import {serverAPI} from '../../Components/serverapi';

function Coupons({state, dispatch, values, filterObj}) {
    return (
      <div className="container">
        <Head>
          <title>Burgh Indian - Coupons</title>
          <link rel="icon" href="/favicon.png" />
          <meta property="og:description" content="Desi shops and restaurants coupons, email burghindianit@gmail.com if you have any awesome coupon to share" />
          <meta name="description" content="Desi shops and restaurants coupons, email burghindianit@gmail.com if you have any awesome coupon to share"></meta>
        </Head>
        <Layout state={state} dispatch={dispatch}>
            <CouponsPage values={values} filterObj={filterObj} />
        </Layout>
      </div>
    )
}
function FootNotes(){
    return (
        <div className="category_list">
            <div className="category_list_title title_border_bg"><h5 className="h5 d-inline-block">Got an coupon to share?</h5></div>
            <div className="layer-filter m-2">
                <p className="title_border_bg">
                    Please <a href="/posts/add-post" target="_blank" className="venuename">post it on burghindian</a>, we will add it this page. Big THANK YOU. 
                </p>
                <p className="title_border_bg">
                    Or email us at <a href="mailto:burghindianit@gmail.com" className="venuename">burghindianit@gmail.com</a> we will post it here.
                </p>
                <p className="title_border_bg">
                    Or post it on our <a href="/articles/post-id-link-join-indian-community-telegram-group" target="_blank" className="venuename">Telegram group</a>, we will upload it to website.
                </p>
            </div>
        </div>
    )
} 

function CouponsPage({values, filterObj}){
    const [filter, setFilter] = useState(filterObj);
    const isSelected  = tags =>{
        if(Object.values(filter).filter(x=>x).length === 0)
            return true;
        let allTags = tags.split('#').map(x=>x.trim()).filter(x=>x && x.length > 0);
        return allTags.filter(x=>filter[x.toLowerCase()]).length > 0;
    }
    return (
        <div className="main_content">
            <section className="event_section post_page padding">
                <div className="container">
                    <h1 className="text-center h3">Coupons</h1>
                    <div className="row">
                        <div className="col-lg-2"><GridFilter filter={filter} setFilter={setFilter} footnotes={FootNotes} /></div>
                        <div className="col-lg-10">
                            <ul className="row">
                                {values.map((item, index)=> isSelected(item.tags) &&
                                    <li className="col-md-6 col-xl-3 mt-4" key={index}>
                                        <div className="card  d-table h-100 w-100">
                                            <div className="image_full_height position-relative">
                                                <div className="same_img">
                                                    <img className="card-img-top d-table m-auto position-absolute" src={item.thumb} alt={item.heading}/>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{item.heading}</h5>
                                                <span className="card-tags">{item.tags}</span>
                                                <p className="card-text">{item.liner}</p>
                                                <a href={item.readmore} className="btn orange_btn stretched-link" target="_blank" rel="noopener noreferrer"> Read More </a>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export const getStaticProps = async () => {
    const values = await serverAPI.coupons();
    let alltags = values.map(item=>item.tags ? item.tags.split('#') : []);
    const filterObj = flatmap(alltags);
    return {props:{values, filterObj}}
}
export default Coupons; 

