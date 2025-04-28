import requests
from flask import Flask, jsonify
import datetime
from collections import OrderedDict
import json

app = Flask(__name__)

@app.route('/')
def index():
    # 기존 메시지 대신 FRED 데이터 반환
    return fred_dates()

FRED_API_KEY = "a80189315bd5dcab43e2a94caffb68df"
FRED_SERIES = {
    "gdp": "GDPC1",
    "cpi": "CPIAUCSL",
    "unemployment": "UNRATE",
    "rate": "FEDFUNDS",
    "retail": "RSAFS",
    "industrial": "INDPRO",
    "trade": "BOPGSTB",
    "income": "PI",
    "umich": "UMCSENT"
}

def get_next_release(series_id):
    # FRED 공식 캘린더 API 활용 (series_release_dates endpoint)
    url = f"https://api.stlouisfed.org/fred/series/release_dates?series_id={series_id}&api_key={FRED_API_KEY}&file_type=json"
    r = requests.get(url)
    if r.ok:
        data = r.json()
        today = datetime.date.today()
        for d in data.get("release_dates", []):
            release_date = datetime.datetime.strptime(d["date"], "%Y-%m-%d").date()
            if release_date > today:
                return d["date"]
    return None

@app.route('/api/fred-dates')
def fred_dates():
    result = OrderedDict()  # 순서를 유지하기 위해 OrderedDict 사용
    for key, series_id in FRED_SERIES.items():
        url = f"https://api.stlouisfed.org/fred/series/observations?series_id={series_id}&api_key={FRED_API_KEY}&file_type=json"
        r = requests.get(url)
        if r.ok:
            data = r.json()
            observations = data.get("observations", [])
            if observations:
                last_obs = observations[-1]
                prev_date = last_obs["date"]
                next_date = get_next_release(series_id)
                result[key] = {"prev": prev_date, "next": next_date}
            else:
                result[key] = {"prev": None, "next": None}
        else:
            result[key] = {"prev": None, "next": None}
    return app.response_class(
        response=json.dumps(result, indent=4),  # Pretty Print JSON
        mimetype='application/json'
    )

if __name__ == '__main__':
    app.run(port=5001, debug=True)
