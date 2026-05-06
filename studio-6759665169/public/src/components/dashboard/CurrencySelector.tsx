"use client"

import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export type Currency = {
  symbol: string;
  code: string;
  label: string;
};

export const CURRENCIES: Currency[] = [
  { code: 'PKR', symbol: 'Rs', label: 'Pakistani Rupee' },
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'Fr', label: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', label: 'Chinese Yuan' },
  { code: 'HKD', symbol: 'HK$', label: 'Hong Kong Dollar' },
  { code: 'NZD', symbol: 'NZ$', label: 'New Zealand Dollar' },
  { code: 'SEK', symbol: 'kr', label: 'Swedish Krona' },
  { code: 'KRW', symbol: '₩', label: 'South Korean Won' },
  { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar' },
  { code: 'NOK', symbol: 'kr', label: 'Norwegian Krone' },
  { code: 'MXN', symbol: '$', label: 'Mexican Peso' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
  { code: 'RUB', symbol: '₽', label: 'Russian Ruble' },
  { code: 'ZAR', symbol: 'R', label: 'South African Rand' },
  { code: 'TRY', symbol: '₺', label: 'Turkish Lira' },
  { code: 'BRL', symbol: 'R$', label: 'Brazilian Real' },
  { code: 'TWD', symbol: 'NT$', label: 'New Taiwan Dollar' },
  { code: 'DKK', symbol: 'kr', label: 'Danish Krone' },
  { code: 'PLN', symbol: 'zł', label: 'Polish Zloty' },
  { code: 'THB', symbol: '฿', label: 'Thai Baht' },
  { code: 'IDR', symbol: 'Rp', label: 'Indonesian Rupiah' },
  { code: 'HUF', symbol: 'Ft', label: 'Hungarian Forint' },
  { code: 'CZK', symbol: 'Kč', label: 'Czech Koruna' },
  { code: 'ILS', symbol: '₪', label: 'Israeli New Shekel' },
  { code: 'CLP', symbol: '$', label: 'Chilean Peso' },
  { code: 'PHP', symbol: '₱', label: 'Philippine Peso' },
  { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham' },
  { code: 'COP', symbol: '$', label: 'Colombian Peso' },
  { code: 'SAR', symbol: 'ر.س', label: 'Saudi Riyal' },
  { code: 'MYR', symbol: 'RM', label: 'Malaysian Ringgit' },
  { code: 'RON', symbol: 'L', label: 'Romanian Leu' },
  { code: 'VND', symbol: '₫', label: 'Vietnamese Dong' },
  { code: 'ARS', symbol: '$', label: 'Argentine Peso' },
  { code: 'EGP', symbol: 'E£', label: 'Egyptian Pound' },
  { code: 'NGN', symbol: '₦', label: 'Nigerian Naira' },
  { code: 'KWD', symbol: 'KD', label: 'Kuwaiti Dinar' },
  { code: 'BHD', symbol: 'BD', label: 'Bahraini Dinar' },
  { code: 'OMR', symbol: 'RO', label: 'Omani Rial' },
  { code: 'QAR', symbol: 'QR', label: 'Qatari Rial' },
  { code: 'JOD', symbol: 'JD', label: 'Jordanian Dinar' },
  { code: 'LKR', symbol: 'Rs', label: 'Sri Lankan Rupee' },
  { code: 'BDT', symbol: '৳', label: 'Bangladeshi Taka' },
  { code: 'DZD', symbol: 'DA', label: 'Algerian Dinar' },
  { code: 'MAD', symbol: 'DH', label: 'Moroccan Dirham' },
  { code: 'KES', symbol: 'KSh', label: 'Kenyan Shilling' },
  { code: 'TZS', symbol: 'TSh', label: 'Tanzanian Shilling' },
  { code: 'UGX', symbol: 'USh', label: 'Ugandan Shilling' },
  { code: 'GHS', symbol: 'GH₵', label: 'Ghanaian Cedi' },
  { code: 'IQD', symbol: 'ID', label: 'Iraqi Dinar' },
  { code: 'LBP', symbol: 'L£', label: 'Lebanese Pound' },
  { code: 'SYP', symbol: 'S£', label: 'Syrian Pound' },
  { code: 'YER', symbol: 'YR', label: 'Yemeni Rial' },
  { code: 'AFN', symbol: 'Af', label: 'Afghan Afghani' },
  { code: 'ALL', symbol: 'L', label: 'Albanian Lek' },
  { code: 'AMD', symbol: '֏', label: 'Armenian Dram' },
  { code: 'ANG', symbol: 'ƒ', label: 'Netherlands Antillean Guilder' },
  { code: 'AOA', symbol: 'Kz', label: 'Angolan Kwanza' },
  { code: 'AWG', symbol: 'ƒ', label: 'Aruban Florin' },
  { code: 'AZN', symbol: '₼', label: 'Azerbaijani Manat' },
  { code: 'BAM', symbol: 'KM', label: 'Convertible Mark' },
  { code: 'BBD', symbol: '$', label: 'Barbadian Dollar' },
  { code: 'BGN', symbol: 'лв', label: 'Bulgarian Lev' },
  { code: 'BIF', symbol: 'FBu', label: 'Burundian Franc' },
  { code: 'BMD', symbol: '$', label: 'Bermudian Dollar' },
  { code: 'BND', symbol: '$', label: 'Brunei Dollar' },
  { code: 'BOB', symbol: 'Bs.', label: 'Bolivian Boliviano' },
  { code: 'BSD', symbol: '$', label: 'Bahamian Dollar' },
  { code: 'BTN', symbol: 'Nu.', label: 'Bhutanese Ngultrum' },
  { code: 'BWP', symbol: 'P', label: 'Botswanan Pula' },
  { code: 'BYN', symbol: 'Br', label: 'Belarusian Ruble' },
  { code: 'BZD', symbol: 'BZ$', label: 'Belize Dollar' },
  { code: 'CDF', symbol: 'FC', label: 'Congolese Franc' },
  { code: 'CVE', symbol: 'Esc', label: 'Cape Verdean Escudo' },
  { code: 'DJF', symbol: 'Fdj', label: 'Djiboutian Franc' },
  { code: 'DOP', symbol: 'RD$', label: 'Dominican Peso' },
  { code: 'ERN', symbol: 'Nfk', label: 'Eritrean Nakfa' },
  { code: 'ETB', symbol: 'Br', label: 'Ethiopian Birr' },
  { code: 'FJD', symbol: 'FJ$', label: 'Fijian Dollar' },
  { code: 'FKP', symbol: '£', label: 'Falkland Islands Pound' },
  { code: 'GEL', symbol: '₾', label: 'Georgian Lari' },
  { code: 'GIP', symbol: '£', label: 'Gibraltar Pound' },
  { code: 'GMD', symbol: 'D', label: 'Gambian Dalasi' },
  { code: 'GNF', symbol: 'FG', label: 'Guinean Franc' },
  { code: 'GTQ', symbol: 'Q', label: 'Guatemalan Quetzal' },
  { code: 'GYD', symbol: '$', label: 'Guyanaese Dollar' },
  { code: 'HNL', symbol: 'L', label: 'Honduran Lempira' },
  { code: 'HRK', symbol: 'kn', label: 'Croatian Kuna' },
  { code: 'HTG', symbol: 'G', label: 'Haitian Gourde' },
  { code: 'ISK', symbol: 'kr', label: 'Icelandic Króna' },
  { code: 'JMD', symbol: 'J$', label: 'Jamaican Dollar' },
  { code: 'KGS', symbol: 'лв', label: 'Kyrgystani Som' },
  { code: 'KHR', symbol: '៛', label: 'Cambodian Riel' },
  { code: 'KMF', symbol: 'CF', label: 'Comorian Franc' },
  { code: 'KZT', symbol: '₸', label: 'Kazakhstani Tenge' },
  { code: 'LAK', symbol: '₭', label: 'Laotian Kip' },
  { code: 'LRD', symbol: '$', label: 'Liberian Dollar' },
  { code: 'LSL', symbol: 'L', label: 'Lesotho Loti' },
  { code: 'LYD', symbol: 'LD', label: 'Libyan Dinar' },
  { code: 'MDL', symbol: 'L', label: 'Moldovan Leu' },
  { code: 'MGA', symbol: 'Ar', label: 'Malagasy Ariary' },
  { code: 'MKD', symbol: 'ден', label: 'Macedonian Denar' },
  { code: 'MMK', symbol: 'K', label: 'Myanmar Kyat' },
  { code: 'MNT', symbol: '₮', label: 'Mongolian Tugrik' },
  { code: 'MOP', symbol: 'MOP$', label: 'Macanese Pataca' },
  { code: 'MUR', symbol: '₨', label: 'Mauritian Rupee' },
  { code: 'MVR', symbol: 'Rf', label: 'Maldivian Rufiyaa' },
  { code: 'MWK', symbol: 'MK', label: 'Malawian Kwacha' },
  { code: 'MZN', symbol: 'MT', label: 'Mozambican Metical' },
  { code: 'NAD', symbol: '$', label: 'Namibian Dollar' },
  { code: 'NIO', symbol: 'C$', label: 'Nicaraguan Córdoba' },
  { code: 'NPR', symbol: '₨', label: 'Nepalese Rupee' },
  { code: 'PAB', symbol: 'B/.', label: 'Panamanian Balboa' },
  { code: 'PGK', symbol: 'K', label: 'Papua New Guinean Kina' },
  { code: 'PYG', symbol: 'Gs', label: 'Paraguayan Guarani' },
  { code: 'RWF', symbol: 'FRw', label: 'Rwandan Franc' },
  { code: 'SBD', symbol: '$', label: 'Solomon Islands Dollar' },
  { code: 'SCR', symbol: '₨', label: 'Seychellois Rupee' },
  { code: 'SDG', symbol: 'S£', label: 'Sudanese Pound' },
  { code: 'SHP', symbol: '£', label: 'Saint Helena Pound' },
  { code: 'SLL', symbol: 'Le', label: 'Sierra Leonean Leone' },
  { code: 'SOS', symbol: 'S', label: 'Somali Shilling' },
  { code: 'SRD', symbol: '$', label: 'Surinamese Dollar' },
  { code: 'SZL', symbol: 'L', label: 'Swazi Lilangeni' },
  { code: 'TJS', symbol: 'SM', label: 'Tajikistani Somoni' },
  { code: 'TMT', symbol: 'T', label: 'Turkmenistani Manat' },
  { code: 'TND', symbol: 'DT', label: 'Tunisian Dinar' },
  { code: 'TOP', symbol: 'T$', label: 'Tongan Paʻanga' },
  { code: 'TTD', symbol: 'TT$', label: 'Trinidad & Tobago Dollar' },
  { code: 'UAH', symbol: '₴', label: 'Ukrainian Hryvnia' },
  { code: 'UYU', symbol: '$U', label: 'Uruguayan Peso' },
  { code: 'UZS', symbol: 'лв', label: 'Uzbekistani Som' },
  { code: 'WST', symbol: 'WS$', label: 'Samoan Tala' },
  { code: 'XAF', symbol: 'FCFA', label: 'Central African CFA Franc' },
  { code: 'XCD', symbol: '$', label: 'East Caribbean Dollar' },
  { code: 'XOF', symbol: 'CFA', label: 'West African CFA Franc' },
  { code: 'XPF', symbol: '₣', label: 'CFP Franc' },
  { code: 'ZMW', symbol: 'ZK', label: 'Zambian Kwacha' },
];

interface CurrencySelectorProps {
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

export function CurrencySelector({ currentCurrency, onCurrencyChange }: CurrencySelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary transition-colors font-body">
          <Globe className="h-4 w-4" />
          <span className="font-bold">{currentCurrency.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-md border-border shadow-2xl rounded-xl p-0 overflow-hidden">
        <ScrollArea className="h-[300px] w-64">
          <div className="p-1">
            {CURRENCIES.map((c) => (
              <DropdownMenuItem 
                key={c.code} 
                onClick={() => onCurrencyChange(c)}
                className="cursor-pointer font-body flex justify-between gap-4 py-2"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">{c.code}</span>
                  <span className="text-[10px] text-muted-foreground">{c.label}</span>
                </div>
                <span className="font-bold text-primary">{c.symbol}</span>
              </DropdownMenuItem>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
