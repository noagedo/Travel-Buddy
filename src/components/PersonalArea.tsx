import { FC, useState, useEffect } from "react";
import { Avatar, Box, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import usePosts from "../hooks/usePosts";
import useUsers from "../hooks/useUsers";
import UserPostsList from "./userPostsList";
import { User } from "../services/user-service";
import { Post } from "../services/post-service";
import postService from "../services/post-service";

interface PersonalAreaProps {
  user: User;
}

const PersonalArea: FC<PersonalAreaProps> = ({ user }) => {
  const { posts, isLoading, error, setPosts } = usePosts();
  const { updateUser } = useUsers();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [editPostContent, setEditPostContent] = useState<string>("");

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

  const handleEditPost = (postId: string) => {
    const post = userPosts.find((post) => post._id === postId);
    if (post) {
      setEditPostId(postId);
      setEditPostContent(post.content);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await postService.delete(postId);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleSaveEditPost = async () => {
    if (editPostId) {
      try {
        const updatedPost: Post = { ...userPosts.find((post) => post._id === editPostId)!, content: editPostContent };
        await postService.update(updatedPost as Post);
        setPosts(posts.map((post) => (post._id === editPostId ? updatedPost : post)));
        setEditPostId(null);
        setEditPostContent("");
      } catch (err) {
        console.error("Error updating post:", err);
      }
    }
  };

  const handleCancelEditPost = () => {
    setEditPostId(null);
    setEditPostContent("");
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
      <UserPostsList posts={userPosts} isLoading={isLoading} error={error ?? null} onEditPost={handleEditPost} onDeletePost={handleDeletePost} user={user} />
      
      <Dialog open={Boolean(editPostId)} onClose={handleCancelEditPost}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            value={editPostContent}
            onChange={(e) => setEditPostContent(e.target.value)}
            label="Post Content"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEditPost} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEditPost} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PersonalArea;