var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
showDivs(slideIndex += n);
}

function showDivs(n) {
var i;
var x = document.getElementsByClassName("mySlides");
if (n > x.length) {slideIndex = 1}    
if (n < 1) {slideIndex = x.length}
for (i = 0; i < x.length; i++) {
   x[i].style.display = "none";  
}
x[slideIndex-1].style.display = "block";  
}

// If you have the auth token saved in offline storage
// var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
// headers = { "Authorization" : "Bearer " + authToken }
$.ajax({
    url: "https://data.blurriness60.hasura-app.io/v1/query",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer f533a6e4ab6d6787f9375a540cae4b85084297f455e82f77"
    },
    data: JSON.stringify({
      "type": "select",
      "args": {
            "table": {
                  "schema": "hf_catalog",
                  "name": "hf_file"
            },
            "columns": [
                  "*"
            ]
      }
    }),
    type: "POST",
    dataType: "json"
}).done(function(json) {
    // console.log("JSON IS", json);
    // Handle Response
    if (json.length == 0) {
        $("#no-hist").attr('style','visibility: visible');
        $("#picture1").attr('style','visibility: hidden');
        // $("#description1").attr('style','visibility: hidden');
    } else {
        var url = "https://filestore.blurriness60.hasura-app.io/v1/file/";
        url += json[json.length-4].file_id;
        document.querySelector("#picture1").src=url;
    }
    // var counter = 0;
    if (json.length < 2) {
        $("#picture2").attr('style','visibility: hidden');
                // $("#description2").attr('style','visibility: hidden');

    } else {
        var url = "https://filestore.blurriness60.hasura-app.io/v1/file/";
        url += json[json.length-3].file_id;
        document.querySelector("#picture2").src=url;
    }
    if (json.length < 3) {
        $("#picture3").attr('style','visibility: hidden');
                // $("#description3").attr('style','visibility: hidden');

    } else {
        var url = "https://filestore.blurriness60.hasura-app.io/v1/file/";
        url += json[json.length-2].file_id;
        document.querySelector("#picture3").src=url;
    }
    if (json.length < 4) {
        $("#picture4").attr('style','visibility: hidden');
                // $("#description4").attr('style','visibility: hidden');

    } else {
        var url = "https://filestore.blurriness60.hasura-app.io/v1/file/";
        url += json[json.length-1].file_id;
        document.querySelector("#picture4").src=url;
    }


}).fail(function(xhr, status, errorThrown) {
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
});


// headers = { "Authorization" : "Bearer " + authToken }
$.ajax({
    url: "https://data.blurriness60.hasura-app.io/v1/query",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer f533a6e4ab6d6787f9375a540cae4b85084297f455e82f77"
    },
    data: JSON.stringify({
      "type": "select",
      "args": {
            "table": "Photos",
            "columns": [
                  "info"
            ]
      }
    }),
    type: "POST",
    dataType: "json"
}).done(function(json) {
    console.log("JSON IS", json);
    if (json.length == 0) {
        $("#description1").attr('style','visibility: hidden');
    } else {
        var text = json[json.length-4].info;
        console.log(text);
        // document.querySelector("#description1").text = JSON.stringify(text);
        // document.getElementById("#description1").value = "testing";
        $("#description1").text(text);
    }
    // var counter = 0;
    if (json.length < 2) {
        $("#description2").attr('style','visibility: hidden');

    } else {
        var text = json[json.length-3].info;
        // document.querySelector("#description2") = text;
        $("#description2").text(text);
    }
    if (json.length < 3) {
        $("#description3").attr('style','visibility: hidden');

    } else {
        var text = json[json.length-2].info;
        // document.querySelector("#description3") = text;
        $("#description3").text(text);
    }
    if (json.length < 4) {
        $("#description4").attr('style','visibility: hidden');
    } else {
        var text = json[json.length-1].info;
        // document.querySelector("#description1") = text;
        $("#description4").text(text);
    }
}).fail(function(xhr, status, errorThrown) {
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
});
