import { BaseController } from "./base.controller.js";
export class TestController extends BaseController {
    constructor(service){
        super();
        this.service = service;
    }
getAll = async (req,res)=>{
const data = await this.service.getAll();
this.ok(res,data,"");
 }  
// async getById(req,res){

//  }
//  create(req,res){

//  }
//  update(req,res){

//  } 
//  patch(req,res){

//  }
//  delete(req,res){

//  }
}