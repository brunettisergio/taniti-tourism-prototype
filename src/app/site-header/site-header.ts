import { Component, OnInit } from '@angular/core';
import {
    Router,
    RouterLink,
    RouterLinkActive,
    NavigationEnd,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-site-header',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './site-header.html',
    styleUrl: './site-header.scss',
})
export class SiteHeader implements OnInit {
    isMenuOpen = false;
    currentRoute = '';

    constructor(private router: Router) {
        // Initialize with current URL immediately
        this.currentRoute = this.router.url;
    }

    ngOnInit() {
        // Set initial route again in case it changed
        this.currentRoute = this.router.url;

        // Listen to route changes
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.currentRoute = event.url;
                console.log('Route changed to:', this.currentRoute); // Debug log
            });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
    }

    closeMenu() {
        this.isMenuOpen = false;
    }

    navigateAndScrollToTop(route: string) {
        this.router.navigate([route]).then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        this.closeMenu();
    }

    isActive(route: string): boolean {
        console.log(
            'Checking isActive for:',
            route,
            'Current route:',
            this.currentRoute
        );

        if (route === '/') {
            return (
                this.currentRoute === '/' ||
                this.currentRoute === '' ||
                this.currentRoute === '/home'
            );
        }
        return this.currentRoute === route;
    }
}
