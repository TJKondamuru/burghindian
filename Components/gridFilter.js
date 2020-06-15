import React from "react";

export const flatmap = alltags =>{
    let tagobj = {};
    for(let i = 0; i < alltags.length; i++)
        for(let j = 0; j < alltags[i].length; j++)
            if(alltags[i][j]  && alltags[i][j].length > 0)
                tagobj[alltags[i][j].trim().toLowerCase()] = false;
    return tagobj;
}

function GridFilter(props){
    const {filter, setFilter} = props;
    return(
        <>
            {
                Object.values(filter).filter(x=>x).length > 0 && 
                <div className="category_list filter_by_section">        
                    <div className="category_list_title category_title">
                        <h5 className="h5 d-inline-block">Filter by</h5>
                        <span style={{cursor:"pointer"}} className="clear float-right" 
                            onClick={e=>{setFilter(Object.keys(filter).reduce((acc, c)=>{acc[c]=false; return acc}, {}))}}>
                            Clear All
                        </span>
                    </div>
                    <div className="layer-filter">
                        <ul>{
                            Object.keys(filter).filter(x=>filter[x]).map((x,index)=>
                                <li onClick={e=>setFilter({...filter, [x]:false})} key={index}>{x}</li>)
                        }</ul>
                    </div>
                </div>
            }
            <div className="category_list">
                <div className="category_list_title title_border_bg"><h5 className="h5 d-inline-block">Tags</h5></div>
                <div className="layer-filter">
                    <ul>
                        {Object.keys(filter).sort().map((x,index)=> <li onClick={e=>setFilter({...filter, [x]:true})} key={index} 
                        className={filter[x] ? 'active' : 'unactive'}>{x}</li>)}
                    </ul>
                </div>
            </div>
        </>
    );
}
export default GridFilter; 