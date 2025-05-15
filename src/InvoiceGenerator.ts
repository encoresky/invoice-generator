import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { InvoiceData, InvoiceConfig, InvoiceGenerator as IInvoiceGenerator } from './types/invoice.types';
import moment from 'moment';
import puppeteer from 'puppeteer';

export class InvoiceGenerator implements IInvoiceGenerator {
    private template: HandlebarsTemplateDelegate;
    private config: InvoiceConfig;

    constructor(config: InvoiceConfig) {
        this.config = config;
        this.template = this.initializeTemplate();
        this.registerHelpers();
    }

    public updateConfig(newConfig: Partial<InvoiceConfig>): void {
        this.config = { ...this.config, ...newConfig };
        // Re-register helpers to update the date format
        this.registerHelpers();
    }

    private initializeTemplate(): HandlebarsTemplateDelegate {
        try {
            const templatePath = path.join(__dirname, 'templates', 'invoice.hbs');
            const templateContent = fs.readFileSync(templatePath, 'utf-8');
            return Handlebars.compile(templateContent);
        } catch (error) {
            console.error('Error initializing template:', error);
            throw new Error('Failed to initialize invoice template');
        }
    }

    private registerHelpers(): void {
        Handlebars.registerHelper('formatCurrency', (value: number, currency: string) => {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency
            }).format(value);
        });

        Handlebars.registerHelper('formatDate', (date: string, context: any) => {
            const format = context.data.root.config?.dateFormat || 'YYYY-MM-DD';
            console.log('Formatting date:', date, 'with format:', format);
            return moment(date).format(format);
        });

        Handlebars.registerHelper('eq', (v1: any, v2: any) => {
            return v1 === v2;
        });
    }

    private validateInvoiceData(data: InvoiceData): void {
        if (!data.invoiceNumber) throw new Error('Invoice number is required');
        if (!data.date) throw new Error('Invoice date is required');
        if (!data.vendor) throw new Error('Vendor information is required');
        if (!data.customer) throw new Error('Customer information is required');
        if (!data.items || data.items.length === 0) throw new Error('At least one item is required');
    }

    private formatCurrency(amount: number, currency: string): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    public async generateHTML(invoiceData: InvoiceData, type?: string, config?: InvoiceConfig): Promise<string> {
        try {
            this.validateInvoiceData(invoiceData);
            console.log('Generator config:', this.config);
            console.log('Passed config:', config);
            console.log('Using config:', config || this.config);

            const templateData = {
                ...invoiceData,
                formattedSubtotal: this.formatCurrency(invoiceData.subtotal, invoiceData.currency),
                formattedTotal: this.formatCurrency(invoiceData.total, invoiceData.currency),
                config: config || this.config,
                type: type || 'default'
            };

            return this.template(templateData);
        } catch (error) {
            console.error('Error generating HTML:', error);
            throw new Error('Failed to generate HTML invoice');
        }
    }

    public async generatePDF(invoiceData: InvoiceData, type?: string, config?: InvoiceConfig): Promise<Buffer> {
        try {
            // Generate HTML first
            const html = await this.generateHTML(invoiceData, type, config);
            
            // Launch puppeteer
            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            
            // Create a new page
            const page = await browser.newPage();
            
            // Set content
            await page.setContent(html, {
                waitUntil: 'networkidle0'
            });
            
            // Generate PDF
            const pdf = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: {
                    top: '20px',
                    right: '20px',
                    bottom: '20px',
                    left: '20px'
                }
            });
            
            // Close browser
            await browser.close();
            
            return pdf;
        } catch (error) {
            console.error('Error generating PDF:', error);
            throw new Error('Failed to generate PDF');
        }
    }
} 