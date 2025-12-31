import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL; // Make sure this points to your deployed backend

export default function ViewPaste() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaste = async () => {
      setLoading(true);
      setError("");
      setContent("");

      try {
        const res = await fetch(`${API}/api/pastes/${id}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          setError(errData.error || "Paste expired or not found");
          return;
        }
        const data = await res.json();
        setContent(data.content);
      } catch (err) {
        console.error(err);
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading paste...</p>
        ) : error ? (
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
