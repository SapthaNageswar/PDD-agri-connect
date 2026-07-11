import React from 'react';
import { Users, ShieldCheck, Activity, AlertTriangle } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge } from
'../components/ui';
export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-earth-900">
          Admin Overview
        </h1>
        <p className="text-earth-600">
          Monitor platform activity and manage users.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
        {
          title: 'Total Users',
          value: '12,450',
          icon: Users,
          color: 'text-blue-600',
          bg: 'bg-blue-100'
        },
        {
          title: 'Active Experts',
          value: '142',
          icon: ShieldCheck,
          color: 'text-green-600',
          bg: 'bg-green-100'
        },
        {
          title: 'Daily Transactions',
          value: '845',
          icon: Activity,
          color: 'text-purple-600',
          bg: 'bg-purple-100'
        },
        {
          title: 'Reports/Flags',
          value: '12',
          icon: AlertTriangle,
          color: 'text-red-600',
          bg: 'bg-red-100'
        }].
        map((stat, i) =>
        <Card key={i}>
            <CardContent className="p-6 flex items-center gap-4">
              <div
              className={`h-12 w-12 rounded-full ${stat.bg} flex items-center justify-center`}>
              
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-earth-500">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-earth-900">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent User Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-earth-500 uppercase bg-earth-50">
                <tr>
                  <th className="px-6 py-3 rounded-tl-lg">Name</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                {
                  name: 'Suresh Kumar',
                  role: 'Farmer',
                  loc: 'Haryana',
                  status: 'Active'
                },
                {
                  name: 'AgriFoods Ltd',
                  role: 'Buyer',
                  loc: 'Delhi',
                  status: 'Pending Verification'
                },
                {
                  name: 'Dr. Meena',
                  role: 'Expert',
                  loc: 'Pune',
                  status: 'Pending Verification'
                },
                {
                  name: 'Ravi Singh',
                  role: 'Farmer',
                  loc: 'Punjab',
                  status: 'Active'
                }].
                map((user, i) =>
                <tr
                  key={i}
                  className="border-b border-earth-100 last:border-0">
                  
                    <td className="px-6 py-4 font-medium text-earth-900">
                      {user.name}
                    </td>
                    <td className="px-6 py-4">{user.role}</td>
                    <td className="px-6 py-4">{user.loc}</td>
                    <td className="px-6 py-4">
                      <Badge
                      variant={
                      user.status === 'Active' ? 'success' : 'warning'
                      }>
                      
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-agri-600 hover:underline font-medium">
                        Review
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>);

};