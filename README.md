# Beer E-Commerce Frontend

This is the frontend application for the Beer E-Commerce challenge. It includes a Product Listing Page (PLP) and a Product Details Page (PDP).

## Prerequisites

- Node.js (latest version)

## Installation

1. Clone this repository
2. Navigate to the frontend directory:
   ```
   cd frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To start the development server, run:

```
npm start
```

The application will be available at `http://localhost:3000` by default.

## Pages

1. Product Listing Page (PLP):
   - URL: `/products`
   - Displays a list of all available products

2. Product Details Page (PDP):
   - URL: `/product/:productId-:productBrand`
   - Displays detailed information for a specific product
   - Updates stock and price information every 5 seconds

## Building for Production

To create a production build, run:

```
npm run build
```

## Testing

To run the test suite, use:

```
npm test
```

## Additional Notes

- The application is designed for mobile devices.
- Error messages are displayed using `Window.alert()`.
- Unimplemented features (e.g., "Add to cart") will display relevant information using `Window.alert()`.