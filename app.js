document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;
  const guests = document.getElementById("guests").value;

  if (!name || !email || !checkin || !checkout || !guests) {
    alert("Please fill in all fields.");
    return;
  }

  const bookingData = {
    name,
    email,
    checkin,
    checkout,
    guests
  };

  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.push(bookingData);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  const successPrompt = document.getElementById("successPrompt");
  successPrompt.classList.add("success-show");
  setTimeout(() => {
    successPrompt.classList.remove("success-show");
  }, 3000);

  renderBookings();
  document.getElementById("bookingForm").reset();
});

function renderBookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const confirmation = document.getElementById("confirmation");
  confirmation.innerHTML = "<h3>All Bookings:</h3>";

  if (bookings.length === 0) {
    confirmation.innerHTML += "<p>No bookings yet.</p>";
    return;
  }

  bookings.forEach((b, index) => {
    confirmation.innerHTML += `
      <div style="margin-bottom: 15px;">
        <p><strong>${index + 1}. ${b.name}</strong></p>
        <p>Email: ${b.email}</p>
        <p>Check-In: ${b.checkin}</p>
        <p>Check-Out: ${b.checkout}</p>
        <p>Guests: ${b.guests}</p>
        <button onclick="deleteBooking(${index})">Delete Booking</button>
        <hr/>
      </div>
    `;
  });
}

function deleteBooking(index) {
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.splice(index, 1);
  localStorage.setItem("bookings", JSON.stringify(bookings));
  renderBookings();
}

window.onload = renderBookings;