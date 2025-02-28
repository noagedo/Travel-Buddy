import { FC, useState, useEffect, useRef } from "react";
import { Avatar, Box, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Alert } from "@mui/material";
import usePosts from "../hooks/usePosts";
import useUsers from "../hooks/useUsers";
import UserPostsList from "./userPostsList";
import { User } from "../services/user-service";
import { Post } from "../services/post-service";
import postService from "../services/post-service";
import commentService, { Comment } from "../services/comment-service"; // Import comment service and Comment interface
import userService from "../services/user-service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

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
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [editPostImages, setEditPostImages] = useState<File[]>([]);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user) {
      setUserPosts(posts.filter((post) => post.sender === user.userName));
    }
  }, [posts, user]);

  const handleSave = async () => {
    setUpdateError(null);
    try {
      let avatarUrl = user.profilePicture;

      if (profilePicture) {
        const formData = new FormData();
        formData.append("file", profilePicture);
        const { request: uploadRequest } = userService.uploadImage(profilePicture);
        const uploadResponse = await uploadRequest;
        avatarUrl = uploadResponse.data.url;
      }

      const updatedUser = { ...user, userName, email, profilePicture: avatarUrl };
      const result = await updateUser(updatedUser);
      if (result.success) {
        // Update the user's name and profile picture in all posts
        const updatedPosts = userPosts.map((post) => ({
          ...post,
          sender: userName,
          senderProfilePicture: avatarUrl ?? "",
        }));
        await Promise.all(updatedPosts.map((post) => postService.update(post)));
        setPosts(posts.map((post): Post => (post.sender === user.userName ? { ...post, sender: userName, senderProfilePicture: avatarUrl ?? "" } : post)));

        // Update the user's name in all comments
        const { data: comments } = await (await commentService.getAll().request);
        const userComments = comments.filter((comment: Comment) => comment.sender === user.userName);
        const updatedComments = userComments.map((comment: Comment) => ({
          ...comment,
          sender: userName,
        }));
        await Promise.all(updatedComments.map((comment: Comment) => commentService.update(comment)));

        setEditMode(false);
        window.location.reload(); // Reload the page to reflect changes
      } else {
        setUpdateError(result.error ?? null);
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setUpdateError("Failed to update profile. Please try again.");
    }
  };

  const handleEditPost = (postId: string) => {
    const post = userPosts.find((post) => post._id === postId);
    if (post) {
      setEditPost(post);
      setEditPostImages([]);
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
    if (editPost) {
      try {
        let updatedPhotos = editPost.photos || [];

        if (editPostImages.length > 0) {
          const uploadedUrls = await Promise.all(
            editPostImages.map(async (image) => {
              const formData = new FormData();
              formData.append("file", image);
              const response = await userService.uploadImage(image).request;
              return response.data.url;
            })
          );
          updatedPhotos = uploadedUrls;
        }

        const updatedPost: Post = { ...editPost, photos: updatedPhotos };
        await postService.update(updatedPost as Post);
        setPosts(posts.map((post) => (post._id === editPost._id ? updatedPost : post)));
        setEditPost(null);
        setEditPostImages([]);
      } catch (err) {
        console.error("Error updating post:", err);
      }
    }
  };

  const handleCancelEditPost = () => {
    setEditPost(null);
    setEditPostImages([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setProfilePicture(files[0]);
    }
  };

  const handlePostImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setEditPostImages(Array.from(files));
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2} p={2} border={1} borderColor="grey.300" borderRadius={2}>
        <Avatar src={profilePicture ? URL.createObjectURL(profilePicture) : user.profilePicture} alt={user.userName} sx={{ width: 80, height: 80 }} />
        <Box ml={3} flex={1}>
          {editMode ? (
            <>
              <TextField
                label="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                variant="outlined"
                size="small"
                margin="dense"
                sx={{ width: 'auto' }}
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                size="small"
                margin="dense"
                sx={{ mt: 1, width: 'auto' }}
              />
              <Button
                variant="contained"
                component="label"
                sx={{ mt: 1 }}
              >
                <FontAwesomeIcon icon={faImage} />
                <input
                  ref={inputFileRef}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6">{user.userName}</Typography>
              <Typography variant="body2" color="textSecondary">Email: {user.email}</Typography>
            </>
          )}
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-start">
          {editMode ? (
            <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 1 }}>
              Save
            </Button>
          ) : (
            <Button variant="outlined" color="primary" onClick={() => setEditMode(true)} sx={{ mr: 1 }}>
              Edit Profile
            </Button>
          )}
        </Box>
      </Box>
      
      {updateError && <Alert severity="error">{updateError}</Alert>}
      
      <UserPostsList posts={userPosts} isLoading={isLoading} error={error ?? null} onEditPost={handleEditPost} onDeletePost={handleDeletePost} user={user} />
      
      <Dialog open={Boolean(editPost)} onClose={handleCancelEditPost}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            value={editPost?.content || ""}
            onChange={(e) => setEditPost(editPost ? { ...editPost, content: e.target.value } : null)}
            label="Post Content"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            <FontAwesomeIcon icon={faImage} />
            <input
              type="file"
              accept="image/png, image/jpeg"
              multiple
              onChange={handlePostImagesChange}
              style={{ display: 'none' }}
            />
          </Button>
          {editPostImages.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
              {editPostImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded image ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </Box>
          )}
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