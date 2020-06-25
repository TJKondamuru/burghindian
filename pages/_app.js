import React, {useReducer, useEffect} from "react";
import '../Styles/layout.css';
import '../Styles/layout-responsive.css';
import '../Styles/header.css';
import '../Styles/footer.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { DateTime } from 'luxon';
function Reducer(state, action){
  switch(action.type){
    case 'comments' : 
      return {...state, comments:action['comments']};
    case 'secret-update':
      return {...state, 'secret':action['secret']};
  }
  return state;
}
function App({ Component, pageProps }) {
    //const [state, dispatch] = useReducer(Reducer, {visitedArticles:{}, visitedPosts: {}, places:[], coupons:[], posts:[], 
    //    comments:[], accoms:[], allevents:[], gallery:[], home:{}, secret:''});
    //debugger;
    useEffect(()=>{
      if(window)
        console.log('in-app')
    },[]);
    const [state, dispatch] = useReducer(Reducer, {comments:[], secret:'', 'time':(new Date()).toString()});
    return <Component {...pageProps} state={state} dispatch={dispatch} />
}

export default App;