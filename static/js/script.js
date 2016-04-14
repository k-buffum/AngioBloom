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
    var myUrl = $(this).attr("href");
    $.ajax({
      method: "POST",
      url: myUrl
    }).done(function(data) {
      window.location.replace("");
    });
  });

  $(".delete-link").on("click", function(e) {
    e.preventDefault();
    var myUrl = $(this).attr("href");
    $.ajax({
      method: "DELETE",
      url: myUrl
    }).done(function(success) {
      window.location.href="/myaccount"
    });
  });

  // Delete's Photo after 3 flag clicks
  $(".flagBtn").on("click", function(e){
    e.preventDefault();
    var picLink = $(this).attr("href");
    var flags = $(this).attr("alt");
      // $.ajax({
      //   method: "POST",
      //   url: picLink
      // }).done(function(picture) {
      //   window.location.replace("");
      // })

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
  
});

