import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';

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

    buttonRandomCharToggle = () => {
        if (this.state.error) {
            return <ErrorMessage />
        }

        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }
    render() {
        const char = this.state.showRandomChar ? <RandomChar /> : null

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
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};