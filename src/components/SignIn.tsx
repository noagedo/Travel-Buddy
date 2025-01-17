import React from 'react';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // ייבוא useNavigate
import logoGif from '../assets/Animation - 1735911293502.gif'; 

const SignIn: React.FC = () => {
    const navigate = useNavigate(); // יצירת פונקציה לניווט
    // פונקציה שתפעיל ניווט לעמוד הבית
	const handleSignUp = () => {
		// כאן ניתן להוסיף לוגיקה נוספת אם צריך, למשל ולידציה
		navigate('/posts'); // נווט לעמוד הבית
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh', // גובה מלא של העמוד
				bgcolor: '#f5f5f5', // אפור בהיר כרקע
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '100%',
					maxWidth: 400,
					margin: 'auto',
					padding: 3,
					boxShadow: 3,
					borderRadius: 2,
					bgcolor: 'background.paper',
				}}
			>
				{/* תצוגת הגיף */}
				<Box
					component="img"
					src={logoGif}
					alt="Logo"
					sx={{ width: 150, height: 150, marginBottom: 2 }}
				/>
				<Typography variant="h4" component="h1" gutterBottom>
					Sign in
				</Typography>
				<Stack spacing={2} sx={{ width: '100%' }}>
					<TextField
						label="Email"
						type="email"
						variant="outlined"
						fullWidth
						required
					/>
					<TextField
						label="Password"
						type="password"
						variant="outlined"
						fullWidth
						required
					/>
					
					<Button variant="contained" fullWidth onClick={handleSignUp}>
                        Sign in
                    </Button>
					<Typography align="center" variant="body2">
						or
					</Typography>
					<Button variant="outlined" fullWidth>
						Sign in with Google
					</Button>
				</Stack>
			</Box>
			
		</Box>
	);
	
};

export default SignIn;
