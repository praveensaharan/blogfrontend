import React from "react";
import Logo from "./logo.svg";
import Upvote from "../Assets/yes.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Base_url = "https://backback-fgh7.onrender.com";

export default function PostsSection() {
  const [blogs, setBlogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(blogs.flatMap((post) => post.updatedCategories)),
    ];
    setCategoryOptions(uniqueCategories);
  }, [blogs]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${Base_url}/users`);
      const data = await response.json();
      console.log(data);
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredPosts = selectedCategory
    ? blogs.filter((post) => post.updatedCategories.includes(selectedCategory))
    : blogs;

  return (
    <section className="py-24 lg:pt-20 lg:pb-32 bg-slate-100 overflow-hidden dark:bg-slate-700">
      <div className="relative flex items-center justify-center p-4 h-10 bg-slate-500">
        <button
          id="dropdownDefault"
          onClick={toggleDropdown}
          className="relative z-10 flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 inline-flex dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
        >
          Filter by category
          <svg
            className={`w-4 h-4 ml-2 transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <div
          className={`absolute z-20 top-10 right-0 transform translate-x-2 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </h6>
          <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
            {categoryOptions.map((category) => (
              <li className="flex items-center" key={category}>
                <input
                  id={category}
                  type="checkbox"
                  value={category}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  onChange={handleCategoryChange}
                />

                <label
                  htmlFor={category}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100 capitalize"
                >
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container px-4 mx-auto">
        <h1 className="mb-10 tracking-tighter ml-10 bg-gradient-to-r from-yellow-400 via-blue-500 to-purple-600 bg-clip-text text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent">
          New Blogs
        </h1>
        <div className="flex flex-wrap">
          {filteredPosts.map((blog) => (
            <div
              key={blog._id}
              className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 p-4"
            >
              <Link
                to={`/blog/${blog._id}`}
                className="w-full h-full group border-2 border-solid border-indigo-300 rounded-lg bg-blue-100 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900 flex flex-col items-center m-3"
              >
                <div className="overflow-hidden rounded-lg m-1">
                  <img
                    className="w-60 h-60 rounded-lg transform hover:scale-105 transition duration-500"
                    src={blog.link}
                    alt=""
                  />
                </div>
                <div className="flex my-3 text-gray-500 font-medium tracking-tight dark:text-gray-300">
                  <img className="w-8 h-8 pb-2" src={Upvote} alt="" />
                  <span className="mr-4 text-red-500 font-semibold">
                    {blog.upvotes}
                  </span>
                  <span>
                    {" "}
                    {new Date(blog.date).toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {new Date(blog.date).getFullYear()}
                  </span>
                </div>
                <span className="text-gray-500 font-semibold text-xs dark:text-gray-400 italic">
                  {blog.updatedCategories &&
                    blog.updatedCategories.map((category, index) => (
                      <span key={index}>#{category} </span>
                    ))}
                </span>
                <h3
                  className="text-xl cursor-pointer group-hover:text-blue-400 font-semibold group-hover:underline dark:text-gray-100 text-center"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {blog.title}
                </h3>
                <div
                  className="flex pl-1 pt-3 w-[90%] text-xs text-gray-400 dark:text-gray-300"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {blog.description}
                </div>
                <div
                  className="flex pl-1 text-gray-500 dark:text-gray-300 mt-3 italic"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  <span className="text-xs mr-2 text-gray-500 font-semibold dark:text-gray-400">
                    Time: {blog.time}
                  </span>
                  <span className="text-gray-500 font-semibold text-xs dark:text-gray-400">
                    By: {blog.name}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
