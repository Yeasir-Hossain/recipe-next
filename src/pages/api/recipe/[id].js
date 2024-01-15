import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    req.query.id = +req.query.id;
    try {
        switch (req.method) {
            case 'GET':
                const recipeGet = await prisma.recipe.findUnique({
                    where: {
                        id: req.query.id
                    }
                });
                recipeGet ? res.status(200).send(recipeGet) : res.status(404).send({ message: 'Not Found' });
                break;

            case 'PATCH':
                const recipePatch = await prisma.recipe.update({
                    where: {
                        id: req.query.id
                    },
                    data: req.body
                });
                return res.status(200).send(recipePatch);

            case 'DELETE':
                const recipeDelete = await prisma.recipe.delete({
                    where: {
                        id: req.query.id
                    },
                });
                return res.status(200).send(recipeDelete);

            default:
                return res.status(400).send({ message: 'Bad Request' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}
