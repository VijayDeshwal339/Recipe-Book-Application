import axios from 'axios';

const API_KEY = 'f38f2239ff114768b516873d495d8478';
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
