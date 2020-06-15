import React, {useState} from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'

function Header({loading, setLoading}) {
    let MODAL_OPEN_CLASS = "body--menu--open";
    /*if (this.state.addClass) {
        document.body.classList.add(MODAL_OPEN_CLASS);
    } else {
        document.body.classList.remove(MODAL_OPEN_CLASS);
    }*/
    const router = useRouter()
    
    const changeMenu = menuname=> {
        return router.pathname.toLowerCase().indexOf(menuname) > -1 ? 'active' : '';
    };
    return (
        <header className="header_section position-relative ">
            <div className="header_top">
                <div className="container container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mobile_view mobile_toggle d-none">
                                <button type="button" data-toggle="toggle" className="navbar_toggler">
                                    <svg className="menu_toggle" xmlns="http://www.w3.org/2000/svg" width="40" height="28" viewBox="0 0 46 28"><g><g><path id="menu" className="cls-1" fill="#000" d="M0 12.984h46v2.02H0zm0 12.981h46v2.06H0zM0 .006h46v1.96H0z"></path></g></g></svg>
                                    <svg className="menu_close" data-name="Layer 1" id="Layer_1" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                        <line className="cls-1" x1="1" x2="47" y1="47" y2="1" /><line className="cls-1" x1="1" x2="47" y1="1" y2="47" />
                                    </svg>
                                </button>

                                <div className="navigation shadow">
                                    <ul className="navbar-nav">
                                        <li className="nav-item home"><Link href="/"><a>Home</a></Link></li>
                                        <li className="nav-item"><Link href="/posts/events"><a>Events</a></Link></li>
                                        <li className="nav-item"><Link href="/Coupons"><a>Coupons</a></Link></li>
                                        <li className="nav-item"><Link href="/AdvertisewithUs"><a>Advertise</a></Link></li>
                                        <li className="nav-item"><Link href="/User-Posts"><a>Accommodations</a></Link></li>
                                        <li className="nav-item"><Link href="/posts/about-places"><a>About Places</a></Link></li>
                                        <li className="nav-item"><Link href="/posts/gallery"><a>Gallery</a></Link></li>
                                    </ul>
                                </div>

                            </div>
                            <a href={"/"} className="logo_img"><img src="/images/header_logo.png" className="img-fluid" alt="" /></a>
                            {/*<div className="mobile_view country_box d-none">
                                <div className="header_country">
                                    <div className="country_select">
                                        <img src={locationimage} className="img-fluid" alt="" />
                                        <select className="selectpicker" data-width="fit">
                                            <option data-content='usd'> Canada</option>
                                            <option data-content='usd'>India</option>
                                            <option data-content='usd'>Australia</option>
                                            <option data-content='usd'>Chaina</option>
                                            <option data-content='eur'>USA</option>
                                        </select>
                                    </div>
                                </div>
                            </div>*/}
                        </div>
                        {/*<div className="col-md-6 d-md-block d-none">
                            <div className="header_country">
                                <div className="country_select">
                                    <img src={locationimage} className="img-fluid" alt="" />
                                    <select className="selectpicker" data-width="fit">
                                        <option data-content='usd'> Canada</option>
                                        <option data-content='usd'>India</option>
                                        <option data-content='usd'>Australia</option>
                                        <option data-content='usd'>Chaina</option>
                                        <option data-content='eur'>USA</option>
                                    </select>
                                </div>
                            </div>
                        </div>*/}
                    </div>
                </div>
            </div>
            <div className="header_bottom card shadow" style={{marginBottom:"20px"}}>
                <div className="container container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <nav>
                                <ul className="navbar-nav">
                                    <li className="nav-item home">
                                        <Link href="/">
                                            <a className={router.pathname==='/'  ? 'active' : ''} onClick={e=>setLoading('Home')}>Home</a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <img src="/images/Calendar-icon.png" alt="events" className="mr-1" />
                                        <Link href="/posts/events">
                                            <a className={changeMenu('events')} onClick={e=>setLoading('Events')}><span>Events</span></a>
                                        </Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <img src="/images/offers-icon.png" alt="events"/>
                                        <Link href="/posts/coupons">
                                            <a className={changeMenu('coupons')} onClick={e=>setLoading('Coupons')}><span>Coupons</span></a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <img src="/images/Park-icon.png" alt="about places" className="mr-1"/>
                                        <Link href="/posts/about-places">
                                            <a className={changeMenu('about-places')} onClick={e=>setLoading('Places to visit')}><span>About Places</span></a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <img src="/images/folder-pictures-icon.png" alt="Gallery" className="mr-1"/>
                                        <Link href="/posts/gallery">
                                            <a className={changeMenu('gallery')} onClick={e=>setLoading('Gallery')}><span>Gallery</span></a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <img src="/images/userposts.png" alt="accommodations" className="mr-1"/>
                                        <Link href="/posts/user-posts">
                                            <a className={changeMenu('user-posts')} onClick={e=>setLoading('User Posts')}>
                                                <span><b>User Posts</b></span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <img src="/images/Election-Speaker-02-Outline-icon.png" alt="advertise with us" className="mr-1"/>
                                        <Link href="/posts/advertise-with-us">
                                            <a className={changeMenu('advertise-with-us')}><span>Advertise</span></a>
                                        </Link>
                                    </li>
                                    <li className="ml-5 btn btn-outline-info">
                                        <img src="/images/write-document-icon.png" alt="Gallery" className="mr-1"/>
                                        <Link href="/posts/add-post">
                                            <a><span>Post Ad</span></a>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div> 
            </div>
        </header>
        );
}

export default Header;
