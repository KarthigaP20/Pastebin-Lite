import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/api/pastes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setContent(data.content))
      .catch(() => setError("Paste expired or not found"));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <pre className="whitespace-pre-wrap break-words text-gray-800">
            {content}
          </pre>
        )}
      </div>
    </div>
  );
}
