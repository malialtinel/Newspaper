/*! UIkit 2.27.4 | http://www.getuikit.com | (c) 2014 YOOtheme | MIT License */
(function(addon) {

    var component;

    if (window.UIkit2) {
        component = addon(UIkit2);
    }

    if (typeof define == 'function' && define.amd) {
        define('uikit-search', ['uikit'], function(){
            return component || addon(UIkit2);
        });
    }

})(function(UI){

    "use strict";

    UI.component('search', {
        defaults: {
            msgResultsHeader   : 'Search Results',
            msgMoreResults     : 'More Results',
            msgNoResults       : 'No results found',
            template           : '<ul class="tm-search-autocomplete-results">{{#msgResultsHeader}}<li class="tm-search-header">{{msgResultsHeader}}</li>{{/msgResultsHeader}}{{#items && items.length}}<li class="tm-search-grid"><ul class="uk-grid uk-grid-medium">{{~items}}<li class="uk-width-1-1 uk-width-small-1-2 uk-width-medium-1-3 uk-width-large-1-4" data-url="{{!$item.url}}"><div class="uk-article uk-article-list uk-article-related"><a href="{{!$item.url}}">{{#$item.img}}<img src="{{{$item.img}}}" alt="" />{{/$item.img}}</a><p class="uk-article-meta">{{{$item.category}}}{{{$item.data}}}</p><h2 class="uk-article-title"><a href="{{!$item.url}}">{{{$item.title}}}</a></h2></div></li>{{/items}}</ul></li>{{#msgMoreResults}}<li class="uk-nav-divider uk-skip"></li><li class="uk-search-moreresults" data-moreresults="true"><a href="#" onclick="jQuery(this).closest(\'form\').submit();">{{msgMoreResults}}</a></li>{{/msgMoreResults}}{{/end}}{{^items.length}}{{#msgNoResults}}<li class="uk-skip"><a>{{msgNoResults}}</a></li>{{/msgNoResults}}{{/end}}</ul>',

            renderer: function(data) {

                var opts = this.options;

                this.dropdown.append(this.template({items:data.results || [], msgResultsHeader:opts.msgResultsHeader, msgMoreResults: opts.msgMoreResults, msgNoResults: opts.msgNoResults}));
                this.show();
            }
        },

        boot: function() {

            // init code
            UI.$html.on('focus.search.uikit', '[data-uk-search]', function(e) {
                var ele =UI.$(this);

                if (!ele.data('search')) {
                    UI.search(ele, UI.Utils.options(ele.attr('data-uk-search')));
                }
            });
        },

        init: function() {
            var $this = this;

            this.autocomplete = UI.autocomplete(this.element, this.options);

            this.autocomplete.dropdown.addClass('uk-dropdown-search');

            this.autocomplete.input.on("keyup", function(){
                $this.element[$this.autocomplete.input.val() ? 'addClass':'removeClass']('uk-active');
            }).closest("form").on("reset", function(){
                $this.value = '';
                $this.element.removeClass('uk-active');
            });

            this.on('selectitem.uk.autocomplete', function(e, data) {
                if (data.url) {
                  location.href = data.url;
                } else if(data.moreresults) {
                  $this.autocomplete.input.closest('form').submit();
                }
            });

            this.element.data('search', this);
        }
    });
});
