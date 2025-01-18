// import { FC, useState, useEffect } from "react";
// import { Avatar, Box, Button, Typography, Card, CardContent } from "@mui/material";
// import { Post } from "../services/post-servies"; // Assuming you have a Post type for structure
// import usePosts from "../hooks/usePosts";
// import ItemsList from "./ItemsList";

// interface PersonalAreaProps {
//   user: {
//     name: string;
//     profilePicture: string;
//     likedPosts: number[]; // Array of post IDs that the user liked
//   };
// }

// const PersonalArea: FC<PersonalAreaProps> = ({ user }) => {
//   const { posts, isLoading, error } = usePosts();
//   const [userPosts, setUserPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     // Filter the posts created by the user
//     setUserPosts(posts.filter((post) => post.sender === user.name));
//   }, [posts, user.name]);

//   const handleDeletePost = (postId: number) => {
//     // Delete the post logic
//     console.log("Deleting post with ID:", postId);
//   };

//   const handleEditPost = (postId: number) => {
//     // Edit the post logic (e.g., open an edit modal or redirect to an edit page)
//     console.log("Editing post with ID:", postId);
//   };

//   const likedPosts = posts.filter((post) => user.likedPosts.includes(post._id));

//   return (
//     <div>
//       <Box display="flex" alignItems="center" mb={4}>
//         <Avatar src={user.profilePicture} sx={{ width: 56, height: 56 }} />
//         <Typography variant="h5" ml={2}>
//           {user.name}
//         </Typography>
//       </Box>

//       {/* User's Posts */}
//       <Typography variant="h6" gutterBottom>
//         My Posts
//       </Typography>
//       {isLoading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       {userPosts.length === 0 && !isLoading && <p>No posts available.</p>}

//       {userPosts.map((post) => (
//         <Card key={post._id} sx={{ mb: 2 }}>
//           <CardContent>
//             <Typography variant="h6">{post.content}</Typography>
//             <Box display="flex" justifyContent="space-between" mt={2}>
//               <Button onClick={() => handleEditPost(post._id)} color="primary">
//                 Edit
//               </Button>
//               <Button onClick={() => handleDeletePost(post._id)} color="secondary">
//                 Delete
//               </Button>
//             </Box>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Liked Posts */}
//       <Typography variant="h6" gutterBottom mt={4}>
//         Liked Posts
//       </Typography>
//       {likedPosts.length === 0 && <p>No liked posts yet.</p>}
//       {likedPosts.map((post) => (
//         <ItemsList
//           key={post._id}
//           _id={post._id}
//           sender={post.sender}
//           content={post.content}
//           createdAt={post.createdAt}
//           likes={post.likes}
//           photos={post.photos}
//           onItemSelected={(id) => console.log("Selected Post ID:", id)}
//         />
//       ))}
//     </div>
//   );
// };

// export default PersonalArea;
