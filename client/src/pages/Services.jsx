import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <section className="bg-primary text-secondary py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-300">Professional photography tailored to your needs</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading services...</p>
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No services available yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="border-2 border-accent p-8 rounded-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-64 object-cover rounded-lg mb-6"
                  />
                  <h3 className="text-3xl font-bold mb-2 text-primary">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  {service.features && service.features.length > 0 && (
                    <div className="mb-6 space-y-2">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check size={20} className="text-accent" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-600 text-sm">Starting from</p>
                      <p className="text-4xl font-bold text-accent">₹{service.price}</p>
                    </div>
                    {service.deliveryTime && (
                      <p className="text-sm text-gray-600">{service.deliveryTime}</p>
                    )}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Link
                      to={`/checkout/${service._id}`}
                      className="btn btn-primary"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
