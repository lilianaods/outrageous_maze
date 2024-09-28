import React, { useState } from "react";

export function CommentForm({
  loading,
  error,
  onSubmit,
  autoFocus = false,
  initialValue = "",
}) {
  const [message, setMessage] = useState(initialValue);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message).then(() => setMessage(""));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="comment-form-row">
        <textarea
          autoFocus={autoFocus}
          value={message}
          className="message-input"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Loading" : "Post"}
        </button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  );
}
