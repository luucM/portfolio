class FormSubmit {
    constructor(configuracoes) {
        this.configuracoes = configuracoes;
        this.form = document.querySelector(configuracoes.form);
        this.formButton = document.querySelector(configuracoes.button);
        if (this.form) {
            this.url = this.form.getAtributte("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
        this.form.innerHTML = this.configuracoes.success;
    }

    displayError() {
        this.form.innerHTML = this.configuracoes.error;
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAtributte("name")] = field.value; 
        });
        return formObject;
    }

    onSubmission(event) {
        event.preventDefault();
        event.target.disable = true;
        event.target.innerText = "Enviando...";
    }

    async sendForm(event) {
        try {
            this.onSubmission(event);
            await fetch(this.url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
        } catch (error) {
            this.displayError();
            throw new Error(error);
        }
    }

    init() {
        if (this.form) this.formButton.addEventListener("click", this.sendForm);
        return this;
    }
}

const FormSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Mensagem enviada!</h1>",
    error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
});

FormSubmit.init();