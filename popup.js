
//Progress bar
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}


function processWeatherData(response) {
  
    var location=response.resolvedAddress;
    var days=response.days;
    //console.log("Location: "+location);
    var data_for_today = location + " "+ days[0].datetime +": "+ days[0].conditions+" " + " windspeed:"+days[0].windspeed + " temp:"+days[0].temp + " visibility: " + days[0].visibility;
    //console.log(data_for_today);
    return data_for_today;
    //for (var i=0;i<days.length;i++) {
      //console.log(days[i].datetime+": tempmax="+days[i].tempmax+", tempmin="+days[i].tempmin);
    //}
  }

  async function getData(){
    const url1 = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/hunington%20beach%20pier?unitGroup=metric&key=JCQNA4KARCCKDUANKPUHSMG5V&contentType=json";
    const url3 = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Santa%20Monica%20beach?unitGroup=metric&key=JCQNA4KARCCKDUANKPUHSMG5V&contentType=json";
    const url2 = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Avalon%2CCalifornia?unitGroup=metric&key=JCQNA4KARCCKDUANKPUHSMG5V&contentType=json";

    const response1 = await fetch(url1)
    const data1 = await response1.json()

    const response2 = await fetch(url2)
    const data2 = await response2.json()

    const response3 = await fetch(url3)
    const data3 = await response3.json()

    // do what you want with data 1 - data n
    data1_weather = processWeatherData(data1);
    console.log("data processed:", data1_weather);
    document.getElementById('Huntington').innerHTML = data1_weather;

    data2_weather = processWeatherData(data2);
    console.log("data processed:", data2_weather);
    document.getElementById('Catalina').innerHTML = data2_weather;

    data3_weather = processWeatherData(data3);
    console.log("data processed:", data3_weather);
    document.getElementById('Santa Monica').innerHTML = data3_weather;
}

//Main
//  Progress bar call
getData();
//move();




