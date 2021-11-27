let valid = true;
function check(input,error) {
    if (!checkRequiered(input.value))
    {
        input.classList.add("error-input");
        error.innerText = "Pole jest wymagane";
       valid = false;
    }
    else if (!checkTextLengthRange(input.value,5,20))
    {

        input.classList.add("error-input")
        error.innerText = "Powinno zawierać od 5 do 20 znakow";
        valid = false;
    }
}


function resetErrors(inputs,errorText,errorInfo) {
    for (let i = 0; i < inputs.length; i++)
    {
        inputs[i].classList.remove("error-input");
    }
    for (let i =0;i<errorText.length;i++)
    {
        errorText[i].innerText = "";
    }
    errorInfo.innerText="";
}







function validationKlientForm()
{

const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const ageInput = document.getElementById('age');
const sexInput = document.getElementById('sex');
const  errorSummary = document.getElementById('errorSummury');
    const firsError = document.getElementById('errorFirstName');
    const lastError = document.getElementById('errorLastName');
    const ageError = document.getElementById('errorAge');
    const sexError = document.getElementById('errorSex');
    check(firstNameInput,firsError);
    check(lastNameInput,lastError);
    check(ageInput,ageError);
    check(sexInput,sexError);
    if (!valid)
    {
       alert("Formulaz zawiera bledy")
    }
    resetErrors([firstNameInput,lastNameInput,ageInput,sexInput],[firsError,lastError,ageError,sexError],errorSummary)


}
function checkRequiered(value) {
    if (!value) {
        return false
    }
    else
    {   value= value.toString().trim();
        return value !== "";
    }


}

function checkTextLengthRange (value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    else
    {
        return !(min && length < min);
    }


}