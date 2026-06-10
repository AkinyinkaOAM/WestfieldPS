import {
  Award, BookOpen, CalendarDays, CheckCircle, ChevronRight, GraduationCap,
  HeartHandshake, Mail, MapPin, Menu, Phone, ShieldCheck, Star, Users, X
} from 'lucide-react';
import { useState } from 'react';
import logo from './assets/westfield-logo.png';
import { galleryItems, news, programmes, values } from './data/siteData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [form, setForm] = useState({ parentName: '', email: '', phone: '', childName: '', classLevel: '', message: '' });
  const [status, setStatus] = useState('');

  const navLinks = ['Home', 'About', 'Academics', 'Admissions', 'News', 'Gallery', 'Contact'];

  const submitApplication = async (e) => {
    e.preventDefault();
    setStatus('Submitting application...');
    try {
      const response = await fetch(`${API_URL}/api/admissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('Application received. Our admissions team will contact you.');
      setForm({ parentName: '', email: '', phone: '', childName: '', classLevel: '', message: '' });
    } catch {
      setStatus('Could not submit application. Please try again.');
    }
  };

  return (
    <div className="site">
      <header className="topbar">
        <span><Phone size={15} /> +234 802 813 1484</span>
        <span><Mail size={15} /> info@westfieldprivateschool.com</span>
        <span><MapPin size={15} /> - 111, Awolowo way along Navy School Ota, Ogun State.
        - 13, Osuketedo Street, Afobaje Area, Ota, Ogun State.
        </span>
      </header>

      <nav className="navbar">
        <a className="brand" href="#home">
          <img src={logo} alt="Westfield Private School logo" />
          <div><strong>Westfield</strong><span>Private School</span></div>
        </a>

        <div className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{link}</a>
          ))}
        </div>

        <button className="portal-btn" onClick={() => setPortalOpen(true)}>Portal Login</button>
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <main>
        <section id="home" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Light to Enlighten</p>
            <h1>Classy education for confident, disciplined, and future-ready learners.</h1>
            <p>Westfield Private School blends academic excellence, character development, modern learning, and a caring school culture for children who are prepared to lead.</p>
            <div className="hero-actions">
              <a className="btn primary" href="#admissions">Begin Admission</a>
              <a className="btn secondary" href="#about">Explore School</a>
            </div>
          </div>

          <div className="hero-panel">
            <img src={logo} alt="Westfield school crest" />
            <div className="hero-badge"><Award /><span>Excellence • Discipline • Leadership</span></div>
          </div>
        </section>

        <section className="stats">
          <Stat value="3" label="Learning Stages" />
          <Stat value="6" label="Core Values" />
          <Stat value="100%" label="Child-focused Learning" />
          <Stat value="24/7" label="Admissions Enquiry" />
        </section>

        <section id="about" className="section about">
          <div>
            <p className="section-label">Headteacher's Welcome</p>
            <h2>Where learning is structured, values are visible, and every child matters.</h2>
          </div>
          <div className="content-card">
            <p>At Westfield Private School, education develops the mind, character, confidence, and responsibility of every learner.</p>
            <p>We work closely with parents to create a calm, ambitious, and supportive environment where children build a strong foundation for the future.</p>
          </div>
        </section>

        <section className="why">
          <Feature icon={<GraduationCap />} title="Strong Academics" text="Structured lessons, assessment tracking, reading culture, and learner support." />
          <Feature icon={<ShieldCheck />} title="Discipline & Values" text="A respectful school environment built on integrity, responsibility, and leadership." />
          <Feature icon={<Users />} title="Parent Partnership" text="Open communication with parents and clear admissions support." />
          <Feature icon={<BookOpen />} title="Modern Learning" text="Technology-aware teaching, creativity, practical activities, and confidence-building." />
        </section>

        <section id="academics" className="section academics">
          <p className="section-label">Academics</p>
          <div className="section-heading">
            <h2>Programmes designed for steady academic and personal growth.</h2>
            <p>Our curriculum structure supports early development, primary mastery, and secondary readiness.</p>
          </div>

          <div className="programme-grid">
            {programmes.map((item) => (
              <article key={item.title}>
                <Star />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <a href="#admissions">Apply now <ChevronRight size={16} /></a>
              </article>
            ))}
          </div>
        </section>

        <section className="values-section">
          <p className="section-label">Our Core Values</p>
          <h2>What we teach beyond the classroom.</h2>
          <div className="value-grid">
            {values.map((value) => <span key={value}><CheckCircle size={18} /> {value}</span>)}
          </div>
        </section>

        <section id="admissions" className="section admissions">
          <div className="admission-copy">
            <p className="section-label">Admissions</p>
            <h2>Apply for admission or request a school visit.</h2>
            <p>Complete the application form and our admissions team will follow up with entry requirements, school fees, assessment schedule, and available class placement.</p>
            <div className="admission-steps">
              <span>1. Submit enquiry</span>
              <span>2. School visit / assessment</span>
              <span>3. Admission confirmation</span>
            </div>
          </div>

          <form className="admission-form" onSubmit={submitApplication}>
            <input placeholder="Parent / Guardian name" value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} required />
            <input type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
            <input placeholder="Child's name" value={form.childName} onChange={(e) => setForm({ ...form, childName: e.target.value })} required />
            <select value={form.classLevel} onChange={(e) => setForm({ ...form, classLevel: e.target.value })} required>
              <option value="">Select class level</option>
              <option>Early Years</option>
              <option>Primary School</option>
              <option>Junior Secondary</option>
            </select>
            <textarea placeholder="Message / special note" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}></textarea>
            <button className="btn primary" type="submit">Submit Application</button>
            {status && <small>{status}</small>}
          </form>
        </section>

        <section id="news" className="section news-section">
          <p className="section-label">News & Events</p>
          <div className="section-heading"><h2>Latest school updates.</h2><p>Keep parents informed with announcements, events, and academic activities.</p></div>
          <div className="news-grid">
            {news.map((item) => (
              <article key={item.title}><CalendarDays /><span>{item.date}</span><h3>{item.title}</h3><p>{item.text}</p></article>
            ))}
          </div>
        </section>

        <section id="gallery" className="section gallery">
          <p className="section-label">Gallery</p>
          <h2>Life at Westfield Private School.</h2>
          <div className="gallery-grid">{galleryItems.map((item) => <div key={item}>{item}</div>)}</div>
        </section>

        <section id="contact" className="section contact">
          <div>
            <p className="section-label">Contact</p>
            <h2>Speak with our admissions office.</h2>
            <div className="contact-list">
              <p><Phone /> +234 802 813 1484</p>
              <p><Mail /> info@westfieldprivateschool.com</p>
              <p><MapPin /> 
              - 111, Awolowo way along Navy School Ota, Ogun State. <br />
              - 13, Osuketedo Street, Afobaje Area, Ota, Ogun State.
              </p>
            </div>
          </div>

          <div className="map-card">
            <HeartHandshake size={52} />
            <h3>Book a school tour</h3>
            <p>Replace this box with Google Maps when the final school address is ready.</p>
            <a className="btn primary" href="#admissions">Book Visit</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <img src={logo} alt="Westfield logo" />
          <div><h3>Westfield Private School</h3><p>Light to Enlighten</p></div>
        </div>
        <p>© {new Date().getFullYear()} Westfield Private School. All rights reserved.</p>
      </footer>

      {portalOpen && (
        <div className="modal">
          <div className="modal-card">
            <button className="close-btn" onClick={() => setPortalOpen(false)}><X /></button>
            <img src={logo} alt="Westfield logo" />
            <h2>School Portal</h2>
            <p>This portal section is ready for future parent, student, teacher, and admin login integration.</p>
            <div className="portal-options">
              <button>Parent Login</button><button>Student Login</button><button>Staff Login</button><button>Admin Login</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Feature({ icon, title, text }) {
  return <article className="feature"><div>{icon}</div><h3>{title}</h3><p>{text}</p></article>;
}

function Stat({ value, label }) {
  return <div><strong>{value}</strong><span>{label}</span></div>;
}
