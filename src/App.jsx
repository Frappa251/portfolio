import Hero from './components/Hero';
import SideNav from './components/SideNav';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { useScrollEffects } from './hooks/useScrollEffects';

function App() {
  useScrollEffects();
  return (
    <>
      <Hero />
      <SideNav />
      <About />
      <Projects />
      <Contact />
      {/* Altri componenti: About, Projects, Contact, ecc. */}
    </>
  );
}

export default App;
