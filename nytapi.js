var apiKey =  "a5a8d9167e074a03babab4ff8bef0945";

function successFn(e){
            var target= e.target;
            var theData = target.responseText;
            var output = "", i = 0, theJSON = "";

            theJSON = JSON.parse(theData);
            console.log(theJSON);
            for (i=0; i < theJSON.results.length; i++){
              output += "<a href='" + theJSON.results[i].url + "'>";
              output += "<img src='" + theJSON.results[i].multimedia[2].url + "'>";
              output += theJSON.results[i].title;
              output += "</a><br>";
            }

            document.getElementById("output").innerHTML=output;
        }

  function errorFn(e){
              console.log("An Error occurred. Error is ");
              console.log(e.target.status + " " + e.target.statusText);
        }

function processResults(e){
  if (e.target.status==200){
    successFn(e);
  } else {
    errorFn(e);
  }
}

function onResults(e){
      var target = e.target;
      var readyState = target.readyState;
      var httpStatus = target.status;
      if(e.target.readyState==4){
        processResults(e);
    }
}

function ready(e){
  var serviceChannel = new XMLHttpRequest();
  serviceChannel.addEventListener("readystatechange",onResults,false);
  var  url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=a5a8d9167e074a03babab4ff8bef0945";
  serviceChannel.open("GET", url, true);
  serviceChannel.send();
}

window.addEventListener("load",ready,false);