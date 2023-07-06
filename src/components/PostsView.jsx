import Upvote from "../Assets/yes.png";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const Base_url = "https://backback-fgh7.onrender.com";

export default function Write() {
  const { id } = useParams();
  const [blog, setBlog] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState(null);
  const [upvotes, setUpvotes] = useState(blog.upvotes);
  const handleUpvote = async () => {
    try {
      // Make a PUT request to update the upvotes count in the backend
      const response = await fetch(`${Base_url}/blog/${id}`, {
        method: "PUT",
      });

      if (response.ok) {
        // If the request is successful, update the upvotes count in the frontend
        setUpvotes((prevUpvotes) => prevUpvotes + 1);
      } else {
        console.error("Error updating upvotes`,erro");
      }
    } catch (error) {
      console.error("Error updating upvotes:", error);
    }
  };
  const calculateDaysPassed = (date) => {
    const currentDate = new Date();
    const pastDate = new Date(date);
    const timeDifference = currentDate.getTime() - pastDate.getTime();
    const daysPassed = Math.floor(timeDifference / (1000 * 3600 * 24));

    if (daysPassed < 1) {
      const hoursPassed = Math.floor(timeDifference / (1000 * 3600));
      return hoursPassed + " hours";
    }

    return daysPassed + " days";
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Base_url}/comments/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author,
          content,
        }),
      });

      if (response.ok) {
        alert("Comment posted successfully");
        setAuthor("");
        setContent("");
      } else {
        alert("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${Base_url}/users/${id}`);
      const data = await response.json();
      console.log(data);
      setBlog(data);
      setUpvotes(data.upvotes);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };
  const fetchComment = async () => {
    try {
      const response1 = await fetch(`${Base_url}/commentsget/${id}`);
      const data1 = await response1.json();
      console.log(data1);
      setComment(data1);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchComment();
  }, []);

  if (!blog) {
    return <div>Blog not found</div>;
  }
  return (
    <section className="py-24 lg:pt-20 lg:pb-32 bg-slate-100 dark:bg-slate-700 overflow-hidden">
      <div className="write my-16 bg-slate-100 dark:bg-slate-700">
        <div className="grid lg:grid-cols-2">
          <div className="flex justify-center">
            <img
              className="singlePostImg w-[90%] sm:max-w-[400px] h-auto object-cover rounded-2xl mx-4 sm:mx-40 mb-5"
              src={blog.link}
              alt=""
            />
          </div>

          <div className="p-4 sm:p-8">
            <h1 className="text-2xl cursor-pointer group-hover:text-blue-400 font-semibold group-hover:underline dark:text-gray-100 text-center">
              {blog.title}
            </h1>
            <div className="flex pl-1 text-gray-500 dark:text-gray-300 mt-3">
              <span className="text-xs mr-2 text-gray-500 font-semibold dark:text-gray-400 italic">
                By: {blog.name}
              </span>
            </div>
            <div className="flex my-3 text-gray-500 font-medium tracking-tight dark:text-gray-300">
              <div className="flex flex-grow items-center">
                <img
                  className="w-8 h-8 pb-2 cursor-pointer"
                  src={Upvote}
                  alt="Upvote"
                  onClick={handleUpvote}
                />
                <span className="mr-4 text-red-500 font-semibold">
                  {upvotes}
                </span>
              </div>

              <div className="flex-grow">
                <span className="mr-4">
                  {new Date(blog.date).toLocaleString("default", {
                    month: "long",
                  })}{" "}
                  {new Date(blog.date).getFullYear()}
                </span>
              </div>

              <div className="flex-grow">
                <span>Est.Time: {blog.time}</span>
              </div>
            </div>

            <div className="flex my-3 text-gray-500 font-medium tracking-tight dark:text-gray-300">
              <span className="text-gray-500 font-semibold text-xs dark:text-gray-400 italic">
                {blog.topic}
              </span>
            </div>
            <div className="flex my-3 text-gray-500 font-medium tracking-tight dark:text-gray-300">
              <span className="text-gray-500 font-semibold text-xs dark:text-gray-400 italic">
                {blog.updatedCategories &&
                  blog.updatedCategories.map((category, index) => (
                    <span key={index}>#{category} </span>
                  ))}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-8">
          <p className="mr-2 text-gray-500 dark:text-gray-400">
            {blog.description}
          </p>
        </div>
        <div className="p-4 sm:p-8">
          <div className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Comments
          </div>
          {!comment ? (
            <div>No Any Comments</div>
          ) : (
            <div className="flex flex-col space-y-4">
              {comment.map((comm) => (
                <div
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
                  key={comm._id}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-800 dark:text-gray-200 italic">
                      By: {comm.author !== "" ? comm.author : "Anonymous"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {calculateDaysPassed(comm.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300"></p>
                  {comm.content}
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 bg-slate-200 rounded-lg dark:bg-slate-600">
            <form onSubmit={handleFormSubmit}>
              <input
                className="w-full sm:w-11/12 md:w-[70%] h-10 mb-1 pr-5 pl-3 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <textarea
                className="block w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500"
                placeholder="Write your comment..."
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:bg-blue-600"
                type="submit"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
// <section className="py-24 lg:pt-20 lg:pb-32 bg-slate-100 dark:bg-slate-700 overflow-hidden">
//   <div className="write my-16 bg-slate-100 dark:bg-slate-700">
//     <div className="grid lg:grid-cols-2">
//       <div className="flex justify-center">
//         <img
//           className="singlePostImg w-full h-60 sm:h-96 object-cover rounded-2xl mx-4 sm:mx-40 mb-5"
//           src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//           alt=""
//         />
//       </div>

//       <div className="p-4 sm:p-8">
//         <h1 className="text-xl cursor-pointer group-hover:text-blue-400 font-semibold group-hover:underline dark:text-gray-100 text-center">
//           Lorem ipsum dolor
//         </h1>
//         <div className="flex pl-1 text-gray-500 dark:text-gray-300 mt-3">
//           <span className="text-xs mr-2 text-gray-500 font-semibold dark:text-gray-400 italic">
//             By: Praveen
//           </span>
//         </div>
//         <div className="flex my-3 text-gray-500 font-medium tracking-tight dark:text-gray-300">
//           <img className="w-8 h-8 pb-2" src={Upvote} alt="" />
//           <span className="mr-4 text-red-500 font-semibold">1</span>
//           <span className="mr-4">June 22, 2021</span>
//           <span>Time</span>
//         </div>
//         <div className="flex my-3 text-gray-500 font-medium tracking-tight dark:text-gray-300">
//           <span className="text-gray-500 font-semibold text-xs dark:text-gray-400 italic">
//             Tag #play
//           </span>
//         </div>
//       </div>
//     </div>

//     <div className="p-4 sm:p-8">
//       <p className="mr-2 text-gray-500 dark:text-gray-400">
//         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste error
//         quibusdam ipsa quis quidem doloribus eos, dolore ea iusto impedit!
//         Voluptatum necessitatibus eum beatae, adipisci voluptas a odit modi
//         eos! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
//         error quibusdam ipsa quis quidem doloribus eos, dolore ea iusto
//         impedit! Voluptatum necessitatibus eum beatae, adipisci voluptas a
//         odit modi eos! Lorem, ipsum dolor sit amet consectetur adipisicing
//         elit. Iste error quibusdam ipsa quis quidem doloribus eos, dolore ea
//         iusto impedit! Voluptatum necessitatibus eum beatae, adipisci
//         voluptas a odit modi eos! Lorem, ipsum dolor sit amet consectetur
//         adipisicing elit. Iste error quibusdam ipsa quis quidem doloribus
//         eos, dolore ea iusto impedit! Voluptatum necessitatibus eum beatae,
//         adipisci voluptas a odit modi eos! Lorem, ipsum dolor sit amet
//         consectetur adipisicing elit. Iste error quibusdam ipsa quis quidem
//         doloribus eos, dolore ea iusto impedit! Voluptatum necessitatibus
//         eum beatae, adipisci voluptas a odit modi eos!
//       </p>
//     </div>
//     <div className="p-4 sm:p-8">
//       <div className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
//         Comments
//       </div>
//       <div className="flex flex-col space-y-4">
//         <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
//               John Doe
//             </span>
//             <span className="text-xs text-gray-500 dark:text-gray-400">
//               3 hours ago
//             </span>
//           </div>
//           <p className="text-gray-600 dark:text-gray-300">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
//             egestas at nibh nec iaculis.
//           </p>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
//               Jane Smith
//             </span>
//             <span className="text-xs text-gray-500 dark:text-gray-400">
//               1 day ago
//             </span>
//           </div>
//           <p className="text-gray-600 dark:text-gray-300">
//             Ut venenatis dui arcu, a efficitur ex maximus sed. Suspendisse
//             eget leo nisi.
//           </p>
//         </div>
//       </div>

//       <div className="mt-8">
//         <form>
//           <textarea
//             className="block w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-800 focus:ring-2 focus:ring-blue-500"
//             placeholder="Write your comment..."
//             rows="4"
//           ></textarea>
//           <button
//             className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:bg-blue-600"
//             type="submit"
//           >
//             Post Comment
//           </button>
//         </form>
//       </div>
//     </div>
//   </div>
// </section>
//   );
// }
