import Highcharts from "highcharts";

const engagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
    const countsByChannelId = messageCountList.reduce((acc, countData) => {
      const { channelId, count, timeBucket } = countData;
      if (!acc[channelId]) {
        acc[channelId] = {
          dates: [],
          counts: [],
        };
      }
      acc[channelId].dates.push(timeBucket);
      acc[channelId].counts.push(Number(count));

      return acc;
    }, {});

    const multipleMessageChannels = Object.keys(countsByChannelId).filter(
      (channelId) => countsByChannelId[channelId].dates.length > 1
    );

    console.log("multipleMessageChannels = ", multipleMessageChannels);

    const channelInfo = channels.reduce((acc, channelData) => {
      acc[channelData.id] = channelData.name;
      return acc;
    }, {});

    console.log("channelInfo = ", channelInfo);

    const series = multipleMessageChannels.map((channelId) => {
      return {
        type: "spline",
        color: "#008f8d",
        name: channelInfo[channelId],
        data: countsByChannelId[channelId].dates
          .map((date, i) => {
            return [
              new Date(date).getTime(),
              countsByChannelId[channelId].counts[i],
            ];
          })
          .sort((a, b) => a[0] - b[0]),
      };
    });

    const options = {
      chart: {
        backgroundColor: "#22222c",
      },
      title: {
        text: "",
      },
      xAxis: {
        type: "datetime",
        crosshair: {
          width: 1,
          color: "#ffffff",
        },
        lineColor: "#666666",
        tickColor: "#666666",
        labels: {
          style: {
            color: "#666666",
          },
        },
        tickInterval: 24 * 3600 * 1000,
      },
      yAxis: {
        title: {
          text: "Message Count",
        },
        tickLength: "6",
        tickWidth: 1,
        tickColor: "#666666",
        labels: {
          x: -8,
        },
        gridLineWidth: 0,
      },
      series,
      tooltip: {
        backgroundColor: "black",
        style: {
          color: "#fff",
        },
        formatter: function () {
          return (
            `<b>${this.series.name}</b><br/>` +
            `${this.y} message on ${Highcharts.dateFormat("%Y-%m-%d", this.x)}`
          );
        },
      },
      plotOptions: {
        series: {
          marker: {
            enabled: false,
          },
        },
      },
    };

    return options;
  },
};

export default engagementHelper;
