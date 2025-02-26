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
  CircularProgress,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPen } from "@fortawesome/free-solid-svg-icons"; // Import AI icon
import apiClient from "../services/api-client";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Google Generative AI

const genAI = new GoogleGenerativeAI("AIzaSyBK11yXUDTuSaNzpZ2GWbFDS38M9_yQ12k"); // Replace with your Google API key
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Replace with the actual model

interface AddPostProps {
  user: User;
}

const AddPost: FC<AddPostProps> = ({ user }) => {
  const [content, setContent] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loadingGPT, setLoadingGPT] = useState(false); // State to manage loading state for GPT
  const [suggestion, setSuggestion] = useState<string>(""); // State to hold the AI suggestion

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

  const handleGetGPTSuggestion = async () => {
    setLoadingGPT(true);
    setError(null);

    const retryWithBackoff = async <T,>(
      fn: () => Promise<T>,
      retries = 3,
      delay = 1000
    ): Promise<T> => {
      try {
        return await fn();
      } catch (err) {
        if (retries === 0) throw err;
        await new Promise((resolve) => setTimeout(resolve, delay));
        return retryWithBackoff(fn, retries - 1, delay * 2);
      }
    };

    try {
      const prompt = content.trim()
        ? `Improve the following post, Make it three lines longer than it is and add emojis: "${content}" Just one option without any additional text.`
        : `Write a post about anything you like in four lines and add emojis.`;

      const completion = await retryWithBackoff(() =>
        model.generateContent(prompt)
      );

      const suggestionText = completion.response.text().trim();
      setSuggestion(suggestionText);
    } catch (err) {
      console.error("Error getting GPT suggestion:", err);
      setError(
        "An error occurred while getting the suggestion. Please try again."
      );
    } finally {
      setLoadingGPT(false);
    }
  };

  const handleUseSuggestion = () => {
    setContent(suggestion);
  };

  return (
    <>
      <br />
      <Box
        display="flex"
        justifyContent="space-between"
        maxWidth="lg"
        mx="auto"
        p={4}
        boxShadow={3}
        borderRadius={2}
        bgcolor="background.paper"
      >
        <Box flex={1} mr={2}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Add New Post
          </Typography>
          <Button
                variant="outlined"
                color="primary"
                size="small" // Make the button smaller
                onClick={handleGetGPTSuggestion}
                disabled={loadingGPT}
                sx={{ width: "200px", height: "30px" }} // Set width and height
                startIcon={<FontAwesomeIcon icon={faPen} />} // Add AI icon
              >
                {loadingGPT ? (
                  <CircularProgress size={24} />
                ) : (
                  "Get AI Suggestion"
                )}
              </Button>
          <Stack spacing={2}>
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && (
              <Alert severity="success">{successMessage}</Alert>
            )}
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
             
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  my: 2,
                }}
              >
                
                <input
                  accept="image/png, image/jpeg"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<FontAwesomeIcon icon={faImage} />}
                  >
                    Upload Photos
                  </Button>
                </label>
                {photos.length > 0 && (
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}
                  >
                    {photos.map((photo, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(photo)}
                        alt={`Uploaded photo ${index}`}
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
              </Box>
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
        {suggestion && (
          <Box
            flex={1}
            ml={2}
            p={2}
            boxShadow={3}
            borderRadius={2}
            bgcolor="background.paper"
          >
            <Typography variant="h6" fontWeight="bold" mb={2}>
              AI Suggestion
            </Typography>
            <Typography variant="body1" mb={2}>
              {suggestion}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleUseSuggestion}
            >
              Use Suggestion
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AddPost;
