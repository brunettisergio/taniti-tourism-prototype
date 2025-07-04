import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.html',
    styleUrl: './home.scss',
})
export class HomeComponent {
    photos = [
        { src: 'assets/gallery/beach.jpg', alt: 'Beach' },
        { src: 'assets/gallery/charter.jpg', alt: 'Charter' },
        { src: 'assets/gallery/hammock.jpg', alt: 'Hammock' },
        { src: 'assets/gallery/rainforest.jpg', alt: 'Rainforest' },
        { src: 'assets/gallery/volcano.jpg', alt: 'Volcano' },
        { src: 'assets/gallery/beach-sunset.jpg', alt: 'Beach Sunset' },
        { src: 'assets/gallery/boat.jpg', alt: 'Boat' },
        { src: 'assets/gallery/beach-chairs.jpg', alt: 'Beach Chairs' },
        { src: 'assets/gallery/hammock-sunset.jpg', alt: 'Hammock Sunset' },
        { src: 'assets/gallery/wooden-boat.jpg', alt: 'Wooden Boat' },
    ];

    isDragging = false;
    startX = 0;
    currentTransform = 0;

    onMouseDown(event: MouseEvent): void {
        this.isDragging = true;
        this.startX = event.pageX;
        event.preventDefault();

        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
    }

    onMouseMove(event: MouseEvent): void {
        event.preventDefault();
    }

    private onDocumentMouseMove = (event: MouseEvent): void => {
        if (!this.isDragging) return;

        event.preventDefault();
        const x = event.pageX;
        const walk = (x - this.startX) * 1;
        let newTransform = this.currentTransform + walk;

        const cardWidth = 700;
        const gap = 15;
        const padding = 50;
        const totalContentWidth =
            this.photos.length * cardWidth +
            (this.photos.length - 1) * gap +
            padding * 2;
        const containerWidth = window.innerWidth;

        const maxRight = 0;
        const maxLeft = -(totalContentWidth - containerWidth);

        newTransform = Math.max(maxLeft, Math.min(maxRight, newTransform));

        this.currentTransform = newTransform;
        this.startX = x;
    };

    private onDocumentMouseUp = (): void => {
        this.isDragging = false;

        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
    };

    onMouseUp(): void {
        this.onDocumentMouseUp();
    }

    onMouseLeave(): void {}
}
