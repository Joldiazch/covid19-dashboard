from datetime import date, timedelta, datetime
import requests
import time


def get_data(code):
    # return data about confirmed, recovered, deaths, active and critical by day

    url = "https://covid-19-data.p.rapidapi.com/country/code"

    querystring = {"code": code}

    headers = {
        'x-rapidapi-key': "0057623fafmsh56471cbcf2faa1ep108687jsndf01b733d902",
        'x-rapidapi-host': "covid-19-data.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring).json()

    return response[0]

def report(code):
    # return death, and date of report of last week from today variable
    data = get_data(code)

    return {"confirmed": data["confirmed"], "recovered": data["recovered"], "critical": data["critical"], "deaths": data["deaths"]}
