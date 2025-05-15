export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  options?: {
    [key: string]: string | number;
  };
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  vendor: {
    name: string;
    address: Address;
    phone: string;
    email: string;
  };
  customer: {
    name: string;
    address: Address;
    phone: string;
    email: string;
  };
  items: InvoiceItem[];
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

export interface InvoiceConfig {
  theme: InvoiceTheme;
  companyName: string;
  companyTagline: string;
  logo: string;
  footerText: string;
  dateFormat?: string;
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