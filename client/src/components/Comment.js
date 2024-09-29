import { Fragment, useState } from "react";
import { FaEdit, FaHeart, FaRegHeart, FaReply, FaTrash } from "react-icons/fa";
import { usePost } from "../contexts/PostContext";
import { useAsyncFn } from "../hooks/useAsync";
import { useUser } from "../hooks/useUser";
import {
  createComment,
  deleteComment,
  toggleCommentLike,
  updateComment,
} from "../services/comments";
import { CommentForm } from "./CommentForm";
import { Comments } from "./Comments";
import { IconBtn } from "./IconBtn";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export const Comment = ({
  id,
  message,
  user,
  createdAt,
  likeCount,
  likedByMe,
}) => {
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    post,
    getReplies,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
    toggleLocalCommentLike,
  } = usePost();
  const createCommentFn = useAsyncFn(createComment);
  const updateCommentFn = useAsyncFn(updateComment);
  const deleteCommentFn = useAsyncFn(deleteComment);
  const toggleCommentLikeFn = useAsyncFn(toggleCommentLike);
  const currentUser = useUser();
  const childComments = getReplies(id);
  const onCommentReply = (message) =>
    createCommentFn
      .execute(post.id, message, id)
      .then((comment) => {
        setIsReplying(false);
        createLocalComment(comment);
      })
      .catch(() => {});
  const onCommentUpdate = (message) =>
    updateCommentFn
      .execute(post.id, id, message)
      .then((comment) => {
        setIsEditing(false);
        updateLocalComment(id, comment.message);
      })
      .catch(() => {});
  const onCommentDelete = () =>
    deleteCommentFn
      .execute(post.id, id)
      .then((comment) => deleteLocalComment(comment.id))
      .catch(() => {});
  const onToggleCommentLike = () => {
    return toggleCommentLikeFn.execute(id, post.id).then(({ addLike }) => {
      toggleLocalCommentLike(id, addLike);
    });
  };
  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">{user.name}</span>
          <span className="date">
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>
        {isEditing ? (
          <CommentForm
            autoFocus
            initialValue={message}
            onSubmit={onCommentUpdate}
            loading={updateCommentFn.loading}
            error={updateCommentFn.error}
          />
        ) : (
          <div className="message">{message}</div>
        )}
        <div className="footer">
          <IconBtn
            onClick={onToggleCommentLike}
            disabled={toggleCommentLikeFn.loading}
            icon={likedByMe ? FaHeart : FaRegHeart}
            aria-label={likedByMe ? "Unlike" : "Like"}
          >
            {likeCount}
          </IconBtn>
          <IconBtn
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
            icon={FaReply}
            aria-label={isReplying ? "Cancel reply" : "Reply"}
          />
          {user.id === currentUser.id && (
            <>
              <IconBtn
                onClick={() => setIsEditing((prev) => !prev)}
                isActive={isEditing}
                icon={FaEdit}
                aria-label={isEditing ? "Cancel edit" : "Edit"}
              />
              <IconBtn
                disabled={deleteCommentFn.loading}
                onClick={onCommentDelete}
                icon={FaTrash}
                aria-label="Delete"
                color="danger"
              />
            </>
          )}
        </div>
        {deleteCommentFn.error && (
          <div className="error-msg mt-1">{deleteCommentFn.error}</div>
        )}
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            parentId={id}
            autoFocus
            onSubmit={onCommentReply}
            loading={createCommentFn.loading}
            error={createCommentFn.error}
          />
        </div>
      )}
      {childComments.length > 0 && (
        <Fragment>
          <div
            className={`nested-comments-stack ${
              areChildrenHidden ? "hide" : ""
            }`}
          >
            <button
              aria-label="Hide replies"
              className="collapse-line"
              onClick={() => setAreChildrenHidden(true)}
            />
            <div className="nested-comments">
              <Comments comments={childComments} />
            </div>
          </div>
          <button
            className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
            onClick={() => setAreChildrenHidden(false)}
          >
            Show replies
          </button>
        </Fragment>
      )}
    </>
  );
};
