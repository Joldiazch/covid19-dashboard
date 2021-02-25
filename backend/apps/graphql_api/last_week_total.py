from datetime import date, timedelta, datetime
import requests
import time

def get_data():
    # return data about confirmed, recovered, deaths, active and critical by day

    url = "https://covid-19-data.p.rapidapi.com/report/totals"

    headers = {
        'x-rapidapi-key': "0057623fafmsh56471cbcf2faa1ep108687jsndf01b733d902",
        'x-rapidapi-host': "covid-19-data.p.rapidapi.com"
        }
    
    time.sleep(1)
    response = requests.request("GET", url, headers=headers).json()
    print(response)
    return response

def report():
    # return death, and date of report of last week from today variable
    data = get_data()

    # Set day from const last week
    today = datetime.strptime('2020-08-09', '%Y-%m-%d')
    # Filter daily report for last 7 days
    last_week_reports = list(filter(lambda rep: (today - datetime.strptime(rep['date'], '%Y-%m-%d')).days < 7, data))
    # return last week respor with only date and deaths atributes
    return list(map(lambda rep: {"date": rep["date"], "deaths": rep["deaths"]}, last_week_reports))

