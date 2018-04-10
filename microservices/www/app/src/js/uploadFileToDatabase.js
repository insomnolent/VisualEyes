function processImageUploadText(sourceImageUrl, wordsInImage) {
    var subscriptionKey = "c0fdfbe6f79e453398402493beeb5b04";

    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

    // Request parameters.
    var params = {
        "visualFeatures": "Categories,Description,Color",
        "details": "",
        "language": "en",
    };

    // Display the image.
    //var sourceImageUrl = document.getElementById("inputImage").value;
    //document.querySelector("#sourceImage").src = sourceImageUrl;

    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params),

        // Request headers.
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    }).done(function(response) {
        // Show formatted JSON on webpage.
        $("#responseTextArea").val(JSON.stringify(response, null, 2));
        console.log(response.description.captions[0].text);

        $.ajax({
            url: "https://data.blurriness60.hasura-app.io/v1/query",

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Authorization", "Bearer 834bff3de0928469f59c85bbe0037a5e23d7b1065c843d9c");
            },

            type: "POST",

            data: JSON.stringify({
                "type":"insert",
                "args":{
                    "table":"Photos",
                    "objects":[
                        {"URL": sourceImageUrl, "info": response.description.captions[0].text, "words": wordsInImage}
                    ]
                }
            })

        }).done(function(response) {
            console.log(response)

        }).fail(function(jqXHR, textStatus, errorThrown) {

            console.log(jqXHR, textStatus, errorThrown)
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });

};
