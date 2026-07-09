export class TestService {
 constructor(repository){
this.repository = repository;
 }   
 getAll = async ()=>{
return this.repository.findAll();
 }
 
  create = async (training)=> {
        return this.repository.create(training);
    }

} 