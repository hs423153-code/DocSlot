/* =========================================================
   DARZCI HEALTHCARE
   DOCTOR LISTING + SEARCH + FILTER SYSTEM
========================================================= */


/* =========================================================
   DOCTOR DATABASE
========================================================= */

const doctors = [

    {
        id: "DR001",

        image: "image/doctor-01.jpg",

        name: "Dr. Aarav Sharma",

        specialization: "Cardiologist",

        gender: "male",

        city: "Kanpur",

        bestDoctor: true,

        availableDays: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ],

        availableHours: {
            weekdays: "9:00 AM - 5:00 PM",
            weekends: "10:00 AM - 2:00 PM"
        }
    },

    {
        id: "DR002",

        image: "image/doctor-02.jpg",

        name: "Dr. Gyan Bhushan Raman",

        specialization: "General Physician",

        gender: "male",

        city: "Patna",

        bestDoctor: true,

        availableDays: [
            "Monday",
            "Tuesday",
            "Thursday",
            "Friday",
        ],

        availableHours: {
            weekdays: "9:00 AM - 10:00 AM , 6:00PM - 8:00PM",
            weekends: "11:00 AM - 1:00 PM"
        }
    },


    {
        id: "DR003",

        image: "image/doctor-03.jpg",

        name: "Dr. Manish Jain",

        specialization: "Dermatologist",

        gender: "male",

        city: "Jaipur",

        bestDoctor: true,

        availableDays: [
            "Monday",
            "Tuesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],

        availableHours: {
            weekdays: "9:00 AM – 12:00 PM , 5:00 PM – 8:30 PM" ,
            weekends: "10:00 AM – 12:00 PM , 5:00 PM – 7:00 PM"
        }
    },


    {
        id: "DR004",

        image: "image/doctor-04.jpg",

        name: "Dr. Babita",

        specialization: "dermatologist",

        gender: "female",

        city: "Jaipur",

        bestDoctor: true,

        availableDays: [
            "Monday",
            "Wednesday",
            "Friday",
            "Saturday"
        ],

        availableHours: {
            weekdays: "9:00 AM - 4:00 PM",
            weekends: "10:00 AM - 2:00 PM"
        }
    },


    {
        id: "DR005",

        image: "image/doctor-05.jpg",

        name: "Dr. Purshottam Gupta",

        specialization: "General Physician",

        gender: "male",

        city: "Jaipur",

        bestDoctor: false,

        availableDays: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],

        availableHours: {
            weekdays: "10:00 AM – 4:00 PM",
            weekends: "10:00 AM – 4:00 PM"
        }
    },


    {
        id: "DR006",

        image: "image/doctor-06.jpg",

        name: "Dr. Yogesh Gupta",

        specialization: "Neurologist",

        gender: "male",

        city: "Jaipur",

        bestDoctor: true,

        availableDays: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],

        availableHours: {
            weekdays: "Hospital open 24 hours. Regular doctor consultation : 10:00 AM – 2:00 PM , 6:00 PM – 8:00 PM",
            weekends: "Hospital open 24 hours. Regular doctor consultation : 10:00 AM – 2:00 PM , 6:00 PM – 8:00 PM"
        }
    },


    {
        id: "DR007",

        image: "image/doctor-07.jpg",

        name: "Dr. Arushi Solanki",

        specialization: "Dermatologist",

        gender: "female",

        city: "Jaipur",

        bestDoctor: false,

        availableDays: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],

        availableHours: {
            weekdays: "4:30 PM - 8:00 PM",
            weekends: "10:00 AM - 2:00 PM"
        }
    },

    {
        id: "DR008",

        image: "image/doctor-08.jpg",

        name: "Dr. Deepak Sharma",

        specialization: "Gastroenterologist",

        gender: "male",

        city: "Jaipur",

        bestDoctor: false,

        availableDays: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],

        availableHours: {
            weekdays: "10:00 PM - 1:00 AM",
            weekends: "10:00 PM - 1:00 AM"
        }
    },

    {
        id: "DR008",

        image: "image/doctor-09.jpg",

        name: "Dr. Deepak Sharma",

        specialization: "Gastroenterologist",

        gender: "male",

        city: "Jaipur",

        bestDoctor: false,

        availableDays: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],

        availableHours: {
            weekdays: "10:00 PM - 1:00 AM",
            weekends: "10:00 PM - 2:00 AM"
        }
    },

    {
        id: "DR008",

        image: "image/doctor-10.jpg",

        name: "Dr. Deepak Sharma",

        specialization: "Gastroenterologist",

        gender: "male",

        city: "Jaipur",

        bestDoctor: false,

        availableDays: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],

        availableHours: {
            weekdays: "10:00 PM - 1:00 AM",
            weekends: "10:00 PM - 2:00 AM"
        }
    },

    {
        id: "DR008",

        image: "image/doctor-11.jpg",

        name: "Dr. Deepak Sharma",

        specialization: "Gastroenterologist",

        gender: "male",

        city: "Jaipur",

        bestDoctor: false,

        availableDays: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ],

        availableHours: {
            weekdays: "10:00 PM - 1:00 AM",
            weekends: "10:00 PM - 2:00 AM"
        }
    }

];



/* =========================================================
   DOM ELEMENTS
========================================================= */

const doctorGrid = document.getElementById("doctorGrid");

const doctorSearch = document.getElementById("doctorSearch");

const cityFilter = document.getElementById("cityFilter");

const specializationFilter =
    document.getElementById("specializationFilter");

const dayFilter =
    document.getElementById("dayFilter");

const genderFilter =
    document.getElementById("genderFilter");

const applyFilters =
    document.getElementById("applyFilters");

const clearFilters =
    document.getElementById("clearFilters");

const doctorCount =
    document.getElementById("doctorCount");

const noDoctorsMessage =
    document.getElementById("noDoctorsMessage");

const resetSearch =
    document.getElementById("resetSearch");



/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    populateCities();

    renderDoctors(doctors);

});



/* =========================================================
   CITY FILTER
========================================================= */

function populateCities() {

    if (!cityFilter) return;

    const cities = [
        ...new Set(
            doctors.map(doctor => doctor.city)
        )
    ];

    cities.sort();

    cities.forEach(city => {

        const option =
            document.createElement("option");

        option.value =
            city.toLowerCase();

        option.textContent =
            city;

        cityFilter.appendChild(option);

    });

}



/* =========================================================
   RENDER DOCTORS
========================================================= */

function renderDoctors(doctorsToRender) {

    if (!doctorGrid) return;

    doctorGrid.innerHTML = "";


    doctorsToRender.forEach(doctor => {

        const card =
            createDoctorCard(doctor);

        doctorGrid.appendChild(card);

    });


    updateDoctorCount(
        doctorsToRender.length
    );


    if (doctorsToRender.length === 0) {

        noDoctorsMessage.hidden = false;

    } else {

        noDoctorsMessage.hidden = true;

    }

}



/* =========================================================
   CREATE DOCTOR CARD
========================================================= */

function createDoctorCard(doctor) {

    const card =
        document.createElement("article");

    card.className = "doctor-card";


    /*
        IMPORTANT ID SYSTEM

        Every doctor card gets its own unique ID.

        Example:

        doctor-card-DR001
        doctor-card-DR002
        doctor-card-DR003
    */

    card.id =
        `doctor-card-${doctor.id}`;


    /*
        This ID will later be read by
        doctor-details.js
    */

    card.dataset.doctorId =
        doctor.id;



    /* =========================================
       IMAGE
    ========================================== */

    const image =
        document.createElement("img");

    image.className =
        "doctor-card-image";

    image.src =
        doctor.image;

    image.alt =
        doctor.name;



    /* =========================================
       CARD CONTENT
    ========================================== */

    const content =
        document.createElement("div");

    content.className =
        "doctor-card-content";



    /* NAME */

    const name =
        document.createElement("h3");

    name.className =
        "doctor-name";

    name.textContent =
        doctor.name;



    /* AVAILABLE DAYS */

    const days =
        document.createElement("p");

    days.className =
        "doctor-days";

    days.innerHTML =
        `<strong>Available:</strong>
         ${formatDays(doctor.availableDays)}`;



    /* AVAILABLE HOURS */

    const hours =
        document.createElement("p");

    hours.className =
        "doctor-hours";

    hours.innerHTML =
        `<strong>Hours:</strong>
         ${getHoursText(doctor)}`;



    /* VIEW DETAILS */

    const button =
        document.createElement("button");

    button.type =
        "button";

    button.className =
        "view-details-btn";

    button.textContent =
        "View Details";


    /*
        MOST IMPORTANT PART:

        Button carries the doctor's ID.

        doctor-details.js will use this ID.
    */

    button.dataset.doctorId =
        doctor.id;



    /* =========================================
       BUILD CARD
    ========================================== */

    content.appendChild(name);

    content.appendChild(days);

    content.appendChild(hours);

    content.appendChild(button);

    card.appendChild(image);

    card.appendChild(content);


    return card;

}



/* =========================================================
   FORMAT DAYS
========================================================= */

function formatDays(days) {

    if (!days || days.length === 0) {

        return "Not available";

    }


    /*
       Convert:

       Monday, Tuesday, Wednesday,
       Thursday, Friday

       into:

       Mon - Fri
    */

    if (
        days.length === 5 &&
        days.includes("Monday") &&
        days.includes("Tuesday") &&
        days.includes("Wednesday") &&
        days.includes("Thursday") &&
        days.includes("Friday")
    ) {

        return "Mon - Fri";

    }


    if (
        days.length === 7
    ) {

        return "Mon - Sun";

    }


    return days
        .map(day => day.substring(0, 3))
        .join(", ");

}



/* =========================================================
   AVAILABLE HOURS
========================================================= */

function getHoursText(doctor) {

    const days =
        doctor.availableDays;


    const hasWeekdays =
        days.some(day =>
            [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ].includes(day)
        );


    const hasWeekend =
        days.some(day =>
            [
                "Saturday",
                "Sunday"
            ].includes(day)
        );


    if (
        hasWeekdays &&
        hasWeekend
    ) {

        return `
            Mon - Fri:
            ${doctor.availableHours.weekdays}
            <br>
            Sat - Sun:
            ${doctor.availableHours.weekends}
        `;

    }


    if (hasWeekdays) {

        return doctor.availableHours.weekdays;

    }


    return doctor.availableHours.weekends;

}



/* =========================================================
   SEARCH + FILTER
========================================================= */

function applyDoctorFilters() {

    const searchValue =
        doctorSearch.value
            .trim()
            .toLowerCase();


    const selectedCity =
        cityFilter.value
            .toLowerCase();


    const selectedSpecialization =
        specializationFilter.value
            .toLowerCase();


    const selectedDay =
        dayFilter.value
            .toLowerCase();


    const selectedGender =
        genderFilter.value
            .toLowerCase();



    const filteredDoctors =
        doctors.filter(doctor => {


            /* NAME SEARCH */

            const matchesSearch =
                doctor.name
                    .toLowerCase()
                    .includes(searchValue);



            /* CITY */

            const matchesCity =
                !selectedCity ||
                doctor.city
                    .toLowerCase() === selectedCity;



            /* SPECIALIZATION */

            const matchesSpecialization =
                !selectedSpecialization ||
                doctor.specialization
                    .toLowerCase()
                    .replaceAll(" ", "-") ===
                selectedSpecialization;



            /* DAY */

            const matchesDay =
                !selectedDay ||
                doctor.availableDays
                    .some(day =>
                        day.toLowerCase() === selectedDay
                    );



            /* GENDER */

            const matchesGender =
                !selectedGender ||
                doctor.gender
                    .toLowerCase() === selectedGender;



            return (
                matchesSearch &&
                matchesCity &&
                matchesSpecialization &&
                matchesDay &&
                matchesGender
            );

        });



    renderDoctors(filteredDoctors);

}



/* =========================================================
   EVENTS
========================================================= */

if (applyFilters) {

    applyFilters.addEventListener(
        "click",
        applyDoctorFilters
    );

}



/*
   Search works instantly while typing.
*/

if (doctorSearch) {

    doctorSearch.addEventListener(
        "input",
        applyDoctorFilters
    );

}



/* =========================================================
   CLEAR FILTERS
========================================================= */

function resetAllFilters() {

    doctorSearch.value = "";

    cityFilter.value = "";

    specializationFilter.value = "";

    dayFilter.value = "";

    genderFilter.value = "";

    renderDoctors(doctors);

}


if (clearFilters) {

    clearFilters.addEventListener(
        "click",
        resetAllFilters
    );

}


if (resetSearch) {

    resetSearch.addEventListener(
        "click",
        resetAllFilters
    );

}



/* =========================================================
   DOCTOR COUNT
========================================================= */

function updateDoctorCount(count) {

    if (!doctorCount) return;

    doctorCount.textContent =
        `${count} doctor${count === 1 ? "" : "s"} available`;

}



/* =========================================================
   GLOBAL ACCESS
   doctor-details.js will use this.
========================================================= */

window.darzciDoctors = doctors;
