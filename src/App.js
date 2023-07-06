import React from "react";
import Navbar from "./components/Navbar";
// import PostWrite from "./components/PostWrite";
import Posts from "./components/Posts";
// import PostsView from "./components/PostsView";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Header />
      <Posts />

      <Footer />
    </div>
  );
}

export default App;
