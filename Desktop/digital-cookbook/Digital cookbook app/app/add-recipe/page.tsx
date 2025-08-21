"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Minus, Upload } from "lucide-react"

export default function AddRecipe() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [region, setRegion] = useState("")
  const [prepTime, setPrepTime] = useState("")
  const [cookTime, setCookTime] = useState("")
  const [servings, setServings] = useState("")
  const [ingredients, setIngredients] = useState<string[]>([""])
  const [steps, setSteps] = useState<string[]>([""])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddIngredient = () => {
    setIngredients([...ingredients, ""])
  }

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...ingredients]
    newIngredients.splice(index, 1)
    setIngredients(newIngredients)
  }

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  const handleAddStep = () => {
    setSteps([...steps, ""])
  }

  const handleRemoveStep = (index: number) => {
    const newSteps = [...steps]
    newSteps.splice(index, 1)
    setSteps(newSteps)
  }

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps]
    newSteps[index] = value
    setSteps(newSteps)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real app, you would send this data to your API
    // For demo purposes, we'll just simulate a delay and redirect
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/my-recipes")
    }, 1500)
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
                  <a href="/favorites" className="text-gray-600 hover:text-teal-600 transition-colors">
                    Favorites
                  </a>
                </li>
                <li>
                  <a href="/add-recipe" className="text-teal-600 font-medium">
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
        <h2 className="text-2xl font-bold mb-6">Add New Recipe</h2>

        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="mb-6">
                <Label htmlFor="image" className="block mb-2">
                  Recipe Image
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG or WEBP (max. 5MB)</p>
                  <Input id="image" type="file" className="hidden" accept="image/*" />
                  <Button type="button" variant="outline" className="mt-4">
                    Select Image
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Recipe Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter recipe title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                      <SelectItem value="Desserts">Desserts</SelectItem>
                      <SelectItem value="Snacks">Snacks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Briefly describe your recipe"
                  className="min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor="region">Region (Optional)</Label>
                <Input
                  id="region"
                  placeholder="e.g., Tamil Nadu, Kerala, etc."
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="prepTime">Prep Time</Label>
                  <Input
                    id="prepTime"
                    placeholder="e.g., 15 mins"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cookTime">Cook Time</Label>
                  <Input
                    id="cookTime"
                    placeholder="e.g., 30 mins"
                    value={cookTime}
                    onChange={(e) => setCookTime(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    placeholder="e.g., 4"
                    value={servings}
                    onChange={(e) => setServings(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Ingredients</h3>

              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2 mb-3">
                  <Input
                    placeholder={`Ingredient ${index + 1}`}
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    required
                  />
                  {ingredients.length > 1 && (
                    <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveIngredient(index)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button type="button" variant="outline" className="mt-2" onClick={handleAddIngredient}>
                <Plus className="h-4 w-4 mr-2" /> Add Ingredient
              </Button>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">Instructions</h3>

              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2 mb-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center mt-2 font-medium text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <Textarea
                      placeholder={`Step ${index + 1}`}
                      value={step}
                      onChange={(e) => handleStepChange(index, e.target.value)}
                      className="min-h-[80px]"
                      required
                    />
                  </div>
                  {steps.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveStep(index)}
                      className="mt-2"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button type="button" variant="outline" className="mt-2" onClick={handleAddStep}>
                <Plus className="h-4 w-4 mr-2" /> Add Step
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/my-recipes")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Recipe"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
