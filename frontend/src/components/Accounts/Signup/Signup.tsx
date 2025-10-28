import { useState } from "react";
import { useNavigate } from "react-router-dom";

// hooks
import useSignupHook from './hooks/useSignupHook';
import useGetCrsf from "../../hooks/useGetCsrf";


export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");

  // init hooks
  const {data : CSRFTOKEN} = useGetCrsf()
  const signupHook = useSignupHook()



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password || !rePassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== rePassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!CSRFTOKEN) {
      setError('invalid session')
      return
    }

    console.log("Signing up with:", { username, password });

    signupHook.mutate({
      username : username,
      password : password,
    })

  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
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

        <input
          type="password"
          placeholder="Re-enter Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Signup</button>
      </form>

      <p>
        Already have an account?{" "}
        <span className="link" onClick={() => navigate("/login")}>
          Login here
        </span>
      </p>
    </div>
  );
}
