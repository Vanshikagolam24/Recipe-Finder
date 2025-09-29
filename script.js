const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const recipeContainer = document.getElementById('recipe-container');

searchBtn.addEventListener('click', fetchRecipes);

async function fetchRecipes() {
  const query = searchInput.value.trim();
  if (!query) return alert('Please enter a recipe name!');

  // const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s={mealName}`);
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await response.json();

  recipeContainer.innerHTML = '';

  if (!data.meals) {
    recipeContainer.innerHTML = `<p>No recipes found. Try something else!</p>`;
    return;
  }

  data.meals.forEach(meal => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');

    recipeCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="recipe-info">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strInstructions.substring(0, 100)}...</p>
        <button class="view-btn" onclick="window.open('${meal.strSource || meal.strYoutube}', '_blank')">
          View Recipe
        </button>
      </div>
    `;

    recipeContainer.appendChild(recipeCard);
  });
}
