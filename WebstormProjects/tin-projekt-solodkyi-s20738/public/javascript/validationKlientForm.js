function resetErrors(inputs, errorTexts, errorInfo) {
    for(let i=0; i<inputs.length; i++) {
        inputs[i].classList.remove("error_input");
    }
    for(let i=0; i<errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}

function validateForm() {
    const imieInput = document.getElementById('Imie');
    const lastNameInput = document.getElementById('Nazwisko');
    const ageInput = document.getElementById('Wiek');


    const errorFirstName = document.getElementById('errorImie');
    const errorLastName = document.getElementById('errorLastName');
    const ageError = document.getElementById('errorSex');

    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([imieInput, lastNameInput, ageInput], [errorFirstName, errorLastName, ageError], errorsSummary);

    let valid = true;

    if (!checkRequired(imieInput.value)) {
        console.log("first error")
        valid = false;
        imieInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(imieInput.value, 2, 20)) {
        console.log("first error")
        valid = false;
        imieInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 20 znaków";
    }

    if (!checkRequired(lastNameInput.value)) {
        console.log("last error")
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 20)) {
        console.log("last error")
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 20 znaków";
    }

    if (!checkRequired(ageInput.value)) {
        valid = false;
        console.log("age error")
        ageInput.classList.add("error-input");
        ageError.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(ageInput.value, 5, 120)) {
        console.log("age error")
        valid = false;
        ageInput.classList.add("error-input");
        ageError.innerText = "Pole powinno zawierać od 5 do 120 lat";
    }

    if (!valid) {
        console.log("error")
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}