$(document).ready(function(){
	if(window.matchMedia("(max-width: 1200px)").matches){
		$(".burger").click(function(){
			$('#nav-links').toggleClass("show-nav");
		});
		$("#dropbtn1").click(function(){
			$("#dropdown1").toggleClass("show1");
			$("#dropdown2").removeClass("show2");
			$("#dropdown3").removeClass("show3");
        });
		$("#dropbtn2").click(function(){
			$("#dropdown1").removeClass("show1");
			$("#dropdown2").toggleClass("show2");
			$("#dropdown3").removeClass("show3");
		});
		$("#dropbtn3").click(function(){
			$("#dropdown1").removeClass("show1");
			$("#dropdown2").removeClass("show2");
			$("#dropdown3").toggleClass("show3");
		});
    }

    for(i = 0;i < document.getElementsByClassName("dropdown-content-in").length;i++){
		document.getElementsByClassName("dropdown-content-in")[i].style.top =  i*48 + 'px';	
	}
});
