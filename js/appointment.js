/* =========================================================
   DOCSLOT AI
   APPOINTMENT BOOKING SYSTEM

   FLOW:

   SCREEN 1 → CALENDAR
   SCREEN 2 → TIME SLOTS
   SCREEN 3 → PATIENT INFO + PAYMENT
   SCREEN 4 → PAYMENT PROCESSING
   SCREEN 5 → CONFIRMATION

   Only ONE screen is visible at a time.
========================================================= */


/* =========================================================
   BOOKING STATE
========================================================= */

const bookingState = {

    doctorId: null,

    selectedDate: null,

    selectedSlot: null,

    contactInfo: "",

    appointmentNo: null

};


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let currentDoctor = null;

let calendarDate = new Date();

let paymentTimer = null;


/*
 * Used to prevent duplicate appointment numbers
 * during the current page session.
 */
const usedAppointmentNumbers = new Set();


/* =========================================================
   DOM ELEMENTS
========================================================= */

let appointmentModal;

let appointmentDoctorName;

let calendarMonth;

let calendarDays;

let prevMonth;

let nextMonth;

let selectedDateText;

let slotDateText;

let timeSlots;

let slotEmptyMessage;

let patientMobile;

let patientEmail;

let appointmentFee;

let confirmBooking;

let closeAppointmentModal;

let closeBooking;


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------------------
       Get DOM elements
    ----------------------------------------------------- */

    appointmentModal =
        document.getElementById("appointmentModal");

    appointmentDoctorName =
        document.getElementById("appointmentDoctorName");

    calendarMonth =
        document.getElementById("calendarMonth");

    calendarDays =
        document.getElementById("calendarDays");

    prevMonth =
        document.getElementById("prevMonth");

    nextMonth =
        document.getElementById("nextMonth");

    selectedDateText =
        document.getElementById("selectedDateText");

    slotDateText =
        document.getElementById("slotDateText");

    timeSlots =
        document.getElementById("timeSlots");

    slotEmptyMessage =
        document.getElementById("slotEmptyMessage");

    patientMobile =
        document.getElementById("patientMobile");

    patientEmail =
        document.getElementById("patientEmail");

    appointmentFee =
        document.getElementById("appointmentFee");

    confirmBooking =
        document.getElementById("confirmBooking");

    closeAppointmentModal =
        document.getElementById("closeAppointmentModal");

    closeBooking =
        document.getElementById("closeBooking");


    /* -----------------------------------------------------
       Validate required elements
    ----------------------------------------------------- */

    if (!appointmentModal) {

        console.error(
            "DocSlot: appointmentModal not found."
        );

        return;
    }


    /* =====================================================
       EVENT LISTENERS
    ===================================================== */


    /* -----------------------------------------------------
       Previous month
    ----------------------------------------------------- */

    if (prevMonth) {

        prevMonth.addEventListener(
            "click",
            function () {

                changeMonth(-1);

            }
        );

    }


    /* -----------------------------------------------------
       Next month
    ----------------------------------------------------- */

    if (nextMonth) {

        nextMonth.addEventListener(
            "click",
            function () {

                changeMonth(1);

            }
        );

    }


    /* -----------------------------------------------------
       Payment button
    ----------------------------------------------------- */

    if (confirmBooking) {

        confirmBooking.addEventListener(
            "click",
            handlePayment
        );

    }


    /* -----------------------------------------------------
       Close button
    ----------------------------------------------------- */

    if (closeAppointmentModal) {

        closeAppointmentModal.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                closeAppointment();

            }
        );

    }


    /* -----------------------------------------------------
       Done button
    ----------------------------------------------------- */

    if (closeBooking) {

        closeBooking.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                closeAppointment();

            }
        );

    }


    /* -----------------------------------------------------
       Click outside appointment modal
    ----------------------------------------------------- */

    appointmentModal.addEventListener(
        "click",
        function (event) {

            /*
             * Only close if the actual overlay itself
             * was clicked.
             */

            if (event.target === appointmentModal) {

                closeAppointment();

            }

        }
    );


    /* -----------------------------------------------------
       Escape key
    ----------------------------------------------------- */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                appointmentModal &&
                !appointmentModal.hidden
            ) {

                closeAppointment();

            }

        }
    );


    /* -----------------------------------------------------
       Initial reset
    ----------------------------------------------------- */

    resetBookingFlow();

});


/* =========================================================
   OPEN APPOINTMENT
========================================================= */

/*
 * doctor-info.js will call this function after placing
 * doctor ID inside:
 *
 * appointmentModal.dataset.doctorId
 */

function openAppointment() {

    if (!appointmentModal) {

        appointmentModal =
            document.getElementById("appointmentModal");

    }


    if (!appointmentModal) {

        console.error(
            "DocSlot: Appointment modal not found."
        );

        return;

    }


    /* -----------------------------------------------------
       Get doctor ID
    ----------------------------------------------------- */

    const doctorId =
        appointmentModal.dataset.doctorId;


    if (!doctorId) {

        console.error(
            "DocSlot: Doctor ID missing."
        );

        return;

    }


    /* -----------------------------------------------------
       Find doctor
    ----------------------------------------------------- */

    const doctor =
        getDoctorFromDatabase(doctorId);


    if (!doctor) {

        console.error(
            "DocSlot: Doctor not found for ID:",
            doctorId
        );

        return;

    }


    /* -----------------------------------------------------
       Reset previous booking
    ----------------------------------------------------- */

    resetBookingFlow();


    /* -----------------------------------------------------
       Store doctor
    ----------------------------------------------------- */

    currentDoctor = doctor;

    bookingState.doctorId =
        String(doctor.id);


    /* -----------------------------------------------------
       Reset calendar to current month
    ----------------------------------------------------- */

    calendarDate =
        new Date();

    calendarDate.setDate(1);


    /* -----------------------------------------------------
       Fill doctor information
    ----------------------------------------------------- */

    updateDoctorInformation();


    /* -----------------------------------------------------
       Render calendar
    ----------------------------------------------------- */

    renderCalendar();


    /* -----------------------------------------------------
       Show SCREEN 1
    ----------------------------------------------------- */

    showScreen(1);


    /* -----------------------------------------------------
       Open modal
    ----------------------------------------------------- */

    appointmentModal.hidden = false;

    appointmentModal.classList.add("open");

    appointmentModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );


    /* -----------------------------------------------------
       Focus close button
    ----------------------------------------------------- */

    if (closeAppointmentModal) {

        setTimeout(
            function () {

                closeAppointmentModal.focus();

            },
            50
        );

    }

}


/*
 * Make function available globally.
 *
 * doctor-info.js can call:
 *
 * window.openAppointment()
 */

window.openAppointment =
    openAppointment;


/* =========================================================
   GET DOCTOR FROM EXISTING DATABASE
========================================================= */

function getDoctorFromDatabase(doctorId) {

    /*
     * doctorDetails already exists inside doctor-info.js.
     *
     * We intentionally use the existing data.
     */

    if (
        typeof doctorDetails === "undefined" ||
        !Array.isArray(doctorDetails)
    ) {

        console.error(
            "DocSlot: doctorDetails array not found."
        );

        return null;

    }


    const normalizedId =
        String(doctorId);


    return doctorDetails.find(
        function (doctor) {

            return String(doctor.id) === normalizedId;

        }
    ) || null;

}


/* =========================================================
   UPDATE DOCTOR INFORMATION
========================================================= */

function updateDoctorInformation() {

    if (!currentDoctor) {

        return;

    }


    /* -----------------------------------------------------
       Doctor name
    ----------------------------------------------------- */

    if (appointmentDoctorName) {

        appointmentDoctorName.textContent =
            currentDoctor.name || "Doctor";

    }


    /* -----------------------------------------------------
       Fee
    ----------------------------------------------------- */

    const fee =
        getDoctorFee(currentDoctor);


    if (appointmentFee) {

        appointmentFee.textContent =
            `₹${fee}`;

    }


    if (confirmBooking) {

        confirmBooking.textContent =
            `Pay ₹${fee}`;

    }

}


/* =========================================================
   GET DOCTOR FEE
========================================================= */

function getDoctorFee(doctor) {

    if (!doctor) {

        return 0;

    }


    /*
     * Main expected property:
     *
     * doctor.fee
     */

    const fee =
        Number(doctor.fee);


    if (
        Number.isFinite(fee) &&
        fee >= 0
    ) {

        return fee;

    }


    /*
     * Fallbacks in case your existing database
     * uses another common property.
     */

    const fallbackFee =
        Number(
            doctor.fees ??
            doctor.consultationFee ??
            doctor.consultationFees ??
            0
        );


    return Number.isFinite(fallbackFee)
        ? fallbackFee
        : 0;

}


/* =========================================================
   SHOW ONLY ONE SCREEN
========================================================= */

function showScreen(screenNumber) {

    const screens =
        document.querySelectorAll(
            "#appointmentModal .booking-screen"
        );


    screens.forEach(
        function (screen) {

            const screenValue =
                Number(
                    screen.dataset.screen
                );


            const shouldShow =
                screenValue === screenNumber;


            screen.hidden =
                !shouldShow;


            screen.classList.toggle(
                "active",
                shouldShow
            );

        }
    );

}


/* =========================================================
   SCREEN 1 — CALENDAR
========================================================= */

function renderCalendar() {

    if (
        !calendarDays ||
        !calendarMonth
    ) {

        return;

    }


    /* -----------------------------------------------------
       Clear previous calendar
    ----------------------------------------------------- */

    calendarDays.innerHTML = "";


    /* -----------------------------------------------------
       Current calendar month
    ----------------------------------------------------- */

    const year =
        calendarDate.getFullYear();

    const month =
        calendarDate.getMonth();


    /* -----------------------------------------------------
       Month heading
    ----------------------------------------------------- */

    calendarMonth.textContent =
        new Intl.DateTimeFormat(
            "en-IN",
            {
                month: "long",
                year: "numeric"
            }
        ).format(
            calendarDate
        );


    /* -----------------------------------------------------
       First day of month
    ----------------------------------------------------- */

    const firstDay =
        new Date(
            year,
            month,
            1
        );


    /*
     * JavaScript:
     *
     * 0 = Sunday
     * 1 = Monday
     * ...
     * 6 = Saturday
     */

    const firstWeekday =
        firstDay.getDay();


    /* -----------------------------------------------------
       Number of days in month
    ----------------------------------------------------- */

    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    /* -----------------------------------------------------
       Today's date
    ----------------------------------------------------- */

    const today =
        startOfDay(
            new Date()
        );


    /* -----------------------------------------------------
       Empty cells before first date
    ----------------------------------------------------- */

    for (
        let i = 0;
        i < firstWeekday;
        i++
    ) {

        const emptyCell =
            document.createElement("div");

        emptyCell.className =
            "calendar-day empty";

        emptyCell.setAttribute(
            "aria-hidden",
            "true"
        );

        calendarDays.appendChild(
            emptyCell
        );

    }


    /* -----------------------------------------------------
       Generate actual dates
    ----------------------------------------------------- */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );


        const button =
            document.createElement("button");


        button.type =
            "button";

        button.className =
            "calendar-day";

        button.textContent =
            String(day);


        button.dataset.date =
            formatDateForState(date);


        /* -------------------------------------------------
           Past date
        ------------------------------------------------- */

        const isPast =
            startOfDay(date) < today;


        if (isPast) {

            button.disabled =
                true;

            button.classList.add(
                "past-date"
            );

        }


        /* -------------------------------------------------
           Doctor availability
        ------------------------------------------------- */

        const doctorAvailable =
            isDoctorAvailableOnDate(
                date
            );


        if (!doctorAvailable) {

            button.disabled =
                true;

            button.classList.add(
                "doctor-unavailable"
            );

        }


        /* -------------------------------------------------
           Today
        ------------------------------------------------- */

        if (
            startOfDay(date).getTime() ===
            today.getTime()
        ) {

            button.classList.add(
                "today"
            );

        }


        /* -------------------------------------------------
           Previously selected date
        ------------------------------------------------- */

        if (
            bookingState.selectedDate ===
            button.dataset.date
        ) {

            button.classList.add(
                "selected"
            );

        }


        /* -------------------------------------------------
           Click
        ------------------------------------------------- */

        if (!button.disabled) {

            button.addEventListener(
                "click",
                function () {

                    selectDate(
                        button.dataset.date
                    );

                }
            );

        }


        calendarDays.appendChild(
            button
        );

    }


    /* -----------------------------------------------------
       Disable previous month button when at current month
    ----------------------------------------------------- */

    const currentMonthStart =
        new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );


    const displayedMonthStart =
        new Date(
            year,
            month,
            1
        );


    if (prevMonth) {

        prevMonth.disabled =
            displayedMonthStart <=
            currentMonthStart;

    }

}


/* =========================================================
   CHANGE CALENDAR MONTH
========================================================= */

function changeMonth(direction) {

    const today =
        new Date();


    const currentMonth =
        new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );


    const newMonth =
        new Date(
            calendarDate.getFullYear(),
            calendarDate.getMonth() + direction,
            1
        );


    /*
     * Never allow navigating before current month.
     */

    if (newMonth < currentMonth) {

        return;

    }


    calendarDate =
        newMonth;


    renderCalendar();

}


/* =========================================================
   SELECT DATE
========================================================= */

function selectDate(dateString) {

    if (!dateString) {

        return;

    }


    bookingState.selectedDate =
        dateString;


    /*
     * Changing date means previous slot is no longer valid.
     */

    bookingState.selectedSlot =
        null;


    const selectedDate =
        parseDateString(
            dateString
        );


    if (!selectedDate) {

        return;

    }


    /* -----------------------------------------------------
       Display selected date
    ----------------------------------------------------- */

    if (selectedDateText) {

        selectedDateText.textContent =
            formatDisplayDate(
                selectedDate
            );

    }


    /* -----------------------------------------------------
       Prepare Screen 2
    ----------------------------------------------------- */

    prepareTimeScreen();


    /* -----------------------------------------------------
       Automatically move to Screen 2
    ----------------------------------------------------- */

    showScreen(2);

}


/* =========================================================
   SCREEN 2 — TIME SLOTS
========================================================= */

function prepareTimeScreen() {

    if (!currentDoctor) {

        return;

    }


    if (!timeSlots) {

        return;

    }


    timeSlots.innerHTML = "";


    if (slotEmptyMessage) {

        slotEmptyMessage.hidden =
            true;

    }


    const selectedDate =
        parseDateString(
            bookingState.selectedDate
        );


    if (!selectedDate) {

        return;

    }


    /* -----------------------------------------------------
       Date label
    ----------------------------------------------------- */

    if (slotDateText) {

        slotDateText.textContent =
            formatDisplayDate(
                selectedDate
            );

    }


    /* -----------------------------------------------------
       Get available ranges
    ----------------------------------------------------- */

    const ranges =
        getAvailableTimeRanges(
            currentDoctor,
            selectedDate
        );


    /* -----------------------------------------------------
       Generate 30-minute slots
    ----------------------------------------------------- */

    const slots =
        generateTimeSlots(
            ranges
        );


    if (slots.length === 0) {

        if (slotEmptyMessage) {

            slotEmptyMessage.hidden =
                false;

        }

        return;

    }


    /* -----------------------------------------------------
       Create buttons
    ----------------------------------------------------- */

    slots.forEach(
        function (slot) {

            const button =
                document.createElement("button");


            button.type =
                "button";

            button.className =
                "time-slot";

            button.textContent =
                slot;

            button.dataset.slot =
                slot;


            button.addEventListener(
                "click",
                function () {

                    selectTimeSlot(
                        slot
                    );

                }
            );


            timeSlots.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   SELECT TIME SLOT
========================================================= */

function selectTimeSlot(slot) {

    if (!slot) {

        return;

    }


    bookingState.selectedSlot =
        slot;


    /*
     * Highlight selected slot.
     */

    if (timeSlots) {

        const allSlots =
            timeSlots.querySelectorAll(
                ".time-slot"
            );


        allSlots.forEach(
            function (button) {

                button.classList.toggle(
                    "selected",
                    button.dataset.slot === slot
                );

            }
        );

    }


    /*
     * Prepare payment screen.
     */

    updatePatientScreen();


    /*
     * Automatically move to Screen 3.
     */

    showScreen(3);

}


/* =========================================================
   SCREEN 3 — PATIENT INFORMATION
========================================================= */

function updatePatientScreen() {

    if (!currentDoctor) {

        return;

    }


    const fee =
        getDoctorFee(
            currentDoctor
        );


    if (appointmentFee) {

        appointmentFee.textContent =
            `₹${fee}`;

    }


    if (confirmBooking) {

        confirmBooking.textContent =
            `Pay ₹${fee}`;

    }


    /*
     * Clear old information if a new booking flow
     * reaches this screen.
     */

    if (patientMobile) {

        patientMobile.value = "";

    }


    if (patientEmail) {

        patientEmail.value = "";

    }

}


/* =========================================================
   HANDLE PAYMENT
========================================================= */

function handlePayment() {

    if (!currentDoctor) {

        console.error(
            "DocSlot: No doctor selected."
        );

        return;

    }


    /* -----------------------------------------------------
       Get contact values
    ----------------------------------------------------- */

    const phone =
        patientMobile
            ? patientMobile.value.trim()
            : "";


    const email =
        patientEmail
            ? patientEmail.value.trim()
            : "";


    /* -----------------------------------------------------
       Validate contact information
    ----------------------------------------------------- */

    if (!phone && !email) {

        alert(
            "Please enter either your phone number or email address."
        );

        if (patientMobile) {

            patientMobile.focus();

        }

        return;

    }


    /* -----------------------------------------------------
       Validate phone if entered
    ----------------------------------------------------- */

    if (phone) {

        const cleanPhone =
            phone.replace(
                /\D/g,
                ""
            );


        if (
            cleanPhone.length < 10 ||
            cleanPhone.length > 15
        ) {

            alert(
                "Please enter a valid phone number."
            );

            patientMobile.focus();

            return;

        }

    }


    /* -----------------------------------------------------
       Validate email if entered
    ----------------------------------------------------- */

    if (email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(email)
        ) {

            alert(
                "Please enter a valid email address."
            );

            patientEmail.focus();

            return;

        }

    }


    /* -----------------------------------------------------
       Store contact information
    ----------------------------------------------------- */

    /*
     * User may enter either one.
     *
     * If both are entered, email is not lost.
     * We store both in a readable format.
     */

    if (phone && email) {

        bookingState.contactInfo =
            `${phone} / ${email}`;

    } else {

        bookingState.contactInfo =
            phone || email;

    }


    /* -----------------------------------------------------
       Generate appointment number
    ----------------------------------------------------- */

    bookingState.appointmentNo =
        generateAppointmentNumber();


    /* -----------------------------------------------------
       Disable payment button
    ----------------------------------------------------- */

    if (confirmBooking) {

        confirmBooking.disabled =
            true;

    }


    /* -----------------------------------------------------
       SCREEN 4
    ----------------------------------------------------- */

    showScreen(4);


    /*
     * Simulate payment processing.
     */

    if (paymentTimer) {

        clearTimeout(
            paymentTimer
        );

    }


    paymentTimer =
        setTimeout(
            function () {

                paymentTimer =
                    null;


                /*
                 * Payment completed.
                 */

                renderConfirmation();


                /*
                 * SCREEN 5
                 */

                showScreen(5);


            },
            2000
        );

}


/* =========================================================
   GENERATE UNIQUE APPOINTMENT NUMBER
========================================================= */

function generateAppointmentNumber() {

    let number;


    do {

        number =
            Math.floor(
                Math.random() * 900
            ) + 100;

    } while (
        usedAppointmentNumbers.has(
            number
        )
    );


    usedAppointmentNumbers.add(
        number
    );


    return number;

}


/* =========================================================
   SCREEN 5 — RENDER CONFIRMATION
========================================================= */

function renderConfirmation() {

    if (!currentDoctor) {

        return;

    }


    /* -----------------------------------------------------
       Confirmation elements
    ----------------------------------------------------- */

    const confirmationAppointmentNo =
        document.getElementById(
            "confirmationAppointmentNo"
        );


    const confirmationDoctorName =
        document.getElementById(
            "confirmationDoctorName"
        );


    const confirmationSpecialist =
        document.getElementById(
            "confirmationSpecialist"
        );


    const confirmationAddress =
        document.getElementById(
            "confirmationAddress"
        );


    const confirmationDate =
        document.getElementById(
            "confirmationDate"
        );


    const confirmationSlot =
        document.getElementById(
            "confirmationSlot"
        );


    const confirmationContact =
        document.getElementById(
            "confirmationContact"
        );


    const confirmationFee =
        document.getElementById(
            "confirmationFee"
        );


    /* -----------------------------------------------------
       Get values
    ----------------------------------------------------- */

    const selectedDate =
        parseDateString(
            bookingState.selectedDate
        );


    const fee =
        getDoctorFee(
            currentDoctor
        );


    /*
     * Specialization field:
     *
     * Existing doctor data uses specialization.
     *
     * Fallbacks added so the system does not break if
     * your object uses another property name.
     */

    const specialist =
        currentDoctor.specialization ||
        currentDoctor.speciality ||
        currentDoctor.specialty ||
        "Doctor";


    const address =
    currentDoctor.clinicAddress ||
    currentDoctor.address ||
    currentDoctor.location ||
    "Address not available";


    /* -----------------------------------------------------
       Fill confirmation
    ----------------------------------------------------- */

    if (confirmationAppointmentNo) {

        confirmationAppointmentNo.textContent =
            bookingState.appointmentNo;

    }


    if (confirmationDoctorName) {

        confirmationDoctorName.textContent =
            currentDoctor.name ||
            "Doctor";

    }


    if (confirmationSpecialist) {

        confirmationSpecialist.textContent =
            specialist;

    }


    if (confirmationAddress) {

        confirmationAddress.textContent =
            address;

    }


    if (confirmationDate) {

        confirmationDate.textContent =
            selectedDate
                ? formatDisplayDate(
                    selectedDate
                )
                : bookingState.selectedDate;

    }


    if (confirmationSlot) {

        confirmationSlot.textContent =
            bookingState.selectedSlot ||
            "Not available";

    }


    if (confirmationContact) {

        confirmationContact.textContent =
            bookingState.contactInfo ||
            "Not provided";

    }


    if (confirmationFee) {

        confirmationFee.textContent =
            `₹${fee}`;

    }

}


/* =========================================================
   DOCTOR AVAILABILITY
========================================================= */

function isDoctorAvailableOnDate(date) {

    if (!currentDoctor) {

        return false;

    }


    /* -----------------------------------------------------
       Doctor availableDays
    ----------------------------------------------------- */

    const availableDays =
        Array.isArray(
            currentDoctor.availableDays
        )
            ? currentDoctor.availableDays
            : [];


    if (availableDays.length === 0) {

        return false;

    }


    const dayName =
        new Intl.DateTimeFormat(
            "en-US",
            {
                weekday: "long"
            }
        ).format(date);


    /*
     * Case-insensitive comparison.
     */

    const isAvailable =
        availableDays.some(
            function (day) {

                return (
                    String(day).toLowerCase() ===
                    dayName.toLowerCase()
                );

            }
        );


    return isAvailable;

}


/* =========================================================
   GET AVAILABLE TIME RANGES
========================================================= */

function getAvailableTimeRanges(
    doctor,
    date
) {

    if (!doctor || !date) {

        return [];

    }


    const day =
        date.getDay();


    const isWeekend =
        day === 0 ||
        day === 6;


    const availableHours =
        doctor.availableHours ||
        {};


    /*
     * Your doctor data structure:
     *
     * availableHours: {
     *     weekdays: "...",
     *     weekends: "..."
     * }
     */

    let hoursText;


    if (isWeekend) {

        hoursText =
            availableHours.weekends ||
            "";

    } else {

        hoursText =
            availableHours.weekdays ||
            "";

    }


    if (
        typeof hoursText !== "string" ||
        !hoursText.trim()
    ) {

        return [];

    }


    return parseTimeRanges(
        hoursText
    );

}


/* =========================================================
   PARSE TIME RANGES
========================================================= */

function parseTimeRanges(hoursText) {

    /*
     * Supports:
     *
     * "9:00 AM - 5:00 PM"
     *
     * "9:00 AM - 12:00 PM, 5:00 PM - 8:30 PM"
     *
     * "10:30 PM - 1:00 AM"
     *
     * "Hospital open 24 hours.
     *  Regular doctor consultation :
     *  10:00 AM – 2:00 PM , 6:00 PM – 8:00 PM"
     */


    const ranges = [];


    /*
     * Normalize en dash / em dash to normal hyphen.
     */

    const normalized =
        hoursText
            .replace(
                /[–—]/g,
                "-"
            );


    /*
     * Find time pairs using regex.
     */

    const timePattern =
        /(\d{1,2}(?::\d{2})?\s*(?:AM|PM))\s*-\s*(\d{1,2}(?::\d{2})?\s*(?:AM|PM))/gi;


    let match;


    while (
        (match =
            timePattern.exec(
                normalized
            )) !== null
    ) {

        const startMinutes =
            parseTimeToMinutes(
                match[1]
            );


        const endMinutes =
            parseTimeToMinutes(
                match[2]
            );


        if (
            startMinutes === null ||
            endMinutes === null
        ) {

            continue;

        }


        ranges.push({
            start: startMinutes,
            end: endMinutes
        });

    }


    return ranges;

}


/* =========================================================
   PARSE TIME → MINUTES
========================================================= */

function parseTimeToMinutes(
    timeString
) {

    if (
        typeof timeString !== "string"
    ) {

        return null;

    }


    const normalized =
        timeString
            .trim()
            .toUpperCase();


    const match =
        normalized.match(
            /^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/
        );


    if (!match) {

        return null;

    }


    let hours =
        Number(match[1]);


    const minutes =
        Number(
            match[2] || "0"
        );


    const period =
        match[3];


    if (
        hours < 1 ||
        hours > 12 ||
        minutes < 0 ||
        minutes > 59
    ) {

        return null;

    }


    if (period === "AM") {

        if (hours === 12) {

            hours = 0;

        }

    } else {

        if (hours !== 12) {

            hours += 12;

        }

    }


    return (
        hours * 60 +
        minutes
    );

}


/* =========================================================
   GENERATE 30-MINUTE SLOTS
========================================================= */

function generateTimeSlots(
    ranges
) {

    const slots = [];


    ranges.forEach(
        function (range) {

            let start =
                range.start;


            let end =
                range.end;


            /*
             * Midnight crossing.
             *
             * Example:
             *
             * 10:30 PM → 1:00 AM
             *
             * 22:30 → 01:00
             *
             * Therefore end belongs to next day.
             */

            if (end <= start) {

                end += 24 * 60;

            }


            /*
             * Generate every 30 minutes.
             *
             * Do not create a slot starting at the
             * exact end time.
             */

            for (
                let minutes = start;
                minutes < end;
                minutes += 30
            ) {

                /*
                 * Convert back to 0–1439 for display.
                 */

                const displayMinutes =
                    minutes %
                    (24 * 60);


                slots.push(
                    formatMinutesToTime(
                        displayMinutes
                    )
                );

            }

        }
    );


    /*
     * Remove duplicate slots.
     */

    return [
        ...new Set(slots)
    ];

}


/* =========================================================
   MINUTES → DISPLAY TIME
========================================================= */

function formatMinutesToTime(
    totalMinutes
) {

    const hours24 =
        Math.floor(
            totalMinutes / 60
        );


    const minutes =
        totalMinutes % 60;


    const period =
        hours24 >= 12
            ? "PM"
            : "AM";


    let hours12 =
        hours24 % 12;


    if (hours12 === 0) {

        hours12 = 12;

    }


    return (
        `${hours12}:` +
        `${String(minutes).padStart(2, "0")} ` +
        `${period}`
    );

}


/* =========================================================
   FORMAT DATE FOR STATE
========================================================= */

function formatDateForState(
    date
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        `${year}-${month}-${day}`
    );

}


/* =========================================================
   PARSE YYYY-MM-DD SAFELY
========================================================= */

function parseDateString(
    dateString
) {

    if (
        typeof dateString !== "string"
    ) {

        return null;

    }


    const parts =
        dateString.split("-");


    if (parts.length !== 3) {

        return null;

    }


    const year =
        Number(parts[0]);


    const month =
        Number(parts[1]);


    const day =
        Number(parts[2]);


    if (
        !Number.isInteger(year) ||
        !Number.isInteger(month) ||
        !Number.isInteger(day)
    ) {

        return null;

    }


    return new Date(
        year,
        month - 1,
        day
    );

}


/* =========================================================
   FORMAT DATE FOR DISPLAY
========================================================= */

function formatDisplayDate(
    date
) {

    if (!(date instanceof Date)) {

        return "";

    }


    return new Intl.DateTimeFormat(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    ).format(date);

}


/* =========================================================
   START OF DAY
========================================================= */

function startOfDay(
    date
) {

    const result =
        new Date(date);


    result.setHours(
        0,
        0,
        0,
        0
    );


    return result;

}


/* =========================================================
   RESET BOOKING FLOW
========================================================= */

function resetBookingFlow() {

    /*
     * Stop pending payment simulation.
     */

    if (paymentTimer) {

        clearTimeout(
            paymentTimer
        );

        paymentTimer =
            null;

    }


    /* -----------------------------------------------------
       Reset state
    ----------------------------------------------------- */

    bookingState.doctorId =
        null;

    bookingState.selectedDate =
        null;

    bookingState.selectedSlot =
        null;

    bookingState.contactInfo =
        "";

    bookingState.appointmentNo =
        null;


    /* -----------------------------------------------------
       Reset doctor
    ----------------------------------------------------- */

    currentDoctor =
        null;


    /* -----------------------------------------------------
       Reset calendar
    ----------------------------------------------------- */

    calendarDate =
        new Date();


    calendarDate.setDate(
        1
    );


    /* -----------------------------------------------------
       Reset inputs
    ----------------------------------------------------- */

    if (patientMobile) {

        patientMobile.value =
            "";

    }


    if (patientEmail) {

        patientEmail.value =
            "";

    }


    /* -----------------------------------------------------
       Enable payment button
    ----------------------------------------------------- */

    if (confirmBooking) {

        confirmBooking.disabled =
            false;

        confirmBooking.textContent =
            "Pay";

    }


    /* -----------------------------------------------------
       Reset text
    ----------------------------------------------------- */

    if (appointmentDoctorName) {

        appointmentDoctorName.textContent =
            "Doctor Name";

    }


    if (appointmentFee) {

        appointmentFee.textContent =
            "₹0";

    }


    if (selectedDateText) {

        selectedDateText.textContent =
            "Please select a date";

    }


    if (slotDateText) {

        slotDateText.textContent =
            "Choose an available time";

    }


    if (timeSlots) {

        timeSlots.innerHTML =
            "";

    }


    if (slotEmptyMessage) {

        slotEmptyMessage.hidden =
            true;

    }


    /* -----------------------------------------------------
       Reset confirmation
    ----------------------------------------------------- */

    const confirmationFields = [

        "confirmationAppointmentNo",

        "confirmationDoctorName",

        "confirmationSpecialist",

        "confirmationAddress",

        "confirmationDate",

        "confirmationSlot",

        "confirmationContact",

        "confirmationFee"

    ];


    confirmationFields.forEach(
        function (id) {

            const element =
                document.getElementById(id);


            if (element) {

                element.textContent =
                    "";

            }

        }
    );


    /* -----------------------------------------------------
       Always reset to SCREEN 1 internally
    ----------------------------------------------------- */

    showScreen(1);

}


/* =========================================================
   CLOSE APPOINTMENT MODAL
========================================================= */

function closeAppointment() {

    if (!appointmentModal) {

        return;

    }


    /*
     * Stop any pending payment timer.
     */

    if (paymentTimer) {

        clearTimeout(
            paymentTimer
        );

        paymentTimer =
            null;

    }


    /*
     * Completely hide modal.
     */

    appointmentModal.classList.remove(
        "open"
    );

    appointmentModal.hidden =
        true;

    appointmentModal.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
     * Remove body modal state.
     */

    document.body.classList.remove(
        "modal-open"
    );


    /*
     * Reset everything so next booking starts
     * from Screen 1.
     */

    resetBookingFlow();

}


/* =========================================================
   OPTIONAL GLOBAL CLOSE FUNCTION
========================================================= */

window.closeAppointment =
    closeAppointment;