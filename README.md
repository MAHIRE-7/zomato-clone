# Zomato Clone - Microservices Architecture

A minimal food delivery application built with microservices architecture.

## Architecture

- **Frontend** (Port 3000) - React UI matching Zomato design
- **API Gateway** (Port 8000) - Routes requests to services
- **User Service** (Port 3001) - Authentication & user management
- **Restaurant Service** (Port 3002) - Restaurant listings & menu
- **Order Service** (Port 3003) - Order processing
- **MongoDB** (Port 27017) - Database

## Quick Start

1. **Prerequisites**: Docker and Docker Compose installed

2. **Run the application**:
   ```bash
   npm run dev
   ```

3. **Access the application**: 
   - **Frontend UI**: http://localhost:3000
   - **API Gateway**: http://localhost:8000

## API Endpoints

### User Service (via /api/users)
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/profile/:id` - Get user profile

### Restaurant Service (via /api/restaurants)
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `POST /api/restaurants` - Add restaurant
- `GET /api/restaurants/search/:query` - Search restaurants

### Order Service (via /api/orders)
- `POST /api/orders` - Create order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id/status` - Update order status

### Sample Requests (API)

### Register User
```bash
curl -X POST http://localhost:8000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Add Restaurant
```bash
curl -X POST http://localhost:8000/api/restaurants \
  -H "Content-Type: application/json" \
  -d '{"name":"Pizza Palace","cuisine":"Italian","address":"123 Main St","menu":[{"name":"Margherita Pizza","price":12.99,"category":"Pizza"}]}'
```

### Create Order
```bash
curl -X POST http://localhost:8000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId":"USER_ID","restaurantId":"RESTAURANT_ID","items":[{"name":"Pizza","price":12.99,"quantity":1}],"totalAmount":12.99,"deliveryAddress":"456 Oak St"}'
```

## UI Features

- **Zomato-style Design**: Red theme, modern cards, responsive layout
- **Restaurant Discovery**: Browse and search restaurants
- **User Authentication**: Login/Register functionality
- **Menu Browsing**: View restaurant menus with prices
- **Cart & Ordering**: Add items to cart and place orders
- **Responsive Design**: Works on desktop and mobile

## Development

- Each service runs independently
- MongoDB stores all data
- Services communicate via HTTP
- Docker containers for easy deployment

## Stop Application
```bash
npm run stop
```