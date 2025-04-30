
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  price?: string;
}

export default function ShopAssistant() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setSearched(true);

    // Placeholder mock — real version connects to AI product agent
    setTimeout(() => {
      setResults([
        {
          id: '1',
          title: 'AI-Optimized Standing Desk',
          description: 'Smart desk with posture detection and memory presets.',
          image_url: 'https://placehold.co/300x200',
          link: 'https://example.com/desk',
          price: '$499'
        },
        {
          id: '2',
          title: 'Focus Headphones Pro',
          description: 'Noise-cancelling with ambient mode and AI voice assistant.',
          image_url: 'https://placehold.co/300x200',
          link: 'https://example.com/headphones',
          price: '$299'
        },
        {
          id: '3',
          title: 'Ergonomic Chair',
          description: 'Designed for long hours with adaptive lumbar support and cooling mesh.',
          image_url: 'https://placehold.co/300x200',
          link: 'https://example.com/chair',
          price: '$349'
        }
      ]);
      setLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-4">🛍 AI Shopping Assistant</h1>
      <p className="text-muted-foreground mb-6">Describe what you're looking for in natural language - our AI will find the best products for you.</p>

      <div className="flex gap-2 max-w-xl mb-8">
        <Input
          placeholder="I need a desk for long hours and back support..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            'Search'
          )}
        </Button>
      </div>

      {loading && (
        <div className="flex flex-col items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Finding products that match your description...</p>
        </div>
      )}

      {!loading && searched && results.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No products found matching your description. Try a different search query.</p>
          </CardContent>
        </Card>
      )}

      {!loading && results.length > 0 && (
        <>
          <h2 className="text-xl font-medium mb-4">Recommended Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(product => (
              <a
                key={product.id}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border rounded-xl overflow-hidden hover:shadow-md bg-white/5 transition-all"
              >
                <div className="relative">
                  <img src={product.image_url} alt={product.title} className="w-full h-48 object-cover" />
                  {product.price && (
                    <span className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded text-sm font-medium">
                      {product.price}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
                  <div className="mt-3 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
