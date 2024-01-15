const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const recipeData = [
  {
    title: 'Aloo Rice Delight',
    description: 'A delicious dish combining Aloo (Potatoes) and Rice.',
    ingredients: 'Aloo,Rice',
  },
  {
    title: 'Chocolate Chip Cookies',
    description: 'Classic chocolate chip cookies for a sweet treat.',
    ingredients: 'Flour,Eggs,Sugar,Butter,Chocolate chips,Vanilla extract',
  },
  {
    title: 'Spicy Chicken Curry',
    description: 'A flavorful chicken curry with spices and herbs.',
    ingredients: 'Chicken,Onions,Tomatoes,Garlic,Ginger,Green chilies,Cilantro',
  },
];

async function main() {
  console.log(`Start seeding ...`)
  for (const r of recipeData) {
    const recipe = await prisma.recipe.create({
      data: r,
    })
    console.log(`Created recipe with id: ${recipe.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
