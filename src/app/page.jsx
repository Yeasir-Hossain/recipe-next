import Recipe from "@/components/recipe/Recipe"

export default async function Page() {
  return (
    <main className="flex flex-col justify-center min-h-screen items-center max-w-screen-sm mx-auto">
      {/* Component to render all the recipes from client side as real time updates are necessary */}
      <Recipe />
    </main>
  )
}