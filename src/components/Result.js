import React, { Component } from 'react';

import ShowWeather from './ShowWeather'

const ErrorSearch = () => {
    return(
    <div className="error-page">
        <div className="loading-block">
            <div class="preloader"></div>
        </div>
        {<p>Jeśli ładowanie trwa zbyt dużo czasu spróbuj wyszukać jeszcze raz.</p>}
    </div>
)
}

class Result extends Component {
    state = { 
        search: this.props.search,
        dailyData: [],
        hourlyData: [],
        cityData: []
     }
     
     componentDidMount() {
         //console.log("Component Result did mount")
         if (this.state.dailyData.length === 0) {
             if (this.state.dailyData.length === 0) {
                this.handleDataFetch()
             }
         }      
     }

     handleDataFetch = () => {
         console.log("Downloading data");
         const cityKey = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=O6d8dDlFJGUsAljKGI4lzKAxNomu6GJu&q=${this.state.search}`;
         fetch(cityKey)
         .then(response => {
             if (response.ok) return response
             throw Error(response.status)
         })
         .then(response => response.json())
         .then(data => {
             const cityData = data
             const individualKeyCity = data[0].Key;
             console.log("Code of the city " + individualKeyCity);
             const WeatherForCityRequest = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${individualKeyCity}?apikey=O6d8dDlFJGUsAljKGI4lzKAxNomu6GJu&details=true&metric=true`;
             fetch(WeatherForCityRequest)
             .then(response2 => {
                 if (response2.ok) return response2
                 throw Error(response2.status)
             })
             .then(response2 => response2.json())
             .then(data2 => {
                 console.log("Daily weather downloaded");
                 console.log(data2)
                 const dailyData = data2;
                 const HourlyWeatherRequest = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${individualKeyCity}?apikey=O6d8dDlFJGUsAljKGI4lzKAxNomu6GJu&details=true&metric=true`
                 fetch(HourlyWeatherRequest)
                 .then(response3 => {
                    if (response3.ok) return response3
                    throw Error(response3.status)
                 })
                 .then(response3 => response3.json())
                 .then(data3 => {
                    console.log("Hourly weather downloaded")
                    console.log(data3)
                    const hourlyData = data3
                    this.setState({
                        hourlyData,
                        dailyData,
                        cityData
                    })
                 }) 
             })
             
            })
     }


    render() { 
        //console.log("Rendering Result component")
        const {dailyData, hourlyData, cityData, search} = this.state;
        let start = "no";
        if(dailyData){
            if (hourlyData.length > 0) {
                start = "ok"
            }
        } else { 
            console.log("No data! Try again.. ");
        }
        const decisionStatus = start === "ok" ? <ShowWeather search={search} dailyData={dailyData} hourlyData={hourlyData} cityData={cityData} /> : <ErrorSearch />;
        return ( 
            <React.Fragment>
                {decisionStatus}
                <button className="resetSearch" onClick={this.props.handleNewSearch}>Cofnij</button>
            </React.Fragment>
         );
    }
}
 
export default Result;