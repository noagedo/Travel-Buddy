// import SignUp from "./components/SignUp";
// import NavBar from "./components/NavBar";
// import Post from "./components/Post";
// import image1 from "./assets/image1.jpg";
// import image2 from "./assets/image2.jpg";
// import image3 from "./assets/image3.jpg";
// import image4 from "./assets/image4.jpg";
// import image5 from "./assets/image5.jpg";
// import avatar from "./assets/avatar.jpg";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <NavBar />
//       <SignUp />
//       <Post
//         images={[image1, image2, image3, image4, image5]}
//         userName="Noa Gedo"
//         subheader="January 3, 2025"
//         content="Paradise Found: Koh Phi Phi, Thailand 🌴

//           If you're dreaming of turquoise waters, white sandy beaches, and unforgettable adventures, Koh Phi Phi is the place to be! From exploring the iconic Maya Bay to snorkeling with vibrant marine life, this island has it all.

//           Don’t miss the lively beach bars and stunning sunsets that make every moment magical. Perfect for both relaxation and adventure, Koh Phi Phi is a must-visit for your Thailand trip! ✨🌊

//           Have you been? Share your favorite memories below! 💙"
//         authorAvatar={avatar}
//       />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import Post from "./components/Post";
import image1 from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
import image3 from "./assets/image3.jpg";
import image4 from "./assets/image4.jpg";
import image5 from "./assets/image5.jpg";
import avatar from "./assets/avatar.jpg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <Router>
      <NavBar /> {/* מציג את ה-navbar בכל עמוד */}
      <SignUp />
        <Post
        images={[image1, image2, image3, image4, image5]}
        userName="Noa Gedo"
        subheader="January 3, 2025"
        content="Paradise Found: Koh Phi Phi, Thailand 🌴

          If you're dreaming of turquoise waters, white sandy beaches, and unforgettable adventures, Koh Phi Phi is the place to be! From exploring the iconic Maya Bay to snorkeling with vibrant marine life, this island has it all.

          Don’t miss the lively beach bars and stunning sunsets that make every moment magical. Perfect for both relaxation and adventure, Koh Phi Phi is a must-visit for your Thailand trip! ✨🌊

          Have you been? Share your favorite memories below! 💙"
        authorAvatar={avatar}
      />
      <Routes>
        {/* כאן נוסיף קומפוננטות נוספות עבור כל נתיב */}
      </Routes>
    </Router>
  );
};

export default App;
