(function(){
    // Vertical Timeline - by CodyHouse.co
      function VerticalTimeline( element ) {
          this.element = element;
          this.blocks = this.element.getElementsByClassName("cd-timeline__block");
          this.images = this.element.getElementsByClassName("cd-timeline__img");
          this.contents = this.element.getElementsByClassName("cd-timeline__content");
          this.offset = 0.8;
          this.hideBlocks();
      };
  
      VerticalTimeline.prototype.hideBlocks = function() {
          if ( !"classList" in document.documentElement ) {
              return; // no animation on older browsers
          }
          //hide timeline blocks which are outside the viewport
          var self = this;
          for( var i = 0; i < this.blocks.length; i++) {
              (function(i){
                  if( self.blocks[i].getBoundingClientRect().top > window.innerHeight*self.offset ) {
                      self.images[i].classList.add("cd-timeline__img--hidden"); 
                      self.contents[i].classList.add("cd-timeline__content--hidden"); 
                  }
              })(i);
          }
      };
  
      VerticalTimeline.prototype.showBlocks = function() {
          if ( ! "classList" in document.documentElement ) {
              return;
          }
          var self = this;
          for( var i = 0; i < this.blocks.length; i++) {
              (function(i){
                  if( self.contents[i].classList.contains("cd-timeline__content--hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight*self.offset ) {
                      // add bounce-in animation
                      self.images[i].classList.add("cd-timeline__img--bounce-in");
                      self.contents[i].classList.add("cd-timeline__content--bounce-in");
                      self.images[i].classList.remove("cd-timeline__img--hidden");
                      self.contents[i].classList.remove("cd-timeline__content--hidden");
                  }
              })(i);
          }
      };
  
      var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
          verticalTimelinesArray = [],
          scrolling = false;
      if( verticalTimelines.length > 0 ) {
          for( var i = 0; i < verticalTimelines.length; i++) {
              (function(i){
                  verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
              })(i);
          }
  
          //show timeline blocks on scrolling
          window.addEventListener("scroll", function(event) {
              if( !scrolling ) {
                  scrolling = true;
                  (!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
              }
          });
      }
  
      function checkTimelineScroll() {
          verticalTimelinesArray.forEach(function(timeline){
              timeline.showBlocks();
          });
          scrolling = false;
      };
  })();
  
  $(document).ready(function(){
      $("#campaign").change(function(){
          $.ajax({
              type: "GET",  
              url: "biden.csv",
              dataType: "text",       
              success: function(response)  
              {
                  document.getElementById('rcorners4').style.height='auto';
                  var gdata = [];
                  var idata = [];
                  var cdata = [];
                  var ddata = [];
                  data = $.csv.toArrays(response);
                  if($("#campaign").find(":selected").data("campaign") == "Geography"){
                      for(i = 2; i < 12; i++){
                          gdata.push(data[i][0].split(' - '));
                      }
                      document.getElementsByClassName('campaign-title')[0].innerHTML = "Geography";
                      generateHtml(gdata);
                  }
                  else if($("#campaign").find(":selected").data("campaign") == "Industries"){
                      for(i = 2; i < 12; i++){
                          idata.push(data[i][1].split(' - '));
                      }
                      document.getElementsByClassName('campaign-title')[0].innerHTML = "Industries";
                      generateHtml([], idata);
                  }
                  else if($("#campaign").find(":selected").data("campaign") == "Contributers"){
                      for(i = 2; i < 12; i++){
                          cdata.push(data[i][2].split(' - '));
                      }
                      document.getElementsByClassName('campaign-title')[0].innerHTML = "Contributers";
                      generateHtml([],[], cdata);
                  }
                  else if($("#campaign").find(":selected").data("campaign") == "Donor Demographics"){
                      for(i = 2; i < 12; i++){
                          ddata.push(data[i][3].split(' - '));
                      }
                      document.getElementsByClassName('campaign-title')[0].innerHTML = "Donor Demographics";
                      generateHtml([], [], [], ddata);
                  }
                  else{
                      document.getElementById('rcorners4').style.height='325px';
                      $(".content").empty();
                      document.getElementsByClassName('campaign-title')[0].innerHTML = "Campaign Finance";
                  }
              }   
          });
      });
  });
  
  function generateHtml(gdata, idata, cdata, ddata) {
      var html = `<div style="font-family: 'Archive', Arial, sans-serif;" class="content">`;
      $('.content').empty();
      console.log(ddata);
      if(gdata.length != 0){
          html+='<h5>Top States</h5>'
          for(i = 0; i < 5; i++){
              html+=`<b>${gdata[i][0]}</b>`
              html+=`<p>Total: ${gdata[i][1]}</p>`
              html+=`<p>Percent: Total: ${gdata[i][2]}</p>`
          }
          html+='<h5>Top 5 Zip Codes</h5>'
          for(i = 5; i < 10; i++){
              html+=`<b>${gdata[i][0]}</b>`
              html+=`<p>Total: ${gdata[i][1]}</p>`
          }
      }
      else if(idata.length != 0){
          html+="<h5>Top 5 Industries</h5>";
          for(i = 0; i < 5; i++){
              html+=`<b>${idata[i][0]}</b>`
              html+=`<p>Total: ${idata[i][1]}</p>`
          }
      }
      else if(cdata.length != 0){
          html+="<h5>Contributors</h5>";
          for(i = 0; i < 10; i++){
              html+=`<b>${cdata[i][0]}</b>`
              html+=`<p>Total: ${cdata[i][1]}</p>`
          }
      }
      else if(ddata.length != 0){
          html+="<h5>Donor Demographics</h5>";
          for(i = 0; i < 5; i++){
              if(i == 0){
                  html+=`<b>${ddata[i][0]}: </b>`
                  html+=`<p>Total: ${ddata[i][1]}</p>`
              }
              else if (i == 1 || i == 2){
                  html+=`<b>${ddata[i][0]}: </b>`
                  html+=`<p>Total: ${ddata[i][1]}</p>`
                  html+=`<p>Percent: ${ddata[i][2]}</p>`
              }
              else if (i == 3 || i == 4){
                  html+=`<b>${ddata[i][0]}: </b>`
                  html+=`<p># of contributors: ${ddata[i][1]}`
                  html+=`<p>Total: ${ddata[i][2]}</p>`
                  html+=`<p>Percent: ${ddata[i][3]}</p>`
                  html+=`<p>Average Donation: ${ddata[i][4]}</p>`
              }
          }
      }
      $('.campaign').append(html);
  }