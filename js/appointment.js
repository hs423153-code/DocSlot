/* =========================================================
   DOCSLOT — APPOINTMENT BOOKING SYSTEM
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const appointmentModal =
    document.getElementById("appointmentModal");

const closeAppointmentModal =
    document.getElementById("closeAppointmentModal");

const appointmentDoctorName =
    document.getElementById("appointmentDoctorName");


/* STEPS */

const dateStep =
    document.getElementById("dateStep");

const slotStep =
    document.getElementById("slotStep");

const patientStep =
    document.getElementById("patientStep");

const paymentStep =
    document.getElementById("paymentStep");

const bookingSuccess =
    document.getElementById("bookingSuccess");


/* CALENDAR */

const calendarMonth =
    document.getElementById("calendarMonth");

const calendarDays =
    document.getElementById("calendarDays");

const previousMonth =
    document.getElementById("previousMonth");

const nextMonth =
    document.getElementById("nextMonth");

const selectedDateText =
    document.getElementById("selectedDateText");


/* SLOTS */

const timeSlots =
    document.getElementById("timeSlots");

const selectedDateForSlots =
    document.getElementById("selectedDateForSlots");

const selectedSlotText =
    document.getElementById("selectedSlotText");


/* CONTACT */

const patientMobile =
    document.getElementById("patientMobile");

const patientEmail =
    document.getElementById("patientEmail");

const contactError =
    document.getElementById("contactError");


/* PAYMENT */

const payFeeButton =
    document.getElementById("payFeeButton");

const qrPaymentBox =
    document.getElementById("qrPaymentBox");

const demoPaymentSuccess =
    document.getElementById("demoPaymentSuccess");


/* SUCCESS */

const confirmationMessage =
    document.getElementById("confirmationMessage");

const closeBooking =
    document.getElementById("closeBooking");


/* =========================================================
   STATE
========================================================= */

let currentDoctor = null;

let selectedDate = null;

let selectedSlot = null;

let selectedContact = null;


/*
   Calendar starts from CURRENT month.
*/

const today = new Date();

today.setHours(0, 0, 0, 0);

let calendarYear =
    today.getFullYear();

let calendarMonthIndex =
    today.getMonth();


/* =========================================================
   OPEN APPOINTMENT
========================================================= */


function openAppointment() {

    const doctorId =
        appointmentModal?.dataset.doctorId;

    if (!doctorId) {

        console.error(
            "Doctor ID not found."
        );

        return;

    }


    /*
       doctorDetails comes from doctor-info.js
    */

    if (
        typeof doctorDetails === "undefined"
    ) {

        console.error(
            "doctorDetails database not found."
        );

        return;

    }


    currentDoctor =
        doctorDetails.find(
            doctor =>
                doctor.id === doctorId
        );


    if (!currentDoctor) {

        console.error(
            "Doctor not found:",
            doctorId
        );

        return;

    }


    appointmentDoctorName.textContent =
        currentDoctor.name;


    resetBooking();


    renderCalendar();


    appointmentModal.hidden = false;

    appointmentModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE APPOINTMENT
========================================================= */

function closeAppointment() {

    if (!appointmentModal) return;


    appointmentModal.hidden = true;

    appointmentModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


if (closeAppointmentModal) {

    closeAppointmentModal.addEventListener(
        "click",
        closeAppointment
    );

}


if (appointmentModal) {

    appointmentModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                appointmentModal
            ) {

                closeAppointment();

            }

        }
    );

}


/* =========================================================
   STEP 1 — CALENDAR
========================================================= */

function renderCalendar() {

    calendarMonth.textContent =
        new Date(
            calendarYear,
            calendarMonthIndex,
            1
        ).toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );


    calendarDays.innerHTML = "";


    const firstDay =
        new Date(
            calendarYear,
            calendarMonthIndex,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            calendarYear,
            calendarMonthIndex + 1,
            0
        ).getDate();


    /*
       Empty spaces before first day.
    */

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement("span");

        empty.className =
            "calendar-empty";

        calendarDays.appendChild(
            empty
        );

    }


    /*
       Generate actual dates.
    */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dateButton =
            document.createElement("button");

        dateButton.type =
            "button";

        dateButton.className =
            "calendar-date";

        dateButton.textContent =
            day;


        const date =
            new Date(
                calendarYear,
                calendarMonthIndex,
                day
            );

        date.setHours(0, 0, 0, 0);


        /*
           Disable dates before today.
        */

        if (date < today) {

            dateButton.disabled =
                true;

            dateButton.classList.add(
                "past-date"
            );

        }


        /*
           Disable dates when doctor
           isn't available that weekday.
        */

        const weekday =
            date.toLocaleDateString(
                "en-US",
                {
                    weekday: "long"
                }
            );


        if (
            currentDoctor &&
            currentDoctor.availableDays &&
            !currentDoctor.availableDays.includes(
                weekday
            )
        ) {

            dateButton.disabled =
                true;

            dateButton.classList.add(
                "doctor-unavailable"
            );

        }


        /*
           Today styling.
        */

        if (
            date.getTime() ===
            today.getTime()
        ) {

            dateButton.classList.add(
                "today"
            );

        }


        /*
           Selected styling.
        */

        if (
            selectedDate &&
            date.getTime() ===
            selectedDate.getTime()
        ) {

            dateButton.classList.add(
                "selected"
            );

        }


        /*
           Click date.
        */

        if (!dateButton.disabled) {

            dateButton.addEventListener(
                "click",
                () => {

                    selectDate(date);

                }
            );

        }


        calendarDays.appendChild(
            dateButton
        );

    }


    /*
       Don't allow previous month
       navigation before current month.
    */

    const currentMonthStart =
        new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );


    const displayedMonthStart =
        new Date(
            calendarYear,
            calendarMonthIndex,
            1
        );


    previousMonth.disabled =
        displayedMonthStart <=
        currentMonthStart;

}


/* =========================================================
   PREVIOUS MONTH
========================================================= */
if (previousMonth) {

    previousMonth.addEventListener(
        "click",
        () => {

        if (
            calendarMonthIndex === 0
        ) {

            calendarYear--;

            calendarMonthIndex = 11;

        } else {

            calendarMonthIndex--;

        }

        renderCalendar();

    }
);
};


/* =========================================================
   NEXT MONTH
========================================================= */

if (nextMonth) {

    nextMonth.addEventListener(
        "click",
        () => {

        if (
            calendarMonthIndex === 11
        ) {

            calendarYear++;

            calendarMonthIndex = 0;

        } else {

            calendarMonthIndex++;

        }

        renderCalendar();

    }
);
};


/* =========================================================
   SELECT DATE
========================================================= */

function selectDate(date) {

    selectedDate = date;

    selectedDateText.textContent =
        formatDate(date);


    selectedDateForSlots.textContent =
        formatDate(date);


    renderCalendar();


    dateStep.hidden =
        false;

    slotStep.hidden =
        false;

    patientStep.hidden =
        true;

    paymentStep.hidden =
        true;

    bookingSuccess.hidden =
        true;


    selectedSlot =
        null;

    selectedSlotText.textContent =
        "Select a time slot";


    renderTimeSlots();

}


/* =========================================================
   STEP 2 — TIME SLOTS
========================================================= */

function renderTimeSlots() {

    timeSlots.innerHTML = "";


    if (
        !currentDoctor ||
        !currentDoctor.availableHours
    ) {

        timeSlots.innerHTML =
            "<p>No slots available.</p>";

        return;

    }


    const weekday =
        selectedDate.toLocaleDateString(
            "en-US",
            {
                weekday: "long"
            }
        );


    const isWeekend =
        weekday === "Saturday" ||
        weekday === "Sunday";


    let hoursText =
        isWeekend
            ? currentDoctor.availableHours.weekends
            : currentDoctor.availableHours.weekdays;


    /*
       Example:
       "9:00 AM - 5:00 PM"
    */

    const parts =
        hoursText.split("-");


    if (parts.length !== 2) {

        timeSlots.innerHTML =
            "<p>Timing unavailable.</p>";

        return;

    }


    const startMinutes =
        convertTimeToMinutes(
            parts[0].trim()
        );

    const endMinutes =
        convertTimeToMinutes(
            parts[1].trim()
        );


    /*
       Generate 30-minute slots.
    */

    for (
        let minutes = startMinutes;
        minutes + 30 <= endMinutes;
        minutes += 30
    ) {

        const start =
            formatMinutes(minutes);

        const end =
            formatMinutes(minutes + 30);


        const button =
            document.createElement("button");

        button.type =
            "button";

        button.className =
            "time-slot";

        button.textContent =
            `${start} - ${end}`;


        button.addEventListener(
            "click",
            () => {

                selectTimeSlot(
                    `${start} - ${end}`
                );

            }
        );


        timeSlots.appendChild(
            button
        );

    }

}


/* =========================================================
   TIME CONVERSION
========================================================= */

function convertTimeToMinutes(timeString) {

    const match =
        timeString.match(
            /(\d+):(\d+)\s*(AM|PM)/i
        );


    if (!match) return 0;


    let hours =
        parseInt(match[1]);

    const minutes =
        parseInt(match[2]);

    const period =
        match[3].toUpperCase();


    if (
        period === "PM" &&
        hours !== 12
    ) {

        hours += 12;

    }


    if (
        period === "AM" &&
        hours === 12
    ) {

        hours = 0;

    }


    return (
        hours * 60 +
        minutes
    );

}


/* =========================================================
   FORMAT MINUTES
========================================================= */

function formatMinutes(totalMinutes) {

    let hours =
        Math.floor(
            totalMinutes / 60
        );

    const minutes =
        totalMinutes % 60;


    const period =
        hours >= 12
            ? "PM"
            : "AM";


    if (hours > 12) {

        hours -= 12;

    }


    if (hours === 0) {

        hours = 12;

    }


    return (
        `${hours}:${String(minutes).padStart(2, "0")} ${period}`
    );

}


/* =========================================================
   SELECT SLOT
========================================================= */

function selectTimeSlot(slot) {

    selectedSlot =
        slot;

    selectedSlotText.textContent =
        `Selected slot: ${slot}`;


    patientStep.hidden =
        false;

    paymentStep.hidden =
        true;

    bookingSuccess.hidden =
        true;

}


/* =========================================================
   CONTACT DETAILS
========================================================= */

function validateContact() {

    const phone =
        patientMobile.value.trim();

    const email =
        patientEmail.value.trim();


    const validPhone =
        /^[6-9]\d{9}$/.test(phone);


    const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


    /*
       Either phone OR email.
    */

    if (
        phone &&
        validPhone &&
        !email
    ) {

        selectedContact = phone;

        return true;

    }


    if (
        email &&
        validEmail &&
        !phone
    ) {

        selectedContact = email;

        return true;

    }


    contactError.hidden =
        false;

    return false;

}


/*
   Clicking outside fields to payment:
   We'll create the payment button
   after contact validation.
*/

const continueToPayment =
    document.createElement("button");

continueToPayment.type =
    "button";

continueToPayment.className =
    "confirm-booking-btn";

continueToPayment.textContent =
    "Continue to Payment";


patientStep.appendChild(
    continueToPayment
);


continueToPayment.addEventListener(
    "click",
    () => {

        contactError.hidden =
            true;

        if (!validateContact()) {

            return;

        }


        paymentStep.hidden =
            false;

        qrPaymentBox.hidden =
            true;

    }
);


/* =========================================================
   STEP 4 — DEMO PAYMENT
========================================================= */

payFeeButton.addEventListener(
    "click",
    () => {

        qrPaymentBox.hidden =
            false;

        payFeeButton.disabled =
            true;

        payFeeButton.textContent =
            "Payment QR Generated";

    }
);


/* =========================================================
   DEMO PAYMENT SUCCESS
========================================================= */

demoPaymentSuccess.addEventListener(
    "click",
    () => {

        completeBooking();

    }
);


/* =========================================================
   STEP 5 — CONFIRMATION
========================================================= */

function completeBooking() {

    const appointmentNumber =
        generateAppointmentNumber();


    const contactLabel =
        patientMobile.value.trim()
            ? "Phone No."
            : "Email";


    const contactValue =
        selectedContact;


    confirmationMessage.innerHTML = `

        <div class="confirmation-details">

            <p>
                <strong>Appointment No.:</strong>
                ${appointmentNumber}
            </p>

            <p>
                <strong>Doctor's Name:</strong>
                ${currentDoctor.name}
            </p>

            <p>
                <strong>Specialist:</strong>
                ${currentDoctor.specialization}
            </p>

            <p>
                <strong>Address:</strong>
                ${currentDoctor.clinicAddress || currentDoctor.city}
            </p>

            <p>
                <strong>Date:</strong>
                ${formatDate(selectedDate)}
            </p>

            <p>
                <strong>Slot:</strong>
                ${selectedSlot}
            </p>

            <p>
                <strong>${contactLabel}:</strong>
                ${contactValue}
            </p>

            <p>
                <strong>Fee Paid:</strong>
                ₹300
            </p>

        </div>

        <p class="booking-final-message">
            You have successfully booked your appointment!
        </p>

    `;


    dateStep.hidden =
        true;

    slotStep.hidden =
        true;

    patientStep.hidden =
        true;

    paymentStep.hidden =
        true;

    bookingSuccess.hidden =
        false;

}


/* =========================================================
   APPOINTMENT NUMBER
========================================================= */

function generateAppointmentNumber() {

    const existing =
        Number(
            localStorage.getItem(
                "docslotAppointmentNumber"
            ) || "410"
        );


    const next =
        existing + 1;


    localStorage.setItem(
        "docslotAppointmentNumber",
        next
    );


    return next;

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date) {

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* =========================================================
   RESET
========================================================= */

function resetBooking() {

    selectedDate =
        null;

    selectedSlot =
        null;

    selectedContact =
        null;


    patientMobile.value =
        "";

    patientEmail.value =
        "";


    dateStep.hidden =
        false;

    slotStep.hidden =
        true;

    patientStep.hidden =
        true;

    paymentStep.hidden =
        true;

    bookingSuccess.hidden =
        true;


    selectedDateText.textContent =
        "Select a date";

    selectedSlotText.textContent =
        "Select a time slot";


    qrPaymentBox.hidden =
        true;

    payFeeButton.disabled =
        false;

    payFeeButton.textContent =
        "Pay ₹300";


    calendarYear =
        today.getFullYear();

    calendarMonthIndex =
        today.getMonth();

}
    

/* =========================================================
   DONE
========================================================= */

if (closeBooking) {

    closeBooking.addEventListener(
        "click",
        closeAppointment
    );

}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            appointmentModal &&
            !appointmentModal.hidden
        ) {

            closeAppointment();

        }

    }
);
