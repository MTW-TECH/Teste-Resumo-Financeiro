import React, { useEffect, useRef, memo } from 'react';
import Chart from 'chart.js/auto';

const MakeViewInvoiceChart = ({
  labels,
  entrada,
  entradaTitle,
  saida,
  saidaTitle,
  title
}) => {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart = null;
    const canvas = chartRef.current;

    if (canvas && labels) {
      //check if a previous Chart instance exists
      if (myChart !== null) {
        myChart.destroy();
      }

      //create a new Chart instance
      myChart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: entradaTitle,
              data: entrada,
              backgroundColor: '#A646DC',
              borderColor: '#A646DC',
              borderWidth: 1
            },
            {
              label: saidaTitle,
              data: saida,
              backgroundColor: '#F27405',
              borderColor: '#F27405',
              borderWidth: 1
            }
          ]
        }
      });
    }

    function clickHandler(click) {
      const points = myChart.getElementAtEventForMode(
        click,
        'nearest',
        {
          intersect: true
        },
        true
      );
      if (points[0]) {
        //const dataset = points[0].datasetIndex;
        const index = points[0].index;
        console.log(myChart.data.labels[index]);
      }
    }

    myChart.canvas.onlick = clickHandler;

    return () => {
      if (myChart !== null) {
        myChart.destroy();
      }
    };
  }, [labels]);

  return (
    <div style={{ flex: '1' }}>
      <div
        style={{
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: '600',
          padding: '0px 0px 10px 0px'
        }}
      >
        {title}
      </div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default memo(MakeViewInvoiceChart);
