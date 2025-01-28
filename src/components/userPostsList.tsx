import { FC } from "react";
import ItemsList from "./ItemsList";
import { Post } from "../services/post-servies";

interface UserPostsListProps {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

const UserPostsList: FC<UserPostsListProps> = ({ posts, isLoading, error }) => {
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
          photos={post.photos}
          onItemSelected={(id) => console.log("Selected Post ID:", id)}
        />
      ))}
    </div>
  );
};

export default UserPostsList;