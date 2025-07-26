# Silva Ferrea Properties - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Response Format

All API responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

Error responses:
```json
{
  "success": false,
  "error": "Error message",
  "details": "Optional error details"
}
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "OWNER"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "OWNER",
      "createdAt": "2023-12-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST /auth/login
Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "OWNER"
    },
    "token": "jwt_token_here"
  }
}
```

#### GET /auth/me
Get current user profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "OWNER",
    "isActive": true,
    "createdAt": "2023-12-01T00:00:00.000Z",
    "updatedAt": "2023-12-01T00:00:00.000Z"
  }
}
```

### Properties

#### GET /properties
Get all properties for the authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "property_id",
      "name": "Villa Solna",
      "address": "Solna väg 123, 171 65 Solna",
      "purchasePrice": "2500000.00",
      "acquisitionDate": "2023-01-15T00:00:00.000Z",
      "currentMarketValue": "2750000.00",
      "size": "120.50",
      "numberOfRooms": 4,
      "amenities": ["Balcony", "Garden", "Parking"],
      "ownershipShare": "100.00",
      "status": "ACTIVE",
      "tenants": [...],
      "loans": [...],
      "_count": {
        "transactions": 5,
        "maintenanceEvents": 2
      }
    }
  ]
}
```

#### GET /properties/:id
Get a specific property by ID.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "property_id",
    "name": "Villa Solna",
    "address": "Solna väg 123, 171 65 Solna",
    "purchasePrice": "2500000.00",
    "acquisitionDate": "2023-01-15T00:00:00.000Z",
    "currentMarketValue": "2750000.00",
    "size": "120.50",
    "numberOfRooms": 4,
    "amenities": ["Balcony", "Garden", "Parking"],
    "ownershipShare": "100.00",
    "status": "ACTIVE",
    "tenants": [
      {
        "id": "tenant_id",
        "firstName": "Anna",
        "lastName": "Andersson",
        "status": "ACTIVE",
        "rentPayments": [...]
      }
    ],
    "loans": [
      {
        "id": "loan_id",
        "bankName": "SEB",
        "loanAmount": "2000000.00",
        "interestRate": "0.0350",
        "monthlyPayment": "8500.00",
        "remainingBalance": "1950000.00"
      }
    ],
    "transactions": [...],
    "maintenanceEvents": [...],
    "documents": [...]
  }
}
```

#### POST /properties
Create a new property.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "New Property",
  "address": "Property Address",
  "purchasePrice": 2000000,
  "acquisitionDate": "2023-12-01T00:00:00.000Z",
  "currentMarketValue": 2200000,
  "size": 100.5,
  "numberOfRooms": 3,
  "amenities": ["Balcony", "Parking"],
  "ownershipShare": 100
}
```

#### PUT /properties/:id
Update a property.

**Headers:** `Authorization: Bearer <token>`

**Request Body:** (Same as POST, but all fields optional)

#### DELETE /properties/:id
Delete a property.

**Headers:** `Authorization: Bearer <token>`

### Tenants

#### GET /tenants
Get all tenants for the authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "tenant_id",
      "firstName": "Anna",
      "lastName": "Andersson",
      "email": "anna@example.com",
      "phone": "+46 70 123 4567",
      "rentAmount": "15000.00",
      "deposit": "30000.00",
      "contractStartDate": "2023-02-01T00:00:00.000Z",
      "contractEndDate": "2024-01-31T00:00:00.000Z",
      "status": "ACTIVE",
      "property": {
        "id": "property_id",
        "name": "Villa Solna"
      }
    }
  ]
}
```

#### POST /tenants
Create a new tenant.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+46 70 987 6543",
  "rentAmount": 12000,
  "deposit": 24000,
  "contractStartDate": "2024-01-01T00:00:00.000Z",
  "contractEndDate": "2024-12-31T00:00:00.000Z",
  "propertyId": "property_id"
}
```

### Transactions

#### GET /transactions
Get all transactions for the authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `propertyId` (optional): Filter by property
- `category` (optional): Filter by transaction category
- `startDate` (optional): Filter from date
- `endDate` (optional): Filter to date

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "transaction_id",
      "date": "2023-12-01T00:00:00.000Z",
      "amount": "15000.00",
      "category": "RENT_INCOME",
      "description": "Rent payment from Anna Andersson",
      "receiptPath": "/uploads/receipts/receipt.pdf",
      "property": {
        "id": "property_id",
        "name": "Villa Solna"
      }
    }
  ]
}
```

#### POST /transactions
Create a new transaction.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "date": "2023-12-01T00:00:00.000Z",
  "amount": 15000,
  "category": "RENT_INCOME",
  "description": "Rent payment",
  "propertyId": "property_id"
}
```

### Maintenance

#### GET /maintenance
Get all maintenance events for the authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `propertyId` (optional): Filter by property
- `status` (optional): Filter by status
- `category` (optional): Filter by category

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "maintenance_id",
      "taskName": "Plumbing Repair",
      "category": "Plumbing",
      "status": "COMPLETED",
      "costEstimate": "2500.00",
      "actualCost": "2500.00",
      "contractorName": "FastighetsService AB",
      "contractorPhone": "+46 8 123 4567",
      "description": "Fixed leaking faucet",
      "scheduledDate": "2023-12-10T00:00:00.000Z",
      "completedDate": "2023-12-10T00:00:00.000Z",
      "property": {
        "id": "property_id",
        "name": "Villa Solna"
      }
    }
  ]
}
```

#### POST /maintenance
Create a new maintenance event.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "taskName": "Electrical Repair",
  "category": "Electrical",
  "status": "PLANNED",
  "costEstimate": 1500,
  "contractorName": "ElectroService AB",
  "contractorPhone": "+46 8 987 6543",
  "description": "Replace faulty outlet",
  "scheduledDate": "2024-01-15T00:00:00.000Z",
  "propertyId": "property_id"
}
```

### Documents

#### GET /documents
Get all documents for the authenticated user.

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `propertyId` (optional): Filter by property
- `type` (optional): Filter by document type

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "document_id",
      "title": "Insurance Policy",
      "type": "INSURANCE",
      "filePath": "/uploads/documents/insurance.pdf",
      "fileSize": 1024000,
      "mimeType": "application/pdf",
      "uploadDate": "2023-12-01T00:00:00.000Z",
      "property": {
        "id": "property_id",
        "name": "Villa Solna"
      }
    }
  ]
}
```

#### POST /documents
Upload a new document.

**Headers:** `Authorization: Bearer <token>`

**Request Body:** `multipart/form-data`
- `file`: The document file
- `title`: Document title
- `type`: Document type
- `propertyId` (optional): Associated property
- `tenantId` (optional): Associated tenant
- `maintenanceEventId` (optional): Associated maintenance event

### Dashboard

#### GET /dashboard
Get dashboard analytics and metrics.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalProperties": 2,
    "totalValue": "4700000.00",
    "totalEquity": "2750000.00",
    "monthlyRentIncome": "27000.00",
    "monthlyExpenses": "14700.00",
    "netMonthlyCashFlow": "12300.00",
    "properties": [
      {
        "id": "property_id",
        "name": "Villa Solna",
        "currentValue": "2750000.00",
        "equity": "800000.00",
        "monthlyRent": "15000.00",
        "monthlyExpenses": "8500.00"
      }
    ],
    "recentTransactions": [...],
    "upcomingMaintenance": [...],
    "overdueRent": [...]
  }
}
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 422 | Unprocessable Entity - Validation error |
| 500 | Internal Server Error - Server error |

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- 100 requests per 15 minutes per IP address
- Rate limit headers included in responses

## File Upload

### Supported File Types
- Images: JPG, PNG, GIF, WebP
- Documents: PDF, DOC, DOCX
- Maximum file size: 10MB

### File Storage
Files are stored locally in the `uploads` directory with the following structure:
```
uploads/
├── documents/
├── receipts/
└── maintenance/
```

## Pagination

List endpoints support pagination with the following query parameters:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

**Response format:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

## Filtering and Sorting

Many endpoints support filtering and sorting:

### Filtering
Use query parameters to filter results:
```
GET /properties?status=ACTIVE&size_min=100
```

### Sorting
Use `sort` and `order` parameters:
```
GET /properties?sort=createdAt&order=desc
```

## Webhooks (Future)

Planned webhook support for:
- New tenant registrations
- Rent payment received
- Maintenance events
- Document uploads

## API Versioning

API versioning is planned for future releases:
```
/api/v1/properties
/api/v2/properties
``` 