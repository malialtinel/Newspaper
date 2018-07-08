/* Copyright (C) Elartica Team, http://www.gnu.org/licenses/gpl.html GNU/GPL */

jQuery(function($) {

    "use strict";

    var html = $('html'),
        config = html.data('config') || {},
        win    = $(window),
        toolbar = $('.tm-toolbar'),
        navbar = $('.tm-navbar'),
        headerbar = $('.tm-headerbar');
    
    // Toolbar
    if (toolbar.length) {
        $.UIkit.sticky(toolbar, (function() {

            var cfg = {top: 0, media: 0};

            if (headerbar.length) {
                cfg.top = headerbar.innerHeight() * -1;
                cfg.animation = 'uk-animation-slide-top';
                cfg.clsactive =' tm-toolbar-attached';
            }

            return cfg;

        })());
    }

    // Switcher
    if ($.fn.hoverIntent) {
        
        $('.tm-switcher > li').hoverIntent(function () {
            $(this).trigger('click.uk.switcher');
        });
    } else {
        $('.tm-switcher > li').hover(function () {
            $(this).trigger('click.uk.switcher');
        });
    }
    $('.tm-switcher > li > a').on('click', function() {
        window.location.href = $(this).attr('href');
    });

    // Select2 init
    if ($.fn.select2) {
        $('.select2').select2({ minimumResultsForSearch : Infinity });
        $('.tm-shipping-calculator-form select, select.select2_country').select2({ minimumResultsForSearch : Infinity, width: '100%' });
    }

    // Category menu
    $('.tm-blog-categories li, .tm-product-categories li').each(function () {
        var $this = $(this);
        if($this.hasClass('current-cat') || $this.hasClass('current-cat-parent')){
            $this.has('ul').prepend('<span class="open-child-menu uk-active"></span>');
        } else {
            $this.has('ul').prepend('<span class="open-child-menu"></span>');
        }
    });

    $(document).on('click', 'span.open-child-menu', function () {
        var $this = $(this);
        if ($this.hasClass('uk-active')) {
            $(this)
                .removeClass('uk-active')
                .siblings('ul')
                .slideUp('800');
        } else {
            $(this)
                .addClass('uk-active')
                .siblings('ul')
                .slideDown('800');
        }
    });
    
    // Check selected color
    var theme_style = $('link#theme-style'),
        isset_theme_style = theme_style.length;
    
    if(isset_theme_style) 
    {
        var change_selected_color = function (color) 
        {
            $('.tm-color-schemes a').removeClass('uk-active');
            $('a.tm-color-' + color).addClass('uk-active');
            
            var this_color_file = '';
            
            if (color == 'default') 
            {
                this_color_file = 'css/theme.css';
                $('.tm-logo img').attr("src", 'images/logo.png');
            } else {
                this_color_file = 'css/theme-' + color + '.css';
                $('.tm-logo img').attr("src", 'images/logo-dark.png');
            }

            theme_style.attr('href', this_color_file);
        };

        if ($.cookie('selected_color') && $.cookie('selected_color') != 'default' && typeof $.cookie('selected_color') !== 'undefined') {
            change_selected_color($.cookie('selected_color'));
        } else {
            $('a.tm-color-default').addClass('uk-active');
        }
    } 

    $('.tm-color-schemes a').on('click', function () {
        var selected_color = $(this).data('color');
        $.cookie('selected_color', selected_color, {expires: 365, path: '/'});
        
        if(isset_theme_style) {
            change_selected_color(selected_color);
        } else {
            window.location.href = '/';
        }
    });

    // Progress bar
    $('.uk-progress-bar').on('inview.uk.scrollspy', function()
    {
        $(this).css('width', $(this).data('value')+'%' );
    });

    // Custom modal
    var modal_autoload_selector = $('.tm-modal-autoload');
    if(modal_autoload_selector.length) {
        var autoload_modal = modal_autoload_selector.eq(0),
            autoload_modal_id = autoload_modal.attr('id'),
            autoload_modal_bgclose = autoload_modal.data('bgclose'),
            autoload_modal_center = autoload_modal.data('center'),
            autoload_modal_delay = parseInt(autoload_modal.data('delay')),
            autoload_modal_display = !!JSON.parse(String(autoload_modal.data('display')).toLowerCase());

        if(autoload_modal_id != '' && ($.cookie('custom_modal_'+autoload_modal_id) != 'hide' || $.cookie('custom_modal_length_'+autoload_modal_id) != autoload_modal.text().length)) {
            var modal = UIkit.modal('#'+autoload_modal_id, {bgclose:autoload_modal_bgclose,center:autoload_modal_center});

            if ( !modal.isActive() ) {
                if(autoload_modal_delay) {
                    setTimeout(function() {
                        modal.show();
                    }, autoload_modal_delay);
                } else {
                    modal.show();
                }
            }

            if(autoload_modal_display) {
                modal.on({
                    'hide.uk.modal': function(){
                        $.cookie('custom_modal_'+autoload_modal_id, 'hide', {expires: 365, path: '/' });
                        $.cookie('custom_modal_length_'+autoload_modal_id, autoload_modal.text().length, {expires: 365, path: '/' });
                    }
                });
            }
        }
    }

    // Add to cart
    if( $('ul.tm-products').length ) {
        $(document).on('click', '.tm-add-to-cart', function () {
            var spacer = $(this).closest('.uk-panel');

            spacer.block({message: null,
                overlayCSS: {
                    cursor: 'none'
                }
            });

            var ico = spacer.find('.tm-icon-cart'),
                message = $('.tm-shopping-cart .ajax-product-added');
            
            setTimeout(function(){

                ico.addClass('add');
                ico.parent().addClass('added');

                message.addClass('uk-animation-slide-top').show();

                setTimeout(function () {
                    ico.removeClass('add');
                    ico.parent().removeClass('added');
                    message.removeClass('uk-animation-slide-top').fadeOut();
                }, 2000);

                spacer.unblock();
            }, 2000);
        });
    }
    
    // Remove cart item
    $(document).on('click', '.tm-mini-cart-item .remove', function (e) {
        e.preventDefault();
        
        var cart_item = $(this).closest('.tm-mini-cart-item');

        cart_item.block({message: null,
            overlayCSS: {
                cursor: 'none'
            }
        });

        setTimeout(function(){
            cart_item.remove();
            
            if(!$('ul.tm-cart-list li').length) {
                $('.tm-shopping-cart-content').html('<ul class="tm-cart-list"><li class="empty">No products in the cart.</li></ul>');
                
            }
        }, 2000);
    });

    // Price slider uses jquery ui
    if($('.price_slider').length) {
        var min_price = $('.price_slider_amount #min_price').data('min'),
            max_price = $('.price_slider_amount #max_price').data('max'),
            current_min_price = parseInt(min_price, 10),
            current_max_price = parseInt(max_price, 10);

        $('.price_slider').slider({
            range: true,
            animate: true,
            min: min_price,
            max: max_price,
            values: [current_min_price, current_max_price],
            create: function () {
                $('.price_slider_amount #min_price').val(current_min_price);
                $('.price_slider_amount #max_price').val(current_max_price);
                $('.price_slider_amount span.from').html('£' + current_min_price);
                $('.price_slider_amount span.to').html('£' + current_max_price);
            },
            slide: function (event, ui) {
                $('input#min_price').val(ui.values[0]);
                $('input#max_price').val(ui.values[1]);
                $('.price_slider_amount span.from').html('£' + ui.values[0]);
                $('.price_slider_amount span.to').html('£' + ui.values[1]);
            }
        });
    }

    // product lightbox
    var product_lightbox_img = $('.tm-product-gallery-img a');
    if (product_lightbox_img.length) {
        var product_lightbox = UIkit.lightbox(product_lightbox_img, {});

        $(product_lightbox_img).on('click', function (e) {
            e.preventDefault();
            product_lightbox.show(product_lightbox_img.index(this));
        });

        // Reset lightbox first img
        $('body').on('variation-has-changed', function () {
            product_lightbox.siblings[0].source = product_lightbox_img.eq(0).attr('href');
        });
    }

    $( document ).on( 'change', 'select#pa_color', function() {
        if($(this).val() == 'black') {
            $('.tm-product-gallery-img a').attr('href', 'images/products/prod-img4.jpg');
            $('.tm-product-gallery-img img').attr('src', 'images/products/prod-img4.jpg');
        } else {
            $('.tm-product-gallery-img a').attr('href', 'images/products/prod-img2.jpg');
            $('.tm-product-gallery-img img').attr('src', 'images/products/prod-img2.jpg');
        }

        $('body').trigger('variation-has-changed');
        return false;
    });

    // product reviews
    $(document).on('click', '.stars a', function (e) {
        e.preventDefault();

        var parent = $(this).parent().parent(),
            this_select = parent.next(),
            this_option = this_select.find('option'),
            this_active_option = this_select.find('option[value='+$(this).text()+']');

        this_option.removeAttr('selected');
        this_active_option.attr('selected', 'selected');

        parent.find('a').removeClass('uk-active');
        $(this).addClass('uk-active');
    });

    // Change quantity
    var change_quantity = function(qty_operator, qty_object) {
        var step = parseInt(qty_object.attr('step')),
            max = parseInt(qty_object.attr('max'));

        if(isNaN(step)){ step = 1; }

        if(isNaN(max)){ max = 100000; }

        if(qty_operator == "plus") {
            var Qtt = parseInt(qty_object.val());
            if (!isNaN(Qtt) && Qtt < max) {
                qty_object.val(Qtt + step);
            }
        }

        if(qty_operator == "minus") {
            var Qtt = parseInt(qty_object.val());
            if (!isNaN(Qtt) && Qtt > step) {
                qty_object.val(Qtt - step);
            } else qty_object.val(step);
        }

        if(qty_operator == "blur") {
            var Qtt = parseInt(qty_object.val());
            if (!isNaN(Qtt) && Qtt > max) {
                qty_object.val(max);
            }
        }
    };

    $(document).on('click', '.quantity .plus', function(){
        change_quantity('plus', $(this).parent().find('.qty'));
    });
    $(document).on('click', '.quantity .minus', function(){
        change_quantity('minus', $(this).parent().find('.qty'));
    });
    $(document).on('blur', '.quantity .qty', function(){
        change_quantity('blur', $(this));
    });

    // Shipping toggle
    $( document ).on( 'click', '.tm-shipping-calculator-button', function() {
        $( '.tm-shipping-calculator-form' ).slideToggle( 'slow' );
        return false;
    });

    // Payment method toggle
    var payment_method_selected = function(){
        $('.tm-checkout-payment li').each(function(){
            var target_payment_box = $(this).find('.payment_box'),
                target_payment_input = $(this).find('input');

            if(target_payment_input.is(':checked') && !target_payment_box.is( ':visible' ) ) {
                target_payment_box.slideDown( 250 );
            } else if(!target_payment_input.is(':checked')){
                target_payment_box.slideUp( 250 );
            }
        });
    };

    payment_method_selected();
    $( document ).on( 'change', 'input[name=payment_method]', function() {
        payment_method_selected();
        return false;
    });

    // Create account toggle
    $( document ).on( 'change', '#createaccount', function() {
        $( this).next().next().slideToggle( 'slow' );
        return false;
    });

    // Ship to a different address
    $( document ).on( 'change', '#ship-to-different-address-checkbox', function() {
        $( this).parent().next().slideToggle( 'slow' );
        win.trigger('resize');
        return false;
    });

    // Make full width row
    var full_width_row = function() {
        var $elements = $('.tm-row-full-width');
        
        $.each($elements, function (key, item) {
            var $el = $(this),
                $el_full = $el.next(".tm-row-full-width-js");
            
            $el.addClass("uk-hidden");
           
            if ($el_full.length) {
                var el_margin_left = parseInt($el.css("margin-left"), 10), 
                    el_margin_right = parseInt($el.css("margin-right"), 10), 
                    offset = 0 - $el_full.offset().left - el_margin_left, 
                    width = win.width();
                
                $el.css({
                    position: "relative",
                    left: offset,
                    "box-sizing": "border-box",
                    width: width
                }).removeClass("uk-hidden");
            }
        });
    };

    // Fix footer
    var footer_move = function() {
        if(html.hasClass('tm-coming-soon') || html.hasClass('tm-error')) {
            if(win.height() < $('.uk-vertical-align-middle').height()) {
                html.removeClass('uk-height-1-1');
            } else {
                html.addClass('uk-height-1-1');
            }
        }

        var get_viewport_height = function() {
                return ((document.compatMode || isIE) && !isOpera)
                    ? (document.compatMode=='CSS1Compat')
                    ? document.documentElement.clientHeight
                    : document.body.clientHeight
                    : (document.parentWindow || document.defaultView).innerHeight;
            },
            ua = navigator.userAgent.toLowerCase(),
            isOpera = (ua.indexOf('opera')  > -1),
            isIE = (!isOpera && ua.indexOf('msie') > -1),
            viewportHeight = get_viewport_height(),
            wrapper = $("#tm-wrapper"),
            footer = $("#tm-footer");

        wrapper.css("min-height", viewportHeight-footer.outerHeight(true));

    };
    
    footer_move();
    full_width_row();

    // Window resize
    win.on('resize', function() {
        footer_move();
        full_width_row();
    });

    // Progress bar scroller
    var top_progress_bar = function() {
        var winHeight = win.height(),
            docHeight = $(document).height(),
            max = docHeight - winHeight,
            value = win.scrollTop(),
            width = value / max * 100;

        $('.tm-top-progress-bar').css({width: width+'%'})
    };

    if($('.tm-top-progress-bar').length) {
        top_progress_bar();
    }

    // Scroll to top
    win.scroll(function () {
        if (win.scrollTop() > 200) {
            $('.tm-totop-scroller').addClass('uk-active');
        } else {
            $('.tm-totop-scroller').removeClass('uk-active');
        }

        if($('.tm-top-progress-bar').length) {
            top_progress_bar();
        }
    });


    var is_email = function(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        
        if(!regex.test(email)) {
            return false;
        }else{
            return true;
        }
    };
    
    $('.tm-contact-form form').on('submit', function(e){
        e.preventDefault();
        
        var form = $(this),
            name = form.find('#contact-form-author'),
            email = form.find('#contact-form-email'),
            subject = form.find('#contact-form-subject'),
            text = form.find('#contact-form-text'),
            button = form.find('.uk-button');
        
        if(name.val()) {
            name.removeClass('uk-form-danger');
        } else {
            name.addClass('uk-form-danger');
        }

        if(is_email(email.val())) {
            email.removeClass('uk-form-danger');
        } else {
            email.addClass('uk-form-danger');
        }

        if(subject.val()) {
            subject.removeClass('uk-form-danger');
        } else {
            subject.addClass('uk-form-danger');
        }
        
        if(form.find('.uk-form-danger').length) {
            return false;
        }

        button.next().fadeIn();
        
        $.post('sendmail.php', form.serialize(), function (result)
        {
            setTimeout(function() {
                var result_arr = result.split('|');

                button.next().fadeOut();
                button.next().after('<div class="uk-alert uk-alert-'+result_arr[0]+' uk-text-left uk-animation-fade">'+result_arr[1]+'</div>');
                
                if(result_arr[0] == 'success') {
                    name.val('');
                    email.val('');
                    subject.val('');
                    text.val('');
                }
            }, 2000);
        });
    });
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-71610751-5', 'auto');
ga('send', 'pageview');
