import React, { FC, useState } from "react";
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
  ListItemAvatar,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import postService from "../services/post-service";
import { User } from "../services/user-service"; // Assuming you have a User interface
import commentService from "../services/comment-service"; // Import comment service
import useComments from "../hooks/useComments"; // Import useComments hook

interface ItemsListProps {
  _id: string;
  sender: string;
  senderProfilePicture: string; // Add senderProfilePicture prop
  content: string;
  createdAt: string;
  likes: number;
  likesBy: string[];
  photos: string[];
  onItemSelected: (index: number) => void;
  user?: User; 
  onEditPost?: (postId: string) => void; // Make onEditPost prop optional
  onDeletePost?: (postId: string) => void; // Make onDeletePost prop optional
}

const ItemsList: FC<ItemsListProps> = ({ _id, sender, senderProfilePicture, content, createdAt, likes, likesBy, photos, user, onEditPost, onDeletePost }) => {
  const [isLiked, setIsLiked] = useState(user && user._id ? likesBy.includes(user._id) : false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { comments, setComments, isLoading, error } = useComments(_id); // Use useComments hook
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

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
        senderProfilePicture,
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

  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        const comment = {
          postId: _id,
          userId: user?._id || "", 
          profilePicture: user?.profilePicture || "",
          sender: user?.userName || "", 
          content: newComment,
          createdAt: new Date().toISOString(),
        };
        const { request } = commentService.add(comment); 
        const response = await request;
        setComments([...comments, response.data]); // Add the new comment object to the state
        setNewComment("");
      } catch (err) {
        console.error("Error adding comment:", err);
      }
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditPost = () => {
    if (onEditPost) {
      onEditPost(_id);
    }
    handleMenuClose();
  };

  const handleDeletePost = () => {
    setOpenConfirmDialog(true);
    handleMenuClose();
  };

  const handleConfirmDelete = () => {
    if (onDeletePost) {
      onDeletePost(_id);
    }
    setOpenConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", boxShadow: 3, borderRadius: 2, marginBottom: 2 }}>
      
      <CardHeader
        avatar={<Avatar src={senderProfilePicture}></Avatar>} // Use senderProfilePicture
        action={
          user && user.userName === sender && onEditPost && onDeletePost && (
            <>
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleEditPost}>Edit</MenuItem>
                <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
              </Menu>
            </>
          )
        }
        title={sender}
        subheader={new Date(createdAt).toLocaleString()}
      />

      <CardContent>
        
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {content}
        </Typography>

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
            {isLoading && <p>Loading comments...</p>}
            {error && <p>{error}</p>}
            <List>
              {comments.map((comment, index) => (
                <ListItem key={index} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={comment.sender} src={comment.sender} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {comment.sender}
                      </Typography>
                      <br />
                      <Typography
                        sx={{ wordWrap: 'break-word' }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        {comment.content}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              ))}
            </List>
          </Box>
        )}
      </CardContent>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this post? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ItemsList;