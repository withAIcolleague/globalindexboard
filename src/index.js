import React from "react";
import ReactDOM from "react-dom";
import { IndicatorBoard } from "./components/indicators"; // IndicatorBoard 컴포넌트를 가져오기
// ...existing code...

ReactDOM.render(
  <React.StrictMode>
    <IndicatorBoard /> {/* IndicatorBoard 컴포넌트를 렌더링 */}
  </React.StrictMode>,
  document.getElementById("root")
);