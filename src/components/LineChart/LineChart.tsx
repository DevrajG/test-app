import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Chart from 'react-apexcharts';
import moment from 'moment';
import _ from 'lodash';
import { useIsDarkMode } from 'state/user/hooks';
import formatNumber from 'utils/formatNumber';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export interface LineChartProps {
  backgroundColor?: string;
  isCall?: boolean;
  data?: Array<number>;
  categories?: Array<string>;
  width?: number | string;
  height?: number | string;
  palette?: Object;
  chartType?: string;
  showYAxis?: boolean;
}
const LineChart: React.FC<LineChartProps> = ({
  backgroundColor,
  isCall = false,
  categories = [],
  data = [],
  width = 500,
  height = 200,
  chartType = 'weekly',
  showYAxis = false,
}) => {
  const dark = useIsDarkMode();
  const theme = useTheme();

  const wCategories = _.uniq(
    chartType === 'weekly'
      ? categories.map(
          (label) => weekdays[moment(label, 'YYYY/MM/DD').isoWeekday() - 1],
        )
      : categories,
  );

  const wrappedCategories =
    chartType === 'weekly'
      ? categories.map(
          (label) => weekdays[moment(label, 'YYYY/MM/DD').isoWeekday() - 1],
        )
      : categories;

  const prices: any = {};

  wCategories.map((item) => {
    prices[item] = [];

    if (!prices[item].length) {
      wrappedCategories.map((category, index) => {
        if (category === item) {
          prices[item].push(data[index]);
        }

        return null;
      });
    }

    return prices[item];
  });

  Object.keys(prices).map((key) => {
    prices[key] = _.sumBy(prices[key], (i) => Number(i)) / prices[key].length;

    return null;
  });

  let strokeColor = isCall ? '#14A887' : '#BF47C3';
  let gradientColor = isCall ? '#D4F8FB' : '#F8D0E7';

  if (dark) {
    gradientColor = isCall ? '#022628' : '#350E25';
  }

  const options = {
    chart: {
      sparkline: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      width: '100%',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: [strokeColor],
    },
    markers: {
      colors: [strokeColor],
      strokeWidth: 0,
    },
    fill: {
      type: 'gradient',
      colors: [gradientColor],
      gradient: {
        gradientToColors: [backgroundColor || theme.palette.background.paper],
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: wCategories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: new Array(wCategories.length).fill(
            dark ? '#646464' : '#CACED3',
          ),
        },
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
      padding: {
        left: 30,
        right: 20,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: dark ? 'dark' : 'light',
      marker: {
        show: false,
      },
      fillSeriesColor: false,
      custom: (props: any) => {
        return (
          `<div class="tooltip" style="display: flex; flex-direction: column; box-shadow: none; border-radius: 12px; background: transparent;">` +
          `<span style="padding: 0.5rem; border: 1px solid ${
            dark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'
          }; border-radius: 12px 12px 0 0; background: ${
            dark ? 'rgba(0, 0, 0, 0.91)' : 'rgba(255, 255, 255, 0.91)'
          }; color: ${dark ? '#646464' : '#8D97A0'};">` +
          moment(categories[props.dataPointIndex], 'YYYY/MM/DD HH:mm')
            .format('DD MMM, YYYY h:mm A')
            .replace(String(moment().year()), '') +
          '</span>' +
          `<span style="padding: 0.5rem; border: 1px solid ${
            dark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'
          }; border-top: none; border-radius: 0 0 12px 12px; background: ${
            dark ? 'rgba(0, 0, 0, 0.91)' : 'rgba(255, 255, 255, 0.91)'
          }; color: ${dark ? '#646464' : '#8D97A0'};">` +
          `Price level: <b style="color: ${
            dark ? 'white' : 'rgba(0, 0, 0, 0.91)'
          };">` +
          formatNumber(props.series[props.seriesIndex][props.dataPointIndex]) +
          '</b></span>' +
          '</div>'
        );
      },
    },
  };

  const series = [
    {
      name: 'Prices',
      data: Object.values(prices),
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
