var theJSON = "";
var output = "";
var url = "";
var catagory = "home";
var apiKey = "a5a8d9167e074a03babab4ff8bef0945";
var defaultLink = "<option value=\"home\" name=\"home\">Select Catagory<\/option>";
var ajax = {} ;
var nytCatagory = [];
var serviceChannel = new XMLHttpRequest();


clearBox = function(){
  document.getElementById("outputFeed").innerHTML = "";
  console.log("CLEAR!")
}

checkCatagory = function(){
  catagory = document.getElementById("dropdown").value;
  console.log("catagory is " + catagory);
  ajax.setup()
}

ajax.populateFeed = function(){
  if(catagory=="home"){
    clearBox();
    for (var i=0; i<theJSON.results.length; i++){
      if(theJSON.results[i].multimedia.length != 0){
        output += "<a href='" + theJSON.results[i].short_url + "'>";
        output += "<img src='" + theJSON.results[i].multimedia[1].url + "'><br>";
        output += theJSON.results[i].title;
        output += "</a><br><br>";
      }
    } 
  } else {
      clearBox();
    for (var i=0; i<theJSON.results.length; i++){
      if(theJSON.results[i].section==catagory){
        if(theJSON.results[i].multimedia.length != 0){
          output += "<a href='" + theJSON.results[i].short_url + "'>";
          output += "<img src='" + theJSON.results[i].multimedia[1].url + "'><br>";
          output += theJSON.results[i].title;
          output += "</a><br><br>";
        }
      }
    }
  }
  document.getElementById("outputFeed").innerHTML=output;
  console.log("Output Complete");
  output="";
}

ajax.compileList = function() {
  //console.log("Start Compile List");
  for (var i=0; i<theJSON.results.length; i++){
    var n = nytCatagory.indexOf(theJSON.results[i].section);
    if(n==-1){
      nytCatagory.push(theJSON.results[i].section);
    }
  }
  document.getElementById("dropdown").innerHTML=defaultLink;
  console.log(nytCatagory);
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
  console.log(defaultLink);
}

window.addEventListener("load", ajax.setup,true);