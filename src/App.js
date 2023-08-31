import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './Register'
import VerifyEmail from './VerifyEmail';
import Login from './Login'
import {useState, useEffect} from 'react'
import {AuthProvider} from './AuthContext'
import {auth} from './Firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './PrivateRoute'
import {Navigate} from 'react-router-dom'
import Dashboard from './Dashboard';
import Hero from './Hero';
import Features from './Features';
import Nav from './Nav';
import Profile from './Profile';
import Range from './Range';
import Update from './Update';
import View from './View';
import Flow1 from './Flow1';
import Flow2 from './Flow2';
import Flow3 from './Flow3';
import Flow4 from './Flow4';

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
        // Replace this route configuration in App.js
        <Route exact path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route exact path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
         <Route exact path="/range" element={<PrivateRoute><Range/></PrivateRoute>} />
        <Route exact path="/hero" element={<PrivateRoute><Hero/></PrivateRoute>} />
        <Route exact path="/nav" element={<PrivateRoute><Nav/></PrivateRoute>} />
        <Route exact path="/features" element={<PrivateRoute><Features/></PrivateRoute>} />
        
        <Route exact path="/update" element={<PrivateRoute><Update/></PrivateRoute>} />
        <Route exact path="/view" element={<PrivateRoute><View/></PrivateRoute>} />
        <Route exact path="/flow" element={<PrivateRoute><Flow1/></PrivateRoute>} />
        {/* <Route exact path="/flow2" element={<Flow2/>} /> */}
        <Route exact path="/flow2" element={<PrivateRoute><Flow2/></PrivateRoute>} />
        <Route exact path="/flow3" element={<PrivateRoute><Flow3/></PrivateRoute>} />
        <Route exact path="/flow4" element={<PrivateRoute><Flow4/></PrivateRoute>} />

          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Navigate to='/' replace/>
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified 
            ? <Register/>
            : <Navigate to='/' replace/>
          } />
          <Route path='/verify-email' element={<VerifyEmail/>} /> 
        </Routes>  
      </AuthProvider>
  </Router>
  );
}

export default App;