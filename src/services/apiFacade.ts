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
let recipes: Array<Recipe> = [];

async function getCategories(): Promise<Array<string>> {
  if (categories.length > 0) return [...categories];
  const res = await fetch(CATEGORIES_URL).then(handleHttpErrors);
  categories = [...res];
  return categories;
}
async function getRecipes(category: string | null): Promise<Array<Recipe>> {
  //if (recipes.length > 0) return [...recipes];
  console.log("category", category);
  const queryParams = category ? "?category=" + category : "";
  const res = await fetch(RECIPE_URL + queryParams).then(handleHttpErrors);
  recipes = res;
  return recipes;
}
async function getRecipe(id: number): Promise<Recipe> {
  //if (recipes.length > 0) return [...recipes];
  const recipe = await fetch(RECIPE_URL + "/" + id).then(handleHttpErrors);
  return recipe;
}
async function addRecipe(newRecipe: Recipe): Promise<Recipe> {
  const method = newRecipe.id ? "PUT" : "POST";
  const options = makeOptions(method, newRecipe);
  const URL = newRecipe.id ? `${RECIPE_URL}/${newRecipe.id}` : RECIPE_URL;
  const recipe = await fetch(URL, options).then(handleHttpErrors);
  return recipe;
}
async function deleteRecipe(id: number): Promise<Recipe> {
  const options = makeOptions("DELETE", null);
  const recipe = await fetch(`${RECIPE_URL}/${id}`, options).then(handleHttpErrors);
  return recipe;
}

async function getInfo(): Promise<Info> {
  const info = await fetch(INFO_URL).then(handleHttpErrors);
  return info;
}

export type { Recipe, Info };
// eslint-disable-next-line react-refresh/only-export-components
export { getCategories, getRecipes, getRecipe, addRecipe, deleteRecipe, getInfo };
