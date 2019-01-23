/* script.js */


/* Now Playing */
$(document).on("pagebeforeshow", "#now_playing", function(){
	$.getJSON("movies.json", function(data){
		$("#movielist").html("");
		var totalcon = data.mov.length;
		for( num=0 ; num < totalcon ; num++){
			$("#movielist").append('<li id="' + num + '" class="ui-btn">' + 
				'<a href="#details" data-transition="slide">' + '<img src="' + data.mov[num].url + '" style="height:100"/><h3>' 
				+ data.mov[num].title + '</h3></a></li>');
		}	

		$("#movielist").on('click', 'li', function(){
			$("#moviedetail").html("");
			var sid = Number($(this).attr('id'));
			$("#moviedetail").append('<img src="' + data.mov[sid].url + '" class="detail_image"/><h2>'
			+ data.mov[sid].title + '</h2>');
			$("#moviedetail").append('<h5>' + data.mov[sid].release + '<h5>');
			$("#moviedetail").append('<h5>' + data.mov[sid].length + '<h5>');
			$("#moviedetail").append('<h5>' + data.mov[sid].genre + '<h5>');
			$("#moviedetail").append('<div  data-role="collapsible"><h2>Synopsis</h2><p>' + data.mov[sid].synopsis + '</p></div>');
			$("#moviedetail").append('<iframe id="ytplayer" type="text/html" src="https://www.youtube.com/embed/' + data.mov[sid].iframe 
			+ '" frameborder="0"></iframe>	')
					
		});
	});
});

/* save movie reservation info to localstorage */
$(document).ready(function(){
	$("#confirm").click(function(){
		stitle = $("#movieselect").val();
		sdate = $("#date1").val();
		smovietime = "";
		$b = $("input[name='movietime']:checked");
		smovietime = $b.attr('value');
		localStorage.setItem("stitle", stitle);
		localStorage.setItem("sdate", sdate);
		localStorage.setItem("smovietime", smovietime);
		
		var datep = $('#date1').val();

		//date validation
		if(Date.parse(datep)-Date.parse(new Date())<0)
		{
		   alert("Selected date is in the past");
		}
		else
			alert("confirmed");
	});
});

/* when click movie list from json file */
$(document).on("click", "#movieselect", function(){
	$.getJSON("movies.json", function(data){
		$("#movieselect").html("");
		var totalcon = data.mov.length;
		for( num=0 ; num < totalcon ; num++){
			$("#movieselect").append('<option value="' + data.mov[num].title + '">' + data.mov[num].title + '</option>');
		}	
	});
});    


/* View Ticket Page */
$(document).on("pagebeforeshow", "#viewticketpage", function(){
		title = "<h2>" + localStorage.getItem("stitle") + "</h2>";
		date = "<h3>" + localStorage.getItem("sdate") + "</h3>";
		time = "<h3>" + localStorage.getItem("smovietime") + "</h3>";
		ticketinfo = title + date +  time + "<h3>Seats: 4A</h3>";
		$("#view").html(ticketinfo);
	});		

/* handle swipe action */
$(document).on("pageshow", "#main_page", function(){
	$("#main_page").on("swiperight",callswiperight);
	
	function callswiperight(event){
		$.mobile.changePage("#now_playing");
	}
});

$(document).on("pageshow", "#now_playing", function(){
	$("#now_playing").on("swipeleft",callswipeleft);
	
	function callswipeleft(event){
		$.mobile.changePage("#main_page");
	}
});




