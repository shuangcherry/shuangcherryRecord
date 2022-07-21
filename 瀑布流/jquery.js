// JavaScript Document
$(window).on('load',function()
{
	waterFall();
	var dataInt={'data':[{'src':'11.jpg'},{'src':'12.jpg'},{'src':'13.jpg'}]};
	$(window).on('scroll',function(){
		if(checkScrollSlide())
		{
			$.each(dataInt.data,function(key,value){
				var box1=$('<div>').addClass('box').appendTo($('#main'));	
				$('<img>').addClass('image').attr('src','img/'+$(value).attr('src')).appendTo($(box1));
			})
			waterFall();	
		}
	})	
})

function waterFall()
{
	var $boxs=$('#main>.box');
	var w=$boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$('#main').width(cols*w).css('margin','0 auto');
	var arrh=[];
	$boxs.each(function(index,value)
	{
		var colh=$boxs.eq(index).outerHeight();
		if(index<cols)
		{
			arrh[index]=colh;	
		}
		else
		{
			var minh=Math.min.apply(null,arrh);
			var minhindex=$.inArray(minh,arrh);
			$(value).css({
				'position':'absolute',
				'top': minh+'px',
				'left': w*minhindex+'px'
			})	
			arrh[minhindex]+=$(value).outerHeight();
		}
	})
}

function checkScrollSlide()
{
	var $lastBox=$('#main>.box').last();
	var lasth=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);	
	var scrollh=$(window).scrollTop();
	var scrh=$(window).height();
	return (lasth<scrollh+scrh)?true:false;
}