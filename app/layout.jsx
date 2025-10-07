import './globals.css';
import React from 'react';
import SkipLink from '../components/SkipLink.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export const metadata = {
  title: 'Web3 QA',
  description: 'Foundational knowledge base for Web3 quality assurance.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <SkipLink />
        <div id="__app-shell" className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
          <Header />
          <main id="main" className="flex-1 p-4 bg-white dark:bg-gray-900" data-test="main-content">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
