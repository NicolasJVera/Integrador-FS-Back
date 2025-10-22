# API Endpoints

## Auth
- **POST /auth/register**: Registra usuario. Body: { nombre, correo, clave }.
- **POST /auth/login**: Inicia sesión. Body: { correo, clave }.
- **GET /auth/me**: Obtiene usuario autenticado. Headers: Authorization: Bearer <token>.

## Products
- **GET /products**: Lista productos.
- **GET /products/:id**: Detalle de producto.

## Orders
- **POST /orders**: Crea orden. Body: { items, shippingDetails, shippingCost }. Headers: Authorization: Bearer <token>.
- **GET /orders**: Lista órdenes del usuario. Headers: Authorization: Bearer <token>.