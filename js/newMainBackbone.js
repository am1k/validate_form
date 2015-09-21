/**
 * Created by v.bogoroditskiy on 9/18/2015.
 */

define([
    './backbone',
    'text!../template/form.html',
    '../models/model',
    './backbone-validation-amd-min',
    './backbone.stickit',
    './backbone.stickit.form'
],  function(Backbone, myTemplate, ModelValidate, Validation, stickit, BackboneStickitForm){

    var ViewValidate = Backbone.View.extend({
        className: 'form',

        tagName: 'form',

        model: new ModelValidate(),

        bindings: BackboneStickitForm.getBindings(['name','surname', 'email', 'telephone', 'select']),

        events: {
            'click #submit' : 'setValidate'
        },

        setValidate: function(e) {
            e.preventDefault();
            console.log(this.model.isValid(true));
            if(this.model.isValid(true)){
                alert('Great Success!');
            }
        },

        template: _.template(myTemplate),

        initialize: function(){
            this.render();
            return this;
        },

        render: function(){
            this.$el.html(this.template());
            Backbone.Validation.bind(this, {
                valid: function (view, attr, selector) {
                    var $el = view.$('[name=' + attr + ']'),
                        $group = $el.closest('.form-group');

                    $group.removeClass('error');
                    $group.find('.help-block').html('').addClass('hide');
                },
                invalid: function (view, attr, error, selector) {
                    var $el = view.$('[name=' + attr + ']'),
                        $group = $el.closest('.form-group');

                    $group.addClass('error');
                    $group.find('.help-block').html(error).removeClass('hide');
                }
            });
            this.stickit(this.model, this.bindings);
            return this;
        }
    });

    return ViewValidate;
});
