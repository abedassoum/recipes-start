import { Link, useSearchParams } from "react-router-dom";
import "./RecipesLayout.css";
import { useEffect, useState } from "react";
import { Recipe as APIRecipe, getRecipes } from "../services/apiFacade";
//import { useAuth } from "../security/_Authprovider";

export default function RecipeList() {
  const [queryString] = useSearchParams();
  const initialCategory = queryString.get("category");
  const [recipes, setRecipes] = useState<Array<APIRecipe>>([]);
  const [category, setCategory] = useState<string | null>(initialCategory);
  const [error, setError] = useState("");
  //const auth = useAuth();

  useEffect(() => {
    getRecipes(category)
    .then((res) => setRecipes(res))
    .catch(() => setError("Error fetching recipes, is the server running?"));

  }, [category]);

  const recipeListItems = recipes.map((recipe) => {
    return (
      <li key={recipe.id}>
        <Link to={`${recipe.id}`}>{recipe.name}</Link>,
        {/*TODO:Eventually this should only be added for a logged in user*/}
        {/* <Link className="recipe-btn" to="/add" state={recipe}>Edit </Link> */}
      </li>
    );
  });

  if(error!==""){
    return <h2 style={{color:"red"}}>{error}</h2>
  }
  return (
    <>
      <h3>Recipes</h3>
      {category && (
        <div>
          Recipes with '{category}'{" "}
          <button
            onClick={() => {
              setCategory(null);
              getRecipes(null).then((res) => setRecipes(res));
            }}
          >
            Clear
          </button>
        </div>
      )}
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>{recipeListItems}</ul>
    </>
  );
}
