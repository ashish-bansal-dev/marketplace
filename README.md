# Marketplace

A modern e-commerce platform built with Medusa, Next.js, and React, featuring a vendor panel with role-based access control.

## Project Structure

The project is organized into four main applications:

- `backend/`: Medusa backend server
- `admin-panel/`: Admin dashboard (Vite + React)
- `vendor-panel/`: Vendor dashboard (Vite + React)
- `storefront/`: Customer-facing storefront (Next.js)

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- Redis
- Yarn or npm

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd marketplace
```

2. Install dependencies:
```bash
# Install dependencies for each application
cd backend && yarn install
cd ../admin-panel && yarn install
cd ../vendor-panel && yarn install
cd ../storefront && yarn install
```

3. Set up environment variables:
Create `.env` files in each application directory with the following configurations:

### Backend (.env)
```env
DATABASE_URL=postgres://localhost/medusa-store
STORE_CORS=http://localhost:8000
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:9000
JWT_SECRET=supersecret
COOKIE_SECRET=supersecret
REDIS_URL=redis://localhost:6379
```

### Admin Panel (.env)
```env
VITE_MEDUSA_BASE=/admin
VITE_MEDUSA_BACKEND_URL=http://localhost:9000
VITE_MEDUSA_STOREFRONT_URL=http://localhost:8000
```

### Vendor Panel (.env)
```env
VITE_MEDUSA_BASE=/vendor
VITE_MEDUSA_BACKEND_URL=http://localhost:9000
VITE_MEDUSA_STOREFRONT_URL=http://localhost:8000
```

### Storefront (.env)
```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

4. Start the development servers:
```bash
# Start each service in a separate terminal
cd backend && yarn dev
cd admin-panel && yarn dev
cd vendor-panel && yarn dev
cd storefront && yarn dev
```

## Port Configuration

- Backend: 9000
- Admin Panel: 3000/
- Vendor Panel: 3001/
- Storefront: 8000

## Features

### Core Features
- Product Management
- Order Processing
- Customer Management
- Inventory Management
- Payment Processing
- Shipping Integration
- Multi-currency Support
- Multi-region Support

### Dashboard Features
#### Admin Panel
- System-wide management
- Vendor management
- Analytics and reporting
- Settings and configuration

#### Vendor Panel
- Product Management
- Order Management
- Sales Analytics
- Inventory Tracking
- Profile Management
- Performance Metrics

### Role-Based Access Control (RBAC)
- Admin: Full system access and vendor management
- Vendor: Access to vendor panel and own products
- Customer: Access to storefront and personal account
- Support: Access to customer support features

## Development

### Backend Development
The backend is built with Medusa and provides the core e-commerce functionality, including vendor management and RBAC.

### Dashboard Development
The dashboard is built with Vite and React, providing a modern interface for both admin and vendor management. It includes:
- Admin interface for system management
- Vendor interface for product and order management
- Role-based access control
- Analytics and reporting tools

### Storefront Development
The storefront is built with Next.js, offering a fast and SEO-friendly shopping experience for customers.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 