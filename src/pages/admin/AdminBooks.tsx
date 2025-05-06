
import React, { useState } from 'react';
import { books } from '../../data/books';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, Edit, Trash2, Star } from 'lucide-react';
import AdminLayout from './AdminLayout';

const AdminBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredBooks = books.filter(book => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower) ||
      book.isbn.toLowerCase().includes(searchLower)
    );
  });

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-serif font-bold">Books</h1>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Book
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium hidden md:table-cell">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium hidden lg:table-cell">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium hidden xl:table-cell">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium hidden sm:table-cell">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium hidden md:table-cell">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="bg-background hover:bg-muted/20">
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-14 bg-muted mr-3">
                          <img 
                            src={book.coverImage} 
                            alt={book.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="truncate max-w-[180px]">
                          {book.title}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      {book.author}
                    </td>
                    <td className="px-6 py-4 capitalize hidden lg:table-cell">
                      {book.category.replace('cat-', '')}
                    </td>
                    <td className="px-6 py-4 hidden xl:table-cell">
                      ${book.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-amber-400 text-amber-400" />
                        <span>{book.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className={`${book.inStock < 10 ? 'text-red-600' : ''}`}>
                        {book.inStock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminBooks;
