import { useState } from "react";
import {useNavigate } from "react-router-dom";

// hooks
import useLoginHook from "./hooks/useLoginHook";
import { useToggleIsAuth, useSetUserName, useToggleIsGuest} from '../../stores/AccountsStore/AccountsStore'

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHook = useLoginHook();
  const toggleIsAuth = useToggleIsAuth();
  const setUserName = useSetUserName();
  const toggleIsGuest = useToggleIsGuest()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError(""); // Clear previous errors

    loginHook.mutate({ username, password }, {
      onSuccess: (data) => {
        console.log("Login successful:", data);
        toggleIsAuth(true);
        setUserName(username);
        toggleIsGuest(false)
        navigate("/");
      },
      onError: (error) => {
        console.error("Login failed:", error);
        setError(error.message || "Login failed. Please try again.");
      },
    });
  };

  const handleGuestContinue = () => {
    toggleIsGuest(true)
    toggleIsAuth(false)
    navigate('/')
  }


  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loginHook.isPending}>
          {loginHook.isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Don’t have an account?{" "}
        <span className="link" onClick={() => navigate("/signup")}>
          Sign up here
        </span>
      </p>

      <p 
        className='guest-text'
        onClick={handleGuestContinue}
      > 
        Continue as a guest
      </p>

    </div>
  );
}

