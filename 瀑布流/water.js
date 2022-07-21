// JavaScript Document
window.onload=function(){
	waterFall('main','box');
	var dataInt={'data':[{'src':'11.jpg'},{'src':'12.jpg'},{'src':'13.jpg'}]};
	var oparent=document.getElementById('main');
	window.onscroll=function(){
		if(onScrollSlide())
		{
				for(var i=0;i<dataInt.data.length;i++)
				{
					var box1=document.createElement('div');
					box1.className="box";
					oparent.appendChild(box1);
					var img1=document.createElement('img');
					img1.className="image";
					img1.src="img/"+dataInt.data[i].src;
					box1.appendChild(img1);	
				}
			waterFall('main','box');	
		}
	}
}

function waterFall(parent,box)
{
	var oParent=document.getElementById(parent);
	var boxs=getElementByClassName(box);
	var boxw=boxs[0].offsetWidth;           // 每个图片盒子的宽度
	var cols=Math.floor(document.documentElement.clientWidth/boxw); /* 得出一行最大可容纳图片个数*/
	oParent.style.cssText='width:'+boxw*cols+'px;margin:0 auto'; // 设置main的宽度且居中显示
	var colh=[];
	for(var j=0;j<boxs.length;j++)
	{
		var ch=boxs[j].offsetHeight
		if(j<cols)
		{
			colh[j]=ch;	
		}
		else
		{
			var minH=Math.min.apply(null,colh);
			var index=getIndex(colh,minH);
			boxs[j].style.position='absolute';
			boxs[j].style.top=minH+'px';
			boxs[j].style.left=boxw*index+'px';
			colh[index]+=boxs[j].offsetHeight;
		}
	}
}

function getElementByClassName(clsName){
     var arr=new Array();
	 var oBoxs=document.body.getElementsByTagName('div');
	 for(var i=0;i<oBoxs.length;i++)
	 {
		if(oBoxs[i].className==clsName)
		{
			arr.push(oBoxs[i]);
		}
	 }
	 return arr;
}

function getIndex(cols,minheight)
{
	for(var i=0;i<cols.length;i++)
	{
		if(cols[i]==minheight)
		    return i;	
	}
}

function onScrollSlide()
{	
	var boxs=getElementByClassName('box');
	var boxlast=boxs[boxs.length-1].offsetTop+Math.floor(boxs[boxs.length-1].offsetHeight/2);
	var clientTop=document.body.scrollTop||document.documentElement.scrollTop;
	var client=document.documentElement.clientHeight;
    return (boxlast<clientTop+client)? true : false;
}