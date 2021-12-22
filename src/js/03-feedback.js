import throttle from "lodash.throttle";

const form = document.querySelector('form');
const email = document.querySelector('input');
const message = document.querySelector('textArea');

let feedbackFormState = {
    email: '',
    message: '',
};

function inputData(){
    let existingData = localStorage.getItem('feedback-form-state');
    if (existingData) {
        existingData = JSON.parse(existingData);
        Object.entries(existingData).forEach(([name, value]) => {
            console.log(name, value)
            feedbackFormState[name] = value;
            form.elements[name].value = value;
        })
    };
}
inputData();

const formInput = (event) => {
    feedbackFormState[event.target.name] = event.target.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(feedbackFormState))
}

const handleSubmit = (event) => {
    event.preventDefault();
    const elements = { email: email.value, message: message.value }
    console.log(elements);
    email.value = "";
    message.value = "";
    feedbackFormState = {};
    localStorage.removeItem('feedback-form-state');
}

form.addEventListener('input', throttle((formInput), 500));
form.addEventListener('submit', handleSubmit);
