"use client";

import { useEffect, useState } from "react";

type DiaryEntry = {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO string
};

const STORAGE_KEY = "pink-diary-entries";

export default function DiaryPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  // 1) 로컬스토리지에서 불러오기
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: DiaryEntry[] = raw ? JSON.parse(raw) : [];
      setEntries(parsed);
    } catch {
      setEntries([]);
    } finally {
      setMounted(true);
    }
  }, []);

  // 2) entries가 바뀔 때마다 저장
  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries, mounted]);

  const handleAdd = () => {
    const t = title.trim();
    const c = content.trim();
    if (!t || !c) {
      alert("Please enter both a title and content!");
      return;
    }

    const newEntry: DiaryEntry = {
      id: crypto.randomUUID(),
      title: t,
      content: c,
      createdAt: new Date().toISOString(),
    };

    setEntries((prev) => [newEntry, ...prev]);
    setTitle("");
    setContent("");
  };

  const handleDelete = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString();
  };

  return (
    <main className="min-h-screen bg-pink-100 flex justify-center p-6">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">Pink Diary 💗</h1>

        {/* 작성 카드 */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            className="w-full border rounded-xl p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Today's title"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Content
          </label>
          <textarea
            className="w-full border rounded-xl p-3 h-40 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write about your day..."
          />

          <button
            onClick={handleAdd}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition"
          >
            Save
          </button>
        </div>

        {/* 리스트 */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <p className="text-gray-600 text-center">
              No diary entries yet. Start writing your story!
            </p>
          ) : (
            entries.map((e) => (
              <div key={e.id} className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {e.title}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(e.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(e.id)}
                    className="text-sm px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200"
                  >
                    Delete
                  </button>
                </div>

                <p className="mt-4 whitespace-pre-wrap text-gray-700">
                  {e.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}