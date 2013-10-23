$(document).ready(function(){
  $('#post-area').markItUp(mySettings);

  // Hide share/favorite bar by default
  $('.share').css({opacity: 0});
  $('.favorite').css({opacity: 0});

  // Status input tab reveal
  $('#new-note').click(function() {
    $('#new-note').addClass('current-tab');
    $('#new-note').parent().addClass('current-tab');
    $('#new-post').removeClass('current-tab');
    $('#new-post').parent().removeClass('current-tab');
    $('#new-image').removeClass('current-tab');
    $('#new-image').parent().removeClass('current-tab');
    $('#post-input').hide();
    $('#note-input').show();
    $('#image-input').hide();
  }).attr('href', '#');

  // Post input tab reveal
  $('#new-post').click(function() {
    $('#new-post').addClass('current-tab');
    $('#new-post').parent().addClass('current-tab');
    $('#new-note').removeClass('current-tab');
    $('#new-note').parent().removeClass('current-tab');
    $('#new-image').removeClass('current-tab');
    $('#new-image').parent().removeClass('current-tab');
    $('#post-input').show();
    $('#note-input').hide();
    $('#image-input').hide();
  }).attr('href', '#');

  // Image input tab reveal
  $('#new-image').click(function() {
    $('#new-image').addClass('current-tab');
    $('#new-image').parent().addClass('current-tab');
    $('#new-note').removeClass('current-tab');
    $('#new-note').parent().removeClass('current-tab');
    $('#new-post').removeClass('current-tab');
    $('#new-post').parent().removeClass('current-tab');
    $('#image-input').show();
    $('#note-input').hide();
    $('#post-input').hide();
  }).attr('href', '#');

  // Share/favorite bar reveal/hide on mouse over
  $('.activity').mouseover(function() {
    $(this).find('.share').css({opacity: 1});
    $(this).find('.favorite').css({opacity: 1});
  }).mouseout(function() {
    $(this).find('.share').css({opacity: 0});
    $(this).find('.favorite').css({opacity: 0});
  });

  // pjax tabs
  $(document).pjax('a[data-pjax]', 'ul.activities');
  $(document).on('pjax:timeout', function(event) {
    event.preventDefault();
  });

  // Status input tab reveal
  $('#timeline-tab').click(function() {
    $('#timeline-tab').addClass('current-tab');
    $('#timeline-tab').parent().addClass('current-tab');
    $('#mentions-tab').removeClass('current-tab');
    $('#mentions-tab').parent().removeClass('current-tab');
    $('#favorites-tab').removeClass('current-tab');
    $('#favorites-tab').parent().removeClass('current-tab');
    $('#shared-tab').removeClass('current-tab');
    $('#shared-tab').parent().removeClass('current-tab');
  })

  $('#mentions-tab').click(function() {
    $('#mentions-tab').addClass('current-tab');
    $('#mentions-tab').parent().addClass('current-tab');
    $('#timeline-tab').removeClass('current-tab');
    $('#timeline-tab').parent().removeClass('current-tab');
    $('#favorites-tab').removeClass('current-tab');
    $('#favorites-tab').parent().removeClass('current-tab');
    $('#shared-tab').removeClass('current-tab');
    $('#shared-tab').parent().removeClass('current-tab');
  })

  $('#favorites-tab').click(function() {
    $('#favorites-tab').addClass('current-tab');
    $('#favorites-tab').parent().addClass('current-tab');
    $('#timeline-tab').removeClass('current-tab');
    $('#timeline-tab').parent().removeClass('current-tab');
    $('#mentions-tab').removeClass('current-tab');
    $('#mentions-tab').parent().removeClass('current-tab');
    $('#shared-tab').removeClass('current-tab');
    $('#shared-tab').parent().removeClass('current-tab');
  })

  $('#shared-tab').click(function() {
    $('#shared-tab').addClass('current-tab');
    $('#shared-tab').parent().addClass('current-tab');
    $('#timeline-tab').removeClass('current-tab');
    $('#timeline-tab').parent().removeClass('current-tab');
    $('#mentions-tab').removeClass('current-tab');
    $('#mentions-tab').parent().removeClass('current-tab');
    $('#favorites-tab').removeClass('current-tab');
    $('#favorites-tab').parent().removeClass('current-tab');
  })

  // Image upload chooser styles
  file = $("input[type=file]");
  wrapper = $('<div>').css({
    "position": "relative",
    "color": file.css("color"),
    "background-color": file.css("background-color"),
    "width": parseInt(file.css("width")) + parseInt(file.css("padding-left"))
                                         + parseInt(file.css("padding-right")),
    "height": parseInt(file.css("height")) + parseInt(file.css("padding-top"))
                                           + parseInt(file.css("padding-bottom")),
    "margin-left": file.css("margin-left"),
    "margin-right": file.css("margin-right"),
    "margin-top": file.css("margin-top"),
    "margin-bottom": file.css("margin-bottom"),
    "text-align": "center"
  });
  paragraph = $('<div>').css({
    "position": "absolute",
    "left": "0",
    "top": "0",
    "width": "100%",
    "text-align": "center",
    "font-family": file.css("font-family"),
    "font-size": file.css("font-size"),
    "line-height": file.css("line-height"),
    "height": wrapper.css("height"),
    "margin-left": file.css("margin-left"),
    "margin-right": file.css("margin-right"),
    "margin-top": file.css("margin-top"),
    "margin-bottom": file.css("margin-bottom"),
  }).text("Click to upload a local file.");
  file.css({"margin-left"  : "0",
            "margin-top"   : "0",
            "margin-right" : "0",
            "margin-bottom": "0",
            "padding": "0",
            "position": "absolute",
            "z-order": "-2",
            "width": "100%",
            "opacity": "0"});
  file.wrap(wrapper);
  file.parent().prepend(paragraph);
  file.bind("change", function() {
    paragraph.text("Uploading " + file.val())});
});
