import { makeRequest } from "./makeRequest";

export function createComment(postId, message, parentId) {
  return makeRequest(`/posts/${postId}/comments`, {
    method: "POST",
    data: { message, parentId },
  });
}

export function updateComment(postId, commentId, message) {
  return makeRequest(`/posts/${postId}/comments/${commentId}`, {
    method: "PUT",
    data: { message },
  });
}
