import { FC, useEffect, useState } from "react";
import { Grid, Container } from "@mui/material";
import ItemsList from "./ItemsList";
import usePosts from "../hooks/usePosts";
import useUsers from "../hooks/useUsers"; 

const PostsList: FC = () => {
  const { posts, isLoading, error } = usePosts();
  const { user: initialUser } = useUsers(); 
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  if (!user) {
    return <p>Please log in to view posts.</p>;
  }

  return (
    <Container sx={{ padding: 2 }}>
      <br />
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
              user={user}
              onEditPost={(id) => console.log("Edit Post ID:", id)}
              onDeletePost={(id) => console.log("Delete Post ID:", id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PostsList;

