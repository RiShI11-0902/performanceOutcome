'use client'
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { SchemeSetter } from "../components/SchemeSetter";



const Dashboard = () => {
  const [open, setOpen] = useState()


  return (
    <div className="flex h-screen">
      <Sidebar />

      <SchemeSetter/>
    </div>
  );
};

export default Dashboard;
