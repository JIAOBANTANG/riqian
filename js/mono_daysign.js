window.onload = function () {
    autoDate();
    autoOuthor();
    autoTheme();
}
var daysignBase64;
var sign_author = document.querySelector('#sign-author');
sign_author.onchange=function(){
    autoOuthor();
}

var themeVal = document.querySelector('#themeVal');
themeVal.onchange=function(){
    autoTheme();
}

var txt = document.querySelector('#txt');
txt.onchange=function(){
    daysignContent();
}

var juziAuthor = document.querySelector('#juziAuthor');
juziAuthor.onchange=function(){
    Author();
}
function Author(){
    let author = document.querySelector('#juziAuthor').value;
    author = author+'&nbsp;&nbsp;说';
    document.querySelector('.author').innerHTML=author;
}

var txt = document.querySelector('#txt');
txt.onchange=function(){
    daysignContent();
}

function daysignContent(){
    let content = document.querySelector('#txt').value;
    content =content.split('\n');
    let contentBr ='';
    for(let i=0;i<content.length;i++){
        contentBr+=content[i]+'<br>';
    }
    contentBr = '&nbsp;'+contentBr;
    document.querySelector('.daysignContent').innerHTML=contentBr;
}


function autoOuthor(){
    let outhor = document.querySelector('#sign-author').value+"日签";
    document.querySelector('.logo').innerHTML=outhor;
}



function baseDaySign(){
    handleCopy(daysignBase64);
}

function imgDaySign() {
    var triggerDownload = document.querySelector('#download')
    triggerDownload.setAttribute("href",daysignBase64);
    var timestamp = Date.parse(new Date());
    triggerDownload.setAttribute("download", timestamp + ".png");
    triggerDownload.click();
}

function reload(){
    location.reload();
}

function autoDate(){
    document.querySelector('.date').innerHTML=date();
}


function takeScreenshot() {
      html2canvas(document.querySelector('.daysign'), {
          onrendered: function(canvas) {
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

//时间转大写年月日函数
function date(){
	let today=new Date();
	let chinese = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九','十'];
 	let y = today.getFullYear().toString();
 	let m = (today.getMonth()+1).toString();
 	let d = today.getDate().toString();
	let result = "";
 	for (let i = 0; i < y.length; i++) {
		result += chinese[y.charAt(i)];
	}
 	result += "年";
 	if (m.length == 2) {
		if (m.charAt(0) == "1") {
			result += ("十" + chinese[m.charAt(1)] + "月");
		}
	} 
 	else {
		result += (chinese[m.charAt(0)] + "月");
    } 
    // d =parseInt(d)+11;
    // console.log(d);
    // d=d.toString();
 	if (d.length == 2) {
         if(d.charAt(0)==1){
             if(d.charAt(1)==0){
                result += "十日";                 
             }else{
                result += "十"+(chinese[d.charAt(0)] + "日");
             }
         }else{
            result += chinese[d.charAt(0)]+"十"+(chinese[d.charAt(0)] + "日");
        }
	} 
 	else {
		result += (chinese[d.charAt(0)] + "日");
	}
	return result;
}

function autoTheme(){
    let theme = document.querySelector('#themeVal').value;
    document.querySelector('.theme').innerHTML=theme;
    let themePinyin =pinyinUtil.getPinyin(theme, ',', true, false);
    themePinyin = themePinyin.split(',');
    let themePinyinVal='';
    for(let i =0;i<themePinyin.length;i++){
        themePinyinVal+='<div class="themePinyinVal">'+themePinyin[i]+'</div>'
    }
    document.querySelector('.themePinyin').innerHTML= themePinyinVal;
    // console.log(themePinyin.length);
}