import UserLayout from "@/config/layout/userLayout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { registerUser } from "@/config/redux/action/authAction";

function LoginComponent() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const [userLoginMethod, setUserLoginMethod] = useState(false);

  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  });
  const handleRegister = () => {
    console.log("registering...");
    dispatch(registerUser({ username, name, email, password }))
  };
  
  return (
    <UserLayout>
      <div className={styles.Container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainer_left}>
            <p className={styles.cardleft_header}>
              {userLoginMethod ? "sign in" : "sign up"}{" "}
            </p>
            <p style={{color:authState.isError ? "red" :"green"}}> {authState.message?.message || authState.message}</p> 
            <div className={styles.inputContainers}>
              <div className={styles.inputRows}>
                <input
                  onChange={(e) => setName(e.target.value)}
                  className={styles.inputField}
                  type="text"
                  placeholder="Name"
                />
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.inputField}
                  type="text"
                  placeholder="Username"
                />
              </div>
              <input
                onChange={(e) => setEmailAddress(e.target.value)}
                className={styles.inputField}
                type="email"
                placeholder="email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputField}
                type="password"
                placeholder="Password"
              />

              <div
                onClick={() => {
                  if (userLoginMethod) {
                  } else {
                    handleRegister();
                  }
                }}
                className={styles.buttonWithOutLine}
              >
                <p>{userLoginMethod ? "sign in" : "sign up"} </p>
              </div>
            </div>
          </div>
          <div className={styles.cardContainer_right}></div>
        </div>
      </div>
    </UserLayout>
  );
}

export default LoginComponent;
