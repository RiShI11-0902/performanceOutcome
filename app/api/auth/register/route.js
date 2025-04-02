import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/deptAdmin";
// import Teacher from "@/app/models/teacher-model"
import { Program } from "@/app/models/schemeModel";
import Teacher from "@/app/models/teacherModel";
// import  from "."; // Ensure the correct path to your Sequelize model

export async function POST(req) {
  try {
    const { name, email, password, role, department } = await req.json();

    console.log(name, email, password, role, department );
    
    // Validate required fields
    if (!name || !email || !password || !role || !department) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if(role == 'Teacher'){
      const existingUser = await Teacher.findOne({ where: { email } });
      if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
      }
      const dept = await Program.findOne({ where: { name: department } });

      const hashedPassword = await bcrypt.hash(password, 10);

      console.log("hash Pass", hashedPassword);
      console.log("dep", dept.id);
      
      

      // Create the user with all necessary fields
      const newUser = await Teacher.create({
        name,
        email,
        password: hashedPassword, 
        programId: dept.id,
        department
      });

      // console.log(newUser);
      
      return NextResponse.json(
        { message: "User registered successfully", user: { name, email, role, department } },
        { status: 201 }
      );

    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with all necessary fields
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role, 
      department,
    });

    return NextResponse.json(
      { message: "User registered successfully", user: { name, email, role, department } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
