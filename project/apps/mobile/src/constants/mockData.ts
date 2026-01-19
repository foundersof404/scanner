// Mock data for the application
import { ActivityItem, Notification } from '../types';

export const mockRecentActivity: ActivityItem[] = [
    {
        id: 'a1',
        type: 'scan',
        title: 'iPhone 15 Pro',
        subtitle: 'Scanned via barcode',
        time: '2 min ago',
        date: '2025-01-18',
        details: {
            store: 'TechStore',
            price: '$999',
            dealsFound: 3,
        },
    },
    {
        id: 'a2',
        type: 'search',
        title: 'MacBook Air M2',
        subtitle: 'Searched by name',
        time: '1 hour ago',
        date: '2025-01-18',
        details: {
            dealsFound: 5,
        },
    },
    {
        id: 'a3',
        type: 'alert',
        title: 'Price Drop Alert',
        subtitle: 'AirPods Pro dropped by 15%',
        time: '3 hours ago',
        date: '2025-01-18',
        details: {
            priceChange: '-$30',
        },
    },
    {
        id: 'a4',
        type: 'buy',
        title: 'Samsung Galaxy S24',
        subtitle: 'Purchased from BestBuy',
        time: 'Yesterday',
        date: '2025-01-17',
        details: {
            store: 'BestBuy',
            price: '$799',
            quantity: 1,
        },
    },
    {
        id: 'a5',
        type: 'upload',
        title: 'Product Image Upload',
        subtitle: 'Uploaded 3 product photos',
        time: '2 days ago',
        date: '2025-01-16',
    },
    {
        id: 'a6',
        type: 'export',
        title: 'Price Report',
        subtitle: 'Exported weekly comparison',
        time: '3 days ago',
        date: '2025-01-15',
    },
];

export const mockNotifications: Notification[] = [
    {
        id: 'n1',
        type: 'price',
        title: 'Price Drop Alert',
        message: 'iPhone 15 Pro dropped by $50 at TechStore',
        time: '5 min ago',
    },
    {
        id: 'n2',
        type: 'match',
        title: 'New Match Found',
        message: 'We found 3 new retailers selling MacBook Air M2',
        time: '1 hour ago',
    },
    {
        id: 'n3',
        type: 'scan',
        title: 'Scan Complete',
        message: 'Your barcode scan for AirPods Pro is ready',
        time: '2 hours ago',
    },
    {
        id: 'n4',
        type: 'report',
        title: 'Weekly Report',
        message: 'Your weekly price comparison report is available',
        time: 'Yesterday',
    },
];
