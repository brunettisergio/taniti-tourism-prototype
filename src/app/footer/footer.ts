import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './footer.html',
    styleUrl: './footer.scss',
})
export class Footer {
    constructor(private router: Router) {}

    navigateAndScrollToTop(route: string) {
        this.router.navigate([route]).then(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
