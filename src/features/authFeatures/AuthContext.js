import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from 'amazon-cognito-identity-js';
import { cognitoConfig } from 'features/authFeatures/cognitoConfig';

const userPool = new CognitoUserPool(cognitoConfig);

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) {
      setUser(null);
      setLoading(false);
      return;
    }
    cognitoUser.getSession((err, session) => {
      if (err || !session.isValid()) {
        setUser(null);
      } else {
        setUser({
          username: cognitoUser.getUsername(),
          idToken: session.getIdToken().getJwtToken(),
          accessToken: session.getAccessToken().getJwtToken()
        });
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = (username, password) =>
    new Promise((resolve, reject) => {
      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password
      });
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session) => {
          setUser({
            username,
            idToken: session.getIdToken().getJwtToken(),
            accessToken: session.getAccessToken().getJwtToken()
          });
          resolve(session);
        },
        onFailure: (err) => reject(err),
        newPasswordRequired: () => {
          // Cognito força a troca de senha no primeiro login de usuários criados pelo admin
          reject({ code: 'NEW_PASSWORD_REQUIRED', cognitoUser });
        }
      });
    });

  const logout = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) cognitoUser.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
