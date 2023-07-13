import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const povezave = [
  {
    label: 'Etika in operaterski postopki',
    href: 'http://www.hamradio.si/images/dokumenti/publikacije/etika_junij%202021.pdf',
  },
  {
    label: 'Izpitni roki ZRS',
    href: 'http://www.hamradio.si/index.php?option=com_content&view=article&id=677&Itemid=118',
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

export default function Home() {
  return (
    <>
      <div className="content container my-10">
        <h3>Kaj je radioamaterstvo?</h3>
        <p>.... --- .-- / ... .... --- ..- .-.. -.. / .. / -.- -. --- .--</p>

        <h3>Primerjava kategorij</h3>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex flex-1 flex-col gap-4 rounded-lg bg-light p-6 shadow-md">
            <h4 className="text-center">N razred</h4>
            <p>
              N razred je namenjen začetnikom, ki se šele spoznavajo z
              radioamaterstvom in niso še tako vešči v elektroniki.
            </p>

            <div className="border-t border-gray-400" />

            <ul className="flex flex-col gap-2">
              <li className="flex flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faCircle}
                  className="h-4 text-gray-500"
                />
                <span>Uporaba le glavnih radioamaterskih frekvenc</span>
              </li>
              <li className="flex flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faCircle}
                  className="h-4 text-gray-500"
                />
                <span>Manjša moč</span>
              </li>
              <li className="flex flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faCircle}
                  className="h-4 text-gray-500"
                />
                <span>Ozek izbor klicnih znakov</span>
              </li>
            </ul>

            <div className="border-t border-gray-400" />

            <h5 className="text-center">Klicni znaki</h5>
            <ul>
              <li>S52AAA - S52XZZ in S52ZAA - S52ZZZ</li>
              <li>S58AAA - S58XZZ</li>
            </ul>
          </div>
          <div className="flex flex-1 flex-col gap-4 rounded-lg bg-light p-6 shadow-md">
            <h4 className="text-center">A razred</h4>
            <p>
              A razred je namenjen tistim, ki želijo delovati na vseh amaterskih
              frekvencah in z večjo močjo.
            </p>

            <div className="border-t border-gray-400" />

            <ul className="flex flex-col gap-2">
              <li className="flex flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="h-4 text-green-500"
                />
                <span>Uporaba vseh radioamaterskih frekvenc</span>
              </li>
              <li className="flex flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="h-4 text-green-500"
                />
                <span>Večja moč</span>
              </li>
              <li className="flex flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="h-4 text-green-500"
                />
                <span>Širši izbor klicnih znakov</span>
              </li>
              <li className="flex flex-row items-center gap-2">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="h-4 text-green-500"
                />
                <span>Uporaba radioamaterskih satelitskih storitev</span>
              </li>
            </ul>

            <div className="border-t border-gray-400" />

            <h5 className="text-center">Klicni znaki</h5>
            <ul>
              <li>S50A - S59Z</li>
              <li>S50AA - S59ZZ</li>
              <li>S50AAA - S50XZZ</li>
              <li>S54AAA - S54XZZ in S54ZAA - S54ZZZ</li>
              <li>S56AAA - S56XZZ in S56ZAA - S56ZZZ</li>
              <li>S57AAA - S57XZZ in S57ZAA - S57ZZZ</li>
              <li>S58ZAA - S58ZZZ</li>
            </ul>
          </div>
        </div>

        <h5>Preizkus sprejema in oddaje Morzejevih znakov</h5>
        <p>
          Kandidat, ki na lastno željo opravlja izpit iz predmeta Sprejem in
          oddaja Morzejevih znakov, mora dokazati, da je sposoben v Morzejevih
          znakih (mednarodni Morse-kod) sprejemati na sluh in s tipkalom
          oddajati odprti tekst, skupine številk, ločila in druge znake pri
          hitrosti 25 znakov na minuto.
        </p>

        <h3>O izpitu</h3>
        <p>Na izpitu se preverja znanje iz naslednjih področij:</p>
        <ul>
          <li>Zgodovina, razvoj in pomen radioamaterstva</li>
          <li>Osnovni pojmi o radijskih kominikacijah</li>
          <li>Predpisi za amaterske radijske komunikacije</li>
          <li>Pravila in praksa v amaterskih radijskih komunikacijah</li>
          <li>Elektrotehnika</li>
          <li>Radiotehnika</li>
        </ul>
        <p>
          Za točno vsebino, si oglej{' '}
          <Link className="link" href="https://zrs.si/files/kriteriji.pdf">
            kriterij za izpit
          </Link>{' '}
          ali pa si oglej{' '}
          <Link className="link" href="/zbirka">
            zbirko vprašanj
          </Link>
          , ki se lahko pojavijo na izpitu.
        </p>

        <h3>Vsebine za pripravo na izpit</h3>
        <p>
          Vsa snov, ki se lahko pojavi v izpitnih vprašanjih je vsebovana v{' '}
          <a
            className="link"
            href="http://www.homemade.net/ra/prirocnik_novi.pdf"
          >
            Priročniku za radioamaterje (3. izdaja)
          </a>
          . V 3. izdaji je bilo najdenih že nekaj napak in predvsem mankajoče
          poglavje o detektorjih, zato je bolj priporočljiva{' '}
          <a
            className="link"
            href="https://www.radioamater.si/wp-content/uploads/2016/01/prirocnik-za-radioamaterje_2izd.pdf"
          >
            2. izdaja priročnika
          </a>
          .
        </p>
        <p>
          Če ti je branje priročnika preveč dolgočasno, si lahko pomagaš s
          prosojnicami, ki jih pripravljajo v radioklubih, ki izvajajo tečaje.
          Seveda pa je na internetu na voljo tudi veliko drugih gradiv, ki so
          lahko v pomoč pri učenju.
        </p>

        <h3>Vaja pred izpitom</h3>
        <p>
          Pred izpitom si lahko ogledaš{' '}
          <Link className="link" href="/zbirka">
            zbirko vprašanj
          </Link>
          , ki se lahko pojavijo na izpitu. Cela zbirka vprašanj je na voljo
          tudi v{' '}
          <Link className="link" href="#">
            PDF obliki
          </Link>
          .
        </p>
        <p>
          Nato si lahko tudi pomagaš s sistemom za{' '}
          <Link className="link" href="/priprava">
            vajo vprašanj
          </Link>
          , kjer lahko rešuješ vprašanja iz zbirke in se pravilni in napačni
          odgovori sproti prikazujejo.
        </p>
        <p>
          Lahko pa tudi poskusiš{' '}
          <Link className="link" href="/izpit-sim">
            rešiti preizkusni test
          </Link>
          , kjer imaš na voljo 90 minut časa za reševanje 60 vprašanj.
        </p>

        <h3>Po opravljenem izpitu</h3>
        <p>
          Po opravljenem izpitu lahko zaprosiš za klicni znak (CEPT licenco) na
          agenciji za komunikacijska omrežja in storitve Republike Slovenije
          (AKOS). Več o tem si lahko prebereš na podstrani{' '}
          <Link className="link" href="/znaki">
            Klicni znaki
          </Link>
          .
        </p>
        <p>
          Pred začetkom oddajanja pa je priporočljivo prebrati še{' '}
          <Link
            className="link"
            href="http://www.hamradio.si/images/dokumenti/publikacije/etika_junij%202021.pdf"
          >
            Etiko in operaterske postopke
          </Link>
          .
        </p>

        <h3>Uporabne povezave</h3>
        <ul>
          {povezave.map(({ label, href }) => (
            <li key={label}>
              <Link className="link" href={href}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
