export const getFlightDate = (timestamp) => {
    if (timestamp) {
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        let date = new Date(timestamp)
        return (date.getMonth() + 1) + "月" + date.getDate() + "日 周" + Week[date.getDay()]
    }
}
export const getHotelDate = (timestamp) => {
    if (timestamp) {
        let date = new Date(timestamp)
        return (date.getMonth() + 1) + "月" + date.getDate() + "日"
    }
}
export const getTime = (timestamp) => {
    if (timestamp) {
        let date = new Date(timestamp)
        return (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ":" + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes())
    }
}
export const getTimeDuration = (departureTime, destinationTime) => {
    if (departureTime && destinationTime) {
        const duration = destinationTime - departureTime
        const durationMin = duration / 1000 / 60
        return (durationMin / 60 > 0 ? parseInt(durationMin / 60, 10) + 'h' : '') + parseInt(durationMin % 60, 10) + 'm'
    }
}
export const getTimeDuration1 = (departureTime, destinationTime) => {
    if (departureTime && destinationTime) {
        const duration = destinationTime - departureTime
        const durationMin = duration / 1000 / 60
        return (durationMin / 60 > 0 ? parseInt(durationMin / 60, 10) + '小时' : '') + parseInt(durationMin % 60, 10) + '分钟'
    }
}
export const showOrderStatusFlight = (orderStatus) => {
    var showStatus = ['待支付', '出票失败', '退改签', '已完成', '已取消', '已占座', '已支付，出票中', '需外采待回录',
        '需要补款', '已补款待出票', '外采出票中', '外采出票失败', '外采退票中', '外采退票失败', '退票成功',
        '政采待确认', '政采已预定', '出票成功，提取票号中', '外采改签待确认', '改签中', '外采改签失败',
        '外采改签成功', 'B2B出票中', 'B2B出票失败']
    return showStatus[orderStatus]
}
export const showOrderStatusTrain = (orderStatus) => {
    var showStatus = ['待付款', '已支付', '已取消', '出票中', '已完成', '出票失败', '改签中', '已改签',
        '退票中', '已退票', '部分退改', '退改失败', '部分出票', '退改中', '导入的订单']
    return showStatus[orderStatus]
}
export const getFullTime = (timestamp) => {
    if (timestamp) {
        let date = new Date(timestamp)
        let year = date.getFullYear()
        let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
        let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        let hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
        let minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
        let time = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
        return time
    }
}
export const showPassengersFlight = (passengers) => {
    let html = ''
    const idType = [" ", "身份证", "护照", "军人证", "港澳通行证", "其他"]
    const ticketType = ["已预订", "已出票", "已退票", "已改签", "已签转", "已作废", "退票中", "已取消", "改签中", "已退票", "退票失败", "改签失败", "取消退票", "取消改签"]
    passengers.map((item, key) => {
        if (item.idcardType > 4) {
            item.idcardType = 5
        }
        html += "<div class='item'>"
        html += "<div class='passenger'>"
        html += "<div class='passenger-name'>" + item.name + "</div>"
        html += "<div class='passenger-idcard'>" + idType[item.idcardType] + " " + item.idcardCode + "</div>"
        html += "</div>"
        html += "<div class='passenger-ticketStatus'>" + ticketType[item.ticketStatus] + "</div>"
        html += "</div>"
        return true
    })
    return html
}
export const showPassengersTrain = (passengers) => {
    let html = ''
    const ticketType = ["已预订", "已出票", "申请退票", "已退票", "申请改签", "已改签", "出票失败", "退改失败"]
    passengers.map((item, key) => {
        if (item.idcardType > 4) {
            item.idcardType = 5
        }
        html += "<div class='item'>"
        html += "<div class='passenger'>"
        html += "<div class='passenger-name'>" + item.name + ""
        html += "<div class='passenger-ticketStatus'>" + ticketType[item.status] + "</div></div>"
        html += "<div class='passenger-idcard'>" + item.idcardType + " " + (item.idcardCode ? item.idcardCode : " ") + "</div>"
        if (item.status !== 6) {
            if (item.changeDepict != null) {
                html += "<div class='passenger-carriage line-through'>" + item.carriageNumber + "车厢 " + item.seatNumber + "</div>"
            } else {
                html += "<div class='passenger-carriage'>" + item.carriageNumber + "车厢 " + item.seatNumber + "</div>"
            }
            html += "<div class='passenger-railwayOrderNumber'>取票号 " + item.railwayOrderNumber + "</div>"
        }
        if (item.changeDepict != null) {
            html += "<div class='passenger-change'>" + item.changeDepict + "</div>"
            html += "<div class='passenger-changeInfo'>" + item.changeCarriageNumber + " " + item.changeSeatNumber + " " + item.changeSeatType + " ￥" + item.changeOrderPrice + "</div>"
        }
        html += "</div>"
        html += "</div>"
        return true
    })
    return html
}
export const showPassengersHotel = (customers) => {
    let html = ''
    if (customers.length > 0) {
        customers.map((item, key) => {
            html += "<div class='customer-item'>" + item.name + "</div>"
            return true
        })
    }
    return html
}
export const showInsurancesFlight = (insurances) => {
    let html = ''
    if (insurances.length > 0) {
        html += "<div class='order-insurances'>"
        html += "<div class='list-title'>保险</div>"
        html += "<div class='list-info'>"
        insurances.map((item, key) => {
            html += "<div class='insurance-item'>" + item.insuranceName + " ￥" + item.totalPrice + "x1份 </div>"
            return true
        })
        html += "</div></div>"
    }
    return html
}