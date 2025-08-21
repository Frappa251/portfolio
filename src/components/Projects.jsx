export default function Projects() {
    return (
        <section id="projects">
            <h2>Progetti</h2>
            <p>Elenco dei progetti (qui ci metti i progetti). Aggiungo qui le card</p>
            {/* Mini griglia placeholder per creare un po' di altezza e testare lo scroll */}
            <div className="projects-grid">
                <div className="project-card">Progetto 1</div>
                <div className="project-card">Progetto 2</div>
                <div className="project-card">Progetto 3</div>
            </div>
        </section>
    );
}