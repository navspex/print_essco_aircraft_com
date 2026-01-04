import { Calendar, ArrowRight } from 'lucide-react';

const posts = [
  {
    title: 'The History of Aviation Manuals',
    excerpt: 'From handwritten guides to digital PDFs, explore how aviation documentation has evolved over the decades.',
    date: 'Dec 15, 2024',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '#blog-1',
  },
  {
    title: 'Choosing the Right Binding for Your Manual',
    excerpt: 'Comb, spiral, or perfect bound? Learn which binding style works best for different types of aviation manuals.',
    date: 'Dec 10, 2024',
    image: 'https://images.pexels.com/photos/159832/justice-law-case-hearing-159832.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '#blog-2',
  },
  {
    title: 'Maintaining Your Aircraft Documentation',
    excerpt: 'Best practices for organizing, storing, and updating your aircraft manuals and records.',
    date: 'Dec 5, 2024',
    image: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600',
    href: '#blog-3',
  },
];

export default function BlogPosts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-oswald text-section-title uppercase text-essco-dark-gray mb-3">
            From Our Blog
          </h2>
          <p className="text-section-desc text-gray-600">
            Aviation news, tips, and insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="group">
              <a href={post.href} className="block">
                <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {post.date}
                </div>
                <h3 className="font-oswald text-lg uppercase text-essco-dark-gray mb-2 group-hover:text-essco-maroon transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center text-essco-maroon text-sm font-medium">
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
