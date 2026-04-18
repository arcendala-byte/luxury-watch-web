import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const watches = [
    {
      name: 'Apex Midnight',
      brand: 'Apex',
      slug: 'apex-midnight',
      price: '€14,200',
      image: '/apex-front.jpg',
      description: 'The Apex Midnight represents the pinnacle of dark aesthetics, featuring a brushed Grade 5 titanium case with a Diamond-Like Carbon (DLC) coating for unparalleled scratch resistance and a stealth silhouette.',
    },
    {
      name: 'Apex Gold Edition',
      brand: 'Apex',
      slug: 'apex-gold',
      price: '€28,500',
      image: '/Apex_Watche.webp',
      description: 'A masterpiece of horological engineering, the Gold Edition combines our signature skeletonized movement with hand-polished 18k yellow gold bridges and a bespoke alligator leather strap.',
    },
    {
      name: 'Luna Silver',
      brand: 'Luna',
      slug: 'luna-silver',
      price: '€12,800',
      image: '/luna-front.jpg',
      description: 'Inspired by the celestial rhythm, the Luna Silver features an astronomical moon-phase complication accurate to 122 years, encased in a polished 904L stainless steel frame.',
    },
    {
      name: 'Heritage Classic',
      brand: 'Heritage',
      slug: 'heritage-classic',
      price: '€9,500',
      image: '/heritage.jpg',
      description: 'The Heritage Classic is a tribute to the golden age of grand complications, featuring a cream enamel dial and a manual-wind calibre that whispers centuries of tradition.',
    },
    {
      name: 'Sky Aviator',
      brand: 'Aero',
      slug: 'sky-aviator',
      price: '€8,200',
      image: '/richard-front.jpg',
      description: 'Engineered for the cockpit, the Sky Aviator combines a high-beat GMT movement with a bidirectional slide-rule bezel, finished in a matte sandblasted titanium case.',
    },
    {
      name: 'Nebula Tourbillon',
      brand: 'Celeste',
      slug: 'nebula-tourbillon',
      price: '€95,000',
      image: '/macro-watch.jpg',
      description: 'A gravity-defying tourbillon movement that appears to float within a crystalline sapphire case, the Nebula is a purely mechanical triumph of modern watchmaking.',
    },
    {
      name: 'Ocean Master',
      brand: 'Marina',
      slug: 'ocean-master',
      price: '€11,400',
      image: '/watch1.jpg',
      description: 'Forged for the abyss, the Ocean Master is tested to a depth of 500 meters, featuring a helium escape valve and a luminescent ceramic bezel for ultimate legibility.',
    },
    {
      name: 'Vanguard Steel',
      brand: 'Vanguard',
      slug: 'vanguard-steel',
      price: '€7,900',
      image: '/watch2.jpg',
      description: 'The Vanguard Steel is the definitive sports watch—robust, elegant, and featuring an integrated steel bracelet that flows seamlessly from the brushed case.',
    },
    {
      name: 'Eclipse Shadow',
      brand: 'Photon',
      slug: 'eclipse-shadow',
      price: '€18,600',
      image: '/watch3.jpg',
      description: 'A study in darkness and light, the Eclipse Shadow uses Vantablack-inspired coating on the dial to create a void-like effect, contrasted by luminous platinum markers.',
    },
  ];

  console.log('Cleaning up existing data...');
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});

  console.log('Seeding enriched product catalog...');
  
  for (const watch of watches) {
    // 1. Convert "€14,200" string to numeric 14200
    const numericPrice = parseFloat(watch.price.replace(/[€,]/g, ''));

    // 2. Create the record with explicit mapping to satisfy TypeScript
    await prisma.product.create({
      data: {
        name: watch.name,
        brand: watch.brand,
        slug: watch.slug,
        price: numericPrice, // Float type
        image: watch.image,
        description: watch.description,
        stock: 5,           // Int type
        status: "ACTIVE",   // Default string
        movement: "Mechanical Self-winding" 
      },
    });
  }

  console.log('Seeded', watches.length, 'luxury timepieces successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });