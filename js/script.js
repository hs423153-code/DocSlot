/* =========================================================
   HERO SLIDER
========================================================= */

const slidesContainer =
    document.getElementById("heroSlider");

const slides =
    document.querySelectorAll(".hero-slide");

const nextBtn =
    document.getElementById("heroNext");

const prevBtn =
    document.getElementById("heroPrev");

const dots =
    document.querySelectorAll(".hero-dot");

let currentSlide = 0;


/* =========================================================
   UPDATE SLIDER
========================================================= */

function updateSlider() {

    slidesContainer.style.transform =
        `translateX(-${currentSlide * 100}%)`;

}


/* =========================================================
   NEXT SLIDE
========================================================= */

function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    updateSlider();

    updateDots();
}


/* =========================================================
   PREVIOUS SLIDE
========================================================= */

function prevSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    updateSlider();

    updateDots();
}


/* =========================================================
   DOTS
========================================================= */

function updateDots() {

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentSlide
        );

    });

}


/* =========================================================
   BUTTON EVENTS
========================================================= */

if (
    slidesContainer &&
    slides.length &&
    nextBtn &&
    prevBtn
) {

    nextBtn.addEventListener(
        "click",
        nextSlide
    );

    prevBtn.addEventListener(
        "click",
        prevSlide
    );


    /* =====================================================
       DOT EVENTS
    ===================================================== */

    dots.forEach((dot) => {

        dot.addEventListener(
            "click",
            () => {

                currentSlide =
                    Number(
                        dot.dataset.slide
                    );

                updateSlider();
                updateDots();

            }
        );

    });


    /* =====================================================
       AUTO SLIDE
    ===================================================== */

    setInterval(
        nextSlide,
        5000
    );

}

/* =========================================================
   BEST DOCTORS — HOMEPAGE
========================================================= */

function loadBestDoctors() {

    const container =
        document.getElementById("bestDoctorsContainer");

    if (!container) {
        return;
    }


    /* Check doctor database */

    if (
        !window.darzciDoctors ||
        !Array.isArray(window.darzciDoctors)
    ) {
        console.warn("Doctor database not found.");
        return;
    }


    /* =====================================================
       GET BEST DOCTORS
    ===================================================== */

    const bestDoctors =
        window.darzciDoctors.filter(
            doctor => doctor.bestDoctor === true
        );


    /* =====================================================
       SHOW ONLY FIRST 3
    ===================================================== */

    const featuredDoctors =
        bestDoctors.slice(0, 3);


    /* Clear existing content */

    container.innerHTML = "";


    /* =====================================================
       NO BEST DOCTORS
    ===================================================== */

    if (featuredDoctors.length === 0) {

        container.innerHTML = `
            <p class="no-featured-doctors">
                No featured doctors available right now.
            </p>
        `;

        return;
    }


    /* =====================================================
       CREATE DOCTOR CARDS
    ===================================================== */

    featuredDoctors.forEach(doctor => {

        const card =
            document.createElement("article");

        card.className =
            "doctor-featured-card";


        /* Available days */

        const availableDays =
            Array.isArray(doctor.availableDays)
                ? doctor.availableDays
                    .map(day => day.substring(0, 4))
                    .join(" - ")
                : "Availability varies";


        /* Rating */

        const rating =
            doctor.rating ?? "N/A";


        /* =================================================
           CARD HTML
        ================================================= */

        card.innerHTML = `

            <div class="doctor-image">

                <img
                    src="${doctor.image}"
                    alt="${doctor.name}"
                    loading="lazy">

            </div>


            <div class="doctor-info">

                <h3>
                    ${doctor.name}
                </h3>


                <p class="doctor-specialization">
                    ${doctor.specialization}
                </p>


                <p class="doctor-availability">
                    ${availableDays}
                </p>


                <div class="doctor-rating">

                    ★★★★★

                    <span>
                        ${rating}
                    </span>

                </div>


                <button
                    type="button"
                    class="doctor-details-btn"
                    data-doctor-id="${doctor.id}">

                    View Details

                </button>

            </div>

        `;


        container.appendChild(card);

    });


    /* =====================================================
       VIEW DETAILS BUTTONS
    ===================================================== */

    const detailButtons =
        container.querySelectorAll(
            ".doctor-details-btn"
        );


    detailButtons.forEach(button => {

        button.addEventListener("click", () => {

            const doctorId =
                button.dataset.doctorId;


            /*
                Save doctor ID so product.html
                can use the same doctor database.
            */

            sessionStorage.setItem(
                "selectedDoctorId",
                doctorId
            );


            /*
                Open doctor listing page.
            */

            window.location.href =
                `product.html?doctor=${doctorId}`;

        });

    });

}


/* =========================================================
   RUN AFTER PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    loadBestDoctors
);