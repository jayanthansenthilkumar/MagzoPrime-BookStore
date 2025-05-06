
import React from 'react';
import { Book } from '../data/books';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import { addToCart } from '../data/cart';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface BookCardProps {
  book: Book;
  compact?: boolean;
}

const BookCard = ({ book, compact = false }: BookCardProps) => {
  const handleAddToCart = () => {
    addToCart(book.id);
    toast.success(`${book.title} added to cart`);
  };

  const renderBadges = () => {
    return (
      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
        {book.featured && (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            Featured
          </Badge>
        )}
        {book.bestseller && (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Bestseller
          </Badge>
        )}
        {book.newRelease && (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            New Release
          </Badge>
        )}
        {book.discount && (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            {book.discount}% OFF
          </Badge>
        )}
      </div>
    );
  };

  if (compact) {
    return (
      <Card className="book-card h-full overflow-hidden border border-border">
        <CardContent className="p-3 h-full flex flex-col">
          <Link to={`/book/${book.id}`} className="flex items-center space-x-4">
            <div className="relative flex-shrink-0 w-16 h-24 bg-muted">
              <img 
                src={book.coverImage} 
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-medium line-clamp-1">{book.title}</h3>
              <p className="text-xs text-muted-foreground">{book.author}</p>
              <div className="mt-1 flex items-center">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span className="text-xs ml-1">{book.rating}</span>
              </div>
              <p className="font-medium text-sm mt-1">
                ${book.price.toFixed(2)}
                {book.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through ml-1">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                )}
              </p>
            </div>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="book-card h-full overflow-hidden border border-border">
      <CardContent className="p-3 h-full flex flex-col">
        <Link to={`/book/${book.id}`} className="flex flex-col flex-grow">
          <div className="relative aspect-[2/3] bg-muted mb-3 overflow-hidden">
            <img 
              src={book.coverImage} 
              alt={book.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {renderBadges()}
          </div>
          <h3 className="font-medium line-clamp-2 min-h-[2.5rem] mb-1">{book.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-1">{book.author}</p>
          <div className="mt-2 flex items-center">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span className="text-sm ml-1">{book.rating}</span>
          </div>
          <div className="mt-auto pt-2">
            <div className="font-medium">
              ${book.price.toFixed(2)}
              {book.originalPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </Link>
        <Button 
          onClick={handleAddToCart} 
          className="w-full mt-3"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
