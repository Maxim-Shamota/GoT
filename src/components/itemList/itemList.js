import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import Spinner from '../spinner';
import PropTypes from 'prop-types';

const ItemListLi = styled.li`
    /* overflow-x: hidden; */
    /* background: url('fon.jpg'); */
    /* background-size: cover; */
    /* background-color: red; */
`

const ItemListBlock = styled.ul`
    border-radius: 5px;
    li {
        cursor: pointer;
    }
`

function ItemList({ getData, onItemSelected, renderItem }) {

    const [itemList, updateList] = useState([]);

    useEffect(() => {
        getData()
            .then((data) => {
                updateList(data);
            })
    }, [])

    function renderItems(arr) {
        return arr.map((item) => {
            const { id } = item;
            const label = renderItem(item);
            return (
                <ItemListLi
                    key={id}
                    className="list-group-item"
                    onClick={() => onItemSelected(id)}
                >
                    {label}
                </ItemListLi>
            )
        })
    }

    if (!itemList) {
        return <Spinner />;
    }

    const items = renderItems(itemList);

    return (
        <ItemListBlock>
            {items}
        </ItemListBlock>
    );
}

export default ItemList;