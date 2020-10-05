import React, { Component } from "react"
import styled from "styled-components"

const StyledHeader = styled.header`
    width: 100%;
    height: 50px;
    
    display: flex;
    align-items: center;
    justify-content: flex-end;

    border-bottom: 1px solid rgba(210,214,220);
`

const StyledParagraph = styled.p`
    margin-right: 15px;

    color: rgba(29,161,242);
    font-style: italic;
`

class Header extends Component {
    
    render() {
        return (
            <StyledHeader>
                <StyledParagraph>
                    Hanisku dlužíš mi pětikilo..
                </StyledParagraph>
            </StyledHeader>
        )    
    }
}

export default Header