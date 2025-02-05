// import React, { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import useUsers from '../hooks/useUsers';
// import { Box, Button, TextField, Typography, Alert } from '@mui/material';
// import avatar from '../assets/avatarProfile.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImage } from '@fortawesome/free-solid-svg-icons';
// import { useForm } from 'react-hook-form';
// import logoGif from '../assets/Animation - 1735911293502.gif';
// import userService, {googleSignin} from '../services/user-service'; // Import user service
// import { CredentialResponse, GoogleLogin } from '@react-oauth/google';


// interface FormData {
//   email: string;
//   userName: string;
//   password: string;
//   img: File[];
// }

// const SignUp: React.FC = () => {
//   const navigate = useNavigate();
//   const { signUp, error, isLoading } = useUsers();
//   const inputFileRef = useRef<HTMLInputElement | null>(null);
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
//   const [img] = watch(["img"]);

//   useEffect(() => {
//     if (img && img[0]) {
//       const validFileTypes = ['image/jpeg', 'image/png'];
//       if (!validFileTypes.includes(img[0].type)) {
//         alert('Please upload a valid image file (JPEG or PNG).');
//         return;
//       }
//       setSelectedImage(img[0]);
//     }
//   }, [img]);

//   const onSubmit = async (data: FormData) => {
//     if (!selectedImage) {
//       alert('Please upload a profile picture.');
//       return;
//     }

//     try {
//       // Upload the image
//       const { request: uploadRequest } = userService.uploadImage(selectedImage);
//       const uploadResponse = await uploadRequest;
//       const imageUrl = uploadResponse.data.url; // Assuming the server returns the URL of the uploaded image

//       // Sign up the user with the image URL
//       await signUp(data.email, data.password, data.userName, imageUrl);
//       if (!error) {
//         navigate('/posts');
//         window.location.reload();
//       }
//     } catch (err) {
//       console.error("Error during sign up:", err);
//     }
//   };

//   const { ref, ...restRegisterParams } = register("img");

//   const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
//     console.log("Google login success:", credentialResponse);
//     try{
//       const res = await googleSignin(credentialResponse)
//       console.log("Google login response:", res)
//     } catch (err) {
//       console.error("Error during Google login:", err);
//     }
    

    

   
//   }

//   const onGoogleLoginFailure = () => {
//     console.error("Google login failed");
//   }

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '100vh',
//         bgcolor: '#f5f5f5',
//         p: 2
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           width: '100%',
//           maxWidth: 400,
//           padding: 3,
//           boxShadow: 3,
//           borderRadius: 2,
//           bgcolor: 'background.paper',
//         }}
//       >
//         <Box          
//         component="img"
//         src={logoGif}
//          alt="Logo"
//          sx={{ width: 150, height: 150, marginBottom: 2 }}
//         />
//         <Typography variant="h4" component="h1" gutterBottom>
//           Sign Up
//         </Typography>

//         <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
//           <TextField
//             label="Email"
//             type="email"
//             variant="outlined"
//             fullWidth
//             {...register("email", { 
//               required: "Email is required",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Invalid email address"
//               }
//             })}
//             error={!!errors.email}
//             helperText={errors.email?.message}
//             margin="normal"
//           />
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             {...register("password", { 
//               required: "Password is required",
//               minLength: {
//                 value: 8,
//                 message: "Password must be at least 8 characters long"
//               }
//             })}
//             error={!!errors.password}
//             helperText={errors.password?.message}
//             margin="normal"
//           />
//           <TextField
//             label="Username"
//             type="text"
//             variant="outlined"
//             fullWidth
//             {...register("userName", { required: "Username is required" })}
//             error={!!errors.userName}
//             helperText={errors.userName?.message}
//             margin="normal"
//           />

//           <Box 
//             sx={{
//               display: 'flex', 
//               flexDirection: 'column',
//               alignItems: 'center',
//               my: 2
//             }}
//           >
//             <Box sx={{ position: 'relative', mb: 2 }}>
//               <img 
//                 src={selectedImage ? URL.createObjectURL(selectedImage) : avatar} 
//                 alt="Profile" 
//                 style={{ 
//                   width: '150px', 
//                   height: '150px', 
//                   borderRadius: '50%', 
//                   objectFit: 'cover' 
//                 }} 
//               />
//               <Button
//                 variant="contained"
//                 component="label"
//                 sx={{
//                   position: 'absolute',
//                   bottom: 0,
//                   right: 0,
//                   minWidth: 'auto',
//                   width: '40px',
//                   height: '40px',
//                   borderRadius: '50%',
//                   padding: 0,
//                 }}
//               >
//                 <FontAwesomeIcon icon={faImage} />
//                 <input
//                   ref={(item) => { 
//                     ref(item); 
//                     if (item) {
//                       inputFileRef.current = item;
//                     }
//                   }}
//                   {...restRegisterParams}
//                   type="file"
//                   accept='image/png, image/jpeg'
//                   style={{ display: 'none' }}
//                 />
//               </Button>
//             </Box>
//             <Typography variant="body2" color="text.secondary">
//               {selectedImage ? selectedImage.name : 'No file selected'}
//             </Typography>
//           </Box>

//           {error && <Alert severity="error">{error}</Alert>}

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             disabled={isLoading}
//           >
//             {isLoading ? 'Signing up...' : 'Sign Up'}
//           </Button>
//           <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default SignUp;


import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUsers from '../hooks/useUsers';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import avatar from '../assets/avatarProfile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import logoGif from '../assets/Animation - 1735911293502.gif';
import userService, {googleSignin} from '../services/user-service';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

interface FormData {
  email: string;
  userName: string;
  password: string;
  img: File[];
}

interface GoogleSignInResponse {
  userName: string;
  email: string;
  _id: string;
  profilePicture: string;
  accessToken: string;
  refreshToken: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, error, isLoading } = useUsers();
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const [img] = watch(["img"]);
  const [signupError, setSignupError] = useState<string | null>(null);

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

    try {
      const { request: uploadRequest } = userService.uploadImage(selectedImage);
      const uploadResponse = await uploadRequest;
      const imageUrl = uploadResponse.data.url;

      await signUp(data.email, data.password, data.userName, imageUrl);
      if (!error) {
        navigate('/posts');
        window.location.reload();
      }
    } catch (err) {
      console.error("Error during sign up:", err);
    }
  };

  const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error('No credentials received from Google');
      }

      const response = await googleSignin(credentialResponse);
      const data = response as unknown as GoogleSignInResponse;

      // Store tokens and user info
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userId', data._id);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('profilePicture', data.profilePicture);

      // Navigate to posts page
      navigate('/posts');
      window.location.reload();
    } catch (err) {
      console.error("Error during Google login:", err);
      setSignupError(err instanceof Error ? err.message : 'Failed to sign in with Google');
    }
  };

  const onGoogleLoginFailure = () => {
    setSignupError('Google sign in failed. Please try again.');
  };

  const { ref, ...restRegisterParams } = register("img");

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

        {signupError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {signupError}
          </Alert>
        )}

        <Box sx={{ width: '100%', mb: 2 }}>
          <GoogleLogin 
            onSuccess={onGoogleLoginSuccess} 
            onError={onGoogleLoginFailure}
            theme="outline"
            size="large"
            text="signup_with"
            shape="rectangular"
          />
        </Box>

        <Typography variant="body1" sx={{ my: 2 }}>
          Or sign up with email
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