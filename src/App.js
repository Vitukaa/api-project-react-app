import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom';
import JsonApi from './pages/JsonApi';
import UserPage from './pages/UserPage';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='api-project-react-app/' element={
          <ul>
            <li>
            <Link to='/main-page' element={<JsonApi />}>Main page</Link>
            </li>
            <li>
            <Link to='/users' element={<UsersPage />}>Users</Link>
            </li>
          </ul>
        }>
        </Route>
        <Route path='api-project-react-app//main-page' element={<JsonApi />}></Route>
        <Route path='/users' element={<UsersPage />}></Route>
        <Route path='/users/:userId' element={<UserPage />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
