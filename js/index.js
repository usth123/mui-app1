function jsCopy(obj) {
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
        $copyText = $(obj)[0];
        $copyText.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
    }
    // 安卓系统的UC浏览器
    if (u.indexOf('Android') > -1 && u.indexOf('UCBrowser') > -1) {
        $(obj)[0].innerHTML = '点击复制文案';
        alert('若点击复制文案无效，请长按内容手动复制！');
    }
    alert("复制成功");
}