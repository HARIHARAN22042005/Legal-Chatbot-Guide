"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import RecipeGrid from "@/components/recipe-grid"
import RecipeDetail from "@/components/recipe-detail"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Recipe } from "@/lib/recipe-data"

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRecipes()
  }, [selectedCategory, searchQuery])

  const fetchRecipes = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCategory !== "All") {
        params.append("category", selectedCategory)
      }
      if (searchQuery) {
        params.append("query", searchQuery)
      }

      const response = await fetch(`/api/recipes?${params.toString()}`)
      const data = await response.json()
      setRecipes(data)
    } catch (error) {
      console.error("Error fetching recipes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchRecipes()
  }

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
  }

  const handleCloseRecipe = () => {
    setSelectedRecipe(null)
  }

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
                  <a href="/" className="text-teal-600 font-medium">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/my-recipes" className="text-gray-600 hover:text-teal-600 transition-colors">
                    My Recipes
                  </a>
                </li>
                <li>
                  <a href="/favorites" className="text-gray-600 hover:text-teal-600 transition-colors">
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
        {/* Search and Filters */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search recipes..."
              className="pl-10 bg-white border-gray-200 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === "All" ? "bg-teal-600 hover:bg-teal-700" : "bg-white hover:bg-teal-50 hover:text-teal-600"}`}
              onClick={() => handleCategoryClick("All")}
            >
              All
            </Button>
            <Button
              variant={selectedCategory === "Breakfast" ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === "Breakfast" ? "bg-teal-600 hover:bg-teal-700" : "bg-white hover:bg-teal-50 hover:text-teal-600"}`}
              onClick={() => handleCategoryClick("Breakfast")}
            >
              Breakfast
            </Button>
            <Button
              variant={selectedCategory === "Lunch" ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === "Lunch" ? "bg-teal-600 hover:bg-teal-700" : "bg-white hover:bg-teal-50 hover:text-teal-600"}`}
              onClick={() => handleCategoryClick("Lunch")}
            >
              Lunch
            </Button>
            <Button
              variant={selectedCategory === "Dinner" ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === "Dinner" ? "bg-teal-600 hover:bg-teal-700" : "bg-white hover:bg-teal-50 hover:text-teal-600"}`}
              onClick={() => handleCategoryClick("Dinner")}
            >
              Dinner
            </Button>
            <Button
              variant={selectedCategory === "Desserts" ? "default" : "outline"}
              className={`rounded-full ${selectedCategory === "Desserts" ? "bg-teal-600 hover:bg-teal-700" : "bg-white hover:bg-teal-50 hover:text-teal-600"}`}
              onClick={() => handleCategoryClick("Desserts")}
            >
              Desserts
            </Button>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">
            {selectedCategory === "All" ? "All Recipes" : selectedCategory}
            {searchQuery && ` matching "${searchQuery}"`}
          </h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <RecipeGrid recipes={recipes} onViewRecipe={handleViewRecipe} />
          )}
        </div>

        {/* Recipe Detail Modal */}
        {selectedRecipe && <RecipeDetail recipe={selectedRecipe} onClose={handleCloseRecipe} />}
      </main>
    </div>
  )
}
