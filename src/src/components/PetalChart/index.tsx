import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface Data {
  value: number;
  color: string;
  [key: string]: any;
}
interface PetalChartProps {
  data: Data[];
  width?: number;
  height?: number;
}

const PetalChart = ({
  data = [],
  width = 500,
  height = 500,
}: PetalChartProps) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current ?? "")
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove(); // 再描画時に古い要素を削除

    // Petal Chart 描画ロジック
    const radius = Math.min(width, height) / 10;
    const angleStep = (2 * Math.PI) / data.length;
    const centerCircleRadius = 15;
    const zero_flag = (val: number) => (val === 0 ? 0 : 1);

    const petal = d3
      .arc<Data>()
      .innerRadius((d: any) => centerCircleRadius * zero_flag(d.value))
      .outerRadius((d: any) => radius * d.value)
      .startAngle((d: any, i: number) => i * angleStep)
      .endAngle((d: any, i: number) => (i + 1) * angleStep)
      .cornerRadius(100);

    svg
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("d", petal)
      .attr("fill", (d: any) => d.color)
      .attr("opacity", 0.6)
      .attr("stroke", "#fff")
      .attr("stroke-width", 4);

    svg
      .append("g")
      .append("circle")
      .attr("transform", `translate(${width / 2}, ${height / 2})`)
      .attr("r", centerCircleRadius)
      .attr("fill", "#555")
      .attr("opacity", 0.6)
      .attr("stroke", "#fff")
      .attr("stroke-width", 4);
  }, [data, width, height]);

  // SVGを画像に変換して保存する関数
  const saveAsImage = () => {
    const svgElement = svgRef.current;

    // SVGをXMLとして文字列化
    if (svgElement) {
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], {
        type: "image/svg+xml;charset=utf-8",
      });
      const svgUrl = URL.createObjectURL(svgBlob);

      // CanvasにSVGを描画
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = function () {
        ctx?.drawImage(img, 0, 0);
        URL.revokeObjectURL(svgUrl);

        // CanvasをPNG画像として保存
        const imgURL = canvas.toDataURL("image/png");
        const dlLink = document.createElement("a");
        dlLink.download = "petal-chart.png";
        dlLink.href = imgURL;
        dlLink.click();
      };
      img.src = svgUrl;
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <svg ref={svgRef} width={width} height={height}></svg>
      <button onClick={saveAsImage}>画像を保存</button>
    </div>
  );
};

export default PetalChart;
