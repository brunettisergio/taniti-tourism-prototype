import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface RoomType {
    name: string;
    beds: number;
    bathrooms: number;
}

interface Lodging {
    id: number;
    name: string;
    type: string;
    image: string;
    roomTypes: RoomType[];
    amenities: string[];
    rate: number;
}

interface FilterState {
    name: string;
    type: string;
    amenities: string[];
    minRate: number;
    maxRate: number;
}

@Injectable({
    providedIn: 'root',
})
export class LodgingService {
    private readonly allLodgings: Lodging[] = [
        {
            id: 1,
            name: 'Pacific Paradise Resort',
            type: 'Four-Star Resort',
            image: 'assets/lodging/resort.avif',
            roomTypes: [
                { name: 'Ocean Suite', beds: 2, bathrooms: 2 },
                { name: 'Presidential Villa', beds: 3, bathrooms: 3 },
            ],
            amenities: [
                'Private beach access',
                'Swimming pool',
                'Restaurant',
                'Spa services',
                'Concierge service',
                'Fitness center',
                'WiFi',
                'Free parking',
                'Room service',
                'Bicycle rental',
            ],
            rate: 450,
        },
        {
            id: 2,
            name: 'Island Breeze Hotel',
            type: 'Family-Owned Hotel',
            image: 'assets/lodging/hotel.jpg',
            roomTypes: [
                { name: 'Standard Room', beds: 2, bathrooms: 1 },
                { name: 'Family Suite', beds: 3, bathrooms: 2 },
            ],
            amenities: [
                'Swimming pool',
                'Restaurant',
                'Free parking',
                'WiFi',
                '24-hour front desk',
                'Breakfast Included',
            ],
            rate: 180,
        },
        {
            id: 3,
            name: 'Sunrise Bed & Breakfast',
            type: 'Bed & Breakfast',
            image: 'assets/lodging/bed-and-breakfast.jpg',
            roomTypes: [
                { name: 'Garden Room', beds: 1, bathrooms: 1 },
                { name: 'Ocean View Room', beds: 1, bathrooms: 1 },
            ],
            amenities: [
                'Homemade breakfast',
                'Garden patio',
                'WiFi',
                'Bicycle rental',
                'Local tour guidance',
                'Swimming pool',
                'Free parking',
            ],
            rate: 120,
        },
        {
            id: 4,
            name: 'Taniti Backpackers Hostel',
            type: 'Hostel',
            image: 'assets/lodging/hostel.jpg',
            roomTypes: [
                { name: 'Shared Dorm', beds: 8, bathrooms: 2 },
                { name: 'Private Room', beds: 2, bathrooms: 1 },
            ],
            amenities: [
                'Shared kitchen',
                'Common lounge',
                'WiFi',
                'Laundry facilities',
                'Luggage storage',
                'Free parking',
            ],
            rate: 35,
        },
        {
            id: 5,
            name: 'Coral Cove Boutique Hotel',
            type: 'Hotel',
            image: 'assets/lodging/hotel-2.jpg',
            roomTypes: [
                { name: 'Deluxe Room', beds: 1, bathrooms: 1 },
                { name: 'Junior Suite', beds: 1, bathrooms: 1.5 },
            ],
            amenities: [
                'Rooftop pool',
                'Restaurant',
                'Spa services',
                'WiFi',
                'Breakfast Included',
                'Concierge',
                'Free parking',
            ],
            rate: 280,
        },
        {
            id: 6,
            name: 'Palm Grove Bed & Breakfast',
            type: 'Bed & Breakfast',
            image: 'assets/lodging/bed-and-breakfast-2.jpg',
            roomTypes: [
                { name: 'Cozy Room', beds: 1, bathrooms: 1 },
                { name: 'Family Room', beds: 2, bathrooms: 1 },
            ],
            amenities: [
                'Continental breakfast',
                'Garden terrace',
                'WiFi',
                'Free parking',
                'Kitchen access',
            ],
            rate: 95,
        },
    ];

    // BehaviorSubjects for reactive state management
    private lodgingsSubject = new BehaviorSubject<Lodging[]>([
        ...this.allLodgings,
    ]);
    private filtersSubject = new BehaviorSubject<FilterState>({
        name: '',
        type: '',
        amenities: [],
        minRate: 0,
        maxRate: 500,
    });

    // Public observables for components to subscribe to
    public lodgings$ = this.lodgingsSubject.asObservable();
    public filters$ = this.filtersSubject.asObservable();

    // Static data that doesn't change
    public readonly lodgingTypes = [
        'Four-Star Resort',
        'Family-Owned Hotel',
        'Bed & Breakfast',
        'Hostel',
        'Hotel',
    ];

    public readonly availableAmenities = [
        'WiFi',
        'Swimming pool',
        'Restaurant',
        'Free parking',
        'Spa services',
        'Fitness center',
        'Concierge service',
        'Breakfast Included',
        'Private beach access',
        'Bicycle rental',
        'Room service',
    ];

    // Apply current filters to the lodging list

    public applyFilters(): void {
        const currentFilters = this.filtersSubject.value;
        const filteredLodgings = this.allLodgings.filter((lodging) => {
            const nameMatch = this.checkNameMatch(lodging, currentFilters.name);
            const typeMatch = this.checkTypeMatch(lodging, currentFilters.type);
            const rateMatch = this.checkRateMatch(
                lodging,
                currentFilters.minRate,
                currentFilters.maxRate
            );
            const amenitiesMatch = this.checkAmenitiesMatch(
                lodging,
                currentFilters.amenities
            );

            return nameMatch && typeMatch && rateMatch && amenitiesMatch;
        });

        this.lodgingsSubject.next(filteredLodgings);
    }

    // Clear all filters and reset to show all lodgings

    public clearFilters(): void {
        const defaultFilters: FilterState = {
            name: '',
            type: '',
            amenities: [],
            minRate: 0,
            maxRate: 500,
        };

        this.filtersSubject.next(defaultFilters);
        this.lodgingsSubject.next([...this.allLodgings]);
    }

    public updateFilters(partialFilters: Partial<FilterState>): void {
        const currentFilters = this.filtersSubject.value;
        const newFilters = { ...currentFilters, ...partialFilters };

        this.filtersSubject.next(newFilters);
        this.applyFilters();
    }

    public toggleAmenity(amenity: string): void {
        const currentFilters = this.filtersSubject.value;
        const amenities = [...currentFilters.amenities];

        const index = amenities.indexOf(amenity);
        if (index > -1) {
            amenities.splice(index, 1);
        } else {
            amenities.push(amenity);
        }

        this.updateFilters({ amenities });
    }

    public isAmenitySelected(amenity: string): boolean {
        return this.filtersSubject.value.amenities.includes(amenity);
    }

    public getCurrentFilters(): FilterState {
        return this.filtersSubject.value;
    }

    public getAllLodgings(): Lodging[] {
        return [...this.allLodgings];
    }

    public getCurrentLodgings(): Lodging[] {
        return this.lodgingsSubject.value;
    }

    public formatBathrooms(bathrooms: number): string {
        if (bathrooms === 1) return '1 bathroom';
        if (bathrooms === 1.5) return '1.5 bathrooms';
        if (bathrooms === 2) return '2 shared bathrooms';
        return `${bathrooms} bathrooms`;
    }

    public getLodgingTypeClass(type: string): string {
        return type.toLowerCase().replace(/\s+/g, '-').replace('&', 'and');
    }

    // Private helper methods for filtering logic

    private checkNameMatch(lodging: Lodging, nameFilter: string): boolean {
        return (
            !nameFilter ||
            lodging.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }

    private checkTypeMatch(lodging: Lodging, typeFilter: string): boolean {
        return !typeFilter || lodging.type === typeFilter;
    }

    private checkRateMatch(
        lodging: Lodging,
        minRate: number,
        maxRate: number
    ): boolean {
        return lodging.rate >= minRate && lodging.rate <= maxRate;
    }

    private checkAmenitiesMatch(
        lodging: Lodging,
        amenityFilters: string[]
    ): boolean {
        return (
            amenityFilters.length === 0 ||
            amenityFilters.every((amenity) =>
                lodging.amenities.includes(amenity)
            )
        );
    }
}
