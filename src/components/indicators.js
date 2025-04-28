import React from "react";

export const INDICATORS = [
  {
    key: "gdp",
    label: "GDP 성장률",
    unit: "%",
    url: "https://ko.tradingeconomics.com/united-states/gdp-growth",
    fredId: "GDPC1",
    tooltip: "GDP 성장률은 한 국가의 경제가 일정 기간 동안 얼마나 성장했는지를 나타내는 지표입니다."
  },
  {
    key: "cpi",
    label: "소비자물가지수(CPI)",
    unit: "%",
    url: "https://ko.tradingeconomics.com/united-states/inflation-cpi",
    fredId: "CPIAUCSL",
    tooltip: "CPI는 소비자가 구입하는 상품 및 서비스의 가격 변동을 측정하는 지표입니다."
  },
  {
    key: "unemployment",
    label: "실업률",
    unit: "%",
    url: "https://ko.tradingeconomics.com/united-states/unemployment-rate",
    fredId: "UNRATE",
    tooltip: "실업률은 경제활동인구 중 실업자가 차지하는 비율입니다."
  },
  {
    key: "rate",
    label: "미국 기준금리",
    unit: "%",
    url: "https://ko.tradingeconomics.com/united-states/interest-rate",
    fredId: "FEDFUNDS",
    tooltip: "기준금리는 중앙은행이 상업은행에 적용하는 금리로, 시장금리의 기준이 됩니다."
  },
  {
    key: "retail",
    label: "소매판매",
    unit: "%",
    url: "https://ko.tradingeconomics.com/united-states/retail-sales",
    fredId: "RSAFS",
    tooltip: "소매판매는 소비자 지출의 변화를 보여주는 지표입니다."
  },
  {
    key: "industrial",
    label: "산업생산",
    unit: "%",
    url: "https://ko.tradingeconomics.com/united-states/industrial-production",
    fredId: "INDPRO",
    tooltip: "산업생산은 제조업, 광업, 유틸리티 생산량의 변동을 나타냅니다."
  },
  {
    key: "trade",
    label: "무역수지",
    unit: "억달러",
    url: "https://ko.tradingeconomics.com/united-states/balance-of-trade",
    fredId: "BOPGSTB",
    tooltip: "무역수지는 수출입 차이를 나타내며, 흑자/적자 여부가 환율과 경제에 영향을 줍니다."
  },
  {
    key: "income",
    label: "개인소득",
    unit: "%",
    url: "https://ko.tradingeconomics.com/united-states/personal-income",
    fredId: "PI",
    tooltip: "개인소득은 가계의 소득 증감 추이를 보여줍니다."
  },
  {
    key: "umich",
    label: "미시간대 소비자심리지수",
    unit: "지수",
    url: "https://ko.tradingeconomics.com/united-states/consumer-confidence",
    fredId: "UMCSENT",
    tooltip: "미시간대 소비자심리지수는 소비자들의 경제에 대한 신뢰도를 나타냅니다."
  }
];

export function generatePrediction(indicatorKey) {
  // AI 모델을 호출하여 예측 값을 생성합니다.
  // 예: AI 모델 API 호출 또는 로컬 모델 실행
  switch (indicatorKey) {
    case "gdp":
      return "AI 모델 예측: GDP 성장률 상승, 경기 회복 기대감↑";
    case "cpi":
      return "AI 모델 예측: CPI 상승, 인플레이션 압력↑";
    case "unemployment":
      return "AI 모델 예측: 실업률 하락, 노동시장 개선 신호";
    case "rate":
      return "AI 모델 예측: 기준금리 동결, 금융시장 안정 기대";
    case "retail":
      return "AI 모델 예측: 소비 증가세 지속, 경기 회복 기대감↑";
    case "industrial":
      return "AI 모델 예측: 생산 증가세, 제조업 경기 개선 신호";
    case "trade":
      return "AI 모델 예측: 무역적자 확대, 달러 약세 압력";
    case "income":
      return "AI 모델 예측: 개인소득 증가, 소비 여력 확대 기대";
    case "umich":
      return "AI 모델 예측: 소비자심리 하락, 소비 위축 우려";
    default:
      return "AI 모델 예측: 데이터 없음";
  }
}

// 전광판 컴포넌트 추가
export function IndicatorBoard() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
      {INDICATORS.map((indicator) => (
        <div
          key={indicator.key}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            textAlign: "center",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h3>{indicator.label}</h3>
          <p>{indicator.tooltip}</p>
          <a href={indicator.url} target="_blank" rel="noopener noreferrer">
            자세히 보기
          </a>
          <p style={{ marginTop: "10px", fontWeight: "bold" }}>
            {generatePrediction(indicator.key)}
          </p>
        </div>
      ))}
    </div>
  );
}
