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
        </Head>
        <Layout state={state} dispatch={dispatch}>
            <CouponsPage values={values} filterObj={filterObj} />
        </Layout>
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
                        <div className="col-lg-2"><GridFilter filter={filter} setFilter={setFilter} /></div>
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

