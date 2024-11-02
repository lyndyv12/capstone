import { useState } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';

const AuthForm = ({ authAction, mode = 'login' }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (ev) => {
    ev.preventDefault();
    try {
      const payload = { username, password };
      if (mode === 'login' || mode === 'register') {
        payload.isAdmin = false; 
      }
      await authAction(payload, mode);
    } catch (ex) {
      setError(ex.error);
    }
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ mt: 2 }}>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        {mode.charAt(0).toUpperCase() + mode.slice(1)} {/* Will show "Login" or "Register" */}
      </Button>

      {mode === 'login' && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{' '}
          <Link href="/register" color="primary">
            Register here
          </Link>
        </Typography>
      )}
    </Box>
  );
};

export default AuthForm;