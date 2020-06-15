const axios = require('axios').default;

const axiosObject = async (url, asObject)=>{
    const dataObj = await axios.get(url);
    return asObject ? dataObj.data : Object.values(dataObj.data);
}

export const serverAPI = {
    home :  async ()=>  {
                            const dataObj = await axios.get('https://us-central1-burghindian.cloudfunctions.net/applicationHome');
                            return dataObj.data;
                        },
    events : ()=>axiosObject(`https://us-central1-burghindian.cloudfunctions.net/allEvents`),
    aboutPlaces : ()=>  axiosObject(`https://us-central1-burghindian.cloudfunctions.net/aboutPlaces`),
    gallery : ()=>  axiosObject(`https://us-central1-burghindian.cloudfunctions.net/allGallery`),
    coupons: ()=>  axiosObject(`https://us-central1-burghindian.cloudfunctions.net/allCoupons`),
    accommodations: ()=> axiosObject(`https://us-central1-burghindian.cloudfunctions.net/allAccommodations`),
    showArticle : articleId => axiosObject(`https://us-central1-burghindian.cloudfunctions.net/showArticle?articleid=${articleId}`, true), 
    allPosts : ()=> axiosObject(`https://us-central1-burghindian.cloudfunctions.net/allPosts?addpostsandhome=true`, true),
    showPost : postid=>axiosObject(`https://us-central1-burghindian.cloudfunctions.net/showPost?postid=${postid}`, true),
    onlyPosts : ()=>axiosObject(`https://us-central1-burghindian.cloudfunctions.net/allPosts`, true),
}

