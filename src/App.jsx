import './App.css';
import { useDispatch } from 'react-redux';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import React, { useEffect, useState } from 'react';
import { login, logout } from '../store/authSlice'; // Removed unused import 'authSlice'
import authService from '../appwrite/auth';
import Block from '../components/Block/Block';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentuser().then((userData) => {
      if (userData) {
        dispatch(login({ userData }));
      } else {
        dispatch(logout());
      }
    }).finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div>
      <Header />
      <Block />
      <Footer />
    </div>
  ) : null;
}

export default App;
