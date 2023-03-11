import { BrowserRouter, Link, NavLink, Route, Router, Routes } from 'react-router-dom';
import Navigation from './pages/components/Navigation';
import CreateUserPage from './pages/CreateUserPage';
import EditUserPage from './pages/EditUserPage';
import JsonApi from './pages/MainPage';
import PetsPage from './pages/PetsPage';
import UserPage from './pages/UserPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<JsonApi />}></Route>
          
          <Route path='/users' element={<UsersPage />}></Route>
          <Route path='/users/new' element={<CreateUserPage />}></Route>
          <Route path='/users/:userId' element={<UserPage />}></Route>
          <Route path='/users/:userId/edit' element={<EditUserPage />}></Route>

          <Route path='/pets' element={<PetsPage />}></Route>
          <Route path='/pets/new' element={<PetsPage />}></Route>
          <Route path='/pets/:petId' element={<PetsPage />}></Route>
          <Route path='/pets/:petId/edit' element={<PetsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
