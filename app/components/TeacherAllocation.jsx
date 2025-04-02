"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function TeacherAllocation() {
  const [teachers, setTeachers] = useState();
  const [batch, setBatch] = useState()
  const [step, setStep] = useState(1); // Controls form visibility
  const [formData, setFormData] = useState({
    teacherName: "",
    courseName: "",
    courseCode: "",
    className: "",
    section: "",
    batch: "",
    isCoordinator: false,
    isClassIncharge: false,
    semester: "",
  });

  const getTeachers = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/get-teachers", { pId: 8 })
      console.log(res);
      setTeachers(res.data.teachers)
      setBatch(res.data.batch)
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getTeachers()
  }, [])


  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle Teacher Submission
  const handleTeacherSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    if (formData.teacherName.trim() === "") {
      alert("Please enter the teacher's name.");
      return;
    }
    setTeachers([...teachers, { ...formData }]);
    setStep(2); // Move to next step (show all fields)
    console.log(formData);
  };

  const submitDetails = (e) => {
    e.preventDefault()
    console.log(formData);
  }

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <h1 className="text-xl font-bold text-center">Teacher Allocation</h1>

        {/* Step 1: Enter Teacher Name */}
        <form onSubmit={handleTeacherSubmit} className="mt-6 w-full space-y-4">
          <div className="flex flex-row space-x-5">

            <select className="p-2 " name="teacherName"
              placeholder="Enter Teacher Name"
              value={formData.teacherName}
              onChange={handleChange} id="">
              <option value="">Select Teacher</option>
              {/* <option value="rishi">rishi</option>
              <option value="aditya">aditya</option> */}

              {
                teachers?.map((i) => {
                  return <option value={i.name}>{i.name}</option>
                })
              }
            </select>
            <select className="p-2 " name="batch"
              placeholder="Enter Batch"
              value={formData.batch}
              onChange={handleChange} id="">
              {/* <option value="2024--205">2024-205</option>
              <option value="sem 1">1</option> */}

              <option value="">Select Batch</option>
              {
                batch?.map((i) => {
                  return <option value={i.name}>{i.name}</option>
                })
              }
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">
            Add Teacher
          </button>
        </form>

        {/* Step 2: Show Other Fields Only After Adding a Teacher */}
        {step === 2 && (
          <form className="mt-6 space-y-4">
            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="">-- Select Semester --</option>
              {/* <option value="sem 1">1</option>
              <option value="sem 1">2</option> */}

              {
                Array.from({ length: batch[0]?.totalSemesters }).map((_, idx) => {
                  return <option value={`Semester ${idx + 1}`}>{`Semester ${idx + 1}`}</option>
                })
              }
            </select>
            <input
              type="text"
              name="courseName"
              placeholder="Course Name"
              value={formData.courseName}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              name="courseCode"
              placeholder="Course Code"
              value={formData.courseCode}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              name="className"
              placeholder="Class"
              value={formData.className}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              name="section"
              placeholder="Section"
              value={formData.section}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <input
              type="text"
              name="batch"
              placeholder="Batch"
              value={formData.batch}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isCoordinator"
                checked={formData.isCoordinator}
                onChange={handleChange}
                className="mr-2"
              />
              Course Coordinator
            </label>
            <label className="flex items-center space-x-5">
              <input
                type="checkbox"
                name="isClassIncharge"
                checked={formData.isClassIncharge}
                onChange={handleChange}
                className="mr-2"
              />
              Class Incharge
              <input type="text" className="p-3" placeholder="Section" />
            </label>
            {/* <label className="flex items-center">
              <input
                type="checkbox"
                name="isSubjectTeacher"
                checked={formData.isSubjectTeacher}
                onChange={handleChange}
                className="mr-2"
              />
              Subject Teacher
            </label> */}


            <button onClick={submitDetails}>Submit</button>
          </form>
        )}
      </main>
    </div>
  );
}
