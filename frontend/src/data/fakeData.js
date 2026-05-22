export const fakeConversations = [
  { id: 1, title: 'Refund Policy Question', date: '2 mins ago', preview: 'Hi, I need help with a refund...' },
  { id: 2, title: 'Where is my order?', date: '1 hour ago', preview: 'Order #12345 hasn\'t arrived yet.' },
  { id: 3, title: 'Product Recommendation', date: 'Yesterday', preview: 'Looking for a laptop under $1000.' },
];

export const fakeChatMessages = [
  { id: 1, sender: 'ai', text: 'Hello! I am your AI assistant. How can I help you today?', time: '10:00 AM' },
  { id: 2, sender: 'user', text: 'Hi, what is your return policy?', time: '10:01 AM' },
  { id: 3, sender: 'ai', text: 'You can return any item within 30 days of purchase for a full refund. Would you like me to guide you through the return process?', time: '10:01 AM' },
];

export const fakePdfs = [
  { id: 1, name: 'Q3_Product_Catalog.pdf', size: '2.4 MB', status: 'trained', date: 'Oct 12, 2023' },
  { id: 2, name: 'Return_Policy_2023.pdf', size: '1.1 MB', status: 'trained', date: 'Oct 10, 2023' },
  { id: 3, name: 'Shipping_Guidelines.pdf', size: '3.8 MB', status: 'training', date: 'Today, 09:41 AM' },
];

export const fakeStats = {
  totalPdfs: 24,
  activeUsers: 1432,
  accuracyScore: 98.4,
  conversations: 8943
};
