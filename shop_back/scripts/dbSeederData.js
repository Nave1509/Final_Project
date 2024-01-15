const usersData = [
  {
    "name": "Jhon Wick",
    "phone": "0501111111",
    "email": "john_wick@gmail.com",
    "password": "Aa123456&",
    "isAdmin": false,
    "image": {
      "url":
        "https://sm.ign.com/t/ign_il/screenshot/default/john-wick4_2zhc.1024.jpg",
      "alt": "Jhon Wick",
    },
  },
  {
    "name": "Israel israeli",
    "phone": "0503333333",
    "email": "israel_israeli@gmail.com",
    "password": "Aa123456&",
    "isAdmin": true,
  },

  {
    "name": "Jane Doe",
    "phone": "0502222222",
    "email": "jane_doe@gmail.com",
    "password": "Aa123456&",
    "isAdmin": false,
  },
];

const productsData = [
  {
    "category": "Fruits and Vegetables",
    "title": "Tomato",
    "price": 5.9,
    "description": "Tomatoes produced in the country",
    "image": {
      "url":
        "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "Lots of red tomatoes",
    },
  },
  {
    "category": "Fruits and Vegetables",
    "title": "Cucumbers",
    "price": 4.9,
    "description": "Fresh green cucumbers",
    "image": {
      "url":
        "https://images.pexels.com/photos/3568039/pexels-photo-3568039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "Lots of green cucumbers",
    },
  },
  {
    "category": "Meats",
    "title": "Angus",
    "price": 95,
    "description": "Butchers slice number 8",
    "image": {
      "url":
        "https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "Butchers slice number 8",
    },
  },
  {
    "category": "Fishs",
    "title": "Fresh salmon",
    "price": 120,
    "description": "Fresh cut salmon fillet",
    "image": {
      "url":
        "https://images.pexels.com/photos/3029526/pexels-photo-3029526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "Fresh cut salmon fillet",
    },
  },
  {
    "category": "wine and alcohol",
    "title": "Semi-dry Merlot",
    "price": 250,
    "description": " semi-dry Merlot wine in the 2014 vintage",
    "image": {
      "url":
        "https://images.pexels.com/photos/2995333/pexels-photo-2995333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "A bottle of semi-dry Merlot wine in the 2018 vintage",
    },
  },
  {
    "category": "Dairy",
    "title": "Yellow cheese",
    "price": 12,
    "description": "Philadelphia yellow cheese 38%",
    "image": {
      "url":
        "https://images.pexels.com/photos/5250399/pexels-photo-5250399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "Cut yellow cheese cubes",
    },
  },
  {
    "category": "Bakery",
    "title": "Whole grain bread",
    "price": 25,
    "description": "100% whole grain bread",
    "image": {
      "url":
        "https://images.pexels.com/photos/4268507/pexels-photo-4268507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "A loaf of wholemeal bread 100% whole grains",
    },
  },
  {
    "category": "Dairy",
    "title": "Brown eggs",
    "price": 18,
    "description": "6 Brown organic eggs",
    "image": {
      "url":
        "https://images.pexels.com/photos/6287227/pexels-photo-6287227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "A pack of 6 brown organic eggs",
    },
  },
  {
    "category": "Bakery",
    "title": "Chocolate donut",
    "price": 25,
    "description": "6 Chocolate donut",
    "image": {
      "url":
        "https://images.pexels.com/photos/7474254/pexels-photo-7474254.jpeg?auto=compress&cs=tinysrgb&w=600",
      "alt": "Chocolate donut",
    },
  },
  {
    "category": "Fish",
    "title": "Mackerel fish",
    "price": 35,
    "description": "5 Mackerel fish",
    "image": {
      "url":
        "https://images.freeimages.com/images/large-previews/4ad/fish-1327650.jpg",
      "alt": "Mackerel fish",
    },
  },
  {
    "category": "Dairy",
    "title": "melted cheese",
    "price": 22,
    "description": "pieces of melted cheese 38%",
    "image": {
      "url":
        "https://images.freeimages.com/images/large-previews/b06/cheese-1460387.jpg",
      "alt": "melted cheese",
    },
  },
  {
    "category": "Meats",
    "title": "Steak",
    "price": 38,
    "description": "Red Meat Steak",
    "image": {
      "url":
        "https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "Red Meat Steak",
    },
  },
  {
    "category": "Fruits and Vegetables",
    "title": "Apple",
    "price": 3.5,
    "description": "Fresh and juicy apples",
    "image": {
      "url":
        "https://images.pexels.com/photos/209439/pexels-photo-209439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "Red apple on a table",
    },
  },
  {
    "category": "Fruits and Vegetables",
    "title": "Banana",
    "price": 2.9,
    "description": "Sweet and nutritious bananas",
    "image": {
      "url":
        "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "Bunch of yellow bananas",
    },
  },
  {
    "category": "Fruits and Vegetables",
    "title": "Carrot",
    "price": 1.8,
    "description": "Fresh and crunchy carrots",
    "image": {
      "url":
        "https://images.pexels.com/photos/1306559/pexels-photo-1306559.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "Close-up of orange carrots",
    },
  },
  {
    "category": "Fruits and Vegetables",
    "title": "Strawberries",
    "price": 6.5,
    "description": "Plump and juicy strawberries",
    "image": {
      "url":
        "https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "Bowl of fresh strawberries",
    },
  },
  {
    "category": "Fruits and Vegetables",
    "title": "Spinach",
    "price": 2.2,
    "description": "Healthy and nutritious spinach leaves",
    "image": {
      "url":
        "https://images.pexels.com/photos/6824475/pexels-photo-6824475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "Bunch of fresh spinach",
    },
  },
  {
    "category": "Fruits and Vegetables",
    "title": "Watermelon",
    "price": 8.9,
    "description": "Sweet and refreshing watermelon slices",
    "image": {
      "url":
        "https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "alt": "Slices of watermelon",
    },
  },
];

module.exports = {
  usersData,
  productsData,
};
