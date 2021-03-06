'use strict';

(function ($) {
    $.fn.MyForm = function (options) {

        this.settings = $.extend({

            'el': $(this) || [],
            form: [],
        }, options);

        var el = this.settings.el,
            prive = {};

        Object.assign(this, {});

        Object.assign(prive, {

            'generate': function (settings) {

                var form1 = el.append('<form></form>'),
                    elDiv,
                    elInput,
                    elDiv1,
                    elInput1,
                    elDiv2,
                    elSelect,
                    regexInput;

                settings.form.forEach(function (v) {

                    if (v.type == 'text') {
                        
                    // Création des champs de texte du formualire
                        form1.append('<label>' + v.label + '</label>')
                        elDiv = $('<div></div');

                        elInput = $('<input/>', {

                            type: v.type || '',
                            id: v.id || '',
                            placeholder: v.placeholder || ''

                        });
                        
                        // Verification des valeurs du formualaires
                        elInput.change(function () {

                            if (v.regex) {
                                regexInput = new RegExp(v.regex);

                                if (!regexInput.test(elInput.val())) {
                                    elInput.css('background-color', 'red');
                                } else {
                                    elInput.css('background-color', 'green');
                                }
                            }
                        })

                        $(elDiv).append(elInput);
                        $(form1).append(elDiv);

                    }

                    if (v.type == 'select') {
                        
                    // Création d'une liste déroulante
                        form1.append('<label>' + v.label + '</label>')
                        elDiv2 = $('<div></div');
                        elSelect = $('<select selected />');

                        v.options.forEach(function (o) {

                            elSelect.append($('<option />', {

                                'value': o.value,
                                'text': o.name
                            }))
                        })

                        $(elDiv2).append(elSelect);
                        $(form1).append(elDiv2);

                    }

                    if (v.type == 'submit') {
                        
                    // Creation d'un bouton de validation
                        form1.append('<br>');

                        elDiv1 = $('<div></div');

                        elInput1 = $('<input/>', {

                            type: v.type || '',
                            id: v.id || '',
                            value: v.value || ''

                        });

                        $(elDiv1).append(elInput1);
                        $(form1).append(elDiv1);
                    }

                });

                // Lors du clique sur le bouton on affiche les valeurs du formualaires dans la console
                var dataForm = [];
                $('input').blur(function () {
                    dataForm[this.id] = $(this).val();
                });

                $('#envoie').click(function () {

                    console.log(dataForm);

                });

            }

        });

        // Initialise the plugin
        prive.generate(this.settings);

        return this;
    };
}(jQuery));
