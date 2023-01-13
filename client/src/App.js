import React from 'react';
import { useState, useEffect } from 'react';
import { setContext } from '@apollo/client/link/context'


import Auth from './utils/auth'
import Home from './components/HomePage/index';
import { Players } from './components/Players';
import { Stats } from './components/Stats';
import { Analysis } from './components/Analysis';
import { Search } from './components/Search';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';
import { ApolloProvider, InMemoryCache, ApolloClient, createHttpLink } from '@apollo/client';


const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
     ...headers,
      authorization: token? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  const [loggedInState, setLoggedInState] = useState(false);
  const [pageSelected, setPageSelected] = useState('Home')

  useEffect(() => {
    const tokenInterval = setInterval(() => {
      if (Auth.loggedIn()) {
        setLoggedInState(true);
        // setPageSelected('Journal');
      }  else if (!pageSelected === 'Signup' && !pageSelected === 'Login'){
        setLoggedInState(false);
        setPageSelected('Home')
      } 
    }, 60000)
    if (Auth.loggedIn()) {
      setLoggedInState(true);
      // setPageSelected('Journal');
    }  else {
      setLoggedInState(false);
     
    } 
  })

  return (
    <ApolloProvider client={client}>
    <div className="App">
      
        <Navbar pageSelected={pageSelected} setPageSelected={setPageSelected}/>
        
        {pageSelected === 'Home' && <Home/>}
        {pageSelected === 'Players' && <Players/>}
        {pageSelected === 'Analysis' && <Analysis />}
        {pageSelected === 'Search' && <Search />}
        {pageSelected === 'Signup' && <Signup setPageSelected = { setPageSelected} />}
        {pageSelected === 'Stats' && <Stats />}
        {pageSelected === 'Login' && <Login setPageSelected = { setPageSelected } />}
        
        <Footer />
    </div>
    </ApolloProvider>
  );
}

export default App;
