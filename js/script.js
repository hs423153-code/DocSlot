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


    /* =====================================================
       CHECK DOCTOR DATABASE
    ===================================================== */

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
       CLEAR OLD CARDS
    ===================================================== */

    container.innerHTML = "";


    /* =====================================================
       NO BEST DOCTORS
    ===================================================== */

    if (bestDoctors.length === 0) {

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

    bestDoctors.forEach(doctor => {

        const card =
            document.createElement("article");

        card.className =
            "doctor-featured-card";


        /* =================================================
           AVAILABLE DAYS
        ================================================= */

        const availableDays =
            Array.isArray(doctor.availableDays)

                ? doctor.availableDays
                    .map(day => day.substring(0, 4))
                    .join(" - ")

                : "Availability varies";


        /* =================================================
           RATING
        ================================================= */

        const rating =
            doctor.rating ?? "N/A";


        /* =================================================
           CARD HTML
        ================================================= */

        card.innerHTML = `

            <!-- BEST DOCTOR BADGE -->

            <span class="best-doctor-badge">
                ★ Best Doctor
            </span>


            <!-- DOCTOR IMAGE -->

            <div class="doctor-image">

                <img
                    src="${doctor.image}"
                    alt="${doctor.name}"
                    loading="lazy">

            </div>


            <!-- DOCTOR INFORMATION -->

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


                <!-- VIEW DETAILS -->

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
       VIEW DETAILS
    ===================================================== */

    const detailButtons =
        container.querySelectorAll(
            ".doctor-details-btn"
        );


    detailButtons.forEach(button => {

        button.addEventListener("click", () => {

            const doctorId =
                button.dataset.doctorId;


            if (!doctorId) {

                console.error(
                    "Doctor ID missing."
                );

                return;
            }


            /* =============================================
               OPEN EXISTING DOCTOR INFO MODAL
            ============================================= */

            if (
                typeof openDoctorDetails ===
                "function"
            ) {

                openDoctorDetails(doctorId);

            } else {

                console.error(
                    "openDoctorDetails() not found."
                );

            }

        });

    });


    /* =====================================================
       INITIALIZE SLIDER
    ===================================================== */

    initializeBestDoctorSlider();

}


/* =========================================================
   BEST DOCTOR SLIDER
========================================================= */

function initializeBestDoctorSlider() {

    const container =
        document.getElementById(
            "bestDoctorsContainer"
        );

    const prevButton =
        document.getElementById(
            "bestDoctorsPrev"
        );

    const nextButton =
        document.getElementById(
            "bestDoctorsNext"
        );


    if (
        !container ||
        !prevButton ||
        !nextButton
    ) {
        return;
    }


    const cards =
        container.querySelectorAll(
            ".doctor-featured-card"
        );


    /* =============================================
       4 OR LESS → NO SLIDING REQUIRED
    ============================================= */

    if (cards.length <= 4) {

        prevButton.style.display = "none";
        nextButton.style.display = "none";

        return;
    }


    let currentPosition = 0;


    /*
        One card moves at a time.
    */

    const moveSlider = () => {

        const cardWidth =
            cards[0].offsetWidth;

        const gap =
            parseFloat(
                getComputedStyle(container).gap
            ) || 0;


        const moveAmount =
            cardWidth + gap;


        container.style.transform =
            `translateX(-${currentPosition * moveAmount}px)`;

    };


    /* =============================================
       NEXT
    ============================================= */

    nextButton.addEventListener(
        "click",
        () => {

            const maxPosition =
                cards.length - 4;


            if (
                currentPosition <
                maxPosition
            ) {

                currentPosition++;

                moveSlider();

            }

        }
    );


    /* =============================================
       PREVIOUS
    ============================================= */

    prevButton.addEventListener(
        "click",
        () => {

            if (
                currentPosition > 0
            ) {

                currentPosition--;

                moveSlider();

            }

        }
    );

}


/* =========================================================
   RUN AFTER PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    loadBestDoctors
);