var daysignBase64;
function getBase64Image(img) {  
    var canvas = document.createElement("canvas");
    canvas.width =360;  
    canvas.height = 640;
    let imgWidth = img.width;
    let imgHeight = img.height;
     //与画布的宽比
     let dw = canvas.width / imgWidth;
     //与画布的高比
     let dh = canvas.height / imgHeight;
     var fang = canvas.width;
     var chang = canvas.height;
    var ctx = canvas.getContext("2d");  
    // ctx.drawImage(img, 0, 0, img.width, img.height);
    // 裁剪图片中间部分
    if (imgWidth > fang && imgHeight > chang || imgWidth < fang && imgHeight < chang) {
        if (dw > dh) {
            ctx.drawImage(img, 0, (imgHeight - fang / dw) / 2, imgWidth, fang / dw, 0, 0, fang, chang)
        } else {
            ctx.drawImage(img, (imgWidth - fang / dh) / 2, 0, fang / dh, imgHeight, 0, 0, fang, chang)
        }
    }
    // 拉伸图片
    else {
        if (imgWidth < fang) {
            ctx.drawImage(img, 0, (imgHeight - fang / dw) / 2, imgWidth, fang / dw, 0, 0, fang, chang)
        } else {
            ctx.drawImage(img, (imgWidth - fang / dh) / 2, 0, fang / dh, imgHeight, 0, 0, fang, chang)
        }
    }  
    // var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();  
    var dataURL = canvas.toDataURL("image/png");  
    return dataURL;  
}
var image = new Image();  
image.setAttribute("crossOrigin",'Anonymous');
// image.src = 'http://cdn.treelo.xin/avatar.png'; 
image.onload = function(){  
//   console.log(base64);
    document.querySelector('.yuechu').style.cssText="background-image: url("+getBase64Image(image)+");"+"background-size: cover;";
} 


window.onload = function(){
    let today=new Date();
    let chinese = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九','十'];
    let y = today.getFullYear().toString();
    let m = (today.getMonth()+1).toString();
    let mouth;
 	if (m.length == 2) {
		if (m.charAt(0) == "1") {
			mouth = ("十" + chinese[m.charAt(1)] + "月");
		}
	} 
 	else {
		mouth = (chinese[m.charAt(0)] + "月");
    } 
    document.querySelector('.year').innerHTML=y+" ❤";
    document.querySelector('.mouth').innerHTML="你好啊" + mouth;
}

var upimg = document.querySelector('#upimg');
upimg.onchange=function(){
    //获取文件
    var file = this.files[0];
    //创建读取文件对象
    var reader = new FileReader();
    //读取文件
    reader.readAsDataURL(file);
    //在回调函数中修改Img的src属性
    reader.onload = function () {
        // console.log(reader.result);
        image.src = reader.result;
    }
}
function $(id) {
    return document.getElementById(id);
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
    // $('canvas').getContext('2d').fillStyle = $("showcolor").innerHTML;
    document.querySelector('.mouth').style.cssText="color:rgb("+  red.value + "," + green.value+ "," + blue.value+");";
    document.querySelector('.year').style.cssText="color:rgb("+  red.value + "," + green.value+ "," + blue.value+");";
    document.querySelector('.juzi').style.cssText="color:rgb("+  red.value + "," + green.value + "," + blue.value+");"+"text-shadow: -20px 15px 2px rgb("+red.value + "," + green.value + "," + blue.value+",0.3);";
    document.querySelector('.theme').style.cssText="border-color:rgb("+  red.value + "," + green.value + "," + blue.value+",0.6);";
}
changeColor();
function baseDaySign(){
    if(daysignBase64==undefined){
        alert('请填入日签!');
    }
    handleCopy(daysignBase64);
}


function imgDaySign() {
    if(daysignBase64==undefined){
        alert('请填入日签!');
    }
    var triggerDownload = document.querySelector('#download')
    triggerDownload.setAttribute("href",daysignBase64);
    var timestamp = Date.parse(new Date());
    triggerDownload.setAttribute("download", timestamp + ".png");
    triggerDownload.click();
}
function reload(){
    location.reload();
}


function takeScreenshot() {
    html2canvas(document.querySelector('.yuechu'), {
        onrendered: function(canvas) {
        // console.log(canvas.toDataURL());
          daysignBase64=canvas.toDataURL();
        },
  });
}

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
var txt = $('txt');
txt.onchange=function(){
    let content = this.value;
    // content =content.split('\n');
    // let contentBr ='';
    // for(let i=0;i<content.length;i++){
    //     contentBr+=content[i]+'<br>&nbsp;';
    // }
    // // contentBr = '&nbsp;'+contentBr;
    document.querySelector('.txt').innerHTML=content;
}

var themeVal = document.querySelector('#themeVal');
themeVal.onchange=function(){
    let theme = this.value;
    document.querySelector('.theme').innerHTML=theme;
}


