import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { SeniorModeProvider } from './context/SeniorModeContext';
import { VotingProvider } from './context/VotingContext';
import { AuthProvider } from './context/AuthContext';

import { SimulationDisclaimerBanner } from './components/common/SimulationDisclaimerBanner';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

import { HomePage } from './pages/HomePage';
import { VerificationPage } from './pages/VerificationPage';
import { EligibilityPage } from './pages/EligibilityPage';
import { ElectionInfoPage } from './pages/ElectionInfoPage';
import { BallotPage } from './pages/BallotPage';
import { ReviewPage } from './pages/ReviewPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { ResultsPage } from './pages/ResultsPage';
import { AdminPage } from './pages/AdminPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  const renderActivePage = () => {
    switch (currentTab) {
      case 'home':
        return <HomePage onNavigate={setCurrentTab} />;
      case 'verify':
        return <VerificationPage onNavigate={setCurrentTab} />;
      case 'eligibility':
        return <EligibilityPage onNavigate={setCurrentTab} />;
      case 'info':
        return <ElectionInfoPage onNavigate={setCurrentTab} />;
      case 'ballot':
        return <BallotPage onNavigate={setCurrentTab} />;
      case 'review':
        return <ReviewPage onNavigate={setCurrentTab} />;
      case 'confirmation':
        return <ConfirmationPage onNavigate={setCurrentTab} />;
      case 'results':
        return <ResultsPage />;
      case 'admin':
        return <AdminPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={setCurrentTab} />;
    }
  };

  return (
    <LanguageProvider>
      <SeniorModeProvider>
        <VotingProvider>
          <AuthProvider>
            <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#C5A059] selection:text-slate-950">
              <SimulationDisclaimerBanner />
              <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

              <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderActivePage()}
              </main>

              <Footer />
            </div>
          </AuthProvider>
        </VotingProvider>
      </SeniorModeProvider>
    </LanguageProvider>
  );
}

export default App;
