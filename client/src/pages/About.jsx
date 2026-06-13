import { Award, Camera, Heart } from 'lucide-react';

export const About = () => {
  const stats = [
    { icon: Camera, label: '500+ Projects', value: 'Completed' },
    { icon: Heart, label: '1000+ Clients', value: 'Satisfied' },
    { icon: Award, label: '15+ Years', value: 'Experience' },
  ];

  return (
    <div>
      <section className="bg-primary text-secondary py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-gray-300">Capturing life's beautiful moments</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=500&fit=crop"
                alt="Nilesh"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-primary">
                Hi, I'm <span className="gold-text">Nilesh</span>
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                With over 15 years of professional photography experience, I've had the privilege of capturing countless precious moments for families and businesses across India.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                My passion lies in creating timeless images that tell your unique story. Whether it's a wedding, corporate event, or personal portrait session, I approach every project with dedication and creativity.
              </p>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-accent font-bold">✓</span> Professional Equipment & Techniques
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-accent font-bold">✓</span> Post-Processing Excellence
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-accent font-bold">✓</span> Personalized Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lightgray py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="section-title">By The Numbers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-primary mb-2">{stat.label}</h3>
                  <p className="text-gray-600">{stat.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="section-title">My Expertise</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['Weddings', 'Corporate Events', 'Portraits', 'Fashion'].map((expertise, i) => (
              <div key={i} className="p-6 bg-primary text-secondary rounded-lg text-center">
                <h3 className="font-bold text-lg gold-text">{expertise}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
