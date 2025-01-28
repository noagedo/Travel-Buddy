import { FC, useState, useEffect } from "react";
import { Avatar, Box, Typography, TextField, Button } from "@mui/material";
import usePosts from "../hooks/usePosts";
import useUsers from "../hooks/useUsers";
import UserPostsList from "./UserPostsList";
import { User } from "../services/user-servies";
import { Post } from "../services/post-servies";
interface PersonalAreaProps {
  user: User;
}

const PersonalArea: FC<PersonalAreaProps> = ({ user }) => {
  const { posts, isLoading, error } = usePosts();
  const { updateUser } = useUsers();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
    if (user) {
      setUserPosts(posts.filter((post) => post.sender === user.userName));
    }
  }, [posts, user]);

  const handleSave = async () => {
    const updatedUser = { ...user, userName, email };
    const result = await updateUser(updatedUser);
    if (result.success) {
      setEditMode(false);
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar src={user.profilePicture} alt={user.userName} />
        {editMode ? (
          <TextField
            label="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            variant="outlined"
            size="small"
            margin="dense"
            sx={{ ml: 2 }}
          />
        ) : (
          <Typography variant="h5" ml={2}>{user.userName}</Typography>
        )}
      </Box>
      {editMode ? (
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          size="small"
          margin="dense"
          sx={{ ml: 2 }}
        />
      ) : (
        <Typography variant="h5" ml={2}>email: {user.email}</Typography>
      )}
      <Box mt={2}>
        {editMode ? (
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        )}
      </Box>
      <UserPostsList posts={userPosts} isLoading={isLoading} error={error ?? null} />
    </Box>
  );
};

export default PersonalArea;