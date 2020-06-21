import React from "react";
import Head from 'next/head';
import {serverAPI} from '../../Components/serverapi';
import Layout from '../../Components/layout';

function AboutPlaces({values}) {
    return (
      <div className="container">
        <Head>
          <title>Burgh Indian - Places to Visit</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Layout>
            <AboutPlacesPage values={values} />
        </Layout>
      </div>
    )
  }

  function AboutPlacesPage({values}){
    return(
      <div className="main_content">
        <section className="aboutplaces_section padding">
          <div className="container">
            <h1 className="text-center h3 category_title">
                <span>About Places</span>
                {/*<span className="clear float-right" style={{fontSize:"medium"}}>10 new added.</span>*/}
            </h1>
            <div className="card-columns">
              {values.map((item, index) => 
                <div className="card" key={index}>
                  <div className="same_img"><img className="card-img-top" src={item.thumb} alt={item.heading} /></div>
                  <div className="card-body">
                    <h5 className="card-title">{item.heading}</h5>
                    <p className="card-text">{item.liner}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
  export async function getStaticProps(context) {
    const values = await serverAPI.aboutPlaces();
    return {
      props: {values}, // will be passed to the page component as props
    }
  }
  export default AboutPlaces;