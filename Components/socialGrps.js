import React from "react";
function SetupSocial(props){
    const {social} = props
    
    const smallVersion = ()=>{
        return (
            <div className="row">
                <div className="col-lg-12">
                    <ul className="list-group list-group-flush">
                    {social.sort((a,b)=>parseInt(a.entry.tags, 10)-parseInt(b.entry.tags, 10)).map((item, index) =>
                        <li className="list-group-item list-group-item-action flex-column align-items-start mb-2" key={index}>
                            <a href={item.entry.readmore} target="_blank" rel="noopener noreferrer" style={{color:"#428bca"}}>
                                <h5 className="card-title" style={{color:"#dd6c33"}}>{item.entry.heading}</h5>
                            </a> 
                            <p>{item.entry.liner}</p>
                        </li>    
                    )}
                    </ul>
                </div>
            </div>    
        );
    }
    const regularVersion = ()=> {
    return(
        <div className="row">
            {social.sort((a,b)=>parseInt(a.entry.tags, 10)-parseInt(b.entry.tags, 10)).map((item, index) =>
            <div className="col-lg-6 col-xl-4" key={index}>
                <div className="movie_content_block d-table h-100 w-100 card shadow">                      
                    <div className="movie_text">
                        <h4>
                            <div className="row"> 
                                <div className="col-3"><img src={item.entry.thumb} className="img-fluid" alt="" /></div>
                                <div className="col-9">
                                    {item.entry.heading}{/*<span className="part_text">200 Participants</span>*/}    
                                </div>
                            </div>
                        </h4>
                        <p>{item.entry.liner}</p>
                        {item.entry.readmore !== 'NA' && <a href={item.entry.readmore} className="blog_link" target="_blank" rel="noopener noreferrer">Read More</a>}                       
                    </div>
                </div>
            </div>)}
        </div>
    );}
    return(props.smallversion ? smallVersion() : regularVersion())
    
}

export default SetupSocial;