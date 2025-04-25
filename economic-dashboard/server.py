from flask import Flask, jsonify
import yfinance as yf
from datetime import datetime

app = Flask(__name__)

# 야후 파이낸스 심볼 매핑
data_map = {
    "gold": "GC=F",
    "copper": "HG=F",
    "usdkrw": "USDKRW=X",
    "usdjpy": "USDJPY=X",
    "bitcoin": "BTC-USD",
    "nasdaq": "^IXIC",
    "dow": "^DJI",
    "wti": "CL=F"
}

@app.route('/api/indicators')
def indicators():
    result = {}
    for key, symbol in data_map.items():
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period="2d")
        if not hist.empty:
            last = hist.iloc[-1]
            prev = hist.iloc[-2] if len(hist) > 1 else last
            result[key] = {
                "value": round(float(last["Close"]), 2),
                "change": round(float(last["Close"] - prev["Close"]), 2),
                "date": last.name.strftime('%Y-%m-%d')
            }
        else:
            result[key] = {"value": None, "change": None, "date": None}
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
