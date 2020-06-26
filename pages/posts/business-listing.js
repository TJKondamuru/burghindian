import Head from 'next/head';
import Layout from '../../Components/layout';
function Listings(props){
    return (
        <div className="container">
          <Head>
            <title>Burgh Indian - Business Listings</title>
            <meta name="description" content="Directory of Indian business in Pittsburgh. Business owners email us at burghindianit@gmail.com to add your business to our listing. Its free."></meta>
            <meta property="og:description" content="Directory of Indian business in Pittsburgh. Business owners email us at burghindianit@gmail.com to add your business to our listing. Its free." />
            <link rel="icon" href="/favicon.png" />
          </Head>
          <Layout>
              <div className="row">
                <div className="col-lg-12">
                    <div className="main_content">
                        <section className="event_section post_page padding">
                            <div className="container">
                                <h1 className="text-center h3">Local Biz Listings</h1>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item flex-column align-items-start mb-2">
                                        <p className="mb-1">This page is under construction, we are compiling list of Indian business in Pittsburgh.</p>
                                    </li>
                                    <li className="list-group-item flex-column align-items-start mb-2">
                                        <p className="mb-1">Do you know about a shop, business or are you independent professional? 
                                            Please email details about you company to <a href="mailto:burghindianit@gmail.com" className="venuename">burghindianit@gmail.com</a>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </section>
                    </div>
                </div>
              </div>
          </Layout>
        </div>
      )
}
export default Listings;