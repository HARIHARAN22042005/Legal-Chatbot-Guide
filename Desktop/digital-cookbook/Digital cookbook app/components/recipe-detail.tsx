"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Heart, Star, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Recipe } from "@/lib/recipe-data"

interface RecipeDetailProps {
  recipe: Recipe
  onClose: () => void
  isFavorite?: boolean
  onRemoveFromFavorites?: () => void
}

export default function RecipeDetail({
  recipe,
  onClose,
  isFavorite = false,
  onRemoveFromFavorites,
}: RecipeDetailProps) {
  const [favorite, setFavorite] = useState(isFavorite)

  const toggleFavorite = async () => {
    try {
      if (favorite && onRemoveFromFavorites) {
        onRemoveFromFavorites()
      } else {
        // Add to favorites
        await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipeId: recipe.id }),
        })
      }
      setFavorite(!favorite)
    } catch (error) {
      console.error("Error toggling favorite:", error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="h-64 sm:h-80 relative">
            <Image
              src={recipe.image || "/placeholder.svg"}
              alt={recipe.title}
              fill
              className="object-cover rounded-t-lg"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <X size={20} />
            </button>
            {recipe.region && (
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {recipe.region}
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${favorite ? "text-red-500" : "text-gray-400"}`}
                onClick={toggleFavorite}
              >
                <Heart className={favorite ? "fill-red-500" : ""} size={20} />
              </Button>
            </div>

            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={`${
                    i < Math.floor(recipe.rating)
                      ? "fill-amber-400 text-amber-400"
                      : i < recipe.rating
                        ? "fill-amber-400 text-amber-400" // For half stars, we're just using full stars for simplicity
                        : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">{recipe.rating}</span>
            </div>

            {recipe.description && <p className="text-gray-600 mb-6">{recipe.description}</p>}

            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              {recipe.prepTime && (
                <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
                  <Clock className="h-5 w-5 text-teal-600 mb-1" />
                  <p className="text-sm text-gray-500">Prep Time</p>
                  <p className="font-medium">{recipe.prepTime}</p>
                </div>
              )}

              {recipe.cookTime && (
                <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
                  <Clock className="h-5 w-5 text-teal-600 mb-1" />
                  <p className="text-sm text-gray-500">Cook Time</p>
                  <p className="font-medium">{recipe.cookTime}</p>
                </div>
              )}

              {recipe.servings && (
                <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center">
                  <Users className="h-5 w-5 text-teal-600 mb-1" />
                  <p className="text-sm text-gray-500">Servings</p>
                  <p className="font-medium">{recipe.servings}</p>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mt-2 mr-2"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Instructions</h3>
              <ol className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mr-3 font-medium text-sm">
                      {index + 1}
                    </span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 flex justify-center">
              <Button onClick={toggleFavorite} className="bg-teal-600 hover:bg-teal-700">
                <Heart className={`mr-2 ${favorite ? "fill-white" : ""}`} size={18} />
                {favorite ? "Saved to Favorites" : "Save to Favorites"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
