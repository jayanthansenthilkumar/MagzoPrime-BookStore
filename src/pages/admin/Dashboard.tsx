
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Book as BookIcon, Users, ShoppingCart, DollarSign } from 'lucide-react';
import { books } from '../../data/books';
import { getOrders } from '../../data/orders';
import { users } from '../../data/users';
import AdminLayout from './AdminLayout';

const Dashboard = () => {
  const orders = getOrders();
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  
  const stats = [
    {
      name: 'Total Books',
      value: books.length,
      icon: <BookIcon className="h-8 w-8 text-blue-500" />,
      change: '+2% from last month',
    },
    {
      name: 'Total Users',
      value: users.length,
      icon: <Users className="h-8 w-8 text-green-500" />,
      change: '+5% from last month',
    },
    {
      name: 'Total Orders',
      value: orders.length,
      icon: <ShoppingCart className="h-8 w-8 text-amber-500" />,
      change: '+12% from last month',
    },
    {
      name: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: <DollarSign className="h-8 w-8 text-red-500" />,
      change: '+8% from last month',
    },
  ];
  
  const recentOrders = orders.slice(0, 5);
  const lowStockBooks = books
    .filter(book => book.inStock < 10)
    .sort((a, b) => a.inStock - b.inStock)
    .slice(0, 5);
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full p-2 bg-muted">
                  {stat.icon}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length > 0 ? (
              <div className="divide-y">
                {recentOrders.map((order) => (
                  <div key={order.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{`Order #${order.id.slice(-5)}`}</p>
                      <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.total.toFixed(2)}</p>
                      <p className="text-xs px-2 py-1 rounded-full bg-muted inline-block capitalize">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">No orders yet</p>
            )}
          </CardContent>
        </Card>
        
        {/* Low Stock Books */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {lowStockBooks.map((book) => (
                <div key={book.id} className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-14 bg-muted mr-4">
                      <img 
                        src={book.coverImage} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${book.inStock < 5 ? 'text-red-500' : 'text-amber-500'}`}>
                      {book.inStock} in stock
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
