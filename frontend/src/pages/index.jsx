import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { router } from "next/router";
import UserLayout from "@/config/layout/userLayout";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.mainContainer_left}>
            <p>Connect with friends without Exaggeration</p>
            <p> a true social media platform, with stories no blufs !</p>
            <div
              onClick={() => {
                router.push("/login");
              }}
              className={styles.buttonjoin}
            >
              <p>join now</p>
            </div>
          </div>

          <div className={styles.mainContainer_right}>
            <img src="images/connecting.jpg" className={styles.image} />
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
