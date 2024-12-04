import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FooterAbout() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">About ShopNow</h3>
      <p className="text-sm">
        Your one-stop destination for all your shopping needs. Quality products, great prices, and excellent customer service.
      </p>
      <div className="flex space-x-4">
        {[
          { icon: Facebook, href: 'https://facebook.com' },
          { icon: Twitter, href: 'https://twitter.com' },
          { icon: Instagram, href: 'https://instagram.com' },
          { icon: Youtube, href: 'https://youtube.com' },
        ].map(({ icon: Icon, href }) => (
          <Link key={href} href={href}>
            <Button variant="ghost" size="icon" className="hover:text-white">
              <Icon className="h-5 w-5" />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}