/**
 * Created by v.bogoroditskiy on 8/5/2015.
 */
function ValidateForm(){
    this.rules = {
        required: /^[a-zA-Zà-ÿÀ-ß]+$/,
        email: /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/,
        telephone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        select: function(el){
            if (el.options[el.selectedIndex].index == 0){
                return true;
            }
        }
    };
    this.init();
}

ValidateForm.prototype = {

    init: function() {
        this.setListener();
    },
    setListener: function (){
        var self = this;
        document.querySelector('#form').addEventListener('click', function(e) {
            if(e.srcElement.tagName.toLocaleLowerCase() === 'button') {
                self.checkRequired();
                self.checkForm(e);
            }
        })
    },
    checkForm: function(e){
        this.childElements = document.querySelector('#form').getElementsByClassName('error');
        if(this.childElements.length > 0 ) {
            e.preventDefault();
        }
    },
    checkRequired: function(){
        var rule;
        this.els = document.querySelector('#form').querySelectorAll('[data-pattern]');
        Array.prototype.forEach.call(this.els, function(el){
            rule = this.rules[el.getAttribute('data-pattern')];
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
            el.classList.add('error');
        }else{
            el.classList.remove('error');
        }
    }
};
new ValidateForm();


