import React, { Component } from "react"
import styled, { createGlobalStyle } from "styled-components"
import Header from "./Header"
import Form from "./Form"
import Weather from "./Weather"
import Footer from "./Footer"

const GlobalStyle = createGlobalStyle`
    html,body {
        width: 100%;
        height: fit-content;
        min-height: 100vh;
        margin:0;
        padding:0;

        font-family: sans-serif, Helvetica, Arial;
    }

    h1 {
        font-size: 4rem;
        letter-spacing: -0.05em;
        font-weight: 800;
    }

    h2 {
        font-size: 2rem;
        letter-spacing: -0.04em;
        font-weight: 600;
    }

    h3 {
        font-size: 1.5rem;
        letter-spacing: -0.03em;
        font-weight: 500;
    }

    p {
        font-size: 1rem;
        font-weight: 200;
    }

    label {
        text-decoration:underline;
        cursor:auto;
    }

    input {
        height: 30px;
        padding-left: 15px;    

        font-size: 1.3rem;

        border: 2px solid rgba(0,0,0);
        border-radius: 5px;

        :focus{
            outline:none;
        }

        ::placeholder{
            font-style: oblique;
            font-size: 1.3rem;
            color: rgba(0,0,0);
        }
    }

    button {
        padding: 7px 15px;

        font-size: 1.3rem;
        font-weight: 600;

        background-color:rgba(255,255,255);
        border: 2px solid rgba(0,0,0);
        border-radius: 5px;

        cursor: pointer;
        transition: .2s all;

        :focus{
            outline:none;
        }
    }
    
    ul {
        margin: 0;
        padding: 0;
    }


    #root {
        width: inherit;
        height: inherit;
        min-height: inherit;
        padding: inherit;
        margin: inherit;

        display:flex;
        flex-direction: column;
    }
`

const StyledMain = styled.main`
    width: 100%;
`

class App extends Component{

    state = {
        cityInput: "",
        citySubmitted: "",
        cityValidation: true,
        cityLat: 0,
        cityLon: 0,
        dataLoaded: false,
    }

    handleChange = event => {
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    handleSubmit = event => {
        event.preventDefault()
        this.setState( prevState => {return {citySubmitted: prevState.cityInput}})
    }

    componentDidUpdate(prevProps, prevState){
        if( this.state.citySubmitted !== prevState.citySubmitted ) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?` +
                `q=${this.state.citySubmitted}&` +
                `appid=${process.env.REACT_APP_API_KEY}`
            )
            .then(resolve => {
                if(resolve.ok)
                    return resolve.json()
                else
                    return Promise.reject()
            })
            .then(data => 
                this.setState({
                    cityValidation: true,
                    cityLat: data.coord.lat,
                    cityLon: data.coord.lon,
                    dataLoaded: true,
                })
            )
            .catch(() => this.setState({
                cityValidation: false,
            }))
        }
    }

    render() {
        return (
            <>
                <GlobalStyle/>
                <Header />
                <StyledMain>                
                    <Form
                        {...this.state}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                    />
                    {this.state.dataLoaded && <Weather {...this.state}/>}
                </StyledMain>
                <Footer />
            </>
        )
    }
}

export default App
