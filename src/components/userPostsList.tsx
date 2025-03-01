import { FC } from "react";
import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import ItemsList from "./ItemsList";
import { Post } from "../services/post-service";
import { User } from "../services/user-service"; 

interface UserPostsListProps {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  onEditPost: (postId: string) => void; 
  onDeletePost: (postId: string) => void; 
  user: User; 
}

const UserPostsList: FC<UserPostsListProps> = ({ posts, isLoading, error, onEditPost, onDeletePost, user }) => {
  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid item xs={12} sm={6} md={4} key={post._id}>
          <Box p={2}>
            <ItemsList
              _id={post._id}
              sender={post.sender}
              senderProfilePicture={post.senderProfilePicture} 
              content={post.content}
              createdAt={post.createdAt}
              likes={post.likes}
              likesBy={post.likesBy}
              photos={post.photos}
              onItemSelected={(id) => console.log("Selected Post ID:", id)}
              onEditPost={onEditPost} 
              onDeletePost={onDeletePost} 
              user={user} 
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserPostsList;