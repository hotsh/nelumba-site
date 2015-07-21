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

  var color_ids = [
    "color-head-background",
    "color-head-text",
    "color-head-link",
    "color-head-accent",
    "color-activity-background",
    "color-activity-text",
    "color-activity-accent",
    "color-activity-link",
    "color-tab-background",
    "color-tab-accent",
    "color-tab-text"
  ];

  var color_element_selectors = [
      ".edit-colors-card nav.topbar",
      ".edit-colors-card nav.topbar ul.navbar li",
      ".edit-colors-card nav.topbar ul.navbar.right li a",
      ".edit-colors-card nav.topbar ul.statistics li span.count",
      ".edit-colors-card ul.activities li.activity",
      ".edit-colors-card ul.activities li.activity",
      ".edit-colors-card ul.activities li.activity ul li.pronoun span.personal",
      ".edit-colors-card ul.activities li.activity li:not(.actor_display) a",
      ".edit-colors-card nav.tabbar:not(.card) ul li",
      ".edit-colors-card nav ul li.current-tab",
      ".edit-colors-card nav ul li a"
  ];

  var color_element_keys = [
    "background-color",
    "color",
    "color",
    "color",
    "background-color",
    "color",
    "color",
    "color",
    "background-color",
    "border-top-color",
    "color"
  ];

  var color_to_hsl = function(color_str) {
    color_str = color_str.trim();

    var h = 0;
    var s = 0;
    var l = 0;

    if (color_str.startsWith('hsl')){
      var elements = color_str.match(/\d+[%]?/g);
    }
    else if (color_str.startsWith('rgb')){
      var elements = color_str.match(/\d+[%]?/g);

      color_str = "#";

      elements.forEach(function(element) {
        var color = parseInt(element);
        if (element.endsWith('%')) {
          color = (color / 100.0) * 255;
        }

        var color_hex = color.toString(16).substring(0, 2);
        if (color_hex.length == 1) {
          color_hex = "0" + color_hex;
        }
        color_str = color_str + color_hex;
      });
    }

    if (color_str.startsWith('#')) {
      color_str = color_str.substring(1);
      if (color_str.length < 6) {
        color_str = color_str[0] + color_str[0] +
                    color_str[1] + color_str[1] +
                    color_str[2] + color_str[2];
      }

      var r = parseInt(color_str.substring(0, 2), 16);
      var g = parseInt(color_str.substring(2, 4), 16);
      var b = parseInt(color_str.substring(4, 6), 16);

      r /= 255.0;
      g /= 255.0;
      b /= 255.0;

      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;

      if(max == min) {
        h = s = 0;
      }
      else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      h = Math.floor(h * 360);
      s = Math.floor(s * 100);
      l = Math.floor(l * 100);
    }

    return [h, s, l];
  };

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
      $('.edit-colors-card nav.topbar ul.statistics li span.count a').css({
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
    else if (id == "color-activity-accent") {
      $('.edit-colors-card ul.activities li.activity ul li.pronoun span').css({
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
      $('.edit-colors-card nav ul.tabs li.tab a').css({
        "color": color
      });
      $('.edit-colors-card nav ul.tabs li.tab a span svg rect').css({
        "fill": color,
        "stroke": color
      });
      $('.edit-colors-card nav ul.tabs li.tab a span svg path').css({
        "fill": color,
        "stroke": color
      });
    }

    element.css({
      "background-color": color
    });
  });

  color_ids.forEach(function(key, index) {
    // Pull out the colors
    var element = $('#' + key);
    var selector = $(color_element_selectors[index]);
    var color_key = color_element_keys[index];
    var color = selector.css(color_key);

    var hsl = color_to_hsl(color);

    element.find('.hue input[type=range]').val(hsl[0]).trigger('change');
    element.find('.sat input[type=range]').val(hsl[1]).trigger('change');
    element.find('.light input[type=range]').val(hsl[2]).trigger('change');
  });
});
