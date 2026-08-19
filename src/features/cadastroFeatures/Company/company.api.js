// Dados estáticos de demonstração — o candidato deve substituir por uma API real.
const MOCK_COMPANIES = {
  items: [
    {
      IdEmpresa: '1',
      Nome: 'Empresa Demonstração LTDA',
      Cnpj: '00.000.000/0001-00'
    }
  ]
};

//=========GET ALL COMPANY LIST=============//
export const ApiGetCompany = async () => {
  return MOCK_COMPANIES;
};
