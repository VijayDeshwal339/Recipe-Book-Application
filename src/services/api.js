import axios from 'axios';

const API_KEY = '8cb9a1f8859a47bfbe0e0df97c463245';
const BASE_URL = 'https://api.spoonacular.com';

export const fetchRecipes = async (query = '', offset = 0, limit = 10) => {
  const url = `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&offset=${offset}&number=${limit}&query=${query}&addRecipeInformation=true`;
  const response = await axios.get(url);
  return response.data;
};



export const fetchRecipeDetails = async (id) => {
  const url = `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};
