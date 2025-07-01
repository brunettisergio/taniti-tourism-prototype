import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-experiences',
    imports: [CommonModule],
    templateUrl: './experiences.html',
    styleUrls: ['./experiences.scss'],
})
export class ExperiencesComponent {
    currentSlide = 0;

    slides = [
        'Boat Charters',
        'Snorkeling Adventures',
        'Golf Course',
        'Helicopter Rides',
        'Volcano Sightseeing',
        'Rainforest Zipline',
    ];

    nextSlide(): void {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }

    previousSlide(): void {
        this.currentSlide =
            (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    }

    goToSlide(index: number): void {
        this.currentSlide = index;
    }
}
