import { Route, Routes } from "react-router-dom";
import { Post } from "./components/Post";
import { Posts } from "./components/Posts";
import { PostProvider } from "./contexts/PostContext";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route
          path="/posts/:id"
          element={
            <PostProvider>
              <Post />
            </PostProvider>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
