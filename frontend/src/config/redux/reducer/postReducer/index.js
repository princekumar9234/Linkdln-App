import { createSlice } from "@reduxjs/toolkit";
// import { reset } from "../authReducer";
// import builder from "next/dist/build";
import { getAllPosts } from "../../action/postAction";
// import { turborepoTraceAccess } from "next/dist/build/turborepo-access-trace";


const initialState ={
    posts: [],
    isError :false,
    postFetched: false,
   isLodding :false,
   isLoggedIn :false,
   message :" ",
   comments : [],
   postId: "",
}

const postSlice = createSlice({
    name :"post",
    initialState,
    reducers :{
        reset : () => initialState, 
        resetPostId : (state) =>{
            state.postId = ""
        },
    },
   extraReducers : (builder) => {
    builder 
    .addCase(getAllPosts.pending ,(state) =>{
        state.isLodding =true,
        state.message ="fetching all the posts.."
    })
    .addCase(getAllPosts.fulfilled, (state, action) =>{
        state.isLodding =false;
        state.isError =false;
        state.postFetched =true;
        state.posts =action.payload.posts
    }) 
    .addCase(getAllPosts.rejected,(state,action) =>{
        state.isLodding =false;
        state.isError =true;
        state.message =action.payload
   })
   }

})


export default  postSlice.reducer;