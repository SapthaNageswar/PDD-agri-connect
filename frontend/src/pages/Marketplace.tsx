import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, MapPin, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Input, Button, Badge } from '../components/ui';
import { mockProducts } from '../data/mock';
import { useAuth } from '../lib/auth';
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export const Marketplace = () => {
  const { role } = useAuth();
  // product data (mutable)
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let settled = false;

    const unsub = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        settled = true;
        const data = snapshot.docs.map(doc => {
          const d = doc.data();
          return {
            id: doc.id,
            uid: d.uid,
            sellerUid: d.sellerUid,
            name: d.name ?? '',
            category: d.category ?? '',
            price: d.price ?? 0,
            unit: d.unit ?? '',
            rating: d.rating ?? 0,
            reviews: d.reviews ?? 0,
            image: d.image ?? '',
            seller: d.seller ?? '',
            location: d.location ?? '',
          };
        });
        setProducts([...mockProducts, ...data]);
        setLoading(false);
      },
      (error) => {
        // Firestore rules not yet deployed or network unavailable – fall back
        // to mock data silently so the marketplace still works.
        console.warn('Firestore unavailable, using local mock data:', error.message);
        if (!settled) {
          setProducts([...mockProducts]);
          setLoading(false);
        }
      }
    );

    return () => unsub();
  }, []);


  // UI state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showUpload, setShowUpload] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('Grains');
  const [newPrice, setNewPrice] = useState('');
  const [newUnit, setNewUnit] = useState('Quintal');
  const [newImage, setNewImage] = useState('');
  const [newLocation, setNewLocation] = useState('');



  // Upload modal handlers
  const openUpload = () => setShowUpload(true);
  const closeUpload = () => {
    setShowUpload(false);
    // reset fields
    setNewName('');
    setNewCategory('Grains');
    setNewPrice('');
    setNewUnit('Quintal');
    setNewImage('');
    setNewLocation('');
  };
  const saveUpload = async () => {
    if (!newName || !newPrice || !newImage || !newLocation) {
      alert('Please fill all required fields');
      return;
    }
    const currentUser = auth.currentUser;
    const newProduct = {
      id: Date.now().toString(),
      uid: currentUser?.uid || '',
      sellerUid: currentUser?.uid || '',
      name: newName,
      category: newCategory,
      price: parseFloat(newPrice),
      unit: newUnit,
      rating: 4.5,
      reviews: 0,
      image: newImage,
      seller: currentUser?.displayName || 'Your Farm',
      location: newLocation,
      createdAt: new Date().toISOString()
    };
    // Update local state
    setProducts(prev => [...prev, newProduct]);
    // Persist to Firestore
    try {
      await addDoc(collection(db, 'products'), newProduct);
      console.log('Product uploaded to Firestore', newProduct.id);
    } catch (e) {
      console.error('Failed to upload product', e);
    }
    closeUpload();
  };

  const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Seeds', 'Fertilizers'];

  const filteredProducts = products.filter(p =>
    (category === 'All' || p.category === category) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-20">Loading marketplace...</div>;
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-earth-900">
            {role === 'admin' ? 'Market Monitor' : 'Marketplace'}
          </h1>
          <p className="text-earth-600">
            {role === 'farmer' ? 'Upload your crops and set prices.' : role === 'admin' ? 'Monitor all active listings on the platform.' : 'Buy agricultural products directly.'}
          </p>
        </div>
        {role === 'farmer' && (
          <Button className="shrink-0 gap-2" onClick={openUpload}>
            <Plus className="h-4 w-4" /> Upload Crop
          </Button>
        )}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-earth-400" />
          <Input
            placeholder="Search products, seeds, fertilizers..."
            className="pl-10"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${category === cat ? 'bg-agri-700 text-white' : 'bg-white border border-earth-200 text-earth-700 hover:bg-earth-50'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-2xl border border-earth-200 overflow-hidden hover:shadow-lg transition-all duration-300">
            <Link to={`/marketplace/${product.id}`} className="group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <Badge className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-earth-900 border-none shadow-sm">
                  {product.category}
                </Badge>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-earth-900 text-lg leading-tight group-hover:text-agri-700 transition-colors">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-sm text-earth-500 mb-4">
                  <MapPin className="h-4 w-4" /> {product.location}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-xl font-bold text-earth-900">₹{product.price}</p>
                    <p className="text-xs text-earth-500">per {product.unit}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-amber-900">{product.rating}</span>
                  </div>
                </div>
              </div>
            </Link>

          </div>
        ))}
      </div>

      {/* No results fallback */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-earth-500 text-lg">No products found matching your criteria.</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearch(''); setCategory('All'); }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Upload Crop Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Upload New Crop</h2>
            <div className="space-y-3">
              <input type="text" placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} className="w-full border rounded px-2 py-1" />
              <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full border rounded px-2 py-1">
                {['Grains', 'Vegetables', 'Fruits', 'Seeds', 'Fertilizers'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input type="text" placeholder="Price" value={newPrice} onChange={e => setNewPrice(e.target.value)} className="w-full border rounded px-2 py-1" />
              <input type="text" placeholder="Unit" value={newUnit} onChange={e => setNewUnit(e.target.value)} className="w-full border rounded px-2 py-1" />
              <input type="text" placeholder="Image URL" value={newImage} onChange={e => setNewImage(e.target.value)} className="w-full border rounded px-2 py-1" />
              <input type="text" placeholder="Location" value={newLocation} onChange={e => setNewLocation(e.target.value)} className="w-full border rounded px-2 py-1" />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="outline" onClick={closeUpload}>Cancel</Button>
              <Button onClick={saveUpload}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};