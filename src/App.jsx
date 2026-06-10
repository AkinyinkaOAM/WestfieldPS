import { BookOpen, GraduationCap, ShieldCheck, Users, Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from './assets/westfield-logo.png';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('');

  const submitEnquiry = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) throw new Error('Unable to send enquiry');

      setStatus('Thank you. Your enquiry has been received.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('Could not send enquiry. Please try again.');
    }
  };

  const navLinks = ['Home', 'About', 'Academics', 'Admissions', 'Gallery', 'Contact'];

  return (
    <div className="site">
      <header className="navbar">
        <div className="brand">
          <img src={logo} alt="Westfield Private School logo" />
          <div>
            <h1>Westfield</h1>
            <span>Private School</span>
          </div>
        </div>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{link}</a>
          ))}
        </nav>

        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section id="home" className="hero">
        <div className="hero-content">
          <p className="eyebrow">Light to Enlighten</p>
          <h2>Raising confident learners with character, discipline, and academic excellence.</h2>
          <p>
            Westfield Private School provides a polished learning environment where pupils are guided to think clearly,
            communicate confidently, and grow into responsible future leaders.
          </p>
          <div className="hero-actions">
            <a href="#admissions" className="btn primary">Apply for Admission</a>
            <a href="#contact" className="btn secondary">Contact Us</a>
          </div>
        </div>
        <div className="hero-card">
          <img src={logo} alt="Westfield crest" />
        </div>
      </section>

      <section id="about" className="section about">
        <div>
          <p className="section-label">About Us</p>
          <h2>A classy school experience built on excellence and care.</h2>
        </div>
        <p>
          We combine strong academic instruction with moral guidance, co-curricular activities, and close pupil support.
          Our goal is to produce well-rounded learners who are prepared for local and international opportunities.
        </p>
      </section>

      <section className="features">
        <Feature icon={<GraduationCap />} title="Academic Excellence" text="Structured teaching, continuous assessment, and focused support for every learner." />
        <Feature icon={<ShieldCheck />} title="Discipline & Values" text="A respectful school culture shaped by integrity, responsibility, and leadership." />
        <Feature icon={<Users />} title="Experienced Teachers" text="Professional educators committed to nurturing every child's potential." />
        <Feature icon={<BookOpen />} title="Modern Learning" text="Classroom learning supported by creativity, technology, and practical activities." />
      </section>

      <section id="academics" className="section academics">
        <p className="section-label">Academics</p>
        <h2>Learning stages designed for steady growth.</h2>
        <div className="program-grid">
          <div><h3>Early Years</h3><p>Foundational literacy, numeracy, social skills, and creative discovery.</p></div>
          <div><h3>Primary School</h3><p>Strong core subjects, confidence building, and moral development.</p></div>
          <div><h3>Junior Secondary</h3><p>Analytical thinking, leadership habits, and preparation for future study.</p></div>
        </div>
      </section>

      <section id="admissions" className="admissions">
        <div>
          <p className="section-label">Admissions</p>
          <h2>Start your child’s journey with Westfield Private School.</h2>
          <p>Submit an enquiry and our admissions office will contact you with the next steps.</p>
        </div>
        <a href="#contact" className="btn primary">Make an Enquiry</a>
      </section>

      <section id="gallery" className="section gallery">
        <p className="section-label">Gallery</p>
        <h2>School life at Westfield.</h2>
        <div className="gallery-grid">
          <div>Classroom</div>
          <div>Library</div>
          <div>Sports</div>
          <div>Events</div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="contact-info">
          <p className="section-label">Contact</p>
          <h2>Speak with our admissions team.</h2>
          <p><MapPin size={18} /> 
          - 111, Awolowo way along Navy School Ota, Ogun State. <br />
          - 13, Osuketedo street, Afobaje Area, Ota, Ogun State.
          </p>
          <p><Phone size={18} /> +234 802 813 1485</p>
          <p><Mail size={18} /> info@westfieldprivateschool.com</p>
        </div>

        <form className="contact-form" onSubmit={submitEnquiry}>
          <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <textarea placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
          <button className="btn primary" type="submit">Send Enquiry</button>
          {status && <small>{status}</small>}
        </form>
      </section>

      <footer>
        <img src={logo} alt="Westfield logo" />
        <p>© {new Date().getFullYear()} Westfield Private School. All rights reserved.</p>
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export default App;
