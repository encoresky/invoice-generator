# Invoice Generator

A flexible and customizable invoice generator that supports multiple themes and formats.

## Features

- Multiple invoice themes
- HTML and PDF output
- Customizable templates
- Support for different currencies
- Configurable date formats
- Item options support
- Tax and discount calculations
- Responsive design

## Installation

```bash
npm install @encoresky/invoice-generator
```

## Usage

```typescript
import { InvoiceGenerator, InvoiceData, InvoiceConfig } from '@encoresky/invoice-generator';

// Create an invoice generator instance
const generator = new InvoiceGenerator({
    theme: {
        primaryColor: '#2c3e50',
        secondaryColor: '#3498db',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        headerColor: '#2c3e50',
        textColor: '#2c3e50',
        backgroundColor: '#f5f6fa'
    },
    companyName: 'Your Company',
    companyTagline: 'Your Tagline',
    logo: 'path/to/logo.png',
    footerText: 'Thank you for your business!',
    dateFormat: 'YYYY-MM-DD' // Optional: Configure date format
});

// Generate invoice data
const invoiceData: InvoiceData = {
    invoiceNumber: 'INV-001',
    date: '2024-03-20',
    dueDate: '2024-04-20',
    vendor: {
        name: 'Your Company',
        address: {
            street: '123 Business St',
            city: 'City',
            state: 'State',
            country: 'Country',
            postalCode: '12345'
        },
        phone: '+1234567890',
        email: 'contact@yourcompany.com'
    },
    customer: {
        name: 'Customer Name',
        address: {
            street: '456 Customer St',
            city: 'City',
            state: 'State',
            country: 'Country',
            postalCode: '12345'
        },
        phone: '+0987654321',
        email: 'customer@email.com'
    },
    items: [
        {
            description: 'Item Description',
            quantity: 1,
            unitPrice: 100,
            amount: 100,
            options: {
                color: 'Red',
                size: 'Large'
            }
        }
    ],
    subtotal: 100,
    taxes: [
        {
            name: 'Sales Tax',
            rate: 8.875,
            amount: 8.88
        }
    ],
    discounts: [
        {
            name: 'Loyalty Discount',
            type: 'percentage',
            value: 10,
            amount: 10
        }
    ],
    total: 98.88,
    currency: 'USD',
    notes: 'Thank you for your business!',
    terms: 'Net 30'
};

// Generate HTML invoice
const html = await generator.generateHTML(invoiceData);

// Generate PDF invoice
const pdf = await generator.generatePDF(invoiceData);
```

## Configuration

### InvoiceConfig

```typescript
interface InvoiceConfig {
    theme: InvoiceTheme;
    companyName: string;
    companyTagline: string;
    logo: string;
    footerText: string;
    dateFormat?: string; // Optional: Configure date format (default: 'YYYY-MM-DD')
}
```

### Date Formats

The invoice generator supports various date formats using the Moment.js format strings. Some common formats:

- `YYYY-MM-DD` - 2024-03-20
- `DD/MM/YYYY` - 20/03/2024
- `MM/DD/YYYY` - 03/20/2024
- `MMMM D, YYYY` - March 20, 2024
- `D MMMM YYYY` - 20 March 2024

You can configure the date format in the `InvoiceConfig` object. If not specified, it defaults to `YYYY-MM-DD`.

### Item Options

Each invoice item can include optional attributes using the `options` property:

```typescript
{
    description: 'Product Name',
    quantity: 1,
    unitPrice: 100,
    amount: 100,
    options: {
        color: 'Red',
        size: 'Large',
        material: 'Cotton',
        // ... any other attributes
    }
}
```
