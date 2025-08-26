"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

export default function AddGoalForm({
  onGoalAdded,
}: {
  onGoalAdded: () => void;
}) {
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState<number | "">("");
  const [deadline, setDeadline] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkDesc, setLinkDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const goalRes = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, targetAmount, deadline }),
      });
      const goalData = await goalRes.json();

      if (goalRes.ok && linkUrl) {
        await fetch(`/api/goals/${goalData.id}/links`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: linkUrl, description: linkDesc }),
        });
      }

      toast.success("Goal added!");
      setTitle("");
      setTargetAmount("");
      setDeadline("");
      setLinkUrl("");
      setLinkDesc("");
      onGoalAdded();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen flex items-center justify-center p-4">
      <Toaster />
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full p-6 bg-gray-800 dark:bg-gray-900 rounded-lg shadow-lg space-y-4"
      >
        <h2 className="text-xl font-semibold text-white">Add New Goal</h2>
        <input
          type="text"
          placeholder="Goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Target Amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(Number(e.target.value))}
          required
          className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="First link (optional)"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Link description (optional)"
          value={linkDesc}
          onChange={(e) => setLinkDesc(e.target.value)}
          className="w-full px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 px-4 rounded text-white font-semibold"
        >
          {loading ? "Saving..." : "Add Goal"}
        </button>
      </form>
    </div>
  );
}
