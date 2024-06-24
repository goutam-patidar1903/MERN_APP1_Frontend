import React from 'react';
import {BrowserRouter , Routes , Route} from 'react-router-dom';


// import pages and components 
import Home from './pages/Home'
import Navbar from './components/Navbar';

const App = ()=>{

  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;