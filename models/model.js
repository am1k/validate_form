/**
 * Created by v.bogoroditskiy on 9/18/2015.
 */

define(['../js/backbone'], function(Backbone){

   var ModelValidate = Backbone.Model.extend({
        validation: {
            name: {
                required: true,
                msg: 'Incorrect name'
            },
            surname: {
                required: false,
                msg: 'Incorrect surname'
            },
            email: {
                required: false,
                pattern: 'email',
                msg: 'Incorrect email'
            },
            telephone: {
                required: true,
                pattern: 'digits',
                msg: 'Incorrect telephone'
            },
            select: {
                required: true,
                msg: 'Please select options'
            }
        }
   });

   return ModelValidate;
});