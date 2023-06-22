/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { Landing, Home, RecipeDetail, CreateRecipe, NotFound } from './pages';
import { NavBar } from './components';
import { setAllRecipes } from './redux/thunkMiddlewares';
import './App.less';

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setAllRecipes());
   }, []);

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
