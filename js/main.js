function slider_legend(target, legend, value_array) {
    if (legend == 1) {
        max_val = 0;
        legend_inject = "";
		tiret_inject="";
        while (value_array[max_val]) {
            legend_inject += "<span data='" + max_val + "'>" + value_array[max_val] + "</span>";
			tiret_inject += "<span data='" + max_val + "'>|</span>";
            max_val++
        }
        max_val--;		
        sizeUnitLegend = ($(target).width() / max_val) + "px";
        sizeFirsLastLegend = ($(target).width() / max_val) / 2 + "px";
        $(target).append("<div class='legend'></div>").children(".legend").append(legend_inject).children('span').css("width", sizeUnitLegend).first().css("width", sizeFirsLastLegend).parent().children('span').last().addClass("last").css("width", sizeFirsLastLegend);
		$(target).prepend("<div class='tiret'></div>").children(".tiret").append(tiret_inject).children('span').css("width", sizeUnitLegend).first().css("width", sizeFirsLastLegend).css("text-align", "left").parent().children('span').last().css("width", sizeFirsLastLegend).css("text-align", "right");
    } else {
        max_val = value_array
    }
}

$(document).ready(function () {
    // Gestion du Panel navigation Left
    var menuLeft = document.getElementById('cbp-spmenu-s1'),
		showLeftPush = document.getElementById('showLeftPush'),
        container = document.getElementById('container'),
        containerPushed = document.getElementById('container'),
        body = document.body;

    showLeftPush.onclick = function () {
        classie.toggle(this, 'active');
        classie.toggle(body, 'cbp-spmenu-push-toright');
        classie.toggle(menuLeft, 'cbp-spmenu-open');
        classie.toggle(container, 'pushed');
    };
    $('.content').click(function () {
        $('body').removeClass('cbp-spmenu-push-toright');
        $('#container').removeClass('pushed');
        $('#cbp-spmenu-s1').removeClass('cbp-spmenu-open');
    });

    

    // Gestion des popover
    // Gestion du placement automatique des popover
    var getPlacement = function (tip, element) {
        var $element, above, actualHeight, actualWidth, below, boundBottom, boundLeft, boundRight, boundTop, elementAbove, elementBelow, elementLeft, elementRight, isWithinBounds, left, pos, right;
        isWithinBounds = function (elementPosition) {
            return boundTop < elementPosition.top && boundLeft < elementPosition.left && boundRight > (elementPosition.left + actualWidth) && boundBottom > (elementPosition.top + actualHeight);
        };
        $element = $(element);
        pos = $.extend({}, $element.offset(), {
            width: element.offsetWidth,
            height: element.offsetHeight
        });
        actualWidth = 200;
        actualHeight = 335;
        boundTop = $(document).scrollTop();
        boundLeft = $(document).scrollLeft();
        boundRight = boundLeft + $(window).width();
        boundBottom = boundTop + $(window).height();
        elementAbove = {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2 - actualWidth / 2
        };
        elementBelow = {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth / 2
        };
        elementLeft = {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left - actualWidth
        };
        elementRight = {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left + pos.width
        };
        above = isWithinBounds(elementAbove);
        below = isWithinBounds(elementBelow);
        left = isWithinBounds(elementLeft);
        right = isWithinBounds(elementRight);
        if (above) {
            return "top";
        } else {
            if (below) {
                return "bottom";
            } else {
                if (left) {
                    return "left";
                } else {
                    if (right) {
                        return "right";
                    } else {
                        return "right";
                    }
                }
            }
        }
    }

    if ($('#btn-plus').size() != 0) {
        $('#btn-plus').popover({
            html: true,
            placement: 'bottom',
            template: '<div class="popover popover-custom"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
            content: function () {
                return $('.content-plus').html();
            }
        });
    }

    // Pavé numérique
    if ($('#input_number').size() != 0) {
        var isVisible = false;
        var hideAllPopovers = function () {
            $('#input_number').popover('hide');
        };
        $("#input_number").popover({
            trigger: 'manual',
            placement: getPlacement,
            html: true,
            animation: false,
            template: '<div class="popover popover-custom"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content num"><p></p></div></div></div>',
            content: function () {
                return $('.content-num').html();
            }
        }).bind('touchstart click', function (e) {
            if (isVisible) {
                hideAllPopovers();
            }
            $(this).popover('show');
            $('.popover').off('click').on('click', function (e) {
                e.stopPropagation();
            });
            isVisible = true;
            e.stopPropagation();

            var $write = $('#input_number');
            $('.pave-num li').click(function () {
                var $this = $(this).find('span'),
                character = $this.html();
                // Delete 
                if ($this.parent().hasClass('num-back')) {
                    var html = $write.val();
                    $write.val(html.substr(0, html.length - 1));
                    return false;
                }
                // Special characters 
                if ($this.parent().hasClass('num-valid')) {
                    $("#input_number").popover('hide');
                    return false;
                }
                // Add the character  
                $write.val($write.val() + character);
            });

        });
        $(document).on('click', function (e) {
            hideAllPopovers();
            isVisible = false;
        });
    }

    // Gestion du bouton de réglage
    if ($('.btn-reglage').size() != 0) {
        $('.btn-reglage').popover({
            html: true,
            placement: 'top',
            template: '<div class="popover popover-custom popover-reglage"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>',
            content: function () {
                return $('.content-reglage').html();
            }
        });
    }

    // Dadepicker custom iOS
    if ($('#test_date').size() != 0) {
        $("#test_date").mobiscroll({
            preset: 'date',
            theme: 'ios',
            mode: 'scroller',
            display: 'bubble',
            lang: 'fr',
            monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
            monthNamesShort: ['Jan.', 'Fev.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
            dateOrder: 'dMMyy',
            height: 35
        });
    }

    // Gestion Select Pays
    if ($('#selectPays').size() != 0) {
        $("#selectPays").select2({
            placeholder: "Sélectionnez un pays",
            width: 260
        });
        $('.select2-input').bind('touchstart click', function () {
            $(this).removeAttr('readonly');
            $(this).focus();
        });
    }
    // Gestion Select CSP
    if ($('#selectCsp').size() != 0) {
        $("#selectCsp").select2({
            placeholder: "Sélectionnez une CSP",
            width: 600
        });
        $('.select2-input').bind('touchstart click', function () {
            $(this).removeAttr('readonly');
            $(this).focus();
        });
    }

    //Gestion des focus sur les formulaires
    if ($('input').size() != 0) {
        $('input:not(.uneditable-input)').focus(function () { $(this).parent().parent('.control-group').addClass('active'); });
        $('input:not(.uneditable-input)').blur(function () { $(this).parent().parent('.control-group').removeClass('active'); });
    }
    if ($('select').size() != 0) {
        $('select:not(.uneditable-input)').focus(function () { $(this).parent().parent('.control-group').addClass('active'); });
        $('select:not(.uneditable-input)').blur(function () { $(this).parent().parent('.control-group').removeClass('active'); });
    }
    if ($('.uneditable-input').size() != 0) {
        $('.uneditable-input').parent().parent('.control-group').addClass('disabled');
    }
    if ($('.btn-add').size() != 0) {
        $('.btn-add').parent('h2').addClass('disabled');
    }

    // Bouton Clear Input
    $(".clearInput").on("click", function () {
        $(this).prev().val('').focus();
    });

    // Gestion des chkbox options
    if ($('.option-checkbox').size() != 0) {
        $('.option-checkbox').each(function () {
            if ($(this).is(":checked")) {
                $(this).parent().addClass('active');
            }
            $('.option-checkbox').change(function () {
                if ($(this).is(":checked")) {
                    $(this).parent().addClass('active');
                } else {
                    $(this).parent().removeClass('active');
                }
            });
        });
    }

    // Gestion du bouton de réglage
    if ($('.btn-reglage').size() != 0) {
        $('.btn-reglage').click(function () {
            $(this).toggleClass('active');
        });
    }

    // Slider
    if ($('.slider01').size() != 0) {
        $(".slider01").slider({
            min: 1000,
            max: 10000,
            step: 50,
            value: 6000,
            orientation: 'horizontal',
            selection: 'before',
            tooltip: 'show'
        });
        var slideTab1 = new Array();
        var slideTab1 = ["1000", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "5000", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "10000"];
        slider_legend(".slider01", 1, slideTab1);
    }

    // Slider Graph 1
    if ($('.slider_graph1').size() != 0) {
        $(".slider_graph1").slider({
            min: 100000,
            max: 200000,
            step: 1000,
            value: 130000,
            orientation: 'horizontal',
            selection: 'before',
            tooltip: 'show'
        });
        var slideTab1 = new Array();
        var slideTab1 = ["100000", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "150000", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "200000"];
        slider_legend(".slider_graph1", 1, slideTab1);
    }

    // Slider Graph 2
    if ($('.slider_graph2').size() != 0) {
        $(".slider_graph2").slider({
            min: 0,
            max: 5000,
            step: 100,
            value: 2400,
            orientation: 'horizontal',
            selection: 'before',
            tooltip: 'show'
        });
        var slideTab2 = new Array();
        var slideTab2 = ["0", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "&nbsp;", "5000"];
        slider_legend(".slider_graph2", 1, slideTab2);
    }

    // Accordéons
    $(document).on('click.collapse.data-api', '.accordion-toggle', function (event) {
        var $this = $(this),
        parent = $this.data('parent'),
        $parent = parent && $(parent);
        if ($parent) {
            $parent.find('[data-toggle=collapse][data-parent=' + parent + ']').not($this).addClass('collapsed');
        }
    });

    // Gestion Select CSP new
    if ($('#selectCsp2').size() != 0) {
        var isVisible = false;
        var hideAllPopovers = function () {
            $('#selectCsp2').popover('hide');
        };
        $("#selectCsp2").popover({
            trigger: 'manual',
            placement: getPlacement,
            html: true,
            animation: false,
            template: '<div class="popover popover-custom popover-selectCustom"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content customSelect"><p></p></div></div></div>',
            content: function () {
                return $('.customSelect').html();
            }
        }).bind('touchstart click', function (e) {
            if (isVisible) {
                hideAllPopovers();
            }
            $(this).popover('show');
            $('.popover').off('click').on('click', function (e) {
                e.stopPropagation();
            });
            isVisible = true;
            e.stopPropagation();
        });
        $(document).on('click', function (e) {
            hideAllPopovers();
            isVisible = false;
        });
    }

    // Gestion du fondu dégradé au scroll
    setTimeout(function () {
        if ($('.content').height() < 629) {
            $(".group-progression .cache").hide();
        }
    }, 0);
    $(window).scroll(function () {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            $(".group-progression .cache").hide();
        } else {
            $('.group-progression .cache').show();
        }
    });



    // Tableau solution : accordeon
    if ($('.content_table').size() != 0) {
        $('.infos_plus').hide();
        $('.btn_more_infos').click(function () {
            $(this).toggleClass('active').siblings().removeClass('active');
            $(this).parent().parent().find('.infos_plus').toggle();

            if ($('.content_table').height() < 472) {
                $(".cache").hide();
                $(".cache_top").hide();
            }
            if ($('.content_table').height() > 471) {
                $(".cache").hide();
                $(".cache_top").show();
            }
        });
        // Tableau solution : scroll
        $('.content_table').scroll(function () {
            var h = $('.content_table').height();
            var y = $('.content_table').scrollTop();
            if (y > (h * .05) && y < (h * .95)) {
                $(".cache").hide();
                $(".cache_top").show();
            } else {
                $('.cache').show();
                $(".cache_top").hide();
            }
        });
    }




});