"use client";
import { useState } from "react";
import AddGoalForm from "@/components/AddGoalForm";
import GoalList from "@/components/GoalList";

export default function DashboardContent() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleGoalAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Your Goals</h1>

      {/* Add Goal Form */}
      <AddGoalForm onGoalAdded={handleGoalAdded} />

      {/* Goal List */}
      <GoalList key={refreshKey} />
    </div>
  );
}
