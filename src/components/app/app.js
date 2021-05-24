import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import { CharacterPage, BooksPage, HousesPage, BooksItem } from '../pages';
import gotService from '../../services/gotService';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

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
const H1Title = styled.h1`
    color: #fff;
`

export default class App extends Component {
    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false,
        selectedHouse: 20
    };

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    };


    render() {
        const char = this.state.showRandomChar ? <RandomChar /> : null;

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <Router>
                <>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                {char}
                                <ButtonCharToggle
                                    onClick={this.toggleRandomChar}>
                                    Toggle random char
                                </ButtonCharToggle>
                            </Col>
                        </Row>
                        <Route path='/' component={() => <H1Title>Welcome to GOT DB</H1Title>} exact />
                        <Route path='/characters' component={CharacterPage} />
                        <Route path='/books' component={BooksPage} exact />
                        <Route path='/books/:id' render={({ match }) => {
                            const { id } = match.params;
                            return <BooksItem bookId={id} />
                        }} />
                        <Route path='/houses' component={HousesPage} />
                    </Container>
                </>
            </Router>
        )
    }

};