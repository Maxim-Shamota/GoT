import React, { Component } from 'react';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const ItemDetailsBlock = styled.div`
    border-radius: 5px;
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`
const SelectError = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`
const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    )
}
export {Field};

export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        item: null
    }

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    }

    // onCharDetailsLoaded = (item) => {
    //     this.setState({
    //         item,
    //         loading: false
    //     })
    // }

    updateItem() {
        const { itemId, getData } = this.props;

        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({item})
            })
    }

    // onError() {
    //     this.setState({
    //         item: null,
    //         error: true
    //     })
    // }

    render() {

        if (!this.state.item && this.state.error) {
            return <ErrorMessage />
        } else if (!this.state.item) {
            return <SelectError>Please, select item in the list</SelectError>
        }

        const { item } = this.state;
        const { name } = item;

        if (this.state.loading) {
            return (
                <ItemDetailsBlock>
                    <Spinner />
                </ItemDetailsBlock>
            )
        }

        return (
            <ItemDetailsBlock>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, {item})
                    })}
                </ul>
            </ItemDetailsBlock>
        );
    }
}