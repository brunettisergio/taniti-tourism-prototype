import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

@Component({
    selector: 'app-lodging',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './lodging.html',
    styleUrl: './lodging.scss',
})
export class LodgingComponent {
    allLodgings: Lodging[] = [
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
                'Swimming pool & spa',
                'Fine dining restaurant',
                'Concierge service',
                'Fitness center',
                'WiFi',
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
                'Restaurant & bar',
                'Spa services',
                'WiFi',
                'Room service',
                'Concierge',
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

    lodgings: Lodging[] = [...this.allLodgings];

    filters: FilterState = {
        name: '',
        type: '',
        amenities: [],
        minRate: 0,
        maxRate: 500,
    };

    lodgingTypes = [
        'Four-Star Resort',
        'Family-Owned Hotel',
        'Bed & Breakfast',
        'Hostel',
        'Hotel',
    ];

    availableAmenities = [
        'WiFi',
        'Swimming pool',
        'Restaurant',
        'Free parking',
        'Spa services',
        'Fitness center',
        'Concierge service',
        'Room service',
        'Private beach access',
        'Bicycle rental',
    ];

    applyFilters(): void {
        this.lodgings = this.allLodgings.filter((lodging) => {
            const nameMatch =
                !this.filters.name ||
                lodging.name
                    .toLowerCase()
                    .includes(this.filters.name.toLowerCase());

            const typeMatch =
                !this.filters.type || lodging.type === this.filters.type;

            const rateMatch =
                lodging.rate >= this.filters.minRate &&
                lodging.rate <= this.filters.maxRate;

            const amenitiesMatch =
                this.filters.amenities.length === 0 ||
                this.filters.amenities.every((amenity) =>
                    lodging.amenities.includes(amenity)
                );

            return nameMatch && typeMatch && rateMatch && amenitiesMatch;
        });
    }

    clearFilters(): void {
        this.filters = {
            name: '',
            type: '',
            amenities: [],
            minRate: 0,
            maxRate: 500,
        };
        this.lodgings = [...this.allLodgings];
    }

    toggleAmenity(amenity: string): void {
        const index = this.filters.amenities.indexOf(amenity);
        if (index > -1) {
            this.filters.amenities.splice(index, 1);
        } else {
            this.filters.amenities.push(amenity);
        }
        this.applyFilters();
    }

    isAmenitySelected(amenity: string): boolean {
        return this.filters.amenities.includes(amenity);
    }

    formatBathrooms(bathrooms: number): string {
        if (bathrooms === 1) return '1 bathroom';
        if (bathrooms === 1.5) return '1.5 bathrooms';
        if (bathrooms === 2) return '2 shared bathrooms';
        return `${bathrooms} bathrooms`;
    }

    getLodgingTypeClass(type: string): string {
        return type.toLowerCase().replace(/\s+/g, '-').replace('&', 'and');
    }
}
