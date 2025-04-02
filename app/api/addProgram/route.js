import{ Program, Batch, Semester }from "@/app/models/schemeModel";
import { NextResponse } from "next/server";
//
export async function POST(req){
    const {program,batchYear,semesters,userId} = await req.json()
    console.log({program,batchYear,semesters,userId});
    
    if(!program || !batchYear || !semesters){
        return NextResponse.json({success: false, error: 'Please Provide all Details'})
    }

    const newProgram = await Program.create({
        name: program,
        userId: userId
    })

    console.log(newProgram);


    // const newBatch = await Batch.create({
    //     name:batchYear,
    //     totalSemesters:semesters,
    //     programId: newProgram.id
    // })

    // const batchId = newBatch.id

    // const genereateSem = async () => {
    //     for (let i = 1; i <= semesters; i++) {
    //         await Semester.create({
    //             number: i,
    //             batchId: batchId
    //         })
    //     }
    // }

    // genereateSem()
    
    // return NextResponse.json({succes: true, programId: newProgram.id, batch:newBatch})
// 
    // console.log(program,batchYear,semesters);
}