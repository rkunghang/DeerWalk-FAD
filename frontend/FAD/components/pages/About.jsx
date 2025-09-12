import React from "react";

export default function About() {
  return (
    <div>
      <header>
        <h1>About DW</h1>
      </header>

      <main>
        <section>
          <h2>Our Project</h2>
          <p>
            DW is a simple React project created to practice building web apps 
            with Vite and React. It will eventually grow with features like 
            discussions, login, and more.
          </p>
        </section>

        <section>
          <h2>Why DW?</h2>
          <p>
            The goal is to learn React step by step while keeping things clean 
            and simple. This page is part of that journey.
          </p>
        </section>
      </main>

      <footer>
        <p>Made with ❤️ using React</p>
      </footer>
    </div>
  );
}
