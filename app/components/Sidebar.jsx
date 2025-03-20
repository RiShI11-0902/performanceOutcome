import { FiMenu, FiBook, FiHome } from "react-icons/fi";
import { Home, User, Settings, Book } from "lucide-react";

const Sidebar = ({ toggleSidebar, setopenAllocation, openAllocation, activeTab, setActiveTab }) => {
  const menuItems = [
    { name: "Home", icon: <Home size={20} /> },
    { name: "Teachers", icon: <User size={20} /> },
    { name: "Schemes", icon: <Book size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    // <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">
    //   <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
    //   <nav>
    //     <button className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 w-full">
    //       <FiHome /> Home
    //     </button>
    //     <button onClick={()=> setopenAllocation(false)} className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 w-full">
    //       <FiBook /> Add Courses
    //     </button>
    //     <button onClick={()=> setopenAllocation(true)} className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 w-full">
    //       <FiBook /> Add Teachers
    //     </button>
    //   </nav>
    // </div>
    <div className="w-64 bg-white shadow-lg p-5">
        <h2 className="text-xl font-bold mb-5">Dashboard</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                activeTab === item.name ? "bg-gray-200" : ""
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
  );
};

export default Sidebar