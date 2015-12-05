function getSlides() {
  $.getJSON('data/data.json')
  .done( function(data){                                 // SERVER RETURNS DATA
  	$.each(data.slides, function(key, val) {
  		console.log(key + " : " + val);
      $("#buttons").append("<button id='btn" + key + "'>" + (key+1) + "</button>");
     
      $("#btn" + key).on('click', function () {
        $(".slide").hide(500);
        $("#slide" + key).show(500);
      });

  		msg = "<div class='slide' id='slide" + key + "'>"; 
  		msg += "</div>";

  		$('#content').append(msg); 

  		$('#slide' + key).css("background", "url(" + val.image + ") top left no-repeat");
      $('#slide' + key).hide();

      if (key === 0) {
        $('#slide0').show();
      };
	  });
   
     
    $('#buttons').append("<button id='prev'>&laquo;</button><button id='next'>&raquo;</button>"); 
     

    $("#prev").on ('click', function () {
      
        var i = $(".slide:visible").index();
        
        if (i < 1) {
            $(".slide:visible").animate({
                width: ["toggle", "easeOutExpo"],
                opacity: "toggle"
            }, 500, function() {
                
            });
            $(".slide:last").animate({
                width: ["toggle", "easeInExpo"],
                opacity: "toggle"
            }, 500, function() {
            });      
        } else {
            $(".slide:visible").animate({
                width: ["toggle", "easeOutExpo"],
                opacity: "toggle"
            }, 500, function() {
                
            }).prev(".slide").animate({
                width: ["toggle", "easeInExpo"],
                opacity: "toggle"
            }, 500, function() {
            });      
        };
        
    });    
    
    $("#next").on ('click', function () {

        var i = $(".slide:visible").index();
        var len = $(".slide").length - 1;
        
        if (i < len) {
                    $(".slide:visible").animate({
                height: ["toggle", "easeOutExpo"],
                opacity: "toggle"
            }, 700, function() {
                
            }).next(".slide").animate ({
                height: ["toggle", "easeInExpo"],
                opacity:"toggle"
            }, 700, function() {
            });
        } else {
            $(".slide:visible").animate({
                height: ["toggle", "easeOutExpo"],
                opacity: "toggle"
            }, 700, function() {
                
            });
            $(".slide:first").animate ({
                height: ["toggle", "easeInExpo"],
                opacity:"toggle"
            }, 700, function() {
            });
        };
    });                           
  }).fail( function() {     
                               // THERE IS AN ERROR
    $('#content').text('Sorry, we cannot load data.'); 
      // Show error message 
  }).always( function() {                                // ALWAYS RUNS
     var reload = '<a id="refresh" href="#">';           // Add refresh link
     reload += 'Reload</a>';
     $('#reload').html(reload);                          // Add refresh link
     $('#refresh').on('click', function(e) {             // Add click handler
       e.preventDefault();                               // Stop link
       getSlides();                                      
     });
  }); 
}

$(document).ready(function() {

	getSlides();  
    
});

