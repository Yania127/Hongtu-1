if(document.querySelector){
	//登录注册页login-content层中的层之间的转换	
	var d1=document.querySelector(".login-content .login-others");
	var d2=document.querySelector(".login-box");
	var d3=document.querySelector(".login-footer");
	var mA=d3.getElementsByTagName("a")[0];
	
	//登录注册页input
	var mAccount=document.getElementById("account"),
		mPasswd=document.getElementById("passwd");
	var mP=document.querySelectorAll(".input-inline .warning-text");
	
	var i=0;
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
	
	//登录注册页login-content层中的层之间的转换
	EventUtil.addHandler(mA,"click",function(){
		d1.className="login-others-cards";
		d2.style.display="block";
		d3.style.display="none";
	});
	
	//登录注册页input检验	
	EventUtil.addHandler(mAccount,"blur",function(){
		if(this.value==""){
			this.className="danger";
			mP[0].innerHTML="<span><i class=\"danger-icon\"></i>  账号不能为空!</span>"
			mP[0].className="warning-text show";
		}
		if(mPasswd.className=="danger"){
			mPasswd.className="";
			mP[1].className="warning-text";
		}
		
	});
	EventUtil.addHandler(mAccount,"focus",function(){
		this.className="";
		mP[0].className="warning-text";
	});
	EventUtil.addHandler(mPasswd,"blur",function(){
		if(this.value==""){
			this.className="danger";
			mP[1].innerHTML="<span><i class=\"danger-icon\"></i>  密码不能为空!</span>"
			mP[1].className="warning-text show";
		}
		if(mAccount.className=="danger"){
			mAccount.className="";
			mP[0].className="warning-text";
		}
	});
	EventUtil.addHandler(mPasswd,"focus",function(){
		this.className="";
		mP[1].className="warning-text";
	});
}else{
	alert("为了您的体验，请升级至最新版本浏览器！")
}
