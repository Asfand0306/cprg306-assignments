"use client";

import { useState, useEffect } from "react";

// Function to fetch meal ideas from TheMealDB API
const fetchMealIdeas = async (ingredient) => {
  if (!ingredient) return [];
  
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
};

// Function to fetch meal details (including ingredients)
const fetchMealDetails = async (mealId) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error("Error fetching meal details:", error);
    return null;
  }
};

// Helper function to extract ingredients from meal details
const extractIngredients = (mealDetails) => {
  if (!mealDetails) return [];
  
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = mealDetails[`strIngredient${i}`];
    const measure = mealDetails[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient,
        measure: measure || "To taste"
      });
    }
  }
  return ingredients;
};

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to load meal ideas
  const loadMealIdeas = async () => {
    if (ingredient) {
      setLoading(true);
      const mealIdeas = await fetchMealIdeas(ingredient);
      setMeals(mealIdeas);
      setSelectedMeal(null); // Reset selected meal when ingredient changes
      setIngredients([]);
      setLoading(false);
    } else {
      setMeals([]);
      setSelectedMeal(null);
      setIngredients([]);
    }
  };

  // Function to handle meal selection
  const handleMealSelect = async (meal) => {
    setLoading(true);
    setSelectedMeal(meal);
    
    const mealDetails = await fetchMealDetails(meal.idMeal);
    const extractedIngredients = extractIngredients(mealDetails);
    setIngredients(extractedIngredients);
    setLoading(false);
  };

  // UseEffect to call loadMealIdeas whenever ingredient changes
  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="w-full max-w-md mx-auto bg-zinc-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-center text-emerald-400">
        Meal Ideas for {ingredient || "..."}
      </h2>
      
      {loading && (
        <div className="text-center py-8">
          <p className="text-emerald-400 text-lg">Loading...</p>
        </div>
      )}
      
      {!loading && !ingredient && (
        <div className="text-center py-12">
          <p className="text-gray-400 italic">Select an item to see meal ideas</p>
        </div>
      )}
      
      {!loading && ingredient && meals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 italic">No meal ideas found for {ingredient}</p>
        </div>
      )}
      
      <div className="w-full">
        {/* Show ingredients if a meal is selected */}
        {selectedMeal && (
          <div className="mb-6 bg-zinc-700 p-4 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={selectedMeal.strMealThumb} 
                alt={selectedMeal.strMeal} 
                className="w-20 h-20 rounded-lg object-cover"
              />
              <h3 className="text-lg font-bold">{selectedMeal.strMeal}</h3>
            </div>
            
            <h4 className="font-bold text-emerald-400 mb-2">Ingredients:</h4>
            {ingredients.length === 0 && !loading ? (
              <p className="italic text-gray-400">No ingredients information available</p>
            ) : (
              <ul className="list-disc pl-5 space-y-1 bg-zinc-800 p-4 rounded-lg">
                {ingredients.map((item, index) => (
                  <li key={index} className="text-sm">
                    {item.ingredient} - {item.measure}
                  </li>
                ))}
              </ul>
            )}
            
            <button 
              onClick={() => setSelectedMeal(null)} 
              className="mt-4 text-sm bg-zinc-600 hover:bg-zinc-500 py-2 px-4 rounded-lg w-full"
            >
              Back to meal list
            </button>
          </div>
        )}
        
        {/* Show meal list if no meal is selected */}
        {!selectedMeal && meals.length > 0 && (
          <ul className="w-full space-y-3">
            {meals.map((meal) => (
              <li 
                key={meal.idMeal} 
                className="bg-zinc-700 hover:bg-zinc-600 p-4 rounded-lg flex items-center gap-4 cursor-pointer"
                onClick={() => handleMealSelect(meal)}
              >
                <img 
                  src={meal.strMealThumb} 
                  alt={meal.strMeal} 
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <span>{meal.strMeal}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}