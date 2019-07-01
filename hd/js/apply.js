/* 11111 */
var app = new Vue({
    el: ".YDapp",
    data: {
        photo: '',
        dataId: '',
        name: '',
        telephone: '',
        address: '',
        userNo: '',
        time: '',
        shcool: '', //学校
        sex: '', //性别
        grade: '', //年纪段
        className: '', //班级
        captain: '', //队长
        contact: '', //联系人
        headTeacher: '', //班主任
        teacherTelephone: '', //班主任电话
        isCaptain: 0, //是否显示队长 0 不填，1填
        isShcool: 0, //是否显示学校  0 不填，1填
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
            this.photo = sessionStorage.getItem('photo');
            this.dataId = this.getUrlParam("id");
            this.isCaptain = this.getUrlParam("isCaptain");
            this.isShcool = this.getUrlParam("isShcool");
        },
        showUp(msg) {
            var show = $('#isShow')[0],
                top = 0;
            $('#isShow').html(msg).show();
            show.style.opacity = 1;
            var time = setInterval(() => {
                show.style.opacity = show.style.opacity - 0.01;
            }, 30)
            setTimeout(() => {
                clearInterval(time);
                show.style.opacity = 0;
                $('#isShow').hide();
            }, 2000)
        },
        goUp() {
            var that = this;
            that.contentId = that.getUrlParam("id");
            var btn = $('#btn')[0];
            btn.disabled = 'disabled';
            setTimeout(function() {
                btn.disabled = '';
            }, 2000);
            if (that.name == "") {
                that.showUp('请输入您的姓名');
            } else if (that.sex == "") {
                that.showUp('请输入您的性别');
            } else if (that.grade == "") {
                that.showUp('请输入您的年级');
            } else if (that.className == "") {
                that.showUp('请输入您的班级');
            } else if (that.contact == "") {
                that.showUp('请输入联系人');
            } else if (that.telephone == "") {
                that.showUp('请输入联系人的手机号码')
            } else if (!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(that.telephone))) {
                that.showUp('请输入正确的联系人手机号码')
            } else if (that.address == "") {
                that.showUp('请输入您的家庭住址')
            } else if (that.headTeacher == "") {
                that.showUp('请输入班主任');
            } else if (that.teacherTelephone == "") {
                that.showUp('请输入班主任联系电话');
            } else if (!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(that.teacherTelephone))) {
                that.showUp('请输入正确的班主任手机号码')
            } else if (that.userNo == "") {
                that.showUp('请输入您的编号');
            } else {
                var _serverAdd = "http://47.98.249.149:8020/readba/";
                $.ajax({
                    type: "POST",
                    url: _serverAdd + "appAlone/insertAloneEentered.json",
                    data: {
                        exchangeId: that.dataId,
                        name: that.name,
                        telephone: that.telephone,
                        address: that.address,
                        userNo: that.userNo,
                        shcool: that.shcool,
                        age: that.sex,
                        classname: that.className,
                        grade: that.grade,
                        captain: that.captain,
                        contacts: that.contact,
                        teacherName: that.headTeacher,
                        teacherPhone: that.teacherTelephone,
                    },
                    success: function(data) {
                        that.showUp('申请成功，耐心等待工作人员与您联系');
                        that.name = '';
                        that.telephone = '';
                        that.address = '';
                        that.userNo = '';
                        that.shcool = '';
                        that.className = '';
                        that.grade = '';
                        that.captain = '';
                        that.contact = '';
                        that.headTeacher = '';
                        that.teacherTelephone = '';
                        that.sex = '';
                    },
                    error: function(data) {
                        alert('报名失败');
                        console.log(data);
                    }
                });
            }
        },
    }
})