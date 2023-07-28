const apikey = 'd01de4d73c514d18ae3aabcfac7c0025';

let ingredientsInput = document.getElementById("inglist");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

searchBtn.addEventListener("click", () => {
  let ingredients = ingredientsInput.value;
  fetchInfo(ingredients, apikey);
});

function fetchInfo(ingredients, apiKey) {
  const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      let recipeHtml = '';
      data.forEach(recipe => {
        recipeHtml += `
          <div class="recipe">
            <img src="${recipe.image}">
            <h2>${recipe.title}</h2>
            <p>Used Ingredients: ${recipe.usedIngredients.map(ingredient => ingredient.name).join(', ')}</p>
            <p>UnUsed Ingredients: ${recipe.unusedIngredients.map(ingredient => ingredient.name).join(', ')}</p>
            <p>Missing Ingredients: ${recipe.missedIngredients.map(ingredient => ingredient.name).join(', ')}</p>
            </div>
        `;
      });

      result.innerHTML = recipeHtml;
    })
    .catch(error => {
      console.log("Error: ", error);
    });
}
