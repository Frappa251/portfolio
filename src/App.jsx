import Hero from './components/Hero';
import SideNav from './components/SideNav';
import { useScrollEffects } from './hooks/useScrollEffects';
import About from './components/About';

function App() {
  useScrollEffects();
  return (
    <>
      <Hero />
      <SideNav />
      <About />
      {/* Altri componenti: About, Projects, Contact, ecc. */}
    </>
  );
}

export default App;
