import { FC, useState } from "react";
import postService, { Post } from "../services/post-service";
import { User } from "../services/user-service";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
import logoGif from "../assets/Travel Map.mp4";

interface AddPostProps {
  user: User;
}

const AddPost: FC<AddPostProps> = ({ user }) => {
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const newPost: Omit<Post, "_id" | "createdAt" | "likes" | "likesBy"> = {
      sender: user.userName,
      content,
      photos,
    };

    try {
      await postService.add(newPost as Post);
      setSuccessMessage("Post added successfully!");
      setContent("");
      setPhotos([]);
    } catch (err) {
      console.error("Error adding post:", err);
      setError("An error occurred while adding the post. Please try again.");
    }
  };

  return (
    <>
      <br />
      <Box
        maxWidth="sm"
        mx="auto"
        p={4}
        boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"
      >
        <Box
          sx={{ width: 150, height: 150, marginBottom: 2 }}
        >
          <video
            src={logoGif}
            style={{ width: "100%", height: "100%" }}
            autoPlay
            loop
            muted
          />
        </Box>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Add New Post
        </Typography>

        <Stack spacing={2}>
          {error && <Alert severity="error">{error}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3} mt={2}>
            <TextField
              id="content"
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default AddPost;