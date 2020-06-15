import React from 'react';
import Link from 'next/link'
class App extends React.Component {

   render() { 
      return ( 
         <footer className="footer_section  text-center text-sm-left">
         <div className="container">
             <div className="footer_top">
                 <div className="row">
                     <div className="col-lg-4 col-sm-6">
                         <Link href='/Home'><a><img src="/images/header_logo.png" className="img-fluid" alt=""/></a></Link>
                         <p>One stop desi informatica of all businesses, social groups and events happening in Pittsburgh</p>
                         {/*<ul className="social_icon">
                             <li className="d-inline-block"><a href="javascript:void(0);">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20">
                                     <path fill="#666" d="M10.585.002L7.947-.002c-2.964 0-4.88 1.932-4.88 4.923V7.19H.416A.411.411 0 0 0 0 7.597v3.289c0 .225.186.407.415.407h2.652v8.298c0 .225.186.408.415.408h3.461c.23 0 .415-.183.415-.408v-8.298h3.102c.229 0 .415-.182.415-.407V7.597a.403.403 0 0 0-.12-.287.417.417 0 0 0-.294-.12H7.358V5.266c0-.925.225-1.394 1.45-1.394h1.777A.411.411 0 0 0 11 3.462V.41a.412.412 0 0 0-.415-.408z"/>
                                     </svg>
                                     </a></li>
                             <li className="d-inline-block"><a href="javascript:void(0);">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="20" viewBox="0 0 25 20">
                                     <path fill="#666" d="M24.558 2.364c-.897.402-1.854.668-2.85.797a4.995 4.995 0 0 0 2.176-2.79 9.756 9.756 0 0 1-3.137 1.223 4.914 4.914 0 0 0-3.614-1.598c-2.74 0-4.944 2.268-4.944 5.048 0 .4.033.785.114 1.151C8.19 5.99 4.551 3.98 2.106.917a5.156 5.156 0 0 0-.677 2.55c0 1.75.882 3.298 2.197 4.194a4.811 4.811 0 0 1-2.235-.62v.054c0 2.453 1.715 4.49 3.964 4.959a4.839 4.839 0 0 1-1.298.166c-.316 0-.636-.019-.936-.086.64 1.998 2.46 3.467 4.623 3.516a9.828 9.828 0 0 1-6.135 2.151c-.405 0-.794-.018-1.184-.07a13.73 13.73 0 0 0 7.59 2.266c9.104 0 14.081-7.693 14.081-14.36 0-.223-.007-.44-.018-.651.982-.712 1.807-1.6 2.48-2.621z"/>
                                     </svg>
                                     </a></li>
                             <li className="d-inline-block"><a href="javascript:void(0);">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                     <path fill="#666" d="M19.994 5.516v8.961a5.524 5.524 0 0 1-5.515 5.52H5.525a5.523 5.523 0 0 1-5.515-5.52V5.516a5.524 5.524 0 0 1 5.515-5.52h8.954a5.524 5.524 0 0 1 5.515 5.52zm-1.773 8.961V5.516a3.747 3.747 0 0 0-3.742-3.744H5.525a3.747 3.747 0 0 0-3.742 3.744v8.961a3.747 3.747 0 0 0 3.742 3.745h8.954a3.747 3.747 0 0 0 3.742-3.745zm-3.07-4.48a5.157 5.157 0 0 1-5.149 5.153 5.157 5.157 0 0 1-5.15-5.153 5.158 5.158 0 0 1 5.15-5.154c2.84 0 5.15 2.313 5.15 5.154zm-1.773 0a3.382 3.382 0 0 0-3.376-3.38 3.382 3.382 0 0 0-3.376 3.38 3.382 3.382 0 0 0 3.376 3.379 3.382 3.382 0 0 0 3.376-3.38zm2.909-6.277c.242.242.38.577.38.92 0 .343-.138.678-.38.92a1.31 1.31 0 0 1-.92.38c-.342 0-.677-.138-.918-.38a1.311 1.311 0 0 1-.382-.92 1.304 1.304 0 0 1 1.3-1.302c.343 0 .679.14.92.382z"/>
                                     </svg>
                                     </a></li>    
                             <li className="d-inline-block"><a href="javascript:void(0);">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                     <path fill="#666" d="M.305 6.246h4.406v13.75H.305zm19.702 4.472v9.279h-4.404v-8.75c-1.405-3.457-4.735 1.25-4.735 1.25v7.5H6.462V6.246h4.406v2.63c.537-.733 2.166-2.63 4.735-2.63.3 0 .556.035.79.083.06.01.12.02.179.035.05.013.094.029.14.044a4.45 4.45 0 0 1 3.295 4.31zM2.46-.004c1.19 0 2.155.98 2.155 2.189 0 1.208-.965 2.187-2.155 2.187S.305 3.392.305 2.185c0-1.21.965-2.189 2.155-2.189z"/>
                                     </svg>
                                     </a></li>    
                        </ul>*/}
                     </div>
                     <div className="col-lg-4 col-sm-6">
                         <h6>Quick Links</h6>
                         <ul className="footer_nav">
                             <li><Link href='/'><a>Home</a></Link></li>
                             <li><Link href='/posts/events'><a>Events</a></Link></li>
                             <li><Link href='/posts/user-posts'><a>User Posts</a></Link></li>                                  
                         </ul>
                     </div>
                     <div className="col-lg-4 col-sm-6">
                         <h6>Need Help</h6>
                         <ul className="footer_nav">
                             <li><Link href='/posts/advertise-with-us'><a>Contact Us</a></Link></li>
                             <li><Link href='/posts/terms-conditions'><a>Terms & Conditions</a></Link></li>                                                                  
                         </ul>
                     </div>
                     {/*<div className="col-lg-3 col-sm-6">
                         <h6>Sign Up Our Newsletter</h6>                            
                         <form className="newsletter_form d-inline-block w-100">
                             <input type="email" id="email" name="email" className="border-0 d-inline-block " placeholder="Enter your email"/>
                             <input type="submit" value="" className="submit_button position-absolute border-0 "/>
                         </form>                            
                        </div>*/}
                 </div>
             </div>
             <div className="footer_bottom">
                 <div className="copyright_text text-center">
                     <p>© 2019 Burgh Indian All rights reserved.</p>
                 </div>
             </div>
         </div>
     </footer>  
       
      );
   }

}

export default App;
