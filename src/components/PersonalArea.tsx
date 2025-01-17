import React, { useState } from "react";
import { Box, Typography, Avatar, IconButton, Button, TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Post from "./Post"; // Import the Post component

const PersonalArea: React.FC = () => {
  const [userPosts, setUserPosts] = useState([
    {
      id: 1,
      images: [
        "https://via.placeholder.com/200",
        "https://via.placeholder.com/201",
      ],
      userName: "John Doe",
      subheader: "First Post",
      content: "This is the content of the first post.",
      authorAvatar: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      images: ["https://via.placeholder.com/202"],
      userName: "John Doe",
      subheader: "Second Post",
      content: "This is the content of the second post.",
      authorAvatar: "https://via.placeholder.com/150",
    },
  ]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostImages, setNewPostImages] = useState<File[]>([]);

  // Delete a post
  const handleDelete = (id: number) => {
    setUserPosts(userPosts.filter((post) => post.id !== id));
  };

  // Edit a post
  const handleEdit = (id: number) => {
    const newContent = prompt("Edit your post content:");
    if (newContent) {
      setUserPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === id ? { ...post, content: newContent } : post
        )
      );
    }
  };

  // Handle adding a new post
  const handleAddPost = () => {
    if (newPostContent.trim() === "") {
      alert("Please enter some content for your post.");
      return;
    }

    // Convert image files to URLs (base64 format)
    const imageUrls = newPostImages.map((file) => URL.createObjectURL(file));

    const newPost = {
      id: userPosts.length + 1,
      images: imageUrls,
      userName: "John Doe",
      subheader: `New Post #${userPosts.length + 1}`,
      content: newPostContent,
      authorAvatar: "https://via.placeholder.com/150",
    };

    setUserPosts([...userPosts, newPost]);
    setNewPostContent(""); // Clear content input field
    setNewPostImages([]); // Clear images input field
  };

  // Handle image file input
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setNewPostImages(Array.from(files));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        bgcolor:'#333', 
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          bgcolor: " #FF4081",
          p: 1,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="https://via.placeholder.com/150"
            alt="John Doe"
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Typography variant="h5" sx={{ color: "#fff" }}> 
            John Doe 
          </Typography>
        </Box>
        <IconButton sx={{ color: "#fff" }}>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* Add New Post Form */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          sx={{
            mb: 2,
            bgcolor: "#ffffff", 
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderColor: ' #FF4081', 
            },
          }}
        />
        <Box sx={{ mb: 2 }}>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
            style={{ border: "1px solid  #FF4081", padding: "5px", borderRadius: "4px" }}
          />
          {newPostImages.length > 0 && (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              {newPostImages.length} image(s) selected.
            </Typography>
          )}
        </Box>
        <Button
          variant="contained"
          onClick={handleAddPost}
          sx={{
            width: "100%",
            bgcolor: "#FF4081", 
            "&:hover": {
              bgcolor: "rgb(241, 163, 189)", 
            },
          }}
        >
          Add Post
        </Button>
      </Box>

      {/* User Posts */}
      <Box>
        {userPosts.map((post) => (
          <Box
            key={post.id}
            sx={{
              position: "relative",
              mb: 2,
              bgcolor: "#ffffff", 
              p: 2, 
              borderRadius: 2, 
              boxShadow: "none", // Removed the box shadow for a cleaner look
              border: "1px solid #FF4081", // Consistent border color
            }}
          >
            {/* Render the Post component */}
            <Post
              images={post.images}
              userName={post.userName}
              subheader={post.subheader}
              content={post.content}
              authorAvatar={post.authorAvatar}
            />
            {/* Edit and Delete Buttons */}
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                display: "flex",
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                size="small"
                startIcon={<EditIcon />}
                onClick={() => handleEdit(post.id)}
                sx={{
                  borderColor: "#FF4081", 
                  color: "#FFFFF",
                  "&:hover": {
                    borderColor: "#2c6d3f",
                    color: "#2c6d3f",
                  },
                }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(post.id)}
                sx={{
                  borderColor: "#d32f2f", 
                  color: "#d32f2f",
                  "&:hover": {
                    borderColor: "#c62828",
                    color: "#c62828",
                  },
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PersonalArea;
