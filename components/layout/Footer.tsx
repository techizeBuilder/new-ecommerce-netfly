import { FooterAbout } from './footer/FooterAbout';
import { FooterLinks } from './footer/FooterLinks';
import { FooterContact } from './footer/FooterContact';
import { FooterNewsletter } from './footer/FooterNewsletter';
import { FooterCopyright } from './footer/FooterCopyright';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FooterAbout />
          <FooterLinks />
          <FooterContact />
          <FooterNewsletter />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
}