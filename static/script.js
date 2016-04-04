console.log('hey');
$(document).ready(function() {

  $('#imgUpload').on('change', function() {
    if(typeof (FileReader) != "undefined") {
      var imgPreview = $('#imgPreview');
      imgPreview.empty();

      var reader = new FileReader();
      reader.onload = function(e) {
        $("<img />", {
          "src": e.target.result,
          "class": "thumb-image"
        }).appendTo(imgPreview);
      }
      imgPreview.show();
      reader.readAsDataURL($(this)[0].files[0]);
    } else {
      alert("This browser doesn't support FileReader.")
    }
  });

});