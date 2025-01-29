import { FC } from "react";
import ItemsList from "./ItemsList";
import usePosts from "../hooks/usePosts";
import useUsers from "../hooks/useUsers"; // Assuming you have a hook to get the logged-in user

const PostsList: FC = () => {
  const { posts, isLoading, error } = usePosts();
  const { user } = useUsers(); // Get the logged-in user

  if (!user) {
    return <p>Please log in to view posts.</p>;
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {posts.length === 0 && !isLoading && <p>No posts available.</p>}
      
      {posts.map((post) => (
        <ItemsList
          key={post._id}
          _id={post._id}
          sender={post.sender}
          content={post.content}
          createdAt={post.createdAt}
          likes={post.likes}
          likesBy={post.likesBy}
          photos={post.photos}
          onItemSelected={(id) => console.log("Selected Post ID:", id)}
          user={user} // Pass the logged-in user to ItemsList
        />
      ))}
    </div>
  );
};

export default PostsList;