import { FC, useEffect, useState } from "react";
import { Grid, Container, Button, Box } from "@mui/material";
import ItemsList from "./ItemsList";
import usePosts from "../hooks/usePosts";
import useUsers from "../hooks/useUsers"; 

const PostsList: FC = () => {
  const { posts, isLoading, error } = usePosts();
  const { user: initialUser } = useUsers(); 
  const [user, setUser] = useState(initialUser);
  const [visiblePosts, setVisiblePosts] = useState(5);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  if (!user) {
    return <p>Please log in to view posts.</p>;
  }

  const sortedPosts = [...posts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleEditPost = (postId: string) => {
    console.log("Edit Post ID:", postId);
    // Add your edit logic here
  };

  const handleDeletePost = (postId: string) => {
    console.log("Delete Post ID:", postId);
    // Add your delete logic here
  };

  const handleLoadMorePosts = () => {
    setVisiblePosts((prev) => prev + 5);
  };

  return (
    <Container sx={{ padding: 2 }}>
      <br />
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {sortedPosts.length === 0 && !isLoading && <p>No posts available.</p>}
      
      <Grid container spacing={2}>
        {sortedPosts.slice(0, visiblePosts).map((post) => (
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
              onEditPost={handleEditPost}
              onDeletePost={handleDeletePost}
              showMenu={false} // Hide the menu in PostsList
            />
          </Grid>
        ))}
      </Grid>
      {visiblePosts < sortedPosts.length && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button onClick={handleLoadMorePosts} variant="contained">
            Load More
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default PostsList;

