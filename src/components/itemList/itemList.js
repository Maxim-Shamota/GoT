import React, { Component } from 'react';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';

const ItemListBlock = styled.ul`
    border-radius: 5px;
    li {
        cursor: pointer;
    }
`

export default class ItemList extends Component {

    state = {
        itemList: null,
        error: false
    }

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({
                    itemList,
                    error: false
                })
            })
            .catch(() => { this.onError() });
    }

    componentDidCatch(){
        this.setState({
            itemList: null,
            error: true
        })
    }

    onError(status){
        this.setState({
            itemList: null,
            error: true
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id, name} = item;
            const label = this.props.renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => this.props.onItemSelected(id)}
                >
                    {label}
                </li>
            )
        })
    }

    render() {

        const { itemList, error } = this.state;
        
        if (error) {
            return <ErrorMessage />
        }

        if (!itemList) {
            return <Spinner />;
        }

        const items = this.renderItems(itemList);

        return (
            <ItemListBlock>
                {items}
            </ItemListBlock>
        );
    }
}