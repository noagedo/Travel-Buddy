import { FC, useState } from "react";
import postService, { Post } from "../services/post-service";
import { User } from "../services/user-service";
import { Box, Button, TextField, Typography, Alert, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import apiClient from "../services/api-client";

interface AddPostProps {
  user: User;
}

const AddPost: FC<AddPostProps> = ({ user }) => {
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      // Upload each photo and get URLs
      const uploadedUrls = await Promise.all(
        photos.map(async (photo) => {
          const formData = new FormData();
          formData.append("file", photo);
          const response = await apiClient.post("/file", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return response.data.url;
        })
      );

      const newPost: Omit<Post, "_id" | "createdAt" | "likes" | "likesBy"> = {
        sender: user.userName,
        senderProfilePicture: user.profilePicture || "", // Include senderProfilePicture
        content,
        photos: uploadedUrls,
      };

      await postService.add(newPost as Post);
      setSuccessMessage("Post added successfully!");
      setContent("");
      setPhotos([]);
    } catch (err) {
      console.error("Error adding post:", err);
      setError("An error occurred while adding the post. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validFileTypes = ["image/jpeg", "image/png"];
      const selectedFiles = Array.from(files).filter((file) =>
        validFileTypes.includes(file.type)
      );
      setPhotos(selectedFiles);
    }
  };

  return (
    <>
      <br />
      <Box maxWidth="sm" mx="auto" p={4} boxShadow={3} borderRadius={2} bgcolor="background.paper">
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
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", my: 2 }}>
              <input
                accept="image/png, image/jpeg"
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="contained" color="primary" component="span" startIcon={<FontAwesomeIcon icon={faImage} />}>
                  Upload Photos
                </Button>
              </label>
              {photos.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                  {photos.map((photo, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(photo)}
                      alt={`Uploaded photo ${index}`}
                      style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                    />
                  ))}
                </Box>
              )}
            </Box>
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
