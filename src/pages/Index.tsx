
import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import CategoryCard from '../components/CategoryCard';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  categories, 
  getBestsellerBooks, 
  getFeaturedBooks, 
  getNewReleases 
} from '../data/books';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

const Index = () => {
  const [activeTab, setActiveTab] = useState('featured');
  
  const featuredBooks = getFeaturedBooks();
  const bestsellerBooks = getBestsellerBooks();
  const newReleases = getNewReleases();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-secondary/50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6">
                Discover Your Next <span className="text-primary">Favorite Book</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Explore our vast collection of books across genres. 
                From bestsellers to hidden gems, find something for every reader.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/categories">Explore Categories</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/bestsellers">Browse Bestsellers</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif font-bold">Categories</h2>
                <p className="text-muted-foreground mt-2">Browse books by category</p>
              </div>
              <Button variant="link" asChild>
                <Link to="/categories">View All</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Books section with tabs */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-8 text-center">
              <h2 className="text-3xl font-serif font-bold">Our Selection</h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Find the perfect book from our carefully curated collections
              </p>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8 w-full max-w-md">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
                  <TabsTrigger value="new">New Releases</TabsTrigger>
                </TabsList>
                
                <TabsContent value="featured" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {featuredBooks.slice(0, 10).map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="bestsellers" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {bestsellerBooks.slice(0, 10).map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="new" className="mt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {newReleases.slice(0, 10).map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                </TabsContent>
                
                <div className="flex justify-center mt-10">
                  <Button size="lg" asChild>
                    <Link to={`/${activeTab === 'featured' ? 'categories' : activeTab === 'bestsellers' ? 'bestsellers' : 'new-releases'}`}>
                      View All
                    </Link>
                  </Button>
                </div>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Newsletter section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-secondary/80 rounded-xl p-8 md:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                  Stay Updated with New Releases
                </h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter and be the first to hear about new books, 
                  exclusive offers, and reading recommendations.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow rounded-md border border-border bg-background px-4 py-2"
                    required
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
