import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'POST':
        const recipePost = await prisma.recipe.create({
          data: req.body
        });
        return res.status(200).send(recipePost);

      case 'GET':
        const recipeGetAll = await prisma.recipe.findMany({});
        return res.status(200).send(recipeGetAll);

      default:
        return res.status(400).send({ message: 'Bad Request' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}
