import { Mail, Phone, MapPin } from 'lucide-react';

const contactInfo = [
  { icon: MapPin, text: '123 Shopping Street, NY 10001' },
  { icon: Phone, text: '+1 234 567 8900' },
  { icon: Mail, text: 'support@shopnow.com' },
];

export function FooterContact() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Contact Info</h3>
      <ul className="space-y-2">
        {contactInfo.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center space-x-2">
            <Icon className="h-5 w-5" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}