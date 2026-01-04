import Header from './components/Header';
import Hero from './components/Hero';
import TrustSignals from './components/TrustSignals';
import PricingTransparency from './components/PricingTransparency';
import PrintCalculatorPlaceholder from './components/PrintCalculatorPlaceholder';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <TrustSignals />
      <PricingTransparency />
      <PrintCalculatorPlaceholder />
      <Footer />
    </div>
  );
}

export default App;
