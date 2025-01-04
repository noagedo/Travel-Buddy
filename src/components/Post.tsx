import React, { useState } from 'react';
import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	Avatar,
	IconButton,
	Box,
	Stack,
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
} from '@mui/material';
import {
	MoreVert as MoreVertIcon,
	Favorite as FavoriteIcon,
	ArrowBack as ArrowBackIcon,
	Comment as CommentIcon,
} from '@mui/icons-material';

interface PostProps {
	images: string[]; // מערך של תמונות
	userName: string; // שם המשתמש
	subheader: string;
	content: string;
	authorAvatar: string;
}

const Post: React.FC<PostProps> = ({ images, userName, subheader, content, authorAvatar }) => {
	const [isLiked, setIsLiked] = useState(false); // סטייט לכפתור הלב
	const [comments, setComments] = useState<string[]>([]); // סטייט של התגובות
	const [newComment, setNewComment] = useState(''); // סטייט של שדה התגובה
	const [showComments, setShowComments] = useState(false); // סטייט להצגת תגובות במקום תמונות

	// פונקציה לשינוי הצבע של הלב
	const handleLike = () => {
		setIsLiked(!isLiked);
	};

	// פונקציה להוספת תגובה
	const handleAddComment = () => {
		if (newComment.trim()) {
			setComments([...comments, newComment]);
			setNewComment('');
		}
	};

	// פונקציה להציג את התגובות
	const handleViewComments = () => {
		setShowComments(true);
	};

	// פונקציה לחזור לתמונות
	const handleBackToImages = () => {
		setShowComments(false);
	};

	return (
		<Card sx={{ maxWidth: 600, margin: 'auto', boxShadow: 3, borderRadius: 2 ,marginBottom: 2}}>
			<CardHeader
				avatar={<Avatar src={authorAvatar} alt={userName} />}
				action={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
				title={userName} // הצגת שם המשתמש
				subheader={subheader}
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary" gutterBottom>
					{content}
				</Typography>

				{/* כפתור הלב */}
				<IconButton onClick={handleLike} sx={{ marginBottom: 2 }}>
					<FavoriteIcon sx={{ color: isLiked ? 'red' : 'gray' }} />
				</IconButton>

				{/* כפתור הצגת תגובות / חזרה לתמונות */}
				<Box sx={{ marginBottom: 2 }}>
					<Button
						variant="outlined"
						startIcon={showComments ? <ArrowBackIcon /> : <CommentIcon />}
						onClick={showComments ? handleBackToImages : handleViewComments}
					>
						{showComments ? 'Back to Images' : 'View Comments'}
					</Button>
				</Box>

				{/* הצגת תמונות או תגובות */}
				{!showComments ? (
					<Box
						sx={{
							display: 'flex',
							overflowX: 'scroll', // מאפשר גלילה אופקית
							gap: 2, // רווח בין התמונות
							padding: 2,
						}}
					>
						{images.map((image, index) => (
							<Box
								key={index}
								component="img"
								src={image}
								sx={{
									height: 200,
									borderRadius: '8px',
									boxShadow: 2,
									objectFit: 'cover',
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

export default Post;
