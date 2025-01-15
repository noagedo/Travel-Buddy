import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Stack } from '@mui/material';

const AddPost: React.FC = () => {
	const [images, setImages] = useState<string[]>([]);
	const [subheader, setSubheader] = useState('');
	const [content, setContent] = useState('');

	// פונקציה להוספת תמונה מהמחשב
	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			const newImages: string[] = [];
			Array.from(files).forEach((file) => {
				const reader = new FileReader();
				reader.onload = () => {
					if (reader.result) {
						newImages.push(reader.result.toString());
						// לאחר שנטענו את כל הקבצים, נוסיף אותם לסטייט
						if (newImages.length === files.length) {
							setImages((prevImages) => [...prevImages, ...newImages]);
						}
					}
				};
				reader.readAsDataURL(file);
			});
		}
	};

	// פונקציית שליחת הטופס
	const handleSubmit = () => {
		const post = {
			images,
			subheader,
			content,
		};
		console.log('New Post:', post);
		alert('Post submitted!');
	};

	return (
		<Box
			sx={{
				maxWidth: 500,
				margin: 'auto',
				padding: 4,
				boxShadow: 3,
				borderRadius: 2,
				bgcolor: 'background.paper',
			}}
		>
			<Typography variant="h4" component="h1" gutterBottom align="center">
				Add New Post
			</Typography>
			<Stack spacing={2}>
				{/* Subheader */}
				<TextField
					label="Subheader"
					variant="outlined"
					fullWidth
					value={subheader}
					onChange={(e) => setSubheader(e.target.value)}
				/>

				{/* תוכן */}
				<TextField
					label="Content"
					variant="outlined"
					fullWidth
					multiline
					rows={4}
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>

				{/* העלאת תמונות */}
				<Button variant="outlined" component="label">
					Upload Images
					<input
						type="file"
						multiple
						accept="image/*"
						hidden
						onChange={handleFileUpload}
					/>
				</Button>

				{/* תצוגת תמונות שהועלו */}
				<Box>
					<Typography variant="body1">Uploaded Images:</Typography>
					{images.map((image, index) => (
						<Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
							<img
								src={image}
								alt={`Uploaded Image ${index + 1}`}
								style={{ width: '50px', height: '50px', marginRight: '10px' }}
							/>
							<Button
								variant="outlined"
								color="error"
								size="small"
								onClick={() => setImages(images.filter((_, i) => i !== index))}
							>
								Remove
							</Button>
						</Box>
					))}
				</Box>

				{/* כפתור שליחה */}
				<Button variant="contained" color="primary" onClick={handleSubmit}>
					Submit Post
				</Button>
			</Stack>
		</Box>
	);
};

export default AddPost;
