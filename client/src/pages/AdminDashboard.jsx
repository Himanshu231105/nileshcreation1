import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit2, Plus, LogOut } from 'lucide-react';

export const AdminDashboard = () => {
  const { token, login, logout } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('services');
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showPortfolioForm, setShowPortfolioForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    features: '',
    deliveryTime: '',
  });

  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    description: '',
    images: '',
    category: '',
    clientName: '',
    featured: false,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      loadData();
    }
  }, [token]);

  const loadData = async () => {
    try {
      const serviceRes = await fetch(`${import.meta.env.VITE_API_URL}/services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(await serviceRes.json());

      const portfolioRes = await fetch(`${import.meta.env.VITE_API_URL}/portfolio`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolios(await portfolioRes.json());

      const contactRes = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(await contactRes.json());
    } catch (err) {
      console.log(err);
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/services/${editingId}`
        : `${import.meta.env.VITE_API_URL}/services`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...serviceForm,
          price: parseFloat(serviceForm.price),
          features: serviceForm.features.split(',').map((f) => f.trim()),
        }),
      });

      if (response.ok) {
        loadData();
        setServiceForm({
          name: '',
          description: '',
          price: '',
          image: '',
          category: '',
          features: '',
          deliveryTime: '',
        });
        setEditingId(null);
        setShowServiceForm(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteService = async (id) => {
    if (confirm('Delete this service?')) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/services/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        loadData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handlePortfolioSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/portfolio/${editingId}`
        : `${import.meta.env.VITE_API_URL}/portfolio`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...portfolioForm,
          images: portfolioForm.images.split(',').map((i) => i.trim()),
        }),
      });

      if (response.ok) {
        loadData();
        setPortfolioForm({
          title: '',
          description: '',
          images: '',
          category: '',
          clientName: '',
          featured: false,
        });
        setEditingId(null);
        setShowPortfolioForm(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePortfolio = async (id) => {
    if (confirm('Delete this portfolio item?')) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/portfolio/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        loadData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-primary text-secondary flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-gray-800 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center gold-text">Admin Login</h2>
          {error && <div className="bg-red-500 text-white p-3 rounded mb-4">{error}</div>}

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border-2 border-gray-600 focus:border-accent outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border-2 border-gray-600 focus:border-accent outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gold-text">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="btn btn-secondary flex items-center gap-2"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8 border-b border-gray-700">
          {['services', 'portfolio', 'contacts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-accent text-accent'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'services' && (
          <div>
            <button
              onClick={() => {
                setShowServiceForm(!showServiceForm);
                setEditingId(null);
                setServiceForm({
                  name: '',
                  description: '',
                  price: '',
                  image: '',
                  category: '',
                  features: '',
                  deliveryTime: '',
                });
              }}
              className="btn btn-primary mb-6 flex items-center gap-2"
            >
              <Plus size={20} /> Add Service
            </button>

            {showServiceForm && (
              <form onSubmit={handleServiceSubmit} className="bg-gray-800 p-6 rounded-lg mb-6 space-y-4">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-accent outline-none"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-accent outline-none"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-accent outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={serviceForm.image}
                  onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-accent outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-accent outline-none"
                />
                <input
                  type="text"
                  placeholder="Features (comma separated)"
                  value={serviceForm.features}
                  onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-accent outline-none"
                />
                <input
                  type="text"
                  placeholder="Delivery Time"
                  value={serviceForm.deliveryTime}
                  onChange={(e) => setServiceForm({ ...serviceForm, deliveryTime: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-accent outline-none"
                />
                <div className="flex gap-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    {editingId ? 'Update' : 'Add'} Service
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowServiceForm(false)}
                    className="btn btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {services.map((service) => (
                <div key={service._id} className="bg-gray-800 p-6 rounded-lg flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-accent">{service.name}</h3>
                    <p className="text-gray-400">{service.description}</p>
                    <p className="text-lg mt-2">₹{service.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(service._id);
                        setServiceForm({
                          name: service.name,
                          description: service.description,
                          price: service.price,
                          image: service.image,
                          category: service.category,
                          features: service.features?.join(', ') || '',
                          deliveryTime: service.deliveryTime || '',
                        });
                        setShowServiceForm(true);
                      }}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div>
            <button
              onClick={() => {
                setShowPortfolioForm(!showPortfolioForm);
                setEditingId(null);
                setPortfolioForm({
                  title: '',
                  description: '',
                  images: '',
                  category: '',
                  clientName: '',
                  featured: false,
                });
              }}
              className="btn btn-primary mb-6 flex items-center gap-2"
            >
              <Plus size={20} /> Add Portfolio Item
            </button>

            {showPortfolioForm && (
              <form onSubmit={handlePortfolioSubmit} className="bg-gray-800 p-6 rounded-lg mb-6 space-y-4">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={portfolioForm.title}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-accent outline-none"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={portfolioForm.description}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-accent outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Image URLs (comma separated)"
                  value={portfolioForm.images}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, images: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-accent outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={portfolioForm.category}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-accent outline-none"
                />
                <input
                  type="text"
                  placeholder="Client Name"
                  value={portfolioForm.clientName}
                  onChange={(e) => setPortfolioForm({ ...portfolioForm, clientName: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-accent outline-none"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={portfolioForm.featured}
                    onChange={(e) => setPortfolioForm({ ...portfolioForm, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span>Featured</span>
                </label>
                <div className="flex gap-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    {editingId ? 'Update' : 'Add'} Portfolio Item
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPortfolioForm(false)}
                    className="btn btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-4">
              {portfolios.map((item) => (
                <div key={item._id} className="bg-gray-800 p-6 rounded-lg flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-accent">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                    <p className="text-sm mt-2 text-gray-500">Category: {item.category} | Featured: {item.featured ? 'Yes' : 'No'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(item._id);
                        setPortfolioForm({
                          title: item.title,
                          description: item.description,
                          images: item.images?.join(', ') || '',
                          category: item.category,
                          clientName: item.clientName || '',
                          featured: item.featured || false,
                        });
                        setShowPortfolioForm(true);
                      }}
                      className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDeletePortfolio(item._id)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <p className="text-gray-400">No messages yet</p>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact._id}
                  className={`p-6 rounded-lg ${contact.read ? 'bg-gray-800' : 'bg-blue-900 border-2 border-blue-500'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-accent">{contact.name}</h3>
                    <span className="text-sm text-gray-400">{new Date(contact.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm mb-2">
                    <span className="text-gray-400">Email:</span> {contact.email}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="text-gray-400">Phone:</span> {contact.phone || 'Not provided'}
                  </p>
                  <p className="text-sm mb-3 font-bold">Subject: {contact.subject}</p>
                  <p className="text-gray-300">{contact.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
