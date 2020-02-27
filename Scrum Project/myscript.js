
    $("#getInfo").click(function(){
      if(navigator.geolocation){
 navigator.geolocation.getCurrentPosition(showPosition);
}else{
  console.log('not supported');
}

 function showPosition(position){
   var lat = position.coords.latitude;
   var long = position.coords.longitude;
   console.log(lat+' got latitude <-- and got longitude --> '+long);
   console.log('trying to get data from API ... ');
   $.ajax({
     type:'GET',
  url:"https://api.wunderground.com/api/cdcb336cfe45d4c5/conditions/q/"+lat+","+long+".json",
     contentType:'aplication/json',
     dataType:'jsonp',
     success:function(jsonResponse){

       city.innerHTML = jsonResponse.current_observation.display_location.city;

   if($('#cels').is(':checked')) { temp.innerHTML = jsonResponse.current_observation.temp_c+"C"; }
         else{
           temp.innerHTML = jsonResponse.current_observation.temp_f+"F";
         }
        weather.innerHTML = jsonResponse.current_observation.icon;
       var img_src = jsonResponse.current_observation.icon_url;
       $('#img').attr('src',img_src);
     }


    });
   console.log('done!');
 }
});

function getWeather(city){
	if (city) {
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if (this.status==200 && this.readyState==4) {
			var formattedData=formatWeather(JSON.parse(xhr.responseText));
			document.getElementById("weather-data").innerHTML=formattedData;
			document.getElementById('cityname').value="";
		}
	};
	xhr.open("GET","http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=185c2fd42ef3977c784eba48c3ff5a6d");
	xhr.send();
  }
  else{
  	var error='<div class="alert alert-danger alert-dismissible text-center" role="alert">';
		error+='<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		error+='You must enter a city name!</div>';
	document.getElementById('error').innerHTML=error;
  }
	return false;
}

function formatWeather(data){
	return "<h3>Current Weather for " + data.name + ", " + data.sys.country + "</h3>" +
			"<p>Weather: " + data.weather[0].main+ "</p>" +
			"<p>Weather Description: " + data.weather[0].description +"<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'/>" + "</p>" +
			"<p>Temperature: " + data.main.temp + "&deg;C</p>" +
			"<p>Pressure: " + data.main.pressure + "hPa</p>" +
			"<p>Humidity: " + data.main.humidity + "%</p>" +
			"<p>Min Temperature: " + data.main.temp_min + "&deg;C</p>" +
			"<p>Max Temperature: " + data.main.temp_max + "&deg;C</p>" +
			"<p>Wind Speed: " + data.wind.speed + "m/s</p>";
}
