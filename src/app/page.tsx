import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Radioamaterstvo, izpit in dovoljenje',
  description:
    'Izvedite kaj pomeni biti radioamater, kako začeti s hobijem, kako se pripraviti na izpit in kako pridobiti radioamatersko dovoljenje',
};

const povezave = [
  {
    label: 'Izpitni roki ZRS',
    href: 'https://www.hamradio.si/kako-postati-radioamater/',
  },
  {
    label: 'Kriteriji za izpit',
    href: 'https://zrs.si/files/kriteriji.pdf',
  },
  {
    label: 'Seznam zasedenih klicnih znakov',
    href: 'https://www.akos-rs.si/registri/seznam-registrov/radioamaterji',
  },
];

const classes = [
  {
    premium: false,
    name: 'N razred',
    description:
      'N razred je namenjen začetnikom, ki se šele spoznavajo z radioamaterstvom in niso še tako vešči v elektroniki.',
    perks: [
      <>
        Uporaba le nekaterih frekvenčnih pasov{' '}
        <span className="text-sm font-light">(4 KV, 4 UKV)</span>
      </>,
      <>
        Manjša moč{' '}
        <span className="text-sm font-light">(KV - 100 W, UKV - 25 W)</span>
      </>,
      <>Ozek izbor klicnih znakov</>,
    ],
    callsigns: ['S52AAA - S52XZZ in S52ZAA - S52ZZZ', 'S58AAA - S58XZZ'],
  },
  {
    premium: true,
    name: 'A razred',
    description:
      'A razred je namenjen tistim, ki želijo delovati na vseh amaterskih frekvencah in z večjo močjo.',
    perks: [
      <>Uporaba vseh radioamaterskih frekvenčnih pasov</>,
      <>
        Večja moč <span className="text-sm font-light">(do 1500 W)</span>
      </>,
      <>Širši izbor klicnih znakov</>,
      <>Uporaba radioamaterskih satelitskih storitev</>,
    ],
    callsigns: [
      'S50A - S59Z',
      'S50AA - S59ZZ',
      'S50AAA - S50XZZ',
      'S54AAA - S54XZZ in S54ZAA - S54ZZZ',
      'S56AAA - S56XZZ in S56ZAA - S56ZZZ',
      'S57AAA - S57XZZ in S57ZAA - S57ZZZ',
      'S58ZAA - S58ZZZ',
    ],
  },
];

export default function Home() {
  return (
    <>
      <div className="section container prose">
        <h1>Kaj je radioamaterstvo?</h1>
        <p>
          Radioamaterstvo je ljubiteljsko, nepoklicno ukvarjanje z radiom in
          radiotehniko. Vsak radioamater v radioamaterstvu najde nekaj kar ga
          zanima. Nekateri se ukvarjajo z gradnjo radijskih postaj, drugi z
          vzpostavljanjem radijskih zvez, nekateri radi tekmujejo v
          vzpostavljanju radijskih zvez ali pa iskanjem skritih oddajnikov.
          Radioamaterji so tudi pomočniki v primeru naravnih nesreč, ko se
          porušijo komunikacijske povezave.
        </p>
        <p>
          Radioamaterji uporabljajo določene frekvence, ki so jim dodeljene s
          strani mednarodne organizacije ITU. Za uporabo teh frekvenc je
          potrebno opraviti radioamaterski izpit in pridobiti radioamatersko
          dovoljenje (CEPT licenco).
        </p>
      </div>

      <div className="bg-light">
        <div className="section container">
          <div className="prose mx-auto">
            <h2 className="text-center">Razreda radioamaterjev</h2>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-6 md:flex-row md:items-stretch">
            {classes.map((c) => (
              <div
                key={c.name}
                className={`flex max-w-sm flex-1 flex-col rounded-2xl p-6 ${
                  c.premium ? 'bg-dark text-light' : 'bg-white'
                }`}
              >
                <h4 className="mb-4 text-center text-lg font-bold">{c.name}</h4>
                <p>{c.description}</p>

                <div className={`divider ${c.premium ? '!bg-gray-500' : ''}`} />

                <ul className="flex flex-col gap-2">
                  {c.perks.map((p, i) => (
                    <li key={i} className="flex flex-row items-start gap-2">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="mt-1 h-4 w-4 text-primary"
                      />
                      <div className="flex-1">{p}</div>
                    </li>
                  ))}
                </ul>

                <div className={`divider ${c.premium ? '!bg-gray-500' : ''}`} />

                <h5 className="mb-2 text-center font-semibold">Klicni znaki</h5>
                <ul className="text-sm">
                  {c.callsigns.map((cs, i) => (
                    <li key={i}>{cs}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section container prose">
        <h2>O izpitu</h2>
        <p>Na izpitu se preverja znanje iz naslednjih področij:</p>
        <ul>
          <li>Zgodovina, razvoj in pomen radioamaterstva</li>
          <li>Osnovni pojmi o radijskih komunikacijah</li>
          <li>Predpisi za amaterske radijske komunikacije</li>
          <li>Pravila in praksa v amaterskih radijskih komunikacijah</li>
          <li>Elektrotehnika</li>
          <li>Radiotehnika</li>
        </ul>
        <p>
          Za točno vsebino, si oglej{' '}
          <Link target="_blank" href="https://zrs.si/files/kriteriji.pdf">
            kriterij za izpit
          </Link>{' '}
          ali pa si oglej <Link href="/zbirka">zbirko vprašanj</Link>, ki se
          lahko pojavijo na izpitu.
        </p>

        <h3>Preizkus sprejema in oddaje Morzejevih znakov</h3>
        <p>
          Kandidat, ki na lastno željo opravlja izpit iz predmeta Sprejem in
          oddaja Morzejevih znakov, mora dokazati, da je sposoben v Morzejevih
          znakih (mednarodni Morse-kod) sprejemati na sluh in s tipkalom
          oddajati odprti tekst, skupine številk, ločila in druge znake pri
          hitrosti 25 znakov na minuto.
        </p>

        <h3>Izpitni roki</h3>
        <p>
          Zveza radioamaterjev Slovenije nekajkrat letno organizira izpite za
          radioamaterje. Izpitni roki so objavljeni na{' '}
          <Link
            target="_blank"
            href="https://www.hamradio.si/kako-postati-radioamater/"
          >
            spletni strani ZRS
          </Link>
          . Poleg teh izpitov lahko radioklubi organizirajo izpite za svoje
          tečajnike.
        </p>

        <h2>Vsebine za pripravo na izpit</h2>
        <p>
          Vsa snov, ki se lahko pojavi v izpitnih vprašanjih je vsebovana v{' '}
          <Link
            target="_blank"
            href="https://www.s59veg.si/files/prirocnik_2019.pdf"
          >
            Priročniku za radioamaterje (3. izdaja)
          </Link>
          . V 3. izdaji je bilo najdenih že nekaj napak in predvsem manjkajoče
          poglavje o detektorjih, zato je bolj priporočljiva{' '}
          <Link
            target="_blank"
            href="https://www.radioamater.si/wp-content/uploads/2016/01/prirocnik-za-radioamaterje_2izd.pdf"
          >
            2. izdaja priročnika
          </Link>
          .
        </p>
        <p>
          Če ti je branje priročnika preveč dolgočasno, si lahko pomagaš s
          prosojnicami, ki jih pripravljajo v radioklubih, ki izvajajo tečaje.
          Seveda pa je na internetu na voljo tudi veliko drugih gradiv, ki so
          lahko v pomoč pri učenju.
        </p>

        <h2>Vaje za izpit</h2>
        <p>
          Pred izpitom si lahko ogledaš{' '}
          <Link href="/zbirka">zbirko vprašanj</Link>, ki se lahko pojavijo na
          izpitu.
          {/* Cela zbirka vprašanj je na voljo
          tudi v{' '}
          <Link href="#">
            PDF obliki
          </Link>
          . */}
        </p>
        <p>
          Nato si lahko tudi pomagaš s sistemom za{' '}
          <Link href="/priprave">vajo vprašanj</Link>, kjer lahko rešuješ
          vprašanja iz zbirke in se pravilni in napačni odgovori sproti
          prikazujejo.
        </p>
        <p>
          Lahko pa tudi poskusiš{' '}
          <Link href="/izpit-sim">rešiti preizkusni test</Link>, kjer imaš na
          voljo 90 minut časa za reševanje 60 vprašanj.
        </p>

        <h2>Po opravljenem izpitu</h2>
        <p>
          Po opravljenem izpitu lahko zaprosiš za klicni znak (CEPT licenco) na
          agenciji za komunikacijska omrežja in storitve Republike Slovenije
          (AKOS). Več o tem si lahko prebereš na podstrani{' '}
          <Link href="/licenca">Licenca</Link>.
        </p>
        <p>
          Pred začetkom oddajanja pa je priporočljivo prebrati še{' '}
          <Link
            target="_blank"
            href="https://www.s59veg.si/files/etika_junij_2021.pdf"
          >
            Etiko in operaterske postopke
          </Link>
          .
        </p>

        <h2>Uporabne povezave</h2>
        <ul>
          {povezave.map(({ label, href }) => (
            <li key={label}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
