// Shared types for the application

export interface ActivityItem {
    id: string;
    type: 'scan' | 'search' | 'buy' | 'upload' | 'alert' | 'export';
    title: string;
    subtitle: string;
    time: string;
    date?: string;
    details?: {
        store?: string;
        price?: string;
        quantity?: number;
        dealsFound?: number;
        priceChange?: string;
    };
}

export interface RecommendedItem {
    id: string;
    title: string;
    subtitle: string;
    tag: string;
    imageUrl: string;
}

export interface Category {
    id: string;
    label: string;
    icon: string;
}

export interface ActionCard {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
}

export interface Location {
    id: string;
    label: string;
}

export interface AvailabilityOption {
    id: string;
    label: string;
}

export interface SortOption {
    id: string;
    label: string;
}

export interface Notification {
    id: string;
    type: 'price' | 'match' | 'scan' | 'report';
    title: string;
    message: string;
    time: string;
}
