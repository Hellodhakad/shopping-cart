import React, { Component } from 'react';
import * as _ from 'lodash';
import './CheckOut.css';

import { jsonData } from '../../JSON/data';

class CheckOut extends Component {
    state = {
        itemsData: jsonData,
    }

    componentDidMount() {
        let itemsData = jsonData.map(obj => ({ ...obj, qty: 1 }))
        let localItemsData = JSON.parse(localStorage.getItem('items'));

        if (localItemsData && localItemsData.length > 0) {
            itemsData = localItemsData
        }
        this.setState({
            itemsData: itemsData
        })

    }

    quantity = (type, index, id) => {
        let itemsData = _.cloneDeep(this.state.itemsData)

        if (type == 'inc') {
            itemsData[index].qty = itemsData[index].qty + 1
        } else if (type == 'dec') {
            itemsData[index].qty = itemsData[index].qty - 1 > 0 ? itemsData[index].qty - 1 : 1
        } else if (type == 'del') {
            itemsData.splice(index, 1)
        }

        this.setState({
            itemsData: itemsData
        })
        itemsData = JSON.stringify(itemsData)
        localStorage.setItem('items', itemsData)
    }

    renderItems = () => {
        let itemsData = this.state.itemsData;

        let ItemsColumn = itemsData && itemsData.length > 0 && itemsData.map((item, index) => {
            return <>
                <li>
                    <div class="item">
                        <div class="item-list">
                            <div class="img">
                                <figure>
                                    <img src={item.img_url} alt="" />
                                </figure>
                                <strong>{item.name}</strong>
                            </div>
                            <div class="delete" onClick={() => this.quantity('del', index, item.id)}>
                                <span>&times;</span>
                            </div>
                        </div>
                    </div>
                    <div class="quantity">
                        <span class="decrease" onClick={() => this.quantity('dec', index, item.id)}>-</span>
                        <div class="count">
                            <span>{item.qty}</span>
                        </div>
                        <span class="increase" onClick={() => this.quantity('inc', index, item.id)}>+</span>
                    </div>
                    <div class="price">
                        <span>{`$${item.qty * item.price}`}</span>
                    </div>
                </li>
            </>
        })

        return <><div class="item-title">
            <div class="item">
                <strong>Items (7)</strong>
            </div>
            <div class="quantity">
                <span>Qty</span>
            </div>
            <div class="price">
                <span>Price</span>
            </div>
        </div>
            <ul>
                {ItemsColumn}
            </ul></>
    }

    renderTotal = () => {
        let total = 0, items = 0;
        this.state.itemsData.length > 0 && this.state.itemsData.map((value, i) => {
            total = value.qty * value.price + total
            items = value.qty + items
        })

        return <div class="order-detail">
            <h3>Total</h3>
            <ul>
                <li>
                    <span>Item ({items})</span>
                    <span><em>:</em> {`$${total}`}</span>
                </li>
                <li>
                    <span>Discount</span>
                    <span><em>:</em> NA</span>
                </li>
                <li>
                    <span>Type Discount</span>
                    <span><em>:</em> NA</span>
                </li>
            </ul>
            <div class="total">
                <strong>Order Total</strong>
                <span>{`$${total}`}</span>
            </div>
        </div>
    }

    render() {
        return (
            <>
                <div class="container">
                    <div class="title">
                        <h2>Order Summary</h2>
                    </div>
                    <div class="summary-wrap">
                        <div class="table-area">
                            {this.renderItems()}
                        </div>
                        {this.renderTotal()}
                    </div>
                </div>
            </>
        );
    }
}

export default CheckOut