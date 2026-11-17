import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/piskotki')({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: 'Piškotki — terjatve.si' },
      { name: 'description', content: 'Informacije o piškotkih in merjenju obiska na spletni strani terjatve.si.' },
      { property: 'og:title', content: 'Piškotki — terjatve.si' },
      { property: 'og:description', content: 'Kako terjatve.si uporablja piškotke in meri obisk.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
});

function CookiesPage() {
  return (
    <main className="legal-page">
      <Link to="/" className="legal-page__back">← Nazaj na spletno stran</Link>
      <h1>Piškotki</h1>
      <p className="legal-page__updated">Zadnja posodobitev: november 2026</p>

      <h2>Kaj so piškotki?</h2>
      <p>
        Piškotki so majhne datoteke, ki jih spletne strani shranijo v vaš brskalnik. Na tej strani
        jih skoraj ne uporabljamo — za merjenje obiska piškotkov ne uporabljamo.
      </p>

      <h2>Merjenje obiska</h2>
      <p>
        Obisk strani merimo z orodjem za analitiko, ki ga zagotavlja ponudnik gostovanja. To
        orodje <strong>ne uporablja piškotkov</strong>, v vašo napravo ne shranjuje ničesar, ne
        hrani vaših IP-naslovov in obiskovalcev ne more prepoznati — vsak obisk šteje posebej.
      </p>
      <p>Za vsakega obiskovalca se beleži:</p>
      <ul>
        <li>katere strani si ogledate in od kod ste prišli,</li>
        <li>država, brskalnik, operacijski sistem in vrsta naprave (računalnik, telefon, tablica),</li>
        <li>koliko časa ostanete na strani, kako hitro se strani naložijo in morebitne napake,</li>
        <li>kliki na gumbe in povezave.</li>
      </ul>
      <p>
        Podrobni podatki se hranijo 90 dni, dnevni povzetki (število obiskov in ogledanih strani)
        pa eno leto. Podatke zbira ponudnik gostovanja in jih uporablja izključno za statistiko
        obiska te strani.
      </p>

      <h2>Prijava za skrbnike</h2>
      <p>
        Stran ima skrbniški vmesnik za urejanje vsebine. Ob prijavi skrbnika se v brskalniku
        shrani podatke o prijavni seji (prijavni žeton), da skrbnik ostane prijavljen. Ti podatki
        se shranjujejo samo obiskovalcem, ki se dejansko prijavijo — običajni obiskovalci jih ne
        prejmejo.
      </p>

      <h2>Pisave</h2>
      <p>
        Za prikaz besedila stran naloži pisave Google Fonts s strežnikov družbe Google. Ob tem se
        vaš brskalnik poveže z Googlovimi strežniki, ki prejmejo vaš IP-naslov, kot pri vsakem
        obisku spletne strani.
      </p>

      <h2>Kontakt</h2>
      <p>
        Za vprašanja o piškotkih in zasebnosti nam pišite na{' '}
        <a href="mailto:info@terjatve.si">info@terjatve.si</a> ali pokličite{' '}
        <a href="tel:+38615473622">01/547 36 22</a>.
      </p>
    </main>
  );
}
