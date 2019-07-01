/* 11111 */
var app = new Vue({
	el: ".YDapp",
	data: {
		listData:[],
	},
	created() {
		this.startFun();
	},
	methods: {
		goType(id,level){
			url = "./hd/type.html?id="+id+'&level='+level;
			window.location.href = url;
		},
		startFun: function() {
			var that = this;
			var _serverAdd = "http://47.98.249.149:8020/readba/";
			// var _serverAddrImg = "http://47.98.249.149:8020/readbaoss/";
			$.ajax({
				type: "POST",
				url: _serverAdd + "appAlone/selectStampedType.json",
				data: {
					enable:1
				},
				success: function(data) {
					that.listData = data.data;
				}
			});
		},
	}
})