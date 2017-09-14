$(function() {
    $.ajax({
        type: "POST",
        url: getbrandmediaadtypelisturl,
        dataType: "json",
        success: function (data) {
            if (typeof data == "string") {
                data = $.parseJSON(data);
            }
            if (data && data.statuscode == "10000") {
                var menudataarr = data.data;
                if (typeof(menudataarr) != "undefined" && menudataarr != '') {
                    var navhtml = "<div class='container'> <ul class='nav nav-pills'> ";
                    navhtml += "<li class='dropdown'>";
                    navhtml += "<a tabindex='0' data-toggle='dropdown' class='dropdown-toggle' data-submenu='' aria-labelledby='dLabel'>品牌媒体<span class='caret'></span></a>";
                    navhtml += "<ul class='dropdown-menu'>";
                    for (var i = 0; i < menudataarr.length; i++) {
                        var submenudataarr = menudataarr[i].mediaSiteList;
                        if (typeof(submenudataarr) != "undefined" && submenudataarr != '' && submenudataarr.length > 0) {
                            navhtml += "<li class='dropdown-submenu'>";
                            navhtml += "<a tabindex='0' >" + menudataarr[i].mediaName + "</a>";
                            navhtml += "<ul class='dropdown-menu' style='margin-left: 5px'>";
                            for (var j = 0; j < submenudataarr.length; j++) {
                                navhtml += "<li><a tabindex='0'>" + submenudataarr[j].mediaSiteName + "</a></li>";
                                if(j < submenudataarr.length - 1){
                                    navhtml += "<li class='divider'></li>";
                                }
                            }
                            navhtml += "</ul> </li>";
                            if(i < menudataarr.length - 1){
                                navhtml += "<li class='divider'></li>";
                            }
                        } else {
                            navhtml += "<li><a tabindex='0' data-submenu=''>" + menudataarr[i].mediaName + "</a></li>";
                            navhtml += "<li class='divider'></li>";
                       }
                    }
                    navhtml += "</ul> </li>";
                    navhtml += "</ul> </div>";
                    $(".fill_mg").html(navhtml);
                }
                $('[data-submenu]').submenupicker();
            }
        }
    });

  $('.dropdown > a[tabindex]').on('keydown', function(event) {
    if (event.keyCode == 13) {
      $(this).dropdown('toggle');
    }
  });

  $('.dropdown-menu').on('click', function(event) {
    if (this === event.target) {
      event.stopPropagation();
    }
  });

});
