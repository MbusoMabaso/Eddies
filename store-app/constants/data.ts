// shared data for categories and products
// use royalty-free images from Unsplash source endpoints
const unsplash = (term: string) => `https://source.unsplash.com/featured/200x200?${encodeURIComponent(term)}`;

export const categories = [
  { id: 'smartphones', name: 'Smartphones', image: unsplash('smartphone') },
  { id: 'tablets', name: 'Tablets', image: unsplash('tablet') },
  { id: 'accessories', name: 'Accessories', image: unsplash('phone accessories') },
  { id: 'chargers', name: 'Chargers', image: unsplash('phone charger') },
  { id: 'cases', name: 'Cases', image: unsplash('phone case') },
  { id: 'headphones', name: 'Headphones', image: unsplash('headphones') },
  { id: 'screens', name: 'Screens', image: unsplash('phone screen') },
  { id: 'batteries', name: 'Batteries', image: unsplash('phone battery') },
];

// products per category (2-5 each) - mobile phone related items
export const productsByCategory: Record<string, Array<{ id: string; name: string; image: string }>> = {
  smartphones: [
    { id: 'iphone-15', name: 'iPhone 15 Pro', image: unsplash('iphone') },
    { id: 'samsung-s24', name: 'Samsung Galaxy S24', image: unsplash('samsung phone') },
    { id: 'google-pixel', name: 'Google Pixel 8', image: unsplash('google pixel') },
    { id: 'oneplus-12', name: 'OnePlus 12', image: unsplash('oneplus phone') },
  ],
  tablets: [
    { id: 'ipad-pro', name: 'iPad Pro 12.9"', image: unsplash('ipad') },
    { id: 'samsung-tab', name: 'Samsung Galaxy Tab S9', image: unsplash('samsung tablet') },
    { id: 'amazon-fire', name: 'Amazon Fire HD 10', image: unsplash('amazon tablet') },
  ],
  accessories: [
    { id: 'screen-protector', name: 'Tempered Glass Screen Protector', image: unsplash('screen protector') },
    { id: 'pop-socket', name: 'Pop Socket Grip', image: unsplash('pop socket') },
    { id: 'ring-light', name: 'Phone Ring Light', image: unsplash('ring light') },
    { id: 'selfie-stick', name: 'Selfie Stick', image: unsplash('selfie stick') },
  ],
  chargers: [
    { id: 'fast-charger', name: '20W Fast Charger', image: unsplash('fast charger') },
    { id: 'wireless-charger', name: 'Wireless Charging Pad', image: unsplash('wireless charger') },
    { id: 'car-charger', name: 'Car Phone Charger', image: unsplash('car charger') },
  ],
  cases: [
    { id: 'silicone-case', name: 'Silicone Phone Case', image: unsplash('silicone case') },
    { id: 'leather-case', name: 'Leather Phone Case', image: unsplash('leather case') },
    { id: 'clear-case', name: 'Clear Phone Case', image: unsplash('clear case') },
  ],
  headphones: [
    { id: 'airpods', name: 'AirPods Pro', image: unsplash('airpods') },
    { id: 'sony-wh', name: 'Sony WH-1000XM5', image: unsplash('sony headphones') },
    { id: 'buds', name: 'Wireless Earbuds', image: unsplash('wireless earbuds') },
  ],
  screens: [
    { id: 'oled-screen', name: 'OLED Replacement Screen', image: unsplash('oled screen') },
    { id: 'lcd-screen', name: 'LCD Replacement Screen', image: unsplash('lcd screen') },
  ],
  batteries: [
    { id: 'lithium-battery', name: 'Lithium Phone Battery', image: unsplash('lithium battery') },
    { id: 'external-battery', name: 'External Battery Pack', image: unsplash('external battery') },
  ],
};
