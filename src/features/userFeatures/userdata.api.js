// Dados estáticos de demonstração — o candidato deve substituir por uma API real.
const MOCK_USER = {
  Id: '1',
  UserName: 'Usuário Demonstração',
  Email: 'candidato@teste.com'
};

export const ApiGetUserData = async () => {
  return MOCK_USER;
};

export const ApiGetUserAuthorized = async () => {
  return {};
};
