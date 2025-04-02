import { Subject } from "@/app/models/schemeModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { formData } = await req.json();
    console.log(formData);

    const newSubject = await Subject.create({
      courseCode: formData.courseCode,
      totalMarks: formData.totalMarks,
      internal: formData.internal,
      external: formData.external,
      practicals: formData.practicals,
      credits: formData.credits,
      lectures: formData.lectures,
      courseOutcome: formData.courseOutcome,
      electives: formData.electives,
    });


    console.log(newSubject);
    

    return NextResponse.json({success: true})
  } catch (error) {
    console.log(error);
  }
}
