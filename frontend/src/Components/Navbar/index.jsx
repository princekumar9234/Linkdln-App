import React from 'react'
import styles from "./style.module.css"
import { useRouter } from 'next/router'

function NavbarComponent() {
  const router =useRouter();
  return (
  
    <div className={styles.container}> 
       <nav className={styles.navBar}>
        <h1 style={{cursor:"pointer"}} onClick={() =>{
            router.push("/")
          }}>Pro connect</h1>

        <div className={styles.navBarOptionContainer}>
          <div onClick={() =>{
            router.push("/login")
          }} className={styles.buttonjoin}>
          <p>Be a part</p>
          </div>
        </div>
       </nav>
    </div>
     
      
  )
}

export default NavbarComponent  
