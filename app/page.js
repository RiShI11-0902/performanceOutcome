"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#09122C] via-[#BE3144] to-[#872341] text-white">
      {/* Hero Section */}
      <div className="text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Student Marks & Course Outcomes
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Track your marks, analyze performance, and understand course outcomes to improve your learning.
        </p>
        <button
          onClick={() => router.push("/register")}
          className="bg-white text-[#09122C] font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-200 transition-all"
        >
          Get Started
        </button>
      </div>

      {/* Performance Overview */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 px-6 max-w-5xl">
        <FeatureCard
          title="📊 Marks Analysis"
          description="View subject-wise performance, trends, and improvement areas."
        />
        <FeatureCard
          title="📖 Course Outcomes"
          description="Understand how each course impacts your academic progress."
        />
      </div>
    </div>
  );
}

const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-white bg-opacity-20 p-6 rounded-xl shadow-md text-center backdrop-blur-md">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
};
