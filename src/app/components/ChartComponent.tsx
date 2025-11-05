"use client";
import { useEffect, useRef } from "react";
import generateCandlestickData from "../assets/data";

const ChartComponent = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    import("lightweight-charts").then((LightweightCharts) => {
      if (!chartContainerRef.current) return;

      const chart = LightweightCharts.createChart(chartContainerRef.current, {
        layout: {
          background: { color: "#222" },
          textColor: "#C3BCDB",
        },
        grid: {
          vertLines: { color: "#444" },
          horzLines: { color: "#444" },
        },
      });

      chart.priceScale("right").applyOptions({ borderColor: "#71649C" });
      chart
        .timeScale()
        .applyOptions({ borderColor: "#71649C", barSpacing: 10 });

      const candleStickData = generateCandlestickData().map((datapoint) =>
        datapoint.close < 205
          ? datapoint
          : { ...datapoint, color: "orange", wickColor: "orange" }
      );

      const lineData = candleStickData.map((datapoint) => ({
        time: datapoint.time,
        value: (datapoint.close + datapoint.open) / 2,
      }));

      const areaSeries = chart.addAreaSeries({
        lastValueVisible: false,
        crosshairMarkerVisible: false,
        lineColor: "transparent",
        topColor: "rgba(56, 33, 110,0.6)",
        bottomColor: "rgba(56, 33, 110, 0.1)",
      });
      areaSeries.setData(lineData);

      const mainSeries = chart.addCandlestickSeries();
      mainSeries.setData(candleStickData);
      mainSeries.applyOptions({
        wickUpColor: "rgb(54, 116, 217)",
        upColor: "rgb(54, 116, 217)",
        wickDownColor: "rgb(225, 50, 85)",
        downColor: "rgb(225, 50, 85)",
        borderVisible: false,
      });
      mainSeries.priceScale().applyOptions({
        autoScale: false,
        scaleMargins: { top: 0.1, bottom: 0.2 },
      });

      const resizeHandler = () => {
        if (chartContainerRef.current) {
          chart.resize(
            chartContainerRef.current.clientWidth,
            chartContainerRef.current.clientHeight
          );
        }
      };
      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("resize", resizeHandler);
        chart.remove();
      };
    });
  }, []);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default ChartComponent;
