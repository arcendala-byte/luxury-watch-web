import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const watches = [
    {
      name: 'Apex Midnight',
      brand: 'Apex',
      slug: 'apex-midnight',
      price: '$14,200',
      image: '/apex-front.jpg',
      description: 'The Apex Midnight represents the pinnacle of dark aesthetics, featuring a brushed black steel case and deep sapphire crystal.',
      stock: 5,
    },
    {
      name: 'Apex Gold Edition',
      brand: 'Apex',
      slug: 'apex-gold',
      price: '$28,500',
      image: '/Apex_Watche.webp',
      description: 'A masterpiece of precision, the Gold Edition combines Apex engineering with 18k yellow gold accents.',
      stock: 3,
    },
    {
      name: 'Luna Silver',
      brand: 'Luna',
      slug: 'luna-silver',
      price: '$12,800',
      image: '/luna-front.jpg',
      description: 'Inspired by the moon, the Luna Silver features a moon-phase complication and a polished silver finish.',
      stock: 7,
    },
    {
      name: 'Heritage Classic',
      brand: 'Heritage',
      slug: 'heritage-classic',
      price: '$9,500',
      image: '/heritage.jpg',
      description: 'A timeless design that pays homage to the golden age of watchmaking.',
      stock: 12,
    },
    {
      name: 'Sky Aviator',
      brand: 'Aero',
      slug: 'sky-aviator',
      price: '$8,200',
      image: '/richard-front.jpg',
      description: 'A professional-grade pilot watch with high-contrast numerals and GMT functionality.',
      stock: 10,
    },
    {
      name: 'Nebula Tourbillon',
      brand: 'Celeste',
      slug: 'nebula-tourbillon',
      price: '$95,000',
      image: '/macro-watch.jpg',
      description: 'A gravity-defying tourbillon movement encased in a crystalline skeleton frame.',
      stock: 2,
    },
    {
      name: 'Ocean Master',
      brand: 'Marina',
      slug: 'ocean-master',
      price: '$11,400',
      image: '/watch1.jpg',
      description: 'Engineered for the depths, the Ocean Master features a 500m water resistance rating.',
      stock: 15,
    },
    {
      name: 'Vanguard Steel',
      brand: 'Vanguard',
      slug: 'vanguard-steel',
      price: '$7,900',
      image: '/watch2.jpg',
      description: 'Robust and reliable, the Vanguard Steel is the ultimate everyday companion for the modern explorer.',
      stock: 20,
    },
    {
      name: 'Eclipse Shadow',
      brand: 'Photon',
      slug: 'eclipse-shadow',
      price: '$18,600',
      image: '/watch3.jpg',
      description: 'A limited edition model featuring ultra-black coating and luminous complications.',
      stock: 4,
    },
  ];

  console.log('Cleaning up existing products...');
  await prisma.orderItem.deleteMany({});
  await prisma.product.deleteMany({});

  console.log('Seeding new products...');
  for (const watch of watches) {
    await prisma.product.create({
      data: watch,
    });
  }

  console.log('Seeded', watches.length, 'products successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
