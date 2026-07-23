import React, { useState } from 'react';
import {
  Star,
  Calendar,
  MessageSquare,
  Video,
  CheckCircle2 } from
'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent, Button, Badge } from '../components/ui';
import { mockExperts } from '../data/mock';
export const Experts = () => {
  const [bookingExpert, setBookingExpert] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([]);
  const [input, setInput] = useState('');
  const handleBook = (name: string) => {
    toast.success(`Consultation requested with ${name}`, {
      description: 'You will receive a confirmation shortly.'
    });
    setBookingExpert(null);
  };
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-earth-900">
            Expert Consultation
          </h1>
          <p className="text-earth-600">
            Connect with certified agricultural scientists and agronomists.
          </p>
        </div>
        <Button className="gap-2 shrink-0" onClick={() => setChatOpen(true)}>
            <MessageSquare className="h-4 w-4" /> Chat with AI Assistant
          </Button>
          {chatOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">AI Assistant</h3>
                  <button onClick={() => setChatOpen(false)} className="text-gray-500 hover:text-gray-700">✖</button>
                </div>
                <div className="h-64 overflow-y-auto mb-2 p-2 border rounded" id="chatMessages">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
                      <span className={msg.sender === 'user' ? 'inline-block bg-agri-100 text-agri-900 rounded px-2 py-1' : 'inline-block bg-gray-200 text-gray-800 rounded px-2 py-1'}>{msg.text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="text" className="flex-1 border rounded px-2 py-1" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..." />
                  <Button onClick={() => {
                    if (input.trim()) {
                      setMessages(prev => [...prev, { sender: 'user', text: input }, { sender: 'ai', text: 'This is a placeholder response.' }]);
                      setInput('');
                    }
                  }}>Send</Button>
                </div>
              </div>
            </div>
          )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockExperts.map((expert) =>
        <Card key={expert.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 flex gap-6">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-24 h-24 rounded-2xl object-cover border border-earth-200"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200';
                  }}
                />
              
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg text-earth-900">
                      {expert.name}
                    </h3>
                    {expert.available ?
                  <Badge variant="success" className="text-[10px]">
                        Available
                      </Badge> :

                  <Badge variant="default" className="text-[10px]">
                        Busy
                      </Badge>
                  }
                  </div>
                  <p className="text-agri-700 font-medium text-sm mb-2">
                    {expert.specialty}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-earth-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />{' '}
                      {expert.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4 text-agri-500" />{' '}
                      {expert.experience}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-earth-50 px-6 py-4 border-t border-earth-100 flex gap-3">
                {bookingExpert === expert.id ?
              <div className="flex-1 flex gap-2">
                    <Button
                  className="flex-1"
                  onClick={() => handleBook(expert.name)}>
                  
                      Confirm
                    </Button>
                    <Button
                  variant="outline"
                  onClick={() => setBookingExpert(null)}>
                  
                      Cancel
                    </Button>
                  </div> :

              <>
                    <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  disabled={!expert.available}
                  onClick={() => setBookingExpert(expert.id)}>
                  
                      <Calendar className="h-4 w-4" /> Book Slot
                    </Button>
                    <Button
                  className="flex-1 gap-2"
                  disabled={!expert.available}>
                  
                      <Video className="h-4 w-4" /> Call Now
                    </Button>
                  </>
              }
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>);

};