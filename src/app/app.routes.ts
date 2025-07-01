import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LodgingComponent } from './lodging/lodging';
import { FoodAndDrinksComponent } from './food-and-drinks/food-and-drinks';
import { TransportationComponent } from './transportation/transportation';
import { FaqComponent } from './faq/faq';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'lodging', component: LodgingComponent },
    { path: 'food-and-drinks', component: FoodAndDrinksComponent },
    { path: 'transportation', component: TransportationComponent },
    { path: 'faq', component: FaqComponent },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
