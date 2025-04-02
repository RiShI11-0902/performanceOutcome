import { Batch } from "@/app/models/schemeModel";
import Teacher from "@/app/models/teacherModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { pId } = await req.json();

    const findTeacher = await Teacher.findAll({where:{programId: pId}})
    const findBatch = await Batch.findAll({where:{programId: pId}})
    console.log(findTeacher);
    
    return NextResponse.json({success: true,  teachers: findTeacher, batch: findBatch})
  } catch (error) {
    console.log(error);
  }
}
