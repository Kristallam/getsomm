$(document).ready(function() {
  $('#color').val("");
  $('select').material_select();
  $("#varietal-container").hide();
  $('select').material_select();

  // User selects red, white, or sparkling
  $('#color').on('change', function(event) {

    var that = $(this);
    var wineType = that.val().toLowerCase();
    var wineVarietal = varietals[wineType];

    console.log($("#search-form").find("select"));
    console.log(that);

    $("#varietals").empty();
    $("#varietals").append("<option value='' disabled selected>Choose your varietal</option>");
    $("#varietal-container").show();
    for (var i=0; i < wineVarietal.length; i++) {
      $('#varietals').append("<option value='" + wineVarietal[i] + "'> " + wineVarietal[i].charAt(0).toUpperCase() + wineVarietal[i].slice(1) + "</option>")
    }

    $('select').material_select();
  });

  // User hits Let's Pair button
  $('#search-form').on("submit", function(event){
    event.preventDefault();

    var that = $(this);
    var url = that.attr('action');
    var method = that.attr('method');
    var data = that.serialize();

    $.ajax({
      context: that,
      url: url,
      method: method,
      data: data
    })
    .done(function(response){
      console.log("WHAT UP")
      $("#recipes").empty();
      $('#recipes').append(response)
    })
    .fail(function() {
      alert("FAIL")
    })
  }) // Let's Pair Button Closer


// Add Embedded SoundCloud Player
  $("#add-playlist-link").on('click', function(event) {
    event.preventDefault();
    $(this).hide()
    $("#mood-buttons").show()
  })

  $("#feeling-classy").on('click', function(event) {
    event.preventDefault();

    $("#soundcloud-player").html("<iframe width='100%' height='450' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/83577941&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'></iframe>")
  })

    $("#feeling-wild").on('click', function(event) {
    event.preventDefault();

    $("#soundcloud-player").html("<iframe width='100%' height='300' scrolling='no' frameborder='no' src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/17247114&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'></iframe>")
  })

}); //Document Ready closer


