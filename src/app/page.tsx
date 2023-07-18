import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const povezave = [
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
      <div className="content section container">
        <h3>Kaj je radioamaterstvo?</h3>
        <p>
          Radioamaterstvo je ljubiteljsko, nepoklicno ukvarjanje z radiom in
          radiotehniko. Vsak radioamater v radioamatestvu najde nekaj kar ga
          zanima. Nekateri se ukvarjajo z gradnjo radijskih postaj, drugi z
          vzpostavljanjem radijskih zvez, nekateri radi tekmujejo v
          vzpostavljanju radijskih zvez ali pa iskanjem skritih oddajnikov.
          Radioamaterji so tudi pomočniki v primeru naravnih nesreč, ko se
          porušijo komunikacijske povezave. Radioamaterji uporabljajo določene
          frekvence, ki so jim dodeljene s strani mednarodne organizacije ITU.
        </p>
      </div>

      <div className="bg-light">
        <div className="content section container">
          <h3 className="text-center">Primerjava kategorij</h3>
          <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-stretch">
            <div className="flex max-w-sm flex-1 flex-col gap-4 rounded-2xl bg-white p-6">
              <h4 className="text-center">N razred</h4>
              <p>
                N razred je namenjen začetnikom, ki se šele spoznavajo z
                radioamaterstvom in niso še tako vešči v elektroniki.
              </p>

              <div className="border-t border-gray-400" />

              <ul className="flex flex-col gap-2">
                <li className="flex flex-row items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mt-1 h-4 text-primary"
                  />
                  <div className="flex-1">
                    Uporaba le glavnih radioamaterskih frekvenc
                  </div>
                </li>
                <li className="flex flex-row items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mt-1 h-4 text-primary"
                  />
                  <div className="flex-1">Manjša moč</div>
                </li>
                <li className="flex flex-row items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mt-1 h-4 text-primary"
                  />
                  <div className="flex-1">Ozek izbor klicnih znakov</div>
                </li>
              </ul>

              <div className="border-t border-gray-400" />

              <h5 className="text-center">Klicni znaki</h5>
              <ul>
                <li>S52AAA - S52XZZ in S52ZAA - S52ZZZ</li>
                <li>S58AAA - S58XZZ</li>
              </ul>
            </div>
            <div className="flex max-w-sm flex-1 flex-col gap-4 rounded-2xl bg-dark p-6 text-white">
              <h4 className="text-center">A razred</h4>
              <p>
                A razred je namenjen tistim, ki želijo delovati na vseh
                amaterskih frekvencah in z večjo močjo.
              </p>

              <div className="border-t border-gray-400" />

              <ul className="flex flex-col gap-2">
                <li className="flex flex-row items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mt-1 h-4 text-primary"
                  />
                  <div className="flex-1">
                    Uporaba vseh radioamaterskih frekvenc
                  </div>
                </li>
                <li className="flex flex-row items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mt-1 h-4 text-primary"
                  />
                  <div className="flex-1">Večja moč</div>
                </li>
                <li className="flex flex-row items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mt-1 h-4 text-primary"
                  />
                  <div className="flex-1">Širši izbor klicnih znakov</div>
                </li>
                <li className="flex flex-row items-start gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="mt-1 h-4 text-primary"
                  />
                  <div className="flex-1">
                    Uporaba radioamaterskih satelitskih storitev
                  </div>
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
        </div>
      </div>

      <div className="content section container">
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

        <h5>Preizkus sprejema in oddaje Morzejevih znakov</h5>
        <p>
          Kandidat, ki na lastno željo opravlja izpit iz predmeta Sprejem in
          oddaja Morzejevih znakov, mora dokazati, da je sposoben v Morzejevih
          znakih (mednarodni Morse-kod) sprejemati na sluh in s tipkalom
          oddajati odprti tekst, skupine številk, ločila in druge znake pri
          hitrosti 25 znakov na minuto.
        </p>

        <h5>Izpitni roki</h5>
        <p>
          Zveza radioamaterjev Slovenije nekajkrat letno organizira izpite za
          radioamaterje. Izpitni roki so objavljeni na{' '}
          <Link
            className="link"
            href="http://www.hamradio.si/index.php?option=com_content&view=article&id=677&Itemid=118"
          >
            spletni strani ZRS
          </Link>
          . Poleg teh izpitov lahko radioklubi organizirajo izpite za svoje
          tečajnike.
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

        <h3>Vaje za izpit</h3>
        <p>
          Pred izpitom si lahko ogledaš{' '}
          <Link className="link" href="/zbirka">
            zbirko vprašanj
          </Link>
          , ki se lahko pojavijo na izpitu.
          {/* Cela zbirka vprašanj je na voljo
          tudi v{' '}
          <Link className="link" href="#">
            PDF obliki
          </Link>
          . */}
        </p>
        <p>
          Nato si lahko tudi pomagaš s sistemom za{' '}
          <Link className="link" href="/priprave">
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
          <Link className="link" href="/licenca">
            Licenca
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
