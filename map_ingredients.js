function mapIngredient(ingredient, nutritionDB) {
    const synonyms = {
        "chickpeas": "chana",
        "toor dal": "arhar dal",
        "ghee": "clarified butter"
    };

    let lowerIngredient = ingredient.toLowerCase();
    lowerIngredient = synonyms[lowerIngredient] || lowerIngredient;

    // Try to find closest match
    for (const key in nutritionDB) {
        if (key.includes(lowerIngredient)) {
            return key;
        }
    }
    return null; // if not found
}

module.exports = { mapIngredient };