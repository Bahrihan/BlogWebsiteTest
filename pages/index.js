import { useEffect, useState } from "react";
import Head from 'next/head';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Menü açılma durumu

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Head>
        <title>Bahrihan Torpil</title>
        <meta name="description" content="Kişisel web sayfamda kendimi tanıtıyor, yeteneklerimi, eğitimimi ve deneyimlerimi paylaşıyorum." />
      </Head>

      <header>
        <h1>Bahrihan Torpil</h1>
        <button 
          className="menu-toggle" 
          onClick={() => setMenuOpen(!menuOpen)} // Hamburger menü açma/kapama
        >
          ☰
        </button>
        <nav>
          <ul className={menuOpen ? "active" : ""}>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section id="home">
        <p style={{ fontWeight: 'bold', fontSize: '2rem', color: '#cb8d70' }}>Bahrihan Torpil</p>
        <p style={{ display: 'inline-block', marginBottom: '10px', borderBottom: '2px solid #cb8d70', paddingBottom: '2px' }}>
          Data Science | Machine Learning | Software Development
        </p>
      </section>

      <section id="about">
        <h2>About</h2>
        <p>Hello, I’m Bahrihan Torpil, a 3rd-year Computer Engineering student at Ege University. I have experience in software development and programming. I am proficient in C# and Java and have worked on game and application development using Unity. Additionally, I have knowledge in database management and design, as well as object-oriented programming (OOP) analysis and design. I am also actively learning and working in the fields of Data Science and Machine Learning.</p>
      </section>

      <section id="education">
        <h2>Education</h2>
        <ul>
          <li>Bachelor's Degree in Computer Science - Ege University</li>
        </ul>
      </section>

      <section id="skills">
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


      <section id="experience">
        <h2>Experience</h2>
        <p>Bir süre çalıştığım projeler ve iş deneyimlerimi buraya ekleyeceğiz.</p>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p><i className="fas fa-envelope"></i> <a href="mailto:bahrihant9@gmail.com">bahrihant9@gmail.com</a></p>
        <p><i className="fas fa-phone-alt"></i> <a href="tel:+905530058989">+90 553 005 8989</a></p>
        <p><i className="fab fa-linkedin"></i> <a href="https://www.linkedin.com/in/bahrihan-torpil-558421247/" target="_blank">LinkedIn</a></p>
        <p><i className="fab fa-github"></i> <a href="https://github.com/Bahrihan" target="_blank">GitHub</a></p>
      </section>

      {isVisible && (
        <button 
          onClick={scrollToTop} 
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
