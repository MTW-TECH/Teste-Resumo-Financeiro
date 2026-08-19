// Credenciais do Cognito User Pool, definidas via variáveis de ambiente (.env)
const region = process.env.REACT_APP_COGNITO_REGION?.trim();

export const cognitoConfig = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID?.trim(),
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID?.trim(),
  // Fixa o endpoint explicitamente para evitar interceptação por proxy/extensões de navegador
  ...(region && { Endpoint: `https://cognito-idp.${region}.amazonaws.com` })
};

if (process.env.NODE_ENV === 'development') {
  if (!cognitoConfig.UserPoolId || !cognitoConfig.ClientId) {
    // eslint-disable-next-line no-console
    console.error(
      '[Cognito] REACT_APP_COGNITO_USER_POOL_ID/REACT_APP_COGNITO_CLIENT_ID ausentes. Verifique o .env e reinicie o dev server.'
    );
  }
}
