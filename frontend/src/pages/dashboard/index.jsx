import DashboardLayout from "@/config/layout/DashboardLayout";
import UserLayout from "@/config/layout/userLayout";
import { getAboutUser } from "@/config/redux/action/authAction";
import { getAllPosts } from "@/config/redux/action/postAction";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function dashboard() {
  
    const router = useRouter();

    const [isTokenThere,setTokenThere] =useState(false); 

    const dispatch =useDispatch();

    const authState = useSelector((state) => state.auth)

    useEffect(() => {
    if (localStorage.getItem("token") === null) {
      router.push("/login");
    }
    setTokenThere(true)
  });

  useEffect(() =>{
      if(isTokenThere) {
    dispatch(getAllPosts()) 
    dispatch(getAboutUser({token: localStorage.getItem('token')}))
      }


  } , [isTokenThere])

  return (
    <UserLayout>
       <DashboardLayout >
             <div>
              <h1>Dashboard</h1>
             </div>
       </DashboardLayout>
    </UserLayout>  
  );
}
