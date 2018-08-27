/**
 * MyBB Autocomplete
 * 
 * @author: effone <me@eff.one>
 * @author: Eric Jackson
 * @website: https://github.com/effone/jquery.fyl
 * @license: MIT
 */

class MyBBAutocomplete {
    constructor (customOptions, selector) {
        this.options = Object.assign({
            bank: '',
            only: false,
            char: 3,
            vals: '',
            lang: {
                blank: "Min {x} chars.",
                more: "{x} more chars.",
                none: "No match.",
                unexp: "Bad data.",
                error: "Error!"
            }
        }, customOptions);

        if (!isNumeric(this.options.char) || this.options.char < 1) {
            this.options.char = 1;
        }

        const isNumeric = (number) => !isNaN(parseFloat(number)) && isFinite(number);
        const build = (domString) => parseHTML(domString).textContent.trim;

        const parseHTML = function(domString) {
            let tmp = document.implementation.createHTMLDocument();
            tmp.body.innerHTML = domString;
            return tmp.body.children;
        };
    }
}

; (function ($) {
    $.fn.fyl = function (opts) {
        var conf = $.extend({
            bank: '',
            only: false,
            char: 3,
            vals: '',
            lang: {
                blank: "Min {x} chars.",
                more: "{x} more chars.",
                none: "No match.",
                unexp: "Bad data.",
                error: "Error!"
            }
        }, opts);

        if (!$.isNumeric(conf.char) || conf.char < 1) { conf.char = 1; }
        var main = $(this);
        var fyd = 'fyl-' + main.attr('id');
        var fyls = '<span class=\'fyls\'>{i}<span class=\'fylx\'>&#10006;</span></span>';
        var fylr = '<div class=\'fylr\'>{r}</div>'


        main.after('<div id=\'' + fyd + '\'><div class=\'pop\'><input type=\'text\' class=\'srch\' placeholder=\'Search\' autocomplete=\'off\'><span class=\'spin\'></span><div class=\'err\'></div><div class=\'rslt\'></div></div></div>');//.hide();
        var clone = $('#' + fyd);
        var pop = clone.find('.pop');
        var err = pop.find('.err');
        clone.outerWidth(main.outerWidth());
        pop.width(clone.width());
        // Add the predefined values
        var nVal = 0;
        $.each($.trim(!$.trim(conf.vals) ? main.val() : conf.vals).split(','), function (i, val) {
            if (!conf.only) { nVal = 0; }
            if ($.trim(val) && nVal < 1) {
                clone.append(fyls.replace('{i}', $.trim(val)));
                nVal++;
            }
        });
        reX();


        $(document).on('click', function () { reX(); });

        clone.on('click', function (e) {
            e.stopPropagation();
            var clk = event.target;
            if (clk.id == fyd) {
                $(this).addClass('open').find('.pop').slideDown('fast').find('.srch').focus();
            } else if (clk.className == 'fylr') {
                var name = $(clk).text();
                if (conf.only) {
                    $(this).find('.fyls').remove();
                }
                $(this).append(fyls.replace('{i}', name));
                reX();
            } else if (clk.className == 'fylx') {
                $(clk).parent().remove();
                reX();
            }
        });

        pop.find('.srch').keyup(function () {
            pop.find('.fylr').remove();
            var inVal = sx($(this).val());
            var inLen = inVal.length;
            if (inLen < conf.char) {
                var errStr = inLen > 0 ? 'more' : 'blank';
                err.show().html(conf.lang[errStr].replace('{x}', conf.char - inLen));
            } else {
                err.hide();
                pop.find('.spin').show();
                $.ajax({
                    url: conf.bank,
                    type: 'post',
                    data: { 'search': inVal },
                    cache: false,
                    success: function (json) {
                        var isJ = true;
                        try { JSON.parse(json); } catch (e) { isJ = false; }
                        pop.find('.fylr').remove();
                        var ins = 0;
                        if (isJ) {
                            var exist = $(main).val().split(',');
                            $.each(JSON.parse(json), function (i, item) {
                                if ($.inArray(sx(item), exist) === -1) {
                                    pop.find('.rslt').append(fylr.replace('{r}', $.trim(item)));
                                    ins++;
                                }
                            });
                        }
                        if (ins == 0) {
                            var erm = isJ ? 'none' : 'unexp';
                            err.html(conf.lang[erm]).show();
                        }
                    },
                    error: function (xhr, desc, err) {
                        // console.log(xhr.status + " - " + desc + " - " + err);
                        pop.find('.fylr').remove();
                        err.html(conf.lang.error).show();
                    },
                    complete: function () {
                        pop.find('.spin').hide();
                    }
                });
            }
        });

        function reX() {
            pop.find('.fylr').remove();
            pop.find('.spin').hide();
            pop.css('margin-top', clone.outerHeight() - 2 + 'px').hide().find('.srch').val('');
            clone.removeClass('open').find('.err').show().html(conf.lang.blank.replace('{x}', conf.char));
            main.val(clone.find('.fyls').text().replace(/✖/g, ',').slice(0, -1));
        }

        function sx(t) { return $.trim($($.parseHTML(t)).text()); }
    };
}(jQuery));