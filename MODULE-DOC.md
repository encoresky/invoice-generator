# Invoice Generator Module Documentation

## Overview
The Invoice Generator is a flexible Node.js module that allows you to generate professional invoices in both HTML and PDF formats. It's designed to be easily integrated into any Node.js application.

## Features

- Multiple invoice themes
- HTML and PDF output
- Customizable templates
- Support for different currencies
- Configurable date formats
- Item options support
- Tax and discount calculations
- Responsive design
- Smart page breaks for PDF generation
- Customizable column widths
- Item options with styled display

## Technical Requirements

### Required Dependencies
- Node.js (v14 or higher)
- TypeScript (v4.5 or higher)
- Express.js (v4.18 or higher) - for web applications

### Optional Dependencies
- Puppeteer (for PDF generation)
- Handlebars (for template rendering)
- Moment.js (for date formatting)

## Installation

```bash
# Using npm
npm install @encoresky/invoice-generator

# Using yarn
yarn add @encoresky/invoice-generator
```

## Basic Usage

```typescript
import { InvoiceGenerator, InvoiceData, InvoiceConfig } from '@encoresky/invoice-generator';

// Create an instance with your configuration
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

The options will be displayed in a smaller font size below the item description, with labels in a slightly bolder weight.

### Page Break Controls

The invoice generator includes smart page break controls to ensure:

1. Each item's complete details (including options) stay together on the same page
2. If an item's details would split across pages, it moves entirely to the next page
3. The totals section stays together on the same page
4. Tax and discount rows stay with their respective sections

### Column Widths

The invoice table uses the following default column widths:

- Description: 45%
- Quantity: 15%
- Unit Price: 20%
- Amount: 20%

These widths can be adjusted by modifying the template styles.

## Themes

The invoice generator comes with several pre-built themes:

- School Fees Theme
- Grocery Store Theme
- E-commerce Theme
- Fashion Store Theme
- Electronics Store Theme
- Gas Station Theme
- Water Bill Theme
- Milk Delivery Theme

You can also create custom themes by implementing the `InvoiceTheme` interface.

## Configuration Options

### Required Configuration
```typescript
interface InvoiceConfig {
  theme: InvoiceTheme;
  companyName: string;
  companyTagline: string;
  logo: string;
  footerText: string;
}
```

### Optional Configuration
```typescript
interface InvoiceTheme {
  primaryColor?: string;    // Default: '#2c3e50'
  secondaryColor?: string;  // Default: '#3498db'
  fontFamily?: string;      // Default: 'Arial, sans-serif'
  fontSize?: string;        // Default: '14px'
  headerColor?: string;     // Default: '#2c3e50'
  textColor?: string;       // Default: '#2c3e50'
  backgroundColor?: string; // Default: '#f5f6fa'
}
```

## Invoice Data Structure

```typescript
interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  vendor: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  customer: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }>;
  subtotal: number;
  taxes: Array<{
    name: string;
    rate: number;
    amount: number;
  }>;
  discounts: Array<{
    name: string;
    type: 'percentage' | 'fixed';
    value: number;
    amount: number;
  }>;
  total: number;
  currency: string;
  notes?: string;
  terms?: string;
}
```

## API Reference

### InvoiceGenerator Class

#### Constructor
```typescript
constructor(config: InvoiceConfig)
```

#### Methods

##### generateHTML
```typescript
generateHTML(invoiceData: InvoiceData, type?: string): Promise<string>
```
Generates an HTML invoice. Returns a promise that resolves to the HTML string.

##### generatePDF
```typescript
generatePDF(invoiceData: InvoiceData, type?: string): Promise<Buffer>
```
Generates a PDF invoice. Returns a promise that resolves to a Buffer containing the PDF data.

## Integration Examples

### Express.js Integration
```typescript
import express from 'express';
import { InvoiceGenerator } from '@encoresky/invoice-generator';

const app = express();
const generator = new InvoiceGenerator({
  // ... configuration
});

app.get('/invoice/:id', async (req, res) => {
  const invoiceData = await getInvoiceData(req.params.id);
  const html = await generator.generateHTML(invoiceData);
  res.send(html);
});

app.get('/invoice/:id/pdf', async (req, res) => {
  const invoiceData = await getInvoiceData(req.params.id);
  const pdf = await generator.generatePDF(invoiceData);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
  res.send(pdf);
});
```

### Custom Template Integration
```typescript
const generator = new InvoiceGenerator({
  // ... configuration
  customTemplate: {
    path: './templates/custom.hbs',
    style: './styles/custom.css'
  }
});
```

## Error Handling

The module throws specific errors that you can catch and handle:

```typescript
try {
  const html = await generator.generateHTML(invoiceData);
} catch (error) {
  if (error instanceof TemplateError) {
    // Handle template-related errors
  } else if (error instanceof PDFGenerationError) {
    // Handle PDF generation errors
  } else {
    // Handle other errors
  }
}
```

## Best Practices

1. Always validate invoice data before generation
2. Use environment variables for sensitive configuration
3. Implement proper error handling
4. Cache generated PDFs for frequently accessed invoices
5. Use appropriate content types and headers when serving invoices

## Performance Considerations

1. PDF generation is CPU-intensive; consider using a worker thread
2. Cache generated invoices when possible
3. Use appropriate compression for HTML/PDF delivery
4. Consider implementing rate limiting for PDF generation

## Security Considerations

1. Validate all input data
2. Sanitize HTML output
3. Implement proper access control
4. Use secure headers when serving invoices
5. Protect sensitive information in invoices
