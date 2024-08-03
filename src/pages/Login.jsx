import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import styles from "./style/Login.module.css";
import PageNav from "../component/PageNav";
import Button from "../component/Button";

export default function Login() {
  const {login, isAuthenticated} = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const handleClick = e => {
    e.preventDefault()
    login(email, password)
  }

  useEffect(() => {
    if(isAuthenticated) navigate('/app', {replace: true})
  }, [isAuthenticated])

  return (
    <main className={styles.login}>
      <PageNav/>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleClick}>Login</Button>
        </div>
      </form>
    </main>
  );
}