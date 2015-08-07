/**
 * Created by v.bogoroditskiy on 8/5/2015.
 */

function extend(obj1, obj2){
    if(obj2 && obj1){
        Object.keys(obj2).forEach(function(key){
            if(typeof obj1[key] === 'object'){
                obj1[key] = extend(obj1[key], obj2[key]);
            }else{
                obj1[key] = obj2[key];
            }
        });
    }
    return obj1;
}
function ValidateForm(form,options){
    this.form = form;
    this.options = extend({
        errorClass: 'error',
        rules: {
            required: /^[a-zA-Zà-ÿÀ-ß]+$/,
            email: /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/,
            telephone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
            select: function(el){
                if (el.options[el.selectedIndex].index == 0){
                    return true;
                }
            }
        }
    }, options);
    this.init();
}

ValidateForm.prototype = {

    init: function() {
        this.setListener();
    },
    setListener: function (){
        var self = this;
        this.form.addEventListener('click', function(e) {
            if(e.srcElement.tagName.toLocaleLowerCase() === 'button') {
                self.checkRequired();
                self.checkForm(e);
            }
        })
    },
    checkForm: function(e){
        this.childElements = this.form.getElementsByClassName(this.options["errorClass"]);
        if(this.childElements.length > 0 ) {
            e.preventDefault();
        }
    },
    checkRequired: function(){
        var rule;
        this.els = this.form.querySelectorAll('[data-pattern]');
        Array.prototype.forEach.call(this.els, function(el){
            rule = this.options.rules[el.getAttribute('data-pattern')];
            if(el.getAttribute('required') != null || el.value.length){
                if(typeof rule === 'function'){
                    this.setState(rule(el), el);
                }else{
                    this.setState(!rule.test(el.value), el);
                }
            }

        }.bind(this))
    },
    setState: function(err, el){
        if(err){
            el.classList.add(this.options["errorClass"]);
        }else{
            el.classList.remove(this.options["errorClass"]);
        }
    }
};
new ValidateForm(document.querySelector('#form'), {
    errorClass: 'fail',
    rules: {
        'checkbox': function(el){
            return !el.checked
        }
    }
});


