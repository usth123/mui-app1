/* 11111 */
var app = new Vue({
    el: ".YDapp",
    data: {
        typeId: '',
        typeOne: [],
        oneName: '',
        typeTwo: [],
        twoName: '',
        typeThree: [],
        threeName: '',
        typeFour: [],
        fourName: '',
        selecdData: [],
        typeNum: 1, //当前是第几级
        level: 0, //当前活动为几级分类
        images: [],
    },
    created() {
        this.startFun();
        this.getImg();
    },
    methods: {
        // 获取地址栏参数
        getUrlParam: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; //返回参数值
        },
        startFun: function() {
            var that = this;
            that.typeId = that.getUrlParam("id");
            that.level = that.getUrlParam("level");
            var _serverAdd = "http://47.98.249.149:8020/readba/";
            $.ajax({
                type: "POST",
                url: _serverAdd + "appAlone/selectStampedArea.json",
                data: {
                    typeId: that.typeId,
                },
                success: function(data) {
                    that.typeOne = data.data;
                    console.log(data)
                    that.selecdData = data.data;
                }
            });
        },
        getImg: function() {
            var that = this;
            var _serverAdd = "http://47.98.249.149:8020/readba/";
            $.ajax({
                type: "POST",
                url: _serverAdd + "appAlone/selectAlonePhoto.json",
                data: {
                    activityId: that.typeId,
                },
                success: function(data) {
                    that.images = data.data;
                }
            });
        },
        getData: function(tmp, i) {
            var that = this;
            if (i == that.level || i == 4) {
                that.goUp(tmp);
            } else {
                var _serverAdd = "http://47.98.249.149:8020/readba/";
                $.ajax({
                    type: "POST",
                    url: _serverAdd + "appAlone/selectStampedAreas.json",
                    data: {
                        areaId: tmp.id,
                    },
                    success: function(data) {

                        switch (i) {
                            case 1:
                                that.oneName = tmp.name;
                                that.typeTwo = data.data;
                                break;
                            case 2:
                                that.twoName = tmp.name;
                                that.typeThree = data.data;
                                break;
                            case 3:
                                that.threeName = tmp.name;
                                that.typeFour = data.data;
                                break;
                            default:
                                break;
                        }
                        that.typeNum++;
                        that.selecdData = data.data;
                    }
                });
            }
        },
        goUp(tmp) {
            url = "./listData.html?id=" + tmp.id;
            window.location.href = url;
        },
        goBanner(tmp) {
            url = "./banner.html?info=" + tmp.info;
            window.location.href = url;
        },
        goTab(i) {
            var that = this;
            if (this.typeNum < i) {
                return
            }
            this.typeNum = i;
            switch (i) {
                case 1:
                    that.selecdData = that.typeOne;
                    break;
                case 2:
                    that.selecdData = that.typeTwo;
                    break;
                case 3:
                    that.selecdData = that.typeThree;
                    break;
                case 4:
                    that.selecdData = that.typeFour;
                    break;
                default:
                    break;
            }
        },
    }
})