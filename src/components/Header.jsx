import React from "react";

export default function Header() {
  return (
    <section className="bg-blue-50 overflow-hidden dark:bg-slate-800 dark:text-white text-black">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Understand Others Thoughts.
            <span className="sm:block"> Increase Conversation. </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Welcome to Wordwise, a vibrant online platform dedicated to sharing
            knowledge, sparking inspiration, and fostering meaningful
            conversations.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/blog"
            >
              Blogs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
