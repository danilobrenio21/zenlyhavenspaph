// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Booking Form Submission Handling
const bookingForm = document.getElementById('booking-form');
const bookingSuccess = document.getElementById('booking-success');

if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Grab form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const promo = document.getElementById('promo').value;
        const notes = document.getElementById('notes').value;

        const bookingData = {
            name,
            phone,
            service,
            date,
            time,
            promo: promo || 'None',
            notes: notes || 'None',
            createdAt: new Date().toISOString()
        };

        try {
            // Save the booking securely to your Firestore database
            await window.addDoc(window.collection(window.db, "bookings"), bookingData);
            console.log('Booking saved to Firestore successfully!');

            // Show success message
            bookingSuccess.classList.remove('hidden');
            bookingForm.reset();

            // Hide success message after 6 seconds
            setTimeout(() => {
                bookingSuccess.classList.add('hidden');
            }, 6000);

        } catch (error) {
            console.error("Error processing booking:", error);
            alert("There was an error submitting your booking. Please try again.");
        }
    });
}

// Set minimum date for booking to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}