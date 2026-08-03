import type { PrismaClient } from "../generated/prisma/client.js";
import type { BaseStudentInterface } from "./stdents.repositart.interface.js";

export class StudentRepositary implements BaseStudentInterface<any>{
    constructor(private prisma: PrismaClient) {}
    findAll(): Promise<any[]> {
        return this.prisma.studentsmarks.findMany()
    }
    
}