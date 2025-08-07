import { useEffect } from 'react';

export function useScrollEffects() {
    useEffect(() => {
        const hero       = document.getElementById('hero');
        const about      = document.getElementById('about');
        const sideNav    = document.getElementById('side-nav');
        const heroContent = hero?.querySelector('.hero-content');
        const sections   = document.querySelectorAll('section');
        const navLinks   = sideNav?.querySelectorAll('a') ?? [];

        const maxScaleScroll = 300;
        const minScale       = 0.7;

        function onScroll() {
            const y        = window.scrollY;
            const aboutTop = about ? about.offsetTop : Infinity;

            /* -- scala progressiva titolo Hero -- */
            if (heroContent) {
                const scale = Math.max(minScale, 1 - y / maxScaleScroll);
                heroContent.style.transform = `scale(${scale})`;
            }

            /* -- classi Hero (fading / shrinking / collapsed) -- */
            if (hero) {
                hero.classList.toggle('fading',    y > 50);
                hero.classList.toggle('shrinking', y > 100 && y < aboutTop - 50);

                /* gestione collasso con isteresi */
                if (!window.__heroCollapsed) window.__heroCollapsed = false;   // flag globale
                const collapseAt = aboutTop - 50;   // soglia in discesa
                const expandAt   = aboutTop - 250;  // soglia in risalita (200 px sopra)

                if (!window.__heroCollapsed && y >= collapseAt) {
                    hero.classList.add('collapsed');
                    window.__heroCollapsed = true;
                }
        
                if (window.__heroCollapsed && y < expandAt) {
                hero.classList.remove('collapsed');
                window.__heroCollapsed = false;
                }
            }

            /* -- background dinamico “About” -- */
            if (about) {
                const f = Math.min(1, y / 250);
                const start = [253, 246, 237];
                const end   = [ 10,  10,  10];
                const rgb   = start.map((c, i) => Math.round(c + (end[i] - c) * f));
                about.style.backgroundColor = `rgb(${rgb.join(',')})`;
            }

            /* -- side-nav visibile o meno -- */
            if (sideNav) sideNav.classList.toggle('visible', y > 100);

            /* -- link attivo nella side-nav -- */
            let current = '';
            sections.forEach(sec => {
                if (y >= sec.offsetTop - sec.offsetHeight / 2) current = sec.id;
            });
            navLinks.forEach(a =>
                a.classList.toggle('active', a.getAttribute('href')?.includes(current))
            );
        }

        window.addEventListener('scroll', onScroll);
        /* prima invocazione per stato iniziale */
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);
}
