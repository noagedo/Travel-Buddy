// import React, { useState } from 'react';
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   Typography,
//   Avatar,
//   IconButton,
//   Box,
//   Stack,
//   TextField,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
// } from '@mui/material';
// import {
//   MoreVert as MoreVertIcon,
//   Favorite as FavoriteIcon,
//   ArrowBack as ArrowBackIcon,
//   Comment as CommentIcon,
// } from '@mui/icons-material';


// interface PostProps {
//   images: string[];
//   userName: string;
//   subheader: string;
//   content: string;
//   authorAvatar: string;
// }

// const Post: React.FC<PostProps> = ({ images, userName, subheader, content, authorAvatar }) => {
//   const [isLiked, setIsLiked] = useState(false); // State for like button
//   const [likeCount, setLikeCount] = useState(0); // State for like count
//   const [comments, setComments] = useState<string[]>([]); // State for comments
//   const [newComment, setNewComment] = useState(''); // State for new comment input
//   const [showComments, setShowComments] = useState(false); // State to toggle between images and comments

//   // Toggle the like button and update the like count
//   const handleLike = () => {
//     if (isLiked) {
//       setLikeCount((prev) => Math.max(prev - 1, 0));
//     } else {
//       setLikeCount((prev) => prev + 1);
//     }
//     setIsLiked(!isLiked);
//   };

//   // Add a new comment
//   const handleAddComment = () => {
//     if (newComment.trim()) {
//       setComments([...comments, newComment]);
//       setNewComment('');
//     }
//   };

//   // Show comments instead of images
//   const handleViewComments = () => {
//     setShowComments(true);
//   };

//   // Show images instead of comments
//   const handleBackToImages = () => {
//     setShowComments(false);
//   };

//   return (
    
//     <Card sx={{ maxWidth: 600, margin: 'auto', boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
//       <CardHeader
//         avatar={<Avatar src={authorAvatar} alt={userName} />}
//         action={
//           <IconButton>
//             <MoreVertIcon />
//           </IconButton>
//         }
//         title={userName}
//         subheader={subheader}
//       />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary" gutterBottom>
//           {content}
//         </Typography>

//         {/* Like Button and Like Count */}
//         <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
//           <IconButton onClick={handleLike}>
//             <FavoriteIcon sx={{ color: isLiked ? 'red' : 'gray' }} />
//           </IconButton>
//           <Typography variant="body2" sx={{ marginLeft: 1 }}>
//             {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
//           </Typography>
//         </Box>

//         {/* View Comments or Back to Images */}
//         <Box sx={{ marginBottom: 2 }}>
//           <Button
//             variant="outlined"
//             startIcon={showComments ? <ArrowBackIcon /> : <CommentIcon />}
//             onClick={showComments ? handleBackToImages : handleViewComments}
//           >
//             {showComments ? 'Back to Images' : 'View Comments'}
//           </Button>
//         </Box>

//         {/* Display Images or Comments */}
//         {!showComments ? (
//           <Box
//             sx={{
//               display: 'flex',
//               overflowX: 'scroll',
//               gap: 2,
//               padding: 2,
//             }}
//           >
//             {images.map((image, index) => (
//               <Box
//                 key={index}
//                 component="img"
//                 src={image}
//                 sx={{
//                   height: 200,
//                   borderRadius: '8px',
//                   boxShadow: 2,
//                   objectFit: 'cover',
//                 }}
//               />
//             ))}
//           </Box>
//         ) : (
//           <Box>
//             <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
//               <TextField
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 label="Add a comment"
//                 variant="outlined"
//                 fullWidth
//               />
//               <Button variant="contained" onClick={handleAddComment}>
//                 Add
//               </Button>
//             </Stack>
//             <List>
//               {comments.map((comment, index) => (
//                 <ListItem key={index}>
//                   <ListItemText primary={comment} />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         )}
//       </CardContent>
//     </Card>

    
//   );

  
// };

// export default Post;
function Post() {
  return (
      <div>
          <h1>Post Title</h1>
          <p>Post Content</p>
      </div>
  )
}

export default Post