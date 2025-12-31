import { useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  const createPaste = async () => {
    const res = await fetch(`${API}/api/pastes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    setLink(data.url);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Pastebin Lite
        </h2>

        <textarea
          className="w-full h-40 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your paste content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Paste
        </button>

        {link && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Shareable link:</p>
            <a
              href={link}
              className="text-blue-600 break-all underline"
            >
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
