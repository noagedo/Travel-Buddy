import React from 'react';
import NavBar from './components/NavBar';
import HomeBeforeSignIn from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

// import PersonalArea from './components/PersonalArea';
import AddPost from './components/AddPost';
import PostsList from './components/PostsList';



const App: React.FC = () => {
  

  
  return (
    <Router>
      <NavBar /> {}
      <Routes>
        <Route path="/" element={<HomeBeforeSignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/posts" element={<PostsList />} />
  
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
    </Router>
  );
};

export default App;
