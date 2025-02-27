import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './components/NavBar';
import HomeBeforeSignIn from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import PersonalArea from './components/PersonalArea';
import AddPost from './components/AddPost';
import PostsList from './components/PostsList';
import useUsers from './hooks/useUsers';
import theme from './theme';

const App: React.FC = () => {
  const { user } = useUsers();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeBeforeSignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/posts" element={<PostsList />} />
          <Route path="/personal-area" element={user ? <PersonalArea user={user} /> : <SignIn />} />
          <Route path="/add-post" element={user ? <AddPost user={user} /> : <SignIn />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
