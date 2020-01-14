import React, { PureComponent } from 'react';
import wx from "weixin-js-sdk";
import axios from "axios";
import "./BindPage.css";
import logo from "../asserts/logo.png";
import succ_img from "../asserts/success.png";
import err_img from "../asserts/error.png";
import alert_img from "../asserts/alert.png";
import loading_fig from "../asserts/ajax-loader.gif";
import baseUrl from "./config";

class BindPage extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            myCode: "",
            myTmcId: "",
            code: "",
            tmcId: "",

            showLoading: true,  //显示loading
            showBind: false,    //显示绑定页面
            showUnbind: false,  //显示解绑页面
            showResult: false,  //显示结果页面
            showText: "",

            accountCode: "",    //绑定参数
            accountName: "",
            accountPassword: "",
            accountType: "tmc",
            openId: "",

            isVoid: false,
            validText: "发送验证码",
            accountPhone: "",
            validCode: "",
            validBtnClickable: true,

            bindBtnClickable: true,
            bindId: "",         //解绑参数
            userId: "",
            bindType: ""
        }
    }

    componentDidMount() {
        const searchStr = window.location.search.split("?")[1]
        if (searchStr) {
            const searchArr = searchStr.split("&")
            const code = searchArr[0].split("=")[1]
            const tmcId = searchArr[1].split("=")[1]
            this.setState({
                tmcId: tmcId,
                code: code
            })
            this.getIsBind(code, tmcId)
        }
    }

    getIsBind(code, tmcId) {
        const url = `${baseUrl}wx/push/auth/isBind?code=` + code + "&tmcId=" + tmcId
        axios.get(url).then((res) => {
            this.setState({
                showLoading: false,
                openId: res.data.openId,
                bindId: res.data.bindId,
                userId: res.data.userId,
                bindType: res.data.bindType,
                accountName: res.data.accountName
            })
            if (res.data.isBind) {    //0-未绑定，1-已绑定
                document.title = "解除绑定"
                this.setState({     //1 显示解绑页面，隐藏绑定页面
                    showUnbind: true
                })
            } else {
                document.title = "账号绑定"
                this.setState({     //0 显示绑定页面，隐藏解绑页面
                    showBind: true
                })
            }
        }).catch((err) => {
            alert("显示失败，请关闭页面重新打开")
        })
    }

    handleChangeAccountCode(event) {
        this.setState({ accountCode: event.target.value });
    }
    handleChangeAccountName(event) {
        this.setState({ accountName: event.target.value });
    }
    handleChangeAccountPassword(event) {
        this.setState({ accountPassword: event.target.value });
    }
    handleChangeAccountPhone(event) {
        this.setState({ accountPhone: event.target.value });
    }
    handleChangeAccountValid(event) {
        this.setState({ validCode: event.target.value });
    }

    changeType(event) {
        const val = event.target.value
        this.setState({ accountType: val, })
        if (val === "void") {
            this.setState({ isVoid: true })
        } else {
            this.setState({ isVoid: false })
        }
    }

    handleBind = () => {
        let bindUrl = "";
        let data = {};
        if (this.state.accountType === "tmc") {
            bindUrl = `${baseUrl}wx/push/tmc/bind`
            data = {
                tmcId: this.state.tmcId,
                tmcCode: this.state.accountCode,
                accountName: this.state.accountName,
                accountPassword: this.state.accountPassword,
                openId: this.state.openId
            }
        } else if (this.state.accountType === "corp") {
            bindUrl = `${baseUrl}wx/push/corp/bind`
            data = {
                tmcId: this.state.tmcId,
                corpCode: this.state.accountCode,
                accountName: this.state.accountName,
                accountPassword: this.state.accountPassword,
                openId: this.state.openId
            }
        } else if (this.state.accountType === "void") {
            bindUrl = `${baseUrl}wx/push/phone/bind`
            data = {
                userPhone: this.state.accountPhone,
                verifyType: "3",
                verifyCode: this.state.validCode,
                openId: this.state.openId
            }
        }
        this.setState({ bindBtnClickable: false })
        axios.post(bindUrl, data).then((res) => {
            this.setState({     //绑定成功，隐藏绑定页面，显示绑定成功页面
                showBind: false,
                showResult: true,
                showText: "绑定成功！",
                bindBtnClickable: true
            })
        }).catch((err) => {
            alert(err.response.data.message)
            this.setState({
                bindBtnClickable: true
            })
        })
    }

    handleUnbind = () => {
        const unbindUrl = `${baseUrl}wx/push/auth/relieveBind?userId=` + this.state.userId + "&bindType=" + this.state.bindType + "&bindId=" + this.state.bindId
        this.setState({
            bindBtnClickable: false
        })
        axios.get(unbindUrl).then((res) => {
            this.setState({     //解绑成功，隐藏解绑页面，显示解绑成功页面
                showUnbind: false,
                showResult: true,
                showText: "解绑成功！",
                bindBtnClickable: true
            })
        }).catch((err) => {
            this.setState({
                showText: "解绑失败",
                bindBtnClickable: true
            })
            alert("解绑失败")
        })
    }

    handleValid() {
        let count = 60;
        this.setState({
            validBtnClickable: false
        })
        const timer = setInterval(() => {
            this.setState({
                validText: --count + " 秒"
            })
            if (count === 50) {
                this.setState({
                    validText: "发送验证码",
                    validBtnClickable: true
                })
                clearInterval(timer)
            }
        }, 1000)
        const validUrl = `${baseUrl}h5/verifycode/sms`;
        const data = {
            userPhone: this.state.accountPhone,
            verifyType: "3"
        }
        axios.post(validUrl, data).then((res) => {
            alert("发送成功")
        }).catch((err) => {
            alert(err.message)
        })
    }

    handleClose = () => { wx.closeWindow() }

    renderLoading = (show) => {
        return show && (
            <div className='loading'>
                <img src={loading_fig} alt="" />
            </div>
        );
    }

    renderBindView(visible) {
        return visible && (
            <div className="bindPage">
                <img src={logo} alt="logo" />
                <div className="myInput">
                    <div className="bindType" onChange={this.changeType.bind(this)}>
                        <label htmlFor="tmc">
                            <input
                                type="radio"
                                id="tmc"
                                name="accountType"
                                value="tmc"
                                defaultChecked={true} /> TMC账号
                           </label>
                        <label htmlFor="corp" >
                            <input
                                type="radio"
                                id="corp"
                                name="accountType"
                                value="corp" /> 企业账号
                        </label>

                    </div>
                    {
                        this.state.isVoid ?
                            <div className="columnCenter">
                                <input
                                    type="number"
                                    placeholder="输入手机号"
                                    onChange={this.handleChangeAccountPhone.bind(this)} />
                                <div className="validDiv">
                                    <input
                                        type="number"
                                        placeholder="输入验证码"
                                        onChange={this.handleChangeAccountValid.bind(this)} />
                                    <button
                                        className="validBtn"
                                        onClick={this.handleValid.bind(this)}
                                        disabled={!this.state.validBtnClickable}>
                                        {this.state.validText}
                                    </button>
                                </div>
                            </div>
                            :
                            <div className="columnCenter">
                                <input
                                    type="text"
                                    placeholder={this.state.accountType === "tmc" ? "输入TMC编号" : "输入企业编号"}
                                    onChange={this.handleChangeAccountCode.bind(this)} />
                                <input
                                    type="number"
                                    placeholder="输入邮箱或手机号"
                                    onChange={this.handleChangeAccountName.bind(this)} />
                                <input
                                    type="password"
                                    placeholder="输入登录密码"
                                    onChange={this.handleChangeAccountPassword.bind(this)} />
                            </div>
                    }
                </div>
                <button
                    className="bindBtn"
                    onClick={this.handleBind}
                    disabled={!this.state.bindBtnClickable}>绑定</button>
            </div>
        )
    }

    renderUnbindView(show) {
        return show && (
            <div className="unbindPage">
                <img src={logo} alt="logo" />
                <p>
                    <img alt="提示" src={alert_img} />
                    <span>公众号已与{this.state.bindType === 1 ? "TMC" : "企业"}
                        账号{this.state.accountName}绑定，重新绑定请先解除绑定后再次绑定
                    </span>
                </p>
                <button
                    className="bindBtn"
                    onClick={this.handleUnbind}>
                    解除绑定
                </button>
            </div>
        )
    }

    renderResult(show) {
        return show && (
            <div className="bindResult">
                <img src={logo} alt="logo" />
                <p>
                    {this.state.showText !== ""
                        ? <img alt='成功' src={succ_img} />
                        : <img alt='失败' src={err_img} />
                    }
                    <span>{this.state.showText}</span>
                </p>
                <button
                    className="bindBtn"
                    onClick={this.handleClose}>关闭</button>
            </div>
        )
    }

    render() {
        const { showLoading, showBind, showUnbind, showResult } = this.state;
        return (
            <div className="bindBody">
                {this.renderLoading(showLoading)}
                {this.renderBindView(showBind)}
                {this.renderUnbindView(showUnbind)}
                {this.renderResult(showResult)}
            </div>
        )
    }
}

export default BindPage;