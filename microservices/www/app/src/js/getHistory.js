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
          "Authorization": "Bearer 834bff3de0928469f59c85bbe0037a5e23d7b1065c843d9c"
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

function noWords(words) {
    if (words.length == 0) {
        return "No words";
    } else {
        return words;
    }
}

// headers = { "Authorization" : "Bearer " + authToken }
$.ajax({
    url: "https://data.blurriness60.hasura-app.io/v1/query",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer 834bff3de0928469f59c85bbe0037a5e23d7b1065c843d9c"
    },
    data: JSON.stringify({
      "type": "select",
      "args": {
            "table": "Photos",
            "columns": [
                  "info",
                  "words"
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
        var words = json[json.length-4].words;
        $("#description1").text(text);
        $("#words1").text(noWords(words));
    }
    // var counter = 0;
    if (json.length < 2) {
        $("#description2").attr('style','visibility: hidden');

    } else {
        var text = json[json.length-3].info;
        var words = json[json.length-3].words;
        // document.querySelector("#description2") = text;
        $("#description2").text(text);
        $("#words2").text(noWords(words));
    }
    if (json.length < 3) {
        $("#description3").attr('style','visibility: hidden');

    } else {
        var text = json[json.length-2].info;
        var words = json[json.length-2].words;
        // document.querySelector("#description3") = text;
        $("#description3").text(text);
        $("#words3").text(noWords(words));
    }
    if (json.length < 4) {
        $("#description4").attr('style','visibility: hidden');
    } else {
        var text = json[json.length-1].info;
        var words = json[json.length-1].words;
        // document.querySelector("#description1") = text;
        $("#description4").text(text);
        $("#words4").text(noWords(words));
    }
}).fail(function(xhr, status, errorThrown) {
    console.log("Error: " + errorThrown);
    console.log("Status: " + status);
    console.dir(xhr);
});


function areThereWords(words) {
    if (words != "No words") {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("With the words."));
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(words));
    }
}

var readTextAloud = document.getElementById('readTextAloud');

readTextAloud.onclick = function () {
    var text1 = $('#description1').text();
    var text2 = $('#description2').text();
    var text3 = $('#description3').text();
    var text4 = $('#description4').text();

    var words1 = $('#words1').text();
    var words2 = $('#words2').text();
    var words3 = $('#words3').text();
    var words4 = $('#words4').text();

    if (text4.length > 0) {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Here is a summary of your most recent photos."));
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Your most recent photo includes."));
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(text4));
        areThereWords(words4);
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Your second most recent photo includes."));
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(text3));
        areThereWords(words3);
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Your third most recent photo includes."));
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(text2));
        areThereWords(words2);
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Your fourth most recent photo includes."));
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(text1));
        areThereWords(words1);
    } else {
        var msg = new SpeechSynthesisUtterance("There is no description for this image.");
        window.speechSynthesis.speak(msg);
    }
};
