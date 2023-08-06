import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import engagementHelper from "../utils/engagementHelper";
import { messageCountList, channels } from "../utils/data";

const EngagementMessagesOverTime = () => {
  const options = engagementHelper.engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementMessagesOverTime;
