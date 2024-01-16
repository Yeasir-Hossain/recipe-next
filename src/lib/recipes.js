import req from "@/utils/req"

/**
 * Sends a POST request to add a new recipe.
 *
 * @async
 * @function
 * @param {object} data - The data representing the recipe to be added.
 * @returns {Promise} - A promise that resolves with the result of the request.
 */
export async function addRecipe(data) {
  return await req({ uri: `recipe`, method: 'POST', body: data });
}

/**
 * Sends a GET request to fetch all recipes.
 *
 * @async
 * @function
 * @returns {Promise} - A promise that resolves with the result of the request.
 */
export async function recipes() {
  return await req({ uri: `recipe` });
}

/**
 * Sends a GET request to fetch a single recipe by its ID.
 *
 * @async
 * @function
 * @param {string} id - The unique identifier of the recipe.
 * @returns {Promise} - A promise that resolves with the result of the request.
 */
export async function getSingleRecipe(id) {
  return await req({ uri: `recipe/${id}` });
}

/**
 * Sends a PATCH request to update a recipe by its ID.
 *
 * @async
 * @function
 * @param {string} id - The unique identifier of the recipe to be updated.
 * @param {object} data - The data representing the updates to the recipe.
 * @returns {Promise} - A promise that resolves with the result of the request.
 */
export async function patchRecipe(id, data) {
  return await req({ uri: `recipe/${id}`, method: 'PATCH', body: data });
}

/**
 * Sends a DELETE request to remove a recipe by its ID.
 *
 * @async
 * @function
 * @param {string} id - The unique identifier of the recipe to be deleted.
 * @returns {Promise} - A promise that resolves with the result of the request.
 */
export async function deleteRecipe(id) {
  return await req({ uri: `recipe/${id}`, method: 'DELETE' });
}
