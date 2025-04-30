import os
import pandas as pd
from fetch_recipe import fetch_recipe
from map_ingredients import map_ingredient
from convert_units import convert_to_grams
from calculate_nutrition import calculate_total_nutrition
from classify_dish import classify_dish

def load_data():
    nutrition_db = pd.read_csv("data/nutrition_db.csv")
    nutrition_dict = nutrition_db.set_index("Ingredient").T.to_dict()

    household_db = pd.read_csv("data/household_measurements.csv")
    household_dict = household_db.set_index("Unit")["Grams"].to_dict()

    return nutrition_dict, household_dict

def save_output(dish_name, food_type, total_nutrition):
    os.makedirs("output", exist_ok=True)
    safe_dish_name = dish_name.replace(" ", "_").lower()
    output_file = f"output/output_{safe_dish_name}.txt"

    with open(output_file, "w") as f:
        f.write(f"Dish: {dish_name}\n")
        f.write(f"Category: {food_type}\n\n")
        f.write("Nutrition per standard serving:\n")
        for nutrient, value in total_nutrition.items():
            f.write(f"{nutrient}: {value:.2f} g\n")
    print(f"\n[Output saved to {output_file}]")

def main():
    dish_name = input("Enter a dish name: ")

    nutrition_db, household_db = load_data()
    ingredients = fetch_recipe(dish_name)
    print(f"Fetched ingredients: {ingredients}")

    total_nutrition = calculate_total_nutrition(ingredients, nutrition_db, household_db)
    food_type = classify_dish(dish_name)

    print(f"\nDish Category: {food_type}")
    print(f"Total Estimated Nutrition per standard serving:")
    for nutrient, value in total_nutrition.items():
        print(f"{nutrient}: {value:.2f} g")

    save_output(dish_name, food_type, total_nutrition)

if _name_ == "_main_":
    main()