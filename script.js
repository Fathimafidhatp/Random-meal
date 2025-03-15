const btn = document.getElementById("getmeal"); 
const mealcontainer = document.getElementById("mealcontainer"); 

async function fetchMeal() {
    try {
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        const meal = data.meals[0];

        let ingredients = "";
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                ingredients += `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
            }
        }

        mealcontainer.innerHTML = `
            <div class="meal-card">
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" class="meal-image" alt="${meal.strMeal}">
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 200)}...</p>
                <h3>Ingredients:</h3>
                <ul>${ingredients}</ul>
                <a href="${meal.strYoutube}" target="_blank">📺 Watch on YouTube</a>
                <button id="shareButton">Share</button>
            </div>
        `;

        // Add event listener after content is added
        document.getElementById('shareButton').addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: meal.strMeal,
                    text: `Check out this delicious meal: ${meal.strMeal}`,
                    url: meal.strYoutube
                }).then(() => {
                    console.log("Shared successfully!");
                }).catch((error) => {
                    console.error("Error sharing:", error);
                });
            } else {
                alert("Your browser does not support sharing.");
            }
        });

    } catch (error) {
        console.error("Error fetching meal:", error);
        mealcontainer.innerHTML = "<p>Oops! Could not fetch a meal. Try again.</p>";
    }
}

btn.addEventListener("click", fetchMeal);
