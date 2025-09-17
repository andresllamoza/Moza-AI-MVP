import { Email, BusinessType, EmailCategory } from '@/types';

// Sample data for different business types
const contractorSenders = [
  { name: 'John Smith', email: 'john.smith@email.com' },
  { name: 'Sarah Johnson', email: 'sarah.j@outlook.com' },
  { name: 'Mike Wilson', email: 'mike.wilson@gmail.com' },
  { name: 'Lisa Brown', email: 'lisa.brown@yahoo.com' },
  { name: 'David Davis', email: 'david.davis@hotmail.com' },
  { name: 'Jennifer Garcia', email: 'j.garcia@email.com' },
  { name: 'Robert Miller', email: 'robert.miller@gmail.com' },
  { name: 'Amanda Taylor', email: 'amanda.taylor@outlook.com' },
  { name: 'Christopher Anderson', email: 'chris.anderson@gmail.com' },
  { name: 'Michelle Thomas', email: 'michelle.thomas@yahoo.com' }
];

const restaurantSenders = [
  { name: 'Maria Rodriguez', email: 'maria.rodriguez@email.com' },
  { name: 'James Wilson', email: 'james.wilson@gmail.com' },
  { name: 'Patricia Martinez', email: 'patricia.martinez@outlook.com' },
  { name: 'John Anderson', email: 'john.anderson@yahoo.com' },
  { name: 'Jennifer Taylor', email: 'jennifer.taylor@gmail.com' },
  { name: 'Robert Jackson', email: 'robert.jackson@email.com' },
  { name: 'Linda White', email: 'linda.white@hotmail.com' },
  { name: 'William Harris', email: 'william.harris@gmail.com' },
  { name: 'Elizabeth Martin', email: 'elizabeth.martin@outlook.com' },
  { name: 'Michael Thompson', email: 'michael.thompson@yahoo.com' }
];

const ecommerceSenders = [
  { name: 'Alex Chen', email: 'alex.chen@gmail.com' },
  { name: 'Emma Johnson', email: 'emma.johnson@email.com' },
  { name: 'Ryan Kim', email: 'ryan.kim@outlook.com' },
  { name: 'Sophie Davis', email: 'sophie.davis@yahoo.com' },
  { name: 'Lucas Brown', email: 'lucas.brown@gmail.com' },
  { name: 'Olivia Wilson', email: 'olivia.wilson@email.com' },
  { name: 'Noah Garcia', email: 'noah.garcia@hotmail.com' },
  { name: 'Ava Martinez', email: 'ava.martinez@gmail.com' },
  { name: 'Liam Anderson', email: 'liam.anderson@outlook.com' },
  { name: 'Isabella Taylor', email: 'isabella.taylor@yahoo.com' }
];

const contractorSubjects = [
  'Kitchen Renovation Quote Request',
  'Bathroom Remodeling Estimate',
  'Roof Repair - Urgent',
  'Electrical Work Needed',
  'Plumbing Issue - Leak in Basement',
  'Deck Construction Quote',
  'HVAC System Replacement',
  'Flooring Installation Estimate',
  'Window Replacement Project',
  'Outdoor Patio Design',
  'Garage Door Repair',
  'Siding Installation Quote',
  'Gutter Cleaning Service',
  'Landscaping Project',
  'Fence Installation Estimate'
];

const restaurantSubjects = [
  'Table Reservation for 6 People',
  'Catering Inquiry for Wedding',
  'Private Party Booking',
  'Food Delivery Order',
  'Complaint About Service',
  'Compliment on Food Quality',
  'Job Application - Server Position',
  'Supplier Quote - Fresh Produce',
  'Equipment Maintenance Request',
  'Health Inspection Follow-up',
  'Menu Change Request',
  'Special Dietary Requirements',
  'Event Planning Consultation',
  'Wine Tasting Reservation',
  'Takeout Order Confirmation'
];

const ecommerceSubjects = [
  'Order #12345 - Shipping Update',
  'Return Request - Item Not as Described',
  'Product Question - Size Chart',
  'Refund Status Inquiry',
  'Bulk Order for Office Supplies',
  'Subscription Cancellation',
  'Product Review Request',
  'Shipping Address Change',
  'Payment Issue - Credit Card',
  'Warranty Claim - Electronics',
  'Gift Card Purchase',
  'International Shipping Inquiry',
  'Product Availability Question',
  'Loyalty Program Signup',
  'Newsletter Subscription'
];

const contractorContent = [
  'Hi, I\'m looking to renovate my kitchen and need a detailed quote. The space is about 200 sq ft and I want to replace cabinets, countertops, and flooring. Could you provide an estimate?',
  'We have a leak in our basement that needs immediate attention. The water is coming from the foundation wall. Please call me as soon as possible.',
  'I need an estimate for a new deck. The area is 12x16 feet and I want composite decking. Can you come out for a site visit?',
  'Our HVAC system is 15 years old and not working efficiently. We need a replacement quote for a 2000 sq ft home.',
  'I\'m interested in having new windows installed throughout the house. We have 12 windows total. What\'s your availability?'
];

const restaurantContent = [
  'Hi, I\'d like to make a reservation for 6 people this Friday at 7 PM. It\'s for my anniversary dinner.',
  'We\'re planning a wedding for 150 guests and would like to discuss catering options. Do you offer full-service catering?',
  'I had dinner last night and the service was excellent! The staff was very attentive and the food was delicious.',
  'I\'m interested in applying for a server position. I have 3 years of experience in fine dining. When can I come in for an interview?',
  'We need a quote for fresh produce delivery. We\'re looking for organic vegetables and fruits for our menu.'
];

const ecommerceContent = [
  'Hi, I placed an order last week (#12345) but haven\'t received a shipping confirmation yet. Can you check the status?',
  'I received the wrong size for the shirt I ordered. I need to return it and get the correct size. What\'s the return process?',
  'I\'m interested in your office chair but need to know the weight capacity. I\'m 250 lbs and want to make sure it will support me.',
  'I\'m having trouble with my credit card payment. It keeps getting declined but the card works elsewhere. Can you help?',
  'I\'d like to place a bulk order for office supplies. We need 50 notebooks, 100 pens, and 25 staplers. Do you offer volume discounts?'
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(daysAgo: number): Date {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * daysAgo);
  return new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000);
}

function generateEmailId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function generateMockEmails(businessType: BusinessType, count: number = 50): Email[] {
  const emails: Email[] = [];
  const senders = businessType === 'contractor' ? contractorSenders : 
                 businessType === 'restaurant' ? restaurantSenders : ecommerceSenders;
  const subjects = businessType === 'contractor' ? contractorSubjects :
                  businessType === 'restaurant' ? restaurantSubjects : ecommerceSubjects;
  const content = businessType === 'contractor' ? contractorContent :
                 businessType === 'restaurant' ? restaurantContent : ecommerceContent;

  const categories: EmailCategory[] = businessType === 'contractor' ? 
    ['invoices', 'estimates', 'customer_inquiries', 'other'] :
    businessType === 'restaurant' ?
    ['reservations', 'supplier_emails', 'reviews', 'customer_inquiries', 'other'] :
    ['orders', 'returns', 'customer_service', 'customer_inquiries', 'other'];

  for (let i = 0; i < count; i++) {
    const sender = getRandomItem(senders);
    const category = getRandomItem(categories);
    const priority = Math.random() < 0.2 ? 'high' : Math.random() < 0.5 ? 'medium' : 'low';
    const isRead = Math.random() < 0.3;
    const isProcessed = Math.random() < 0.4;
    const estimatedTimeToProcess = Math.floor(Math.random() * 15) + 2; // 2-17 minutes

    emails.push({
      id: generateEmailId(),
      subject: getRandomItem(subjects),
      sender: sender.name,
      senderEmail: sender.email,
      content: getRandomItem(content),
      timestamp: getRandomDate(30), // Last 30 days
      priority,
      category,
      businessType,
      isRead,
      isProcessed,
      estimatedTimeToProcess
    });
  }

  return emails.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
}

export function generateAllMockEmails(): Email[] {
  const contractorEmails = generateMockEmails('contractor', 60);
  const restaurantEmails = generateMockEmails('restaurant', 50);
  const ecommerceEmails = generateMockEmails('ecommerce', 40);
  
  return [...contractorEmails, ...restaurantEmails, ...ecommerceEmails];
}

// Business profiles for the demo
export const businessProfiles = {
  contractor: {
    type: 'contractor' as BusinessType,
    name: 'Premier Construction Services',
    emailVolume: 60,
    averageProcessingTime: 8,
    hourlyRate: 75,
    description: 'Full-service construction company specializing in residential renovations',
    painPoints: [
      'Spending 2+ hours daily sorting through client emails',
      'Missing urgent repair requests in cluttered inbox',
      'Difficulty tracking project communications',
      'Time wasted on non-essential emails'
    ],
    benefits: [
      'Automatically categorize project inquiries',
      'Prioritize urgent repair requests',
      'Track all project communications',
      'Save 10+ hours per week on email management'
    ]
  },
  restaurant: {
    type: 'restaurant' as BusinessType,
    name: 'Bella Vista Restaurant',
    emailVolume: 50,
    averageProcessingTime: 6,
    hourlyRate: 45,
    description: 'Upscale Italian restaurant with catering services',
    painPoints: [
      'Managing reservations across multiple channels',
      'Separating customer inquiries from supplier emails',
      'Tracking catering requests and special events',
      'Handling customer feedback and reviews'
    ],
    benefits: [
      'Automatically sort reservations and inquiries',
      'Separate customer and supplier communications',
      'Track catering and event requests',
      'Manage customer feedback efficiently'
    ]
  },
  ecommerce: {
    type: 'ecommerce' as BusinessType,
    name: 'TechGear Online Store',
    emailVolume: 40,
    averageProcessingTime: 5,
    hourlyRate: 35,
    description: 'Online electronics and tech accessories retailer',
    painPoints: [
      'High volume of customer service emails',
      'Managing order inquiries and returns',
      'Separating sales leads from support tickets',
      'Tracking product feedback and reviews'
    ],
    benefits: [
      'Automatically categorize customer service tickets',
      'Prioritize order inquiries and returns',
      'Separate sales leads from support requests',
      'Streamline customer communication workflow'
    ]
  }
};
