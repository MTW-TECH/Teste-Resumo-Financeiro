import React, { useRef, useEffect } from 'react';
import { Avatar, Tooltip } from '@mui/material';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserData,
  recordCompanySelected,
  userdataSelector
} from 'features/userFeatures/userdata.store';
import {
  getCompanyList,
  companySelector
} from 'features/cadastroFeatures/Company/company.store';

export default function UserMenu() {
  // MONITORS (para evitar chamadas duplas em React.StrictMode)
  const dataFetchedRef = useRef(false);
  // REDUX
  const dispatch = useDispatch();
  const { companies } = useSelector(companySelector);
  const { userdata, companySelected } = useSelector(userdataSelector);

  // --- 1. DATA FETCHING INICIAL ---
  useEffect(() => {
    if (!dataFetchedRef.current) {
      dispatch(getCompanyList());
      dispatch(getUserData());
      dataFetchedRef.current = true;
    }
  }, [dispatch]);

  // --- 2. SELEÇÃO INICIAL DE EMPRESA ---
  /*
    `companySelected` vem do Redux (fonte única — outras telas, como o
    dropdown interno da Reforma Tributária, também escrevem/leem esse mesmo
    campo). Este efeito só roda o "auto-pick" (localStorage ou 1ª da lista)
    enquanto NADA estiver selecionado ainda — depois disso, quem escreve em
    `companySelected` é sempre um dispatch explícito.
  */
  useEffect(() => {
    const companiesList = companies?.items || [];
    if (companiesList.length > 0 && !companySelected?.id) {
      const savedId = window.localStorage.getItem('CURRENT_COMPANY');
      const foundInStorage = companiesList.find((c) => c.id === savedId);
      dispatch(recordCompanySelected(foundInStorage || companiesList[0]));
    }
  }, [companies, companySelected, dispatch]);

  // --- 3. SINCRONIZAÇÃO DE SIDE EFFECTS (LocalStorage + evento) ---
  /*
    Roda sempre que `companySelected` mudar no Redux — mantém localStorage e
    o evento `storage` (pras telas antigas que ainda dependem deles) em dia.
  */
  useEffect(() => {
    if (companySelected?.id) {
      window.localStorage.setItem('CURRENT_COMPANY', companySelected.id);
      window.localStorage.setItem('COMPANY_PICKED', 'true');
      window.dispatchEvent(new Event('storage'));
    }
  }, [companySelected]);

  return (
    <Tooltip title={userdata?.email || ''}>
      <Avatar src={userdata?.name} />
    </Tooltip>
  );
}
