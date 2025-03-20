"use client"
import { useState } from "react";

export default function TeacherAllocation() {
  const [semester, setSemester] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    teacherName: "",
    courseName: "",
    courseCode: "",
    className: "",
    section: "",
    isCoordinator: false,
    isClassIncharge: false,
    semester: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTeachers([...teachers, formData]);
    setFormData({
      teacherName: "",
      courseName: "",
      courseCode: "",
      className: "",
      section: "",
      isCoordinator: false,
      isClassIncharge: false,
      semester: "",
      batch:""
    });
  };

  return (
    <div className="flex min-h-screen">


      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-xl font-bold text-center">Add Teachers</h1>
        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input type="text" name="teacherName" placeholder="Teacher Name" value={formData.teacherName} onChange={handleChange} className="border p-2 w-full" required />
          <input type="text" name="courseName" placeholder="Course Name" value={formData.courseName} onChange={handleChange} className="border p-2 w-full" required />
          <input type="text" name="courseCode" placeholder="Course Code" value={formData.courseCode} onChange={handleChange} className="border p-2 w-full" required />
          <input type="text" name="className" placeholder="Class" value={formData.className} onChange={handleChange} className="border p-2 w-full" required />
          <input type="text" name="section" placeholder="Section" value={formData.section} onChange={handleChange} className="border p-2 w-full" required />
          <input type="text" name="batch" placeholder="Batch" value={formData.batch} onChange={handleChange} className="border p-2 w-full" required />
          <label className="flex items-center">
            <input type="checkbox" name="isCoordinator" checked={formData.isCoordinator} onChange={handleChange} className="mr-2" />
            Course Coordinator
          </label>
          
          <label className="flex items-center">
            <input type="checkbox" name="isClassIncharge" checked={formData.isClassIncharge} onChange={handleChange} className="mr-2" />
            Class Incharge
          </label>
          
          <select name="semester" value={formData.semester} onChange={handleChange} className="border p-2 w-full">
            <option value="">-- Select Semester --</option>
            <option value="Semester 1">Semester 1</option>
            <option value="Semester 2">Semester 2</option>
            <option value="Semester 3">Semester 3</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">Add Teacher</button>
        </form>

        <div className="mt-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Teacher Name</th>
                <th className="border p-2">Course Name</th>
                <th className="border p-2">Course Code</th>
                <th className="border p-2">Class</th>
                <th className="border p-2">Section</th>
                <th className="border p-2">Course Coordinator</th>
                <th className="border p-2">Class Incharge</th>
                <th className="border p-2">Semester</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td className="border p-2">{teacher.teacherName}</td>
                  <td className="border p-2">{teacher.courseName}</td>
                  <td className="border p-2">{teacher.courseCode}</td>
                  <td className="border p-2">{teacher.className}</td>
                  <td className="border p-2">{teacher.section}</td>
                  <td className="border p-2 text-center">{teacher.isCoordinator ? "Yes" : "No"}</td>
                  <td className="border p-2 text-center">{teacher.isClassIncharge ? "Yes" : "No"}</td>
                  <td className="border p-2">{teacher.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}