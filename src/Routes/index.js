//==================PORTAL ROUTES=======================//
export const PORTALHOME = '/';
export const PROFILE = '/perfil';
export const SCHEDULE = '/agenda';
export const FILES = '/arquivos';
export const REPORTS = '/reports';
export const HEALTHCHECK = '/health-check';
export const TAXINFORMATION = '/tax-information-page';

//===================MAKE BI==================//
export const MAKEBI = '/make-view';
export const QSEARCHBAR = '/make-bi/q-searchbar';
export const MAKEFORWARDDASHBOARDS = '/make-forward/dashboards';
export const REFORMA = '/reforma';
export const MAKEREFORMA = '/make-reforma';
export const CREDITOS = '/creditos';
export const DASHBOARDEMBEDDED = '/dashboard-embedded';

//=================CAT 42 ROUTES==================//
export const CAT42HOME = '/cat42/home/';
export const MTPFICHADETAILS = ':id';

//================ELEMENTAR ROUTES======================//
export const ELEMENTARHOME = '/make-the-price/home/';
export const SPEDDETAILS = ':id';
export const SPEDCRUZAMENTOS = 'cruzamentos/:id';
export const SPEDANALISE = 'analise/:id';
export const SPEDQUADROANALITICO = 'quadro-analitico/:id';
export const TESTUPLOAD = '/elementar/test-upload';
export const SAVECOMPANY = '/elementar/save-company';
export const TAXMATRIXCOMPANYPAGE = 'tax-matrix-for-companies';
export const TAXMATRIXMESSAGE = 'tax-matrix-message';

//=================CADASTRO DE DADOS=======================//
export const CADASTROSBASICOS = '/cadastros-basicos/home/';
export const CADASTROSBASICOSEMPRESAS = 'empresas/:id';
export const CADASTROSBASICOSUSERS = 'usuarios/:id';
export const CADASTROSDASHBOARD = 'painel/:id';
export const CONTROLDASHBOARDS = 'control-dashboards/:id';
export const USERSDASHBOARDS = 'user-dashboards/:id';
export const CADBASCOMPANIESMAKEVIEW = 'empresas-make-view';
export const CADBASCOMPANIESLAUNCHER = '/cadastros-basicos/u/empresas';

//====================OLHO DA MIA========================//
export const OLHODAMIAHOME = '/olho-da-mia/home';

//============MAKE FORWARD | MAKE FORWARD NFSE | MAKE FORWARD CTE=============//
export const NOTAAVULSAHOME = '/make-forward';
export const MAKEFORWARDNFSE = '/make-forward-nfse';
export const MAKEFORWARDCTE = '/make-forward-cte';
export const MAKEFORWARDINTEGRATIONS = '/integrations-management';
export const NOTAAVULSATAGS = 'tag-management';
export const MAKEFORWARDTAGS = 'tag-management/:invoice';
export const NOTAAVULSAANALYSIS = ':id';
export const NOTAAVULSAANALYSISSUBST = 'subst/:id';
export const NOTAAVULSADETAILS = 'details/:id/:newId/:type';
export const NOTAAVULSADETAILSTAB = 'details/:id/:newId/:type/:tab';
export const NOTASERVICEDETAILS = 'details/:id/:type';
export const NOTACTEDETAILS = 'details/:id/:type';
export const MFINVOICEERRORS = 'invoice-errors/:id/:newId/:type/:view';
export const MFSERVICEERRORS = 'service-errors/:id/:uuid/:type/:view';

//===================DECLARAÇÕES==================//
export const DECLARACOES = '/declaracoes';
export const DECLARACOESDETAILS = 'decdetails/:id';

//=================SUBIDA DE DOCUMENTOS==================//
export const SUBIDADEDOCUMENTOS = '/subida-documentos';
export const SUBIDADEDOCUMENTOSDE = '/upload-documents-de';
export const SUBIDADEDOCUMENTOSMAKEVIEW = '/subida-documentos-make-view';
export const SUBIDADEDOCUMENTOSCCS = '/upload-documents-ccs';

//=================SOLICITAR DOCUMENTOS==================//
export const SOLICITARDOCUMENTOS = '/solicitar-documentos';

//=================DEFINIR CATEGORIAS==================//
export const DEFINIRCATEGORIAS = '/definir-categorias';

//=================MAKE VIEW==================//
export const MAKEVIEWFILES = '/files';
export const MAKEVIEWDASHBOARDS = '/make-view-dashboards';

//=================BASE LEGAL==================//
export const BASELEGAL = '/base-legal';
export const NCMSELECTOR = '/ncm-selector';

//=================DLM==================//
export const LIFECYCLEETZ = '/etz/dlm';
export const LIFECYCLE = '/dlm';
export const DLMWORKFLOWS = '/dlm-workflows';
export const DLMUSERMANAGEMENT = '/dlm-user-management';

//=================CCS==================//
export const CCS = '/etz/reconciliation';

//==============GESTAO FINANCEIRA===============//
export const GESTAOFINANCEIRA = '/contas';
export const GESTAOFINANCEIRAEXTRATO = '/contas/extrato/:id';
export const GESTAOFINANCEIRAMOVIMENTACAO =
  '/contas/extrato/:accountId/movimentacao/:extractId';
export const GESTAOFINANCEIRACATEGORIA = '/categoria';
export const GESTAOFINANCEIRALANCAMENTO = '/lancamento';
export const GESTAOFINANCEIRACONCILIACAO = '/contas/conciliacao/:id';
export const GESTAOFINANCEIRAGRAFICOS = '/financeiro';
export const GESTAOFINANCEIRAFLUXOCAIXA = '/fluxo-caixa';
export const GESTAOFINANCEIRABANCO = '/banco';

//====================LEVDATA==============================//
export const DASHBOARDSHOME = '/dashboards';
export const TAXCREDITS = '/tax-credits';
export const TAXPLANNING = '/tax-planning';
export const REGIMECOMPARISON = '/regime-comparison';
export const PRICING = '/pricing';
export const TAXREGIMESIMULATION = '/tax-regime-simulation';
export const INTELLIGENCEENGINE = '/intelligence-engine';
export const FINANCIALSUMMARY = '/financial-summary';
export const CASHFLOW = '/cash-flow';
export const RECONCILIATION = '/reconciliation';
export const SELECAOPRODUTO = '/selecao-produto';
export const SELECAOSERVICO = '/selecao-servico';

//====================ETZ==============================//
export const RECONCILIATIONDASHBOARD = '/reconciliation-dashboard';

//=================TabelaTributáriaAtual==================//
export const TABELATRIBUTARIAATUAL = '/make-the-price/home/embasamento-legal';
