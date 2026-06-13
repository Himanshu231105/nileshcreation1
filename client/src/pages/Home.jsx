import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/portfolio/featured/all`)
      .then((res) => res.json())
      .then((data) => setFeatured(data.slice(0, 3)))
      .catch((err) => console.log(err));

    fetch(`${import.meta.env.VITE_API_URL}/services`)
      .then((res) => res.json())
      .then((data) => setServices(data.slice(0, 3)))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <section className="bg-primary text-secondary py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Moments Worth <span className="gold-text">Treasuring</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Professional photography capturing your most precious memories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/portfolio"
              className="btn btn-primary flex items-center justify-center gap-2"
            >
              View Portfolio <ArrowRight size={20} />
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Featured Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featured.map((item) => (
              <Link key={item._id} to={`/portfolio/${item._id}`}>
                <div className="group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.category}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lightgray py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="section-title">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all group"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-lg mb-4 group-hover:opacity-75 transition-opacity"
                />
                <h3 className="text-2xl font-bold mb-2 text-primary">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-accent">₹{service.price}</span>
                  <Link
                    to="/contact"
                    className="btn btn-primary text-sm"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to create <span className="gold-text">memories</span>?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Let's capture your beautiful moments together
          </p>
          <Link to="/contact" className="btn btn-primary inline-block">
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};
