/**
 * Optimisations pour les tablettes de certains éléments HTML
 */
!function ($) {
	
	// Bouton (bootstrap)
	$(document).on('click.tap.button.data-api', '[data-toggle^=button]', function (e) {
		return;
	});
	
	$(document).on('touchstart.tap.button.data-api', '[data-toggle^=button]', function (e) {
		var $btn = $(e.target);
		if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn');
		$btn.button('toggle');
		e.preventDefault();
    });

    // Bouton barre de nav
    $(document).on('touchstart', '.navbar-inner button', function (e) {
        var $btn = $(e.target);
        $a.trigger('click');
        e.preventDefault();
    });


    // Liens
//    $(document).on('touchstart', 'a', function (e) {
//        var $a = $(e.target);
//        $a.trigger('click');
//        e.preventDefault();
//    });

	// Input
	$(document).on('touchstart', 'input', function(e) {
		var $input = $(e.target);
		$input.focus();
		e.preventDefault();
	});

	// Checkbox / switch
	$(document).on('touchstart', '.onoffswitch', function(e) {
		var $check = $(e.target).parent().parent().find('.onoffswitch-checkbox');
		$check.trigger('click');
		e.preventDefault();
	});
	
	// Select natif
	$(document).on('touchstart', 'select', function(e) {
		var $select = $(e.target)[0];
	    var mouseEvents = document.createEvent("MouseEvents");
	    mouseEvents.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    $select.dispatchEvent(mouseEvents);
		e.preventDefault();
	});
	
	// Select (select2.js)
//	$(document).on('touchstart', '.select2-container', function(e) {
//		var $select = $(e.target).parent().parent();
//		console.log($select);
//		$select.trigger('click');
//		e.preventDefault();
//	});
	
}(window.jQuery);