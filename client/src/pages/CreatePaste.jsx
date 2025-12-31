import { useState } from "react";

const API = import.meta.env.VITE_API_URL; // Ensure this is set to your Render backend in .env

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  const createPaste = async () => {
    setError(""); // Reset error
    setLink(""); // Reset previous link

    if (!content.trim()) {
      setError("Content cannot be empty.");
      return;
    }

    try {
      const res = await fetch(`${API}/api/pastes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "Failed to create paste.");
        return;
      }

      const data = await res.json();
      setLink(data.url);
      setContent(""); // Clear textarea after success
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Pastebin Lite</h2>

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

        {error && (
          <p className="mt-4 text-center text-red-500">{error}</p>
        )}

        {link && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Shareable link:</p>
            <a
              href={link}
              className="text-blue-600 break-all underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
