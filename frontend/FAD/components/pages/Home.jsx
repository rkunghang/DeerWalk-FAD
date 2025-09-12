import React from "react";
import "./styles/Home.css";

export default function Home() {
  return (
    <div>
      <header>
        <h1>Welcome to DW</h1>
        <p>A simple homepage built with React</p>
      </header>

      <main>
        <section>
          <h2>About</h2>
          <p>
            this is a simple React project created to practice building web apps
            with Vite and React. It will eventually grow with features like
            discussions, login, and more.Just a starting point to learn. Click The Get Started button below to go to the login page.
          </p>
        </section>

        <section>
          <h2>Get Started</h2>
          <button onClick={() => location.href="/land"}>
            Get Started 
          </button>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} DW Project</p>
      </footer>
    </div>
  );
}
