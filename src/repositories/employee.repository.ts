import { type BaseRepositoryInterface } from "./base.repository.interface.js";
import { type PrismaClient } from "#generated/prisma/client.js";
export class EmployeeRepository implements BaseRepositoryInterface<any> {
  constructor(private prisma: PrismaClient) {}
  findAll = (): Promise<any[]> => {
    return this.prisma.employee.findMany();
  };
  findById = (id: number): Promise<any> => {
    return this.prisma.employee.findFirst({ where: { id: id } });
  };
  create = (test: any): Promise<any> => {
    return this.prisma.employee.create(test);
  };
  update = (test: any): Promise<any> => {
    return this.prisma.employee.update(test);
  };
  delete = (id: any): Promise<any> => {
    return this.prisma.employee.delete(id);
  };
}
