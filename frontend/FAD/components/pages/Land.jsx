import { useState } from "react";

export default function Land() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("email:", email, "password:", password);
    location.href = "/feed";
  };

  return (
    <div>
      <section>
        <h1>Welcome to Fad</h1>
        <p>For discussion</p>
      </section>

      <section>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit">Login</button>
        </form>
        <p>
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </section>
    </div>
  );
}
