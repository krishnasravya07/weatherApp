
function weather() {
	  var table=""
	  var location = document.getElementById("location");
	  var apiKey = 'a626d1a1dd149a1f8b10811f0d499d04'; // PLEASE SIGN UP FOR YOUR OWN API KEY 
	                                                   //Register in https://openweathermap.org/api
	  
	  
	  // Does this browser support geolocation?
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(locationSuccess);
		}
		else{
			showError("Your browser does not support Geolocation!");
		}

	 // Get user's location, and use OpenWeatherMap
		// to get the location name and weather forecast

  function locationSuccess(position)  {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		location.innerHTML = 'Latitude is ' + latitude + '° <br> Longitude is ' + longitude + '°';
	    var weatherAPI = 'http://api.openweathermap.org/data/2.5/forecast?lat='+position.coords.latitude+
						'&lon='+position.coords.longitude+'&units=Imperial&APPID='+apiKey;
		var request = new XMLHttpRequest();
	    request.open('GET', weatherAPI, true);

	    request.onload = function() {
	     if (request.status >= 200 && request.status < 400) {
		// Success!
			var data = JSON.parse(request.responseText);
			document.getElementById('temp').innerHTML= parseInt(data.list[0].main.temp )+ '°F';
			document.getElementById('location').innerHTML=data.city.name +" " + data.city.country;
		
			var iconcode = data.list[0].weather[0].icon;
			var iconurl= "http://openweathermap.org/img/w/" + iconcode + ".png";
			document.getElementById("conditionsDesc").innerHTML=data.list[0].weather[0].description;
			document.getElementById("icon").src = iconurl;
		 
		//current 5 day forecast dynamic table
				table += "<table>"
				table +="<tr>"+"<th>"+"DAY"+"</th>"+"<th>"+"DESCRIPTION"+"</th>"+"<th>"+"HIGH/LOW"+"</th>"+"<th>"+"WIND"+"</th>"+"<th>"+"HUMIDITY"+"</th>"+"</tr>";
			  
			
				for(var y in data.list){ 
				if (y<=40&&y%8===0){
					//changing date format using toDateString()
					var d = new Date(data.list[y].dt_txt).toDateString();
					
					//using dynamic weather icons from API
					for(var x in data.list[y].weather)
					{
						var desc=data.list[y].weather[x].description;
						 var iconcode1=data.list[y].weather[x].icon;
						 var iconurl1="http://openweathermap.org/img/w/" + iconcode1 + ".png";
						            
					        }
					// changing Float value to Int		
					var windSpeed=parseInt(data.list[y].wind.speed);
					
					table += "<tr>"+"<td>" + d+"\n"+"</td>"+"<td>"+desc+"<br/>"+"<img src="+iconurl1+" "+"alt='weathericon'>"+"</td>"+
			                 "<td>" + parseInt(data.list[y].main.temp_max)+'°F'+'/'+parseInt(data.list[y].main.temp_min)+'°F'+"\n"+"</td>"+
							  "<td>" + windSpeed+" mph"+"</td>"+
							  "<td>" + data.list[y].main.humidity+"%"+"</td>"+"</tr>";
			     
				}
							
					
				}
			
			table += "</table>"        
			document.getElementById("table").innerHTML = table; 
		   	
		
	     } 
	 };

	 request.onerror = function() {
	 console.log("request not processed")
	 };
 
	 request.send();								
		

	  location.innerHTML = "Locating...";
	}
	
 }

 
 //Get Users ZipCode and display the 
 
/*  function zipCodeweather(){
	 var table1="";
	 var zipCode = document.getElementById("zipCode").value;
	 
	 var apiKey1 = '06b5e1ce26a187b22d0131e74dfbc672';
	 var weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?zip='+zipCode+',us&units=Imperial&APPID='+apiKey1;
	
	 var request = new XMLHttpRequest();
	
	 request.open('GET', weatherURL, true);
	request.onload = function() {
		 
	     if (request.status >= 200 && request.status < 400) {
		// Success!
			var data1 = JSON.parse(request.responseText);
			
			
			document.getElementById('ziplocation').innerHTML=data1.city.name +" " + data1.city.country;
		
			
		//zipcode 5 day forecast table
				table1 += "<table>"
				table1 +="<tr>"+"<th>"+"DAY"+"</th>"+"<th>"+"DESCRIPTION"+"</th>"+"<th>"+"HIGH/LOW"+"</th>"+"<th>"+"WIND"+"</th>"+"<th>"+"HUMIDITY"+"</th>"+"</tr>";
			  
			
			for(var i in data1.list){ 
				if (i<=40&&i%8===0){
					var d = new Date(data1.list[i].dt_txt).toDateString();
					for(var j in data1.list[i].weather)
					{
						var desc=data1.list[i].weather[j].description;
						 var iconcode1=data1.list[i].weather[j].icon;
						 var iconurl1="http://openweathermap.org/img/w/" + iconcode1 + ".png";
						            
					        }
					var windSpeed=parseInt(data1.list[i].wind.speed);
					
					table1 += "<tr>"+"<td>" + d+"\n"+"</td>"+"<td>"+desc+"<br/>"+"<img src="+iconurl1+" "+"alt='weathericon'>"+"</td>"+
			                 "<td>" + parseInt(data1.list[i].main.temp_max)+'°F'+'/'+parseInt(data1.list[i].main.temp_min)+'°F'+"\n"+"</td>"+
							  "<td>" + windSpeed+" mph"+"</td>"+
							  "<td>" + data1.list[i].main.humidity+"%"+"</td>"+"</tr>";
			     
				}
							
					
				}
			
			table1 += "</table>"        
			document.getElementById("searchTable").innerHTML = table1;
		
	     } 
	 };
	 request.onerror = function() {
	 
	 };
	  request.send();
 } */
	





										