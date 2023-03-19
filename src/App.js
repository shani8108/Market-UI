import './App.css';
import Department from './Pages/Department';
import Details from './Pages/Details';
import Products from './Pages/Products';
import { Route, Routes, NavLink } from 'react-router-dom';


function App() {
  return (
    <div className="App container">
      <h3 className='d-flex justify-content-center m-3'>
        Market Example
      </h3>
      <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
        <ul className='navbar-nav'>
          <li className='nav-iten m-1' key={1}>
            <NavLink className='btn btn-light btn-outline-primary' to='/Products'>
              Products
            </NavLink>
          </li>
          <li className='nav-iten m-1' key={2}>
            <NavLink className='btn btn-light btn-outline-primary' to='/Department'>
              Department
            </NavLink>
          </li>
          <li className='nav-iten m-1' key={3}>
            <NavLink className='btn btn-light btn-outline-primary' to='/Details'>
              Details
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/Department' element={<Department />} />
        <Route path='/Details' element={<Details />} />
        <Route path='/Products' element={<Products />} />
      </Routes>

    </div>
  );
}

export default App;
