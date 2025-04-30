const { mapIngredient } = require('./map_ingredients');

function calculateTotalNutrition(ingredients, nutritionDB, householdDB) {
    const total = {
        Calories: 0,
        Protein: 0,
        Carbs: 0,
        Fat: 0,
        Fiber: 0
    };

    ingredients.forEach(ingredient => {
        const mapped = mapIngredient(ingredient, nutritionDB);
        if (!mapped) {
            console.warn(`Warning: Ingredient '${ingredient}' not found in database.`);

            return;
        }

        // Assume 100g default
        const grams = 100;
        const nutrition = nutritionDB[mapped];

        total.Calories += (nutrition["Calories (kcal)"] || 0) * grams / 100;
        total.Protein += (nutrition["Protein (g)"] || 0) * grams / 100;
        total.Carbs += (nutrition["Carbs (g)"] || 0) * grams / 100;
        total.Fat += (nutrition["Fat (g)"] || 0) * grams / 100;
        total.Fiber += (nutrition["Fiber (g)"] || 0) * grams / 100;
    });

    return total;
}

module.exports = { calculateTotalNutrition };