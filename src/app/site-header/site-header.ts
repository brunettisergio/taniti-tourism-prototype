import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-site-header',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './site-header.html',
    styleUrl: './site-header.scss',
})
export class SiteHeader {}
