document.addEventListener("DOMContentLoaded", function () {
    const btnMenu = document.querySelector("#menu-mobile-btn");

    if (btnMenu) {
        btnMenu.addEventListener("click", actionMenu);
    }

    function actionMenu() {
        const menu = document.querySelector(".menu-itens");
        if (menu) {
            if (menu.style.display === "block") closeMenu();
            else openMenu();
        }
    }

    function openMenu() {
        const menu = document.querySelector(".menu-itens");
        if (menu) {
            menu.style.display = "block";
        }
    }

    function closeMenu() {
        const menu = document.querySelector(".menu-itens");
        if (menu) {
            menu.style.display = "none";
        }
    }

    const div = document.querySelector(".menu");

    if (div) {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.contentRect.width >= 445) openMenu();
            }
        });

        resizeObserver.observe(div);
    }
});