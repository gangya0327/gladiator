import React, { Component } from 'react';
import axios from "axios"
import * as Utils from '../utils/Utils'
import './DetailTrain.css'
import flight_arrow from '../asserts/flight_search_list_normal.svg'
import baseUrl from "./config";

class DetailTrain extends Component {
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
        const url = baseUrl + "mapi/wx/order/detail/train/" + openId + "/" + orderNumber
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
            <div className='order-train'>
                <div className='order-title'>订单详情</div>
                <div className='order-header-container'>
                    <div className='order-header'>
                        <div className='from-train'>
                            <div className='train-station'>{data.fromStation}</div>
                            <div className='train-time'>{Utils.getTime(data.fromTime)}</div>
                            <div className='train-date'>{Utils.getFlightDate(data.fromTime)}</div>
                        </div>
                        <div className='train-arrow'>
                            <div className='train-number'>{data.trainNumber}</div>
                            <img src={flight_arrow} alt="" />
                            <div className='train-duration'>{Utils.getTimeDuration1(data.fromTime, data.toTime)}</div>
                        </div>
                        <div className='to-train'>
                            <div className='train-station'>{data.toStation}</div>
                            <div className='train-time'>{Utils.getTime(data.toTime)}</div>
                            <div className='train-date'>{Utils.getFlightDate(data.toTime)}</div>
                        </div>
                    </div>
                </div>
                <div className='train-rule' onClick={this.handleShowRules.bind(this)}>查看退改签规则</div>
                <div className='order-status-container'>
                    <div className='order-status-body'>
                        <div className='order-status-info'>
                            <div className='order-status'>{Utils.showOrderStatusTrain(data.orderStatus)}</div>
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
                        <div className='list-title'>乘车人</div>
                        <div className='list-passengers' dangerouslySetInnerHTML={{ __html: data.passengerList ? Utils.showPassengersTrain(data.passengerList) : '' }}></div>
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
                <div className='cost-center-container'>
                    <div className='cost-center'>
                        <div className='cost-title'>成本中心</div>
                        <div className='cost-name'>{data.costCenterName}</div>
                    </div>
                </div>
                <div className='app-download'>下载飞巴APP，享受优质出行体验 <a href='http://link.weigongju.org/20805369'>立即下载</a></div>
                {this.state.showRules ?
                    <div className='showRules' onClick={this.handleHideRules.bind(this)}>
                        <div className='rule-body'>
                            <div>退改签说明</div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>退票说明</td>
                                        <td>
                                            1. 代购成功，未取票且发车前时间大于30分钟，可进入订单列表，点击具体订单根据提示申请退票；发车前15天以内的退票，铁路局将对每张车票按梯次收取退票手续费。<br />
                                            2. 代购成功，已取票或发车前时间小于30分钟，需您自行携带购票时所使用的乘车人有效证件原件和火车票在发车前去火车站退票窗口办理退票。
                                    </td>
                                    </tr>
                                    <tr>
                                        <td>改签说明</td>
                                        <td>
                                            1. 未取纸质票，且离发车时间大于30分钟。<br />
                                            2. 开车前48小时以上，可改签预售期内的车次。开车前48小时以内，可改签至票面当天24:00之前任意车次，不办理票面日期次及以后的改签。<br />
                                            3. 新车票票价低于原车票的，退还差额。<br />
                                            4. 批量改签时，选择的新票座位席别必须一致，并且不能是卧铺。<br />
                                            5. 一张车票只能办理一次改签，改签后的新票不能再改签，但可退票。
                                    </td>
                                    </tr>
                                </tbody>
                            </table>
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

export default DetailTrain