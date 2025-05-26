import React from 'react'
import Navbar from './Components/Navbar/navbar'
import Home from './Pages/home'
import Footer from './Components/Footer/footer'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AllBooks from './Pages/AllBooks'
import LogIn from './Pages/login'
import SignUp from './Pages/SignUp'
import Cart from './Pages/Cart'
import Profile from './Pages/Profile'
import BookDetails from './Pages/BookDetails'

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/all-books' element={<AllBooks />}/>
          <Route path='/view-book-details/:id' element={<BookDetails />}/>
          <Route path='/SignUp' element={<SignUp />}/>
          <Route path='/LogIn' element={<LogIn />}/>
        </Routes>
        <Footer />
      </Router>
</div>
);
}
export default App;
