import { getPosts } from "../services/posts";
import { useEffect, useState } from "react";

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPosts().then(setPosts);
  }, []);
  return posts.map((post) => (
    <h1 key={post.id}>
      <a href={`/posts/${post.id}`}>{post.title}</a>
    </h1>
  ));
};
