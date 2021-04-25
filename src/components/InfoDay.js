import React from 'react';

import drop from '../images/icons/drop.png'
import realtemp from '../images/icons/temperature.png'
import uv from '../images/icons/uv.png'
import wind from '../images/icons/wind.png'

const dropIcon = <img src={drop} alt="drop"/>
const realFellTempIcon = <img src={realtemp} alt="pressure"/>
const uvIcon = <img src={uv} alt="uv"/>
const windIcon = <img src={wind} alt="wind"/>

const DayNight = (props) =>{
    const data = props.actuallyTime
    let timeNow = (data.toString().substr(16,2) + "" + data.toString().substr(19,2))*1
    const appRise = props.dailyData.DailyForecasts[0].Sun.Rise
    const appSet = props.dailyData.DailyForecasts[0].Sun.Set

    const rise = (appRise.substr(11,2) + "" + appRise.substr(14,2))*1
    const set = (appSet.substr(11,2) + "" + appSet.substr(14,2))*1

    // Calculating progress DAY in percent
    const longDay = (set - rise);
    const actuallyNumberDay = (timeNow - rise);
    const percentDay = Math.floor((actuallyNumberDay*100)/longDay)

    // Calculating progress NIGHT in percent
    const longNight = (2400 - set) + rise
    const actuallyNumberNight = timeNow < rise ? (2400-set) + timeNow : (2400-set) - (2400 - timeNow)
    const percentNight = Math.floor((actuallyNumberNight*100)/longNight)

    // Showing progress DAY or NIGHT in percent
    let progressBarPosition = "";
    let timeOfDay = ""

    if (percentDay>=0 && percentDay <= 100) {
        console.log("Percent of day"+ percentDay + "%")
        progressBarPosition = percentDay+"%"
        timeOfDay = "day"
    } 
    else if (percentNight >= 0 || percentNight <= 100){
        console.log("Percent of night "+ percentNight + "%")
        progressBarPosition = percentNight+"%"
        timeOfDay = "night"
    }

    const sunriseSunset = <><p>{"Wschód: " + appRise.substr(11,5)}</p><p>{"Zachód: " + appSet.substr(11,5)}</p></>
    const sunsetSunrise = <><p>{"Zachód: " + appSet.substr(11,5)}</p><p>{"Wschód: " + appRise.substr(11,5)}</p></>

    return(
        <>
        <div className="east-west">
            {timeOfDay === "day" ? sunriseSunset : sunsetSunrise }      
        </div>
        <div className="progress-bar">
            <div style={{ width: progressBarPosition }}  className="progress"></div>
        </div>
        </>
    )
}

const InfoDay = (props) => {
    const windSpeed = props.hourlyTab[0].Wind.Speed.Value
    const uvIndex = props.hourlyTab[0].UVIndex
    const humidity = props.hourlyTab[0].RelativeHumidity
    const realFeelTemperature = Math.floor(props.hourlyTab[0].RealFeelTemperature.Value)

    return ( 
        <React.Fragment>
            <div className="info-day">
                    {<DayNight actuallyTime={props.actuallyTime} hourlyData={props.hourlyTab} dailyData={props.dailyTab}/>}  
                <table>
                    <tbody>
                        <tr>
                            <td className="icon">{windIcon}</td><td className="title">Wiatr</td><td>{windSpeed} km/h</td>
                        </tr>
                        <tr>
                            <td className="icon">{dropIcon}</td><td className="title">Wilgotność</td><td>{humidity} %</td>
                        </tr>
                        <tr>
                            <td className="icon">{realFellTempIcon}</td><td className="title">Odczuwalna</td><td>{realFeelTemperature} °C</td>
                        </tr>
                        <tr>
                            <td className="icon">{uvIcon}</td><td className="title">Index UV</td><td>{uvIndex}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
     );
}
 
export default InfoDay;
