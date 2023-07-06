import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import BlogView from "./Pages/blog";
import BlogWrite from "./Pages/blogwrite";
import BlogViewId from "./Pages/blogview";

const root = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<BlogView />} />
        <Route path="/write" element={<BlogWrite />} />
        <Route path="/blog/:id" element={<BlogViewId />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  root
);
