import React, { useEffect } from 'react';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyList } from 'features/cadastroFeatures/Company/company.store';
import { userdataSelector } from 'features/userFeatures/userdata.store';
//COMPONENTS
import StandardLayout from '../../../components/Layout/StandardLayout/StandardLayout';
import FooterLite from '../../../components/Layout/Footer';
import ProductHeader from '../../../components/ProductHeader';
//MUI
import { Container, Box } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
//Nivo
import { ResponsiveBar } from '@nivo/bar';

function FinancialSummary() {
  const dispatch = useDispatch();
  const { companySelected } = useSelector(userdataSelector);
  const importedCompany = companySelected?.id || '';
  const companyDisplayed = importedCompany
    ? `${companySelected?.nome} - ${companySelected?.cnpj}`
    : '';

  useEffect(() => {
    dispatch(getCompanyList());
  }, []);

  //----------------------------Cards-------------------------
  let receita = '450.000,00';
  let custos = '245.000,00';
  let taxas = '65.000,00';
  let lucro = '65.000,00';
  let lajida = '30.000,00';

  const Card = ({
    title,
    value,
    icon,
    isCurrency,
    subtitle,
    subtitleColor
  }) => (
    <div
      style={{
        width: '100%',
        minHeight: '110px',
        background: '#fff',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p style={{ color: '#6b7280', margin: 0 }}>{title}</p>
        {icon}
      </div>
      <h2 style={{ margin: '8px 0' }}>
        {isCurrency ? `R$ ${value.toLocaleString()}` : value}
      </h2>
      {subtitle && (
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: subtitleColor,
            fontWeight: 500,
            marginTop: 'auto'
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );

  //---------------------------Gráfico-------------------
  const monthlyData = [
    {
      mes: 'Jan',
      receita: 58000,
      taxa: 32000
    },
    {
      mes: 'Fev',
      receita: 70000,
      taxa: 38000
    },
    {
      mes: 'Mar',
      receita: 50000,
      taxa: 25000
    },
    {
      mes: 'Abr',
      receita: 65000,
      taxa: 32000
    },
    {
      mes: 'Mai',
      receita: 70000,
      taxa: 38000
    },
    {
      mes: 'Jun',
      receita: 47000,
      taxa: 24000
    },
    {
      mes: 'Jul',
      receita: 60000,
      taxa: 32000
    },
    {
      mes: 'Ago',
      receita: 50000,
      taxa: 25000
    },
    {
      mes: 'Set',
      receita: 60000,
      taxa: 32000
    },
    {
      mes: 'Out',
      receita: 45000,
      taxa: 22000
    },
    {
      mes: 'Nov',
      receita: 70000,
      taxa: 38000
    },
    {
      mes: 'Dez',
      receita: 60000,
      taxa: 32000
    }
  ];

  //---------------------------CSS-----------------------

  const buttons = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    background: '#fff',
    cursor: 'pointer',
    transition: 'all 0.2s ease',

    '&:hover': {
      background: '#251544',
      color: '#fff',
      borderColor: '#251544'
    }
  };

  return (
    <StandardLayout>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ padding: '0 180px 0px 180px' }}
      >
        <ProductHeader
          page={'financial-summary'}
          pageTitle={'Resumo Financeiro'}
          pageBack={'/levdata/'}
          buttons={true}
          isolated={false}
          alert={importedCompany ? false : true}
          cnpj={
            importedCompany
              ? companyDisplayed
              : 'Escolha uma empresa pela aba "Perfil"'
          }
        />
        {/*Cards*/}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '25px',
            margin: '20px 0px',
            width: '100%'
          }}
        >
          <Card
            title="RECEITA"
            value={receita}
            isCurrency
            subtitle="+12% Vs mês passado"
            subtitleColor="#10b981"
          />

          <Card
            title="CUSTOS"
            value={custos}
            isCurrency
            subtitle="-8% Vs mês passado"
            subtitleColor="#f5510b"
          />
          <Card
            title="TAXAS"
            value={taxas}
            isCurrency
            subtitle="Estável"
            subtitleColor="#5c6270"
          />
          <Card
            title="LUCRO LÍQUIDO"
            value={lucro}
            isCurrency
            subtitle="+15% Vs mês passado"
            subtitleColor="#10b981"
          />

          <Card
            title="EBITDA"
            value={lajida}
            isCurrency
            subtitle="-8% Vs mês passado"
            subtitleColor="#f5510b"
          />
        </div>

        {/*Grafico*/}
        <div
          style={{
            width: '100%',
            margin: '20px 0px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              width: '100%'
            }}
          >
            {/* HEADER */}
            <div
              style={{
                padding: '18px',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: 600,
                fontSize: '18px',
                color: '#374151',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>Evolução Mensal</span>

              {/* LEGENDA */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '18px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#3B82F6'
                    }}
                  />
                  Receita
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#f5510b'
                    }}
                  />
                  Taxa
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: '#10b981'
                    }}
                  />
                  Lucro
                </div>
              </div>
            </div>

            {/* GRÁFICO */}
            <div
              style={{
                height: '420px',
                padding: '20px',
                position: 'relative'
              }}
            >
              {/* BARRAS */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0
                }}
              >
                <ResponsiveBar
                  data={monthlyData}
                  keys={['receita', 'taxa']}
                  indexBy="mes"
                  margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                  padding={0.5}
                  groupMode="grouped"
                  colors={({ id }) =>
                    id === 'receita' ? '#3B82F6' : '#f5510b'
                  }
                  borderRadius={2}
                  axisTop={null}
                  axisRight={null}
                  enableLabel={false}
                  theme={{
                    axis: {
                      ticks: {
                        text: {
                          fill: '#6b7280',
                          fontSize: 12
                        }
                      }
                    },
                    grid: {
                      line: {
                        stroke: '#e5e7eb'
                      }
                    }
                  }}
                  layers={[
                    'grid',
                    'axes',
                    'bars',
                    ({ bars, yScale }) => {
                      const lineData = [
                        37000, 43000, 30000, 40000, 43000, 29000, 37000, 31000,
                        37000, 27000, 43000, 38000
                      ];

                      const points = bars
                        .filter((bar) => bar.key.includes('receita'))
                        .map((bar, index) => ({
                          x: bar.x + bar.width / 2,
                          y: yScale(lineData[index])
                        }));

                      return (
                        <g>
                          <path
                            d={`M ${points
                              .map((p) => `${p.x} ${p.y}`)
                              .join(' L ')}`}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth={3}
                          />

                          {points.map((p, i) => (
                            <circle
                              key={i}
                              cx={p.x}
                              cy={p.y}
                              r={5}
                              fill="#10b981"
                            />
                          ))}
                        </g>
                      );
                    }
                  ]}
                />
              </div>
            </div>
          </div>

          {/*BOTTOM */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}
          >
            {/* DETALHAMENTO */}
            <div
              style={{
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  padding: '18px',
                  borderBottom: '1px solid #e5e7eb',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: '#374151'
                }}
              >
                Detalhamento
              </div>

              <div style={{ padding: '20px' }}>
                {[
                  {
                    label: 'Custos Fixos',
                    value: 'R$ 120.000,00',
                    width: '60%',
                    color: '#3B82F6'
                  },
                  {
                    label: 'Custos Variáveis',
                    value: 'R$ 85.000,00',
                    width: '45%',
                    color: '#F59E0B'
                  },
                  {
                    label: 'Taxas',
                    value: 'R$ 40.000,00',
                    width: '28%',
                    color: '#f5510b'
                  }
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      marginBottom: '22px'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                        color: '#4b5563'
                      }}
                    >
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>

                    <div
                      style={{
                        width: '100%',
                        height: '8px',
                        background: '#e5e7eb',
                        borderRadius: '20px',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          width: item.width,
                          height: '100%',
                          background: item.color,
                          borderRadius: '20px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INDICADOR */}
            <div
              style={{
                background: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  padding: '18px',
                  borderBottom: '1px solid #e5e7eb',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: '#374151'
                }}
              >
                Indicador de Margem
              </div>

              <div
                style={{
                  height: '220px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    background: '#f0fdf4',
                    borderRadius: '15px',
                    padding: '30px 40px',
                    width: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <h1
                    style={{
                      fontSize: '64px',
                      margin: 0,
                      color: '#111827'
                    }}
                  >
                    24%
                  </h1>

                  <div
                    style={{
                      marginTop: '14px',
                      color: '#10b981',
                      fontWeight: 500,
                      fontSize: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <ArrowUpwardIcon fontSize="small" />
                    +3% Vs mês passado
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '20px',
            margin: '20px 0px'
          }}
        >
          {/* INSIGHTS */}
          <Box
            sx={{
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* HEADER */}
            <Box
              sx={{
                padding: '16px',
                fontWeight: 600,
                borderBottom: '1px solid #e5e7eb',
                color: '#374151',
                fontSize: '18px'
              }}
            >
              Insights Automatizados
            </Box>

            {/* LISTA */}
            <Box
              sx={{
                flex: 1,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
                justifyContent: 'space-evenly'
              }}
            >
              {/* ITEM 1 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BarChartIcon style={{ color: '#374151' }} />

                <span style={{ color: '#4b5563' }}>
                  O lucro aumentou em{' '}
                  <span style={{ color: '#f59e0b' }}>R$ 12.000,00</span> neste
                  mês.
                </span>
              </Box>

              {/* ITEM 2 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <LightbulbOutlinedIcon sx={{ color: '#0ea5e9' }} />

                <span style={{ color: '#4b5563' }}>
                  Os custos estão{' '}
                  <span style={{ color: '#f59e0b' }}>
                    crescendo mais rápido{' '}
                  </span>{' '}
                  que a receita.
                </span>
              </Box>
            </Box>
          </Box>
          {/* AÇÕES */}
          <Box
            sx={{
              background: '#fff',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
              width: '100%'
            }}
          >
            <Box
              sx={{
                padding: '16px',
                fontWeight: 600,
                borderBottom: '1px solid #e5e7eb',
                color: '#374151',
                fontSize: '18px'
              }}
            >
              Ações Rápidas
            </Box>

            <div
              style={{
                marginTop: '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              <Box sx={buttons}>
                Visualizar Fluxo de Caixa
                <ArrowForwardIcon fontSize="small" />
              </Box>

              <Box sx={buttons}>
                Analisar Custos
                <ArrowForwardIcon fontSize="small" />
              </Box>
            </div>
          </Box>
        </Box>
      </Container>
      <FooterLite text={'Resumo Financeiro'} pad={'30px 0px 30px 0px'} />
    </StandardLayout>
  );
}

export default FinancialSummary;
