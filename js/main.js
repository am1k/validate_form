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
        this.findElements();
        this.setListener();
    },
    findElements: function(){
        this.els = this.form.querySelectorAll('[data-pattern]');
    },
    debounce: function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    setListener: function (){
        var self = this;
        this.keyupHandler = this.debounce(function(e) {
            if(e.srcElement.tagName.toLocaleLowerCase() === 'input') {
                self.checkField(e.srcElement);
            }
        }, 500);
        this.form.addEventListener('click',function(e){
            if(e.srcElement.tagName.toLocaleLowerCase() === 'button') {
                self.validate();
                console.log(self.isValid);
                if(!self.isValid){
                    e.preventDefault();
                }
            }
        });
        this.form.addEventListener('keyup', this.keyupHandler);
    },

    validate: function(){
        this.isValid = true;
        Array.prototype.forEach.call(this.els, this.checkField.bind(this));
    },

    checkField: function(el){
        if(el.value.length > 0 && el.selectedIndex != 0){
            var isRequired,
                rule;
            isRequired = el.getAttribute('required') != null || el.value.length;
            rule = this.options.rules[el.getAttribute('data-pattern')];
            if(typeof rule === 'function'){
                this.setState(rule(el), isRequired, el);
            }else {
                this.setState(!rule.test(el.value), isRequired, el);
            }
        }
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


