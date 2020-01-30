var zTreeObj,
    setting = {
        view: {
            selectedMulti: false
        },
        callback: {
            onClick: zTreeOnClick
        }
    },
    zTreeNodes = [
        {
            "name": "文章分类", open: true,
            children: [
                { "name": "Excel技巧" },
                { "name": "Excel函数" },
                { "name": "ExcelVBA" },
                { "name": "透视图" },
                {
                    "name": "PPT",
                    children: [
                        { "name": "PPT1" },
                        { "name": "PPT2" }
                    ]
                }
            ]
        }
    ];
let menuData = [
    { name: "Excel函数_合并两个表格很简单" },
    { name: "Excel函数_美化表格" },
    { name: "Excel函数_隔行操作" },
    { name: "Excel函数_填充字号技巧" }
]
let menuPath = "F:\\006 每日一练\\01 函数课堂\\03 函数文档(大全)\\Word 文档";

function zTreeOnClick(event, treeId, treeNode) {
    if (treeNode.name == "Excel技巧") {
        menuData = [
            { name: "Excel函数_合并两个表格很简单" },
            { name: "Excel函数_美化表格" },
            { name: "Excel函数_隔行操作" },
            { name: "Excel函数_填充字号技巧" },
        ]
    } else if (treeNode.name == "Excel函数") {
        menuData = [
            { name: "Excel函数_合并两个表格很简单" },
            { name: "Excel函数_美化表格" },
            { name: "Excel函数_隔行操作" },
            { name: "Excel函数_填充字号技巧" },
        ]
    } else if (treeNode.name == "ExcelVBA") {
        menuData = [
            { name: "Excel函数_合并两个表格很简单" },
            { name: "Excel函数_美化表格" },
            { name: "Excel函数_隔行操作" },
            { name: "Excel函数_填充字号技巧" },
        ]
    } else if (treeNode.name == "透视图") {
        menuData = [
            { name: "Excel函数_合并两个表格很简单" },
            { name: "Excel函数_美化表格" },
            { name: "Excel函数_隔行操作" },
            { name: "Excel函数_填充字号技巧" },
        ]
    } else if (treeNode.name == "PPT1") {
        menuData = [
            { name: "Excel函数_合并两个表格很简单" },
            { name: "Excel函数_美化表格" },
            { name: "Excel函数_隔行操作" },
            { name: "Excel函数_填充字号技巧" },
        ]
    } else if (treeNode.name == "PPT2") {
        menuData = [
            { name: "Excel函数_合并两个表格很简单" },
            { name: "Excel函数_美化表格" },
            { name: "Excel函数_隔行操作" },
            { name: "Excel函数_填充字号技巧" },
        ]
    }
    renderMenu()
};

function renderMenu() {
    if (menuData.length != 0) {
        let liHtml = "";
        menuData.map(function (item, index) {
            liHtml += "<li>" + (index + 1) + ". <a href='" + menuPath + item.name + ".docx'>" + item.name + "</li>";
        });
        $("#menuList").html(liHtml)
    }
}

$(document).ready(function () {
    zTreeObj = $.fn.zTree.init($("#tree"), setting, zTreeNodes);
    renderMenu();
});