import React, { useEffect, useState } from "react";
import { INDICATORS } from "./indicators";
import styles from "./Dashboard.module.css";

const indicatorList = [
  { key: "gold", label: "금 (Gold)", unit: "$", url: "https://www.tradingview.com/symbols/XAUUSD/", tooltip: "금 가격은 세계 경제의 불안정성과 관련이 있습니다.", predict: "상승" },
  { key: "copper", label: "구리 (Copper)", unit: "$", url: "https://www.tradingview.com/symbols/XCUUSD/", tooltip: "구리 가격은 세계 경제의 성장과 관련이 있습니다.", predict: "상승" },
  { key: "usdkrw", label: "원/달러 환율", unit: "", url: "https://www.tradingview.com/symbols/USDKRW/", tooltip: "원/달러 환율은 한국 경제의 성장과 관련이 있습니다.", predict: "하락" },
  { key: "usdjpy", label: "엔/달러 환율", unit: "", url: "https://www.tradingview.com/symbols/USDJPY/", tooltip: "엔/달러 환율은 일본 경제의 성장과 관련이 있습니다.", predict: "상승" },
  { key: "bitcoin", label: "비트코인", unit: "$", url: "https://www.tradingview.com/symbols/BTCUSD/", tooltip: "비트코인 가격은 세계 경제의 불안정성과 관련이 있습니다.", predict: "상승" },
  { key: "nasdaq", label: "나스닥", unit: "", url: "https://www.tradingview.com/symbols/IXIC/", tooltip: "나스닥 지수는 미국 기술 산업의 성장과 관련이 있습니다.", predict: "상승" },
  { key: "dow", label: "다우지수", unit: "", url: "https://www.tradingview.com/symbols/DJI/", tooltip: "다우지수는 미국 경제의 성장과 관련이 있습니다.", predict: "상승" },
  { key: "wti", label: "WTI(서부산중질유)", unit: "$", url: "https://www.tradingview.com/symbols/CL1!/", tooltip: "WTI 가격은 세계 경제의 성장과 관련이 있습니다.", predict: "상승" },
];

export default function Dashboard() {
  const [fredDates, setFredDates] = useState({});
  const [indicatorData, setIndicatorData] = useState({});
  const [loading, setLoading] = useState(true);

  // 발표일/다음 발표일 FRED API에서 fetch
  useEffect(() => {
    fetch("http://localhost:5001/api/fred-dates")
      .then((res) => res.json())
      .then((json) => {
        setFredDates(json);
      });
  }, []);

  // /api/indicators에서 값/변동 fetch
  useEffect(() => {
    fetch("/api/indicators")
      .then((res) => res.json())
      .then((json) => {
        setIndicatorData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <section className={styles.dashboard}>
      {indicatorList.map((item) => (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.indicator} indicator indicator-${item.key}`}
          key={item.key}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className={styles["indicator-dates"]}>
            <span className={`date-prev date-prev-${item.key}`}>{fredDates[item.key]?.prev || "-"}</span>
            <span className={`date-next date-next-${item.key}`}>{fredDates[item.key]?.next || "-"}</span>
          </div>
          <div className={styles["indicator-name"]}>{item.label}</div>
          <div className={`indicator-value indicator-value-${item.key}`}>
            {item.unit}{indicatorData[item.key]?.value ?? "-"}
          </div>
          <div className={`indicator-change indicator-change-${item.key}`} style={{color: indicatorData[item.key]?.change > 0 ? '#66e0a3' : indicatorData[item.key]?.change < 0 ? '#ff7675' : '#bfc9db'}}>
            {indicatorData[item.key]?.change > 0 ? `▲ ${indicatorData[item.key].change}` : indicatorData[item.key]?.change < 0 ? `▼ ${Math.abs(indicatorData[item.key].change)}` : "-"}
          </div>
          <div className={styles.tooltip}>
            <b>{item.label}</b> <br />
            {item.tooltip}
          </div>
          <div className={styles["predict-ticker"]}><span>{item.predict}</span></div>
        </a>
      ))}
    </section>
  );
}
