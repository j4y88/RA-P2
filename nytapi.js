var theJSON = "";
var output = "";
var url = "";
var catagory = "home";
var apiKey = "a5a8d9167e074a03babab4ff8bef0945";
var ajax = {} ;
var nytCatagory = [];
var serviceChannel = new XMLHttpRequest();


ajax.filterFeed = function (e){
  for (var x=0; x<theJSON.results.length; x++){
    console.log(theJSON.result);
    if(theJSON.result[x].title==catagory){
      if((theJSON.results[i].multimedia.length) != 0){
        console.log(theJSON.results[i].multimedia.length);
        output += "<a href='" + theJSON.results[x].short_url + "'>";
        output += "<img src='" + theJSON.results[x].multimedia[1].url + "'><br>";
        output += theJSON.results[i].title;
        output += "</a><br><br>";
      }
    }
    document.getElementById("outputFeed").innerHTML=output;
    console.log("Output Complete");     
  }
}

checkCatagory = function(){
  console.log(document.getElementById("dropdown").value);
  catagory = document.getElementById("dropdown").value;
  console.log(catagory);
  ajax.filterFeed();
}

ajax.populateFeed = function(){
  for (var i=0; i<theJSON.results.length; i++){
    if((theJSON.results[i].multimedia.length) != 0){
      output += "<a href='" + theJSON.results[i].short_url + "'>";
      output += "<img src='" + theJSON.results[i].multimedia[1].url + "'><br>";
      output += theJSON.results[i].title;
      output += "</a><br><br>";
    }
    document.getElementById("outputFeed").innerHTML=output;
    console.log("Output Complete");     
  }
}
ajax.compileList = function() {
  //console.log("Start Compile List");
  for (var i=0; i<theJSON.results.length; i++){
    var n = nytCatagory.indexOf(theJSON.results[i].section);
    if(n==-1){
      nytCatagory.push(theJSON.results[i].section);
    }
  }
  console.log(nytCatagory)
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
        ajax.compileList();
        ajax.populateFeed();
      } else {
        console.log("Channel Status Error");
      }     
    }
  }
}

ajax.buildURL = function(V) {
  //console.log("Start Build");
  url="";
  var finishURL = [ "https://api.nytimes.com/svc/topstories/v2/", catagory, ".json?api-key=", apiKey];
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

//serviceChannel.open('GET', url, true);
//serviceChannel.send();
//serviceChannel.responseType = 'text';
//console.log("Service Declare Orginal");

/*
serviceChannel.onload = function () {
    console.log(serviceChannel.readyState);
    console.log(serviceChannel.status);
    if (serviceChannel.readyState === serviceChannel.DONE) {
        if (serviceChannel.status === 200) {
            theJSON = JSON.parse(serviceChannel.responseText);
            console.log(theJSON);
            for (var i=0; i < theJSON.results.length; i++){
              if(theJSON.results[i].multimedia.length != 0){
                output += "<a href='" + theJSON.results[i].short_url + "'>";
                output += "<img src='" + theJSON.results[i].multimedia[1].url + "'>";
                output += theJSON.results[i].title;
                output += "</a><br>";
              }
            }
            document.getElementById("output").innerHTML=output;
            console.log("Output Complete");        
        }
    }
}
*/


/*
theJSON = JSON.parse(serviceChannel.responseText);
console.log(theJSON);
for (var i=0; i < theJSON.results.length; i++){
if(theJSON.results[i].multimedia.length != 0){
output += "<a href='" + theJSON.results[i].short_url + "'>";
output += "<img src='" + theJSON.results[i].multimedia[1].url + "'>";
output += theJSON.results[i].title;
output += "</a><br>";
}
}
document.getElementById("output").innerHTML=output;
console.log("Output Complete");
*/
/*
document.addEventListener('click', function(event) {
    console.log(event);
    if(event.target.className === "nytCatagory"){
      var targetId = event.target.id;
      console.log(targetId);
      url = "";
      url += urla + targetId + urlb;
      console.log(url);
      serviceChannel.open('GET', url, true);
      serviceChannel.send();
      serviceChannel.responseType = 'text';
      console.log("New Address Send");
      console.log(serviceChannel.readyState);
      console.log(serviceChannel.status);
      //document.getElementById("output").innerHTML="";
      console.log("Page Reset");
    } 
}, false);
*/