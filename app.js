$(document).ready(function(){
	var data;
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
	$("#container").change(function(){
		$("#csv-display").css("display:none;");
		$.ajax({
		  	type: "GET",  
		  	url: "data.csv",
		  	dataType: "text",       
		  	success: function(response)  
		  	{
		  		var rdata = [];
				data = $.csv.toArrays(response);
				for(i = 1; i < 52;  i++){
					if(data[i][0] == $("#container").find(':selected').data("state")){
						rdata.push(data[0]);
						rdata.push(data[i]);
					}
					else if($("#container").find(":selected").data("state") == "None"){ 
						rdata.push("selected");
					}
				}
				generateHtmlTable(rdata);
		  	}   
		  });
		});
});

var cnt = 0;

function generateHtmlTable(data) {
	cnt++;
    var html = `<div" id=${cnt} class="item">`
	  if(data[0] == "selected"){
		$('#csv-display').empty();
	  }
      else if(typeof(data[0]) === 'undefined'){
      	return null;
	  }
      else {
		$.each(data, function( index, row ) {
		  //bind header
		  if(index != 0) {
			$.each(row, function( index, colData ) {
				if(index == 0){
					html+=`<h1 class="item-heading">${colData}</h1>`
				}
				else if(index == 1){
					html+=`<p class="sub-heading"><b>In Person Registration Deadline: </b>${colData}</p>`
				}
				else if(index == 2){
					html+=`<p class="sub-heading"><b>Postmarked Mail Registration Deadline: </b>${colData}</p>`
				}
				else if(index == 3){
					html+=`<p class="sub-heading"><b>Online Registration Deadline: </b>${colData}</p>`
				}
				else if(index == 4 && colData !="#"){
					html+="<p class='sub-heading'><b>Link to Registration:<br/></b></p>"
					html += '<a href="';
					html += "register.html";
					html += '"><button class="tlink">'+'Register Here'+'</button></a>';
				}
				else if(colData == "#"){
					html+='<p class="sub-heading">No Online Registration</span>'
				}
				else if(index == 5){
					html+="<p class='sub-heading'><b>Link to Check Polling Place:<br/></b></p>"
					html += '<a href="';
					html += 'poll.html';
					html += '"><button class="tlink">'+'Check Here'+'</button></a>';
				}
				else{
					html += `<p>${colData}</p>`;
				}
			});
			html+="<p class='sub-heading'><b>Link to Verify Registration Status:<br/></b></p>"
			html+='<a href="verify.html"><button id="verify" class="tlink">Verify Here</button></a>'
		  }
		});
		html += '</div>';
		$(`#${cnt-1}`).remove();
		$('#csv-display').append(html);
	  }
	}	