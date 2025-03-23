import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/deptAdmin";
// import  from "."; // Ensure the correct path to your Sequelize model

export async function POST(req) {
  try {
    const { name, email, password, role, department } = await req.json();

    console.log(name, email, password, role, department );
    

    // Validate required fields
    if (!name || !email || !password || !role || !department) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
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
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
