import React, {useReducer, useState} from "react";
import Head from 'next/head'

import Header from "./header";
import Footer from "./footer";

function Layout({ children, state, dispatch }) {
    const [loading, setLoading] = useState('');
    
    return (
        <div> 
            <Head>
                <meta property="og:site_name" content="BurghIndian.com - PittsburghIndian.org" />
                <meta property="og:title" content="BurghIndian.com - Home" />            
                <meta property="og:type" content="website" />
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
                <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            </Head>
            <Header  loading={loading} setLoading={setLoading} />
            {loading === '' && <div style={{minHeight:"800px"}}>{children}</div>}
            {loading.length > 0 && <div className="main_content" style={{minHeight:"800px"}}> 
                <section className="aboutplaces_section padding">
                    <div className="container"><h4>Loading {loading}, please wait ...</h4></div>
                </section>
            </div>}
            <Footer />
        </div>
    )
}
  
export default Layout;