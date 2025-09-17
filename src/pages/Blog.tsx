import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    id: 1,
    title: "The Future of Workplace Design: Trends Shaping 2024",
    excerpt: "Explore the latest trends in office design that are revolutionizing the modern workplace. From biophilic elements to flexible spaces, discover what's driving change in interior design.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop",
    author: "Hagerstone Team",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Trends"
  };

  const blogPosts = [
    {
      id: 2,
      title: "Sustainable Interior Design: Creating Eco-Friendly Workspaces",
      excerpt: "Learn how to incorporate sustainable practices and materials into your interior design projects while maintaining style and functionality.",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
      author: "Dhruv Agarwal",
      date: "December 10, 2024",
      readTime: "6 min read",
      category: "Sustainability"
    },
    {
      id: 3,
      title: "Maximizing Small Office Spaces: Smart Design Solutions",
      excerpt: "Discover innovative ways to make the most of limited office space with clever design strategies and multi-functional furniture.",
      image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=600&h=400&fit=crop",
      author: "Bhaskar Tyagi",
      date: "December 5, 2024",
      readTime: "5 min read",
      category: "Space Planning"
    },
    {
      id: 4,
      title: "Color Psychology in Interior Design: Impact on Productivity",
      excerpt: "Understand how different colors affect mood, productivity, and well-being in workplace environments.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      author: "Hagerstone Team",
      date: "November 28, 2024",
      readTime: "7 min read",
      category: "Design Tips"
    },
    {
      id: 5,
      title: "Smart Home Integration: Technology Meets Interior Design",
      excerpt: "Explore how to seamlessly integrate smart technology into your interior design without compromising aesthetics.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
      author: "Hagerstone Team",
      date: "November 20, 2024",
      readTime: "6 min read",
      category: "Technology"
    },
    {
      id: 6,
      title: "Hotel Interior Design: Creating Memorable Guest Experiences",
      excerpt: "Discover the key elements that make hotel interiors both functional and unforgettable for guests.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
      author: "Dhruv Agarwal",
      date: "November 15, 2024",
      readTime: "8 min read",
      category: "Hospitality"
    }
  ];

  const categories = [
    "All", "Trends", "Sustainability", "Space Planning", 
    "Design Tips", "Technology", "Hospitality", "Case Studies"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in text-gold">
            Design Insights
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-slide-up">
            Stay updated with the latest trends, tips, and insights from the world of interior design
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 animate-fade-in">Featured Article</h2>
          </div>
          <Card className="bg-gradient-card border-0 shadow-luxury hover:shadow-hover transition-all duration-500 hover:scale-105 animate-scale-in overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-accent text-accent-foreground">
                    {featuredPost.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-primary mb-4 line-clamp-2">
                  {featuredPost.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-lg line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button className="group self-start bg-primary hover:bg-primary/90">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Button
                key={category}
                variant="outline"
                className="hover:bg-muted hover:scale-105 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 animate-fade-in">Latest Articles</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card 
                key={post.id}
                className="group bg-gradient-card border-0 shadow-card hover:shadow-luxury transition-all duration-500 hover:scale-105 animate-scale-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-accent text-accent-foreground">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <h3 className="text-xl font-bold text-primary line-clamp-2 group-hover:text-accent transition-colors duration-300">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <Button variant="ghost" size="sm" className="group/btn p-0 h-auto">
                      Read More
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Valued Partners */}
      

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-hero text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in text-gold">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 text-white/90 animate-slide-up">
            Subscribe to our newsletter for the latest design insights and trends
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg text-foreground border-0 flex-1"
            />
            <Button 
              size="lg"
              variant="secondary"
              className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-luxury hover:scale-105 transition-all duration-300"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;