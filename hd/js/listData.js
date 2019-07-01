/* 11111 */
var app = new Vue({
	el: ".YDapp",
	data: {
		contentId:'',
		listData:[],
	},
	created() {
		this.startFun();
	},
	methods: {
		// 获取地址栏参数
		getUrlParam: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        },
		startFun: function() {
			var that = this;
			that.contentId = that.getUrlParam("id");
			var _serverAdd = "http://47.98.249.149:8020/readba/";
			$.ajax({
				type: "POST",
				url: _serverAdd + "appAlone/ScreenMatch.json",
				data: {
					areaId: that.contentId,
				},
				success: function(data) {
					that.listData = data.data
					for(var i=0;i<that.listData.length;i++){
						that.listData[i].addTime = that.dataTime(that.listData[i].addTime);
						that.listData[i].endTime = that.dataTime(that.listData[i].endTime);
						that.listData[i].enlistEnd = that.dataTime(that.listData[i].enlistEnd);
					}
					// console.log(that.listData)
				}
			});
		},
		goUp(tmp){
			// url = "http://www.hzxh7.cn/share/content.html";
			sessionStorage.setItem('photo',tmp.encourageInfo);
			var data = encodeURIComponent('id='+tmp.id+'&infoPhoto='+tmp.infoPhoto+'&telephoneNumber='+tmp.telephoneNumber+'&vxNumber='+tmp.vxNumber+'&infoRule='+tmp.infoRule+'&isShcool='+tmp.isShcool+'&isCaptain='+tmp.isCaptain);
			// console.log(data)
			var url = "./content.html?" + data;
			window.location.href = url;
		},
		// 时间转换
		dataTime(time,format){   
			var formatData = format;
			var formatData = 'yyyy年MM月dd日 hh:mm:ss';
			var newDate = new Date();
			newDate.setTime(time);
			var date = {
				  "M+": newDate.getMonth() + 1, 
				  "d+": newDate.getDate(),
				  "h+": newDate.getHours(),
				  "m+": newDate.getMinutes(),
				  "s+": newDate.getSeconds(),
				  "q+": Math.floor((newDate.getMonth() + 3) / 3),
				  "S+": newDate.getMilliseconds()
			};
			if (/(y+)/i.test(formatData)) {
				formatData = formatData.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
			}
			for (var k in date) {
				if (new RegExp("(" + k + ")").test(formatData)) {
				formatData = formatData.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
				}
			}
			return formatData;
		}
	}
})