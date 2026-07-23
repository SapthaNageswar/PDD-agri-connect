import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Sprout, Tractor, ShoppingCart, ShieldCheck } from 'lucide-react';
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../components/ui';
import { useAuth } from '../lib/auth';
export const Auth = ({ type = 'login' }: {type?: 'login' | 'register';}) => {
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'buyer' | 'admin'>('farmer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setRole } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Auth submit: ', { type, email, selectedRole });
    try {
      if (type === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;
        console.log('New user UID:', uid);
        console.log('Storing user profile to Firestore for UID:', uid);
        try {
          await setDoc(doc(db, 'users', uid), {
            name: name || 'Ramesh',
            location: selectedRole === 'farmer' ? (location || 'Ludhiana') : '',
            email,
            role: selectedRole,
            createdAt: new Date().toISOString(),
          });
          console.log('User profile written to Firestore:', uid);
        } catch (firestoreErr) {
          console.error('Failed to write user profile to Firestore:', firestoreErr);
        }
      }
      // After successful auth, set role and navigate
      setRole(selectedRole);
      if (selectedRole === 'farmer') navigate('/farmer');
      if (selectedRole === 'buyer') navigate('/buyer');
      if (selectedRole === 'admin') navigate('/admin');
    } catch (err) {
      console.error('Auth error:', err);
      setErrorMessage('Authentication failed. Please check your credentials.');
    }
  };
  return (
    <div className="min-h-screen bg-earth-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-agri-100 flex items-center justify-center">
            <Sprout className="h-8 w-8 text-agri-600" />
          </div>
        </div>
        <h2 className="text-3xl font-heading font-bold text-earth-900">
          {type === 'login' ?
          'Welcome back to AgriConnect' :
          'Join AgriConnect'}
        </h2>
        <p className="mt-2 text-sm text-earth-600">
          {type === 'login' ?
          'Sign in to access your dashboard' :
          'Create an account to start your journey'}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-sm text-earth-500 uppercase tracking-wider">
              Select Your Role
            </CardTitle>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
              {
                id: 'farmer',
                icon: Tractor,
                label: 'Farmer'
              },
              {
                id: 'buyer',
                icon: ShoppingCart,
                label: 'Buyer'
              },
              {
                id: 'admin',
                icon: ShieldCheck,
                label: 'Admin'
              }].
              map((r) =>
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRole(r.id as any)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${selectedRole === r.id ? 'border-agri-600 bg-agri-50 text-agri-700' : 'border-earth-200 hover:border-agri-300 text-earth-600'}`}>
                
                  <r.icon className="h-6 w-6 mb-2" />
                  <span className="text-xs font-semibold">{r.label}</span>
                </button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {type === 'register' &&
              <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-1">
                      Full Name
                    </label>
                    <Input placeholder="John Doe" required value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  {selectedRole === 'farmer' &&
                <div>
                      <label className="block text-sm font-medium text-earth-700 mb-1">
                        Farm Location (District/State)
                      </label>
                      <Input placeholder="e.g., Ludhiana, Punjab" required value={location} onChange={e => setLocation(e.target.value)} />
                    </div>
                }
                </div>
              }
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">
                  Email
                </label>
                <Input type="email" placeholder="Enter your email" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">
                  Password
                </label>
                <Input type="password" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} />
              </div>

              {errorMessage && (
                <p className="text-red-600 mb-2 text-center">{errorMessage}</p>
              )}
              <Button type="submit" className="w-full mt-6" size="lg">
                {type === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-earth-600">
              {type === 'login' ?
              <p>
                  Don't have an account?{' '}
                  <a
                  href="/register"
                  className="text-agri-600 font-semibold hover:underline">
                  
                    Register here
                  </a>
                </p> :

              <p>
                  Already have an account?{' '}
                  <a
                  href="/login"
                  className="text-agri-600 font-semibold hover:underline">
                  
                    Sign in
                  </a>
                </p>
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

};