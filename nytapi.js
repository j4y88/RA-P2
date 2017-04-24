var theJSON = "";
var output= "";
var url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=a5a8d9167e074a03babab4ff8bef0945";
var urla = "https://api.nytimes.com/svc/topstories/v2/"
var urlb = ".json?api-key=a5a8d9167e074a03babab4ff8bef0945"
var serviceChannel = new XMLHttpRequest();

serviceChannel.open('GET', url, true);
serviceChannel.send(null);
serviceChannel.responseType = 'text';

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
        }
    }
}



document.addEventListener('click', function(event) {
    console.log(event);
    if(event.target.className === "nytCatagory"){
      var targetId = event.target.id;
      //console.log(targetId);
      url = "";
      url += urla + targetId + urlb;
      //console.log(url);
      serviceChannel.open('GET', url, true);
      document.getElementById("output").innerHTML="";
    } else {
      console.log("nope");
    }
}, false);

//Dropdown Box
function catagoryOpen() {
    document.getElementById("catagoryDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}