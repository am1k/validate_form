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
        this.form.addEventListener('click',function(e){
            if(e.srcElement.tagName.toLocaleLowerCase() === 'button') {
                self.checkValidate();
                self.checkForm(e);
            }
        });
        this.form.addEventListener('keyup', function(e) {
            if(e.srcElement.tagName.toLocaleLowerCase() === 'input') {
                self.checkValidate();
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
    checkValidate: function(){
        this.els = this.form.querySelectorAll('[data-pattern]');
        this.checkRequired();
    },
    checkRequired: function(){
        var isRequired,
            rule;
        Array.prototype.forEach.call(this.els, function(el){
            isRequired = el.getAttribute('required') != null || el.value.length;
            rule = this.options.rules[el.getAttribute('data-pattern')];

            if(typeof rule === 'function'){
                this.setState(rule(el), isRequired, el);
            }else {
                this.setState(!rule.test(el.value), isRequired, el);
            }
        }.bind(this))
    },
    setState: function(err, isRequired, el){
        if(!isRequired){
            el.classList.remove(this.options.errorClass);
        }
        if(isRequired){
            if(err){
                el.classList.add(this.options.errorClass);
            }else{
                el.classList.remove(this.options.errorClass);
            }
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


