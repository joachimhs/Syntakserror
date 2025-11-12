const nestJsCode = `
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
`;

const articles = [
    {
        id: 'topp-5-rammeverk', // Dette blir URL-slugen
        title: 'Topp 5 rammeverk for webutvikling du bør lære deg nå',
        category: 'Programmering',
        author: 'Ola Nordmann',
        date: '29. oktober 2025',
        readTime: '7 min',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1170&auto=format&fit=crop',
        content: `
            <p class="lead">Verden av webutvikling er i en evig tilstand av forandring. Her er de mest relevante rammeverkene for 2025.</p>
            <h2>NestJS (Node.js)</h2>
            <p>På backend-siden har NestJS blitt ekstremt populært for å bygge skalerbare server-side applikasjoner. Det er bygget med TypeScript og er sterkt inspirert av Angulars arkitektur. Her er et eksempel:</p>
            <!-- Kodeblokken vil bli satt inn her av komponenten -->
            <p>Denne strukturen gjør det enklere å jobbe i større team og vedlikeholde koden over tid.</p>
        `,
        codeExample: nestJsCode,
    },
    // Legg til flere artikler her i fremtiden
    // {
    //     id: 'slik-bygger-du-pc',
    //     title: 'Bygg den ultimate PC-en i 2025',
    //     ...
    // }
];

// Funksjon for å hente alle artikler (for hjemmesiden)
export function getAllArticles() {
    return articles;
}

// Funksjon for å hente én spesifikk artikkel basert på ID/slug
export function getArticle(id) {
    return articles.find(article => article.id === id);
}