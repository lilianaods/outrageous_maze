import { Fragment } from "react";
import { usePost } from "../contexts/PostContext";
import { Comments } from "./Comments";

export const Post = () => {
  const { post, rootComments } = usePost();

  return (
    <Fragment>
      <h1>{post.title}</h1>
      <article>{post.body}</article>
      <h3 className="comments-title">Comments</h3>
      <section>
        {rootComments !== null && rootComments.length > 0 && (
          <div className="mt-4">
            <Comments comments={rootComments} />
          </div>
        )}
      </section>
    </Fragment>
  );
};
