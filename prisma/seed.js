const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const recipeData = [
  {
    title: 'Aloo Rice Delight',
    instructions: '1. Boil rice and set aside.\n2. In a pan, sauté chopped potatoes until golden brown.\n3. Mix the sautéed potatoes with the boiled rice.\n4. Serve hot and enjoy!',
    ingredients: 'Rice,Potatoes'
  },
  {
    title: 'Chocolate Chip Cookies',
    instructions: '1. Preheat the oven to 350°F.\n2. In a bowl, mix flour, eggs, sugar, butter, chocolate chips, and vanilla extract.\n3. Drop spoonfuls of dough onto a baking sheet.\n4. Bake for 10-12 minutes or until golden brown.\n5. Let cool and indulge!',
    ingredients: 'Flour,Eggs,Sugar,Butter,Chocolate chips,Vanilla extract'
  },
  {
    title: 'Spicy Chicken Curry',
    instructions: '1. In a pan, heat oil and sauté onions, garlic, and ginger.\n2. Add chicken, tomatoes, green chilies, and spices.\n3. Cook until chicken is done.\n4. Garnish with cilantro and serve with rice or bread.',
    ingredients: 'Chicken,Onions,Tomatoes,Garlic,Ginger,Green chilies,Cilantro'
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
