import { use, useState } from "react";
import styles from "./Login.module.css";
import { useAuth } from "../context/FakeAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";


export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const {login, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated===true) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  async function handleLogin(e) {
    e.preventDefault();
    if(email && password) {
      await login(email, password);
    }
  }
  return (
    <main className={styles.login}>
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
          <Button type="primary" onClick={(e) => handleLogin(e)}>Login</Button>
        </div>
      </form>
    </main>
  );
}
