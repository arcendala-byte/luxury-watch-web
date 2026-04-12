const { PrismaClient } = require('@prisma/client');
(async ()=>{
  const prisma=new PrismaClient();
  const products=await prisma.product.findMany();
  console.log(products);
  await prisma.$disconnect();
})();
