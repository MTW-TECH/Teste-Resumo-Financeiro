import React, { useState, useRef, useEffect } from 'react';
import {
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Typography,
  Modal,
  Grid
} from '@mui/material';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import BusinessIcon from '@mui/icons-material/Business';
// COMPONENTS
import Button from '../../MTWActions/Button';
import CustomComboBox from '../../MTWDataDisplay/ComboBoxCustom';
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
// SERVICES & UTILS
import { maskedValue } from 'services/maskedValue';
import { portalTitles } from '../../../services/portalTitles';
import theme from 'theme';

export default function UserMenu() {
  // REFS
  const anchorRef = useRef(null);
  // MONITORS (para evitar chamadas duplas em React.StrictMode)
  const dataFetchedRef = useRef(false);
  // REDUX
  const dispatch = useDispatch();
  const { companies } = useSelector(companySelector);
  const { userdata, userCurrentLanguage, isETZSession, companySelected } =
    useSelector(userdataSelector);
  // UI
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // --- 1. DATA FETCHING INICIAL ---
  useEffect(() => {
    if (!dataFetchedRef.current) {
      dispatch(getCompanyList());
      dispatch(getUserData());
      dataFetchedRef.current = true;
    }
  }, [dispatch]);

  // --- 3. SELEÇÃO INICIAL DE EMPRESA ---
  /*
    `companySelected` agora vem do Redux (fonte única — outras telas, como o
    dropdown interno da Reforma Tributária, também escrevem/leem esse mesmo
    campo). Este efeito só roda o "auto-pick" (localStorage ou 1ª da lista)
    enquanto NADA estiver selecionado ainda — depois disso, quem escreve em
    `companySelected` é sempre um dispatch explícito (seja aqui, seja em
    outra tela), nunca mais este efeito.
  */
  useEffect(() => {
    const companiesList = companies?.items || [];
    if (companiesList.length > 0 && !companySelected?.IdEmpresa) {
      const savedId = window.localStorage.getItem('CURRENT_COMPANY');
      const foundInStorage = companiesList.find((c) => c.IdEmpresa === savedId);
      dispatch(recordCompanySelected(foundInStorage || companiesList[0]));
    }
  }, [companies, companySelected, dispatch]);

  // --- 4. SINCRONIZAÇÃO DE SIDE EFFECTS (LocalStorage + evento) ---
  /*
    Roda sempre que `companySelected` mudar no Redux, não importa quem
    disparou o dispatch — mantém localStorage e o evento `storage` (pras
    telas antigas que ainda dependem deles) sempre em dia.
  */
  useEffect(() => {
    if (companySelected?.IdEmpresa) {
      window.localStorage.setItem('CURRENT_COMPANY', companySelected.IdEmpresa);
      window.localStorage.setItem('COMPANY_PICKED', 'true');
      window.dispatchEvent(new Event('storage'));
    }
  }, [companySelected]);

  // --- HANDLERS (Funções de Ação) ---
  const handleToggleMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleCloseMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenMenu(false);
  };

  const handleSelectCompanyManual = (event, newValue) => {
    if (newValue) {
      dispatch(recordCompanySelected(newValue));
    }
  };
  // Handler para Input de Data do ComboBox (Seleção Manual)

  const clearSessionStorage = () => {
    window.localStorage.removeItem('CURRENT_COMPANY');
    window.localStorage.removeItem('COMPANY_PICKED');
    window.localStorage.removeItem('COMPANY_AUTOM_ITER');
    window.localStorage.removeItem('isMTWFromETZ');
    // localStorage.clear(); // Cuidado com clear() total se houver outras infos vitais
  };
  // Função helper para limpar storage no logout

  const signOut = () => {
    clearSessionStorage();
    if (isETZSession) {
      window.location.href = 'https://makethefuture.tech/etz';
    } else {
      window.location.reload();
    }
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <div>
          <IconButton
            ref={anchorRef}
            onClick={handleToggleMenu}
            aria-controls={openMenu ? 'composition-menu' : undefined}
            aria-expanded={openMenu ? 'true' : undefined}
            aria-haspopup="true"
          >
            <Avatar src={userdata?.UserName} />
          </IconButton>
          <Popper
            open={openMenu}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            sx={{ zIndex: 9999, border: '0px solid red' }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom'
                }}
              >
                <Paper
                  sx={{
                    borderRadius: 1,
                    minWidth: '220px'
                  }}
                >
                  <ClickAwayListener onClickAway={handleCloseMenu}>
                    <MenuList
                      autoFocusItem={openMenu}
                      onKeyDown={(e) => {
                        if (e.key === 'Tab' || e.key === 'Escape')
                          handleCloseMenu(e);
                      }}
                    >
                      {/* HEADER DO MENU: Dados do Usuário */}
                      <ListItem alignItems="flex-start">
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: '12px'
                          }}
                        >
                          <Avatar src={userdata?.UserName} />
                          <Box
                            sx={{ display: 'flex', flexDirection: 'column' }}
                          >
                            <Typography
                              sx={{ fontSize: 14, fontWeight: 'bold' }}
                            >
                              {userdata.UserName}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 11, color: 'text.secondary' }}
                            >
                              {userdata.Email}
                            </Typography>
                          </Box>
                        </Box>
                      </ListItem>

                      <Divider sx={{ my: 1 }} />

                      {/* ITEM: Selecionar Empresa (Abre Modal) */}
                      <ListItem
                        button
                        onClick={() => {
                          setOpenModal(true);
                          setOpenMenu(false);
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '2px'
                          }}
                        >
                          <BusinessIcon sx={{ color: '#757575', mr: 1 }} />
                          <Typography sx={{ fontSize: 14 }}>
                            {
                              portalTitles[userCurrentLanguage]
                                .selectCompanyCode
                            }
                          </Typography>
                        </Box>
                      </ListItem>

                      <Divider sx={{ my: 1 }} />

                      {/* ITEM: Logout */}
                      <MenuItem onClick={signOut}>
                        <ListItemIcon>
                          <ExitToAppRoundedIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={portalTitles[userCurrentLanguage].signOut}
                          primaryTypographyProps={{ fontSize: 14 }}
                        />
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-selecao-empresa"
      >
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '30px 36px',
            borderRadius: '6px',
            minWidth: '640px',
            minHeight: '280px',
            outline: 'none'
          }}
        >
          <Grid container direction="column" alignItems="center" spacing={2}>
            {/* Título */}
            <Grid item>
              <Typography
                sx={{ fontSize: 16, fontWeight: 600, color: '#757575', mt: 2 }}
              >
                {portalTitles[userCurrentLanguage].selectCompanyPhrase}
              </Typography>
            </Grid>

            {/* ComboBox */}
            <Grid
              item
              sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <CustomComboBox
                sx={{
                  fontSize: '10px',
                  width: '540px',
                  backgroundColor: theme.palette.textlight.main
                }}
                options={companies?.items || []}
                value={companySelected?.IdEmpresa ? companySelected : null}
                setValue={handleSelectCompanyManual}
                optionsLabel={(option) =>
                  `${maskedValue(option.Cnpj)} - ${option.Nome}`
                }
                label="Empresa"
                colorSelectedOption
                isOptionEqualToValue={(option, value) =>
                  option.Cnpj === value.Cnpj
                }
              />
            </Grid>

            {/* Display da Empresa Selecionada */}
            {companySelected?.IdEmpresa && (
              <Grid item>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Box
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: '5px',
                      p: 0.8,
                      mr: 1.5
                    }}
                  >
                    <BusinessIcon sx={{ color: '#A646DC' }} />
                  </Box>
                  <Typography>
                    {companySelected.Cnpj} - {companySelected.Nome}
                  </Typography>
                </Box>
              </Grid>
            )}

            {/* Botões de Ação */}
            <Grid item sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                text="Cancelar"
                outline
                style={{ height: '40px' }}
                onClick={() => setOpenModal(false)}
              >
                Cancelar
              </Button>
              <Button
                text="Definir"
                type="submit"
                primary
                onClick={() => setOpenModal(false)}
              >
                Definir
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
}
