import axios from 'axios';

const API_KEY = 'f38f2239ff114768b516873d495d8478';
const BASE_URL = 'https://api.spoonacular.com';

// export const fetchRecipes = async () => {
//   const response = await axios.get(`${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}`);
//   return response.data.results;
// };

export const fetchRecipes = async (offset = 0, limit = 10) => {
  const response = await axios.get(
    `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&offset=${offset}&number=${limit}`
  );
  return response.data;
};


export const fetchRecipeDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`);
  return response.data;
};
