const request = require("request");
// 为服务器制定，快速实施jQuery操作，适合爬虫
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

// 请求数据，request默认编码utf8
request(
  {
    // url: "http://127.0.0.1:8080/",
    url: "http://buy.flightclub.cn/lists/air%20jordan",
    encoding: null, // 不使用request编码
    method: "get"
  },
  (error, res, body) => {
    if (!error && res.statusCode === 200) {
      let http = iconv.decode(body, "utf8");
      // 返回body就是抓到的页面
      let _$ = cheerio.load(body, { decodeEntities: false }); // 关闭转换实体编码的功能
      //   let oView = _$(".aa").html();
      let oView = _$(".bf_list_content").html();
      console.log("oView", oView);
      // 将oView转换成对象
      let $ = cheerio.load(oView);
      $(".bf_list_product_item").map(function() {
        let url = $(this)
          .find(".item_img a")
          .attr("href");
        let src = $(this)
          .find(".item_img img")
          .attr("src");
        let name = $(this)
          .find(".item_title a")
          .text();
        let price = $(this)
          .find(".item_price_sales .price")
          .text();
        console.log("url ", url);
        console.log("src ", src);
        console.log("name ", name);
        console.log("price ", price);
      });
    } else {
      console.log("error", error);
    }
  }
);
