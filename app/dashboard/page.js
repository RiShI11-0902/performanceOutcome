"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SchemeSetter  from "../components/SchemeSetter";
import TeacherAllocation from "../components/TeacherAllocation";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const [openComponent, setOpenComponent] = useState(null);
  const [unlockedSteps, setUnlockedSteps] = useState(1); // Initially, only 1st box is accessible
  const router = useRouter();

  const components = [
    { name: "Schemes", component: <SchemeSetter /> },
    { name: "Allocate Teachers", component: <TeacherAllocation /> },
    { name: "Teacher Performance", component: <TeacherAllocation /> },
    { name: "Student Performance", component: <TeacherAllocation /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 p-10">

        {openComponent !== null ? (
          <div className="flex flex-col items-center justify-center h-full">
            {components[openComponent].component}
            <Button 
              className="mt-4" 
              onClick={() => setOpenComponent(null)}
            >
              Back to Dashboard
            </Button>
          </div>
        ) : (
          // Show selection boxes
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {components.map((item, key) => (
              <Card
                key={key}
                className={`border p-10 shadow-md flex justify-center items-center text-center 
                  ${key < unlockedSteps ? "cursor-pointer" : "opacity-50 pointer-events-none"}
                `}
              >
                <CardContent>
                  <h3 className="text-2xl font-bold">{item.name}</h3>
                  <Button 
                    onClick={() => {
                      setOpenComponent(key);
                      setUnlockedSteps((prev) => Math.max(prev, key + 2)); // Unlock next
                    }} 
                    className="mt-2"
                  >
                    Open
                  </Button>
                  <p className="text-sm text-gray-600 mt-5">
                    Details about {item.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
