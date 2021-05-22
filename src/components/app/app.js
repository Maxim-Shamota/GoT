import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage';

const ButtonCharToggle = styled.button`
    padding: 12px;
    background-color: #125c7f;
    border: none;
    border-radius: 4px;
    color: #fff;
    margin-bottom: 40px;
    outline: none;
    box-shadow: 0px 0px 30px rgba(256,256,256,.1);
    cursor: pointer;
    :focus {
        outline: none;
    }
`

export default class App extends Component {
    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    buttonRandomCharToggle = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }

    render() {
        
        const char = this.state.showRandomChar ? <RandomChar /> : null

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {char}
                            <ButtonCharToggle
                                onClick={this.buttonRandomCharToggle}>
                                toggle random char
                                </ButtonCharToggle>
                        </Col>
                    </Row>
                    <CharacterPage />
                </Container>
            </>
        );
    }
};