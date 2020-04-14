// console.log(123);

// var layer = new AMap.TileLayer({
//     zooms:[3,20],    //可见级别
//     visible:true,    //是否可见
//     opacity:1,       //透明度
//     zIndex:0         //叠加层级
// })
// var map = new AMap.Map('container',{
//     layers:[layer] //当只想显示标准图层时layers属性可缺省
// });

var opts = {
  subdistrict: 0,
  extensions: "all",
  level: "city",
};
//利用行政区查询获取边界构建mask路径
//也可以直接通过经纬度构建mask路径
var district = new AMap.DistrictSearch(opts);
district.search("北京市", function (status, result) {
  var bounds = result.districtList[0].boundaries;
  var mask = [];
  for (var i = 0; i < bounds.length; i += 1) {
    mask.push([bounds[i]]);
  }
  var map = new AMap.Map("container", {
    mask: mask,
    center: [116.472804, 39.995725],
    disableSocket: true,
    viewMode: "3D",
    showLabel: false,
    labelzIndex: 130,
    pitch: 40,
    zoom: 9,
    layers: [
      new AMap.TileLayer.RoadNet({
        //rejectMapMask:true
      }),
      new AMap.TileLayer.Satellite(),
    ],
  });
  var maskerIn = new AMap.Marker({
    position: [116.501415, 39.926055],
    map: map,
  });
  var maskerOut = new AMap.Marker({
    //区域外的不会显示
    position: [117.001415, 39.926055],
    map: map,
  });
  //添加高度面
  var object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
  map.add(object3Dlayer);
  var height = -8000;
  var color = "#0088ffcc"; //rgba
  var wall = new AMap.Object3D.Wall({
    path: bounds,
    height: height,
    color: color,
  });
  wall.transparent = true;
  object3Dlayer.add(wall);
  //添加描边
  for (var i = 0; i < bounds.length; i += 1) {
    new AMap.Polyline({
      path: bounds[i],
      strokeColor: "#99ffff",
      strokeWeight: 4,
      map: map,
    });
  }
});
