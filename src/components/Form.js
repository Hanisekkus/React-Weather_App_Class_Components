import React, { Component } from "react"
import styled from "styled-components"

const StyledForm = styled.form`
    width: 100%;
    padding: 100px 0;

    display: flex;
    
    border-bottom: 1px solid rgba(210,214,220);
    background: linear-gradient(
        60deg,
        rgba(0,0,0,0),
        rgba(0,0,0,0) 59.9%,
        rgba(29,161,242,.6) 60%,
        rgba(29,161,242,.8) 100%
    );
`

const StyledIntroduction = styled.div`
    width: 60%;
    margin-left: 200px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;    
`

const StyledHeading1 = styled.h1`
    margin: 0;
    color: rgba(29,161,242);
`

const StyledHeading2 = styled.h2`
    ${props => props.info &&`
        font-style: oblique;
    `}
    ${props => props.city &&`
        margin-top: 0;
        margin-bottom: 35px;
        font-weight: 500;
    `}
    ${props => props.error &&`
        margin-top: 0;
        font-weight: 500;
        color: rgba(29,161,242);
    `}  
`

const StyledLabel = styled.label`
    color: rgba(29,161,242);
`

const StyledInputInfo = styled.div`
    width: 40%;

    display: flex;
    justify-content: center;
`

const StyledBorderTrickPart1 = styled.div`
    padding: 20px 0;

    background-color: rgba(255,255,255);
    border: solid rgba(255,255,255);
    border-width: 20px 0;
    border-radius: 50px;
    box-shadow: 0px 1px 2px 2px rgba(0,0,0,.2);
`

const StyledBorderTrickPart2 = styled.div`
    border: solid rgba(0,0,0,.5);
    border-width: 3px 0; 
    border-radius: 35px;
`

const StyledSearch = styled.div`
    padding: 40px 0;

    border-radius: 20px;
    background-color: rgba(255,255,255);
    
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
`

const StyledInput = styled.input`
    width: 70%;

    :focus{
        border: 2px solid rgba(29,161,242);
    }
`

const StyledButton = styled.button`
    margin-top:20px;

    :hover{
        color:rgba(29,161,242);
    }
`

class Form extends Component {

    componentDidMount(){
        this.inputRef.focus()
    }
    render() {

        return (
            <StyledForm
                id="mainForm"
                onSubmit={this.props.handleSubmit}
            >
                <StyledIntroduction>
                    <StyledHeading1>What weather is?</StyledHeading1>
                    <StyledHeading2 info>
                        ...Don´t look outside, simply&nbsp;
                        <StyledLabel htmlFor="cityInput">
                            search
                        </StyledLabel>
                        &nbsp;for it!
                    </StyledHeading2>
                </StyledIntroduction>
                <StyledInputInfo>
                    <StyledBorderTrickPart1>
                        <StyledBorderTrickPart2>
                            <StyledSearch>
                                <StyledHeading2 city>Write your info:</StyledHeading2>
                                {!this.props.cityValidation&&
                                    <StyledHeading2 error>
                                        I feel misspeling!
                                    </StyledHeading2>
                                }
                                <StyledInput
                                    id="cityInput"
                                    name="cityInput"
                                    type="text"
                                    placeholder="Your city"
                                    ref={input => this.inputRef = input}
                                    value={this.props.cityInput}
                                    onChange={this.props.handleChange}
                                />
                                <StyledButton type="submit">
                                    Submit
                                </StyledButton>
                            </StyledSearch>
                        </StyledBorderTrickPart2>
                    </StyledBorderTrickPart1>
                </StyledInputInfo>
            </StyledForm>
        )
    }
}

export default Form