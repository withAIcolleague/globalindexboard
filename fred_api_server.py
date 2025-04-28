import requests
from flask import Flask, jsonify
import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return "Welcome to the Global Index Board API!"

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
    result = {}
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
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5001, debug=True)
