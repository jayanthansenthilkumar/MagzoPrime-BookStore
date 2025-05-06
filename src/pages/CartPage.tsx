
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  getCartWithDetails, 
  removeFromCart, 
  updateCartItemQuantity,
  clearCart
} from '../data/cart';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { getCurrentUser } from '../data/users';

const CartPage = () => {
  const [cart, setCart] = useState(getCartWithDetails());
  const currentUser = getCurrentUser();

  useEffect(() => {
    // Update cart when items change
    setCart(getCartWithDetails());
  }, []);

  const handleQuantityChange = (bookId: string, change: number) => {
    const item = cart.items.find(item => item.book.id === bookId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        const updatedCart = updateCartItemQuantity(bookId, newQuantity);
        setCart(getCartWithDetails());
        toast.success("Cart updated");
      }
    }
  };

  const handleRemoveItem = (bookId: string) => {
    removeFromCart(bookId);
    setCart(getCartWithDetails());
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    clearCart();
    setCart(getCartWithDetails());
    toast.success("Cart cleared");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif font-bold mb-8">Your Shopping Cart</h1>
          
          {cart.items.length === 0 ? (
            <div className="bg-muted/30 rounded-lg p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any books to your cart yet.
              </p>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg border mb-6">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-medium">
                        Cart ({cart.items.reduce((acc, item) => acc + item.quantity, 0)} items)
                      </h2>
                      <Button variant="ghost" size="sm" onClick={handleClearCart}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    {cart.items.map((item) => (
                      <div key={item.book.id} className="p-6 border-b last:border-0 flex">
                        <Link to={`/book/${item.book.id}`} className="flex-shrink-0 mr-4">
                          <div className="w-20 h-28 bg-muted rounded overflow-hidden">
                            <img 
                              src={item.book.coverImage} 
                              alt={item.book.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                        
                        <div className="flex-grow">
                          <Link to={`/book/${item.book.id}`} className="font-medium hover:text-primary">
                            {item.book.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">by {item.book.author}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <div className="text-sm text-muted-foreground">
                              ${item.book.price.toFixed(2)} each
                            </div>
                            {item.book.originalPrice && (
                              <div className="text-xs text-muted-foreground line-through">
                                ${item.book.originalPrice.toFixed(2)}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border rounded-md">
                              <button
                                onClick={() => handleQuantityChange(item.book.id, -1)}
                                className="px-2 py-1 text-muted-foreground hover:text-foreground"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 py-1 w-8 text-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.book.id, 1)}
                                className="px-2 py-1 text-muted-foreground hover:text-foreground"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="flex items-center">
                              <div className="font-medium mr-4">
                                ${(item.book.price * item.quantity).toFixed(2)}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(item.book.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg border p-6 sticky top-8">
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cart.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${cart.total > 35 ? "0.00" : "4.99"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${(cart.total * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${(cart.total + (cart.total > 35 ? 0 : 4.99) + cart.total * 0.1).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="lg" asChild>
                    <Link to={currentUser ? "/checkout" : "/login?redirect=checkout"}>
                      Checkout
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  
                  <div className="text-xs text-muted-foreground text-center mt-4">
                    Free shipping on orders over $35
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
