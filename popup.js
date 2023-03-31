
  window.onload=function(){
    //Default content
    var default_content = document.getElementById('default_content');
    default_content.style.display="block";
    chrome.runtime.sendMessage({
      msg:"load_window"
    });

      // button
      var btn = document.getElementById('premium_button');
      if(btn){
      btn.addEventListener('click', function() {
          // Sends message to background script
          chrome.runtime.sendMessage({
            msg: "click", 
            data: {
                subject: "premium_button",
                content: "Just clicked."
              }
            });
      });
    }

      // premium content
      var premium = document.getElementById("premium_content");
      var drop_down = document.getElementById("locations");
      var huntington = document.getElementById("huntington");
      var catalina = document.getElementById("catalina");
      var santa_monica = document.getElementById("santa_monica");
      var venice = document.getElementById("venice");

      premium.style.display = "block";
      const locations = [huntington,catalina,santa_monica,venice];
      function hide_content(locations){
        for(i=0;i<locations.length;i++){
          locations[i].style.display = "none";
        }
      }
      hide_content(locations);


          // dropdown event listener
      drop_down.addEventListener('change', function(){
        if(this.value!= "none"){
          console.log("sending dropdown:", this.value);
          chrome.runtime.sendMessage({
            msg:"dropdown_select",
            data:{subject:"premium_button",content:this.value}
          });
        }

      })
      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if (request.msg === "user_paid") {
              //  To do something
              //console.log("displaying premium content.");
              //default_content.style.display = "none";
              //premium.style.display = "block";
              console.log("popup received message back(background):", request.data.content);
              if(request.data.content!=null){
                hide_content(locations);
                var selection = document.getElementById(request.data.content);
                selection.style.display = "block";
              }
          }
        }
      );
  };


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
    const url4 = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/venice%20beach%2CCA?unitGroup=metric&key=JCQNA4KARCCKDUANKPUHSMG5V&contentType=json";

    const response1 = await fetch(url1)
    const data1 = await response1.json()

    const response2 = await fetch(url2)
    const data2 = await response2.json()

    const response3 = await fetch(url3)
    const data3 = await response3.json()

    const response4 = await fetch(url4);
    const data4 = await response4.json();

    // do what you want with data 1 - data n
    data1_weather = processWeatherData(data1);
    console.log("data processed:", data1_weather);
    document.getElementById('Huntington_data').innerHTML = data1_weather;

    data2_weather = processWeatherData(data2);
    console.log("data processed:", data2_weather);
    document.getElementById('Catalina_data').innerHTML = data2_weather;

    data3_weather = processWeatherData(data3);
    console.log("data processed:", data3_weather);
    document.getElementById('Santa_Monica_data').innerHTML = data3_weather;

    data4_weather = processWeatherData(data4);
    console.log("data processed:", data4_weather);
    document.getElementById('venice_data').innerHTML = data4_weather;
}

//Main
//  Progress bar call
getData();
//move();
//<div id="myProgress">
  //      <div id="myBar">loading...</loading></div>
    //  </div>

//<h2>Pipline:</h2>
//        <iframe width="720" height="579" src="https://www.youtube.com/watch?v=VI8Wj5EwoRM?autoplay=1" title="Pipleine Beach Cam powered by EXPLORE.org" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//       <div id="Pipleine" ></div>




