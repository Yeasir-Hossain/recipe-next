"use client"

import { recipes as fetchRecipes } from "@/lib/recipes"
import { useEffect } from "react";
import Card from "./Card"
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setValue } from "@/reducers/recipeSlice";
import { useGlobalCtx } from "@/context/Global/GlobalProvider";
import AddEditModal from "./modal/AddEditModal";

/**
 * React component for displaying a list of recipes.
 */
export default function Recipe() {
  const { openModal } = useGlobalCtx();
  const dispatch = useDispatch();
  const { recipes, loading } = useSelector((state) => ({
    recipes: state.recipeStore.recipe,
    loading: state.recipeStore.loading
  }), shallowEqual);

  // Handles the opening of the Add/Edit Recipe modal in add mode.
  const handleAdd = () => {
    openModal('addeditRecipe', <AddEditModal />)
  }

  useEffect(() => {
    dispatch(setValue({ target: 'loading', value: true }))
    fetchRecipes()
      .then((recipes) => {
        // Updates the Redux store with the fetched recipes
        dispatch(setValue({ target: 'recipe', value: recipes }))
      })
      .catch(err => console.log(err))
      .finally(() => {
        // Sets loading state to false after fetching completes
        dispatch(setValue({ target: 'loading', value: false }))
      });
  }, [])

  return (
    <>
      {
        loading ? <p className="text-lg text-center">Loading...</p> :
          <>
            {/* Button to add a new recipe */}
            <div className="flex justify-end items-end w-full pb-3">
              <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-800 transition-all duration-500 text-white px-4 py-1 rounded-md">Add</button>
            </div>
            {/* Display the list of recipes or a message if no data is available */}
            <div className="flex flex-col gap-4 w-full">
              {

                recipes && recipes.length > 0 ?
                  recipes.map(recipe => <Card key={recipe.id} id={recipe.id} title={recipe.title} />) :
                  <p className="text-lg font-semibold text-center">No data to show</p>
              }
            </div>
          </>
      }
    </>
  )
}
