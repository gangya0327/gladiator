const req = require.context("./svg", false, /\.svg$/);
// ['qq.svg', 'wx.svg']
req.keys().map(req);

import Vue from "vue";
import SvgIcon from "@/components/SvgIcon";
Vue.component("svg-icon", SvgIcon);
