import { useState } from "react";
import {useNavigate } from "react-router-dom";

// hooks
import useLoginHook from "./hooks/useLoginHook";
import useGuestHook from "./hooks/useGuestHook";
import { useToggleIsAuth, useSetUserName} from '../../stores/AccountsStore/AccountsStore'

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHook = useLoginHook();
  const guestHook = useGuestHook()
  const toggleIsAuth = useToggleIsAuth();
  const setUserName = useSetUserName();

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
        navigate("/");
      },
      onError: (error) => {
        console.error("Login failed:", error);
        setError(error.message || "Login failed. Please try again.");
      },
    });
  };

  const handleGuestContinue = () => {
    guestHook.mutate(undefined, {
      onSuccess: () => {
        toggleIsAuth(true);
        setUserName("Guest");
        navigate("/");
      },
      onError: (error) => {
        console.error("Login failed:", error);
        setError(error?.message || "Login failed. Please try again.");
      },
    });
  };

  return (
    <div className='accounts-container'>
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoSave={'on'}
            autoFocus={true}
            autoComplete={'nickname'}

          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={'current-password'}
            autoSave={'on'}
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
    </div>


  );
}

