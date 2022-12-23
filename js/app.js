/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const pageSections = document.querySelectorAll("section");
const navbar = document.getElementById("navbar__list");
const activeMenuClass = "active-menu";
const menuLinkClass = "menu__link";
const sectionActiveClass = "your-active-class";
const navIdPrefix = "nav_";

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * @description Sets the styling of the active menu link in the navigation based on the input section
 * Removes other active-classes from menu links
 * @param section - section to be set active
 */
function setActiveMenuLink(section) {
    const allNavEntries = document.getElementsByClassName(menuLinkClass);
    for (const navEntry of allNavEntries) {
        navEntry.classList.remove(activeMenuClass);
    }
    const activeNavEntry = document.getElementById(navIdPrefix + section.id);
    activeNavEntry.classList.add(activeMenuClass);
}

/**
 * @description Sets the styling of the active section based on the input section
 * Removes other active-classes from other sections.
 * @param section - section to be set active
 */
function setActiveSection(section) {
    for (const pageSection of pageSections) {
        pageSection.classList.remove(sectionActiveClass);
    }
    section.classList.add(sectionActiveClass);
}

/**
 * @description The margin-top of the main content depends on the size of the navigation. Since the navigation can have a dynamic size, the margin of the main content must be changed depending on the height of the navigation. That way the content always starts below the navigation.
 */
function setMarginOfMainContent() {
    const mainContent = document.querySelector("main");
    mainContent.style.marginTop = navbar.getBoundingClientRect().height + 10;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */


// build the nav
/**
 * @description Builds the navigation bases on all sections of the page. Creates <li> element in the navigation for every section found.
 */
function buildNav() {
    //using documentFragment for efficient rendering of the new list-elements
    const vdom = document.createDocumentFragment();
    for (let section of pageSections) {
        const navEntry = document.createElement("li");
        navEntry.innerHTML = `${section.dataset.nav}`;
        navEntry.classList.add(menuLinkClass);
        navEntry.id = navIdPrefix + section.id;
        navEntry.dataset.nav = section.id;
        vdom.appendChild(navEntry);
    }
    navbar.append(vdom);
    setMarginOfMainContent();
    //after constructing the navbar, we can calculate the active section
    setActivePageSection();
}


// Add class "active" to section when near top of viewport
/**
 * @description Sets active classes to the page section and the menu link based on the position of the section.
 * The section is considered active, when more than half of it is covering the viewable screen.
 */
function setActivePageSection() {
    // this gives us the size of halfOfTheScreen in pixels
    const halfOfTheScreen = window.innerHeight / 2;
    for (let section of pageSections) {
        //Here we take the bottom param of the section which gives us the y-coordinate of the end of the section
        const visibleSectionContent = section.getBoundingClientRect().bottom;
        // if the visible content is below the half of the screen then the section is considered active
        // since the section are in order we need to stop after the first section to be considered active
        if (visibleSectionContent >= halfOfTheScreen) {
            setActiveMenuLink(section);
            setActiveSection(section);
            break;
        }
    }
}

// Scroll to anchor ID using scrollTO event
/**
 * @description Based on the scroll event-handler, this function takes an event and uses its target to scroll to it.
 * To make it more readable the height of the navigation is taken into consideration the scroll action.
 * @param event - event that contains the target to scroll to
 */
function scrollToSection(event) {
    event.preventDefault();
    const navbarHeight = navbar.getBoundingClientRect().height;
    const targetSection = document.getElementById(event.target.dataset.nav);
    window.scrollTo({top: targetSection.offsetTop - navbarHeight, behavior: "smooth"});
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener("DOMContentLoaded", buildNav);
// Scroll to section on link click
navbar.addEventListener("click", scrollToSection);
// Set sections as active
document.addEventListener("scroll", setActivePageSection);


