import './App.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';
import UserContext from './utils/UserContext';
import { useState } from 'react';

const App = () => {

const [user, setUser] = useState({ user: {name: 'sameera', email: 'sam@yahoo.in'}});


  return (
    <div className="app">
      <UserContext.Provider value = {user}>
          <Header/>
          <Outlet/>
          <Footer/>
      </UserContext.Provider>
       
    </div>
  );
}

export default App;
