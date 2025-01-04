import React from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, Stack } from '@mui/material';
import logoGif from '../assets/Animation - 1735911293502.gif'; // נתיב לקובץ הגיף שלך

const SignUp: React.FC = () => {
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
					Sign up
				</Typography>
				<Stack spacing={2} sx={{ width: '100%' }}>
					<TextField
						label="Full name"
						variant="outlined"
						fullWidth
						required
					/>
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
					<FormControlLabel
						control={<Checkbox />}
						label="I want to receive updates via email."
					/>
					<Button variant="contained" fullWidth>
						Sign up
					</Button>
					<Typography align="center" variant="body2">
						or
					</Typography>
					<Button variant="outlined" fullWidth>
						Sign up with Google
					</Button>
				</Stack>
			</Box>
		</Box>
	);
};

export default SignUp;
