import React, { useState } from "react";

const Random = () => {
  const [length, setLength] = useState(12);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generateString = () => {
    let chars = "";
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{};:,.<>?";

    if (chars.length === 0) {
      alert("Please select at least one option!");
      return;
    }

    let randomStr = "";
    for (let i = 0; i < length; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setResult(randomStr);
    setCopied(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
        Random String Generator
      </h2>

      {/* Length Selection */}
      <label className="block font-semibold mb-2">Length: {length}</label>
      <input
        type="range"
        min="4"
        max="40"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className="w-full mb-4"
      />

      {/* Options */}
      <div className="space-y-2 mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={() => setIncludeUpper(!includeUpper)}
          />
          <span>Include Uppercase Letters</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeLower}
            onChange={() => setIncludeLower(!includeLower)}
          />
          <span>Include Lowercase Letters</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          <span>Include Numbers</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          <span>Include Symbols</span>
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateString}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
      >
        Generate
      </button>

      {/* Output */}
      {result && (
        <div className="mt-4 p-3 bg-gray-100 border rounded-lg flex items-center justify-between">
          <span className="break-all">{result}</span>
          <button
            onClick={copyText}
            className="ml-4 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Random;
