import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Chart from 'react-apexcharts';
import moment from 'moment';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export interface LineChartProps {
  color: string;
  data?: Array<number>;
  categories?: Array<string>;
  width?: number | string;
  height?: number | string;
  palette?: Object;
  showYAxis?: boolean;
}
const LineChart: React.FC<LineChartProps> = ({
  color,
  categories = [],
  data = [],
  width = 500,
  height = 200,
  showYAxis = false,
}) => {
  const theme = useTheme();

  const options = {
    chart: {
      sparkline: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: [color],
    },
    fill: {
      type: 'gradient',
      colors: [color],
      gradient: {
        gradientToColors: [theme.palette.background.paper],
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: categories.map(
        (label) => weekdays[moment(label, 'YYYY/MM/DD').isoWeekday() - 1],
      ),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: showYAxis,
      showForNullSeries: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      crosshairs: {
        show: false,
      },
    },
    grid: {
      show: false,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      marker: {
        show: false,
      },
      fillSeriesColor: false,
      custom: (props: any) => {
        return (
          '<div class="tooltip" style="display: flex; flex-direction: column; box-shadow: none;">' +
          '<span style="padding: 0.5rem; border: 2px solid #646464;">' +
          moment(categories[props.dataPointIndex], 'YYYY/MM/DD').format(
            'DD MMM, YYYY',
          ) +
          '</span>' +
          '<span style="padding: 0.5rem; border: 2px solid #646464; border-top: none;">' +
          'Price: ' +
          props.series[props.seriesIndex][props.dataPointIndex] +
          '</span>' +
          '</div>'
        );
      },
    },
  };

  const series = [
    {
      name: 'Prices',
      data,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type='area'
      width={width}
      height={height}
    />
  );
};

export default LineChart;
