var theJSON = "";
var output = "";
var url = "";
var catagory = "";
var apiKey = "a5a8d9167e074a03babab4ff8bef0945";
var defaultLink = "<option value=\"home\" name=\"home\">Selection...<\/option>";
var defaultlink2 = "<option value=\"home\" name=\"home\">Top Stories<\/option>";
var ajax = {};
var nytCatagory = [];
var serviceChannel = new XMLHttpRequest();


clearBox = function(){
  document.getElementById("outputFeed").innerHTML = "";
  //console.log("CLEAR!")
}

checkCatagory = function(){
  catagory = document.getElementById("dropdown").value;
  //console.log("catagory is " + catagory);
  ajax.setup()
}

ajax.populateFeed = function(){
  if(catagory=="home"){
    clearBox();
    var count =0;
    for (var i=0; i<theJSON.results.length &&  count < 12; i++){
      if(theJSON.results[i].multimedia.length != 0){
        count = count+1;
        console.log(count);
        output += '<section class="feedCell md-flex-basis-tb md-flex-basis-dt">';
          output += '<a href="' + theJSON.results[i].url + '" style="background: url(' + theJSON.results[i].multimedia[4].url + ') center center no-repeat; background-size: auto 100%;" class="feedImage">'
          output += '<h3 class="feedAbstract">' + theJSON.results[i].abstract + '</h3>';
          output += '</a></section>';
        }
    } 
  } else {
    clearBox();
    var count =0;
    for (var i=0; i<theJSON.results.length && count < 12; i++){
      if(theJSON.results[i].section==catagory){
        if(theJSON.results[i].multimedia.length != 0){
          count = count+1;
          console.log(count);
          output += '<section class="feedCell md-flex-basis-tb md-flex-basis-dt">';
          output += '<a href="' + theJSON.results[i].url + '" style="background: url(' + theJSON.results[i].multimedia[4].url + ') center center no-repeat; background-size: auto 100%;" class="feedImage">'
          output += '<h3 class="feedAbstract">' + theJSON.results[i].abstract + '</h3>';
          output += '</a></section>';
        }
      }
    }
  }
  document.getElementById("outputFeed").innerHTML=output;
  //console.log("Output Complete");
  output="";
}

ajax.compileList = function() {
  //console.log("Start Compile List");
  //console.log(theJSON);
  for (var i=0; i<theJSON.results.length; i++){
    var n = nytCatagory.indexOf(theJSON.results[i].section);
    if(n==-1){
      nytCatagory.push(theJSON.results[i].section);
    }
  }
  document.getElementById("dropdown").innerHTML=defaultLink + defaultlink2;
  //console.log(nytCatagory);
  for(var i=0; i<nytCatagory.length; i++){
    var target = document.getElementById("dropdown");
    var opt = nytCatagory[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    target.appendChild(el);
  }
}

ajax.send = function(event) {
  //console.log("Start Send");
  serviceChannel.onreadystatechange = function() {
    if (serviceChannel.readyState == 4){
      //console.log(serviceChannel.readyState);
      if (serviceChannel.status == 200){
        //console.log(serviceChannel.status);
        theJSON = JSON.parse(serviceChannel.responseText);   
        document.getElementById("dropdown").innerHTML="";
        ajax.compileList();
        ajax.populateFeed();      
      }
    }
  }
}

ajax.buildURL = function(V) {
  //console.log("Start Build");
  url="";
  var finishURL = [ "https://api.nytimes.com/svc/topstories/v2/", "home", ".json?api-key=", apiKey];
  for(var i=0; i<=(finishURL.length-1); i++){
    url += finishURL[i];
  }
}

ajax.setup = function() {
  //console.log("Start Setup");
  ajax.buildURL();
  //console.log(url);
  serviceChannel.open('GET', url, true);
  serviceChannel.send();
  //console.log("Setup complete");
  ajax.send();
}

window.addEventListener("load", ajax.setup,true);