const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { Resend } = require('resend');

const resend = new Resend('re_gq33oyS9_ETP9Mk85jJeFmwjmxGFtbAvg');

exports.sendBookingEmail = onDocumentCreated("bookings/{bookingId}", async (event) => {
    const booking = event.data.data();

    try {
        await resend.emails.send({
            from: 'Zenly Haven Spa <onboarding@resend.dev>',
            to: 'danilogbreniojr@gmail.com', // Test recipient email
            subject: `New Booking Request: ${booking.service} - ${booking.name}`,
            html: `
                <h2>New Appointment Request</h2>
                <p><strong>Name:</strong> ${booking.name}</p>
                <p><strong>Phone:</strong> ${booking.phone}</p>
                <p><strong>Service:</strong> ${booking.service}</p>
                <p><strong>Date:</strong> ${booking.date}</p>
                <p><strong>Time:</strong> ${booking.time}</p>
                <p><strong>Promo Code:</strong> ${booking.promo}</p>
                <p><strong>Notes:</strong> ${booking.notes}</p>
            `
        });
        console.log("Email notification sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
});