/**
 * Created by v.bogoroditskiy on 8/5/2015.
 */
;(function(){
    var rules = {
        required: /^[a-zA-Zà-ÿÀ-ß]+$/,
        email: /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/,
        telephone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
    };

    var state = true;

    Array.prototype.forEach.call(els, function(el){
        setState(!rules[el.getAttribute('data-pattern')].test(el.value), el);
    });


    function validateForm(form, options){
        this.form = form;

        this.init();
    }
    validateForm.prototype = {

        setListener: function (){
            document.querySelector('#form').addEventListener('click', function(e) {
                if(e.srcElement.tagName.toLocaleLowerCase() === 'buttton') {


                }
            })
        }
        inputs: function() {
            var els = form.querySelectorAll('[required]');
            var elements = document.form.elements.length-1;
            var findElements = [];
            for (var i=0; i<elements; i++) {
                var val = document.form.elements[i];
                findElements.push(val);
            }
        },
        fistName: function(){
            var checkInput = document.querySelector('#name').value;
            var validName = /^[a-zA-Zà-ÿÀ-ß]+$/;
            if(!validName.test(checkInput)){
                document.querySelector('#name').classList.add('error');
            }
        },
        lastName: function() {
            var checkInput = document.querySelector('#surname').value;
            var validName = /^[a-zA-Zà-ÿÀ-ß]+$/;
            if(!validName.test(checkInput)){
                document.querySelector('#surname').classList.add('error');
            }
        },
        checkEmail: function() {
            var checkInput = document.querySelector('#email').value;
            var validName = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
            if (!validName.test(checkInput)) {
                document.querySelector('#email').classList.add('error');
            }
        },
        checkTelephone: function() {
            var checkInput = document.querySelector('#telephone').value;
            var validName = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
            if (!validName.test(checkInput)) {
                document.querySelector('#telephone').classList.add('error');
            }
        },
        checkSelect: function(){
            var checkSel = document.querySelector('#select-value').value;
            if(checkSel == 0) {
                document.querySelector('#select-value').classList.add('error');
            }
        }
    };
})();


//new Validator(form, {
//   errorClass: 'fail',
    rules: {
        myRequired: fu
    }
//});

