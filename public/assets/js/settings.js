$(function() {
  // Dynamic Image Upload Preview
  image_uploader = $('input[type=file]');
  image_uploader.fileupload({
    dataType: 'json',
    autoUpload: false,
    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
    paramName: 'file',
    dropZone: $('img.preview'),
    maxFileSize: 5000000,
    disableImageResize: /Android(?!.*Chrome)|Opera/
      .test(window.navigator.userAgent),
  }).on('fileuploadadd', function(e, data) {
    // Reset preview spanner
    data.context = $('#image-preview');
    data.context.empty();

    $('form#image-input > input.button').on('click', function () {
      data.submit();
    });
  }).on('fileuploadprocessalways', function(e,data) {
    var index = data.index;
    var file  = data.files[index];
    var node  = data.context;
    if (file.preview) {
      node.append(file.preview);
    }
    if (file.error) {
      node.append('<br>').append(file.error);
    }
  }).on('fileuploadprogressall', function(e,data) {
  }).on('fileuploaddone', function(e,data) {
  }).on('fileuploadfail', function(e,data) {
  }).prop('disabled', !$.support.fileInput)
    .parent().addClass($.support.fileInput ? undefined : 'disabled');

  // Remove links in example layout
  $('.edit-colors-card a').attr('href', 'javaScript:void(0);').on('click', function(event) {
    event.stopPropagation();
    event.preventDefault();
  });

  // Embed SVGs for each tabbar image, and remove existing image
  $('.edit-colors-card nav ul li a span').each(function() {
    var src = $(this).css("background-image");

    // Determine url
    src = src.substring(src.search("url\\(") + 4, src.search("\\.svg"));
    if (src[0] == "\"") {
      src = src.substring(1);
    }
    src = src + ".svg";

    $(this).css({
      "background-image": "none",
      "position": "relative"
    });

    var thiz = $(this);
    var pos = thiz.css("background-position").split(" ");
    var x = pos[0];
    var y = pos[1];

    // Read SVG data
    $.get(src, function(data) {
      // Look at position of background image
      var svgNode = $("svg", data);
      oldWidth  = parseInt(svgNode.attr('width'));
      oldHeight = parseInt(svgNode.attr('height'));
      svgNode.attr('viewBox', '0 0 ' + oldWidth + " " + oldHeight);
      svgNode.attr('width', "20px");
      svgNode.attr('height', "20px");
      svgNode.attr('preserveAspectRatio', "xMaxYMax meet");
      svgNode.css({
        position: "absolute",
        left: x,
        top: y
      });
      thiz.prepend(svgNode);
    }, 'xml');
  });

  $('.color ~ div > div > input[type=range]').on('change input', function(event) {
    var id    = $(this).parent().parent().parent().parent().attr('id');

    var type  = $(this).parent().attr('class');

    var hue   = $(this).parent().parent().parent().find('.hue   input').val();
    var sat   = $(this).parent().parent().parent().find('.sat   input').val();
    var light = $(this).parent().parent().parent().find('.light input').val();

    // Update hue slider background
    if (type != "hue") {
      var gradient = "-webkit-linear-gradient(left, hsl(0, " + sat + "%, " + light + "%), hsl(36, " + sat + "%, " + light + "%), hsl(72, " + sat + "%, " + light + "%), hsl(108, " + sat + "%, " + light + "%), hsl(144, " + sat + "%, " + light + "%), hsl(180, " + sat + "%, " + light + "%), hsl(216, " + sat + "%, " + light + "%), hsl(252, " + sat + "%, " + light + "%), hsl(288, " + sat + "%, " + light + "%), hsl(324, " + sat + "%, " + light + "%), hsl(360, " + sat + "%, " + light + "%))";

      $(this).parent().parent().find('.hue input').css({
        "background-image": gradient
      });

      var gradient = "-moz-linear-gradient(left, hsl(0, " + sat + "%, " + light + "%), hsl(36, " + sat + "%, " + light + "%), hsl(72, " + sat + "%, " + light + "%), hsl(108, " + sat + "%, " + light + "%), hsl(144, " + sat + "%, " + light + "%), hsl(180, " + sat + "%, " + light + "%), hsl(216, " + sat + "%, " + light + "%), hsl(252, " + sat + "%, " + light + "%), hsl(288, " + sat + "%, " + light + "%), hsl(324, " + sat + "%, " + light + "%), hsl(360, " + sat + "%, " + light + "%))";

      $(this).parent().parent().find('.hue input').css({
        "background-image": gradient
      });
    }

    if (type != "sat") {
      var gradient = "-webkit-linear-gradient(left, hsl(" + hue + ", 0%, " + light + "%), hsl(" + hue + ", 100%, " + light + "%))";

      $(this).parent().parent().find('.sat input').css({
        "background-image": gradient
      });

      var gradient = "-moz-linear-gradient(left, hsl(" + hue + ", 0%, " + light + "%), hsl(" + hue + ", 100%, " + light + "%))";

      $(this).parent().parent().find('.sat input').css({
        "background-image": gradient
      });
    }

    if (type != "light") {
      var gradient = "-webkit-linear-gradient(left, hsl(" + hue + ", " + sat + "%, 0%), hsl(" + hue + ", " + sat + "%, 10%), hsl(" + hue + ", " + sat + "%, 20%), hsl(" + hue + ", " + sat + "%, 30%), hsl(" + hue + ", " + sat + "%, 40%), hsl(" + hue + ", " + sat + "%, 50%), hsl(" + hue + ", " + sat + "%, 60%), hsl(" + hue + ", " + sat + "%, 70%), hsl(" + hue + ", " + sat + "%, 80%), hsl(" + hue + ", " + sat + "%, 90%), hsl(" + hue + ", " + sat + "%, 100%))";

      $(this).parent().parent().find('.light input').css({
        "background-image": gradient
      });

      var gradient = "-moz-linear-gradient(left, hsl(" + hue + ", " + sat + "%, 0%), hsl(" + hue + ", " + sat + "%, 10%), hsl(" + hue + ", " + sat + "%, 20%), hsl(" + hue + ", " + sat + "%, 30%), hsl(" + hue + ", " + sat + "%, 40%), hsl(" + hue + ", " + sat + "%, 50%), hsl(" + hue + ", " + sat + "%, 60%), hsl(" + hue + ", " + sat + "%, 70%), hsl(" + hue + ", " + sat + "%, 80%), hsl(" + hue + ", " + sat + "%, 90%), hsl(" + hue + ", " + sat + "%, 100%))";

      $(this).parent().parent().find('.light input').css({
        "background-image": gradient
      });
    }

    var element = $(this).parent().parent().parent().children('.color');

    var dark      = "hsl(" + hue + ", " + sat + "%, " + (parseInt(light) - 10) + "%)";
    var color     = "hsl(" + hue + ", " + sat + "%, " + light + "%)";
    var bright    = "hsl(" + hue + ", " + sat + "%, " + (parseInt(light) + 10) + "%)";
    var brightest = "hsl(" + hue + ", " + sat + "%, " + (parseInt(light) + 15) + "%)";

    if (id == "color-head-background") {
      $('.edit-colors-card ul.activities').css({
        "background-color": color
      });
      $('.edit-colors-card nav.topbar').css({
        "background-color": color
      });
      $('.edit-colors-card footer').css({
        "background-color": color
      });
    }
    else if (id == "color-head-text") {
      $('.edit-colors-card nav.topbar ul.navbar li').css({
        "color": color
      });
    }
    else if (id == "color-head-link") {
      $('.edit-colors-card nav.topbar ul.navbar.right li a').css({
        "color": color
      });
    }
    else if (id == "color-head-accent") {
      $('.edit-colors-card nav.topbar ul.statistics li span.count').css({
        "color": color
      });
    }
    else if (id == "color-activity-background") {
      $('.edit-colors-card ul.activities li.activity').css({
        "background-color": color
      });
    }
    else if (id == "color-activity-text") {
      $('.edit-colors-card ul.activities li.activity').css({
        "color": color
      });
    }
    else if (id == "color-activity-link") {
      $('.edit-colors-card ul.activities li.activity li:not(.actor_display) a').css({
        "color": color
      });
    }
    else if (id == "color-tab-background") {
      $('.edit-colors-card nav.tabbar:not(.card) ul li').css({
        "background-color": color,
        "border-left-color": dark
      });
      $('.edit-colors-card nav.tabbar:not(.card) ul li.current-tab').css({
        "background-color": brightest
      });
      $('.edit-colors-card nav.tabbar:not(.card) ul li:not(.current-tab)').css({
        "border-top-color": dark
      });
      $('.edit-colors-card nav.tabbar:not(.card) ul li:not(.current-tab)').hover(function() {
        $(this).css({
          "background-color": bright
        });
      }, function() {
        $(this).css({
          "background-color": color
        });
      });
    }
    else if (id == "color-tab-accent") {
      $('.edit-colors-card nav ul li.current-tab').css({
        "border-top-color": brightest
      });
      var old_border_top = $('.edit-colors-card nav ul li:not(.current-tab)').css("border-top-color");
      $('.edit-colors-card nav ul li:not(.current-tab)').hover(function() {
        $(this).css({
          "border-top-color": bright
        });
      }, function() {
        $(this).css({
          "border-top-color": old_border_top
        });
      });
    }
    else if (id == "color-tab-text") {
      $('.edit-colors-card nav ul li a').css({
        "color": color
      });
      $('.edit-colors-card nav ul li a span svg rect').css({
        "fill": color,
        "stroke": color
      });
      $('.edit-colors-card nav ul li a span svg path').css({
        "fill": color,
        "stroke": color
      });
    }

    element.css({
      "background-color": color
    });
  });
});
