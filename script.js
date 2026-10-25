
const form = document.getElementById("registrationForm");
const list = document.getElementById("registrationList");
const message = document.getElementById("message");
const clearButton = document.getElementById("clearButton");

function showRegistrations() {
    const registrations = JSON.parse(
        localStorage.getItem("bookClubRegistrations") || "[]"
    );

    list.replaceChildren();

    registrations.forEach(function (registration) {
        const item = document.createElement("li");
        item.textContent =
            registration.name + " — " +
            registration.event + " (" +
            registration.email + ")";
        list.appendChild(item);
    });

    message.textContent = registrations.length
        ? "Saved registrations: " + registrations.length
        : "No registrations saved yet.";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const registration = {
        name: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        event: document.getElementById("event").value,
        source: document.querySelector(
            'input[name="source"]:checked'
        ).value
    };

    const registrations = JSON.parse(
        localStorage.getItem("bookClubRegistrations") || "[]"
    );

    registrations.push(registration);
    localStorage.setItem(
        "bookClubRegistrations",
        JSON.stringify(registrations)
    );

    form.reset();
    showRegistrations();
});

clearButton.addEventListener("click", function () {
    localStorage.removeItem("bookClubRegistrations");
    showRegistrations();
});

showRegistrations();
