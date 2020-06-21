import React, { Component } from "react";
import Head from 'next/head';
import Layout from '../../Components/layout';
function AdvertisewithUs(props){
    return (
        <div className="container">
          <Head>
            <title>Burgh Indian - Advertise with Us</title>
            <link rel="icon" href="/favicon.png" />
          </Head>
          <Layout>
            <div className="main_content">
                <section className="blog_section padding">
                    <div className="container">
                        <h1 className="text-center h3">Advertise with Us</h1>
                        <div>
                          <h4 className="m-4"><img src="/images/disk.png" alt="sponsor" /> Contact Us</h4>
                          <ul id="ShowMore" name="ShowMore" className="list-group list-group-flush">
                            <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">
                              How can we help? Please write to us at <b>burghindianit@gmail.com</b>, we will try to get in contact with you as soon as possible.
                              For faster response, please be brief with your message and indicate your preference of communication. Let us know if you prefer email, call (or) text.
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="m-4"><img src="/images/disk.png" alt="sponsor" /> Adding free/regular posts in BurghIndian</h4>
                          <p className="list-group-item list-group-item-action flex-column align-items-start mb-2">All posts are free and active for 21 days.</p>
                          <ul id="ShowMore" name="ShowMore" className="list-group list-group-flush">
                              <li className="list-group-item list-group-item-action flex-column align-items-start mb-2"><b>Your name and email id will be kept private </b>and will not be displayed to external users. User will reply to your post using reply box.</li>
                              <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">All posts are <b>active for 21 days. </b> All posts are monitored by Admin. Posts with malicious content will be <b>deleted </b> without any notice.</li>
                              <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">Burgh Indian is a simple dashboard of posts, Security of your posts is maintained by email id and secret code.</li>
                              <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">You can edit/delete post with help of your secret code and email id. For ease of usage we do not employee any email verification</li>
                              <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">There is limit of 5 Active posts per user. This is to avoid spam.</li>
                              <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">You can add images to posts. Each image has an upload limit of 2 MB and each post can have 10 images. For larger images We will <b>resize images </b> to save bandwidth and space.</li>
                          </ul>
                        </div>
                        <div>
                        <h4 className="m-4"><img src="/images/disk.png" alt="sponsor" /> Adding your post to homepage carousel</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">If you have any event (or) Ad, We can have it on homepage carousel. Please contact us for right dimensions.</li>
                            <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">A small free will be charged for For Profit events</li>
                        </ul>
                        </div>
                        
                        <div>
                        <h4 className="m-4"><img src="/images/disk.png" alt="sponsor" /> Advertise on our Telegram Group</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">Our group in one of the largest social media Desi group in Pittsburgh. It is a vibrant group with more than 1400+ members.</li>
                            <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">Post on our Telegram group for instant brand recognition and to reach wide Indian audience. It is free if you join our group and post your ads.</li> 
                            <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">Check this link to learn about joining our Telegram group and our rules on spam</li>
                        </ul>
                        </div>
                        
                        <div>
                        <h4 className="m-4"><img src="/images/disk.png" alt="sponsor" /> Adding Sponsored and Featured ads</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">Contact us at <b>burghindian@gmail.com</b> to add your banner ads / thumbnail ads to the website.</li>
                            <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">All events from our sponsors will be posted on our Telegram group. After initial post we will also alert members on your upcoming events. We will not spam</li>
                            <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">Sponsors can have their events published on homepage carousel for free.</li>
                            <li className="list-group-item list-group-item-action flex-column align-items-start mb-2">Sponsors can have their sponsored content published on our home page</li>
                        </ul>
                        </div>
                    </div>
                </section>       
            </div>
          </Layout>
        </div>
      )
}

export async function getStaticProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    }
}
export default AdvertisewithUs;