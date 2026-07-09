
export class TestRepository {

    constructor(prisma) {
        // prisma client injected — avoid calling queries in constructor
        console.log("prisma client injected")
        this.prisma = prisma;
    }

    findAll = ()=> {
        return this.prisma.test.findMany();
    }

    create = (data)=> {
    return this.prisma.test.create({data})
    }
}
