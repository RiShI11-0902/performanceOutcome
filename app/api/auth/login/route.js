import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// import User from "@/app/models/user";
import User from "@/app/models/deptAdmin";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    console.log(email,password);
    

    // Check if user already exists
    const FindUser = await User.findOne({ where: { email } });

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Compare password

    bcrypt.compare(password, FindUser.password)
      .then(isCorrect => {
        if (isCorrect) {
          return NextResponse.json(
            { message: "User registered successfully", user: { email: newUser.email } },
            { status: 201 }
          );
        } else {
          return NextResponse.json({ error: "Incorrect Paaword" }, { status: 400 });
        }
      })
      .catch(err => console.error("Error:", err));
    
   
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
