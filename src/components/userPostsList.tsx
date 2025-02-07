import { FC } from "react";
import { Grid } from "@mui/material";
import ItemsList from "./ItemsList";
import { Post } from "../services/post-service";
import { User } from "../services/user-service"; // Import User interface

interface UserPostsListProps {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  onEditPost: (postId: string) => void; // Add onEditPost prop
  onDeletePost: (postId: string) => void; // Add onDeletePost prop
  user: User; // Add user prop
}

const UserPostsList: FC<UserPostsListProps> = ({ posts, isLoading, error, onEditPost, onDeletePost, user }) => {
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {posts.length === 0 && !isLoading && <p>No posts available.</p>}
      
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} key={post._id}>
            <ItemsList
              _id={post._id}
              sender={post.sender}
              senderProfilePicture={post.senderProfilePicture} // Pass senderProfilePicture prop
              content={post.content}
              createdAt={post.createdAt}
              likes={post.likes}
              likesBy={post.likesBy}
              photos={post.photos}
              onItemSelected={(id) => console.log("Selected Post ID:", id)}
              onEditPost={onEditPost} // Pass onEditPost prop
              onDeletePost={onDeletePost} // Pass onDeletePost prop
              user={user} // Pass the user prop
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserPostsList;