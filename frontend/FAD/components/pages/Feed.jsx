import React, { useState, useMemo } from "react";
import "./styles/Feed.css";
import { body } from "express-validator";

function PostCard({ post, onVote }) {
  const handleUp = () => onVote(post.id, 1);
  const handleDown = () => onVote(post.id, -1);

  return (
    <article className="post">
      <div className="vote">
        <button aria-label="upvote" onClick={handleUp}>▲</button>
        <div className="score">{post.score}</div>
        <button aria-label="downvote" onClick={handleDown}>▼</button>
      </div>

      <div className="content">
        <div className="meta">
          <span className="topic">#{post.topic}</span>
          <span className="dot">•</span>
          <span className="author">@{post.author}</span>
          <span className="dot">•</span>
          <span className="time">{timeSince(post.createdAt)} ago</span>
        </div>

        <h3 className="title">{post.title}</h3>
        {post.body && <p className="body">{post.body}</p>}
        {post.image && (
          <img className="thumb" src={post.image} alt={post.title} />
        )}

        <div className="footer">
          <button className="action">💬 {post.comments} Replies</button>
          <button className="action">🔗 Share</button>
          <button className="action">💾 Save</button>
          <button className="action">⋯ More</button>
        </div>
      </div>
    </article>
  );
}

export default function Feed() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("hot");
  const [posts, setPosts] = useState(seedPosts);

  // New post state (not fully implemented)
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    topic: "",
    image: "",
    author: "current_user",
  });

  const visible = useMemo(() => {
    let list = posts.filter(
      p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.topic.toLowerCase().includes(query.toLowerCase())
    );
    switch (sort) {
      case "new":
        list = [...list].sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "top":
        list = [...list].sort((a, b) => b.score - a.score);
        break;
      default: // hot
        list = [...list].sort(
          (a, b) => b.score / hoursOld(b) - a.score / hoursOld(a)
        );
    }
    return list;
  }, [posts, query, sort]);

  const handleVote = (id, delta) => {
    setPosts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, score: p.score + delta } : p
      )
    );
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim()) return;

    const newEntry = {
        id: Date.now(),
        title: newPost.title,
        body: newPost.body,
        topic: newPost.topic || "general",
        image: newPost.image,
        score: 0,
        comments: 0,
        createdAt: Date.now(),
    };

    setPosts([newEntry, ...posts]);
    setNewPost({ title: "", body: "", topic: "", image: "", author: "current_user" });
};

  return (
    <div className="feed">

      {/* 🔹 NEW: Create Post Form */}
      <section className="create-post">
        <h2>Create a Discussion</h2>
        <form onSubmit={handleCreatePost}>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) =>
              setNewPost({ ...newPost, title: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Write something..."
            value={newPost.body}
            onChange={(e) =>
              setNewPost({ ...newPost, body: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Topic (e.g. react, js, fun)"
            value={newPost.topic}
            onChange={(e) =>
              setNewPost({ ...newPost, topic: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Optional image URL"
            value={newPost.image}
            onChange={(e) =>
              setNewPost({ ...newPost, image: e.target.value })
            }
          />
          <button type="submit">Post</button>
        </form>
      </section>

      {/* Toolbar */}
      <header className="toolbar">
        <input
          placeholder="Search discussions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="hot">Hot</option>
          <option value="new">New</option>
          <option value="top">Top</option>
        </select>
      </header>

      <main>
        {visible.map((post) => (
          <PostCard key={post.id} post={post} onVote={handleVote} />
        ))}
      </main>
    </div>
  );
}

// Helper functions
function hoursOld(p) {
  return (Date.now() - p.createdAt) / 36e5;
}
function timeSince(ts) {
  const secs = Math.floor((Date.now() - ts) / 1000);
  if (secs < 60) return `${secs}s`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.floor(hrs / 24)}d`;
}

// Example posts
const seedPosts = [
  {
    id: 1,
    title: "Welcome to the Forum & Discussion community 🎉",
    body: "This is a space where you can share ideas, ask questions, and connect with others.",
    author: "admin",
    topic: "general",
    score: 10,
    comments: 3,
    createdAt: Date.now() - 1000 * 60 * 60,
  },
  {
    id: 2,
    title: "Best tips for learning React?",
    body: "I just started learning React, any resources or strategies you’d recommend?",
    author: "newbie123",
    topic: "react",
    score: 7,
    comments: 5,
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
  },
  {
    id: 3,
    title: "Funny meme I found",
    image: "https://i.redd.it/tpsnoz5bzo501.jpg",
    author: "meme_lord",
    topic: "fun",
    score: 20,
    comments: 12,
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: 4,
    title: "How to stay productive while working from home?",
    body: "Working remotely has its challenges. How do you stay focused and motivated?",    
    score: 2,
    comments: 2,
    createdAt: Date.now() - 1000 * 60 * 30,
  }


];
