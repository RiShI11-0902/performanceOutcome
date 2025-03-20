import { FiMenu, FiBook, FiHome } from "react-icons/fi";

const Sidebar = ({ toggleSidebar, setopenAllocation, openAllocation }) => {

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <nav>
        <button className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 w-full">
          <FiHome /> Home
        </button>
        <button onClick={()=> setopenAllocation(false)} className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 w-full">
          <FiBook /> Add Courses
        </button>
        <button onClick={()=> setopenAllocation(true)} className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 w-full">
          <FiBook /> Add Teachers
        </button>
      </nav>
    </div>
  );
};

export default Sidebar