import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// AUTH
import { useAuth } from 'features/authFeatures/AuthContext';
// COMPONENTS
import Button from 'components/MTWActions/Button';
// ROUTES
import { FINANCIALSUMMARY } from 'Routes';
// MUI
import { Box, TextField, Typography, Alert } from '@mui/material';
// TOAST
import { toast } from 'react-toastify';
// STYLE
import './style.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const redirectPath = location.state?.from?.pathname || FINANCIALSUMMARY;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password || loading) return;

    setLoading(true);
    setErrorMessage('');

    try {
      await login(username, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      if (err?.code === 'NEW_PASSWORD_REQUIRED') {
        setErrorMessage(
          'É necessário definir uma nova senha para continuar o acesso. Contate o administrador.'
        );
        toast.warn('Nova senha requerida para este usuário.');
      } else {
        setErrorMessage(err?.message || 'Usuário ou senha inválidos.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Box component="form" onSubmit={handleSubmit} className="login-card">
        <Typography variant="h5" className="login-title">
          Acessar Resumo Financeiro
        </Typography>

        {errorMessage && (
          <Alert severity="error" className="login-alert">
            {errorMessage}
          </Alert>
        )}

        <TextField
          label="Usuário"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          fullWidth
          margin="normal"
          autoFocus
          disabled={loading}
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          margin="normal"
          disabled={loading}
        />

        <Button
          type="submit"
          primary
          loading={loading}
          disabled={loading || !username || !password}
          className="login-submit"
        >
          Entrar
        </Button>
      </Box>
    </div>
  );
}

export default Login;
