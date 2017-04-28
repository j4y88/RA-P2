var theJSON = "";
var output = "";
var url = "";
var loc = ""
var choice = "";
var apiKey = "a5a8d9167e074a03babab4ff8bef0945";
var defaultLink = "<option value=\"home\" name=\"home\">Selection...<\/option>";
var defaultlink2 = "<option value=\"home\" name=\"home\">Top Stories<\/option>";
var ajax = {};
var nytCatagory = [];
var serviceChannel = new XMLHttpRequest();

clearBox = function(){
  document.getElementById("outputFeed").innerHTML = "";
}
checkCatagory = function(){
  var loader = document.getElementById('loader-wrapper');
  loader.className = "unhide";
  var choiceSelect = document.getElementById("dropdown").value;
  var upperMove = document.getElementById("upper");
  upperMove.style.padding = '0';
  var unHide = document.getElementById("outputFeed");
  unHide.style.visibility = 'visible';
  ajax.setup(choiceSelect);
  //debugger;
  loader.className = "hide";
}
ajax.populateFeed = function(select){
  if(select=="home" || select==""){
    clearBox();
    var count =0;
    for (var i=0; i<theJSON.results.length && count < 12; i++){
      if(theJSON.results[i].multimedia.length != 0){
        count = count+1;
        output += '<article class="feedCell md-flex-basis-tb md-flex-basis-dt">';
        output += '<a href="' + theJSON.results[i].url + '" style="background: url(' + theJSON.results[i].multimedia[4].url + ') center center no-repeat; background-size: cover;" class="feedImage">';
        output += '<h3 class="feedAbstract">' + theJSON.results[i].abstract + '</h3>';
        output += '</a></article>';
        }
    } 
  } else {
    clearBox();
    var count=0;
    for (var i=0; i<theJSON.results.length && count<12; i++){
      if(theJSON.section==select){
        if(theJSON.results[i].multimedia.length != 0){
          count = count+1;
          output += '<article class="feedCell md-flex-basis-tb md-flex-basis-dt">';
          output += '<a href="' + theJSON.results[i].url + '" style="background: url(' + theJSON.results[i].multimedia[4].url + ') center center no-repeat; background-size: cover;" class="feedImage">';
          output += '<h3 class="feedAbstract">' + theJSON.results[i].abstract + '</h3>';
          output += '</a></article>';
        }
      }
    }
  }
  document.getElementById("outputFeed").innerHTML=output;
  output="";
}

/*ajax.compileList = function() {
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
    el.value = opt.toLowerCase();
    //console.log(el.value);
    target.appendChild(el);
  }
}*/

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




