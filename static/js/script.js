$(document).ready(function() {

  $(".cross").hide();
  $(".menu").hide();
  $(".hamburger").click(function() {
    $(".menu").slideToggle( "slow", function() {
      $(".hamburger").hide();
      $(".cross").show();
    });
  });

  $(".cross").click(function() {
    $(".menu").slideToggle( "slow", function() {
      $(".cross").hide();
      $(".hamburger").show();
    });
  });


  $("#imgUpload").on("change", function() {
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

  $(".likeBtn").on("click", function(e) {
    e.preventDefault();
    console.log("Step 1 complete");
    var myUrl = $(this).attr("href");
    $.ajax({
      method: "POST",
      url: myUrl
    }).done(function(data) {
      console.log(data)
      console.log("Step 2 complete");
      window.location.replace("");
    });
    console.log("Step 3 complete");
  });

});

