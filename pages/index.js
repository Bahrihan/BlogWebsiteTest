import { useEffect, useState } from "react";
import Head from 'next/head';
import { db } from "../lib/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { FiPlus} from 'react-icons/fi';
import { FaLock, FaUnlock } from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaPhoneAlt } from "react-icons/fa";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Menü açılma durumu
  const [experiences, setExperiences] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [scrollLocked, setScrollLocked] = useState(true); // Scroll kilidi durumu
  const [unlocked, setUnlocked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault(); // Formspree'nin kendi sayfasına yönlendirmesini engeller
  
    const form = e.target;
    const formData = new FormData(form);
  
    try {
      const response = await fetch("https://formspree.io/f/mvgklqjg", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
  
      if (response.ok) {
        setShowSuccess(true);
        form.reset(); // 🎉 inputları sıfırla
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert("Mesaj gönderilirken hata oluştu.");
      }
    } catch (error) {
      console.error("Form gönderim hatası:", error);
      alert("Bağlantı hatası.");
    }
  };
  
  useEffect(() => {
    const handleScrollVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
  
    window.addEventListener("scroll", handleScrollVisibility);
  
    return () => window.removeEventListener("scroll", handleScrollVisibility);
  }, []);

  useEffect(() => {
    // Sayfa yenilendiğinde en başa scroll
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "experiences"));
        const expData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setExperiences(expData);
      } catch (error) {
        console.error("Firestore verileri alınamadı:", error);
      }
    };
  
    fetchExperiences();
  }, []);



  const toggleExperience = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      const yOffset = -80; // header yüksekliği varsa ayarlarsın
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    if (scrollLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [scrollLocked]);

  const handleScroll = (e, id) => {
    e.preventDefault();
    if (scrollLocked) return;
    const element = document.getElementById(id);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      const offset = window.innerHeight / 2 - element.offsetHeight / 2;
      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth',
      });
    }
  };
  
  
  return (
    <div>
      <Head>
        <title>Bahrihan Torpil</title>
        <meta name="description" content="Kişisel web sayfamda kendimi tanıtıyor, yeteneklerimi, eğitimimi ve deneyimlerimi paylaşıyorum." />
      </Head>

      <header>
        <div className="logo-box">
        <img
          src="/img/profile.jpg"
          alt="Bahrihan Torpil"
          className="profile-pic"
          onClick={() => setShowImageModal(true)}
          style={{ cursor: "pointer" }}
        />
          <h1>Bahrihan Torpil</h1>
        </div>
        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)} // Hamburger menü açma/kapama
        >
          ☰
        </button>
        <nav>
          <ul className={menuOpen ? "active" : ""}>
          {/*<li><a href="#home" onClick={(e) => handleScroll(e, 'home')}>Home</a></li>*/}
          <li><a href="#about" onClick={(e) => handleScroll(e, 'about')}>About</a></li>
          <li><a href="#education" onClick={(e) => handleScroll(e, 'education')}>Education</a></li>
          <li><a href="#skills" onClick={(e) => handleScroll(e, 'skills')}>Skills</a></li>
          <li><a href="#experience" onClick={(e) => handleScroll(e, 'experience')}>Experience</a></li>
          <li><a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contact</a></li>
          </ul>
        </nav>
      </header>
      {showImageModal && (
        <div className="image-modal" onClick={() => setShowImageModal(false)}>
          <div className="image-modal-content">
            <img src="/img/profile.jpg" alt="Bahrihan Torpil" />
          </div>
        </div>
      )}
      <div id="home" className="hero">
        <div className="home-content">
          <h1>Bahrihan Torpil</h1>
          <p className="subtitle">Data Science · Machine Learning · Software Development</p>
          <div className="scroll-down" onClick={() => {
            setScrollLocked(false);
            setUnlocked(true);
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
          }}>
            <span className="arrow">↓</span>
            <p className="scroll-text">Click Here To Unlock</p>
            <span className="lock-icon">
              {unlocked ? <FaUnlock /> : <FaLock />}
            </span>
          </div>
        </div>
      </div>

      <section id="about" data-aos="fade-up" className="about-section">
        <h2>About</h2>
        <div className="about-content">
          <div className="about-image">
            <img src="/img/profile.jpg" alt="Bahrihan Torpil" />
          </div>
          <div className="about-text">
            <p>Hello! I'm <strong>Bahrihan Torpil</strong>, a 3rd-year Computer Engineering student at Ege University.</p>
            <p>I specialize in <strong>Data Science</strong>, <strong>Machine Learning</strong>, and <strong>Software Development</strong>.</p>
            <ul>
              <li>🧠 Passionate about AI & Data</li>
              <li>💻 Experienced in C#, Java, React.js</li>
              <li>🎮 Built apps & games with Unity</li>
              <li>🗃️ Skilled in DB design & OOP</li>
            </ul>
          </div>
          <div className="about-actions">
            <a 
              href="/cv/BahrihanTorpil-CV.pdf" 
              download 
              className="cv-download"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 Download CV
            </a>

            <button className="toggle-details" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Hide Details" : "Show More"}
            </button>
          </div>

          {showMore && (
            <div className="more-about">
              <p>
                I have been actively developing modern web applications using <strong>React</strong> and <strong>Next.js</strong>. 
                I also gained hands-on experience with <strong>.NET Core</strong> and <strong>ASP.NET MVC</strong> for backend web development.
              </p>
              <p>
                My projects have involved working with databases such as <strong>MySQL</strong> and <strong>MongoDB</strong>, 
                and I've utilized <strong>Tailwind CSS</strong> to craft responsive and aesthetic front-end designs.
              </p>
              <p>
                I'm continuously expanding my knowledge in the fields of <strong>Machine Learning</strong> and <strong>Data Science</strong> through online courses, especially on Udemy.
                Currently, I'm also collaborating with my team on a comprehensive web platform project, aiming to deliver a robust, scalable and user-friendly application.
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="education" data-aos="fade-up">
        <h2>Education</h2>
        <div className="education-box">
          <div className="edu-item">
            <span className="edu-year">08.2022 – Present</span>
            <div className="edu-details">
              <h3>Computer Engineering, Faculty of Engineering</h3>
              <p><strong>Ege University</strong> – İzmir, Turkey</p>
              <p>GPA: <strong>3.07 / 4.00</strong></p>
            </div>
          </div>
          <div className="edu-item">
            <span className="edu-year">09.2016 – 06.2020</span>
            <div className="edu-details">
              <h3>Hacı Sabancı Anatolian High School</h3>
              <p><strong>Mersin, Turkey</strong></p>
              <p>Graduation Score: <strong>85.85 / 100</strong></p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" data-aos="fade-up">
        <h2>Skills</h2>
        <div className="skills-grid">
          {[
            { name: "Java", level: "Intermediate", percent: 60 },
            { name: "C#", level: "Intermediate", percent: 50 },
            { name: "Python", level: "Intermediate", percent: 70 },
            { name: "Data Science", level: "Intermediate/Advanced", percent: 75 },
            { name: "Unity", level: "Intermediate", percent: 50 },
            { name: "Machine Learning", level: "Basic", percent: 30 },
            { name: "Data Structures & Algorithms", level: "Intermediate/Advanced", percent: 70 }
          ].map((skill, index) => (
            <div className="skill" key={index}>
              <div className="skill-header">
                <span>{skill.name}</span>
                <span className="skill-level">{skill.level}</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ width: `${skill.percent}%` }}
                >
                  <span className="skill-percent">{skill.percent}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" data-aos="fade-up">
        <h2>Experience</h2>

        {experiences.length === 0 ? (
          <p style={{ textAlign: "center", color: "#964b00" }}>Yükleniyor...</p>
        ) : (
          experiences.map((exp, index) => (
            <div className="exp-box" key={exp.id}>
              <div className="exp-header" onClick={() => toggleExperience(index)}>
                <h3>{exp.title}</h3>
                <span className={`icon-box ${activeIndex === index ? "rotated" : ""}`}>
                  <FiPlus />
                </span>
              </div>
              <div className={`exp-body ${activeIndex === index ? "active" : ""}`}>
                <p>{exp.description}</p>
              </div>
            </div>
          ))
        )}
      </section>

      <section id="contact" data-aos="fade-up">
        <h2>Contact</h2>

        <div className="contact-wrapper">
          <form 
            className="contact-form"
            action="https://formspree.io/f/mvgklqjg"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required 
            />

            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              required 
            />

            <textarea 
              name="message" 
              placeholder="Your Message" 
              required
            ></textarea>

            <button type="submit" className="send-button">Send Message</button>
          </form>
          {showSuccess && (
            <div className="success-toast">
              ✓ Mesajınız başarıyla iletildi!
            </div>
          )}
        </div>
      </section>



      {isVisible && (
        <button className="scroll-top-button"
          onClick={scrollToAbout} 
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: '#964b00',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '50%',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
          }}
        >
          ↑
        </button>
      )}

      <footer className="site-footer">
        <div className="footer-content">
          <p>&copy; 2025 Bahrihan Torpil</p>
          <div className="footer-links">
            <a href="mailto:bahrihant9@gmail.com" target="_blank" rel="noopener noreferrer">
              <MdEmail /> Email
            </a>
            <a href="tel:+905530058989" target="_blank" rel="noopener noreferrer">
              <FaPhoneAlt /> Phone
            </a>
            <a href="https://www.linkedin.com/in/bahrihan-torpil-558421247/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin /> LinkedIn
            </a>
            <a href="https://github.com/Bahrihan" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
