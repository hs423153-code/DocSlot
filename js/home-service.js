/* =========================================================
   HOME SERVICE DATA
========================================================= */

const homeTeams = [

    {
        id: "HCT-01",

        name: "Home Care Team 1",

        area: "Kanpur",

        timing: "9:00 AM - 6:00 PM",

        rating: 4.8,

        doctor: "Dr. Aarav Sharma",

        qualification: "MBBS, Junior Doctor",

        wardBoy: "Rahul Verma",

        experience: "4 Years",

        services: [
            "Basic Checkup",
            "BP Check",
            "Sugar Check",
            "Wound Dressing",
            "Elderly Care"
        ]

    },


    {
        id: "HCT-02",

        name: "Home Care Team 2",

        area: "Kanpur",

        timing: "10:00 AM - 7:00 PM",

        rating: 4.7,

        doctor: "Dr. Riya Singh",

        qualification: "MBBS, Junior Doctor",

        wardBoy: "Amit Kumar",

        experience: "5 Years",

        services: [
            "Basic Checkup",
            "Injection / Medicine",
            "Wound Dressing",
            "Elderly Care"
        ]

    },


    {
        id: "HCT-03",

        name: "Home Care Team 3",

        area: "Unnao",

        timing: "8:00 AM - 5:00 PM",

        rating: 4.9,

        doctor: "Dr. Kabir Mehta",

        qualification: "MBBS, Junior Doctor",

        wardBoy: "Vikas Yadav",

        experience: "6 Years",

        services: [
            "Basic Checkup",
            "Sugar Check",
            "Elderly Care",
            "Emergency Home Visit"
        ]

    }

];


/* =========================================================
   STATE
========================================================= */

let selectedTeam = null;

let selectedService = "";

let selectedDate = null;

let selectedTime = null;

let calendarDate = new Date();


/* =========================================================
   ELEMENTS
========================================================= */

const teamGrid =
    document.getElementById("teamGrid");

const teamModal =
    document.getElementById("teamModal");

const bookingModal =
    document.getElementById("bookingModal");

const closeTeamModal =
    document.getElementById("closeTeamModal");

const closeBookingModal =
    document.getElementById("closeBookingModal");

const modalBookVisit =
    document.getElementById("modalBookVisit");

const bookingForm =
    document.getElementById("homeBookingForm");


/* =========================================================
   RENDER TEAM CARDS
========================================================= */

function renderTeams() {

    if (!teamGrid) return;

    teamGrid.innerHTML = "";

    homeTeams.forEach((team, index) => {

        const card =
            document.createElement("article");

        card.className = "team-card";

        card.innerHTML = `

            <div class="team-photo">

                <i class="fa-solid fa-user-doctor"></i>

                <i class="fa-solid fa-user-nurse"></i>

            </div>


            <div class="team-info">

                <h3>
                    ${team.name}
                </h3>


                <div class="team-meta">

                    <span>
                        <i class="fa-solid fa-location-dot"></i>
                        ${team.area}
                    </span>

                    <span>
                        <i class="fa-regular fa-clock"></i>
                        ${team.timing}
                    </span>

                    <span class="rating">
                        ★ ${team.rating} / 5
                    </span>

                </div>


                <button
                    class="view-team-btn"
                    data-team="${index}">

                    View More

                </button>

            </div>
        `;

        teamGrid.appendChild(card);

    });


    document
        .querySelectorAll(".view-team-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(button.dataset.team);

                    openTeamModal(
                        homeTeams[index]
                    );

                }
            );

        });

}


/* =========================================================
   TEAM MODAL
========================================================= */

function openTeamModal(team) {

    selectedTeam = team;

    document.getElementById(
        "modalTeamId"
    ).textContent = team.id;

    document.getElementById(
        "modalTeamName"
    ).textContent = team.name;

    document.getElementById(
        "modalDoctor"
    ).textContent = team.doctor;

    document.getElementById(
        "modalQualification"
    ).textContent = team.qualification;

    document.getElementById(
        "modalWardBoy"
    ).textContent = team.wardBoy;

    document.getElementById(
        "modalExperience"
    ).textContent = team.experience;


    const services =
        document.getElementById(
            "modalServices"
        );

    services.innerHTML = "";

    const list =
        document.createElement("div");

    list.className =
        "modal-service-list";


    team.services.forEach(service => {

        const item =
            document.createElement("span");

        item.className =
            "modal-service-item";

        item.textContent = service;

        list.appendChild(item);

    });


    services.appendChild(list);


    teamModal.classList.add("open");

    teamModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =========================================================
   OPEN BOOKING
========================================================= */

function openBooking(service = "") {

    if (!selectedTeam) {

        selectedTeam =
            homeTeams[0];

    }

    selectedService = service;

    selectedDate = null;
    selectedTime = null;

    calendarDate = new Date();

    document.getElementById(
        "bookingStep1"
    ).classList.add("active");

    document.getElementById(
        "bookingStep2"
    ).classList.remove("active");

    document.getElementById(
        "bookingStep3"
    ).classList.remove("active");

    document.getElementById(
        "bookingSuccess"
    ).hidden = true;


    renderCalendar();

    bookingModal.classList.add("open");

    bookingModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =========================================================
   CLOSE MODALS
========================================================= */

function closeModal(modal) {

    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}

closeTeamModal?.addEventListener(
    "click",
    () => closeModal(teamModal)
);

closeBookingModal?.addEventListener(
    "click",
    () => closeModal(bookingModal)
);


/* =========================================================
   TEAM → BOOK
========================================================= */

modalBookVisit?.addEventListener(
    "click",
    () => {

        closeModal(teamModal);

        openBooking();

    }
);


/* =========================================================
   SERVICE BOOK BUTTONS
========================================================= */

document
    .querySelectorAll(".service-book-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                selectedTeam =
                    homeTeams[0];

                openBooking(
                    button.dataset.service
                );

            }
        );

    });


/* =========================================================
   CALENDAR
========================================================= */

function renderCalendar() {

    const monthTitle =
        document.getElementById(
            "calendarMonth"
        );

    const calendarDays =
        document.getElementById(
            "calendarDays"
        );

    const dateNext =
        document.getElementById(
            "dateNext"
        );


    const year =
        calendarDate.getFullYear();

    const month =
        calendarDate.getMonth();


    const monthName =
        calendarDate.toLocaleString(
            "default",
            {
                month: "long"
            }
        );


    monthTitle.textContent =
        `${monthName} ${year}`;


    calendarDays.innerHTML = "";

    dateNext.disabled = true;


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const blank =
            document.createElement("div");

        calendarDays.appendChild(blank);

    }


    const today =
        new Date();

    today.setHours(
        0, 0, 0, 0
    );


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

        button.className =
            "calendar-day";

        button.textContent = day;


        if (date < today) {

            button.disabled = true;

        }


        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".calendar-day"
                    )
                    .forEach(
                        btn =>
                            btn.classList.remove(
                                "selected"
                            )
                    );


                button.classList.add(
                    "selected"
                );


                selectedDate = date;

                dateNext.disabled =
                    false;

            }
        );


        calendarDays.appendChild(
            button
        );

    }

}


/* =========================================================
   MONTH NAVIGATION
========================================================= */

document
    .getElementById("prevMonth")
    ?.addEventListener(
        "click",
        () => {

            calendarDate.setMonth(
                calendarDate.getMonth() - 1
            );

            renderCalendar();

        }
    );


document
    .getElementById("nextMonth")
    ?.addEventListener(
        "click",
        () => {

            calendarDate.setMonth(
                calendarDate.getMonth() + 1
            );

            renderCalendar();

        }
    );


/* =========================================================
   STEP 1 → STEP 2
========================================================= */

document
    .getElementById("dateNext")
    ?.addEventListener(
        "click",
        () => {

            if (!selectedDate) return;

            document
                .getElementById(
                    "bookingStep1"
                )
                .classList.remove(
                    "active"
                );


            document
                .getElementById(
                    "bookingStep2"
                )
                .classList.add(
                    "active"
                );


            const formatted =
                selectedDate.toLocaleDateString(
                    "en-IN",
                    {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );


            document.getElementById(
                "selectedDateText"
            ).textContent =
                formatted;


            renderTimeSlots();

        }
    );


/* =========================================================
   TIME SLOTS
========================================================= */

function renderTimeSlots() {

    const container =
        document.getElementById(
            "homeTimeSlots"
        );

    container.innerHTML = "";

    selectedTime = null;

    document.getElementById(
        "timeNext"
    ).disabled = true;


    const times = [
        "09:00 AM",
        "10:00 AM",
        "11:30 AM",
        "01:00 PM",
        "02:30 PM",
        "04:00 PM",
        "05:30 PM"
    ];


    times.forEach(time => {

        const button =
            document.createElement(
                "button"
            );

        button.type = "button";

        button.className =
            "time-slot";

        button.textContent =
            time;


        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".time-slot"
                    )
                    .forEach(
                        slot =>
                            slot.classList.remove(
                                "selected"
                            )
                    );


                button.classList.add(
                    "selected"
                );


                selectedTime = time;

                document.getElementById(
                    "timeNext"
                ).disabled = false;

            }
        );


        container.appendChild(
            button
        );

    });

}


/* =========================================================
   STEP 2 → STEP 3
========================================================= */

document
    .getElementById("timeNext")
    ?.addEventListener(
        "click",
        () => {

            if (!selectedTime) return;

            document
                .getElementById(
                    "bookingStep2"
                )
                .classList.remove(
                    "active"
                );


            document
                .getElementById(
                    "bookingStep3"
                )
                .classList.add(
                    "active"
                );

        }
    );


/* =========================================================
   FORM SUBMISSION
========================================================= */

bookingForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const patientName =
            document.getElementById(
                "homePatientName"
            ).value.trim();


        const patientAge =
            document.getElementById(
                "homePatientAge"
            ).value.trim();


        const address =
            document.getElementById(
                "homePatientAddress"
            ).value.trim();


        const emergencyContact =
            document.getElementById(
                "homeEmergencyContact"
            ).value.trim();


        const reason =
            document.getElementById(
                "homeVisitReason"
            ).value;


        const mobile =
            document.getElementById(
                "homePatientMobile"
            ).value.trim();


        const email =
            document.getElementById(
                "homePatientEmail"
            ).value.trim();


        if (!mobile && !email) {

            alert(
                "Please enter either a mobile number or email."
            );

            return;

        }


        const dateText =
            selectedDate.toLocaleDateString(
                "en-IN",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


        const confirmation = `

            <strong>
                Home Care Team:
            </strong>
            ${selectedTeam.name}

            <br>

            <strong>
                Patient Name:
            </strong>
            ${patientName}

            <br>

            <strong>
                Visit Date & Time:
            </strong>
            ${dateText}, ${selectedTime}

            <br>

            <strong>
                Address:
            </strong>
            ${address}

            <br><br>

            You have successfully booked your
            home visit!

        `;


        document.getElementById(
            "confirmationBox"
        ).innerHTML =
            confirmation;


        /* ================================================
           DEMO DASHBOARD UPDATE
        ================================================= */

        document.getElementById(
            "dashboardTeam"
        ).textContent =
            selectedTeam.name;


        document.getElementById(
            "dashboardPatient"
        ).textContent =
            patientName;


        document.getElementById(
            "dashboardVisit"
        ).textContent =
            `${dateText}, ${selectedTime}`;


        document.getElementById(
            "dashboardReason"
        ).textContent =
            reason;


        document.getElementById(
            "dashboardStatus"
        ).textContent =
            "Pending";


        document.getElementById(
            "dashboardStatus"
        ).className =
            "status-badge pending";


        document.getElementById(
            "bookingStep3"
        ).classList.remove(
            "active"
        );


        document.getElementById(
            "bookingSuccess"
        ).hidden = false;


        document.getElementById(
            "bookingSuccess"
        ).classList.add(
            "active"
        );

    }
);


/* =========================================================
   CLOSE SUCCESS
========================================================= */

document
    .getElementById("closeSuccess")
    ?.addEventListener(
        "click",
        () => {

            closeModal(
                bookingModal
            );

            document.getElementById(
                "bookingSuccess"
            ).hidden = true;

            document.getElementById(
                "bookingSuccess"
            ).classList.remove(
                "active"
            );

            bookingForm.reset();

        }
    );


/* =========================================================
   DEMO: RESOLVED AT HOME
========================================================= */

document
    .getElementById("resolveVisit")
    ?.addEventListener(
        "click",
        () => {

            const status =
                document.getElementById(
                    "dashboardStatus"
                );

            const result =
                document.getElementById(
                    "escalationResult"
                );


            status.textContent =
                "Resolved at Home";

            status.className =
                "status-badge resolved";


            result.hidden = false;

            result.innerHTML = `

                <h4>
                    <i class="fa-solid fa-circle-check"></i>
                    Case Resolved
                </h4>

                <p>
                    The demo case has been marked as
                    <strong>Resolved at Home</strong>.
                    Normal home-care workflow completed.
                </p>

            `;

        }
    );


/* =========================================================
   DEMO: REFER TO HOSPITAL
========================================================= */

document
    .getElementById("referVisit")
    ?.addEventListener(
        "click",
        () => {

            const status =
                document.getElementById(
                    "dashboardStatus"
                );

            const result =
                document.getElementById(
                    "escalationResult"
                );


            const hospital =
                "Regency Hospital, Kanpur";


            status.textContent =
                "Referred to Hospital";

            status.className =
                "status-badge referred";


            result.hidden = false;

            result.innerHTML = `

                <h4>
                    <i class="fa-solid fa-hospital"></i>
                    Hospital Referral
                </h4>

                <p>
                    The demo case has been marked for
                    hospital escalation.
                </p>

                <p>
                    <strong>
                        Suggested Hospital:
                    </strong>
                    ${hospital}
                </p>

                <p>
                    Your condition requires hospital care.
                    You are being referred to
                    <strong>${hospital}</strong>.
                    Please proceed or contact your
                    emergency contact.
                </p>

                <button
                    class="ambulance-btn"
                    onclick="requestTransport()">

                    <i class="fa-solid fa-truck-medical"></i>
                    Request Ambulance / Transport

                </button>

            `;

        }
    );


/* =========================================================
   MOCK TRANSPORT
========================================================= */

function requestTransport() {

    alert(
        "Demo only: Transport request initiated."
    );

}


/* =========================================================
   CLOSE MODAL ON OUTSIDE CLICK
========================================================= */

document
    .querySelectorAll(".modal-overlay")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeModal(modal);

                }

            }
        );

    });


/* =========================================================
   INITIALIZE
========================================================= */

renderTeams();