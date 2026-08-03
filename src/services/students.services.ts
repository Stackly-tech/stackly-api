import type { BaseStudentInterface } from "../repositories/stdents.repositart.interface.js";
import type { StudentRepositary } from "../repositories/student.repositarty.js";
import type { BaseServiceInterface } from "./base.service.interface.js";


export class StudentService implements BaseServiceInterface<any> {
    constructor(private StudentRepositary : BaseStudentInterface<any>) {}
    findById(id: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    create(dto: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    update(dto: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    patch(dto: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
   
    async findAll(): Promise<any[]> {
       return await this.StudentRepositary.findAll()
    }
    
    
}