"use client";


import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export default function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState("");
  const textareaRef = useRef(null);

  const handleInputChange = (event) => {
    setMarkdownText(event.target.value);
  };

  const handleTabKey = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const { current } = textareaRef;
      const { selectionStart, selectionEnd } = current;
      const spaces = "  "; // Two spaces per tab
      const updatedText =
        markdownText.substring(0, selectionStart) +
        spaces +
        markdownText.substring(selectionEnd);
      setMarkdownText(updatedText);
      // Set the cursor position after the inserted spaces
      current.selectionStart = selectionStart + spaces.length;
      current.selectionEnd = selectionStart + spaces.length;
    }
  };

  const handleFormatting = (tag, isLink = false) => {
    const { current } = textareaRef;
    const { selectionStart, selectionEnd } = current;
    const selectedText = markdownText.substring(selectionStart, selectionEnd);
    const formattedText = isLink ? `[${selectedText}](url)` : `${tag}${selectedText}${tag}`;
    const updatedText =
      markdownText.substring(0, selectionStart) +
      formattedText +
      markdownText.substring(selectionEnd);
    setMarkdownText(updatedText);
    // Set the cursor position after the inserted markdown
    current.selectionStart = selectionStart + tag.length;
    current.selectionEnd = selectionStart + tag.length + selectedText.length;
    current.focus();
  };

  // Custom components for rendering specific elements
  const components = {
    h1: ({ children }) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mb-2">{children}</h4>,
    h5: ({ children }) => <h5 className="text-lg font-bold mb-1">{children}</h5>,
    h6: ({ children }) => <h6 className="text-base font-bold mb-1">{children}</h6>,
    p: ({ children }) => <p className="mb-2">{children}</p>,
  };

  const preprocessMarkdown = (markdown) => {
    return markdown.replace(/^ /gm, "\u00A0");
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
          onClick={() => handleFormatting("**")}
        >
          Bold
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
          onClick={() => handleFormatting("_")}
        >
          Italic
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
          onClick={() => handleFormatting("~~")}
        >
          Strikethrough
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
          onClick={() => handleFormatting("`")}
        >
          Code
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
          onClick={() => handleFormatting("", true)}
        >
          Link
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={() => handleFormatting("> ")}
        >
          Quote
        </button>
      </div>
      <textarea
        className="w-full h-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-black"
        placeholder="Start writing Markdown..."
        value={markdownText}
        onChange={handleInputChange}
        onKeyDown={handleTabKey}
        ref={textareaRef}
      ></textarea>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2 text-black">Rendered Output:</h2>
        <div className="border border-gray-300 rounded-lg p-4 text-black">
          <ReactMarkdown
            remarkPlugins={[gfm]}
            components={components}
            className="whitespace-pre-wrap"
            children={preprocessMarkdown(markdownText)}
          />
        </div>
      </div>
    </div>
  );
}
