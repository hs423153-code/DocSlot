/* =========================================================
   FULL DOCTOR DATABASE
   ========================================================= */

const doctorDetails = [

    {
        id: "DR001",
        image: "image/doctor-01.jpg",
        name: "Dr. Aarav Sharma",
        specialization: "Cardiologist",
        gender: "male",

        qualification: "MBBS, MD Cardiology",
        experience: 12,

        city: "Kanpur",
        clinicAddress: "ABC Heart Clinic, Civil Lines, Kanpur",

        rating: 4.8,
        reviewCount: 126,
        fee: 800,

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
        },

        description:
            "Dr. Aarav Sharma is an experienced cardiologist specializing in heart health, preventive cardiology and cardiovascular care.",
        
        rating: 4.8,
reviewCount: 126,

reviews: [
    {
        name: "Rahul Verma",
        rating: 5,
        text: "Very professional and explained everything clearly. The consultation was really helpful.",
        date: "2 weeks ago"
    },
    {
        name: "Priya Singh",
        rating: 5,
        text: "Doctor was patient and listened carefully to all my concerns. Good experience.",
        date: "1 month ago"
    },
    {
        name: "Aman Gupta",
        rating: 4,
        text: "Overall a very good consultation. Clinic staff was also helpful.",
        date: "2 months ago"
    }
],
    },

        {
        id: "DR002",
        image: "image/doctor-01.jpg",
        name: "Dr. Gyan Bhushan Raman",
        specialization: "General Physician",
        gender: "male",

        qualification: "MD (General Medicine)-Patna Medical College, Patna-2011 , MBBS-Patna University - 2007",
        experience: 15,

        city: "Kanpur",
        clinicAddress: "Elite Care Clinic, Near An College & Pani Tanki, Below Suraksha Diagnostic, Boring Patliputra Road, North Sri Krishana Puri, Patna-800013, Bihar",

        rating: 4.9,
        reviewCount: 123,
        fee: 700,

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
        },

        description:
            "Dr. Gyan Bhushan Raman is an experienced General Physician specializing in diabetologist, preventive diabetic and General health.",
        
        rating: 4.8,
reviewCount: 126,

reviews: [
    {
        name: "Swati Singh",
        rating: 5,
        text: "I recently visited Dr. Gyan Bhushan Raman at Elite Care Clinic and had an excellent experience. The clinic is well connected and easily accessible, making it convenient for patients. The prices are reasonable, which is a big plus. I was also pleased with the decent coverage offered for treatments. Overall, I highly recommend this clinic for anyone looking for quality care!",
        date: "5 months ago"
    },
    {
        name: "Shrishty",
        rating: 4.7,
        text: "My experience at Dr. Gyan Bhushan Raman Elite Care Clinic was exceptional. The clinic maintained a clean and hygienic environment, with all equipment thoroughly sterilized. Services were reasonably priced, and subsidies were available, making healthcare accessible. The staff was professional and attentive, ensuring a comforting visit. Highly recommended!",
        date: "1 month ago"
    },
    {
        name: "Aman kumar",
        rating: 5,
        text: "Dr. Gyan Bhushan Raman at Elite Care Clinic is a standout choice for anyone seeking exceptional medical care. Located conveniently near An College, the clinic boasts quick service and a clean, hygienic environment that ensures patient comfort. My experience here was marked by speedy recovery thanks to Dr. Raman s excellent treatment approach. Highly recommend this clinic for anyone looking for top-notch healthcare!",
        date: "2 months ago"
    }
],
    },



    {
        id: "DR003",
        image: "image/doctor-02.jpg",
        name: "Dr. Manish Jain",
        specialization: "Dermatologist",
        gender: "male",

        qualification: "MBBS, MD Dermatology",
        experience: 9,

        city: "Jaipur",
        clinicAddress: "Cinestar Tower, G-14, Sector 2, Central Spine, Vidyadhar Nagar, Jaipur, Rajasthan 302039",

        rating: 4.7,
        reviewCount: 98,
        fee: 500,

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
            weekdays: "9:00 AM – 12:00 PM , 5:00 PM – 8:30 PM",
            weekends: "10:00 AM – 12:00 PM , 5:00 PM – 7:00 PM"
        },

        description:
            "We don't just list doctors. We carefully research, verify, and recognize those who truly stand out in thier specialities",

        reviews: [
],
    },


    {
        id: "DR004",
        image: "image/doctor-03.jpg",
        name: "Dr. Babita",
        specialization: "Dermatologist",
        gender: "female",

        qualification: "MBBS, MD - Dermatology , Venereology & Leprosy",
        experience: 9,

        city: "Jaipur",
        clinicAddress: "Srishti Medicare Private Limited (Srishti Hospital) F1 & 10, Central Spine, Mahal Road, Jagatpura, Jaipur, Rajasthan 302017",

        rating: 3.4,
        reviewCount: 87,
        fee: 750,

        availableDays: [
            "Monday",
            "Wednesday",
            "Friday",
            "Saturday"
        ],

        availableHours: {
            weekdays: "10:00 AM – 2:00 PM , 5:00 PM – 8:00 PM ",
            weekends: ""
        },
    },


    {
        id: "DR005",
        image: "image/doctor-04.jpg",
        name: "Dr. Purshottam Gupta",
        specialization: "General Physician",
        gender: "female",

        qualification: "MBBS, MD General Medicine",
        experience: 10,

        city: "Jaipur",
        clinicAddress: "(Amar medical and research centre) 3, Kiran Path, Sector 3, Mansarovar city, Jaipur,  Rajasthan 302020",

        rating: 4.8,
        reviewCount: 154,
        fee: 600,

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
        },

    },


    {
        id: "DR006",
        image: "image/doctor-05.jpg",
        name: "Dr. Yogesh Gupta",
        specialization: "Neurologist",
        gender: "male",

        qualification: "MBBS, MD Neurology",
        experience: 13,

        city: "Jaipur",
        clinicAddress: "Ground Floor 2, 154, B2 Bypass Rd, SFS Manasarovar, Hans Vihar, Sanganer, Jaipur, Rajasthan 302017",

        rating: 4.9,
        reviewCount: 112,
        fee: 900,

        availableDays: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],

        availableHours: {
            weekdays: "Hospital open 24 hours. Regular doctor consultation : 10:00 AM – 2:00 PM , 6:00 PM – 8:00 PM",
            weekends: "Hospital open 24 hours. Regular doctor consultation : 10:00 AM – 2:00 PM , 6:00 PM – 8:00 PM"
        },

reviews: [
    {
        name: "Nisha Kumari",
        rating: 5,
        text: "Highly skilled staff & hospital services, facilities also awesome... 👍",
        date: "5 months ago"
    },
    {
        name: "Aseem Gupta",
        rating: 4.7,
        text: "It offers specialized treatment for brain, spine, and nerve-related disorders.",
        date: "1 month ago"
    },
    {
        name: "PK Meena",
        rating: 1.2,
        text: "Very bad experience, very impanctual doctor",
        date: "2 months ago"
    }
],
    },


    {
        id: "DR007",
        image: "image/doctor-06.jpg",
        name: "Dr. Arushi Solanki",
        specialization: "Darmatologist",
        gender: "female",

        qualification: "MBBS, DNB - Dermatology & Venereology",
        experience: 5,

        city: "Jaipur",
        clinicAddress: "Skinaite Clinic, Number A-16, Mall Road, Ambabadi, Vidhyadhar Nagar, Jaipur",

        rating: 4.9,
        reviewCount: 40,
        fee: 400,

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
        },

    },

    {
        id: "DR008",
        image: "image/doctor-06.jpg",
        name: "Dr.Deepak Sharma",
        specialization: "Gastroenterologist",
        gender: "male",

        qualification: "MD, DNB, MBBS",
        experience: 12,

        city: "Jaipur",
        clinicAddress: "madhav gastro and eye clinic and advance endoscopy center Health Education & Medical Training opposite Joshi Marg, kalwar road, jhotwara jaipur",

        rating: 4.9,
        reviewCount: 40,
        fee: 300,

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
            weekdays: "10:30 PM - 1:00 AM",
            weekends: "10:30 PM - 1:00 AM"
        },

    }

];

/* =========================================================
   DARZCI HEALTHCARE
   DOCTOR DETAILS SYSTEM
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const doctorModal =
    document.getElementById("doctorModal");

const closeDoctorModal =
    document.getElementById("closeDoctorModal");



/* =========================================================
   GET DOCTOR BY ID
========================================================= */

function getDoctorById(doctorId) {

    return doctorDetails.find(
        doctor =>
            doctor.id === doctorId
    ) || null;

}



/* =========================================================
   OPEN DOCTOR DETAILS
========================================================= */

function openDoctorDetails(doctorId) {

    const doctor =
        getDoctorById(doctorId);


    if (!doctor) {

        console.error(
            `Doctor with ID ${doctorId} not found.`
        );

        return;

    }


    /*
       Fill modal using the SAME doctor ID
       that came from the card.
    */


    const image =
        document.getElementById(
            "modalDoctorImage"
        );


    const name =
        document.getElementById(
            "modalDoctorName"
        );


    const specialization =
        document.getElementById(
            "modalDoctorSpecialization"
        );


    const qualification =
        document.getElementById(
            "modalDoctorQualification"
        );


    const experience =
        document.getElementById(
            "modalDoctorExperience"
        );


    const location =
        document.getElementById(
            "modalDoctorLocation"
        );


    const rating =
        document.getElementById(
            "modalDoctorRating"
        );


    const reviews =
        document.getElementById(
            "modalDoctorReviews"
        );


    const fee =
        document.getElementById(
            "modalDoctorFee"
        );


    const days =
        document.getElementById(
            "modalDoctorDays"
        );


    const timing =
        document.getElementById(
            "modalDoctorTiming"
        );



    /* =========================================
       IMAGE
    ========================================== */

    if (image) {

        image.src =
            doctor.image;

        image.alt =
            doctor.name;

    }



    /* =========================================
       BASIC INFORMATION
    ========================================== */

    if (name) {

        name.textContent =
            doctor.name;

    }


    if (specialization) {

        specialization.textContent =
            doctor.specialization;

    }



    /*
       These fields will be available once
       we expand the doctor database.
    */

    if (qualification) {

        qualification.textContent =
            doctor.qualification ||
            "Qualification information available soon";

    }


    if (experience) {

        experience.textContent =
            doctor.experience
                ? `${doctor.experience} years of experience`
                : "Experience information available soon";

    }


    if (location) {

        location.textContent =
            doctor.clinicAddress ||
            doctor.city;

    }



    /* =========================================
       RATING
    ========================================== */

    if (rating) {

        rating.textContent =
            doctor.rating
                ? "★".repeat(
                    Math.round(doctor.rating)
                  )
                : "★★★★★";

    }


    if (reviews) {

        reviews.textContent =
            doctor.reviewCount
                ? `${doctor.reviewCount} Reviews`
                : "Reviews";

    }

    /* =========================================
   REVIEWS LIST
========================================= */

const reviewsList =
    document.getElementById(
        "modalDoctorReviewsList"
    );


if (reviewsList) {

    renderDoctorReviews(
        doctor
    );

}



    /* =========================================
       FEE
    ========================================== */

    if (fee) {

        fee.textContent =
            doctor.fee
                ? `₹${doctor.fee}`
                : "Fee information available soon";

    }



    /* =========================================
       AVAILABILITY
    ========================================== */

    if (days) {

        days.textContent =
            formatDoctorDays(
                doctor.availableDays
            );

    }


    if (timing) {

        timing.innerHTML =
            getDoctorTiming(
                doctor
            );

    }



    /* =========================================
       SAVE CURRENT DOCTOR ID
    ========================================== */

    doctorModal.dataset.doctorId =
        doctor.id;



    /* =========================================
   OPEN MODAL
========================================= */

doctorModal.hidden = false;

doctorModal.setAttribute(
    "aria-hidden",
    "false"
);

doctorModal.classList.add("active");

document.body.classList.add(
    "modal-open"
);

}



/* =========================================================
   CLOSE MODAL
========================================================= */

function closeDoctorDetails() {

    if (!doctorModal) return;

    doctorModal.classList.remove("active");

    doctorModal.hidden = true;

    doctorModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );
}



/* =========================================================
   VIEW DETAILS BUTTON SYSTEM
========================================================= */

document.addEventListener(
    "click",
    function (event) {


        const button =
            event.target.closest(
                ".view-details-btn"
            );


        if (!button) return;



        /*
           READ DOCTOR ID FROM BUTTON

           Example:

           data-doctor-id="DR001"
        */

        const doctorId =
            button.dataset.doctorId;


        if (!doctorId) {

            console.error(
                "Doctor ID missing from button."
            );

            return;

        }


        openDoctorDetails(
            doctorId
        );

    }
);



/* =========================================================
   CLOSE BUTTON
========================================================= */

if (closeDoctorModal) {

    closeDoctorModal.addEventListener(
        "click",
        closeDoctorDetails
    );

}



/* =========================================================
   CLOSE WHEN CLICKING OUTSIDE MODAL
========================================================= */

if (doctorModal) {

    doctorModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === doctorModal
            ) {

                closeDoctorDetails();

            }

        }
    );

}



/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            doctorModal &&
            !doctorModal.hidden
        ) {

            closeDoctorDetails();

        }

    }
);



/* =========================================================
   FORMAT DAYS
========================================================= */

function formatDoctorDays(days) {

    if (!days || days.length === 0) {

        return "Availability not available";

    }


    return days
        .map(day =>
            day.substring(0, 3)
        )
        .join(" - ");

}



/* =========================================================
   FORMAT TIMING
========================================================= */

function getDoctorTiming(doctor) {

    if (!doctor.availableHours) {

        return "Timing not available";

    }


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
   RENDER DOCTOR REVIEWS
========================================================= */

function renderDoctorReviews(doctor) {

    const reviewsList =
        document.getElementById(
            "modalDoctorReviewsList"
        );


    if (!reviewsList) return;


    /*
       Get demo reviews from doctor database
    */

    const doctorReviews =
        Array.isArray(doctor.reviews)
            ? doctor.reviews
            : [];


    /*
       Get customer-submitted reviews
       from localStorage.
    */

    let customerReviews = [];


    try {

        customerReviews =
            JSON.parse(
                localStorage.getItem(
                    "docslotCustomerReviews"
                ) || "[]"
            );

    } catch (error) {

        customerReviews = [];

    }


    /*
       Only show reviews belonging
       to this particular doctor.
    */

    customerReviews =
        customerReviews.filter(
            review =>
                review.doctorId === doctor.id
        );


    /*
       Customer reviews first,
       then demo reviews.
    */

    const allReviews = [
        ...customerReviews,
        ...doctorReviews
    ];


    reviewsList.innerHTML = "";


    if (allReviews.length === 0) {

        reviewsList.innerHTML = `
            <p class="no-reviews">
                No reviews yet.
            </p>
        `;

        return;

    }


    allReviews
        .slice(0, 6)
        .forEach(review => {

            const reviewElement =
                document.createElement("div");


            reviewElement.className =
                "review-item";


            const stars =
                "★".repeat(
                    Number(review.rating) || 0
                );


            reviewElement.innerHTML = `

                <div class="review-top">

                    <strong>
                        ${escapeReviewText(
                            review.name
                        )}
                    </strong>

                    <span class="review-stars">
                        ${stars}
                    </span>

                </div>

                <p class="review-text">
                    ${escapeReviewText(
                        review.text
                    )}
                </p>

                <span class="review-date">
                    ${escapeReviewText(
                        review.date || "Recently"
                    )}
                </span>

            `;


            reviewsList.appendChild(
                reviewElement
            );

        });

}


/* =========================================================
   REVIEW TEXT SAFETY
========================================================= */

function escapeReviewText(value) {

    const div =
        document.createElement("div");

    div.textContent =
        String(value ?? "");

    return div.innerHTML;

}

/* =========================================================
   CUSTOMER REVIEW SYSTEM
========================================================= */

let selectedReviewRating = 0;


/* ---------------------------------------------------------
   STAR SELECTION
--------------------------------------------------------- */

document.addEventListener(
    "click",
    function (event) {

        const star =
            event.target.closest(
                ".review-stars-input button"
            );


        if (!star) return;


        selectedReviewRating =
            Number(
                star.dataset.rating
            );


        document
            .querySelectorAll(
                ".review-stars-input button"
            )
            .forEach(button => {

                const rating =
                    Number(
                        button.dataset.rating
                    );


                button.classList.toggle(
                    "selected",
                    rating <=
                    selectedReviewRating
                );

            });

    }
);


/* ---------------------------------------------------------
   SUBMIT REVIEW
--------------------------------------------------------- */

document.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.closest(
                "#submitReview"
            )
        ) return;


        const doctorId =
            doctorModal.dataset.doctorId;


        const nameInput =
            document.getElementById(
                "reviewerName"
            );


        const textInput =
            document.getElementById(
                "reviewText"
            );


        const message =
            document.getElementById(
                "reviewSubmitMessage"
            );


        const name =
            nameInput.value.trim();


        const text =
            textInput.value.trim();


        if (!name) {

            message.textContent =
                "Please enter your name.";

            return;

        }


        if (!selectedReviewRating) {

            message.textContent =
                "Please select a rating.";

            return;

        }


        if (text.length < 5) {

            message.textContent =
                "Please write a short review.";

            return;

        }


        const newReview = {

            doctorId,

            name,

            rating:
                selectedReviewRating,

            text,

            date: "Just now"

        };


        let reviews = [];


        try {

            reviews =
                JSON.parse(
                    localStorage.getItem(
                        "docslotCustomerReviews"
                    ) || "[]"
                );

        } catch (error) {

            reviews = [];

        }


        reviews.unshift(
            newReview
        );


        /*
           Save customer review.
           localStorage persists the data
           across page reloads for this origin.
        */

        localStorage.setItem(
            "docslotCustomerReviews",
            JSON.stringify(reviews)
        );


        /*
           Clear form.
        */

        nameInput.value = "";

        textInput.value = "";

        selectedReviewRating = 0;


        document
            .querySelectorAll(
                ".review-stars-input button"
            )
            .forEach(button =>
                button.classList.remove(
                    "selected"
                )
            );


        message.textContent =
            "Review submitted successfully!";


        /*
           Refresh reviews immediately.
        */

        const doctor =
            getDoctorById(
                doctorId
            );


        if (doctor) {

            renderDoctorReviews(
                doctor
            );

        }

    }
);

/* =========================================================
   BOOK APPOINTMENT BUTTON
========================================================= */

const bookAppointmentButton =
    document.getElementById("bookAppointmentButton");

const appointmentBookingModal =
    document.getElementById("appointmentModal");

if (bookAppointmentButton) {
    bookAppointmentButton.addEventListener("click", function (event) {

        // Stop this click from reaching modal overlay
        event.stopPropagation();

        const doctorId = doctorModal.dataset.doctorId;

        if (!doctorId) {
            console.error("Doctor ID missing for appointment.");
            return;
        }

        if (!appointmentBookingModal) {
            console.error("Appointment modal not found.");
            return;
        }

        // Transfer selected doctor to appointment modal
        appointmentBookingModal.dataset.doctorId = doctorId;

        // Close doctor details modal
        closeDoctorDetails();

        // Open appointment modal
        if (typeof openAppointment === "function") {
            openAppointment();
        } else {
            console.error("openAppointment() not found.");
        }
    });
}


