var theJSON = "";
var output = "";
var url = "";
var apiKey = "a5a8d9167e074a03babab4ff8bef0945";
var defaultLink = "<option value=\"home\" name=\"home\">Selection...<\/option>";
var defaultlink2 = "<option value=\"home\" name=\"home\">Top Stories<\/option>";
var ajax = {};
var serviceChannel = new XMLHttpRequest();

clearBox = function(){
  document.getElementById("outputFeed").innerHTML = "";
}
checkCatagory = function(){
  var loader = document.getElementById('loader-wrapper');
  var top = document.getElementById('nav');
  nav.className = 'upper flex flex-col md-flex-row flex-align-center md-flex-align-dt margin-10 calapse';
  loader.className = "unhide";
  var choiceSelect = document.getElementById("dropdown").value;
  var unHide = document.getElementById("outputFeed");
  unHide.style.visibility = 'visible';
  ajax.setup(choiceSelect);
  //debugger;
  loader.className = "hide";
}

ajax.populateFeed = function(select){
  clearBox();
  var count=0;
  for (var i=0; i<theJSON.results.length && count<12; i++){
    if(theJSON.section==select){
      if(theJSON.results[i].multimedia.length != 0){
        count = count+1;
        output += '<article class="md-flex-basis-tb md-flex-basis-dt">';
        output += '<a href="' + theJSON.results[i].url + '" style="background: url(' + theJSON.results[i].multimedia[4].url + ') center center no-repeat; background-size: cover;" class="feedImage">';
        output += '<h3 class="feedAbstract to-fade">' + theJSON.results[i].abstract + '</h3>';
        output += '</a></article>';
        
      }
    }
  }
  document.getElementById("outputFeed").innerHTML=output;
  output="";
}

ajax.send = function(select) {
  serviceChannel.onreadystatechange = function() {
    if (serviceChannel.readyState == 4){
      if (serviceChannel.status == 200){
        theJSON = JSON.parse(serviceChannel.responseText);   
        ajax.populateFeed(select);      
      }
    }
  }
}

ajax.buildURL = function(select) {
  url="";
  if(select=="" || select==undefined){
    var finishURL = ["https://api.nytimes.com/svc/topstories/v2/", "home", ".json?api-key=", apiKey];
  } else {
    var finishURL = ["https://api.nytimes.com/svc/topstories/v2/", select, ".json?api-key=", apiKey];
  }
  for(var i=0; i<=(finishURL.length-1); i++){
    url += finishURL[i];
  }
}

ajax.setup = function(select) {
  ajax.buildURL(select);
  serviceChannel.open('GET', url, true);
  serviceChannel.send();
  ajax.send(select);
}

window.addEventListener("load", ajax.setup(),true);




