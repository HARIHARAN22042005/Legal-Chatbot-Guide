import { NextResponse } from "next/server"
import { recipes } from "@/lib/recipe-data"

// In a real app, this would be stored in a database and associated with a user
// For demo purposes, we'll just return a subset of recipes
export async function GET() {
  const favoriteIds = [2, 5, 8, 11] // Simulating favorite recipe IDs
  const favoriteRecipes = recipes.filter((recipe) => favoriteIds.includes(recipe.id))

  return NextResponse.json(favoriteRecipes)
}

export async function POST(request: Request) {
  const { recipeId } = await request.json()

  // In a real app, this would add the recipe to the user's favorites in a database
  // For demo purposes, we'll just return a success message
  return NextResponse.json({
    success: true,
    message: `Recipe ${recipeId} added to favorites`,
  })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const recipeId = searchParams.get("id")

  // In a real app, this would remove the recipe from the user's favorites in a database
  // For demo purposes, we'll just return a success message
  return NextResponse.json({
    success: true,
    message: `Recipe ${recipeId} removed from favorites`,
  })
}
