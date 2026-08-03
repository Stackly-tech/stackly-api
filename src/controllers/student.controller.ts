// import type { Request, Response, ErrorRequestHandler } from "express";import type { BaseController } from "./base.controller.js";
// import type { BaseStudentInterface } from "../services/base.student.interface.js";
// export class StudentContoller implements BaseController {
//     constructor(private studentServices : BaseStudentInterface<any>) {}

//     findAll = async(req : Request, res: Response) => {
//         const result = await this.studentServices.findAll();
//         return this.ok(res, result)
//     }

// }

import type { Request, Response } from "express";
import { BaseController } from "./base.controller.js";
import type { BaseStudentInterface } from "../services/base.student.interface.js";

export class StudentContoller extends BaseController {
    constructor(private studentServices: BaseStudentInterface<any>) {
        super();
    }

    findAll = async (req: Request, res: Response) => {
        const result = await this.studentServices.findAll();
        return this.ok(res, result);
    };
}