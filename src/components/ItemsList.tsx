import { FC, useState} from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
  Stack,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import postService from "../services/post-service";
import { User } from "../services/user-service"; // Assuming you have a User interface

interface ItemsListProps {
  _id: string;
  sender: string;
  content: string;
  createdAt: string;
  likes: number;
  likesBy: string[];
  photos: string[];
  onItemSelected: (index: number) => void;
  user?: User; // Add the logged-in user prop
}

const ItemsList: FC<ItemsListProps> = ({ _id, sender, content, createdAt, likes, likesBy, photos, user }) => {
  const [isLiked, setIsLiked] = useState(user && user._id ? likesBy.includes(user._id) : false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const handleLike = async () => {
    if (!user) return; // Ensure user is defined

    const newLikes = isLiked ? currentLikes - 1 : currentLikes + 1;
    const newLikesBy = isLiked ? likesBy.filter(id => id !== user._id) : [...likesBy, user._id!];

    setIsLiked(!isLiked);
    setCurrentLikes(newLikes);

    try {
      await postService.update({
        _id,
        sender,
        content,
        createdAt,
        likes: newLikes,
        likesBy: newLikesBy,
        photos,
      });
    } catch (err) {
      console.error("Error updating likes:", err);
      // Revert the state if the update fails
      setIsLiked(isLiked);
      setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
    }
  };

  const handleViewComments = () => {
    setShowComments(true);
  };

  const handleBackToImages = () => {
    setShowComments(false);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
      {/* Header with avatar and sender info */}
      <CardHeader
        avatar={<Avatar>{sender.charAt(0).toUpperCase()}</Avatar>}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={sender}
        subheader={new Date(createdAt).toLocaleString()}
      />

      <CardContent>
        {/* Content */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {content}
        </Typography>

        {/* Like Button and Like Count */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <IconButton onClick={handleLike}>
            <FavoriteIcon sx={{ color: isLiked ? "red" : "gray" }} />
          </IconButton>
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {currentLikes} {currentLikes === 1 ? "Like" : "Likes"}
          </Typography>
        </Box>

        {/* View Comments or Back to Images */}
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="outlined"
            startIcon={showComments ? <ArrowBackIcon /> : <CommentIcon />}
            onClick={showComments ? handleBackToImages : handleViewComments}
          >
            {showComments ? "Back to Images" : "View Comments"}
          </Button>
        </Box>

        {/* Display Images or Comments */}
        {!showComments ? (
          <Box
            sx={{
              display: "flex",
              overflowX: "scroll",
              gap: 2,
              padding: 2,
            }}
          >
            {photos.map((photo, index) => (
              <Box
                key={index}
                component="img"
                src={photo}
                sx={{
                  height: 200,
                  borderRadius: "8px",
                  boxShadow: 2,
                  objectFit: "cover",
                }}
              />
            ))}
          </Box>
        ) : (
          <Box>
            <Stack direction="row" spacing={1} sx={{ marginBottom: 2 }}>
              <TextField
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                label="Add a comment"
                variant="outlined"
                fullWidth
              />
              <Button variant="contained" onClick={handleAddComment}>
                Add
              </Button>
            </Stack>
            <List>
              {comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemText primary={comment} />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ItemsList;