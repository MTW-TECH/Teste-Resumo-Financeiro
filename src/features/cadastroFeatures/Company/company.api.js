import { financialApi } from '../../../services/financialApi';

export const ApiGetCompany = async () => {
  const { data } = await financialApi.get('company/list');

  return data;
};
