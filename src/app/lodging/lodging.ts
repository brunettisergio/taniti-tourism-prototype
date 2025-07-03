import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LodgingService } from './lodging-filtering-service';

@Component({
    selector: 'app-lodging',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './lodging.html',
    styleUrl: './lodging.scss',
})
export class LodgingComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();

    // Component properties bound to template
    lodgings: any[] = [];
    filters: any = {};

    constructor(public lodgingService: LodgingService) {}

    ngOnInit(): void {
        // Subscribe to lodgings changes
        this.lodgingService.lodgings$
            .pipe(takeUntil(this.destroy$))
            .subscribe((lodgings) => {
                this.lodgings = lodgings;
            });

        // Subscribe to filter changes
        this.lodgingService.filters$
            .pipe(takeUntil(this.destroy$))
            .subscribe((filters) => {
                this.filters = filters;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    // Delegate methods to service
    applyFilters(): void {
        this.lodgingService.applyFilters();
    }

    clearFilters(): void {
        this.lodgingService.clearFilters();
    }

    toggleAmenity(amenity: string): void {
        this.lodgingService.toggleAmenity(amenity);
    }

    isAmenitySelected(amenity: string): boolean {
        return this.lodgingService.isAmenitySelected(amenity);
    }

    formatBathrooms(bathrooms: number): string {
        return this.lodgingService.formatBathrooms(bathrooms);
    }

    getLodgingTypeClass(type: string): string {
        return this.lodgingService.getLodgingTypeClass(type);
    }

    // Expose service properties to template
    get lodgingTypes() {
        return this.lodgingService.lodgingTypes;
    }

    get availableAmenities() {
        return this.lodgingService.availableAmenities;
    }

    // Handle form input changes
    onNameFilterChange(value: string): void {
        this.lodgingService.updateFilters({ name: value });
    }

    onTypeFilterChange(value: string): void {
        this.lodgingService.updateFilters({ type: value });
    }

    onRateFilterChange(minRate: number, maxRate: number): void {
        this.lodgingService.updateFilters({ minRate, maxRate });
    }
}
