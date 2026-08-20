import axios from 'axios';
import { userPool } from 'features/authFeatures/AuthContext';

// URL base da API Financeira, definida via variável de ambiente (.env)
export const FINACIAL_API_URL = process.env.REACT_APP_FINACIAL_API_URL?.trim();

if (process.env.NODE_ENV === 'development' && !FINACIAL_API_URL) {
  // eslint-disable-next-line no-console
  console.error(
    '[FinancialApi] REACT_APP_FINACIAL_API_URL ausente. Verifique o .env e reinicie o dev server.'
  );
}

export const financialApi = axios.create({
  baseURL: FINACIAL_API_URL
});

// Obtém a sessão Cognito atual, renovando o token automaticamente se expirado
const getCurrentSession = () =>
  new Promise((resolve) => {
    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) {
      resolve(null);
      return;
    }
    cognitoUser.getSession((err, session) => {
      if (err || !session?.isValid()) {
        resolve(null);
        return;
      }
      resolve(session);
    });
  });

financialApi.interceptors.request.use(async (config) => {
  const session = await getCurrentSession();

  if (session) {
    // O ID token carrega os claims de perfil (email/name/cognito:username) exigidos pela API
    config.headers.Authorization = `Bearer ${session
      .getIdToken()
      .getJwtToken()}`;
  }

  return config;
});
