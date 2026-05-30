const mongoose = require('mongoose');
const Pizza = require('./models/Pizza');
require('dotenv').config();

const pizzas = [
  {
    name: 'Margherita Classic',
    description: 'Fresh tomato sauce, mozzarella cheese, and fragrant basil leaves on a crispy crust.',
    price: 299,
    category: 'Veg',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500',
    isAvailable: true
  },
  {
    name: 'Pepperoni Feast',
    description: 'Loaded with premium pepperoni slices, mozzarella and zesty tomato sauce.',
    price: 399,
    category: 'Non-Veg',
    imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
    isAvailable: true
  },
  {
    name: 'BBQ Chicken',
    description: 'Smoky BBQ sauce, grilled chicken, red onions and mozzarella cheese.',
    price: 449,
    category: 'Non-Veg',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    isAvailable: true
  },
  {
    name: 'Veggie Supreme',
    description: 'Bell peppers, mushrooms, olives, onions and tomatoes on a herb-infused base.',
    price: 349,
    category: 'Veg',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
    isAvailable: true
  },
  {
    name: 'Paneer Tikka',
    description: 'Spiced paneer, capsicum, onion and tandoori sauce — an Indian classic.',
    price: 379,
    category: 'Veg',
    imageUrl: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=500',
    isAvailable: true
  },
  {
    name: 'Chicken Tikka',
    description: 'Tandoori chicken, onions, capsicum and mint chutney on a spicy tomato base.',
    price: 429,
    category: 'Non-Veg',
    imageUrl: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500',
    isAvailable: true
  },
  {
    name: 'Four Cheese',
    description: 'Mozzarella, cheddar, parmesan and gouda — a cheese lover\'s dream.',
    price: 469,
    category: 'Specialty',
    imageUrl: 'https://images.unsplash.com/photo-1548369937-47519962c11a?w=500',
    isAvailable: true
  },
  {
    name: 'Mushroom Truffle',
    description: 'Wild mushrooms, truffle oil, garlic and fresh thyme on a white sauce base.',
    price: 499,
    category: 'Specialty',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500',
    isAvailable: true
  },
  {
    name: 'Spicy Buffalo',
    description: 'Buffalo chicken, jalapeños, red onion and blue cheese drizzle.',
    price: 449,
    category: 'Non-Veg',
    imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=500',
    isAvailable: true
  },
  {
    name: 'Garden Fresh',
    description: 'Spinach, cherry tomatoes, feta cheese and olives on olive oil base.',
    price: 329,
    category: 'Veg',
    imageUrl: 'https://images.unsplash.com/photo-1561303087-b68be0f69fdf?w=500',
    isAvailable: true
  },
  {
    name: 'Meat Lovers',
    description: 'Pepperoni, sausage, bacon, ham and ground beef — the ultimate meat pizza.',
    price: 549,
    category: 'Non-Veg',
    imageUrl: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=500',
    isAvailable: true
  },
  {
    name: 'Pesto Delight',
    description: 'Basil pesto, sun-dried tomatoes, pine nuts and fresh mozzarella.',
    price: 419,
    category: 'Specialty',
    imageUrl: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=500',
    isAvailable: true
  }
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Pizza.deleteMany({});
  await Pizza.insertMany(pizzas);
  console.log('✅ 12 Pizzas added successfully!');
  mongoose.disconnect();
};

seed().catch(console.error);