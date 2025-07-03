import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from './site-header/site-header';
import { Footer } from './footer/footer';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, SiteHeader, Footer],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected title = 'taniti-tourism-prototype';
}
