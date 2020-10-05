import React, { Component } from "react"
import styled from "styled-components"
import { getInfoDay, getInfoMonth } from "./WeatherDate"
import HourlyWeather from "./HourlyWeather"

const StyledWeather = styled.span`
    width: 100%;

    display:flex;

    background: linear-gradient(180deg,rgba(0,0,0,.05),rgba(255,255,255));
`

const StyledToday = styled.div`
    width: 40%;

    border-right: 1px solid rgba(210,214,220);

    display: flex;
    flex-direction: column;
`

const StyledWeek = styled.ul`
    width: 60%;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledTitle = styled.div`
    padding: 20px 0;

    background: linear-gradient(
        40deg,
        rgba(29,141,242,.8),
        rgba(29,141,242,.6)
    );
`

const StyledDate = styled.span`
    margin-left: 50px;

    display: flex;
    align-items: flex-end;
`

const StyledHeading1 = styled.h1`
    margin: 0;
`

const StyledHeading2 = styled.h2`
    margin: 0 0 0 50px;

    font-decoration: oblique;    

    ${props => props.day && `
        margin: 0 0 0 20px;

        text-transform: capitalize;
    `}
`

const StyledParagraph = styled.p`
    margin:0 0 15px 15px;

    font-size: 0.8rem;
    font-weight: 800;
    text-transform: Capitalize;
`

const StyledInfo = styled.span`
    margin: 0;
    padding: 50px 0;

    display: flex;
`

const StyledInfoDivided = styled.div`
    width: 30%;
    margin: 0 0 0 50px;
    padding: 0;

    display: flex;
    flex-direction: column;
`

const StyledInfoParagraph = styled.p`
    font-weight: 600;

    ${props => props.day && `
        margin: 0 0 0 20px;
    `}
`

const StyledInfoSpan = styled.span`
    margin-left: 5px;

    color: rgba(29,161,242);
`

const StyledDay = styled.li`
    width:80%;
    height:14.2%;
    padding-bottom: 15px;

    display: flex;
    align-items: flex-end;

    border-bottom: 1px solid rgba(210,214,220);
`

class Weather extends Component {
    
    state = {
        cityPosted: "",
        weather: {},
    }

    componentDidMount(){
        fetch(`https://api.openweathermap.org/data/2.5/onecall?` + 
            `lat=${this.props.cityLat}&` +
            `lon=${this.props.cityLon}&` +
            `exclude=minute&` +
            `units=metric&` +
            `appid=${process.env.REACT_APP_API_KEY}`
        )
        .then(resolve => resolve.json())
        .then(data => {
            this.setState({
                weather:data,
                cityPosted:this.props.citySubmitted
            })
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.cityLon !== this.props.cityLon || prevProps.cityLat !== this.props.cityLat ){
            fetch(`https://api.openweathermap.org/data/2.5/onecall?` + 
            `lat=${this.props.cityLat}&` +
            `lon=${this.props.cityLon}&` +
            `exclude=minute&` +
            `units=metric&` +
            `appid=${process.env.REACT_APP_API_KEY}`
            )
            .then(resolve => resolve.json())
            .then(data => {
                this.setState({
                    weather:data,
                    cityPosted:this.props.citySubmitted
                })
            })
        }
    }

    render() {
        return (
            <>
                {this.state.cityPosted !== "" && 
                    <StyledWeather>
                        <StyledToday>
                            <StyledTitle>
                                <StyledDate>
                                    <StyledHeading1>Today</StyledHeading1>
                                        <StyledParagraph>
                                            {`${getInfoDay(0).name}, ${getInfoDay(0).number}.${getInfoMonth()}`}
                                        </StyledParagraph>
                                </StyledDate>
                                <StyledHeading2>{`${this.state.cityPosted} ${Math.floor(this.state.weather.current.temp)}°C`}</StyledHeading2>
                            </StyledTitle> 
                            <StyledInfo>
                                <StyledInfoDivided>
                                    <StyledInfoParagraph>
                                        Feels like:&nbsp;
                                        <StyledInfoSpan>
                                            {`${Math.floor(this.state.weather.current.feels_like)}°C`}
                                        </StyledInfoSpan>
                                    </StyledInfoParagraph>
                                    <StyledInfoParagraph>
                                        Humidity:&nbsp;
                                        <StyledInfoSpan>
                                            {`${this.state.weather.current.humidity}%`}
                                        </StyledInfoSpan>
                                    </StyledInfoParagraph>
                                    <StyledInfoParagraph>
                                        UV:&nbsp;
                                        <StyledInfoSpan>
                                            {Math.floor(this.state.weather.current.uvi)}
                                        </StyledInfoSpan>
                                    </StyledInfoParagraph>
                                    <StyledInfoParagraph>
                                        Wind speed:&nbsp;
                                        <StyledInfoSpan>
                                            {`${Math.floor(this.state.weather.current.wind_speed)}m/s`}
                                        </StyledInfoSpan>
                                    </StyledInfoParagraph>
                                </StyledInfoDivided>
                                <StyledInfoDivided>
                                    <StyledInfoParagraph>
                                        Dew point:&nbsp;
                                        <StyledInfoSpan>
                                            {`${Math.floor(this.state.weather.current.dew_point)}°C`}
                                        </StyledInfoSpan>
                                    </StyledInfoParagraph>
                                    <StyledInfoParagraph>
                                        Pressure:&nbsp;
                                        <StyledInfoSpan>
                                            {`${this.state.weather.current.pressure}hPa`}
                                        </StyledInfoSpan>
                                    </StyledInfoParagraph>
                                    <StyledInfoParagraph>
                                        Visibility:&nbsp;
                                        <StyledInfoSpan>
                                            {`${Math.floor(this.state.weather.current.visibility/1000)}km`}
                                        </StyledInfoSpan>
                                    </StyledInfoParagraph>
                                    <StyledInfoParagraph>
                                        Weather:&nbsp;
                                        <StyledInfoSpan>
                                            {this.state.weather.current.weather[0].description}
                                        </StyledInfoSpan>
                                    </StyledInfoParagraph>
                                </StyledInfoDivided>
                            </StyledInfo>
                            <HourlyWeather data={this.state.weather.hourly} />
                        </StyledToday>
                        <StyledWeek>
                            {this.state.weather.daily
                            .filter((event,index) => index !== 0)
                            .map((data,index) => {
                                const infoDay = getInfoDay(index + 1)

                                return (
                                    <StyledDay key={data.dt}>
                                        <StyledHeading2 day>{infoDay.name}</StyledHeading2>
                                        <StyledInfoParagraph day>
                                            Weather:
                                            <StyledInfoSpan>
                                                {data.weather[0].description}
                                            </StyledInfoSpan>
                                        </StyledInfoParagraph>
                                        <StyledInfoParagraph day>
                                            Temperature:
                                            <StyledInfoSpan>
                                                {`${Math.floor(data.temp.max)}/${Math.floor(data.temp.min)}°C`}
                                            </StyledInfoSpan>
                                        </StyledInfoParagraph>
                                        <StyledInfoParagraph day>
                                            Wind:
                                            <StyledInfoSpan>
                                                {`${Math.floor(data.wind_speed)}m/s`}
                                            </StyledInfoSpan>
                                        </StyledInfoParagraph>
                                    </StyledDay>
                                )
                            })}
                        </StyledWeek>
                    </StyledWeather>
                }
            </>
        )
    }
}

export default Weather