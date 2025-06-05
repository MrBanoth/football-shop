"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, ChevronDown, MessageSquare, Phone, Mail } from "lucide-react";
import Link from 'next/link';

const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        q: "How do I track my order?",
        a: "You can track your order by visiting the 'Track Order' page and entering your order number. You will also receive a shipping confirmation email with a tracking link once your order ships."
      },
      {
        q: "What are your shipping options and times?",
        a: "We offer Standard (3-7 business days), Express (2-3 business days), and Overnight (1-2 business days) shipping. For more details, please see our Shipping Information page."
      },
      {
        q: "Do you ship internationally?",
        a: "Yes, we ship to select international countries. Delivery times vary by destination. Please note that international orders may be subject to import taxes and customs duties."
      },
      {
        q: "Can I change or cancel my order?",
        a: "Once an order is placed, it is processed quickly. Please contact our customer support team immediately if you need to make changes or cancel. We cannot guarantee changes if the order has already been processed."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day return policy for eligible items. Items must be unused, in original condition, and with tags attached. Please see our Returns & Refunds Policy page for full details."
      },
      {
        q: "How do I initiate a return?",
        a: "Log in to your account, go to Order History, select the item(s) to return, and follow the instructions to print a return label. For more details, visit our Returns & Refunds Policy page."
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are typically processed within 3-5 business days after we receive your return. It may take an additional 5-10 business days for the refund to appear on your statement."
      }
    ]
  },
  {
    category: "Products & Sizing",
    questions: [
      {
        q: "How do I find the right size?",
        a: "Each product page has a size guide link with specific measurements. If you need further assistance, please contact our customer support team."
      },
      {
        q: "Are your products authentic?",
        a: "Yes, all products sold on GoalGear are 100% authentic and sourced directly from official brands and suppliers."
      },
      {
        q: "How do I care for my football gear?",
        a: "Care instructions are usually provided on the product label or packaging. For specific advice, you can also check the product description on our website or contact us."
      }
    ]
  },
  {
    category: "Account & Payments",
    questions: [
      {
        q: "How do I create an account?",
        a: "Click on the 'Profile' icon in the navigation bar and select 'Sign Up' or 'Create Account'. Follow the prompts to enter your details."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and other payment methods as indicated at checkout."
      },
      {
        q: "Is my payment information secure?",
        a: "Yes, we use industry-standard SSL encryption to protect your payment information. All payments are processed through secure third-party payment gateways."
      }
    ]
  }
];

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
           q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="container py-12 max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-xl text-gray-600 mb-8">
          How can we help you today?
        </p>
        <div className="relative max-w-2xl mx-auto">
          <Input 
            type="text"
            placeholder="Search for answers... (e.g., 'track order')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 pl-12 pr-4 text-lg rounded-full shadow-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
        </div>
      </div>

      {filteredFaqData.length > 0 ? (
        <div className="space-y-10">
          {filteredFaqData.map((categoryItem) => (
            <section key={categoryItem.category}>
              <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-gray-200">{categoryItem.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {categoryItem.questions.map((faq, index) => (
                  <AccordionItem value={`item-${categoryItem.category}-${index}`} key={index}>
                    <AccordionTrigger className="text-lg text-left hover:no-underline">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-700 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No results found for "{searchTerm}"</h3>
          <p className="text-gray-500">Try a different search term or check our contact options below.</p>
        </div>
      )}

      <div className="mt-16 pt-12 border-t border-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-8">Still Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <MessageSquare className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with our support team for quick answers.</p>
            <button className="text-blue-600 font-medium hover:underline">Start Chat (Coming Soon)</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <Mail className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Send us an email and we'll get back to you.</p>
            <Link href="mailto:support@goalgear.com" className="text-blue-600 font-medium hover:underline">
              support@goalgear.com
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
            <Phone className="h-10 w-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak directly with a support agent.</p>
            <a href="tel:+15551234567" className="text-blue-600 font-medium hover:underline">
              (555) 123-4567
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
