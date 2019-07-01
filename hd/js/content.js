/* 11111 */
var app = new Vue({
    el: ".YDapp",
    data: {
        infoPhoto: '',
        telephoneNumber: '',
        infoRule: '',
        listData: [],
        dataId: '',
        wxNumber: '',
        isCaptain:0, //是否显示队长 0 不填，1填
        isShcool:0,  //是否显示学校  0 不填，1填
    },
    created() {
        this.startFun();
    },
    methods: {
        // 获取地址栏参数
        getUrlParam: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = decodeURIComponent(window.location.search).substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]);
            return null; //返回参数值
        },
        startFun() {
            this.dataId = this.getUrlParam("id");
            this.infoPhoto = this.getUrlParam("infoPhoto");
            this.telephoneNumber = this.getUrlParam("telephoneNumber");
            this.infoRule = this.getUrlParam("infoRule");
            this.wxNumber = this.getUrlParam("vxNumber");
            this.isCaptain = this.getUrlParam("isCaptain");
            this.isShcool = this.getUrlParam("isShcool");
        },
        goUp() {
            url = "./apply.html?id=" + this.dataId+'&isCaptain='+this.isCaptain+'&isShcool='+this.isShcool;
            window.location.href = url;
        },
        //弹框提醒
        getPhone(type, text) {
            var show = $('#isShow')[0];
            if (type == 0) { //手机
                $('#isShow').html(this.telephoneNumber);
                this.jsCopy(".copy");
            } else if (type == 1) { //微信
                $('#isShow').html(this.wxNumber);
                this.jsCopy(".copy1");
            }
            this.closeZ(type)
            show.style.opacity = 1;
            var time = setInterval(() => {
                show.style.opacity = show.style.opacity - 0.01;
            }, 50)
            setTimeout(() => {
                clearInterval(time);
                show.style.opacity = 0;
            }, 3000)
        },
        closeZ(type) {
            if (type == 0) {
                $("#maskZ").toggle(); //电话
            } else {
                $("#maskZ1").toggle();
            }
        },
        copyText(txt) {
            var copy_obj = document.createElement('textarea');
            document.body.append(copy_obj);
            copy_obj.style.position = 'absolute';
            copy_obj.style.left = '-999999px';
            copy_obj.value = txt;
            copy_obj.select();
            document.execCommand("copy"); // 执行浏览器复制命令
            document.body.removeChild(copy_obj);
            $('#isShow').html("复制成功");
        },
        jsCopy(obj) {
            var u = navigator.userAgent;
            console.log(u)
            //苹果
            if (u.match(/(iPhone|iPod|iPad);?/i)) { //ios
                //   alert('苹果啊');
                //要复制文字的节点
                var copyDOM = $(obj)[0];
                console.log(copyDOM)
                var range = document.createRange();
                // 选中需要复制的节点
                range.selectNode(copyDOM);
                // 执行选中元素
                window.getSelection().addRange(range);
                // 执行 copy 操作
                var successful = document.execCommand('copy');
                try {
                    var msg = successful ? 'successful' : 'unsuccessful';
                    console.log('copy is' + msg);
                } catch (err) {
                    console.log('Oops, unable to copy');
                }
                // 移除选中的元素
                window.getSelection().removeAllRanges();
                //obj.setAttribute('data-state','yes');
            }
            // 安卓
            if (u.indexOf('Android') > -1) {
                // alert('安卓啊');
                var $copyPP = obj.parentNode.firstChild.nextElementSibling,
                    $copyText = obj.parentNode.lastChild.nextElementSibling;
                $copyText.innerHTML = $copyPP.innerHTML.replace(/<[^>]+>/g, "");
                $copyText.select(); // 选择对象
                document.execCommand("Copy"); // 执行浏览器复制命令
            }
            // 安卓系统的UC浏览器
            if (u.indexOf('Android') > -1 && u.indexOf('UCBrowser') > -1) {
                obj.innerHTML = '点击复制文案';
                alert('若点击复制文案无效，请长按内容手动复制！');
            }
            $('#isShow').html("复制成功");
        },
        // 时间转换
        dataTime(time, format) {
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