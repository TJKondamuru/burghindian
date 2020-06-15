const axios = require('axios').default;

const asyncArray =  (url, storeaary, dispatch, type, mapper)=>new Promise(async (resolve, reject) =>{
    if(!storeaary || storeaary.length  === 0){
        const dataObj = await axios.get(url);
        const applymap = obj => (mapper ? mapper(obj) : obj);
        
        let values = applymap(dataObj.data);
        dispatch({type:type, [type]:values});
        
        resolve(values);
    }
    else
        resolve(storeaary);
})

const cmtMap = objMap=>Object.values(Object.keys(objMap).map(key=>({...objMap[key], 'comment-key':key})));
const defMap = objMap => Object.values(objMap);
const objMap = objMap => objMap;

export const clientAPI = {
    comments : (dispatch, storearray)=> asyncArray('https://us-central1-burghindian.cloudfunctions.net/allComments', storearray, dispatch, 'comments', cmtMap),
    createComment : (newcomment, dispatch)=>{
        return new Promise(async (resolve, reject)=>{
            await axios.post('https://us-central1-burghindian.cloudfunctions.net/createComment', newcomment);
            resolve(asyncArray(`https://us-central1-burghindian.cloudfunctions.net/allComments`, [], dispatch,'comments',cmtMap))
        });
    },
    showUserPosts : login => axios.get(`https://us-central1-burghindian.cloudfunctions.net/showUserPosts?owner=${login}`),
    deleteUserPost : ownerobject =>  axios.post('https://us-central1-burghindian.cloudfunctions.net/deletePost', ownerobject),
    uploadImages : (filesObj)=>{
        return new Promise(async (result, reject)=>{
            try{
                const response = await fetch('https://us-central1-burghindian.cloudfunctions.net/upLoadFiles', filesObj);
                const data = await response.json();
                result(data);
            }catch(ex){
                reject(ex)
            }
        });
    },
    createPost : postobj=>{
        return new Promise(async (result, reject)=>{
            try{
                const postjson = await axios.post('https://us-central1-burghindian.cloudfunctions.net/createPost', postobj);
                result(postjson);
            }catch(ex){
                reject(ex)
            }
        });
    },
    showPost : (postid, visitedPosts, setVisitedPosts)=>
        new Promise(async (resolve, reject)=>{
            if(visitedPosts[postid])
                resolve(visitedPosts[postid]);
            else{
                const dataObj = await axios.get(`https://us-central1-burghindian.cloudfunctions.net/showPost?postid=${postid}`);
                setVisitedPosts({...visitedPosts, [postid]:dataObj.data});
                resolve(dataObj.data);
            }
        })
        //async
}