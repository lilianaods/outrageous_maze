import { Comment } from "./Comment";

export const Comments = ({ comments }) => {
  return comments.map((comment) => (
    <div key={comment.id} className="comment-stack">
      <Comment
        id={comment.id}
        message={comment.message}
        user={comment.user}
        createdAt={comment.createdAt}
        likeCount={comment.likeCount}
        likedByMe={comment.likedByMe}
      />
    </div>
  ));
};
