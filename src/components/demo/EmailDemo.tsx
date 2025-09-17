import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Mail, 
  Clock, 
  Star, 
  Filter, 
  Search, 
  MoreVertical, 
  CheckCircle2, 
  AlertCircle,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEmailStore } from '@/store/emailStore';
import { generateMockEmails } from '@/data/mockData';
import { Email, BusinessType } from '@/types';

interface EmailItemProps {
  email: Email;
  isDragging?: boolean;
}

const EmailItem: React.FC<EmailItemProps> = ({ email, isDragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: email.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      invoices: 'bg-blue-100 text-blue-800',
      estimates: 'bg-green-100 text-green-800',
      customer_inquiries: 'bg-purple-100 text-purple-800',
      reservations: 'bg-pink-100 text-pink-800',
      supplier_emails: 'bg-orange-100 text-orange-800',
      reviews: 'bg-cyan-100 text-cyan-800',
      orders: 'bg-emerald-100 text-emerald-800',
      returns: 'bg-red-100 text-red-800',
      customer_service: 'bg-indigo-100 text-indigo-800',
      marketing: 'bg-violet-100 text-violet-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 ${
        isDragging ? 'shadow-lg scale-105' : ''
      }`}
    >
      <Card className="border-0 shadow-none">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                    {email.sender}
                  </h4>
                  <Badge variant="outline" className={`text-xs ${getPriorityColor(email.priority)}`}>
                    {email.priority}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xs text-gray-500">
                    {email.timestamp.toLocaleDateString()}
                  </span>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-1">
                {email.subject}
              </h3>
              
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                {email.content}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={`text-xs ${getCategoryColor(email.category)}`}>
                    {email.category.replace('_', ' ')}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {email.estimatedTimeToProcess}min
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {email.isProcessed ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 cursor-grab active:cursor-grabbing"
                    {...attributes}
                    {...listeners}
                  >
                    <GripVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const EmailDemo: React.FC = () => {
  const {
    emails,
    filteredEmails,
    currentBusinessType,
    currentFilter,
    currentCategory,
    setEmails,
    setCurrentBusinessType,
    setCurrentFilter,
    setCurrentCategory,
    applyFilters,
    updateEmail
  } = useEmailStore();

  const [activeId, setActiveId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'category'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Initialize with mock data
  useEffect(() => {
    if (emails.length === 0) {
      const mockEmails = generateMockEmails(currentBusinessType, 30);
      setEmails(mockEmails);
    }
  }, [emails.length, currentBusinessType, setEmails]);

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [currentBusinessType, currentFilter, currentCategory, applyFilters]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // Here you would typically update the email order in your store
      // For demo purposes, we'll just log the change
      console.log(`Moved email ${active.id} to position ${over.id}`);
    }
    
    setActiveId(null);
  };

  const handleSort = (field: 'date' | 'priority' | 'category') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedEmails = [...filteredEmails].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = a.timestamp.getTime() - b.timestamp.getTime();
        break;
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        break;
      case 'category':
        comparison = a.category.localeCompare(b.category);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const businessTypes: { value: BusinessType; label: string }[] = [
    { value: 'contractor', label: 'Contractor' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'ecommerce', label: 'E-commerce' }
  ];

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'invoices', label: 'Invoices' },
    { value: 'estimates', label: 'Estimates' },
    { value: 'customer_inquiries', label: 'Customer Inquiries' },
    { value: 'reservations', label: 'Reservations' },
    { value: 'supplier_emails', label: 'Supplier Emails' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'orders', label: 'Orders' },
    { value: 'returns', label: 'Returns' },
    { value: 'customer_service', label: 'Customer Service' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Email Demo</h1>
              <p className="text-gray-600">Drag and drop to organize your emails</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={currentBusinessType} onValueChange={(value) => setCurrentBusinessType(value as BusinessType)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview Mode
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r p-6">
          <div className="space-y-6">
            {/* Search */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search emails..."
                  value={currentFilter}
                  onChange={(e) => setCurrentFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
              <Select value={currentCategory || ''} onValueChange={(value) => setCurrentCategory(value || null)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
              <div className="space-y-2">
                {[
                  { field: 'date', label: 'Date' },
                  { field: 'priority', label: 'Priority' },
                  { field: 'category', label: 'Category' }
                ].map((option) => (
                  <Button
                    key={option.field}
                    variant={sortBy === option.field ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-between"
                    onClick={() => handleSort(option.field as any)}
                  >
                    {option.label}
                    {sortBy === option.field && (
                      sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Email Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-medium">{filteredEmails.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processed:</span>
                  <span className="font-medium text-green-600">
                    {filteredEmails.filter(e => e.isProcessed).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending:</span>
                  <span className="font-medium text-yellow-600">
                    {filteredEmails.filter(e => !e.isProcessed).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <SortableContext items={sortedEmails.map(email => email.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                <AnimatePresence>
                  {sortedEmails.map((email) => (
                    <EmailItem key={email.id} email={email} />
                  ))}
                </AnimatePresence>
              </div>
            </SortableContext>
            
            <DragOverlay>
              {activeId ? (
                <EmailItem 
                  email={sortedEmails.find(email => email.id === activeId)!} 
                  isDragging={true}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default EmailDemo;
