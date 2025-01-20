import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logoGif from '../assets/Animation - 1735911293502.gif';
import useUsers from '../hooks/useUsers';

const SignIn: React.FC = () => {
	const navigate = useNavigate();
	const { signIn, error, isLoading } = useUsers();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [localLoading, setLocalLoading] = useState(false);

	const handleSignIn = async () => {
		setLocalLoading(true);
		await signIn(email, password);
		setTimeout(() => {
			setLocalLoading(false);
			if (!error) {
				navigate('/posts');
				window.location.reload();
			}
		}, 1000);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100vh',
				bgcolor: '#f5f5f5',
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
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						label="Password"
						type="password"
						variant="outlined"
						fullWidth
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && <Alert severity="error">{error}</Alert>}
					<Button
						variant="contained"
						fullWidth
						onClick={handleSignIn}
						disabled={isLoading || localLoading}
					>
						{isLoading || localLoading ? 'Signing in...' : 'Sign in'}
					</Button>
				</Stack>
			</Box>
		</Box>
	);
};

export default SignIn;