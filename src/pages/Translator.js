import React, { useState, useCallback, useEffect } from "react";

function Translator() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [language, setLanguage] = useState("hi");
  const [dark, setDark] = useState(false);

  // AVAILABLE LANGUAGES
  const languages = {
    hi: "Hindi",
    ur: "Urdu",
    ar: "Arabic",
    fr: "French",
    es: "Spanish",
    de: "German",
    ta: "Tamil",
    kn: "Kannada",
    ml: "Malayalam",
    gu: "Gujarati",
    bn: "Bengali",
  };

  // 🔵 TRANSLATION API
  const translateText = useCallback(async () => {
    if (!text) {
      setTranslated("");
      return;
    }

    try {
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          text
        )}&langpair=en|${language}`
      );

      const data = await res.json();
      setTranslated(data.responseData.translatedText);
    } catch (error) {
      setTranslated("⚠️ Translation error!");
    }
  }, [text, language]);

  useEffect(() => {
    translateText();
  }, [translateText]);

  // 🔵 COPY BUTTON
  const copyToClipboard = () => {
    navigator.clipboard.writeText(translated);
    alert("Copied!");
  };

  // 🔵 TEXT TO SPEECH
  const speakText = () => {
    if (!translated) return;
    const speech = new SpeechSynthesisUtterance(translated);
    speech.lang = language;
    window.speechSynthesis.speak(speech);
  };

  // 🔵 SPEECH TO TEXT
  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };

    recognition.start();
  };

  return (
    <div className={dark ? "bg-gray-900 min-h-screen text-white p-6" : "p-6"}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🌍 Advanced Translator</h1>

        {/* DARK MODE SWITCH */}
        <button
          onClick={() => setDark(!dark)}
          className="px-4 py-2 border rounded"
        >
          {dark ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* INPUT AREA */}
      <textarea
        className="w-full p-3 border rounded mb-4 text-black"
        rows="4"
        placeholder="Enter English text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* LANGUAGE SELECTOR */}
      <select
        className="p-2 border rounded mb-4 text-black"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {Object.entries(languages).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>

      {/* VOICE INPUT BUTTON */}
      <button
        onClick={startVoiceInput}
        className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        🎤 Speak
      </button>

      {/* OUTPUT */}
      <h2 className="text-xl font-semibold mt-4 mb-2">Translated Output:</h2>

      <div className="w-full p-3 border rounded bg-gray-100 text-black min-h-[80px]">
        {translated}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={copyToClipboard}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          📋 Copy
        </button>

        <button
          onClick={speakText}
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          🔊 Speak
        </button>
      </div>
    </div>
  );
}

export default Translator;
