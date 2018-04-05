function getDescription(url) {
        // **********************************************
        // *** Update or verify the following values. ***
        // **********************************************

        // Replace the subscriptionKey string value with your valid subscription key.
        var subscriptionKey = "c0fdfbe6f79e453398402493beeb5b04";

        // Replace or verify the region.
        //
        // You must use the same region in your REST API call as you used to obtain your subscription keys.
        // For example, if you obtained your subscription keys from the westus region, replace
        // "westcentralus" in the URI below with "westus".
        //
        // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
        // a free trial subscription key, you should not need to change this region.
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";

        // Request parameters.
        var params = {
            "visualFeatures": "Categories,Description,Color",
            "details": "",
            "language": "en",
        };

        // Display the image.
        document.querySelector("#sourceImage").src = url;
        // $("#img-card").fadeIn(200);
        $('#img-card').addClass('animated slideInLeft');
        $('#img-card').attr('style','visibility: visible');


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
            data: '{"url": ' + '"' + url + '"}',
        })

        .done(function(data) {
            var label = data.description.captions[0].text;
            // Show formatted JSON on webpage.

            $("#descriptionTextArea").text(label);
            $('#desc-card').addClass('animated slideInRight');
            $('#desc-card').attr('style','visibility: visible');
            // $("#description1").val(label);
            // $("#description2").val(label);
            // $("#description3").val(label);
            // $("#description4").val(label);

            //var dataS = JSON.stringify(data);

            var msg = new SpeechSynthesisUtterance(label);
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("Image Description"));
            window.speechSynthesis.speak(msg);
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            alert(errorString);
        });
    };

// Face API not implemented yet

// function processImage() {
//         var subscriptionKey = "6625b95d2fe6421281b080ecf9abbc4e";

//         // Replace or verify the region.
//         //
//         // You must use the same region in your REST API call as you used to obtain your subscription keys.
//         // For example, if you obtained your subscription keys from the westus region, replace
//         // "westcentralus" in the URI below with "westus".
//         //
//         // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
//         // a free trial subscription key, you should not need to change this region.
//         var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0";

//         // Request parameters.
//         var params = {
//             "returnFaceId": "true",
//             "returnFaceLandmarks": "false",
//             "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
//         };

//         // Display the image.
//         var sourceImageUrl = document.getElementById("inputImage").value;
//         document.querySelector("#sourceImage").src = sourceImageUrl;

//         // Perform the REST API call.
//         $.ajax({
//             url: uriBase + "?" + $.param(params),

//             // Request headers.
//             beforeSend: function(xhrObj){
//                 xhrObj.setRequestHeader("Content-Type","application/json");
//                 xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
//             },

//             type: "POST",

//             // Request body.
//             data: '{"url": ' + '"' + sourceImageUrl + '"}',
//         })

//         .done(function(data) {
//             // Show formatted JSON on webpage.
//             $("#responseTextArea").val(JSON.stringify(data, null, 2));
//             console.log("pictures", data);
//         })

//         .fail(function(jqXHR, textStatus, errorThrown) {
//             // Display error message.
//             var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
//             errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
//                 jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
//             alert(errorString);
//         });
//     };


function getImageText(url) {
        var subscriptionKey = "278c61cde8b44c39888b508b6ac0f5f7";

        // Replace or verify the region.
        //
        // You must use the same region in your REST API call as you used to obtain your subscription keys.
        // For example, if you obtained your subscription keys from the westus region, replace
        // "westcentralus" in the URI below with "westus".
        //
        // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
        // a free trial subscription key, you should not need to change this region.
        var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr";

        // Request parameters.
        var params = {
            "language": "unk",
            "detectOrientation ": "true",
        };

        // Display the image.
        // document.querySelector("#sourceImage").src = url;
        // document.querySelector("#picture1").src = url;
        // document.querySelector("#picture2").src = url;
        // document.querySelector("#picture3").src = url;
        // document.querySelector("#picture4").src = url;

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(jqXHR){
                jqXHR.setRequestHeader("Content-Type","application/json");
                jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + url + '"}',
        })

        .done(function(data) {

            var wordArr = [];
            data.regions.forEach(regionObj => {
                regionObj.lines.forEach(lineObj => {
                    lineObj.words.forEach(wordObj => {
                        // console.log(wordObj.text)
                        wordArr.push(wordObj.text)
                    })
                })
            })

            var text = wordArr.join(' ');

            // Show formatted JSON on webpage.

            $("#textTextArea").text(text);
            if (text.length == 0) {
                $("#textTextArea").text("(No text detected in image)");
            }
            //$("#text-card").fadeIn(200);
            $('#text-card').addClass('animated slideInRight');
            $('#text-card').attr('style','visibility: visible');


            //var dataS = JSON.stringify(data);
            console.log("text",text);
            if (text.length > 0) {
                window.speechSynthesis.speak(new SpeechSynthesisUtterance("Here are the words in this image."));
                var msg = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(msg);
            } else {
                var msg = new SpeechSynthesisUtterance("There are no words in this image.");
                window.speechSynthesis.speak(msg);
            }
        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };

    function processImage(url) {
        getDescription(url);
        getImageText(url);
    }
