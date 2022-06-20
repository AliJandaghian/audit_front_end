import {
  Chart,
  ArcElement,
  BarElement,
  BarController,
  LinearScale,
  CategoryScale,
  Decimation,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const registerChartJS = () => {
  return Chart.register(
    ChartDataLabels,
    BarElement,
    ArcElement,
    BarController,
    LinearScale,
    CategoryScale,
    Decimation,
    Legend,
    Title,
    Tooltip
  );
};

export default registerChartJS;
