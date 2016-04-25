$(document).ready(function() {
  // NavBar
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

  // Upload Page: Shows preview of image
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
    var myUrl = $(this).attr("href");
    $.ajax({
      method: "POST",
      url: myUrl
    }).done(function(data) {
      window.location.replace("");
    });
  });

  // My Account Page: delete function for images
  $(".delete-link").on("click", function(e) {
    e.preventDefault();
    // var userId = currentUser.id;
    var myUrl = $(this).attr("href");
    var photoOwner = $(this).attr("alt");
    if (photoOwner) {
      $.ajax({
        method: "DELETE",
        url: myUrl
      }).done(function(success) {
        window.location.href="/myaccount"
      });
    } else {
      req.flash("danger", "This photo is not yours to delete");
    }
  });

  // Taxonomy Page: Delete's Photo after 3 flag clicks
  $(".flagBtn").on("click", function(e){
    e.preventDefault();
    var picLink = $(this).attr("href");
    var flags = $(this).attr("alt");

    if (flags === 3) {
      method = "DELETE"
    } else {
      method = "POST"
    }

    $.ajax({
      method: method,
      url: picLink
    }).done(function(success) {
      window.location.replace("");
    });
  });
  
  // Upload Page: hides questions until photo to be uploaded is selected
  // if (document.getElementById("imgUpload").value == "") {
  //   $("#uploadQuestionsContainer").hide();
  // } else {
  //   $("#uploadQuestionsContainer").show();
  // }


  $('.thumb-image').cropper({
  aspectRatio: 16 / 9,
  crop: function(e) {
    // Output the result data for cropping image.
    console.log(e.x);
    console.log(e.y);
    console.log(e.width);
    console.log(e.height);
    console.log(e.rotate);
    console.log(e.scaleX);
    console.log(e.scaleY);
  }
});


});

