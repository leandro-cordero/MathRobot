/* ------------------------------ SCROLL DELAY ------------------------------ */
document.addEventListener("DOMContentLoaded", function() {
    // Obtén todos los enlaces de navegación interna en la página
    const links = document.querySelectorAll("a[href^='#']");

    // Manejador de clic para cada enlace
    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Evita que el enlace funcione normalmente

            const targetId = this.getAttribute("href").substring(1); // Obtiene el ID del objetivo
            const targetElement = document.getElementById(targetId); // Encuentra el elemento de destino

            if (targetElement) {
                // Calcula la posición del elemento de destino
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY;

                // Desplaza suavemente a la posición del elemento de destino con una transición de 300ms
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });

                // Agrega la clase 'active' al enlace actual y quita 'active' de los demás enlaces
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
    const menuBtn = document.getElementById("menuBtn")
    const menu = document.getElementById("menu")
    const menuItem = document.getElementsByClassName("menu_item")
    let isMenuVisible = false

    menuBtn.addEventListener("click", function() {
        if (isMenuVisible) {
            menu.classList.add("hidden")
        } else {
            menu.classList.remove("hidden")
        }
        isMenuVisible = !isMenuVisible
    })

    // MENU & CLOSE
    menuBtn.addEventListener('click', function() {
        if (this.className == 'on') this.classList.remove('on');
        else this.classList.add('on');
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