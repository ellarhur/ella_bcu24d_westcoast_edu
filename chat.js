document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("DINA_USER_ID_HÄR"); // Ersätt med din EmailJS User ID
});

// Funktion för att skicka meddelande i chatten
function sendMessage() {
    let input = document.getElementById("chat-input");
    let chatBox = document.getElementById("chat-box");

    if (input.value.trim() !== "") {
        let message = document.createElement("div");
        message.textContent = input.value;
        message.style.padding = "10px";
        message.style.margin = "5px 0";
        message.style.background = "#ddd";
        message.style.borderRadius = "5px";
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight; // Scrolla ner till senaste meddelandet
        input.value = "";
    }
}

// Funktion för att skicka e-post
function sendEmail() {
    let recipient = document.getElementById("recipient").value;
    let subject = document.getElementById("email-subject").value;
    let message = document.getElementById("email-message").value;

    if (subject.trim() === "" || message.trim() === "") {
        alert("Fyll i både ämne och meddelande.");
        return;
    }

    let emailParams = {
        to_email: recipient,
        subject: subject,
        message: message,
    };

    emailjs.send("DINA_SERVICE_ID_HÄR", "DINA_TEMPLATE_ID_HÄR", emailParams)
        .then(function (response) {
            alert("E-post skickat!");
            document.getElementById("email-subject").value = "";
            document.getElementById("email-message").value = "";
        }, function (error) {
            alert("Något gick fel: " + JSON.stringify(error));
        });
}