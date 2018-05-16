if(document.querySelector){
	var hUl=document.getElementById("nav");
	var hLi=hUl.getElementsByTagName("li");
	var h=document.querySelector(".header");
	var hSubNav=document.querySelectorAll(".header-nav .nav-list");
	var hSearch=document.querySelector(".header-search");
	var hInput=document.getElementById("header-search-text");
	var hResult=document.getElementById("header-search-result");
	
	var sInput=document.getElementById("search-text");
	var sResult=document.getElementById("search-result");
	var sImg=document.querySelectorAll(".slide-img li");
	var sNum=document.querySelectorAll(".slide-count li");
	var slide=document.querySelector(".lunbo-slide");
	var backward=document.querySelector(".backward");
	var forward=document.querySelector(".forward");
	
	var i=index=0;
	var timer=player=null;
	
	
	var EventUtil={
		addHandler: function(element,type,handler){
			if(element.addEventListener){
				element.addEventListener(type,handler,false);
			}else if(element.attachEvent){
				element.attachEvent("on"+type,handler);
			}else{
				element["on"+type]=handler;
			}
		},
		removeHandler: function(element,type,handler){
			if(element.removeEventListener){
				element.removeListener(type,handler,false);
			}else if(element.attachEvent){
				element.attachEvent("on"+type,handler);
			}else{
				element["on"+type]=handler;
			}
		}
	};
	
	//头部二级导航栏
	for(i=1;i<hLi.length;i++){
		hLi[i].index=i-1;
		EventUtil.addHandler(hLi[i],"mousemove",function(){
			hSubNav[this.index].style.display="block";
		});
		EventUtil.addHandler(hLi[i],"mouseout",function(){
			hSubNav[this.index].style.display="none";
		});
	}
	
	//页面y方向滚动到一定位置头部搜索框出现，一级导航消失
	EventUtil.addHandler(window,"scroll",function(event){
		var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
		scrollTop > 72 ? h.className="header header-fix" : h.className="header";
		scrollTop > 256 ? (hUl.style.display="none", hSearch.style.display="block")
						: (hUl.style.display="block", hSearch.style.display="none");
	});	
	
	//搜索框点击出现对应层
	EventUtil.addHandler(sInput,"focus",function(){
		sResult.style.display="block";
	});
	EventUtil.addHandler(sInput,"blur",function(){
		sResult.style.display="none";
	});
	
	//图片轮播功能区
	var show=function(a){
		index=a;
		var alpha=0;
		for(i=0;i<sNum.length;i++){
			sNum[i].className="";
		}
		sNum[index].className="current";
		clearInterval(timer);
		for(i=0;i<sImg.length;i++){
			sImg[i].style.opacity=0;
			sImg[i].style.filter="alpha(opacity=0)";
		}
		//20*50=1000ms展现一张图
		timer=setInterval(function(){
			alpha+=2;
			alpha>100 && (alpha=100);
			sImg[index].style.opacity=alpha/100;
			sImg[index].style.opacity="alpha(opacity=" + alpha + ")";
			alpha==100 && clearInterval(timer);
		},20);
	};
	
	var autoPlay=function(){
		//4秒换一张图
		play=setInterval(function(){
			index++;
			index>=sImg.length && (index=0);
			show(index);
		},4000);
	};
	
	for(i=0;i<sNum.length;i++){
		sNum[i].index=i;
		EventUtil.addHandler(sNum[i],"mouseover",function(){
			show(this.index);
		});
	}
	
	EventUtil.addHandler(slide,"mouseover",function(){
		/*实现左右两个小框的淡入淡出*/
		backward.className="backward bfward";
		forward.className="forward bfward";
		clearInterval(play);
	});
	
	EventUtil.addHandler(slide,"mouseout",function(){
		backward.className="backward";
		forward.className="forward";
		autoPlay();
	});
	
	EventUtil.addHandler(backward,"click",function(){
		index--;
		index<0 && (index=sImg.length-1);
		show(index);
	});
	
	EventUtil.addHandler(forward,"click",function(){
		index++;
		index>=sImg.length && (index=0);
		show(index);
	});
	
	autoPlay();
}else{
	alert("为了您的体验，请升级至最新版本浏览器！")
}
