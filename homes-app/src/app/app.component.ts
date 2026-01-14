import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-root',
    template: `<main>
      <header class="brand-name">
        <img class="brand-logo" 
        src="/assets/logo.svg" 
        alt="Brand Logo" aria-hidden="true"/>
        <h1 class="brand-title">{{ title }}</h1>
      </header>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
    `,
    styleUrls: ['./app.component.css'],
    imports: [RouterModule]
})
export class AppComponent {
  title = 'Client Side Homes';
}