var upload_btn = document.getElementById('file_submit');
var file_input = document.getElementById('file_input');

// jquery is stupid
// function sendToFileStorage() {
//     var file = file_input.files[0];

//     $.ajax({
//       url: "https://filestore.blurriness60.hasura-app.io/v1/file",
//       headers: {"Authorization":"Bearer 834bff3de0928469f59c85bbe0037a5e23d7b1065c843d9c" },
//       data: file,
//       type: "POST",
//     }).done(function(json) {
//         //Handle Response
//         console.log("JSON", json);

//     }).fail(function(xhr, status, errorThrown) {
//       console.log("Error: " + errorThrown);
//       console.log("Status: " + status);
//       console.dir(xhr);
//     });
// };


upload_btn.onclick = function () {
    if (! (file_input || file_input.files || file_input.files[0])) {
        upload_btn.innerHTML = 'Please select a file and try again';
        return;
    }
    var url = "https://filestore.blurriness60.hasura-app.io/v1/file/";

    var file = file_input.files[0];
    var requestOptions = {
        method: 'POST',
        body: file,
        headers: {"Authorization":"Bearer 834bff3de0928469f59c85bbe0037a5e23d7b1065c843d9c" },
        // By default, the session cookie is automatically used!
        credentials: 'include'
    };
    upload_btn.innerHTML = 'Uploading...';
    var fileId;
    fetch(url, requestOptions)
        .then(function(response) {
           upload_btn.innerHTML = 'Uploaded!';
           //window.location.reload();
           return response.json();
       })
       .then(function(data) {
           fileId = data.file_id;
           url = url + fileId;
          processImage(url);
          // processImageUploadText(url);

       })
       .catch(function(error) {
           alert('Upload failed:' + error);
       });

};
