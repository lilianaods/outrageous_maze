import { FaHeart, FaReply, FaEdit, FaTrash } from "react-icons/fa";
import { IconBtn } from "./IconBtn";
import { usePost } from "../contexts/PostContext";
import { Fragment, useState } from "react";
import { Comments } from "./Comments";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

export const Comment = ({ id, message, user, createdAt }) => {
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const { getReplies } = usePost();
  const childComments = getReplies(id);
  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">{user.name}</span>
          <span className="date">
            {dateFormatter.format(Date.parse(createdAt))}
          </span>
        </div>
        <div className="message">{message}</div>
        <div className="footer">
          <IconBtn icon={FaHeart} aria-label="Like">
            2
          </IconBtn>
          <IconBtn icon={FaReply} aria-label="Reply" />
          <IconBtn icon={FaEdit} aria-label="Edit" />
          <IconBtn icon={FaTrash} aria-label="Delete" color="danger" />
        </div>
      </div>
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
