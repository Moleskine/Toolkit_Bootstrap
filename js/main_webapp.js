// Sliders ui
function slide_transform(target, input_target, depart_val, legend, value_array) {
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
        $(target).parent().append("<div class='legend'></div>").children(".legend").append(legend_inject).children('span').css("width", sizeUnitLegend).first().css("width", sizeFirsLastLegend).parent().children('span').last().addClass("last").css("width", sizeFirsLastLegend);
		$(target).prepend("<div class='tiret'></div>").children(".tiret").append(tiret_inject).children('span').css("width", sizeUnitLegend).first().css("width", sizeFirsLastLegend).html('&nbsp;').parent().children('span').last().css("width", sizeFirsLastLegend).html('');

    } else {
        max_val = value_array
    }	
	$(target).slider({
		disabled: false,
		range: "min",
		value: depart_val,
		min: 0,
		max: max_val,
		step: 1,
		slide: function (event, ui) {
			$(input_target).val(ui.value);
		}
	});		
    $(input_target).val($(target).slider("value"));
    //seulement du numerique
    $(input_target).bind("keypress", function (event) {
        if (event.charCode!=0) {
            var regex = new RegExp("^[0-9]+$");
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
        }
    });
    $(input_target).change(function () {
        if(parseInt($(this).val())>max_val){
            $(this).val(max_val);
        }
        if(parseInt($(this).val())<value_array[0])
        {
            $(this).val(value_array[0]);
        }
       $(target).slider('option', 'value', parseInt($(this).val()));
    });
}

function setSizeSliderLegend (target) {
	var nbValueLegend = $(target).children('.tiret').children('span').length-1;
	sizeUnitLegend = ($(target).width() / nbValueLegend) + "px";
    sizeFirsLastLegend = ($(target).width() / nbValueLegend) / 2 + "px";
    $(target).parent().children(".legend").children('span').css("width", sizeUnitLegend).first().css("width", sizeFirsLastLegend).parent().children('span').last().css("width", sizeFirsLastLegend);
	$(target).children(".tiret").children('span').css("width", sizeUnitLegend).first().css("width", sizeFirsLastLegend).html('&nbsp;').parent().children('span').last().css("width", sizeFirsLastLegend).html('');

}

function getInternetExplorerVersion() {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null) rv = parseFloat(RegExp.$1);
    }
    return rv;
}

function getLoading (target) {
	 var btn = target
        btn.button('loading')
        $('.loading').addClass('active');
        setTimeout(function () {
        	$('.loading').removeClass('active');
          	btn.button('reset')
        }, 3000)
}
$(document).ready(function () {
	// Gestion des radio boutons custom
	$(".btn-group-radio .btn-radio").click(function () {        
        $(this).parent().find('label').each(function () {
            $(this).removeClass('active');
            $(this).children(':radio').attr('checked', false);
        });
        $(this).addClass('active');
        $(this).parent().children(':radio').attr('checked', true);
    });	
	
	// Accordéons
    $(document).on('click.collapse.data-api', '.accordion-toggle', function (event) {
        var $this = $(this),
        parent = $this.data('parent'),
        $parent = parent && $(parent);
        if ($parent) {
            $parent.find('[data-toggle=collapse][data-parent=' + parent + ']').not($this).addClass('collapsed');
        }
    });
	
	// Tooltips
	$('.hasTooltip').tooltip();
	
	// Popover
	$('.hasPopover').popover({
		html: true,
		trigger: 'manual',
		template: '<div class="popover"><div class="arrow"></div><button class="close" type="button">×</button><div class="popover-content"></div></div>'
	}).click(function(e) {
		$(this).popover('toggle');		
		$('.close').click(function(e){
			$('.hasPopover').popover('hide');
		});
		e.preventDefault();
	});
	
	// Datepicker
	var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
	
		if(!isMobile) {
		   $('.input-append.date').find('input').attr('type','text').parent().datepicker({
				language: 'fr',
				autoclose: true
			});
			$('.input-append.date').find('input').on('click focus', function(){
				$('.datepicker').hide();
			});
		}
	
	// Table (odd / even)
	var browserName = navigator.appName;
    var browserVer = getInternetExplorerVersion();
    if (browserName == 'Microsoft Internet Explorer' && (browserVer < '9')) {	
		$('table tr:even').addClass('even');
		$('table tr:odd').addClass('odd');
	}
	
	// Slider	
	if ($('.slider01').size() != 0) {
		var slideTab1 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
		slide_transform(".slider01", ".hidden_slider01", 1, 1, slideTab1);
	}
	
	// Slider avec input
	if ($('.slider02').size() != 0) {
        var slideTab2 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
        slide_transform(".slider02", ".slider02_input", 1, 1, slideTab2);
    }
	
	// Slider responsive
	$(window).resize(function(){
		setSizeSliderLegend('.slider01');
		setSizeSliderLegend('.slider02');
	});
	
	// Gestion des style error sur les formulaire au focus
	$('.error input').focus(function(){
		$(this).parent().removeClass('error');
	});
	
	// ScrollSpy
	$('.error_form').scrollspy();				
	$('.error_form ul li a').bind('click', function(e) {
		e.preventDefault();
		target = this.hash;
		console.log(target);
		$(window).scrollTo(target, 800, {offset:-35});
	});
   
	// Loader	
	$('#btn-loader').click(function () {
		getLoading($(this));
    });
});