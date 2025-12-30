const categories = [
  {id: '1', name: 'Bridal Makeup'},
  {id: '2', name: 'Baby Shower'},
  {id: '3', name: 'Model Photoshoots'}];

const packages = [
  {id: '1', categoryId: '1', name: 'Silver Glow', price: 12000},
  {id: '2', categoryId: '1', name: 'Gold Radiance', price: 18000},
  {id: '3', categoryId: '1', name: 'Diamond Bridal', price: 25000},
  {id: '4', categoryId: '2', name: 'Silver Glow', price: 10000},
  {id: '5', categoryId: '2', name: 'Gold Radiance', price: 15000},
  {id: '6', categoryId: '3', name: 'Traditional', price: 5000},
  {id: '7', categoryId: '3', name: 'Modern', price: 6000}];

export default {categories, packages};
