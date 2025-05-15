import { InvoiceGenerator } from './InvoiceGenerator';
import { InvoiceData, InvoiceConfig } from './types/invoice.types';

// Example configuration
const config: InvoiceConfig = {
    companyName: 'Acme Corporation',
    companyTagline: 'Your Trusted Partner',
    logo: 'https://example.com/logo.png',
    footerText: 'Thank you for your business!',
    theme: {
        primaryColor: '#2c3e50',
        secondaryColor: '#7f8c8d',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        headerColor: '#34495e',
        textColor: '#2c3e50',
        backgroundColor: '#f5f6fa'
    }
};

// Example invoice data
const invoiceData: InvoiceData = {
    invoiceNumber: 'INV-2024-001',
    date: '2024-02-20',
    dueDate: '2024-03-20',
    vendor: {
        name: 'Acme Corporation',
        email: 'billing@acme.com',
        phone: '+1 (555) 123-4567',
        address: {
            street: '123 Business Ave',
            city: 'New York',
            state: 'NY',
            postalCode: '10001',
            country: 'USA'
        }
    },
    customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 987-6543',
        address: {
            street: '456 Customer St',
            city: 'Los Angeles',
            state: 'CA',
            postalCode: '90001',
            country: 'USA'
        }
    },
    items: [
        {
            id: '1',
            name: 'Web Development',
            description: 'Website redesign and development',
            quantity: 1,
            unitPrice: 5000,
            total: 5000,
            amount: 5000
        },
        {
            id: '2',
            name: 'Hosting',
            description: 'Annual hosting package',
            quantity: 1,
            unitPrice: 1200,
            total: 1200,
            amount: 1200
        }
    ],
    subtotal: 6200,
    taxes: [
        {
            name: 'VAT',
            rate: 20,
            amount: 1240
        }
    ],
    discounts: [
        {
            type: 'percentage',
            value: 10,
            description: 'Loyalty discount',
            amount: 620
        }
    ],
    total: 6820,
    currency: 'USD',
    notes: 'Payment is due within 30 days. Please include invoice number in your payment reference.',
    terms: 'All work is guaranteed for 90 days from completion date.'
};

// Create invoice generator instance
const generator = new InvoiceGenerator(config);

// Generate and save invoice
async function generateInvoice() {
    try {
        // Generate HTML
        const html = await generator.generateHTML(invoiceData);
        console.log('HTML invoice generated successfully');

        // Generate PDF
        const pdf = await generator.generatePDF(invoiceData);
        console.log('PDF invoice generated successfully');

        // Save files (in a real application, you might want to save these to disk or send them via email)
        console.log('HTML length:', html.length);
        console.log('PDF length:', pdf.length);
    } catch (error) {
        console.error('Error generating invoice:', error);
    }
}

// Run the example
generateInvoice(); 