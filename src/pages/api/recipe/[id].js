/**
 * Handler function for CRUD operations on a recipe with a specified ID.
 * Uses Prisma ORM for database interactions.
 * 
 * @function
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {object} - The HTTP response containing recipe data or an error message.
 */

import prisma from "@/lib/prisma";

export default async function handler(req, res) {
    // Extracts and validates the recipe ID from the request query parameters
    const id = +req.query.id;
    if (isNaN(id) || id <= 0) {
        return res.status(400).send({ message: 'Bad Request - Invalid or missing id' });
    }

    try {
        // Handles different HTTP methods for CRUD operations
        switch (req.method) {
            case 'GET':
                // Fetches a recipe by ID using a GET request
                const recipeGet = await prisma.recipe.findUnique({
                    where: {
                        id: id
                    }
                });
                // Responds with the fetched recipe or a 404 Not Found status
                recipeGet ? res.status(200).send(recipeGet) : res.status(404).send({ message: 'Not Found' });
                break;

            case 'PATCH':
                // Updates a recipe by ID using a PATCH request
                const recipePatch = await prisma.recipe.update({
                    where: {
                        id: id
                    },
                    data: req.body
                });
                // Responds with the updated recipe data
                return res.status(200).send(recipePatch);

            case 'DELETE':
                // Deletes a recipe by ID using a DELETE request
                const recipeDelete = await prisma.recipe.delete({
                    where: {
                        id: id
                    },
                });
                // Responds with a success status and deleted recipe data
                return res.status(200).send(recipeDelete);

            default:
                // Handles unsupported HTTP methods with a 400 Bad Request status
                return res.status(400).send({ message: 'Bad Request' });
        }
    } catch (error) {
        // Logs any internal errors and responds with a 500 Internal Server Error status
        console.log(error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}
