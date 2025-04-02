import { Batch } from "@/app/models/schemeModel";
import Teacher from "@/app/models/teacherModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { data } = await req.json();

    
    return NextResponse.json({success: true})
  } catch (error) {
    console.log(error);
  }
}
