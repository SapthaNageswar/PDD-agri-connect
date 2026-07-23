import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Star,
  MapPin,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Minus,
  Plus } from
'lucide-react';
import { toast } from 'sonner';
import { Button, Badge } from '../components/ui';
import { auth, db } from '../firebase';
import { collection, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { mockProducts } from '../data/mock';
import { useAuth } from '../lib/auth';
export const ProductDetail = () => {
  const { role } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    // Try finding in mockProducts first
    const mockProd = mockProducts.find((p) => p.id === id);
    if (mockProd) {
      setProduct(mockProd);
      setLoading(false);
      return;
    }

    // Otherwise, fetch from Firestore
    if (id) {
      setLoading(true);
      const fetchProduct = async () => {
        try {
          const docRef = doc(db, 'products', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setProduct({
              id: docSnap.id,
              uid: data.uid,
              sellerUid: data.sellerUid,
              name: data.name ?? '',
              category: data.category ?? '',
              price: data.price ?? 0,
              unit: data.unit ?? '',
              rating: data.rating ?? 4.5,
              reviews: data.reviews ?? 0,
              image: data.image ?? '',
              seller: data.seller ?? 'Unknown Seller',
              location: data.location ?? 'Unknown Location',
            });
          } else {
            // Fallback
            setProduct(mockProducts[0]);
          }
        } catch (err) {
          console.error('Error fetching product:', err);
          setProduct(mockProducts[0]);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else {
      setProduct(mockProducts[0]);
      setLoading(false);
    }
  }, [id]);

  const editPrice = async () => {
    if (!product || !id) return;
    const newPriceStr = window.prompt('Enter new price (numeric):', product.price.toString());
    if (!newPriceStr) return;
    const parsed = parseFloat(newPriceStr);
    if (isNaN(parsed)) {
      alert('Invalid price');
      return;
    }
    
    setProduct((prev: any) => prev ? { ...prev, price: parsed } : null);

    const isMock = mockProducts.some(p => p.id === id);
    if (!isMock) {
      try {
        await updateDoc(doc(db, 'products', id), { price: parsed });
        toast.success('Price updated successfully');
      } catch (e) {
        console.error('Failed to update price in Firestore', e);
        toast.error('Failed to update price');
      }
    } else {
      toast.success('Price updated in memory (mock)');
    }
  };

  const removeListing = async () => {
    if (!product || !id) return;
    if (window.confirm('Are you sure you want to remove this listing?')) {
      const isMock = mockProducts.some(p => p.id === id);
      if (!isMock) {
        try {
          await deleteDoc(doc(db, 'products', id));
          toast.success('Listing removed successfully');
          navigate('/marketplace');
        } catch (e) {
          console.error('Failed to delete product', e);
          toast.error('Failed to remove listing');
        }
      } else {
        toast.success('Listing removed (mock)');
        navigate('/marketplace');
      }
    }
  };

  const handleBuy = async () => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('User not authenticated');
      await addDoc(collection(db, 'orders'), {
        uid,
        sellerId: product.sellerUid || product.uid || product.seller || '',
        productId: product.id,
        productName: product.name,
        qty,
        totalPrice: qty * product.price,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      toast.success(
        `Order placed for ${qty} ${product.unit} of ${product.name}!`,
        {
          description: 'Order saved to Firestore.'
        }
      );
      setTimeout(() => navigate('/buyer'), 1500);
    } catch (err) {
      console.error('Order error:', err);
      toast.error('Failed to place order.');
    }
  };

  if (loading || !product) {
    return (
      <div className="max-w-6xl mx-auto text-center py-20">
        <p className="text-earth-600 text-lg">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-earth-500 hover:text-earth-900 transition-colors">
        
        <ArrowLeft className="h-4 w-4" /> Back to Marketplace
      </button>

      <div className="bg-white rounded-3xl border border-earth-200 overflow-hidden shadow-sm">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-[400px] md:h-full min-h-[500px]">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover" />
            
          </div>

          {/* Details Section */}
          <div className="p-8 md:p-12 flex flex-col">
            <div className="mb-6">
              <Badge className="mb-4">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-earth-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-earth-600">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-earth-900">
                    {product.rating}
                  </span>
                  <span>({product.reviews} reviews)</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-earth-300"></div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {product.location}
                </div>
              </div>
            </div>

            <div className="py-6 border-y border-earth-100 mb-6">
              <p className="text-4xl font-bold text-earth-900 mb-1">
                ₹{product.price}
              </p>
              <p className="text-earth-500">per {product.unit}</p>
            </div>

            <div className="space-y-4 mb-8 flex-1">
              <div className="flex items-center gap-3 text-earth-700">
                <ShieldCheck className="h-5 w-5 text-agri-600" />
                <span>
                  Verified Seller:{' '}
                  <strong className="text-earth-900">{product.seller}</strong>
                </span>
              </div>
              <div className="flex items-center gap-3 text-earth-700">
                <Truck className="h-5 w-5 text-agri-600" />
                <span>Delivery available within 3-5 business days</span>
              </div>
            </div>

            {role === 'buyer' ?
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-earth-700">Quantity:</span>
                  <div className="flex items-center border border-earth-200 rounded-lg bg-earth-50">
                    <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2 hover:bg-earth-200 rounded-l-lg transition-colors">
                    
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-medium">{qty}</span>
                    <button
                    onClick={() => setQty(qty + 1)}
                    className="p-2 hover:bg-earth-200 rounded-r-lg transition-colors">
                    
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-earth-500">{product.unit}s</span>
                </div>

                <div className="flex items-center gap-2 text-earth-700 pt-1">
                  <span className="font-medium">Total Price:</span>
                  <span className="text-2xl font-bold text-earth-900">₹{qty * product.price}</span>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button
                  size="lg"
                  className="flex-1 text-lg"
                  onClick={handleBuy}>
                  
                    Buy Now
                  </Button>
                  <Button size="lg" variant="outline">
                    Add to Cart
                  </Button>
                </div>
              </div> :
            role === 'farmer' ?
            <div className="p-4 bg-agri-50 rounded-xl border border-agri-100 mt-4">
                <p className="text-agri-800 font-medium text-center">
                  This is how buyers see your listing.
                </p>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="flex-1" onClick={editPrice}>
                    Edit Price
                  </Button>
                  <Button variant="danger" className="flex-1" onClick={removeListing}>
                    Remove Listing
                  </Button>
                </div>
              </div> :

            <div className="p-4 bg-earth-50 rounded-xl border border-earth-200 mt-4">
                <p className="text-earth-600 font-medium text-center">
                  Admin View: Monitoring Listing
                </p>
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" className="flex-1">
                    Contact Seller
                  </Button>
                  <Button variant="danger" className="flex-1" onClick={removeListing}>
                    Take Down Listing
                  </Button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

};