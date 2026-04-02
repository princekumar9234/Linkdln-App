import UserLayout from '@/config/layout/userLayout'
import { useRouter } from 'next/router';
import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import styles from "./style.module.css";

function LoginComponent() {
const authState = useSelector((state) => state.auth);

const router = useRouter();

useEffect(() =>{
  if(authState.loggedIn) {
 router.push("/dashboard");
  }
})

  return (
  
    <UserLayout>
      <div className={styles.cardContainer}>
        <div className={styles.cardContanier_left}></div>
        <div className={styles.cardContanier_right}></div>
      </div>
    </UserLayout>
  )
}

export default LoginComponent