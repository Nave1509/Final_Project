# M & N Market

This is an e-commerce store for the sale of food products.
This site was built in React.js for developing the Frontend, and Node.js or developing the Backend, the information is stored in the MongoDB database .

## running the project

- Installing node.js version 18.16.1 globally (for determining installation and version, you can run "node -v" in the console).
- Installing MongoDB.
- Download the project (both folders shop_back and shop_front) into one folder.

## Server Side

1. Change the ".env.example" file to ".env" and enter the various variables (if needed). Delete all variables which are not needed.
   Default values for various variables, used in the project, can be found under config->default.json.

1. Open the terminal, and go to "/shop_back", and type

```
npm i
```

to install the node_modules folder that contains all the required libraries for the server.

2.  type

```
npm run dev
```

To run the server for development purposes.

### Seeding the DB

1. The seeding process empties all collections (products,users) before inserting the data.
1. The seeding process inserts 4 Users (regular, admin) including their carts, and 20 Products.
1. The seeded data can be changed in scripts->dbSeederData.

For seeding the DB.

go to "/shop_back" , and type

```
npm run seed-db
```

### FRONT

- The client side is built in React.js (create-react-app).
- it uses Bootstrap and Bootstrap icons for general structure and basic responsiveness.
- The site offers 2 display options, a Dark Mode and a Light Mode, and for that I used bootstrap.

For production

1. Open the terminal, go to "/shop_front", and type

```
npm i
```

to install the node_modules folder that contains all the required libraries for the server.

2.  type

```
npm run start
```

to view the live website.

### Components

#### General Components

General Components are located in "components/general and consist of:

- about: about page.
- aboutMenu: About page menu.
- footer: the footer.
- header: the header.
- home: the main page containing all the components.
- mainMenu: main page menu.
- signIn: sign in form.
- signOut: sign out useEffect.
- signUp: sign up form.

#### Product Components

General Components are located in "components/products and consist of:

- cartProduct: single product in cart.
- product: single product in the main/products view.
- productCreate: create Product form.
- productDelete: delete product useEffect.
- productEdit: edit product form.
- Products: All products.
- productView: single product view.

#### Common Components

Common Components are located in "components/common" and consist of:

- input: text input.
- pageHeader:title and description of the page.
- protectedRoute: used to protect User routes.
- title: store title.

### Client General Information

- Most functions share states and are calling each other, and therefor they are located in the context component (src/context/store.context.jsx).
- Http services (general, users, products, cart) functions are located in the "services" folder.
- Css files are located in "css" Folder.

### Client Libraries

- "@babel/plugin-proposal-private-property-in-object": react library,
- "@testing-library/jest-dom": react library,
- "@testing-library/react": react library,
- "@testing-library/user-event": react library,
- "axios": http requests,
- "bootstrap": visual general structure,
- "bootstrap-icons": icons,
- "formik": forms,
- "joi": validation,
- "react": main library,
- "react-dom": react library,
- "react-router-dom": routing,
- "react-scripts": react library,
- "react-toastify": alert messages,
- "web-vitals": react library

## Server Side

### Server Description

The server side to manage the operations and processing of the data, access to a database, and provide display and information on the client side
It includes various features for managing users, and products.
It is built with node.js.

### Routes and Models

#### User

##### User Routes

| No. | URL          | method | action                  | Authorization         | return on Success |
| --- | ------------ | ------ | ----------------------- | --------------------- | ----------------- |
| 1.  | /users       | POST   | Create New User/Sign Up | all                   | New User          |
| 2.  | /users/login | POST   | Login / Sign In         | all                   | json web token    |
| 3.  | /users       | GET    | Get Users               | admin                 | Array of Users    |
| 4.  | /users/me    | GET    | Get Logged-In User / Me | Current User or admin | The User          |
| 4.  | /users/:id   | GET    | GGet User by Id         | admin                 | User              |
| 5.  | /users/:id   | PUT    | Edit User               | Current User / Admin  | User              |
| 7.  | /users/:id   | DELETE | Delete User             | Current User / Admin  | Deleted User      |

##### User Model/Scheme

```
 {
    name: {
      type: Object,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    phone: {
      type: String,
      default: "",
      minlength: 0,
      maxlength: 10,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    image: {
      url: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        minlength: 11,
        maxlength: 1024,
      },
      alt: {
        type: String,
        minlength: 6,
        maxlength: 255,
        default: "User Image",
      },
      _id: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId(),
      },
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        amount: {
          type: Number,
          min: 0,
        },
      },
    ],
  },
```

##### User Minimum Input

```
{
    "name":"John Doe",
    "email":"john@doe.net",
    "password":"123456",
}
```

#### Product

##### Product Routes

| No. | URL              | method | action               | Authorization           | return on Success |
| --- | ---------------- | ------ | -------------------- | ----------------------- | ----------------- |
| 1.  | /products        | POST   | Create New Product   | admin                   | New Product       |
| 2.  | /products        | GET    | Get all Products     | all                     | Array of Products |
| 3.  | /products/:id    | GET    | Get Product by Id    | Registered User / Admin | Product           |
| 4.  | /products/:id    | PUT    | Edit Product         | admin                   | Product           |
| 4.  | /products/:id    | DELETE | Delete Product       | admin                   | Deleted Product   |
| 5.  | /products/search | GET    | search Product       | all                     | Products          |
| 7.  | /products/filter | GET    | Get filtered product | all                     | Products          |

##### Product Model/Scheme

```
{
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  category: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  productAccordingTo: {
    type: String,
    minlength: 2,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  image: {
    url: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_1280.jpg",
      minlength: 0,
      maxlength: 1024,
    },
    alt: {
      type: String,
      minlength: 0,
      maxlength: 255,
      default: "Product Image",
    },
  },
}
```

##### Product Minimum Input

```
{
    "title": "{string of words and spaces}",
    "category": "{string}",
    "price": {number},
    "productAccordingTo": "KG","Units",
    "description": "description of product",
}
```

### Server Libraries

- "bcrypt" : password encryption
- "chalk" : adding color to your console.
- "config" : various configuration variables (including environment variables);
- "cors" : for handling cors.
- "dotenv" : injecting environment variables.
- "express" : managing routes and requests.
- "joi" : validation.
- "jsonwebtoken" : creating user token.
- "lodash" : for easy functionality.
- "mongoose" : connecting to and managing MongoDB database.
- "morgan" : logging requests to the console.

## Happy shopping 😊
