import { getSingleRecipe } from "@/lib/recipes"

export default async function Page({ params: { id } }) {
  const recipe = await getSingleRecipe(id)
  return (
    <main className="flex flex-col justify-center min-h-screen max-w-screen-sm mx-auto">
      {
        !recipe?.id ? <p className="text-xl font-semibold text-center">Recipe Not Found</p> :
          <div className="flex flex-col gap-3 border border-gray-200 rounded-lg p-3">
            <p className="text-xl font-semibold">{recipe.title}</p>
            <div>
              <p>Ingredients:</p>
              <ul className="pl-2">
                {recipe.ingredients.split(',').map((ingredient, i) => <li key={i}>-{ingredient}</li>)}
              </ul>
            </div>
            <div>
              <p>Instructions:</p>
              <p>{recipe.instructions}</p>
            </div>
            {
              recipe.resource &&
              <div>
                Reource:
              </div>
            }

          </div>
      }


    </main>
  )
}