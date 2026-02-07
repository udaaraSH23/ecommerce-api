# ecommerce-api

A RESTful API for an e-commerce platform built with Node.js, Express, and SQLite.

## Features
- **Product Management:** Create, read, update, and delete products.
- **Cart Management:** Add items to cart, view cart, and clear cart.
- **Wishlist:** specific wishlist management.
- **Order Processing:** Create orders from cart.
- **Review System:** Add and view product reviews.
- **Docker Support:** Containerized application for consistent environments.
- **Kubernetes Ready:** Manifests and Helm charts included for easy deployment.
- **CI/CD Pipeline:** Jenkinsfile provided for automated build and deployment.

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** SQLite (initially), Sequelize ORM
- **Containerization:** Docker
- **Orchestration:** Kubernetes

## Prerequisites
- **Node.js**: v18 or higher recommended
- **npm**: Package manager
- **Docker**: Optional, for containerized running
- **Kubernetes Cluster**: Optional, for k8s deployment (e.g., Minikube, K3s)
- **Helm**: Optional, for chart deployment

## Getting Started

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/udaaraSH23/ecommerce-api.git
    cd ecommerce-api
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Configuration
Create a `.env` file in the root directory (optional, defaults are provided in the code for development).

### Database Seeding
To seed the database with initial data:
```bash
node populateDB.js
```
This will create `database.sqlite` and populate it with sample products.

### Running Locally
Start the development server:
```bash
npm run dev
```
Or start the production server:
```bash
npm start
```
The server will run on `http://localhost:3333` (or the PORT defined in your env).

## API Endpoints
-   **Products:** `GET /api/products`
-   **Cart:** `POST /api/cart`, `GET /api/cart`
-   **Orders:** `POST /api/orders`
-   **Wishlist:** `POST /api/wishlist`
-   **Reviews:** `POST /api/reviews`

## Docker Support

### Build Image
```bash
docker build -t ecommerce-api .
```

### Run Container
```bash
docker run -p 3333:3333 ecommerce-api
```
Access the API at `http://localhost:3333`.

## Kubernetes Deployment

### Using Manifests
Apply the standard Kubernetes manifests located in the `kubernetes/` directory:
```bash
kubectl apply -f kubernetes/
```

### Using Helm Charts
The Helm chart is located in the `ecommerce-api/` directory.

**Install:**
```bash
helm install ecommerce-api ./ecommerce-api
```

**Upgrade:**
```bash
helm upgrade ecommerce-api ./ecommerce-api
```

## CI/CD Pipeline (Jenkins)
A `Jenkinsfile` is included for automated CI/CD.

**Pipeline Stages:**
1.  **Build Docker Image:** Builds the image with tag `latest`.
2.  **Push to Docker Hub:** Pushes to Docker Hub (requires credentials).
3.  **Deploy to Kubernetes:** Applies manifests to the cluster.
4.  **Verify Deployment:** Checks pod and service status.

**Parameters:**
-   `BUILD_IMAGE`: Toggle Docker build (Default: true)
-   `PUSH_IMAGE`: Toggle Docker push (Default: true)
-   `DEPLOY_K8S`: Toggle K8s deployment (Default: true)
-   `VERIFY_DEPLOYMENT`: Toggle verification (Default: true)
