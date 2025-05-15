export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface Contact {
  name: string;
  email?: string;
  phone?: string;
  address: Address;
}

export interface InvoiceItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  taxRate?: number;
  discount?: number;
  total: number;
  amount: number;
  options?: {
    [key: string]: string | number;
  };
}

export interface Tax {
  name: string;
  rate: number;
  amount: number;
}

export interface Discount {
  type: 'percentage' | 'fixed';
  value: number;
  description?: string;
  amount: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate?: string;
  vendor: Contact;
  customer: Contact;
  items: InvoiceItem[];
  subtotal: number;
  taxes: Tax[];
  discounts: Discount[];
  total: number;
  currency: string;
  notes?: string;
  terms?: string;
}

export interface InvoiceTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: string;
  headerColor: string;
  textColor: string;
  backgroundColor: string;
}

export interface InvoiceConfig {
  theme: InvoiceTheme;
  logo?: string;
  companyName: string;
  companyTagline?: string;
  footerText?: string;
  dateFormat?: string;
}

export interface InvoiceGenerator {
  generateHTML(invoiceData: InvoiceData, type?: string, config?: InvoiceConfig): Promise<string>;
  generatePDF(invoiceData: InvoiceData, type?: string, config?: InvoiceConfig): Promise<Buffer>;
  updateConfig(newConfig: Partial<InvoiceConfig>): void;
} 