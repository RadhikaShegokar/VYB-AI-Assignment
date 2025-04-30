function classifyDish(dishName) {
    const categories = {
        "Wet Sabzi": ["Paneer Butter Masala", "Chole Masala"],
        "Dry Sabzi": ["Aloo Gobi"],
        "Dal": ["Dal Tadka"],
        "Non-Veg Curry": ["Chicken Curry"]
    };

    for (const [category, dishes] of Object.entries(categories)) {
        if (dishes.includes(dishName)) {
            return category;
        }
    }
    return "Other";
}

module.exports = { classifyDish };
