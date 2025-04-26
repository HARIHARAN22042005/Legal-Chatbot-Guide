"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Recipe } from "@/lib/recipe-data"

interface RecipeGridProps {
  recipes: Recipe[]
  onViewRecipe: (recipe: Recipe) => void
}

export default function RecipeGrid({ recipes, onViewRecipe }: RecipeGridProps) {
  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No recipes found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <Card key={recipe.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="relative h-48">
            <Image src={recipe.image || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" />
            {recipe.region && (
              <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm text-xs px-2 py-1 rounded-full">
                {recipe.region}
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{recipe.title}</h3>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < Math.floor(recipe.rating)
                      ? "fill-amber-400 text-amber-400"
                      : i < recipe.rating
                        ? "fill-amber-400 text-amber-400" // For half stars, we're just using full stars for simplicity
                        : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-1 text-sm text-gray-600">{recipe.rating}</span>
            </div>
            <div className="text-xs inline-block px-2 py-1 rounded-full bg-teal-100 text-teal-800">
              {recipe.category}
            </div>
            {recipe.description && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{recipe.description}</p>}
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button onClick={() => onViewRecipe(recipe)} className="w-full bg-teal-600 hover:bg-teal-700">
              View Recipe
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
