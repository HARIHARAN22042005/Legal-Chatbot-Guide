"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import RecipeGrid from "@/components/recipe-grid"
import RecipeDetail from "@/components/recipe-detail"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Recipe } from "@/lib/recipe-data"

export default function Favorites() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/favorites")
      const data = await response.json()
      setRecipes(data)
    } catch (error) {
      console.error("Error fetching favorites:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Filter recipes locally since we already have them
  }

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
  }

  const handleCloseRecipe = () => {
    setSelectedRecipe(null)
  }

  const handleRemoveFromFavorites = async (recipeId: number) => {
    try {
      await fetch(`/api/favorites?id=${recipeId}`, {
        method: "DELETE",
      })
      // Remove from local state
      setRecipes(recipes.filter((recipe) => recipe.id !== recipeId))
      // Close detail view if it's the one being removed
      if (selectedRecipe?.id === recipeId) {
        setSelectedRecipe(null)
      }
    } catch (error) {
      console.error("Error removing from favorites:", error)
    }
  }

  const filteredRecipes = searchQuery
    ? recipes.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          recipe.region?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : recipes

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-teal-600">Digital Cookbook</h1>
            <nav className="flex overflow-x-auto pb-2 md:pb-0">
              <ul className="flex space-x-6">
                <li>
                  <a href="/" className="text-gray-600 hover:text-teal-600 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/my-recipes" className="text-gray-600 hover:text-teal-600 transition-colors">
                    My Recipes
                  </a>
                </li>
                <li>
                  <a href="/favorites" className="text-teal-600 font-medium">
                    Favorites
                  </a>
                </li>
                <li>
                  <a href="/add-recipe" className="text-gray-600 hover:text-teal-600 transition-colors">
                    Add Recipe
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search favorites..."
              className="pl-10 bg-white border-gray-200 rounded-full w-full sm:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>

        {/* Recipe Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Favorite Recipes</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : filteredRecipes.length > 0 ? (
            <RecipeGrid recipes={filteredRecipes} onViewRecipe={handleViewRecipe} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">You haven't added any favorites yet.</p>
              <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => (window.location.href = "/")}>
                Browse Recipes
              </Button>
            </div>
          )}
        </div>

        {/* Recipe Detail Modal */}
        {selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            onClose={handleCloseRecipe}
            isFavorite={true}
            onRemoveFromFavorites={() => handleRemoveFromFavorites(selectedRecipe.id)}
          />
        )}
      </main>
    </div>
  )
}
