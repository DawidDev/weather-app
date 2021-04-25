import React from 'react';

import wind from '../images/icons/wind.png'

const windIcon = <img src={wind} alt=""/>

const BodyTableData = (props) => {

    const tr = props.dailyTab.DailyForecasts.map(item => {
        const data = item.Date
        const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
        const year = data.substr(0,4)*1
        const month = data.substr(5,2)*1
        const day = (data.substr(8,2)*1)-3 // Because we have weather for next 4 days (5 with today)
        const dayNumber = new Date(year, month, day).getDay()

        const tempDay = Math.round(item.Temperature.Maximum.Value)
        const tempNight = Math.round(item.Temperature.Minimum.Value)

        const iconDayNumber = item.Day.Icon
        const iconDay = <img src={props.objectIcons[iconDayNumber]} alt=""/>
        const iconNightNumber = item.Night.Icon
        const iconNight = <img src={props.objectIcons[iconNightNumber]} alt=""/>

        const dayWind = Math.round(item.Day.Wind.Speed.Value)

        return(
            <tr key={item.Date}>
                <td className="day">{days[dayNumber]}</td>
                <td className="icon">{windIcon} </td>
                <td className="wind">{dayWind} km/h</td>
                <td className="weather-icon">{iconDay}{iconNight}</td>
                <td className="temperature">{tempDay + "/" + tempNight}°</td>
            </tr>
        )
    })
    return(
        <>
        {tr}
        </>
    )
}

const InfoWeek = (props) => {
    return ( 
        <React.Fragment>
            <div className="info-week">
                <table>
                    <tbody>
                        {<BodyTableData objectIcons={props.objectIcons} dailyTab={props.dailyTab}/>}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
     );
}
 
export default InfoWeek