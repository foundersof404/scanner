import { useState } from 'react';

export interface FilterState {
    priceRange: { min: string; max: string };
    location: string | null;
    category: string | null;
    availability: string | null;
    sortBy: string | null;
}

export function useFilters() {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        priceRange: { min: '', max: '' },
        location: null,
        category: null,
        availability: null,
        sortBy: null,
    });

    const openFilters = () => setIsOpen(true);
    const closeFilters = () => setIsOpen(false);

    const updatePriceRange = (min: string, max: string) => {
        setFilters(prev => ({
            ...prev,
            priceRange: { min, max },
        }));
    };

    const updateLocation = (location: string | null) => {
        setFilters(prev => ({
            ...prev,
            location,
        }));
    };

    const updateCategory = (category: string | null) => {
        setFilters(prev => ({
            ...prev,
            category,
        }));
    };

    const updateAvailability = (availability: string | null) => {
        setFilters(prev => ({
            ...prev,
            availability,
        }));
    };

    const updateSortBy = (sortBy: string | null) => {
        setFilters(prev => ({
            ...prev,
            sortBy,
        }));
    };

    const resetFilters = () => {
        setFilters({
            priceRange: { min: '', max: '' },
            location: null,
            category: null,
            availability: null,
            sortBy: null,
        });
    };

    const hasActiveFilters = () => {
        return (
            filters.priceRange.min !== '' ||
            filters.priceRange.max !== '' ||
            filters.location !== null ||
            filters.category !== null ||
            filters.availability !== null ||
            filters.sortBy !== null
        );
    };

    return {
        isOpen,
        filters,
        openFilters,
        closeFilters,
        updatePriceRange,
        updateLocation,
        updateCategory,
        updateAvailability,
        updateSortBy,
        resetFilters,
        hasActiveFilters,
    };
}
