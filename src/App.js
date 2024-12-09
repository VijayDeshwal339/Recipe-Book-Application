import { BrowserRouter , Routes, Route } from 'react-router';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Navbar from './components/Navbar';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
    </Routes>
  </BrowserRouter>
);

export default App;
