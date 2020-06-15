const { DateTime } = require("luxon");
export function EventSort(res){
    
    const mkdt = dtstr=>{
        //item["tags-obj"]["from"]
        const dt = DateTime.fromFormat(dtstr, 'MM/dd/yyyy');
        if(dt.isValid)
            return dt;
        else
            return DateTime.local();
    }

    return res.sort((item1, item2)=>{
        //debugger;
        
        let dt1 = mkdt(item1["tags-obj"]["from"]);
        let dt2 = mkdt(item2["tags-obj"]["from"]);
       
        return dt2.diff(dt1).toObject().milliseconds;
    });

}

export function SingleEvent(props){
    const {item, setModalImage} = props;
    const unitprice = unitcos=>{
        if((unitcos + '').trim().length === 0)
            return 'NA';
        if(unitcos.toLowerCase() === 'free')
            return 'Free';
        if(isNaN(unitcos))
            return unitcos;
        else    
            return '$' + unitcos;
    }
    const displayPrice = cost =>{
        if((cost + '').trim().length === 0)
            return 'Not available';
        return cost.split('-').reduce((acc, item) =>acc.length === 0 ? unitprice(item) : acc + ' - ' + unitprice(item), '');    
        
        
    }
    return (
        <div className="card  d-table h-100 w-100">
            <div className="card_top_text">
                <Datemarker dt={item["tags-obj"]["from"]} />
                <Datemarker dt={item["tags-obj"]["to"]} />
                <div className="vene_time">
                    <span className="venuename">{item["tags-obj"]["where"]}</span>
                    {/*<span className="times"><i className="fa fa-clock-o"></i>8:30 PM to 1:30 AM</span>*/}
                </div>
            </div>
            <div className="card_image_block position-relative">
                <div className="same_img"><img className="card-img-top d-table m-auto" src={item.thumb} alt={item.heading} /></div>
                <div className="overlay-bottom clearfix"></div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{item.heading}</h5>
                <p className="card-text">{item.liner}</p>
                <div className="price_text">
                    <span  style={{cursor:"pointer"}} ><b><a href={item.readmore} target="_blank" rel="noopener noreferrer">Download</a></b></span>
                    {<span><strong>{displayPrice(item["tags-obj"]["price"])}</strong></span>}
                </div>
                {/*<a href={item.readmore} className="btn orange_btn stretched-link" target="_blank" rel="noopener noreferrer">
                    {" "}Read More{" "}
                </a>*/}
                <button style={{cursor:"pointer"}} className="btn orange_btn_small" onClick={e=>setModalImage(item.readmore)}>{" "}Read More{" "}</button>
                
            </div>
        </div>
    );
}
function Datemarker(props){
    //debugger;
    const dt = DateTime.fromFormat(props.dt, 'MM/dd/yyyy');
    
    if(!dt.isValid)
        return <></>;
    else
        return <div className="caldr"><span className="day">{dt.day}</span><span className="month">{dt.monthShort}</span></div>

}