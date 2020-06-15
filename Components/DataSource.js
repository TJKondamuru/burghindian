const axios = require('axios').default;

const MakeAPIObjAsync = (obj, key, dispatch, type, url)=> new Promise((resolve, reject)=>{
    if(Object.keys(obj).length === 0 || (key !== 'no-key' && !obj[key])){
        axios.get(url).then(res=> {
            if(dispatch)
                dispatch({type:type, [key]:res.data});
            resolve(res.data);
        });
    }
    else
        resolve(key === 'no-key' ? obj : obj[key]);
});
const MakeAPIAsync = (arr, dispatch, type, url, dataTransform) => new Promise((resolve, reject)=>{
    
    if(!arr || arr.length  === 0)
        axios.get(url).then(res=> {
            if(dispatch)
                dispatch({type:type, [type]:dataTransform ? dataTransform(res.data) : res.data});
            //array of object, always return array after transform function
            resolve(dataTransform ? dataTransform(res.data) : (res.data.length ?res.data : Object.values(res.data)));
        });
    else
        resolve(arr);
});

const cmtFilter = objMap=>Object.keys(objMap).map(key=>({...objMap[key], 'comment-key':key}));
export const BurghIndianAPI = {
    getAllAccom: (accoms, dispatch)=>MakeAPIAsync(accoms, dispatch, 'accoms', `https://us-central1-burghindian.cloudfunctions.net/allAccommodations`),
    getAllPosts : (posts, dispatch)=>MakeAPIAsync(posts, dispatch, 'posts', `https://us-central1-burghindian.cloudfunctions.net/allPosts`),
    getAllComments : (comments, dispatch) => MakeAPIAsync(comments, dispatch, 'comments', `https://us-central1-burghindian.cloudfunctions.net/allComments`, cmtFilter),
    getAllCoupons : (coupons, dispatch)=> MakeAPIAsync(coupons, dispatch, 'coupons', `https://us-central1-burghindian.cloudfunctions.net/allCoupons`),
    getAllEvents : (allevents, dispatch)=> MakeAPIAsync(allevents, dispatch, 'allevents', `https://us-central1-burghindian.cloudfunctions.net/allEvents`),
    getAllPlaces : (allplaces, dispatch)=> MakeAPIAsync(allplaces, dispatch, 'places', `https://us-central1-burghindian.cloudfunctions.net/aboutPlaces`),
    getAllGalleries : (allgallery, dispatch)=>MakeAPIAsync(allgallery, dispatch, 'gallery', `https://us-central1-burghindian.cloudfunctions.net/allGallery`),
    showPost : (postObj, postid, dispatch)=>MakeAPIObjAsync(postObj, postid, dispatch, 'show-post', `https://us-central1-burghindian.cloudfunctions.net/showPost?postid=${postid}`),
    showArticle:(articleObj, articleId, dispatch)=>MakeAPIObjAsync(articleObj, articleId, dispatch, 'show-article', 
                                                                `https://us-central1-burghindian.cloudfunctions.net/showArticle?articleid=${articleId}`),
    homePost : (homeObj, dispatch)=>MakeAPIObjAsync(homeObj, 'no-key', dispatch, 'home', 'https://us-central1-burghindian.cloudfunctions.net/applicationHome'),
    createComment : (newcomment, dispatch)=>{
        return new Promise(async (resolve, reject)=>{
            await axios.post('https://us-central1-burghindian.cloudfunctions.net/createComment', newcomment);
            resolve(MakeAPIAsync([], dispatch, 'comments', `https://us-central1-burghindian.cloudfunctions.net/allComments`, cmtFilter))
        });
    },
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
    createPost : (postobj, dispatch)=>{
        return new Promise(async (result, reject)=>{
            try{
                const postjson = await axios.post('https://us-central1-burghindian.cloudfunctions.net/createPost', postobj);
                await MakeAPIAsync([], dispatch, 'posts', `https://us-central1-burghindian.cloudfunctions.net/allPosts`)
                dispatch({type:'post-update', postid:postjson.data.postid});
                result(postjson);
            }catch(ex){
                reject(ex)
            }
        });
    },
    showUserPosts : login => axios.get(`https://us-central1-burghindian.cloudfunctions.net/showUserPosts?owner=${login}`),
    deleteUserPost : ownerobject =>  axios.post('https://us-central1-burghindian.cloudfunctions.net/deletePost', ownerobject)
}

export function Reducer(state, action){
    const attachToObject  = objName=>{
        let postid = Object.keys(action).filter(x=>x!=='type')[0];
        return {...state, [objName]: {...state[objName], [postid]:action[postid]}};
    }
    switch(action.type){
        case 'home':
            return {...state, home:action['no-key']};
        case 'posts' : 
            return {...state, posts:action.posts};
        case 'accoms':
            return {...state, accoms:Object.values(action.accoms)}
        case 'comments':
            return {...state, comments:action.comments};
        case 'show-article':
            return attachToObject('visitedArticles');
        case 'show-post' : 
            return attachToObject('visitedPosts');
        case 'coupons' :
            return {...state, coupons:Object.values(action.coupons)};
        case 'allevents':
            return {...state, allevents:Object.values(action.allevents)};
        case 'places':
            return {...state, places:Object.values(action.places)};
        case 'gallery':
            return {...state, gallery:Object.values(action.gallery)};
        case 'post-update':
            debugger;
            let {[action.postid]:_, ...newVisitedPosts} = state['visitedPosts'];
            return {...state, 'visitedPosts':newVisitedPosts};
        case 'secret-update':
            return {...state, 'secret':action.secret}

        default: return state;
    }
}
