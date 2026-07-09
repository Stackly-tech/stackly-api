import { BaseController } from "./base.controller.js";
import { createTestSchema } from "../validations/test.validator.js";
import { testDto } from "../dtos/test.dto.js";
export class TestController extends BaseController {
    constructor(service){
        super();
        this.service = service;
    }
getAll = async (req,res)=>{
const data = await this.service.getAll();
this.ok(res,testDto(data),"");
 }  
// async getById(req,res){

//  }
 create(req,res){
const {error} = createTestSchema.validate(req.body);
if(error){
    this.unprocessable()
}
 }
//  update(req,res){

//  } 
//  patch(req,res){

//  }
//  delete(req,res){

//  }
}