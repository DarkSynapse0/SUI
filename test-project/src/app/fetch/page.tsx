import React from "react";
import API_KEY from "../../../Api/api";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const FetchData = async () => {
  const res = await fetch(`${API_KEY}/posts/`, {
    method: "GET",
  });
  const data = await res.json();
  console.log(data);
  return (
    <div className="flex flex-col gap-5 p-5">
      {data.map((post: Post) => (
        <div
          key={post.id}
          className={` ${
            post.id % 2 == 0 ? "" : "flex flex-col"
          } border p-5   rounded-md shadow-md max-h-12 overflow-hidden hover:max-h-96 transition-[max-height] duration-500 ease-in`}
        >
          <h2
            className={`text-lg font-bold ${
              post.id % 2 == 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            {post.id}
          </h2>
          <h1>{post.title}</h1>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default FetchData;
