import { IRepository } from "#/common/interfaces/IRepository.js";
import { type PrismaClient } from "#/generated/prisma/client.js";
import { type UserDelegate } from "#/generated/prisma/models.js";

export class UserRepository extends IRepository<any> {
  private db: UserDelegate;
  constructor(private prisma: PrismaClient) {
    super();
    this.db = this.prisma.user;
  }

  findAll = async (prismaQuery: any): Promise<any> => {
    const [rows, total] = await this.prisma.$transaction([
      this.db.findMany(prismaQuery),
      this.db.count({ where: prismaQuery.where }),
    ]);
    return {
      rows,
      total,
    };
  };

  aggregate = (args: any): Promise<any> => {
    return this.db.aggregate(args);
  };

  findById = (_id: number | string): Promise<any> => {
    return this.db.findFirst();
  };

  create = (data: any): Promise<any> => {
    return this.db.create({ data });
  };

  update = (data: any): Promise<any> => {
    console.log("🚀 ~ UserRepository ~ data:", data);
    return this.db.update({ where: { id: data.id }, data: data.data });
  };

  delete = (_id: any): Promise<any> => {
    return this.db.delete(_id);
  };

  groupBy = (args: any): Promise<any> => {
    return this.db.groupBy(args);
  };

  findUnique = (args: any): Promise<any> => {
    return this.db.findUnique(args);
  };

  findFirst(args: any): Promise<any> {
    return this.db.findFirst(args);
  }
}
