function fetchRecipe(dishName) {
    const sampleRecipes = {
        "Paneer Butter Masala": ["Paneer", "Butter", "Tomato", "Cream", "Spices"],
        "Dal Tadka": ["Toor Dal", "Ghee", "Cumin", "Onion", "Tomato"],
        "Aloo Gobi": ["Potato", "Cauliflower", "Tomato", "Spices"],
        "Chicken Curry": ["Chicken", "Onion", "Tomato", "Ginger", "Garlic", "Spices"],
        "Chole Masala": ["Chickpeas", "Onion", "Tomato", "Spices"]
    };

    return sampleRecipes[dishName] || ["Paneer", "Butter", "Tomato"]; // fallback
}

module.exports = { fetchRecipe };