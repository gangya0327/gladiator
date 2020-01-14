import React, { Component } from 'react';
import axios from "axios"
import * as Utils from '../utils/Utils'
import './DetailFlight.css'
import flight_arrow from '../asserts/flight_search_list_normal.svg'
import baseUrl from "./config";

class DetailFlight extends Component {
    constructor() {
        super()
        this.state = {
            detail: '',
            showRules: false
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
        const url = baseUrl + "mapi/wx/order/detail/flight/" + openId + "/" + orderNumber
        axios.get(url).then((res) => {
            this.setState({
                detail: res.data
            })
            console.log(res.data)
        }).catch((err) => {
            alert("页面显示失败")
        })
    }
    handleShowRules() {
        this.setState({
            showRules: true
        })
    }
    handleHideRules() {
        this.setState({
            showRules: false
        })
    }
    orderDetail() {
        let data = this.state.detail
        return (
            <div className='order-flight'>
                <div className='order-title'>订单详情</div>
                <div className='order-header'>
                    <div className='order-header-container'>
                        <div className='order-header-body'>
                            <div>
                                <div className='flight-name-date'>{data.airlineShortName}{data.flightNumber}</div>
                                <div className='flight-time'>{Utils.getTime(data.departureTime)}</div>
                                <div className='flight-port'>{data.departureAirportName}</div>
                            </div>
                            <div className='flight-arrow'>
                                <img src={flight_arrow} alt="" />
                                <div>{Utils.getTimeDuration(data.departureTime, data.destinationTime)}</div>
                                <div>{data.planeType} {data.seatClassName}</div>
                            </div>
                            <div>
                                <div className='flight-name-date'>{Utils.getFlightDate(data.flightDate)}</div>
                                <div className='flight-time'>{Utils.getTime(data.destinationTime)}</div>
                                <div className='flight-port'>{data.destinationAirportName}</div>
                            </div>
                        </div>
                        <div className='flight-rule' onClick={this.handleShowRules.bind(this)}>查看退改签规则</div>
                    </div>
                </div>
                <div className='order-status-container'>
                    <div className='order-status-body'>
                        <div className='order-status-info'>
                            <div className='order-status'>{Utils.showOrderStatusFlight(data.orderStatus)}</div>
                            <div>订单号： {data.orderNumber}</div>
                            <div>预订时间：{Utils.getFullTime(data.createTime)}</div>
                        </div>
                        <div>
                            <div className='order-pay'>￥{data.orderPay}</div>
                        </div>
                    </div>
                </div>
                <div className='order-passengers-container'>
                    <div className='order-passengers'>
                        <div className='list-title'>乘机人</div>
                        <div className='list-passengers' dangerouslySetInnerHTML={{ __html: data.passengers ? Utils.showPassengersFlight(data.passengers) : '' }}></div>
                    </div>
                </div>
                <div className='order-contact-container'>
                    <div className='order-contact'>
                        <div className='list-title'>联系人</div>
                        <div className='list-passengers'>
                            <div className='contact-name'>{data.contact ? data.contact.name : ""}</div>
                            <div className='contact-phone'>{data.contact ? data.contact.phone : ""}</div>
                        </div>
                    </div>
                </div>
                <div className='order-insurances-container'>
                    <div className='list-passengers' dangerouslySetInnerHTML={{ __html: (data.insurances) ? Utils.showInsurancesFlight(data.insurances) : '' }}></div>
                </div>
                <div className='cost-center-container'>
                    <div className='cost-center'>
                        <div className='cost-title'>成本中心</div>
                        <div className='cost-name'>{data.costCenterName}</div>
                    </div>
                </div>
                <div className='app-download'>下载飞巴APP，享受优质出行体验 <a href='http://link.weigongju.org/20805369'>立即下载</a></div>
                {this.state.showRules ?
                    <div className='showRules' onClick={this.handleHideRules.bind(this)}>
                        <div className='shadow0'></div>
                        <div className='rule-body'>
                            <div className='rule-title'>退改签规则</div>
                            <div>退改签说明</div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>舱位</td>
                                        <td>{data.seatClassName}</td>
                                    </tr>
                                    <tr>
                                        <td>退票条件</td>
                                        <td>{data.rule ? data.rule.refundPolicy : ""}</td>
                                    </tr>
                                    <tr>
                                        <td>更改条件</td>
                                        <td>{data.rule ? data.rule.changePolicy : ""}</td>
                                    </tr>
                                    <tr>
                                        <td>签转</td>
                                        <td>{data.rule ? data.rule.signPolicy : ""}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className='rule-warning'>*退改信息仅供参考，以航空公司最新政策为准，具体资费请咨询代理人</div>
                        </div>
                    </div>
                    : null}
            </div>
        )
    }
    render() {
        return this.orderDetail()
    }
}

export default DetailFlight