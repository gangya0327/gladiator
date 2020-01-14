import React, { Component } from 'react';
import axios from "axios"
import * as Utils from '../utils/Utils'
import './DetailHotel.css'
import location from '../asserts/location.png'
import baseUrl from "./config";

class DetailTrain extends Component {
    constructor() {
        super()
        this.state = {
            detail: ''
        }
    }
    componentDidMount() {
        const searchStr = window.location.search.split("?")[1]
        if (searchStr) {
            const searchArr = searchStr.split("&")
            const orderNumber = searchArr[0].split("=")[1]
            const openId = searchArr[1].split("=")[1]
            this.fetchDetail(orderNumber, openId)
        }
    }
    fetchDetail(orderNumber, openId) {
        const url = baseUrl + "mapi/wx/order/detail/hotel/" + openId + "/" + orderNumber
        axios.get(url).then((res) => {
            this.setState({
                detail: res.data
            })
            console.log(res.data)
        }).catch((err) => {
            alert("页面显示失败")
        })
    }
    orderDetail() {
        let data = this.state.detail
        return (
            <div className='order-hotel'>
                <div className='order-title'>订单详情</div>
                <div className='order-status-container'>
                    <div className='order-status-body'>
                        <div className='order-status-info'>
                            <div className='order-status'>{Utils.showOrderStatusTrain(data.orderStatus)}</div>
                            <div>订单号： {data.orderNumber}</div>
                            <div>预订时间：{Utils.getFullTime(data.createTime)}</div>
                        </div>
                        <div>
                            <div className='order-pay'>￥{data.totalPrice}</div>
                        </div>
                    </div>
                </div>
                <div className='order-header-container'>
                    <div className='order-header'>
                        <div className='hotel-name'>{data.hotelName}</div>
                        <div className='hotel-info'>{data.ratePlanName} | {data.roomCount}间 | {data.bedType} | 最多入住{data.capacity}人</div>
                        <div className='hotel-address'><img src={location} alt=''></img> {data.hotelAddress}</div>
                    </div>
                </div>
                <div className='order-time-container'>
                    <div className='order-time'>
                        <div className='check-time'>
                            <div>入住时间<div>{Utils.getHotelDate(data.arrivalDate)}</div></div>
                            <div>离店时间<div>{Utils.getHotelDate(data.departureDate)}</div> 共{data.duration}晚</div>
                        </div>
                        <div className='decline-arrive'>最晚到店{Utils.getHotelDate(data.latestArrivalTime)} {Utils.getTime(data.latestArrivalTime)}</div>
                    </div>
                </div>
                <div className='order-customers-container'>
                    <div className='order-customers'>
                        <div className='list-title'>入住人</div>
                        <div className='list-customers' dangerouslySetInnerHTML={{ __html: data.customers ? Utils.showPassengersHotel(data.customers) : '' }}></div>
                    </div>
                </div>
                <div className='order-contact-container'>
                    <div className='order-contact'>
                        <div className='list-title'>联系人</div>
                        <div className='list-passengers'>
                            <div className='contact-name'>{data.contactName ? data.contactName : ""}</div>
                            <div className='contact-phone'>{data.contactPhone ? data.contactPhone : ""}</div>
                        </div>
                    </div>
                </div>
                <div className='app-download'>下载飞巴APP，享受优质出行体验 <a href='http://link.weigongju.org/20805369'>立即下载</a></div>
            </div>
        )
    }
    render() {
        return this.orderDetail()
    }
}

export default DetailTrain