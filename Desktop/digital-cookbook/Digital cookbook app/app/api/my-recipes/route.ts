import { NextResponse } from "next/server"
import { recipes } from "@/lib/recipe-data"

// In a real app, this would be stored in a database and associated with a user
// For demo purposes, we'll just return a subset of recipes
export async function GET() {
  const userRecipeIds = [3, 6, 9, 12] // Simulating user's own recipe IDs
  const userRecipes = recipes.filter((recipe) => userRecipeIds.includes(recipe.id))

  return NextResponse.json(userRecipes)
}
