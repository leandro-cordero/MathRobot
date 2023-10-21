/* ------------------------------ SCROLL DELAY ------------------------------ */
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("a[href^='#']");

    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // EVITA REFRESCAR

            // OBTIENE ID Y  ELEMENTO OBJETIVO
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // CALCULA DISTANCIA AL OBJETIVO
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;

                // DESPLAZA SMOOTH
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });

                // AGREGA / QUITA CLASE 'active'
                links.forEach(l => l.classList.remove("active"));
                this.classList.add("active");
            }
        });
    });
});
/* ------------------------------ SCROLL DELAY ------------------------------ */


/* ------------------------------ TOGGLE ------------------------------ */
document.addEventListener("DOMContentLoaded", function() {
    // MENU DESPLEGABLE
    const menuBtnSection = document.getElementById("SectionMenuBtn")
    const menuBtn = document.getElementById("menuBtn")
    const menu = document.getElementById("menu")
    const header = document.getElementById("header")
    const main = document.getElementById("main")

    menuBtn.addEventListener("click", function() {
        if (menu.className == 'hidden') {
            menu.classList.remove("hidden")
        } else {
            menu.classList.add("hidden")
        }
    })
    // MENU & CLOSE
    menuBtn.addEventListener('click', function() {
        if (this.className == 'on') this.classList.remove('on');
        else this.classList.add('on');
    });
    // MENU & HEADER BACKGROUND
    menuBtn.addEventListener('click', function() {
        if (menuBtnSection.className == 'blur') menuBtnSection.classList.remove('blur');
        else menuBtnSection.classList.add('blur');
    });    
    // CLOSE: CLICK FUERA
    main.addEventListener('click', function() {
        if (menu.className != 'hidden') menuBtnSection.classList.remove('blur') & menuBtn.classList.remove('on') & menu.classList.add("hidden");
    });
    
    // MODAL DESCUENTO
    const openModalBtn  = document.getElementById("modal-open")
    const closeModalBtn  = document.getElementById("modal-close")
    const modal = document.getElementById("modal-discount")

    openModalBtn.addEventListener("click", function(e) {
        e.preventDefault();
        modal.style.display = "flex";
    });

    closeModalBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });
})
/* ------------------------------ TOGGLE ------------------------------ */