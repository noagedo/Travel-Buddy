import React from 'react';
import { Box } from '@mui/material';
import Post from './Post';

const Posts: React.FC = () => {
    return ( //Here we will display all the posts and call them from DB
        <Box sx={{ padding: 2 }}>
          
            <Post 
                images={['https://source.unsplash.com/1600x900/?travel']} // מערך של תמונות
                userName="John Doe" // שם המשתמש
                subheader= "September 14, 2016" // תאריך
                content = "Amazing trip to Paris" // תוכן
                authorAvatar = "https://source.unsplash.com/1600x900/?avatar" // תמונת פרופיל
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
