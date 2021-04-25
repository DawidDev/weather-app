import React from 'react';
import InfoDay from './InfoDay'
import InfoWeek from './InfoWeek'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

// Import icons
import icon1 from '../images/icons/1.png'
import icon2 from '../images/icons/2.png'
import icon3 from '../images/icons/3.png'
import icon4 from '../images/icons/4.png'
import icon5 from '../images/icons/5.png'
import icon6 from '../images/icons/6.png'
import icon7 from '../images/icons/7.png'
import icon8 from '../images/icons/8.png'
import icon10 from '../images/icons/11.png'
import icon11 from '../images/icons/11.png'
import icon12 from '../images/icons/12.png'
import icon13 from '../images/icons/13.png'
import icon14 from '../images/icons/14.png'
import icon15 from '../images/icons/15.png'
import icon16 from '../images/icons/16.png'
import icon17 from '../images/icons/17.png'
import icon18 from '../images/icons/18.png'
import icon19 from '../images/icons/19.png'
import icon20 from '../images/icons/20.png'
import icon21 from '../images/icons/21.png'
import icon22 from '../images/icons/22.png'
import icon23 from '../images/icons/23.png'
import icon24 from '../images/icons/24.png'
import icon25 from '../images/icons/25.png'
import icon26 from '../images/icons/26.png'
import icon29 from '../images/icons/29.png'
import icon30 from '../images/icons/30.png'
import icon31 from '../images/icons/31.png'
import icon32 from '../images/icons/32.png'
import icon33 from '../images/icons/33.png'
import icon34 from '../images/icons/34.png'
import icon35 from '../images/icons/35.png'
import icon36 from '../images/icons/36.png'
import icon37 from '../images/icons/37.png'
import icon38 from '../images/icons/38.png'
import icon39 from '../images/icons/39.png'
import icon40 from '../images/icons/40.png'
import icon41 from '../images/icons/41.png'
import icon42 from '../images/icons/42.png'
import icon43 from '../images/icons/43.png'
import icon44 from '../images/icons/44.png'


const objectIcons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, "null", icon10, 
    icon11, icon12, icon13, icon14, icon15, icon16, icon17, icon18, icon19, icon20, 
    icon21, icon22, icon23, icon24, icon25, icon26, "brak", "brak", icon29, icon30, 
    icon31, icon32, icon33, icon34, icon35, icon36, icon37, icon38, icon39, 
    icon40, icon41, icon42, icon43, icon44]

const DataBoxes = (props) => {
    const weatherPerHour = props.tab.map(item => (
        <SwiperSlide key={item.dateTime}>
            <div className="box-data">
                <p className="box-hour">{item.dateTime.substr(11,5)}</p>
                <div className="box-icon"><img src={objectIcons[item.weatherIcon-1]} alt="icon"/></div>
                <p className="box-temperature">{Math.round(item.temperature)}°</p>
            </div>
        </SwiperSlide>
    ))
    return(
        <Swiper className="swiper" spaceBetween={5} slidesPerView={5} navigation pagination={{ clickable: true }} scrollbar={{ draggable: true }}>
            {weatherPerHour}
        </Swiper>
    )
}

const ShowWeather = (props) => {
    //console.log("Render ShowWeather")
    const dailyData = props.dailyData
    const hourlyData = props.hourlyData
    const nameCity = props.cityData[0].EnglishName

    // Tworzenie tablicy do użycia w komponencie dataBoxes
    const tabHourlyTemp = hourlyData.map(item => (
            {
                temperature: item.Temperature.Value,
                dateTime: item.DateTime,
                weatherIcon: item.WeatherIcon,
            }
    ))

    const tempNow = props.hourlyData[0].Temperature.Value
    const mainIconNumber = hourlyData[0].WeatherIcon;

    const numberDay = new Date().getDay()
    const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    const today = days[numberDay]

    // Pobieranie zmiennej zawierającej lokalny czas

    const d = new Date()
    const localTime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60 * 1000;
    const utc = localTime + localOffset;
    const dateString = props.hourlyData[0].DateTime;
    
    const symbol = dateString.substr(19,1) === "+" ? 1 : -1;
    const offsetValue = dateString.substr(20,2) * symbol;

    const cityTime = utc + (3600 * 1000 * offsetValue);

    const nd = new Date(cityTime);
    const hour = nd.getHours();
    const minutes = nd.getMinutes() <= 9 ? "0" + nd.getMinutes() : nd.getMinutes() 
    const cityTime_String = hour + ":" + minutes

    return ( 
        <React.Fragment>
            <div className="weather">
                <div className="result-1">
                    <p className="time">{today}<br/>{cityTime_String}</p>
                    <p className="temperature">{Math.round(tempNow)}°</p>
                    <div className="icon-weather"><img src={objectIcons[mainIconNumber-1]} alt="icon"/></div>
                </div>
                <h2>{nameCity}</h2>
                <hr></hr>        
                <DataBoxes tab={tabHourlyTemp}/>
                <div className="weather-info">
                    <InfoDay actuallyTime={nd} dailyTab={dailyData} hourlyTab={hourlyData}/>
                    <InfoWeek dailyTab={dailyData} objectIcons={objectIcons}/> 
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default ShowWeather
