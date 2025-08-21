import { NextResponse } from "next/server"
import { recipes } from "@/lib/recipe-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const query = searchParams.get("query")?.toLowerCase()

  let filteredRecipes = [...recipes]

  // Filter by category if provided
  if (category && category !== "All") {
    filteredRecipes = filteredRecipes.filter((recipe) => recipe.category === category)
  }

  // Filter by search query if provided
  if (query) {
    filteredRecipes = filteredRecipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.description?.toLowerCase().includes(query) ||
        recipe.region?.toLowerCase().includes(query),
    )
  }

  return NextResponse.json(filteredRecipes)
}
