import { useEffect } from 'react';

export function useScrollEffects() {
    useEffect(() => {
        const hero       = document.getElementById('hero');
        const about      = document.getElementById('about');
        const sideNav    = document.getElementById('side-nav');
        const heroContent = hero?.querySelector('.hero-content');
        const sections   = document.querySelectorAll('section');
        const navLinks   = sideNav?.querySelectorAll('a') ?? [];

        navLinks.forEach(a => {
            a.addEventListener('click', (e) => {
                const href = a.getAttribute('href');
                if (href?.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        const maxScaleScroll = 300;
        const minScale       = 0.7;

        let collapsed = false;
        let aboutTop0 = null;

        function measureAboutTop() {
            if (!about) return;

            //se la hero è collassata, ovvio che sei coglione, la baseline deve includere
            //l'altezza della hero aperta, altrimenti ritorna negativa
            const raw = about.offsetTop;
            const heroOpenHeight = window.innerHeight;
            aboutTop0 = collapsed ? raw + heroOpenHeight : raw;
        }
        
        measureAboutTop();
        window.addEventListener('resize', measureAboutTop)

        function onScroll() {
            const y        = window.scrollY;
            
            //la hero si riapre anche se avevo ripristinato lo scroll e baseline era sbagliata
            if (collapsed && y < 120 && hero) {
                hero.classList.remove('collapsed');
                collapsed = false;
                measureAboutTop();
            }

            /* se la baseline non è impostata, fra impostala ora e USALA */
            if (about && aboutTop0 === null) aboutTop0 = about.offsetTop;
            const aboutTop = (aboutTop0 !== null) ? aboutTop0 : Infinity;

            /* -- scala progressiva titolo Hero -- */
            if (heroContent) {
                const scale = Math.max(minScale, 1 - y / maxScaleScroll);
                heroContent.style.transform = `scale(${scale})`;
            }

            /* -- classi Hero (fading / shrinking) -- */
            if (hero) {
                hero.classList.toggle('fading',    y > 50);
                hero.classList.toggle('shrinking', y > 100 && y < aboutTop - 50);
            }

            if (about && hero) {
                const collapseAt = aboutTop - 50;
                const expandAt = aboutTop - 250;

                if (!collapsed && y >= collapseAt) {
                    hero.classList.add('collapsed');
                    collapsed = true;
                }
                if (collapsed && y < expandAt) {
                    hero.classList.remove('collapsed');
                    collapsed = false;
                    measureAboutTop();
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
        onScroll(); // stato iniziale

        return () => {
            navLinks.forEach(a => {
                a.replaceWith(a.cloneNode(true)); //rimuove eventuali listener
            });
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', measureAboutTop);
        };
    }, []);
}
