
import { IRepository } from "#common/interfaces/IRepository.js";
import { type PrismaClient } from "#generated/prisma/client.js";
import { type studentDelegate } from "#generated/prisma/models.js";



export class StudentRepository implements IRepository<any> {
  private db: studentDelegate;
  constructor(private prisma: PrismaClient) {
    this.db = this.prisma.student;
  }
  findAll = (prismaQuery: any): Promise<any[]> => {
    return this.db.findMany(prismaQuery);
  };
  aggregate = (args: any): Promise<any> => {
    return this.db.aggregate(args);
  };
  findById = (id: number): Promise<any> => {
    return this.db.findFirst();
  };
  create = (test: any): Promise<any> => {
    return this.db.create(test);
  };
  update = (test: any): Promise<any> => {
    return this.db.update(test);
  };
  delete = (id: any): Promise<any> => {
    return this.db.delete(id);
  };
  groupBy = (args: any): Promise<any> => {
    return this.db.groupBy(args);
  };
}