import { FC, useState } from "react";
import { Card, CardContent, Typography, Box, Avatar, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface ItemsListProps {
  _id: number;
  sender: string;
  content: string;
  createdAt: string;
  likes: number;
  photos: string[];
  onItemSelected: (index: number) => void;
}

const ItemsList: FC<ItemsListProps> = ({ _id, sender, content, createdAt, likes, photos, onItemSelected }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleSelect = () => {
    setSelected(!selected);
    onItemSelected(_id);
  };

  return (
    <Card 
      sx={{ marginBottom: 2, border: selected ? '2px solid blue' : 'none' }}
      onClick={handleSelect}
    >
      <CardContent>
        {/* Sender Info */}
        <Box display="flex" alignItems="center">
          <Avatar>{sender.charAt(0).toUpperCase()}</Avatar>
          <Box ml={2}>
            <Typography variant="h6">{sender}</Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(createdAt).toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Post Content */}
        <Typography variant="body1" mt={2}>
          {content}
        </Typography>

        {/* Post Images */}
        {photos.length > 0 && photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Post photo ${index}`}
            style={{ width: '100%', marginTop: '10px', borderRadius: '8px' }}
          />
        ))}

        {/* Likes Section */}
        <Box display="flex" alignItems="center" mt={1}>
          <IconButton aria-label="like">
            <FavoriteIcon color="error" />
          </IconButton>
          <Typography variant="body2">{likes} Likes</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ItemsList;
