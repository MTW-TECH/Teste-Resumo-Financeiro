import { financialApi } from '../../services/financialApi';

export const ApiGetUserData = async () => {
  const { data } = await financialApi.get('user/me');

  return data;
};

export const ApiGetUserAuthorized = async () => {
  return {};
};
