//获取当前日期
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
if (month < 10) {
    month = "0" + month;
}
if (day < 10) {
    day = "0" + day;
}
var nowDate = year + "." + month + "." + day;
var input = document.querySelector('input');
input.onchange = function () {
    //获取文件
    var file = this.files[0];
    //创建读取文件对象
    var reader = new FileReader();
    //读取文件
    reader.readAsDataURL(file);
    //在回调函数中修改Img的src属性
    reader.onload = function () {
        // console.log(reader.result);
        canimg.src = reader.result;
    }
}
var daysign = document.getElementById("daysign");
var ctx1 = daysign.getContext("2d");

var ratio = getPixelRatio(ctx1);
daysign.width = 400 * ratio;
daysign.height = 550 * ratio;
ctx1.fillStyle = '#fff';
ctx1.fillRect(0, 0, daysign.width, daysign.height);
var dayimg = new Image();
dayimg.onload = function () {
    let imgw = dayimg.width;
    let imgh = dayimg.height;
    ctx1.clearRect(dayimg, 25, 25, imgw * ratio, imgh * ratio);
    ctx1.drawImage(dayimg, 25, 25, imgw * ratio, imgh * ratio);
};



function getPixelRatio(context) {
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
};


var c = document.getElementById("copyimg");
var ctx2 = c.getContext("2d");
var canimg = new Image();
canimg.onload = function () {
    //图片的宽
    let imgw = canimg.width;
    //图片的高
    let imgh = canimg.height;
    //与画布的宽比
    let dw = c.width / imgw;
    //与画布的高比
    let dh = c.height / imgh;
    var fang = c.width
    // 裁剪图片中间部分
    if (imgw > fang && imgh > fang || imgw < fang && imgh < fang) {
        if (dw > dh) {
            ctx2.drawImage(canimg, 0, (imgh - fang / dw) / 2, imgw, fang / dw, 0, 0, fang, fang)
        } else {
            ctx2.drawImage(canimg, (imgw - fang / dh) / 2, 0, fang / dh, imgh, 0, 0, fang, fang)
        }
    }
    // 拉伸图片
    else {
        if (imgw < fang) {
            ctx2.drawImage(canimg, 0, (imgh - fang / dw) / 2, imgw, fang / dw, 0, 0, fang, fang)
        } else {
            ctx2.drawImage(canimg, (imgw - fang / dh) / 2, 0, fang / dh, imgh, 0, 0, fang, fang)
        }
    }
    let data = c.toDataURL('image/png');
    dayimg.src = data;
};

function $(id) {
    return document.getElementById(id);
}
window.onload = function () {
    author()
}
function author() {
    var daysign = document.getElementById("daysign");
    var ctx1 = daysign.getContext("2d");
    ctx1.clearRect(275, 480, 100, 40);
    ctx1.fillStyle = '#fff';
    ctx1.fillRect(275, 480, 100, 40);
    ctx1.font = "25px Cursive";
    ctx1.fillStyle = $("showcolor").innerHTML;
    ctx1.fillText('搅拌糖°', 275, 505, 100, 20);
    ctx1.clearRect(265, 510, 100, 40);
    ctx1.fillStyle = '#fff';
    ctx1.fillRect(265, 510, 100, 40);
    ctx1.fillStyle = $("showcolor").innerHTML;
    ctx1.font = "18px Georgia";
    ctx1.fillText(nowDate, 270, 525, 100, 20);
}

function textToImg() {
    author()
    var len = $('len').value || 20;
    var i = 0;
    var fontSize = $('fontSize').value || 18;
    // var fontWeight = $('fontWeight').value || 'normal';
    var txt = $("txt").value;
    var canvas = $('canvas');
    if (txt == '') {
        alert('必须要输入日签');
        $("txt").focus();
    }
    if (len > txt.length) {
        len = txt.length;
    }
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = $("showcolor").innerHTML;
    context.font = fontSize + 'px Cursive';
    context.textBaseline = 'top';
    canvas.style.display = 'none';
    function fillTxt(text) {
        while (text.length > len) {
            var txtLine = text.substring(0, len);
            text = text.substring(len);
            context.fillText(txtLine, 0, fontSize * (3 / 2) * i++,
                canvas.width);
        }
        context.fillText(text, 0, fontSize * (3 / 2) * i, canvas.width);
    }
    var txtArray = txt.split('\n');
    for (var j = 0; j < txtArray.length; j++) {
        fillTxt(txtArray[j]);
        context.fillText('\n', 0, fontSize * (3 / 2) * i++, canvas.width);
    }
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var textimg = $("textimg");
    // textimg.src = canvas.toDataURL("image/png");

    var dayimg1 = new Image();
    dayimg1.onload = function () {
        let imgw = dayimg1.width;
        let imgh = dayimg1.height;
        ctx1.clearRect(25, 390, imgw * ratio, imgh * ratio);
        ctx1.drawImage(dayimg1, 25, 390, imgw * ratio, imgh * ratio);
    };
    dayimg1.src = canvas.toDataURL("image/png");
}
function changeColor() {
    var c = $("text");
    var ctx = c.getContext("2d");
    var red = $("red");
    var green = $("green");
    var blue = $("blue");
    ctx.fillStyle = "rgb(" + red.value + "," + green.value + "," + blue.value + ")";
    $("showcolor").innerHTML = ctx.fillStyle;
    ctx.fillRect(0, 0, 100, 100);
    $('canvas').getContext('2d').fillStyle = $("showcolor").innerHTML;
}
function baseDaySign() {
    let data = daysign.toDataURL('image/png');
    console.log(data);
    handleCopy(data)
}
function imgDaySign() {
    let data = daysign.toDataURL('image/png');
    var triggerDownload = $("download")
    triggerDownload.setAttribute("href", data);
    var timestamp = Date.parse(new Date());
    triggerDownload.setAttribute("download", timestamp + ".png");
    triggerDownload.click();
}
changeColor();

function handleCopy(data) {
    //生成虚拟DOM
    let input = document.createElement('input')
    document.body.appendChild(input)
    input.setAttribute('value', data)
    input.select()
    document.execCommand('copy')
    // 删除'虚拟'DOM
    document.body.removeChild(input)
}
function reload(){
    location.reload();
}