/* =========================================================
   DOCSLOT - UNIFIED NAVBAR CONTROLLER
   Handles hamburger toggle, keyboard events, outside clicks
========================================================= */

(function () {
    "use strict";

    function initNavbar() {
        const header = document.querySelector(".site-header");
        const menuToggle = document.querySelector(".menu-toggle");
        const mainNav = document.querySelector(".main-nav");

        if (!menuToggle || !mainNav) {
            return;
        }

        // Create or get overlay element
        let overlay = document.querySelector(".nav-overlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.className = "nav-overlay";
            overlay.setAttribute("aria-hidden", "true");
            document.body.appendChild(overlay);
        }

        function openMenu() {
            menuToggle.classList.add("active");
            mainNav.classList.add("active");
            overlay.classList.add("active");
            menuToggle.setAttribute("aria-expanded", "true");
            document.body.style.overflow = "hidden";
        }

        function closeMenu() {
            menuToggle.classList.remove("active");
            mainNav.classList.remove("active");
            overlay.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        }

        function toggleMenu() {
            const isOpen = mainNav.classList.contains("active");
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        // Toggle click
        menuToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleMenu();
        });

        // Click on overlay closes menu
        overlay.addEventListener("click", function () {
            closeMenu();
        });

        // Close when clicking nav links
        mainNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                closeMenu();
            });
        });

        // Close on Escape key
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && mainNav.classList.contains("active")) {
                closeMenu();
                menuToggle.focus();
            }
        });

        // Close if window resized to desktop
        window.addEventListener("resize", function () {
            if (window.innerWidth > 850 && mainNav.classList.contains("active")) {
                closeMenu();
            }
        });

        // Optional scroll shadow on header
        if (header) {
            window.addEventListener("scroll", function () {
                if (window.scrollY > 20) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }
            }, { passive: true });
        }
    }

    function initAiNavbar() {
        const aiToggle = document.getElementById("aiNavToggle");
        const aiDrawer = document.getElementById("aiNavDrawer");

        if (!aiToggle || !aiDrawer) {
            return;
        }

        function toggleAiDrawer() {
            const isOpen = aiDrawer.classList.contains("active");
            if (isOpen) {
                aiDrawer.classList.remove("active");
                aiToggle.classList.remove("active");
                aiToggle.setAttribute("aria-expanded", "false");
            } else {
                aiDrawer.classList.add("active");
                aiToggle.classList.add("active");
                aiToggle.setAttribute("aria-expanded", "true");
            }
        }

        aiToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleAiDrawer();
        });

        document.addEventListener("click", function (event) {
            if (!aiDrawer.contains(event.target) && !aiToggle.contains(event.target)) {
                aiDrawer.classList.remove("active");
                aiToggle.classList.remove("active");
                aiToggle.setAttribute("aria-expanded", "false");
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && aiDrawer.classList.contains("active")) {
                aiDrawer.classList.remove("active");
                aiToggle.classList.remove("active");
                aiToggle.setAttribute("aria-expanded", "false");
                aiToggle.focus();
            }
        });
    }

    function init() {
        initNavbar();
        initAiNavbar();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
