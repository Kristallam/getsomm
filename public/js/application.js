$(document).ready(function() {
  $('#color').val("");
  $('select').material_select();
  $("#varietal-container").hide();
  $('select').material_select();
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

  $('#search-form').on("submit", function(event){
    event.preventDefault();

    var dataType = 'json';
    var that = $(this);
    var url = that.attr('action');
    var method = that.attr('method');
    var data = that.serialize();

    $.ajax({
      context: that,
      url: url,
      method: method,
      data: data
      // dataType: dataType
    })
    .done(function(response){
      console.log("WHAT UP")
      // console.log(response[0].name)
      $("#recipes").empty();

        // for (var i = 0; i < response.length; i++) {
        //   console.log(response)
        //   var recipe = response[i]
        //   $('#recipes').append(response)
        // }

      $('#recipes').append(response)

    })
    .fail(function() {
      alert("FAIL")
    })

  })

});
