import axios from 'axios';

const API_KEY = 'a5f57eaf8087490eabb315eb8e0621ab';
const BASE_URL = 'https://api.spoonacular.com';

export const fetchRecipes = async (query = '', offset = 0, limit = 10) => {
  const url = `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&offset=${offset}&number=${limit}&query=${query}`;
  const response = await axios.get(url);
  return response.data;
};

export const fetchRecipeDetails = async (id) => {
  const url = `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`;
  const response = await axios.get(url);
  return response.data;
};
