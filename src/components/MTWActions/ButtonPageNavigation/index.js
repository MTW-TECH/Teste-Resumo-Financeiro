import React from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import LabelIcon from '@mui/icons-material/Label';
import HubIcon from '@mui/icons-material/Hub';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CategoryIcon from '@mui/icons-material/Category';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SendIcon from '@mui/icons-material/Send';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import InventoryIcon from '@mui/icons-material/Inventory';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import AnimationIcon from '@mui/icons-material/Animation';
import CalculateIcon from '@mui/icons-material/Calculate';
import PaidIcon from '@mui/icons-material/Paid';
import PercentIcon from '@mui/icons-material/Percent';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
// IMAGES
import icone_makeforward from '../../../assets/icone_makeforward.png';
import icone_maketheprice from '../../../assets/icone_maketheprice.png';
import icone_makeview from '../../../assets/icone_makeview_2.png';
// STYLE
import './style.css';
import theme from '../../../theme';
import styledtheme from '../../../styledThemeOn';
import { ProductIcon } from '../../../styledComponentsStyles';

function index({ breadcrumb, page, boxed }) {
  function ButtonLogo({ page }) {
    const imgContainer = {
      margin: '0 auto',
      padding: 0
    };
    const standardImg = {
      width: '100%',
      borderRadius: '5%'
    };
    const mfImg = {
      width: '106%',
      borderRadius: '24%'
    };
    if (page === 'make-the-price') {
      return (
        <div style={imgContainer}>
          <img style={standardImg} src={icone_maketheprice}></img>
        </div>
      );
    } else if (
      page === 'make-forward' ||
      page === 'make-forward-nfse' ||
      page === 'make-forward-cte'
    ) {
      return (
        <div style={imgContainer}>
          <img style={mfImg} src={icone_makeforward}></img>
        </div>
      );
    } else if (page === 'tag-management') {
      return (
        <LabelIcon sx={{ color: '#FFF', width: boxed ? '60px' : '17px' }} />
      );
    } else if (page === 'integrations-management') {
      return <HubIcon sx={{ color: '#FFF', width: boxed ? '60px' : '17px' }} />;
    } else if (page === 'hidden') {
      return (
        <QuestionMarkIcon
          sx={{ color: '#FFF', width: boxed ? '60px' : '17px' }}
        />
      );
    } else if (page.includes('upload')) {
      return (
        <CloudUploadIcon
          sx={{ color: '#FFF', width: boxed ? '60px' : '17px' }}
        />
      );
    } else if (page === 'solicitar') {
      return <NoteAddIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'categorias') {
      return <FileCopyIcon sx={{ color: '#FFF', width: '17px' }} />;
    } else if (page === 'cadastros-basicos') {
      return <HowToRegIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'cadastros-basicos-users') {
      return <PeopleIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'cadastros-basicos-companies') {
      return <BusinessIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'cadastros-basicos-dashboards') {
      return <DashboardIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'cadastros-basicos-empresas-make-view') {
      return <VisibilityIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'base-legal') {
      return <AssuredWorkloadIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'declaracoes') {
      return <ChromeReaderModeIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'dashboard') {
      return <DashboardIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'make-view') {
      return (
        <div style={imgContainer}>
          <img style={standardImg} src={icone_makeview}></img>
        </div>
      );
    } else if (page === 'make-view-files') {
      return (
        <SnippetFolderIcon
          sx={{ color: '#FFF', width: boxed ? '60px' : '17px' }}
        />
      );
    } else if (page === 'make-view-dashboards') {
      return (
        <LineAxisIcon sx={{ color: '#FFF', width: boxed ? '60px' : '17px' }} />
      );
    } else if (page === 'extra') {
      return (
        <CategoryIcon sx={{ color: '#FFF', width: boxed ? '60px' : '17px' }} />
      );
    } else if (page === 'document-lifecycle') {
      return <InventoryIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'dlm-workflow') {
      return <AccountTreeIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'make-the-price-tax-matrix-cia') {
      return <SsidChartIcon sx={{ color: '#FFF', width: '38px' }} />;
    } else if (page === 'make-the-price-tax-matrix-message') {
      return <SendIcon sx={{ color: '#FFF', width: '38px' }} />;
    } else if (page === 'dlm-user-management') {
      return <PeopleAltIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'make-forward-dashboards') {
      return <DashboardIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'reforma') {
      return <CurrencyExchangeIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'creditos') {
      return <CreditScoreIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'gestao-financeira') {
      return <AttachMoneyIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'gestao-financeira-extrato') {
      return <ReceiptLongIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'gestao-financeira-movimentacao') {
      return <PriceChangeIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'lancamento') {
      return <TrendingUpIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'banco') {
      return <AccountBalanceIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'conciliacao') {
      return <CurrencyExchangeIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'fluxo-caixa') {
      return <AssessmentOutlinedIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'conciliacao-bancaria') {
      return (
        <MonetizationOnOutlinedIcon sx={{ color: '#FFF', width: '24px' }} />
      );
    } else if (page === 'tax-credits') {
      return <AnimationIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'tax-planning') {
      return <AccountTreeIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'regime-comparison') {
      return <CalculateIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'pricing') {
      return <PaidIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'tax-regime-simulation') {
      return <PercentIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'intelligence-engine') {
      return <SettingsApplicationsIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'financial-summary') {
      return <LocalAtmIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'cash-flow') {
      return (
        <AccountBalanceWalletOutlinedIcon
          sx={{ color: '#FFF', width: '24px' }}
        />
      );
    } else if (page === 'reconciliation') {
      return <HandshakeOutlinedIcon sx={{ color: '#FFF', width: '24px' }} />;
    } else if (page === 'selecao-produto') {
      return (
        <MonetizationOnOutlinedIcon sx={{ color: '#FFF', width: '24px' }} />
      );
    } else {
      return <NoteAddIcon sx={{ color: '#FFF', width: '17px' }} />;
    }
  }

  const box = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background:
      page === 'conciliacao' ||
      page === 'conciliacao-bancaria' ||
      page === 'fluxo-caixa' ||
      page === 'dashboard' ||
      page === 'tax-credits' ||
      page === 'tax-planning' ||
      page === 'regime-comparison' ||
      page === 'pricing' ||
      page === 'tax-regime-simulation' ||
      page === 'intelligence-engine' ||
      page === 'financial-summary' ||
      page === 'cash-flow' ||
      page === 'reconciliation' ||
      page === 'selecao-produto'
        ? '#251544'
        : page === 'make-view'
        ? 'none'
        : page === 'make-forward' ||
          page === 'make-forward-nfse' ||
          page === 'make-forward-cte'
        ? 'none'
        : page === 'tag-management' ||
          page === 'base-legal' ||
          page === 'integrations-management' ||
          page === 'make-forward-dashboards' ||
          page === 'declaracoes'
        ? '#F27405'
        : page === 'make-the-price'
        ? 'none'
        : page === 'upload' ||
          page === 'make-view-files' ||
          page === 'cadastros-basicos'
        ? '#A646DC'
        : page === 'make-the-price' ||
          page === 'make-the-price-tax-matrix-cia' ||
          page === 'reforma'
        ? theme.palette.secondary[80]
        : theme.palette.primary.main,
    height: '54px',
    width: '54px',
    borderRadius: '5px',
    marginRight: '4px'
  };

  return (
    <>
      {!boxed ? (
        <div id="navButtonContainer">
          <ProductIcon
            id="navButton"
            breadcrumb={breadcrumb}
            page={page}
            styledtheme={styledtheme}
          >
            <ButtonLogo page={page} />
            <div id="navPick">
              <ArrowDropDownIcon sx={{ color: '#fff', width: '15px' }} />
            </div>
          </ProductIcon>
        </div>
      ) : (
        <div style={box}>
          <ButtonLogo page={page} />
        </div>
      )}
    </>
  );
}

export default index;
