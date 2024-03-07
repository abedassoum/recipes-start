import { API_URL } from "../settings";
import  { makeOptions,handleHttpErrors } from "./fetchUtils";
const CATEGORIES_URL = API_URL + "/categories";
const RECIPE_URL = API_URL + "/recipes";
const INFO_URL = API_URL + "/info";


interface Recipe {
  id: number | null;
  name: string;
  category: string;
  instructions: string;
  thumb: string;
  youTube: string;
  ingredients: string;
  source: string;
}

interface Info {
  reference: string;
  created: string;
  info: string;
}

let categories: Array<string> = [];
// let recipes: Array<Recipe> = [];

// This is the function you need to use to get the categories from the backend.

async function getCategories(): Promise<Array<string>> {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const headers = {
    'Authorization': `Bearer ${token}` // Include the token in the request headers
  };

  if (categories.length > 0) return [...categories];
  const res = await fetch(CATEGORIES_URL, { headers }).then(handleHttpErrors);
  categories = [...res];
  return categories;
}



// async function getCategories(): Promise<Array<string>> {
//   if (categories.length > 0) return [...categories];
//   const res = await fetch(CATEGORIES_URL).then(handleHttpErrors);
//   categories = [...res];
//   return categories;
// }


// async function getRecipes(category: string | null): Promise<Array<Recipe>> {
//   //if (recipes.length > 0) return [...recipes];
//   console.log("category", category);
//   const queryParams = category ? "?category=" + category : "";
//   return fetch(RECIPE_URL + queryParams).then(handleHttpErrors);
// }

// if you want the data to be fetched from the backend you need to get the token from the localstorage because its saved there.

async function getRecipes(category: string | null): Promise<Array<Recipe>> {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const headers = {
    'Authorization': `Bearer ${token}` // Include the token in the request headers
  };

  const queryParams = category ? "?category=" + category : "";
  const response = await fetch(RECIPE_URL + queryParams, { headers }); // Pass headers to fetch
  const recipes = await handleHttpErrors(response);
  return recipes;
}

// async function getRecipe(id: number): Promise<Recipe> {
//   //if (recipes.length > 0) return [...recipes];
//   return fetch(RECIPE_URL + "/" + id).then(handleHttpErrors);
// }

//This is also the function you need to fetch the data from the backend being authorised.

async function getRecipe(id: number): Promise<Recipe> {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const headers = {
    'Authorization': `Bearer ${token}` // Include the token in the request headers
  };

  const response = await fetch(RECIPE_URL + "/" + id, { headers }); // Pass headers to fetch
  const recipe = await handleHttpErrors(response);
  return recipe;
}
// async function addRecipe(newRecipe: Recipe): Promise<Recipe> {
//   const method = newRecipe.id ? "PUT" : "POST";
//   const options = makeOptions(method, newRecipe);
//   const URL = newRecipe.id ? `${RECIPE_URL}/${newRecipe.id}` : RECIPE_URL;
//   return fetch(URL, options).then(handleHttpErrors);
// }

//This is the function you need to use to add a recipe to the backend.

async function addRecipe(newRecipe: Recipe): Promise<Recipe> {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const headers = {
    'Authorization': `Bearer ${token}`, // Include the token in the request headers
    'Content-Type': 'application/json' // Set the content type
  };

  const method = newRecipe.id ? "PUT" : "POST";
  const options = makeOptions(method, newRecipe);
  const URL = newRecipe.id ? `${RECIPE_URL}/${newRecipe.id}` : RECIPE_URL;
  const response = await fetch(URL, { headers, ...options }); // Pass headers to fetch
  const recipe = await handleHttpErrors(response);
  return recipe;
}


// async function deleteRecipe(id: number): Promise<Recipe> {
//   const options = makeOptions("DELETE", null);
//   return fetch(`${RECIPE_URL}/${id}`, options).then(handleHttpErrors);
// }

//This is the function you need to use to delete a recipe from the backend.

async function deleteRecipe(id: number): Promise<Recipe> {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const headers = {
    'Authorization': `Bearer ${token}` // Include the token in the request headers
  };

  const options = makeOptions("DELETE", null);
  const response = await fetch(`${RECIPE_URL}/${id}`, { headers, ...options }); // Pass headers to fetch
  const recipe = await handleHttpErrors(response);
  return recipe;
}


// async function getInfo(): Promise<Info> {
//   return fetch(INFO_URL).then(handleHttpErrors);
// }

//This is the function you need to use to get the info from the backend.

async function getInfo(): Promise<Info> {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const headers = {
    'Authorization': `Bearer ${token}` // Include the token in the request headers
  };

  const response = await fetch(INFO_URL, { headers }); // Pass headers to fetch
  const info = await handleHttpErrors(response);
  return info;
}

export type { Recipe, Info };
// eslint-disable-next-line react-refresh/only-export-components
export { getCategories, getRecipes, getRecipe, addRecipe, deleteRecipe, getInfo };
