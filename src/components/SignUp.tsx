import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUsers from '../hooks/useUsers';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import avatar from '../assets/avatarProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import logoGif from '../assets/Animation - 1735911293502.gif';

interface FormData {
  email: string
  userName: string
  password: string
  img: File[]
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, error, isLoading } = useUsers();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [img] = watch(["img"])

  useEffect(() => {
    if (img && img[0]) {
      const validFileTypes = ['image/jpeg', 'image/png'];
      if (!validFileTypes.includes(img[0].type)) {
        alert('Please upload a valid image file (JPEG or PNG).');
        return;
      }
      setSelectedImage(img[0]);
    }
  }, [img]);

  const onSubmit = async (data: FormData) => {
    if (!selectedImage) {
      alert('Please upload a profile picture.');
      return;
    }

    await signUp(data.email, data.password, data.userName, selectedImage);
    if (!error) {
      navigate('/');
    }
  };

  const { ref, ...restRegisterParams } = register("img")

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        p: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 400,
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
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long"
              }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />
          <TextField
            label="Username"
            type="text"
            variant="outlined"
            fullWidth
            {...register("userName", { required: "Username is required" })}
            error={!!errors.userName}
            helperText={errors.userName?.message}
            margin="normal"
          />

          <Box 
            sx={{
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              my: 2
            }}
          >
            <Box sx={{ position: 'relative', mb: 2 }}>
              <img 
                src={selectedImage ? URL.createObjectURL(selectedImage) : avatar} 
                alt="Profile" 
                style={{ 
                  width: '150px', 
                  height: '150px', 
                  borderRadius: '50%', 
                  objectFit: 'cover' 
                }} 
              />
              <Button
                variant="contained"
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  minWidth: 'auto',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  padding: 0,
                }}
              >
                <FontAwesomeIcon icon={faImage} />
                <input
                  ref={(item) => { 
                    ref(item); 
                    if (item) {
                      inputFileRef.current = item;
                    }
                  }}
                  {...restRegisterParams}
                  type="file"
                  accept='image/png, image/jpeg'
                  style={{ display: 'none' }}
                />
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {selectedImage ? selectedImage.name : 'No file selected'}
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
