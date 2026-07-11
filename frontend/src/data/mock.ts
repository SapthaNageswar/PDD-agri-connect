export const mockProducts = [
{
  id: '1',
  name: 'Organic Premium Wheat',
  category: 'Grains',
  price: 2400,
  unit: 'Quintal',
  rating: 4.8,
  reviews: 124,
  image:
  'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800',
  seller: 'Ramesh Farms',
  location: 'Punjab'
},
{
  id: '2',
  name: 'Fresh Red Tomatoes',
  category: 'Vegetables',
  price: 40,
  unit: 'Kg',
  rating: 4.5,
  reviews: 89,
  image:
  'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800',
  seller: 'Green Valley Organics',
  location: 'Maharashtra'
},
{
  id: '3',
  name: 'Alphonso Mangoes',
  category: 'Fruits',
  price: 800,
  unit: 'Dozen',
  rating: 4.9,
  reviews: 256,
  image:
  'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800',
  seller: 'Ratnagiri Orchards',
  location: 'Maharashtra'
},
{
  id: '4',
  name: 'Hybrid Cotton Seeds',
  category: 'Seeds',
  price: 1200,
  unit: 'Packet (450g)',
  rating: 4.6,
  reviews: 45,
  image:
  'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&q=80&w=800',
  seller: 'AgriSeed Co.',
  location: 'Gujarat'
},
{
  id: '5',
  name: 'Neem Based Bio-Pesticide',
  category: 'Fertilizers',
  price: 450,
  unit: 'Liter',
  rating: 4.7,
  reviews: 112,
  image:
  'https://images.unsplash.com/photo-1628689469838-524a4a973b8e?auto=format&fit=crop&q=80&w=800',
  seller: 'EcoFarm Solutions',
  location: 'Karnataka'
},
{
  id: '6',
  name: 'Basmati Rice (Export Quality)',
  category: 'Grains',
  price: 8500,
  unit: 'Quintal',
  rating: 4.9,
  reviews: 320,
  image:
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
  seller: 'Himalayan Harvest',
  location: 'Haryana'
},
{
  id: 'fungicide_copper',
  name: 'Copper Fungicide Spray',
  category: 'Fertilizers',
  price: 550,
  unit: 'Bottle (500ml)',
  rating: 4.8,
  reviews: 94,
  image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800',
  seller: 'AgriCare Chemicals',
  location: 'Gujarat'
},
{
  id: 'fungicide_mancozeb',
  name: 'Mancozeb Fungicide Powder',
  category: 'Fertilizers',
  price: 380,
  unit: 'Pack (1kg)',
  rating: 4.6,
  reviews: 72,
  image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
  seller: 'AgriCare Chemicals',
  location: 'Punjab'
},
{
  id: 'fungicide_sulfur',
  name: 'Sulfur Fungicide Powder',
  category: 'Fertilizers',
  price: 290,
  unit: 'Pack (500g)',
  rating: 4.5,
  reviews: 48,
  image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800',
  seller: 'EcoFarm Solutions',
  location: 'Maharashtra'
},
{
  id: 'fungicide_tricyclazole',
  name: 'Tricyclazole Blast Control',
  category: 'Fertilizers',
  price: 620,
  unit: 'Bottle (250ml)',
  rating: 4.7,
  reviews: 83,
  image: 'https://images.unsplash.com/photo-1628689469838-524a4a973b8e?auto=format&fit=crop&q=80&w=800',
  seller: 'AgriCare Chemicals',
  location: 'Andhra Pradesh'
}];


export const mockMarketPrices = [
{ crop: 'Wheat', current: 2450, trend: '+2.4%', status: 'up' },
{ crop: 'Rice (Paddy)', current: 2183, trend: '+1.2%', status: 'up' },
{ crop: 'Cotton', current: 7200, trend: '-0.8%', status: 'down' },
{ crop: 'Soybean', current: 4600, trend: '+3.1%', status: 'up' },
{ crop: 'Mustard', current: 5450, trend: '-1.5%', status: 'down' }];


export const mockPriceHistory = [
{ month: 'Jan', Wheat: 2200, Rice: 2000, Cotton: 6800 },
{ month: 'Feb', Wheat: 2250, Rice: 2050, Cotton: 6900 },
{ month: 'Mar', Wheat: 2300, Rice: 2100, Cotton: 7100 },
{ month: 'Apr', Wheat: 2400, Rice: 2150, Cotton: 7000 },
{ month: 'May', Wheat: 2450, Rice: 2183, Cotton: 7200 }];


export const mockWeather = {
  current: {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    wind: 12,
    rainfall: 0
  },
  forecast: [
  { day: 'Mon', temp: 29, rainfall: 10 },
  { day: 'Tue', temp: 27, rainfall: 40 },
  { day: 'Wed', temp: 26, rainfall: 60 },
  { day: 'Thu', temp: 28, rainfall: 20 },
  { day: 'Fri', temp: 30, rainfall: 0 }]

};

export const mockExperts = [
{
  id: '1',
  name: 'Dr. Anjali Sharma',
  specialty: 'Plant Pathology',
  rating: 4.9,
  experience: '15 years',
  image:
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
  available: true
},
{
  id: '2',
  name: 'Prof. Rajesh Kumar',
  specialty: 'Soil Science',
  rating: 4.8,
  experience: '22 years',
  image:
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
  available: false
},
{
  id: '3',
  name: 'Dr. Vikram Singh',
  specialty: 'Agronomy',
  rating: 4.7,
  experience: '10 years',
  image: 'https://via.placeholder.com/200',
  available: true
}];


export const mockNotifications = [
{
  id: '1',
  title: 'Heavy Rainfall Alert',
  message:
  'Expected heavy rainfall in your district over the next 48 hours. Secure harvested crops.',
  type: 'weather',
  date: '2 hours ago',
  read: false
},
{
  id: '2',
  title: 'Price Surge: Wheat',
  message: 'Wheat prices have gone up by 2.4% in your local mandi today.',
  type: 'market',
  date: '5 hours ago',
  read: false
},
{
  id: '3',
  title: 'Order #4829 Confirmed',
  message:
  'Your order for Hybrid Cotton Seeds has been confirmed and is being packed.',
  type: 'order',
  date: '1 day ago',
  read: true
},
{
  id: '4',
  title: 'New Advisory Available',
  message:
  'Based on recent weather, check our new advisory for pest management in Tomatoes.',
  type: 'advisory',
  date: '2 days ago',
  read: true
}];