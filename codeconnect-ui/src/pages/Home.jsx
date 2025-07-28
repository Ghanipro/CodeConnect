// src/pages/Home.jsx
import React from "react";
import CodeEditor from "../components/CodeEditor";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="max-w-5xl w-full p-6">
        <CodeEditor />
      </div>
    </div>
  );
};

export default Home;
