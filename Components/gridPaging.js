import React from "react";

export const splitPages = (items, isSelected)=>{
    const pagsesize = 20;
    let paggeditems = [];
    const taggedArray = items.filter(x=>isSelected(x));
    for (let i=0, j=taggedArray.length; i< j; i+=pagsesize) 
        paggeditems.push(taggedArray.slice(i, i + pagsesize));
    return paggeditems;
}

function GridPaging(props){
    const {currentPage, setCurrentPage, pagecount} = props;
    return (
        <ul className="pagination top-left-pagination">
        {[...Array(pagecount)].map((x,index)=>
            <li key={index} className={currentPage === index ? 'active' : 'none' } onClick={e=>setCurrentPage(index)}>
                <span>{index + 1}</span>
            </li>)}
        </ul>
    )

}
export default GridPaging;