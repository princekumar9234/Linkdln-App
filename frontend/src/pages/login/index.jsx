import UserLayout from '@/config/layout/userLayout'
import { useRouter } from 'next/router';
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import styles from "./style.module.css";

function LoginComponent() {
const authState = useSelector((state) => state.auth);

const isLoginMethod =useState(false);
const router = useRouter();

useEffect(() =>{
  if(authState.loggedIn) {
 router.push("/dashboard");
  }
})

  return (
    <UserLayout>
      <div className={styles.Container}>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer_left}>
          <p className={styles.cardleft_header}>{isLoginMethod ? "sign in" : "sign up"}</p>
        </div>
        <div className={styles.cardContainer_right}></div>
      </div>
      </div>
    </UserLayout>
  )
}

export default LoginComponent