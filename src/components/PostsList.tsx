import React from 'react';
import { Box } from '@mui/material';
import Post from './Post';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import avatar from '../assets/avatar.jpg';
const Posts: React.FC = () => {
    return ( //Here we will display all the posts and call them from DB
        <Box sx={{ padding: 2 }}>
          
            <Post 
                images={[
                    image1,
                    image2,
                    image3,
                    image4,
                    image5,
                ]} // מערך של תמונות
                userName="John Doe" // שם המשתמש
                subheader= "September 14, 2016" // תאריך
                content = {`Paradise Found: Koh Phi Phi, Thailand 🌴

                    If you're dreaming of turquoise waters, white sandy beaches, and unforgettable adventures, Koh Phi Phi is the place to be! From exploring the iconic Maya Bay to snorkeling with vibrant marine life, this island has it all.

                    Don’t miss the lively beach bars and stunning sunsets that make every moment magical. Perfect for both relaxation and adventure, Koh Phi Phi is a must-visit for your Thailand trip! ✨🌊

                    Have you been? Share your favorite memories below! 💙`} // תוכן
                authorAvatar = {avatar} // תמונת פרופיל
            />
            <Post 
                images={['https://source.unsplash.com/1600x900/?travel']} // מערך של תמונות
                userName="John Doe" // שם המשתמש
                subheader= "September 14, 2016" // תאריך
                content = "Amazing trip to Paris" // תוכן
                authorAvatar = "https://source.unsplash.com/1600x900/?avatar" // תמונת פרופיל
                />
        </Box>
    );
};

export default Posts;
