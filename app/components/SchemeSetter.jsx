"use client";

import axios from "axios";
import { useState } from "react";
import { FiMenu, FiBook, FiHome } from "react-icons/fi";
export default function SchemeSetter() {
  //  const [isSidebarOpen, setSidebarOpen] = useState(true);
  // const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const [program, setProgram] = useState("");
  const [batchYear, setBatchYear] = useState("");
  const [semesters, setSemesters] = useState(0);
  const [courses, setCourses] = useState({});
  const [isProgramAdded, setIsProgramAdded] = useState(false)
  const [data, setData] = useState(null)

  const handleAddProgram = async () => {
    ///batchYear,semesters,
    console.log(program, batchYear, semesters);
    
    try {
      const res = await axios.post("/api/addProgram", { program, batchYear, semesters, userId: 'ed26328b-d72f-4ab1-997a-2363d4a08eab' })
      console.log(res);
      if (res.status == 200) {
        setIsProgramAdded(true)
        setData(res.data)
      }

    } catch (error) {
      console.log(error);
    }
    // const newProgram = { ...courses };
    // for (let i = 1; i <= semesters; i++) {
    //   if (!newProgram[i]) newProgram[i] = [];
    // }
    // setCourses(newProgram);
  };

  const [formData, setFormData] = useState({
    semester: "",
    courseCode: "",
    totalMarks: "",
    internal: "",
    external: "",
    practicals: "",
    credits: "",
    lectures: "",
    courseOutcome: "",
    electives: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const semester = formData.semester;
    // if (semester && courses[semester]) {
    //   setCourses({ ...courses, [semester]: [...courses[semester], formData] });
    // }

    try {
      const res = await axios.post("/api/addSubject", {formData})
      if (res.data == 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    console.log(formData);

    setFormData({
      semester: "",
      courseCode: "",
      totalMarks: "",
      internal: "",
      external: "",
      practicals: "",
      credits: "",
      lectures: "",
      courseOutcome: "",
      electives: ""
    });
  };

  return <div className="flex h-screen">
    {
      <div className="flex-1 p-5">
        <h1 className="text-3xl font-bold my-4">Course Scheme</h1>
        <div className="mb-4 flex flex-row w-full items-center justify-center space-x-5">
          <label htmlFor="">Program Name</label>
          <select type="text" placeholder="Program Name (e.g., MCA, MTech)" className="border p-2 mr-2" value={program} onChange={(e) => setProgram(e.target.value)} required>
          <option value="">Select Program</option>
            <option value="MCA">MCA</option>
            <option value="BCA">BCA</option>
          </select>
          {/* <input type="text" placeholder="Program Name (e.g., MCA, MTech)" className="border p-2 mr-2" value={program} onChange={(e) => setProgram(e.target.value)} required /> */}
          <label htmlFor="">Batch Year</label>
          <select type="text" placeholder="Batch Year" className="border p-2 mr-2" value={batchYear} onChange={(e) => setBatchYear(e.target.value)} required>
          <option value="">Select Batch</option>
            <option value="2025-2026">2025 - 2026</option>
            <option value="2026-2027">2026 - 2027</option>
          </select>
          {/* <input type="text" placeholder="Batch Year" className="border p-2 mr-2" value={batchYear} onChange={(e) => setBatchYear(e.target.value)} required /> */}
          <label htmlFor="">No. of Semesters</label>
          <select  type="number" placeholder="Number of Semesters" className="border p-2" value={semesters} onChange={(e) => setSemesters(e.target.value)} required >
          <option value="">Select Semesters</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="8">8</option>
          </select>
          {/* <input/> */}
          <button onClick={handleAddProgram} className="ml-2 bg-blue-500 text-white p-2 rounded-md">Add Program</button>
        </div>



        <div>
          {
            isProgramAdded && <form className="mb-4 grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <select name="semester" onChange={handleChange} value={formData.semester || 1} disabled={!data?.batch?.totalSemesters}>
                {
                  data?.batch?.totalSemesters ? (
                    Array.from({ length: data.batch.totalSemesters }).map((_, k) => (
                      <option key={k} value={k + 1}>Semester {k + 1}</option>
                    ))
                  ) : (
                    <option value="">No Semesters Available</option>
                  )
                }
              </select>

              {/* <input type="number" name="semester" placeholder="Semester" className="border p-2" value={formData.semester} onChange={handleChange} required /> */}
              <input type="text" name="courseCode" placeholder="Course Code" className="border p-2" value={formData.courseCode} onChange={handleChange} required />
              <input type="text" name="nameofcourse" placeholder="Name of Course" className="border p-2" value={formData.nameofcourse} onChange={handleChange} required />
              <input type="number" name="totalMarks" placeholder="Total Marks" className="border p-2" value={formData.totalMarks} onChange={handleChange} required />
              <input type="number" name="internal" placeholder="Internal Marks" className="border p-2" value={formData.internal} onChange={handleChange} required />
              <input type="number" name="external" placeholder="External Marks" className="border p-2" value={formData.external} onChange={handleChange} required />
              <input type="text" name="practicals" placeholder="Practicals (Yes/No)" className="border p-2" value={formData.practicals} onChange={handleChange} required />
              <input type="number" name="credits" placeholder="Credits" className="border p-2" value={formData.credits} onChange={handleChange} required />
              <input type="number" name="lectures" placeholder="Lectures" className="border p-2" value={formData.lectures} onChange={handleChange} required />
              <input type="text" name="courseOutcome" placeholder="Course Outcome" className="border p-2" value={formData.courseOutcome} onChange={handleChange} required />
              <input type="text" name="electives" placeholder="Elective Subjects" className="border p-2" value={formData.electives} onChange={handleChange} />
              <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded-md">Add Course</button>
            </form>

            // {Object.keys(courses).map((semester) => (
            //   <div key={semester} className="mt-6">
            //     <h2 className="text-xl font-bold">Semester {semester}</h2>
            //     <table className="w-full border-collapse border border-gray-300 mt-2">
            //       <thead>
            //         <tr className="bg-gray-200">
            //           <th className="border p-2">Course Code</th>
            //           <th className="border p-2">Name of Course</th>
            //           <th className="border p-2">Total Marks</th>
            //           <th className="border p-2">Internal</th>
            //           <th className="border p-2">External</th>
            //           <th className="border p-2">Practicals</th>
            //           <th className="border p-2">Credits</th>
            //           <th className="border p-2">Lectures</th>
            //           <th className="border p-2">Course Outcome</th>
            //           <th className="border p-2">Electives</th>
            //         </tr>
            //       </thead>
            //       <tbody>
            //         {courses[semester].map((course, index) => (
            //           <tr key={index}>
            //             <td className="border p-2">{course.courseCode}</td>
            //             <td className="border p-2">{course.nameofcourse}</td>
            //             <td className="border p-2">{course.totalMarks}</td>
            //             <td className="border p-2">{course.internal}</td>
            //             <td className="border p-2">{course.external}</td>
            //             <td className="border p-2">{course.practicals}</td>
            //             <td className="border p-2">{course.credits}</td>
            //             <td className="border p-2">{course.lectures}</td>
            //             <td className="border p-2">{course.courseOutcome}</td>
            //             <td className="border p-2">{course.electives}</td>
            //           </tr>
            //         ))}
            //       </tbody>
            //     </table>
            //   </div>
            // ))} : " "
          }
        </div>
      </div>

    }


  </div>
}

// export default function CourseScheme() {
//   const router = useRouter();
//   const [scheme, setScheme] = useState("MCA");
//   const [batch, setBatch] = useState("2024-2025");
//   const [formData, setFormData] = useState({
//     semester: "",
//     courseCode: "",
//     nameofcourse: "",
//     totalMarks: "",
//     internal: "",
//     external: "",
//     practicals: "",
//     credits: "",
//     lectures: "",
//     courseOutcome: "",
//     electives: "",
//   });
//   const [courses, setCourses] = useState([]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setCourses([...courses, { ...formData, scheme, batch }]);
//     setFormData({
//       semester: "",
//       courseCode: "",
//       nameofcourse: "",
//       totalMarks: "",
//       internal: "",
//       external: "",
//       practicals: "",
//       credits: "",
//       lectures: "",
//       courseOutcome: "",
//       electives: "",
//     });
//   };

//   return (
//     <div className="flex-1 p-5">
//       <h1 className="text-3xl font-bold my-4">Course Scheme</h1>

//       <form className="mb-4" onSubmit={handleSubmit}>
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="border p-2">Scheme</th>
//               <th className="border p-2">Batch</th>
//               <th className="border p-2">Semester</th>
//               <th className="border p-2">Course Code</th>
//               <th className="border p-2">Name of Course</th>
//               <th className="border p-2">Total Marks</th>
//               <th className="border p-2">Internal</th>
//               <th className="border p-2">External</th>
//               <th className="border p-2">Practicals</th>
//               <th className="border p-2">Credits</th>
//               <th className="border p-2">Lectures</th>
//               <th className="border p-2">Course Outcome</th>
//               <th className="border p-2">Electives</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border p-2">
//                 <select className="border p-2" value={scheme} onChange={(e) => setScheme(e.target.value)}>
//                   <option value="MCA">MCA</option>
//                   <option value="MBA">MBA</option>
//                 </select>
//               </td>
//               <td className="border p-2">
//                 <select className="border p-2" value={batch} onChange={(e) => setBatch(e.target.value)}>
//                   <option value="2024-2025">2024-2025</option>
//                 </select>
//               </td>
//               <td className="border p-2"><input type="number" name="semester" value={formData.semester} onChange={handleChange} required /></td>
//               <td className="border p-2"><input type="text" name="courseCode" value={formData.courseCode} onChange={handleChange} required /></td>
//               <td className="border p-2"><input type="text" name="nameofcourse" value={formData.nameofcourse} onChange={handleChange} required /></td>
//               <td className="border p-2"><input type="number" name="totalMarks" value={formData.totalMarks} onChange={handleChange} required /></td>
//               <td className="border p-2"><input type="number" name="internal" value={formData.internal} onChange={handleChange} required /></td>
//               <td className="border p-2"><input type="number" name="external" value={formData.external} onChange={handleChange} required /></td>
//               <td className="border p-2"><input type="text" name="practicals" value={formData.practicals} onChange={handleChange} required /></td>
//               <td className="border p-2"><input type="number" name="credits" value={formData.credits} onChange={handleChange} required /></td>
//               <td className="border p-2"><input type="number" name="lectures" value={formData.lectures} onChange={handleChange} required /></td>
//               <td className="border p-2"><input type="text" name="courseOutcome" value={formData.courseOutcome} onChange={handleChange} required /></td>
//               <td className="border p-2"><input type="text" name="electives" value={formData.electives} onChange={handleChange} /></td>
//               <td className="border p-2"><button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Add</button></td>
//             </tr>
//           </tbody>
//         </table>
//       </form>

//       {courses.length > 0 && (
//         <table className="w-full border-collapse border border-gray-300 mt-4">
//           <tbody>
//             {courses.map((course, index) => (
//               <tr key={index}>
//                 <td className="border p-2">{course.scheme}</td>
//                 <td className="border p-2">{course.batch}</td>
//                 <td className="border p-2">{course.semester}</td>
//                 <td className="border p-2">{course.courseCode}</td>
//                 <td className="border p-2">{course.nameofcourse}</td>
//                 <td className="border p-2">{course.totalMarks}</td>
//                 <td className="border p-2">{course.internal}</td>
//                 <td className="border p-2">{course.external}</td>
//                 <td className="border p-2">{course.practicals}</td>
//                 <td className="border p-2">{course.credits}</td>
//                 <td className="border p-2">{course.lectures}</td>
//                 <td className="border p-2">{course.courseOutcome}</td>
//                 <td className="border p-2">{course.electives}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
