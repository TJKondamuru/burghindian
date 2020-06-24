import React, {Component, useState, useEffect} from "react";
import Head from 'next/head';
import {serverAPI} from '../../Components/serverapi';
import Layout from '../../Components/layout';
import Slider from "react-slick";

function Gallery({values}) {
    return (
      <div className="container">
        <Head>
          <title>Burgh Indian - Photo Gallaries</title>
          <link rel="icon" href="/favicon.png" />
          <meta name="description" content="photo gallary of pittsburgh desi events, email burghindianit@gmail.com if you have collection of photos we can use. " />
          <meta name="og:description" content="photo gallary of pittsburgh desi events, email burghindianit@gmail.com if you have collection of photos we can use." />
        </Head>
        <Layout>
            <GalleryPage values={values} />
        </Layout>
      </div>
    )
}

function GalleryPage({values})
{
  const [modaldisplay, setModalDisplay] = useState(-1);
  useEffect(()=>{

    if(modaldisplay > -1)
      document.body.classList.add("body--popup--open");
    else
      document.body.classList.remove("body--popup--open");
  }, [modaldisplay])
  return(
    <div className="main_content">
      <section className="gallery_section post_page  padding">
        <div className="container">
          <h1 className="text-center h3">Gallery</h1>
          <div className="card-columns">
            {values.map((item, index) => 
              <div className="card" key={index} onClick={e=>setModalDisplay(index)}>
                  <div className="same_img"><img className="card-img-top" src={item.images[0].link} alt={item.name} /></div>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.desc}</p>
                  </div>
              </div>
            )}
          </div>
        </div>
      </section>
      {modaldisplay > -1 && <div className="gallery_modal modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <button type="button" className="close_btn" onClick={e=>setModalDisplay(-1)}><img src="/images/modal_close.png" alt="" className="img-fluid" /></button>
            <div className="modal-body">
                <SyncSliders images={values[modaldisplay].images} />
            </div>
          </div>
        </div>        
       </div>} 
    </div>
  )
}

class SyncSliders extends Component {
    constructor(props) {
      super(props);
      this.state = {nav1: null,nav2: null};
      this.images = props.images;
    }
    componentDidMount(){
      this.setState({nav1: this.slider1, nav2: this.slider2});
    }
  
    render(){
      return(
        <>
          <Slider  arrows={true} infinite={false} drabble={false} asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)}>
            {
              this.images.map((item, index)=>  <div key={index} className="card shadow"><a href={item.link} target="_blank" rel="noopener noreferrer"><img src={item.link} className="img-fluid" alt=""  /></a></div>)
            }
          </Slider>
          <Slider slidesToShow={4} swipeToSlide={true} focusOnSelect={true} asNavFor={this.state.nav1} arrows={true} infinite={false} drabble={false} ref={slider => (this.slider2 = slider)}>
            {
              this.images.map((item, index)=>  <div  key={index}><img src={item.thumb} className="img-fluid" alt="" style={{width:"100%"}} /></div>)
            }
          </Slider>
        </>
      )
    }
  }

  export async function getStaticProps(context) {
    const values = await serverAPI.gallery();
    return {
      props: {values}, // will be passed to the page component as props
    }
  }
  export default Gallery;

