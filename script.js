document.addEventListener("DOMContentLoaded", function () {
    const hero = document.getElementById("hero");
    const about = document.getElementById("about");
    const heroContent = document.querySelector(".hero-content");
    const sideNav = document.getElementById("side-nav");
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#side-nav a");

    const maxScaleScroll = 300;
    const minScale = 0.7;

    window.addEventListener("scroll", () => {
        let currentSection = "";

        const scrollY = window.scrollY;
        const aboutTop = about.offsetTop;
        
        /* SCALA PROGRESSIVA */
        const scale = Math.max(minScale, 1 - scrollY / maxScaleScroll);
        heroContent.style.transform = `scale(${scale})`;
        
        /* GESTIONE CLASSE FADING */
        if (scrollY > 50) {
            hero.classList.add("fading");
        } else {
            hero.classList.remove("fading");
        }
        
        /* RIDUZIONE PROGRESSIVA ALTEZZA HERO */
        if (scrollY > 100 && scrollY < aboutTop - 50) {
            hero.classList.add("shrinking");
            hero.classList.remove("collapsed");
        }

        /* COLLASSO FINALE */
        else if (scrollY >= aboutTop - 50) {
            hero.classList.add("collapsed");
            hero.classList.remove("shrinking");
        }
        
        /* STATO ORIGINALE */
        else {
            hero.classList.remove("shrinking");
            hero.classList.remove("collapsed");
        }
        
        /* CAMBIO COLORE CHI SONO */
        const factor = Math.min(1, scrollY / 250);
        const start = [253, 246, 237];
        const end = [10, 10, 10];
        const current = start.map((c, i) => Math.round(c + (end[i] - c) * factor));
        about.style.backgroundColor = `rgb(${current.join(",")})`;
        
        if (window.scrollY > 100) {
            sideNav.classList.add("visible");
        } else {
            sideNav.classList.remove("visible");
        }

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - sectionHeight / 2) {
                currentSection = section.getAttribute("id");
            }
        });
        
        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    });
});
