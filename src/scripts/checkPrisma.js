import 'dotenv/config';
import { prisma } from '../config/prisma.js';

async function main(){
  try{
    const rows = await prisma.test.findMany();
    console.log('rows:', rows);
  }catch(e){
    console.error('error:', e);
  }finally{
    await prisma.$disconnect();
  }
}

main();
