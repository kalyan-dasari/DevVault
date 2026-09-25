import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { VaultProvider } from './context/VaultContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToHash } from './components/ScrollToHash';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { MyVaultPage } from './pages/MyVaultPage';
import { SocialImportPage } from './pages/SocialImportPage';
import { ContributePage } from './pages/ContributePage';
import { OpenSourcePage } from './pages/OpenSourcePage';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <VaultProvider>
          <BrowserRouter>
            <ScrollToHash />
            <div className="flex flex-col min-h-screen bg-[#0b0f17] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 antialiased">
              <Navbar />

              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/resource/:slug" element={<ResourceDetailPage />} />
                  <Route path="/my-vault" element={<MyVaultPage />} />
                  <Route path="/social-import" element={<SocialImportPage />} />
                  <Route path="/contribute" element={<ContributePage />} />
                  <Route path="/open-source" element={<OpenSourcePage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </BrowserRouter>
        </VaultProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
