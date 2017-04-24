var theJSON = "";
var output= "";
var url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=a5a8d9167e074a03babab4ff8bef0945";
var serviceChannel = new XMLHttpRequest();

serviceChannel.open('GET', url, true);
serviceChannel.responseType = 'text';

serviceChannel.onload = function () {
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

serviceChannel.send(null);


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

//window.addEventListener("load",connectNYT,false);