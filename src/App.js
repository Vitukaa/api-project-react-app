import { BrowserRouter, Link, NavLink, Route, Router, Routes } from 'react-router-dom';
import Navigation from './pages/components/Navigation';
import CreatePetPage from './pages/CreatePetPage';
import CreatePostPage from './pages/CreatePostPage';
import CreateUserPage from './pages/CreateUserPage';
import EditPetPage from './pages/EditPetPage';
import EditPostPage from './pages/EditPostPage';
import EditUserPage from './pages/EditUserPage';
import JsonApi from './pages/MainPage';
import PetPage from './pages/PetPage';
import PetsPage from './pages/PetsPage';
import PostPage from './pages/PostPage';
import PostsPage from './pages/PostsPage';
import UserPage from './pages/UserPage';
import UserPosts from './pages/UserPosts';
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
          <Route path='/users/:userId/posts' element={<UserPosts />}></Route>

          <Route path='/posts' element={<PostsPage />}></Route>
          <Route path='/posts/new' element={<CreatePostPage />}></Route>
          <Route path='/posts/:postId' element={<PostPage />}></Route>
          <Route path='/posts/:postId/edit' element={<EditPostPage />}></Route>

          <Route path='/pets' element={<PetsPage />}></Route>
          <Route path='/pets/new' element={<CreatePetPage />}></Route>
          <Route path='/pets/:petId' element={<PetPage/>}></Route>
          <Route path='/pets/:petId/edit' element={<EditPetPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
