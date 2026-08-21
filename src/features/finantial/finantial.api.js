import { financialApi } from '../../services/financialApi';

export const ApiGetFinantialResume = async () => {
  const { data } = await financialApi.get('financial/financialSummary/');

  return data;
};
