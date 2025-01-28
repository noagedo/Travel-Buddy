import React from 'react';
import NavBar from './components/NavBar';
import HomeBeforeSignIn from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

import PersonalArea from './components/PersonalArea';
import AddPost from './components/AddPost';
import PostsList from './components/PostsList';
import useUsers from './hooks/useUsers';


const App: React.FC = () => {
  const { user } = useUsers();

  
  return (
    <Router>
      <NavBar /> {}
      <Routes>
        <Route path="/" element={<HomeBeforeSignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/personal-area" element={user ? <PersonalArea user={user} /> : <SignIn />} />
        <Route path="/add-post" element={user ? <AddPost user={user} /> : <SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
