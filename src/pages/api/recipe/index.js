/**
 * Handler function for creating and fetching recipes.
 * Uses Prisma ORM for database interactions.
 * 
 * @function
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {object} - The HTTP response containing recipe data or an error message.
 */

import prisma from "@/lib/prisma";

/**
 * Handles POST and GET requests for recipes.
 * 
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 * @returns {object} - The HTTP response containing recipe data or an error message.
 */
export default async function handler(req, res) {
  try {
    // Handles different HTTP methods for creating and fetching recipes
    switch (req.method) {
      case 'POST':
        // Creates a new recipe using a POST request
        const recipePost = await prisma.recipe.create({
          data: req.body
        });
        // Responds with the created recipe data
        return res.status(200).send(recipePost);

      case 'GET':
        // Fetches all recipes using a GET request
        const recipeGetAll = await prisma.recipe.findMany({});
        // Responds with an array of recipe data
        return res.status(200).send(recipeGetAll);

      default:
        // Handles unsupported HTTP methods with a 400 Bad Request status
        return res.status(400).send({ message: 'Bad Request' });
    }
  } catch (err) {
    // Logs any internal errors and responds with a 500 Internal Server Error status
    console.log(err);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
}