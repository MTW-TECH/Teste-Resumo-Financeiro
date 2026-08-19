import React, { useEffect, useLayoutEffect, useState } from 'react';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  Collapse
} from '@mui/material';
// COMPONENTS
import Logo from '../../../assets/logo_maketheway_vetorizado.png';
import LogoETZ from '../../../assets/eTz_Coloured.png';
import LogoLevdata from '../../../assets/logo_levdata.png';
import LogoNavTax from '../../../assets/logo_navtax.png';
import UserMenu from '../UserMenu/UserMenu';
import HeaderToggleLang from '../HeaderToggleLang';
import ColoredFetching from 'components/MTWFeedback/ColoredFetching';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserAuthorized,
  recordUserAuthSession,
  recordUserCurrentLanguage,
  getUserData,
  userdataSelector
} from 'features/userFeatures/userdata.store';
// SERVICES
import {
  ELEMENTARHOME,
  PORTALHOME,
  NOTAAVULSAHOME,
  SUBIDADEDOCUMENTOS,
  SOLICITARDOCUMENTOS,
  BASELEGAL,
  DEFINIRCATEGORIAS,
  CADASTROSBASICOS,
  CAT42HOME,
  MAKEBI,
  MAKEVIEWFILES,
  LIFECYCLE,
  LIFECYCLEETZ,
  TAXINFORMATION,
  CCS,
  REFORMA,
  MAKEREFORMA,
  GESTAOFINANCEIRAGRAFICOS,
  CREDITOS,
  DASHBOARDSHOME,
  TAXCREDITS,
  TAXPLANNING,
  REGIMECOMPARISON,
  PRICING,
  TAXREGIMESIMULATION,
  INTELLIGENCEENGINE,
  FINANCIALSUMMARY,
  CASHFLOW,
  RECONCILIATION,
  RECONCILIATIONDASHBOARD
} from '../../../Routes';
import { portalTitles } from '../../../services/portalTitles';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
// STYLE
import './style.css';
import '../../../styles/index.css';
import theme from 'theme';
import {
  Navbar,
  Avatar,
  UserName,
  CompanyName
} from '../../../styledComponentsStyles';
import styledtheme from '../../../styledThemeOn';

function PortalFrame(props) {
  /*
  componente que abrange o header de todas as páginas e
  a barra lateral. Funciona como um "arco" para as páginas 
  que "envolve". Recebe só dois tipos distintos de children:
  A página "PortalHome" (que é a home page do portal MTW) 
  renderizada dentro desse "arco" e as páginas de serviços
  da MTW (Make Forward, Make BI, etc) também renderizadas
  dentro desse arco.
  As props são:
  props.header: booleano que diz quando a barra lateral (sidebar) está no modo básico (sem todas as opções)
  props.sidebar: booleano que...
  props.shrunken: booleano que diz quando a barra lateral (sidebar) está no modo encolhido
  props.titulo: ...
  props.children
  */
  const navigate = useNavigate();
  const { window } = props;
  const {
    userdata,
    userauth,
    userCurrentLanguage,
    isETZSession,
    isLEVDATASession,
    isNAVTAXSession
  } = useSelector(userdataSelector);
  /*
  usos do isETZSessio|n:
  1. é importado do useSelector do Redux
  2. é usado como condição para a função isFromETZ
  dentro do drawer:
  3. se falso, libera a exibição dos ícones solitários no menu lateral colapsado
  4. se falso, libera a exibição das páginas básicas "Meus Documentos" e "Upload"
  5. se falso, permite que todas as páginas sejam exibidas
  6. se verdadeiro, exibe as páginas autorizadas para o ETZ
  fora do drawer:
  7. se falso, exibe o botão de lista de download de relatórios
  8. se falso, exibe o toggle de idiomas
  */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [authorized, setAuthorized] = useState({
    user: true,
    catg: false,
    elm: false,
    idGroup: false,
    mbi: false,
    mtp: false,
    nfAv: false,
    solDoc: false,
    upDoc: false,
    cadDad: false,
    mia: false,
    erp: false,
    infoFiscais: false,
    dlm: false,
    refTributario: false
  });
  /*Authorization schema*/
  const [openFinanceiro, setOpenFinanceiro] = useState(false);

  const path = useLocation();

  const isFromETZ = () => {
    return path?.pathname.startsWith('/etz') || isETZSession ? true : false;
  };

  const isFromLevdata = () => {
    return path?.pathname.startsWith('/levdata') || isLEVDATASession
      ? true
      : false;
  };

  const isFromNavTax = () => {
    return path?.pathname.startsWith('/navtax') || isNAVTAXSession;
  };

  const getBasePath = () => {
    if (isFromLevdata()) return '/levdata';
    if (isFromNavTax()) return '/navtax';
    if (isFromETZ()) return '/etz';
    return '';
  };

  const withBasePath = (route) => {
    return `${getBasePath()}${route}`;
  };
  //--------------------User api--------------------
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  /*Requests private data from userdata api*/

  useEffect(() => {
    if (userdata?.Id?.length) {
      const incomingUser = async () => {
        let user = await userdata.Id;
        setUserCode(user);
      };
      incomingUser();
    }
  }, [userdata]);
  /*Gets private data from userdata api*/

  useEffect(() => {
    if (userCode?.length) {
      dispatch(getUserAuthorized(userCode));
    }
  }, [userCode]);
  /*As the userCode state changes, it is used to dispatch userauth api*/

  useLayoutEffect(() => {
    if (userauth?.itens?.length) {
      let maketheprice = userauth?.itens[0];
      let elementar = userauth?.itens[1];
      let upload = userauth?.itens[2];
      let solicitar = userauth?.itens[3];
      let categorias = userauth?.itens[4];
      let makebi = userauth?.itens[5];
      let makeforward = userauth?.itens[6];
      let cadastrosbasicos = userauth?.itens[7];
      let infofiscais = userauth?.itens[8];
      let dlmsys = userauth?.itens[9];
      let reftributaria = userauth?.itens[10];
      setAuthorized({
        user: userauth?.User ? true : false,
        catg: categorias ? categorias['Catg'] : false,
        elm: elementar ? elementar['Elm'] : false,
        idGroup: true,
        mbi: makebi ? makebi['Mbi'] : false,
        mtp: maketheprice ? maketheprice['Mtp'] : false,
        nfAv: makeforward ? makeforward['NfAv'] : false,
        solDoc: solicitar ? solicitar['SolDoc'] : false,
        upDoc: upload ? upload['UpDoc'] : false,
        cadDad: cadastrosbasicos ? cadastrosbasicos['CadDad'] : false,
        infoFiscais: infofiscais ? infofiscais['InformacoesFiscais'] : false,
        dlm: dlmsys ? dlmsys['Dlm'] : false,
        refTributario: reftributaria
          ? reftributaria['ReformaTributaria']
          : false,
        mia: true
      });
    }
  }, [userauth]);
  /*Pages links autorization schema*/

  useEffect(() => {
    if (userauth) {
      dispatch(recordUserAuthSession(userauth));
    }
  }, [userauth]);
  /*Records on state management tool the userauth data*/

  //--------------------Handlers--------------------
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleLanguage = () => {
    if (userCurrentLanguage === 'EN') {
      dispatch(recordUserCurrentLanguage('PT'));
    } else if (userCurrentLanguage === 'PT') {
      dispatch(recordUserCurrentLanguage('EN'));
    }
  };

  //--------------------JSX/CSS--------------------
  const drawerWidth = !props.shrunken ? 250 : props.shrunken ? 50 : 250;
  // const [drawerHeight, setDrawerHeight] = useState(props.vp - 61);

  useEffect(() => {
    if (props.scrollY < 61) {
      // setDrawerHeight(props.vp - (61 - props.scrollY));
    } else if (props.scrollY >= 61) {
      // setDrawerHeight(props.vp);
    }
  }, [props.scrollY]);

  const mainLogo = {
    mt: 2
  };

  const listItemIcon = {
    color: theme.palette.text.voidTitle,
    width: '18px'
  };

  const listItemWhenShrunken = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const listItemIconCenter = {
    color: theme.palette.text.voidTitle,
    width: '18px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const menuWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const navbarLeftStyles = {
    display: 'flex'
  };

  const avatarListStyles = {
    display: 'flex',
    rowGap: '3px',
    flexDirection: 'column',
    alignItems: 'flex-start'
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  //--------------------Drawer--------------------
  const drawer = (
    <div id="font">
      {/* home page logo */}
      {!props.sidebar ? (
        <Toolbar sx={mainLogo}>
          <Link to={withBasePath(PORTALHOME)}>
            <img
              style={{ marginLeft: '5px' }}
              src={
                isFromETZ()
                  ? LogoETZ
                  : isFromLevdata()
                  ? LogoLevdata
                  : isFromNavTax()
                  ? LogoNavTax
                  : Logo
              }
              height={
                isFromETZ()
                  ? 56
                  : isFromLevdata()
                  ? 42
                  : isFromNavTax()
                  ? 50
                  : 24
              }
              width={
                isFromETZ()
                  ? 180
                  : isFromLevdata()
                  ? 180
                  : isFromNavTax()
                  ? 180
                  : 182.45
              }
              alt="Make the Way"
            />
          </Link>
        </Toolbar>
      ) : null}
      {/* closed left sidebar */}
      {props.shrunken ? (
        <List className="drawer">
          <Box sx={{ mt: 1 }}>
            <ListItem
              sx={listItemWhenShrunken}
              button
              key={portalTitles[userCurrentLanguage].startPage}
            >
              <ListItemIcon sx={listItemIconCenter}>
                <HomeRoundedIcon />
              </ListItemIcon>
            </ListItem>
          </Box>
          <Divider sx={{ mt: 2.2, mb: 2.2 }} />
          {!isETZSession && (
            <>
              <Box sx={{ mt: 1 }}>
                <ListItem sx={listItemWhenShrunken} button key="Upload">
                  <ListItemIcon sx={listItemIconCenter}>
                    <CloudUploadIcon />
                  </ListItemIcon>
                </ListItem>
              </Box>
              <Box sx={{ mt: 1 }}>
                <ListItem
                  sx={listItemWhenShrunken}
                  button
                  key="Meus Documentos"
                >
                  <ListItemIcon sx={listItemIconCenter}>
                    <SnippetFolderIcon />
                  </ListItemIcon>
                </ListItem>
              </Box>
              <Divider sx={{ mt: 2, mb: 2 }} />
            </>
          )}
          <Box>
            <ListItem
              sx={listItemWhenShrunken}
              key={portalTitles[userCurrentLanguage].apps}
            >
              <ListItemIcon sx={listItemIconCenter}>
                <AppsRoundedIcon />
              </ListItemIcon>
            </ListItem>
          </Box>
        </List>
      ) : !props.shrunken ? (
        <List className="drawer">
          {/* open left sidebar */}
          <Box>
            <Link className="list-nav-link" to={withBasePath(PORTALHOME)}>
              <ListItem
                button
                key={portalTitles[userCurrentLanguage].startPage}
              >
                <ListItemIcon sx={listItemIcon}>
                  <HomeRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={portalTitles[userCurrentLanguage].startPage}
                />
              </ListItem>
            </Link>
          </Box>
          <Divider sx={{ mt: 2, mb: 2 }} />
          {!isETZSession && authorized.upDoc && (
            <>
              <Box sx={{ mt: 1 }}>
                <Link
                  className="list-nav-link"
                  to={withBasePath(SUBIDADEDOCUMENTOS)}
                  replace
                >
                  <ListItem button key="Upload">
                    <ListItemIcon sx={listItemIcon}>
                      <CloudUploadIcon />
                    </ListItemIcon>
                    <ListItemText primary="Upload" />
                  </ListItem>
                </Link>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Link
                  className="list-nav-link"
                  to={withBasePath(MAKEVIEWFILES)}
                  replace
                >
                  <ListItem button key="Meus Documentos">
                    <ListItemIcon sx={listItemIcon}>
                      <SnippetFolderIcon />
                    </ListItemIcon>
                    <ListItemText primary="Meus Documentos" />
                  </ListItem>
                </Link>
              </Box>
              <Divider sx={{ mt: 2, mb: 2 }} />
            </>
          )}
          <Box>
            <ListItem key={portalTitles[userCurrentLanguage].apps}>
              <ListItemIcon sx={listItemIcon}>
                <AppsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary={portalTitles[userCurrentLanguage].apps} />
            </ListItem>
          </Box>
          {/* pages */}
          {!isETZSession && authorized.user ? (
            <>
              {!isFromLevdata() && authorized.mtp ? (
                <Box>
                  <Link
                    className="list-nav-link"
                    to={CAT42HOME}
                    onClick={() => window.location.reload(false)}
                    replace
                  >
                    <ListItem button key="CAT 42">
                      <ListItemIcon />
                      <ListItemText primary="CAT 42" />
                    </ListItem>
                  </Link>
                </Box>
              ) : null}
              {authorized.elm ? (
                <Box>
                  <Link
                    className="list-nav-link"
                    to={withBasePath(ELEMENTARHOME)}
                    onClick={() => {
                      if (!isFromLevdata() && !isFromNavTax()) {
                        window.location.reload(false);
                      }
                    }}
                    replace
                  >
                    <ListItem button key="Make the Price">
                      <ListItemIcon />
                      <ListItemText
                        primary={
                          isFromNavTax()
                            ? 'Tax Credits'
                            : isFromLevdata()
                            ? 'Caixa'
                            : 'Make the Price'
                        }
                      />
                    </ListItem>
                  </Link>
                </Box>
              ) : null}
              <Box>
                <Link
                  className="list-nav-link"
                  to={withBasePath(MAKEBI)}
                  replace
                >
                  <ListItem button key="Make View">
                    <ListItemIcon />
                    <ListItemText
                      primary={
                        isFromNavTax()
                          ? 'Tax B.I'
                          : isFromLevdata()
                          ? 'Gestão'
                          : 'Make View'
                      }
                    />
                  </ListItem>
                </Link>
              </Box>
              {!isFromLevdata() && (
                <Box>
                  <Link
                    className="list-nav-link"
                    to={withBasePath(MAKEREFORMA)}
                  >
                    <ListItem button key="Make Reforma">
                      <ListItemIcon />
                      <ListItemText primary="Make Reforma" />
                    </ListItem>
                  </Link>
                </Box>
              )}
              {authorized.cadDad ? (
                <Box>
                  <Link
                    className="list-nav-link"
                    to={withBasePath(CADASTROSBASICOS)}
                    onClick={() => window.location.reload(false)}
                    replace
                  >
                    <ListItem button key="Cadastros Básicos">
                      <ListItemIcon />
                      <ListItemText primary="Cadastros Básicos" />
                    </ListItem>
                  </Link>
                </Box>
              ) : null}
              {authorized.nfAv ? (
                <Box>
                  <Link
                    className="list-nav-link"
                    to={withBasePath(NOTAAVULSAHOME)}
                    onClick={() => {
                      if (!isFromLevdata() && !isFromNavTax()) {
                        window.location.reload(false);
                      }
                    }}
                    replace
                  >
                    <ListItem button key="Make Forward">
                      <ListItemIcon />
                      <ListItemText
                        primary={
                          isFromNavTax()
                            ? 'Compliance Fiscal'
                            : isFromLevdata()
                            ? 'Notas'
                            : 'Make Forward'
                        }
                      />
                    </ListItem>
                  </Link>
                </Box>
              ) : null}
              {authorized.solDoc ? (
                <Box>
                  <Link
                    className="list-nav-link"
                    to={withBasePath(SOLICITARDOCUMENTOS)}
                    onClick={() => {
                      if (!isFromLevdata() && !isFromNavTax()) {
                        window.location.reload(false);
                      }
                    }}
                    replace
                  >
                    <ListItem button key="Solicitar Documentos">
                      <ListItemIcon />
                      <ListItemText primary="Solicitar Documentos" />
                    </ListItem>
                  </Link>
                </Box>
              ) : null}
              {!isFromLevdata() && authorized.solDoc ? (
                <Box>
                  <Link
                    className="list-nav-link"
                    to={BASELEGAL}
                    onClick={() => window.location.reload(false)}
                    replace
                  >
                    <ListItem button key="Base Legal">
                      <ListItemIcon />
                      <ListItemText primary="Base Legal" />
                    </ListItem>
                  </Link>
                </Box>
              ) : null}
              {!isFromLevdata() && authorized.catg ? (
                <Box>
                  <Link
                    className="list-nav-link"
                    to={withBasePath(DEFINIRCATEGORIAS)}
                    onClick={() => {
                      if (!isFromLevdata() && !isFromNavTax()) {
                        window.location.reload(false);
                      }
                    }}
                    replace
                  >
                    <ListItem button key="Definir Categorias">
                      <ListItemIcon />
                      <ListItemText primary="Definir Categorias" />
                    </ListItem>
                  </Link>
                </Box>
              ) : null}
              {authorized.dlm ? (
                <Box>
                  <Link
                    className="list-nav-link"
                    to={isFromETZ(path) ? LIFECYCLEETZ : LIFECYCLE}
                    onClick={() => window.location.reload(false)}
                    replace
                  >
                    <ListItem button key="DLM">
                      <ListItemIcon />
                      <ListItemText primary="DLM" />
                    </ListItem>
                  </Link>
                </Box>
              ) : null}
              {authorized.infoFiscais ? (
                <Box>
                  <Link
                    className="list-nav-link"
                    to={TAXINFORMATION}
                    onClick={() => window.location.reload(false)}
                    replace
                  >
                    <ListItem button key="Informativos Fiscais">
                      <ListItemIcon />
                      <ListItemText primary="Informativos Fiscais" />
                    </ListItem>
                  </Link>
                </Box>
              ) : null}
              {!isFromLevdata() && authorized.refTributario ? (
                <Box>
                  <Link
                    className="list-nav-link"
                    to={withBasePath(REFORMA)}
                    onClick={() => {
                      if (!isFromLevdata() && !isFromNavTax()) {
                        window.location.reload(false);
                      }
                    }}
                    replace
                  >
                    <ListItem button key="mIA - Reforma Tributária">
                      <ListItemIcon />
                      <ListItemText
                        primary={
                          isFromNavTax()
                            ? 'Forecast Reforma'
                            : 'mIA - Reforma Tributária'
                        }
                      />
                    </ListItem>
                  </Link>
                </Box>
              ) : null}
              <Box>
                <Link
                  className="list-nav-link"
                  to={withBasePath(CREDITOS)}
                  onClick={() => {
                    if (!isFromLevdata() && !isFromNavTax()) {
                      window.location.reload(false);
                    }
                  }}
                  replace
                >
                  <ListItem button key="Créditos">
                    <ListItemIcon />
                    <ListItemText
                      primary={
                        isFromNavTax()
                          ? 'Tax Credits'
                          : isFromLevdata()
                          ? 'Caixa'
                          : 'Make the Price'
                      }
                    />
                  </ListItem>
                </Link>
              </Box>
              {/*
              <Box>
                <Link
                  className="list-nav-link"
                  to={withBasePath(MAKEBI)}
                  onClick={() => {
                    if (!isFromLevdata() && !isFromNavTax()) {
                      window.location.reload(false);
                    }
                  }}
                  replace
                >
                  <ListItem button key="Dashboards">
                    <ListItemIcon />
                    <ListItemText primary="Dashboards" />
                  </ListItem>
                </Link>
              </Box>
*/}
              {isFromLevdata() && (
                <Box>
                  <ListItem
                    button
                    onClick={() => {
                      if (!isFromLevdata() && !isFromNavTax()) {
                        window.location.reload(false);
                      }
                      navigate(withBasePath(GESTAOFINANCEIRAGRAFICOS));
                    }}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Financeiro" />

                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenFinanceiro(!openFinanceiro);
                      }}
                    >
                      {openFinanceiro ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </ListItem>

                  <Collapse in={openFinanceiro} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {/* <ListItem
                        button
                        sx={{ paddingLeft: '32px' }}
                        onClick={() => navigate('/levdata/financeiro/banco')}
                      >
                        <ListItemText primary="Banco" />
                      </ListItem> */}

                      {/* <ListItem
                        button
                        sx={{ paddingLeft: '32px' }}
                        onClick={() => navigate('/levdata/financeiro/contas')}
                      >
                        <ListItemText primary="Contas Bancárias" />
                      </ListItem> */}

                      <ListItem
                        button
                        sx={{ paddingLeft: '32px' }}
                        onClick={() =>
                          navigate('/levdata/financeiro/lancamento')
                        }
                      >
                        <ListItemText primary="Lançamentos" />
                      </ListItem>

                      <ListItem
                        button
                        sx={{ paddingLeft: '32px' }}
                        onClick={() =>
                          navigate('/levdata/financeiro/categoria')
                        }
                      >
                        <ListItemText primary="Categoria" />
                      </ListItem>
                      {/* <ListItem
                        button
                        sx={{ paddingLeft: '32px' }}
                        onClick={() =>
                          navigate('/levdata/financeiro/fluxo-caixa')
                        }
                      >
                        <ListItemText primary="Fluxo de Caixa" />
                      </ListItem> */}
                    </List>
                  </Collapse>
                </Box>
              )}
              {isFromLevdata() && (
                <Box>
                  <ListItem
                    button
                    onClick={() => navigate(withBasePath(DASHBOARDSHOME))}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </Box>
              )}
              {isFromLevdata() && (
                <Box>
                  <ListItem
                    button
                    onClick={() => navigate(withBasePath(TAXREGIMESIMULATION))}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Simulação Regime Tributário" />
                  </ListItem>
                </Box>
              )}
              {isFromLevdata() && (
                <Box>
                  <ListItem
                    button
                    onClick={() => navigate(withBasePath(TAXCREDITS))}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Créditos Tributários" />
                  </ListItem>
                </Box>
              )}
              {isFromLevdata() && (
                <Box>
                  <ListItem
                    button
                    onClick={() => navigate(withBasePath(REGIMECOMPARISON))}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Créditos Potenciais na Venda" />
                  </ListItem>
                </Box>
              )}
              {isFromLevdata() && (
                <Box>
                  <ListItem
                    button
                    onClick={() => navigate(withBasePath(TAXPLANNING))}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Planejamento Tributário" />
                  </ListItem>
                </Box>
              )}
              {isFromLevdata() && (
                <Box>
                  <ListItem
                    button
                    onClick={() => navigate(withBasePath(PRICING))}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Precificação" />
                  </ListItem>
                </Box>
              )}
              {isFromLevdata() && (
                <Box>
                  <ListItem
                    button
                    onClick={() => navigate(withBasePath(INTELLIGENCEENGINE))}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Motor de Inteligência" />
                  </ListItem>
                </Box>
              )}
              {isFromLevdata() && (
                <Box>
                  <ListItem
                    button
                    onClick={() => navigate(withBasePath(FINANCIALSUMMARY))}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Resumo Financeiro" />
                  </ListItem>
                </Box>
              )}
              {isFromLevdata() && (
                <Box>
                  <ListItem
                    button
                    onClick={() => navigate(withBasePath(CASHFLOW))}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Fluxo de Caixa" />
                  </ListItem>
                </Box>
              )}
              {isFromLevdata() && (
                <Box>
                  <ListItem
                    button
                    onClick={() => navigate(withBasePath(RECONCILIATION))}
                  >
                    <ListItemIcon />
                    <ListItemText primary="Reconciliação" />
                  </ListItem>
                </Box>
              )}
            </>
          ) : isETZSession ? (
            <>
              <Box>
                <Link
                  className="list-nav-link"
                  to={isFromETZ() ? LIFECYCLEETZ : LIFECYCLE}
                  onClick={() => window.location.reload(false)}
                  replace
                >
                  <ListItem button key="DLM">
                    <ListItemIcon />
                    <ListItemText primary="DLM" />
                  </ListItem>
                </Link>
              </Box>
              <Box>
                <Link
                  className="list-nav-link"
                  to={CCS}
                  onClick={() => window.location.reload(false)}
                  replace
                >
                  <ListItem button key="CCS">
                    <ListItemIcon />
                    <ListItemText primary="CCS" />
                  </ListItem>
                </Link>
              </Box>
              {isFromETZ() && (
                <Box>
                  <ListItem
                    button
                    onClick={() =>
                      navigate(withBasePath(RECONCILIATIONDASHBOARD))
                    }
                  >
                    <ListItemIcon />
                    <ListItemText primary="Reconciliation Dashboard" />
                  </ListItem>
                </Box>
              )}
            </>
          ) : null}
        </List>
      ) : null}
    </div>
  );

  const rootStyle = {
    zIndex: 100,
    display: 'flex',
    width: '100%'
  };

  /*Bloco que renderiza o PortalFrame, que abrange o header, a sidebar
  e um pseudo header centralizado na página de boas-vindas*/
  return (
    <div style={rootStyle}>
      {/* pseudo header centralizado na página de boas-vindas com a logo
        da empresa-cliente, visível somente quando o PortalFrame não está 
        no modo lite */}
      {!props.header && !props.sidebar ? (
        <AppBar
          color="transparent"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            padding: '0',
            margin: '0',
            listStyle: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            height: '68px',
            boxShadow: 0,
            backgroundColor: '#fff',
            border: '1px solid #EAECF0'
          }}
        >
          <Toolbar sx={menuWrapperStyles}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <div>
              <Typography
                variant="h5"
                sx={{ fontSize: 22 }}
                noWrap
                component="div"
              >
                {matches ? '' : props.titulo}
              </Typography>
            </div>
            <div className="avatar">
              <UserMenu />
              {userdata?.UserName ? (
                <div style={avatarListStyles}>
                  <div>
                    <UserName styledtheme={styledtheme}>
                      {userdata.UserName}
                    </UserName>
                  </div>
                  <div>
                    <CompanyName styledtheme={styledtheme}>
                      {userdata.Cliente}
                    </CompanyName>
                  </div>
                </div>
              ) : (
                <ColoredFetching
                  noMargin
                  small
                  color={theme.palette.primary.main}
                />
              )}
            </div>
          </Toolbar>
        </AppBar>
      ) : props.header ? (
        /* menu no topo fixo em todas as páginas */
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {/*header*/}
          <div
            style={{
              boxShadow: 0,
              backgroundColor: '#FFFFFF',
              border: '1px solid #EAECF0',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              zIndex: 1001
            }}
          >
            <Navbar>
              {/*logo segment*/}
              {
                <div style={navbarLeftStyles}>
                  <div style={logoStyles}>
                    <div>
                      <Link to={withBasePath(PORTALHOME)}>
                        <img
                          style={{
                            margin:
                              isFromETZ() || isFromLevdata() || isFromNavTax()
                                ? '6px 0px 0px 1px'
                                : '3px 0px 0px 0px'
                          }}
                          src={
                            isFromETZ()
                              ? LogoETZ
                              : isFromLevdata()
                              ? LogoLevdata
                              : isFromNavTax()
                              ? LogoNavTax
                              : Logo
                          }
                          height={
                            isFromETZ()
                              ? 41
                              : isFromLevdata()
                              ? 35
                              : isFromNavTax()
                              ? 35
                              : 24
                          }
                          width={
                            isFromETZ()
                              ? 133
                              : isFromLevdata()
                              ? 140
                              : isFromNavTax()
                              ? 140
                              : 182.45
                          }
                          alt="MTW"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              }
              {/*segment that displays profile/icon/name*/}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  columnGap: '14px'
                }}
              >
                {!isETZSession && (
                  <div>
                    <HeaderToggleLang
                      currentPage={path}
                      toggleLanguage={toggleLanguage}
                      language={userCurrentLanguage}
                    />
                  </div>
                )}
                <Avatar>
                  <UserMenu />
                  {userdata?.UserName ? (
                    <div style={avatarListStyles}>
                      <div>
                        <UserName styledtheme={styledtheme}>
                          {userdata.UserName}
                        </UserName>
                      </div>
                      <div>
                        <CompanyName styledtheme={styledtheme}>
                          {userdata.Cliente}
                        </CompanyName>
                      </div>
                    </div>
                  ) : (
                    <ColoredFetching
                      noMargin
                      small
                      color={theme.palette.primary.main}
                    />
                  )}
                </Avatar>
              </div>
            </Navbar>
          </div>
        </div>
      ) : null}
      {/* menu lateral das páginas de serviços da MTW */}
      {props.sidebar && (
        <div
          className="sidebarexpand"
          style={{
            // top: `${61 > window?.scrollY ? 61 : window?.scrollY}px`,
            padding: '61px 0px 0px 0px',
            position: 'fixed',
            bottom: 0,
            height: '100vh',
            width: drawerWidth,
            overflowY: 'auto',
            overflowX: 'hidden',
            zIndex: 1000
          }}
        >
          {drawer}
        </div>
      )}
      {/* menu lateral à esquerda fixo (na página de boas-vindas) */}
      {!props.header && !props.sidebar && (
        <Box
          sx={{
            width: { sm: drawerWidth },
            flexShrink: { sm: 0 },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              overflowY: 'hidden',
              '&:hover': {
                overflowY: 'scroll',
                '&::-webkit-scrollbar': {
                  width: '10px'
                },
                '&::-webkit-scrollbar-track': {
                  background: '#f1f1f1'
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '5px',
                  border: '2px solid #f1f1f1'
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555'
                }
              }
            }
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth
              }
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}
      {/*unknown*/}
      {!props.header && !props.sidebar ? (
        <Box
          sx={{
            marginTop: '68px',
            padding: '24px 24px 24px 24px',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            height: `calc(100vh - 68px)`,
            maxHeight: `calc(100vh - 68px)`,
            background: theme.palette.background.outmost
          }}
        >
          {props.children}
        </Box>
      ) : null}
    </div>
  );
}

export default PortalFrame;
