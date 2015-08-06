/**
 * Created by v.bogoroditskiy on 8/5/2015.
 */
function ValidateForm(){
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
                self.firstName();
                self.lastName();
                self.checkEmail();
                self.checkTelephone();
                self.checkSelect();
                self.checkForm(e);
            }
        })
    },
    firstName: function(){
        this.checkInput = document.querySelector('#name').value;
        this.validName = /^[a-zA-Zà-ÿÀ-ß]+$/;
        if(!this.validName.test(this.checkInput)){
            document.querySelector('#name').classList.add('error');
        }
    },
    lastName: function() {
        this.checkInput = document.querySelector('#surname').value;
        this.validName = /^[a-zA-Zà-ÿÀ-ß]+$/;
        if(!this.validName.test(this.checkInput)){
            document.querySelector('#surname').classList.add('error');
        }
    },
    checkEmail: function() {
        this.checkInput = document.querySelector('#email').value;
        this.validName = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
        if (!this.validName.test(this.checkInput)) {
            document.querySelector('#email').classList.add('error');
        }
    },
    checkTelephone: function() {
        this.checkInput = document.querySelector('#telephone').value;
        this.validName = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        if (!this.validName.test(this.checkInput)) {
            document.querySelector('#telephone').classList.add('error');
        }
    },
    checkSelect: function(){
        this.checkSel = document.querySelector('#select-value').value;
        if(this.checkSel == 0) {
            document.querySelector('#select-value').classList.add('error');
        }
    },
    checkForm: function(e){
        this.submitButton = document.querySelector('#submit');
        this.childElements = document.querySelector('#form').getElementsByClassName('error');
        if(this.childElements.length > 0 ) {
            e.preventDefault();
        }
    }
};
new ValidateForm();


