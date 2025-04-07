import '../styles/globals.css'  // Global stil dosyasını dahil ediyoruz

// Uygulama genelinde tüm sayfalar bu bileşende render edilir
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;  // Sayfa bileşeni burada render ediliyor
}

export default MyApp;  // Default olarak bir React bileşeni dışa aktarılıyor
