// src/components/CodeEditor.jsx
import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { oneDark } from "@codemirror/theme-one-dark";

const languageExtensions = {
  javascript,
  python,
  java,
};

const CodeEditor = () => {
  const [code, setCode] = useState("// Start coding here...");
  const [language, setLanguage] = useState("javascript");

  const onChange = (value) => {
    setCode(value);
  };

  return (
    <div className="w-full h-full p-4 bg-[#1e1e1e] text-white rounded-xl shadow-xl">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Code Editor</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded-md border border-gray-600"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
      </div>

      <CodeMirror
        value={code}
        height="400px"
        theme={oneDark}
        extensions={[languageExtensions[language]()]}
        onChange={onChange}
        className="rounded-md"
      />
    </div>
  );
};

export default CodeEditor;
