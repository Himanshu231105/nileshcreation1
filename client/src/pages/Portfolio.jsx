import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/portfolio`)
      .then((res) => res.json())
      .then((data) => {
        setPortfolios(data);
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Portfolio</h1>
          <p className="text-xl text-gray-300">Our most memorable projects</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading portfolio...</p>
            </div>
          ) : portfolios.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No portfolio items yet</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {portfolios.map((item) => (
                <div key={item._id} className="group cursor-pointer">
                  <div
                    className="relative overflow-hidden rounded-lg h-96 bg-gray-200"
                    onClick={() => setSelectedImage(item.images[0])}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        View
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mt-4 text-primary">{item.title}</h3>
                  <p className="text-gray-600">{item.category}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-accent transition-colors"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage}
              alt="Full size"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
