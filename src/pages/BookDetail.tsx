import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Book, 
  findBookById, 
  findCategoryById, 
  findGenreById, 
  getBooksByCategory 
} from '../data/books';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Star, ChevronRight, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { toast } from 'sonner';
import { addToCart } from '../data/cart';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const foundBook = findBookById(id);
      if (foundBook) {
        setBook(foundBook);
        // Get related books from the same category
        const categoryBooks = getBooksByCategory(foundBook.category)
          .filter(relatedBook => relatedBook.id !== id)
          .slice(0, 5);
        setRelatedBooks(categoryBooks);
      } else {
        navigate('/not-found');
      }
    }
  }, [id, navigate]);

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (book) {
      addToCart(book.id, quantity);
      toast.success(`${quantity} ${quantity === 1 ? 'copy' : 'copies'} of "${book.title}" added to cart`);
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const category = findCategoryById(book.category);
  const genre = findGenreById(book.genre);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            {category && (
              <>
                <Link to={`/category/${category.slug}`} className="hover:text-foreground">
                  {category.name}
                </Link>
                <ChevronRight className="w-4 h-4 mx-2" />
              </>
            )}
            <span className="text-foreground">{book.title}</span>
          </div>
          
          {/* Book info section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Book cover */}
            <div className="md:col-span-1">
              <div className="bg-muted rounded-lg overflow-hidden aspect-[2/3] relative">
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
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
                </div>
              </div>
            </div>
            
            {/* Book details */}
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{book.title}</h1>
              <p className="text-xl mb-4">by <span className="font-medium">{book.author}</span></p>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm">{book.rating} ({book.rating * 21 + 3} reviews)</span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold">${book.price.toFixed(2)}</span>
                  {book.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through ml-3">
                        ${book.originalPrice.toFixed(2)}
                      </span>
                      <Badge variant="outline" className="ml-3 text-red-600 border-red-200 bg-red-50">
                        {book.discount}% OFF
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {book.inStock > 0 ? (
                    <>
                      <span className="text-green-600 font-medium">In Stock</span>
                      {book.inStock < 10 && ` - Only ${book.inStock} left`}
                    </>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </p>
              </div>
              
              {/* Add to cart section */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-2 w-10 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button 
                  onClick={handleAddToCart}
                  className="flex-grow max-w-xs"
                  disabled={book.inStock === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
              
              {/* Book metadata */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Publisher:</span>
                  <span className="font-medium">{book.publisher}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Publication Date:</span>
                  <span className="font-medium">{book.publicationDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pages:</span>
                  <span className="font-medium">{book.pages}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language:</span>
                  <span className="font-medium">{book.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ISBN:</span>
                  <span className="font-medium">{book.isbn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{category?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Genre:</span>
                  <span className="font-medium">{genre?.name}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Book description and details tabs */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="py-6">
              <h2 className="text-xl font-serif font-bold mb-4">About the Book</h2>
              <p className="text-muted-foreground whitespace-pre-line">{book.description}</p>
            </TabsContent>
            
            <TabsContent value="details" className="py-6">
              <h2 className="text-xl font-serif font-bold mb-4">Book Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Product Information</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="py-2 text-muted-foreground">Publisher</td>
                        <td className="py-2">{book.publisher}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-muted-foreground">Publication Date</td>
                        <td className="py-2">{book.publicationDate}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-muted-foreground">ISBN</td>
                        <td className="py-2">{book.isbn}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-muted-foreground">Language</td>
                        <td className="py-2">{book.language}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-muted-foreground">Pages</td>
                        <td className="py-2">{book.pages}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Categories</h3>
                  <p className="mb-2 text-sm">
                    {category && (
                      <Link to={`/category/${category.slug}`} className="inline-block mr-2 mb-2">
                        <Badge variant="secondary" className="text-sm">
                          {category.name}
                        </Badge>
                      </Link>
                    )}
                    {genre && (
                      <Link to={`/genre/${genre.slug}`} className="inline-block mr-2 mb-2">
                        <Badge variant="secondary" className="text-sm">
                          {genre.name}
                        </Badge>
                      </Link>
                    )}
                  </p>
                  <h3 className="font-medium mb-2 mt-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm">Books</Badge>
                    <Badge variant="outline" className="text-sm">{category?.name}</Badge>
                    <Badge variant="outline" className="text-sm">{genre?.name}</Badge>
                    <Badge variant="outline" className="text-sm">{book.author}</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="py-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-bold">Customer Reviews</h2>
                <Button>Write a Review</Button>
              </div>
              <div className="bg-muted/50 p-6 rounded-md text-center">
                <p className="text-muted-foreground">
                  Be the first to review this book!
                </p>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Related books */}
          {relatedBooks.length > 0 && (
            <div>
              <div className="flex items-end justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold">You May Also Like</h2>
                {category && (
                  <Button variant="link" asChild>
                    <Link to={`/category/${category.slug}`}>View All</Link>
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {relatedBooks.map(relatedBook => (
                  <BookCard key={relatedBook.id} book={relatedBook} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetail;
