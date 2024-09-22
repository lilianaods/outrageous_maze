import { Route, Routes } from "react-router-dom";
import { Posts } from "./components/Posts";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:id" element={<h1>Post</h1>} />
      </Routes>
    </div>
  );
}

export default App;
