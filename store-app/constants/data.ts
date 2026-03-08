// shared data for categories and products
// use royalty-free images from Unsplash source endpoints
const unsplash = (term: string) => `https://source.unsplash.com/featured/200x200?${encodeURIComponent(term)}`;

export const categories = [
  { id: 'shoes', name: 'Shoes', image: unsplash('shoes') },
  { id: 'pants', name: 'Pants', image: unsplash('pants clothing') },
  { id: 'shirts', name: 'Shirts', image: unsplash('shirts') },
  { id: 'jackets', name: 'Jackets', image: unsplash('jackets') },
  { id: 'jeans', name: 'Jeans', image: unsplash('jeans') },
  { id: 'stoves', name: 'Stoves', image: unsplash('stove kitchen') },
  { id: 'beds', name: 'Beds', image: unsplash('bed mattress') },
  { id: 'cupboards', name: 'Cupboards', image: unsplash('cupboard') },
  { id: 'kettles', name: 'Kettles', image: unsplash('kettle') },
];

// products per category (2-5 each) - for simplicity we create names with indexes
export const productsByCategory: Record<string, Array<{ id: string; name: string; image: string }>> = categories.reduce(
  (acc, cat) => {
    const count = Math.floor(Math.random() * 4) + 2; // 2-5
    acc[cat.id] = Array.from({ length: count }).map((_, i) => ({
      id: `${cat.id}-prod-${i}`,
      name: `${cat.name} item ${i + 1}`,
      image: unsplash(cat.name),
    }));
    return acc;
  },
  {} as Record<string, Array<{ id: string; name: string; image: string }>>
);
