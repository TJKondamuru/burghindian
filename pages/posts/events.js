import React, { useState, useEffect } from "react";
import Head from 'next/head';
import Layout from '../../Components/layout';
import {serverAPI} from '../../Components/serverapi';
import {EventSort, SingleEvent} from '../../Components/eventsObj';
import GridFilter, {flatmap} from '../../Components/gridFilter';
import GridPaging, {splitPages} from '../../Components/gridPaging';

function Events(props) {
    
    const {events, filterObj, state, dispatch} = props;
    return (
      <div className="container">
        <Head>
          <title>Burgh Indian - Events</title>
          <meta name="description" content="Upcoming and current events, cultural events, kids events and any one time special deals posted by users in our telegram app"></meta>
          <meta property="og:description" content="Upcoming and current events, cultural events, kids events and any one time special deals posted by users in our telegram app." />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Layout state={state} dispatch={dispatch}>
            <EventsPage events={events} filterObj={filterObj} />
        </Layout>
      </div>
    )
}

function EventsPage({events, filterObj}){
    const [filter, setFilter] = useState(filterObj);
    const [displayevents, setDisplayEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [modalimage, setModalImage] = useState('');
    const isSelected  = item =>{
        let allTags = item['tags-obj']['others'];
        if(Object.values(filter).filter(x=>x).length === 0)
            return true;
        return allTags.filter(x=>filter[x.toLowerCase()]).length > 0;
    }
    
    useEffect(()=>{
        if(modalimage.length > 0)
          document.body.classList.add('body--popup--open');
        else
          document.body.classList.remove('body--popup--open');
      }, [modalimage]);

    useEffect(()=>{
        setDisplayEvents(splitPages(events, isSelected));
    },[filter])

    return(
        <div className="main_content">
            <section className="event_section post_page padding">
                <div className="container">
                    <h1 className="text-center h3">Events</h1>
                    <div className="row">
                        <div className="col-lg-2"><GridFilter filter={filter} setFilter={setFilter} footnotes={FootNotes}  /></div>
                        <div className="col-lg-10">
                            <div className="row">
                                <div className="col-lg-12 clear float-right">
                                    <GridPaging currentPage={currentPage} setCurrentPage={setCurrentPage} pagecount={displayevents.length} />
                                </div>
                            </div>
                            <ul className="row">{
                                displayevents[currentPage] && displayevents[currentPage].map((item,index)=> 
                                <li className="col-md-6 col-xl-3 mt-4" key={index}>
                                    <SingleEvent item={item} setModalImage={setModalImage}/>
                                </li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            
            {modalimage.length > 0 && <div className="gallery_modal modal">
                <div className="modal-dialog">
                <div className="modal-content">
                    <button type="button" className="close_btn" onClick={e=>setModalImage('')}><img src="/images/modal_close.png" alt="" className="img-fluid" /></button>
                    <div className="modal-body modal-div"><img className="card-img-top" src={modalimage} alt={modalimage} /></div>
                </div>
                </div>        
            </div>}
        </div>
    )

}

function FootNotes(){
    return (
        <div className="category_list">
            <div className="category_list_title title_border_bg"><h5 className="h5 d-inline-block">Got an event to share?</h5></div>
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
export const getStaticProps = async () => {
    
    const allevents = await serverAPI.events();
    let sortedSet = EventSort(allevents);
    let alltags = sortedSet.map(x=>x['tags-obj']['others']);
    let filterObj = flatmap(alltags);
    return {props:{events: sortedSet, filterObj}}
  }

  export default Events;