
import React, { useState, useEffect} from "react";
import Head from 'next/head'
import Layout from '../Components/layout'
import {serverAPI} from '../Components/serverapi';
import {EventSort, SingleEvent} from '../Components/eventsObj'
import SocialGrps from "../Components/socialGrps"
import Link from 'next/link'
import Slider from "react-slick";

export default function Home({homepage, state, dispatch}) {
  return (
    <div className="container">
      <Head>
        <title>Burgh Indian - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout state={state} dispatch={dispatch}>
          <HomePage homepage={homepage} />
      </Layout>
    </div>
  )
}

function HomePage({homepage}){
  
  return (
    <div className="main_content" style={{overflow:"hidden"}}>
      <section className="home_banner">
        <div className="home_banner_slider">
          <Slider  arrows={true} infinite={false} drabble={false}>
            <div><div className="banner_img"><img src="/images/banner_image.jpg" alt="" /></div></div>
            <div className="banner_content">
              <h2 className="text-white h2">Burgh Indian</h2>
              <p className="text-white mx-auto ml-md-0">One stop desi informatica of all Businesses, Social groups and Events happening here in Pittsburgh.</p>
              <p className="text-white mx-auto ml-md-0">Join our Teams group for hundreds of items put on for sale. Post your need for free and reach wide community audience.</p>
              <p className="text-white mx-auto ml-md-0">Advertise with us and instantly gain unmatched brand recognition.</p>
              <a href='/posts/advertise-with-us' className="button text-white">Advertise with Us</a>
              <a href='/posts/add-post' className="button text-white">Post Ad</a>
            </div>
          </Slider>
        </div>
      </section>
      {homepage['home-page-events'] && <HomePageEvents Events={homepage['home-page-events']} />}
      {homepage['home-page-coupouns'] && <Coupons Coupouns={homepage['home-page-coupouns']} Articles={homepage['home-page-articles']} />}
      <section className="whatsapp_group_section position-relative">          
        <div className="text-white text-center whatsapp_group_content">              
          <h3 className="text-white text-center"> Indian Community Pittsburgh </h3>
          <p>Largest Indian Social Group in Pittsburgh</p>
          <ul>
            <li>*Over 1300 active members</li>
            <li>*Be first to know about all cultural events</li>
            <li>*Choose from hundreds for moving sale items</li>
            <li>*Find or Post your accomidation need</li>
            <li>*Meet the community</li>
          </ul>
          <Link href='/articles/post-id-link-join-indian-community-telegram-group'><a className="button text-white">Join Now</a></Link>
        </div>
       </section>
      {homepage['home-page-social'] && <WhatsappGroups Social={homepage['home-page-social']} />}
      <section>
          <div className="row m-0 h-100 d-inline-flex w-100 flex-row-reverse">
            <div className="col-md-6 p-0 simple_img d-inline-flex align-items-center">
              <img src="/images/home_learn_more.png" className="img-fluid" alt="" style={{width:"100%"}} />
            </div>
            <div className="col-md-6 simple_content p-0 d-inline-flex align-items-center">
              <div className="simple_text text-white">
                <h3>Roommates / Rentals / Sub leases</h3>
                {/* <h4>It is a long established fact that a reader will be distracted</h4> */}
                <p>
                  Named as one of the most livable cities in the world,
                  Pittsburgh is a place full of cultural diversity, with nice
                  ecosystem for Indians. If you’re looking for an accommodation?
                  Check posts from our Telegram group (or) Ads posted on this
                  website.
                </p>
                <Link href="/User-Posts"><a className="button white_btn bg-white">Check User Posts</a></Link>
              </div>
            </div>
          </div>
      </section>
      {homepage['home-page-movies'] && <Movies AllMovies={homepage['home-page-movies']} />}
      <section className="offer_section">
        <div className="row m-0">
          <Link href="/posts/advertise-with-us">
            <a className="col-xl-3 col-sm-6  offer_box first position-relative">
              <div className="offer_text text-white">
                <h3>Advertise with Us</h3>
                <p>Burgh Indian is best way to build your brand in Pittsburgh Desi community</p>
              </div>
              <img src="/images/offer_img1.png" className="img-fluid m-auto img-center" alt=""/>
            </a>
          </Link>
          <Link href="/posts/local-biz-services">
            <a className="col-xl-3 col-sm-6 offer_box second position-relative">
              <div className="offer_text text-white">
                <h3>Local Biz & Services</h3>
                <p>Directory listing of Businesses and Services</p>
              </div>
              <img src="/images/offer_img2.png" className="img-fluid" alt="" />
            </a>
          </Link>
          <Link href="/posts/about-places">
            <a className="col-xl-3 col-sm-6 offer_box third position-relative">
              <div className="offer_text text-white">
                <h3>City Guide</h3>
                <p>Our Guide of must-see places in Pittsburgh</p>
              </div>
              <img src="/images/offer_img3.png" className="img-fluid" alt="" />
            </a>
          </Link>
          <Link href="/posts/gallery">
            <a className="col-xl-3 col-sm-6 offer_box fourth position-relative">
              <div className="offer_text text-white">
                <h3>Galleries</h3>
                <p>Cultural events celebrated in Pittsburgh</p>
              </div>
              <img src="/images/offer_img4.png" className="img-fluid" alt="" />
            </a>
          </Link>
        </div>
      </section>
    </div>
  )
}
function Coupons(props){
  const {Coupouns, Articles} = props;
  return(
    <section className="article_section blog_section">
        <div className="container">
          <div className="article_content">
            <div className="left_content">
              <h4>Coupons</h4>
              <div className="article_text_block">
                {
                  Coupouns.slice(0, 3).map((item, index)=>
                    <div className="article_text" key={index}>
                      <div className="article_right_text">
                        <img src={item.entry.thumb} className="img-fluid" alt="" />
                        <h5>{item.entry.heading}</h5>
                        <p className="tooltip"><a href={item.entry.readmore} target="_blank" rel="noopener noreferrer">{item.entry.liner}</a></p>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="right_content">
              <div className="article_text_block">
                {Coupouns.slice(3).map((item, index)=>
                  <div className="article_text" key={index}>
                    <div className="article_right_text">
                      <img src={item.entry.thumb} className="img-fluid" alt={item.entry.heading}/>
                      <h5>{item.entry.heading}</h5>
                      <p className="tooltip"><a href={item.entry.readmore} target="_blank" rel="noopener noreferrer">{item.entry.liner}</a></p>
                    </div>
                  </div>
                )}
                <a href={"/Coupons"} className="button orange_btn">Show All</a>
              </div>
            </div>
            <div className="middle_content">
              <h4>Latest Articles</h4>
              <div className="row">
                {Articles.map((item, index) => {
                  return (
                    <div className=" col-md-6"  key={index}>
                      <div className="article_text">
                        <span className="no">{index + 1}</span>
                        <div className="article_right_text">
                          <Link href={"/articles/" + item.entry.postid}><a className="h5" target="_blank">{item.entry.heading}</a></Link>
                          <p>{item.entry.liner}</p>
                        </div>
                      </div>
                    </div>
                  );})}
              </div>
            </div>
          </div>
        </div>
      </section>
    );

}
function HomePageEvents(props){
  
  const [modalimage, setModalImage] = useState('');
  useEffect(()=>{
    if(modalimage.length > 0)
      document.body.classList.add("body--popup--open");
    else
      document.body.classList.remove("body--popup--open");
  }, [modalimage]);
  return (
    <>
      <section className="home_event_section">
          <div className="container">
            <h3 className="text-center">Latest Events</h3>
            <div className="blog_content">
              <div className="row">
                {
                  props.Events && EventSort(props.Events.map(x=>x.entry)).map((item, index)=>
                    <div className="col-md-6 col-xl-3" style={{marginBottom:"20px"}} key={index}>
                      <SingleEvent item={item} setModalImage={setModalImage}/>
                    </div>
                  )
                }
              </div>
              <div className="blog_btn1"><a href={"/Events"} className="button orange_btn">View All</a></div>
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
      </>
  )
}
function WhatsappGroups(props){
  const {Social} = props
  return (
    <section className="movie_section blog_section Whatsapp_section">
      <div className="container">
        <h3 className="text-center">Whatsapp Groups</h3>
        <div className="movie_content">
          <SocialGrps social={Social} />
        </div>
      </div>
    </section>
  )

}

function Movies(props){
  const {AllMovies} = props;
  return(
    <section className="movie_section blog_section">
      <div className="container">
        <h3 className="text-center">Today’s indian Movies</h3>
        <div className="movie_content">
          <div className="row">
            {AllMovies.map((item, index) => {
              return (
                <div className="col-lg-6 col-xl-4" key={index}>
                  <div className="movie_content_block d-table h-100 w-100">
                    <div className="movie_text">
                      <h4>{item.entry.heading}</h4>
                      <div className="row">
                        <div className="col-lg-3"><img src={item.entry.thumb} className="img-fluid" alt="" /></div>
                        <div className="col-lg-9">
                          <div className="address_text">
                            <div className="svg">
                              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 20">
                                <path id="Shape_1_copy" fill="#dd6c33" data-name="Shape 1 copy" className="cls-1"
                                  d="M7.5,0A7.383,7.383,0,0,0,0,7.243C0,12.2,6.712,19.476,7,19.783a0.692,0.692,0,0,0,1,0c0.286-.307,7-7.584,7-12.54A7.383,7.383,0,0,0,7.5,0Zm0,10.888A3.715,3.715,0,0,1,3.727,7.243,3.715,3.715,0,0,1,7.5,3.6a3.715,3.715,0,0,1,3.773,3.644A3.715,3.715,0,0,1,7.5,10.887Z"
                                ></path>
                              </svg>
                            </div>
                            <span>{item.entry.theater}</span>
                          </div>
                          <div className="text"><p>{item.entry.addr}</p></div>
                          <div className="clock_text">
                            <div className="svg">
                              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                                <path id="clock" fill="#dd6c33" className="cls-1"
                                  d="M7.5,0A7.5,7.5,0,1,0,15,7.5,7.5,7.5,0,0,0,7.5,0Zm3.242,8.926H7.563c-0.011,0-.021,0-0.031,0s-0.021,0-.031,0a0.519,0.519,0,0,1-.519-0.519v-5.3a0.519,0.519,0,1,1,1.037,0V7.889h2.724A0.519,0.519,0,1,1,10.742,8.926Z"
                                ></path>
                              </svg>
                            </div>
                            <div className="clock_title">
                              {item.entry.showtimes1.slice(0, 2).map((sitem, sindex) => <span key={sindex}>{sitem.split(" ").reverse().slice(2).reverse().join(" ")}</span>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>);
            })}
            {AllMovies.length === 0 && <h4>No shows at this time</h4>}
          </div>
        </div>
      </div>
    </section>
  )
}

export const getServerSideProps = async () => {
  const homepage = await serverAPI.home();
  return {props:{homepage}}
}
