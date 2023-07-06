import UpBlog from "../Assets/blog.jpg";
import React, { useState } from "react";
const Base_url = "https://backback-fgh7.onrender.com";

export default function Write() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [topic, setTopic] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");

  const handleCategoryInputChange = (event) => {
    setCategoryInput(event.target.value);
  };

  const handleAddCategory = () => {
    if (categoryInput.trim() !== "") {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const updatedCategories = [...categories]; // Create a copy of the categories state
    await onSubmit(
      title,
      link,
      topic,
      time,
      name,
      description,
      updatedCategories
    );
    setTitle("");
    setLink("");
    setTopic("");
    setTime("");
    setName("");
    setDescription("");
    setCategoryInput("");
    setCategories([]);
  };

  const onSubmit = async (
    title,
    link,
    topic,
    time,
    name,
    description,
    updatedCategories
  ) => {
    try {
      const response = await fetch(`${Base_url}/register`, {
        method: "POST",
        body: JSON.stringify({
          title,
          link,
          topic,
          time,
          name,
          description,
          updatedCategories,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.warn(data);
      if (response.ok) {
        alert("Data saved successfully");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <section className="py-24 lg:pt-20 lg:pb-32 bg-slate-100 overflow-hidden dark:bg-slate-700">
      <div className="write my-6 dark:bg-slate-700 dark:text-white bg-slate-100">
        <h1 className="mb-10 tracking-tighter ml-10 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent">
          Write Your Blog
        </h1>
        <div className="flex justify-center">
          <img
            className="max-w-full object-cover rounded-2xl mx-4 md:mx-40 w-full md:w-11/12 h-64 md:h-96 mb-5"
            src={UpBlog}
            alt=""
          />
        </div>

        <form className="writeForm relative" onSubmit={handleOnSubmit}>
          <div className="writeFormGroup mx-4 md:mx-40 mb-4 md:mb-8 flex flex-wrap items-center">
            <input
              className="border-2 w-full sm:w-11/12 md:w-[70%] border-blue-100 bg-white h-10 mb-4 pr-5 pl-3 rounded-lg text-sm focus:outline-none hover:bg-slate-200 hover:border-blue-200  dark:bg-gray-800 dark:placeholder:text-slate-100"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              className="border-2 w-full sm:w-11/12 md:w-[70%] border-blue-100 bg-white h-10 mb-4 pr-5 pl-3 rounded-lg text-sm focus:outline-none hover:bg-slate-200 hover:border-blue-200  dark:bg-gray-800 dark:placeholder:text-slate-100"
              type="text"
              placeholder="Link of Image"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <input
              className="border-2 w-full sm:w-11/12 md:w-[70%] border-blue-100 bg-white h-10 mb-4 pr-5 pl-3 rounded-lg text-sm focus:outline-none hover:bg-slate-200 hover:border-blue-200  dark:bg-gray-800 dark:placeholder:text-slate-100"
              type="text"
              placeholder="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
            <div className="flex items-center">
              <input
                className="mr-2 border-2 w-full sm:w-11/12 md:w-[70%] border-blue-100 bg-white h-10 mb-4 pr-5 pl-3 rounded-lg text-sm focus:outline-none hover:bg-slate-200 hover:border-blue-200 dark:bg-gray-800 dark:placeholder:text-slate-100"
                type="text"
                value={categoryInput}
                onChange={handleCategoryInputChange}
                placeholder="Enter category"
              />
              <button
                className="bg-blue-300 hover:bg-blue-600 text-white py-1 px-3 sm:px-4 rounded-lg dark:text-black"
                type="button"
                onClick={handleAddCategory}
              >
                Add Category
              </button>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2 m-2">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white rounded-md px-3 py-2 shadow-md dark:bg-gray-800"
                >
                  <span className="mr-2">{category}</span>
                  <button
                    className="bg-red-300 hover:bg-red-600 text-white py-1 px-2 rounded-md dark:text-black"
                    type="button"
                    onClick={() => handleRemoveCategory(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <input
              className="border-2 w-full sm:w-11/12 md:w-[70%] border-blue-100 bg-white h-10 mb-4 pr-5 pl-3 rounded-lg text-sm focus:outline-none hover:bg-slate-200 hover:border-blue-200  dark:bg-gray-800 dark:placeholder:text-slate-100"
              type="text"
              placeholder="Time to Read Ex. 2min."
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
            <input
              className="border-2 w-full sm:w-11/12 md:w-[70%] border-blue-100 bg-white h-10 mb-1 pr-5 pl-3 rounded-lg text-sm focus:outline-none hover:bg-slate-200 hover:border-blue-200  dark:bg-gray-800 dark:placeholder:text-slate-100"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="writeFormGroup mx-4 md:mx-40">
            <textarea
              className="writeInput writeText mt-3 p-4 md:p-6 w-full md:w-11/12 h-96 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800"
              placeholder="Tell your story..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              autoFocus={false}
            />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:bg-blue-600"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
