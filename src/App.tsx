import React from 'react';
import NavBar from './components/NavBar';
import HomeBeforeSignIn from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Posts from './components/Posts';
import PersonalArea from './components/PersonalArea';
//import SignUp from './components/SignUp';
//import Post from './components/Post';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar /> {/* מציג את ה-navbar בכל עמוד */}
      <Routes>
        <Route path="/" element={<HomeBeforeSignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/personal-area" element={<PersonalArea />} />
      </Routes>
    </Router>
  );
};

export default App;
