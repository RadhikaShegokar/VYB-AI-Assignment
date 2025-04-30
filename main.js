const fs = require('fs');
const readline = require('readline');
const path = require('path');

// test-read.js
const data = fs.readFileSync('nutrition_db.csv', 'utf8');
console.log('File loaded successfully!');
console.log(data.split('\n').slice(0, 5).join('\n'));

const { fetchRecipe } = require('./fetch_recipe');
const { mapIngredient } = require('./map_ingredients');
const { convertToGrams } = require('./convert_units');
const { calculateTotalNutrition } = require('./calculate_nutrition');
const { classifyDish } = require('./classify_dish');

// Function to load CSV files
function loadData() {
    const nutritionPath = path.join(__dirname, 'nutrition_db.csv');
    const householdPath = path.join(__dirname, 'household_measurements.csv');

    const nutritionRaw = fs.readFileSync(nutritionPath, 'utf-8');
    const householdRaw = fs.readFileSync(householdPath, 'utf-8');

    const parseCSV = (csvText) => {
        const [headerLine, ...lines] = csvText.trim().split('\n');
        const headers = headerLine.split(',');
        const data = {};
        lines.forEach(line => {
            const values = line.split(',');
            const row = {};
            headers.forEach((h, idx) => {
                row[h.trim()] = isNaN(values[idx]) ? values[idx].trim() : parseFloat(values[idx]);
            });
            data[row[headers[0]].toLowerCase()] = row;
        });
        return data;
    };

    const nutritionDB = parseCSV(nutritionRaw);
    const householdDB = parseCSV(householdRaw);

    return { nutritionDB, householdDB };
}

// Function to save output
function saveOutput(dishName, foodType, totalNutrition) {
    if (!fs.existsSync('output')) {
        fs.mkdirSync('output');
    }

    const safeDishName = dishName.replace(/\s+/g, '_').toLowerCase();
    const outputFile = 'output/output_${safeDishName}.txt '; 

    const outputLines = [
        'Dish: ${dishName}',
        'Category : ${foodType}',
        '',
        'Nutrition per standard serving:',
        ...Object.entries(totalNutrition).map(
            ([nutrient, value]) => '${nutrient}: ${value.toFixed(2)} g'
        )
    ];
    
    fs.writeFileSync(outputFile, outputLines.join('\n'), 'utf-8');
    console.log('\n[Output saved to ${outputFile}]');
}

// ✅ Main execution function
async function main() {
    console.log("Program started...");

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter a dish name: ", function(dishName) {
        const { nutritionDB, householdDB } = loadData();
        const ingredients = fetchRecipe(dishName);
        console.log('Fetched ingredients: ${JSON.stringify(ingredients, null, 2)}');

        const totalNutrition = calculateTotalNutrition(ingredients, nutritionDB, householdDB);
        const foodType = classifyDish(dishName);

        console.log('\nDish Category: ${foodType}');
        console.log('Total Estimated Nutrition per standard serving:');
        for (const [nutrient, value] of Object.entries(totalNutrition)) {
            console.log('${nutrient}: ${value.toFixed(2)} g');
        }

        saveOutput(dishName, foodType, totalNutrition);
        rl.close();
    });
}

// 🔥 Call the main function
main();