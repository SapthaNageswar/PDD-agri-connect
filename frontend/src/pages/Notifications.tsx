import React from 'react';
import {
  Bell,
  CloudRain,
  TrendingUp,
  Package,
  Sprout,
  Check } from
'lucide-react';
import { Card, CardContent } from '../components/ui';
import { mockNotifications } from '../data/mock';
export const Notifications = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return <CloudRain className="h-5 w-5 text-blue-500" />;
      case 'market':
        return <TrendingUp className="h-5 w-5 text-amber-500" />;
      case 'order':
        return <Package className="h-5 w-5 text-green-500" />;
      case 'advisory':
        return <Sprout className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-earth-500" />;
    }
  };
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-earth-900">
          Notifications
        </h1>
        <button className="text-sm text-agri-600 font-medium hover:underline flex items-center gap-1">
          <Check className="h-4 w-4" /> Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {mockNotifications.map((notif) =>
        <Card
          key={notif.id}
          className={`transition-colors ${notif.read ? 'bg-white' : 'bg-agri-50 border-agri-200'}`}>
          
            <CardContent className="p-4 sm:p-6 flex gap-4">
              <div
              className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${notif.read ? 'bg-earth-100' : 'bg-white shadow-sm'}`}>
              
                {getIcon(notif.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3
                  className={`font-semibold ${notif.read ? 'text-earth-800' : 'text-earth-900'}`}>
                  
                    {notif.title}
                  </h3>
                  <span className="text-xs text-earth-500 whitespace-nowrap ml-4">
                    {notif.date}
                  </span>
                </div>
                <p
                className={`text-sm ${notif.read ? 'text-earth-500' : 'text-earth-700'}`}>
                
                  {notif.message}
                </p>
              </div>
              {!notif.read &&
            <div className="w-2 h-2 rounded-full bg-agri-500 mt-2 flex-shrink-0"></div>
            }
            </CardContent>
          </Card>
        )}
      </div>
    </div>);

};