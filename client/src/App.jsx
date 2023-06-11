import { Routes, Route } from 'react-router-dom';

import { Landing, Home, RecipeDetail, CreateRecipe, NotFound } from './pages';
import './App.less';
import { NavBar } from './components';

function App() {
   return (
      <>
         <NavBar />
         <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/home' element={<Home />} />
            <Route path='/detail/:id' element={<RecipeDetail />} />
            <Route path='/create' element={<CreateRecipe />} />
            <Route path='*' element={<NotFound />} />
         </Routes>
      </>
   );
}

export default App;
