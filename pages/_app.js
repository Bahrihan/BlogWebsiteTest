import '../styles/globals.css'  // Global stil dosyasını dahil ediyoruz
import '@fortawesome/fontawesome-free/css/all.min.css'  // Font Awesome stil dosyasını dahil ediyoruz
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';

// Uygulama genelinde tüm sayfalar bu bileşende render edilir
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: 'ease-in-out',
      delay: 100,
      once: true
    });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;  // Default olarak bir React bileşeni dışa aktarılıyor
