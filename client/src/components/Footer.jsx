import { Globe, Heart, Share2, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-primary text-secondary border-t-4 border-accent">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold gold-text mb-4">Nilesh Creation</h3>
            <p className="text-gray-300">Professional photography capturing your precious moments.</p>
          </div>

          <div>
            <h3 className="text-lg font-bold gold-text mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone size={20} className="text-accent" />
                <span>+91 78220 65641</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-accent" />
                <span>nileshsonar9921@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-accent" />
                <span>Dharangaon, Jalgaon, India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold gold-text mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Globe size={24} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Heart size={24} />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Share2 size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Nilesh Creation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
