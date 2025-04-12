import { useEffect, useState } from "react";
import Head from 'next/head';
import { db } from "../lib/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { FiPlus} from 'react-icons/fi';
import { FaLock, FaUnlock } from 'react-icons/fa';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Menü açılma durumu
  const [experiences, setExperiences] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [scrollLocked, setScrollLocked] = useState(true); // Scroll kilidi durumu
  const [unlocked, setUnlocked] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

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

      <section id="about" data-aos="fade-up">
        <h2>About</h2>
        <p>Hello, I’m Bahrihan Torpil, a 3rd-year Computer Engineering student at Ege University. I have experience in software development and programming. I am proficient in C# and Java and have worked on game and application development using Unity. Additionally, I have knowledge in database management and design, as well as object-oriented programming (OOP) analysis and design. I am also actively learning and working in the fields of Data Science and Machine Learning.</p>
      </section>

      <section id="education" data-aos="fade-up">
        <h2>Education</h2>
        <ul>
          <li>Bachelor's Degree in Computer Science - Ege University</li>
        </ul>
      </section>

      <section id="skills" data-aos="fade-up">
        <h2>Skills</h2>

        <div className="skill">
          <span>Java</span>
          <div className="skill-bar">
            <div className="skill-progress" style={{ width: "60%" }}></div>
          </div>
        </div>

        <div className="skill">
          <span>Python</span>
          <div className="skill-bar">
            <div className="skill-progress" style={{ width: "75%" }}></div>
          </div>
        </div>

        <div className="skill">
          <span>React.js</span>
          <div className="skill-bar">
            <div className="skill-progress" style={{ width: "70%" }}></div>
          </div>
        </div>

        <div className="skill">
          <span>Unity</span>
          <div className="skill-bar">
            <div className="skill-progress" style={{ width: "65%" }}></div>
          </div>
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
        <p><i className="fas fa-envelope"></i> <a href="mailto:bahrihant9@gmail.com">bahrihant9@gmail.com</a></p>
        <p><i className="fas fa-phone-alt"></i> <a href="tel:+905530058989">+90 553 005 8989</a></p>
        <p><i className="fab fa-linkedin"></i> <a href="https://www.linkedin.com/in/bahrihan-torpil-558421247/" target="_blank">LinkedIn</a></p>
        <p><i className="fab fa-github"></i> <a href="https://github.com/Bahrihan" target="_blank">GitHub</a></p>
      </section>

      {isVisible && (
        <button 
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

      <footer>
        <p>&copy; 2025 Bahrihan Torpil. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
