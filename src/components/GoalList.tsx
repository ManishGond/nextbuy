"use client";
import { useEffect, useState } from "react";

type Goal = {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  links: { id: string; url: string; description?: string }[];
};

export default function GoalList() {
  const [goals, setGoals] = useState<Goal[]>([]);

  const fetchGoals = async () => {
    try {
      const res = await fetch("/api/goals");

      if (!res.ok) {
        // handle HTTP errors
        console.error("Failed to fetch goals:", res.statusText);
        return;
      }

      const text = await res.text();

      if (!text) {
        setGoals([]); // no goals yet
        return;
      }

      const data = JSON.parse(text);
      setGoals(data);
    } catch (err) {
      console.error("Failed to fetch goals:", err);
      setGoals([]);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="space-y-4 max-w-3xl mx-auto mt-6">
      {goals.length === 0 && <p>No goals yet. Add one!</p>}
      {goals.map((goal) => {
        const progress = Math.min(
          (goal.currentAmount / goal.targetAmount) * 100,
          100
        );
        return (
          <div key={goal.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">{goal.title}</h2>
            <p>
              Saved: ${goal.currentAmount} / ${goal.targetAmount} | Deadline:{" "}
              {new Date(goal.deadline).toLocaleDateString()}
            </p>
            <div className="w-full bg-gray-200 h-4 rounded-full mt-2">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            {goal.links.length > 0 && (
              <ul className="mt-2 space-y-1">
                {goal.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      {link.description || link.url}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
