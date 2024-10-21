import { SubHeader } from '@/components/sub_header';
import { Metadata } from 'next';
import Link from 'next/link';
import RandomCallsign from './random-callsign';

export const metadata: Metadata = {
  title: 'Radioamatersko dovoljenje',
  description:
    'Radioamatersko dovoljenje (CEPT licenca), ki vam omogoča, da začnete uporabljati radioamaterske frekvence',
  keywords: [
    'dovoljenje',
    'radioamatersko dovoljenje',
    'licenca',
    'CEPT licenca',
    'radioamaterska licenca',
    'klicni znak',
    'callsign',
    'call sign',
  ],
};

export default function License() {
  return (
    <>
      <SubHeader>
        <h1>
          Radioamatersko dovoljenje
          <br />
          (CEPT licenca)
        </h1>
        <p>
          Radioamaterska dovoljenja izdaja{' '}
          <Link target="_blank" href="https://www.akos-rs.si/">
            agencija za komunikacijska omrežja in storitve Republike Slovenije
            (AKOS)
          </Link>
          .
        </p>
        <p>
          Po opravljenem izpitu lahko zaprosiš za radioamatersko dovoljenje, ki
          ga lahko uporabljaš v vseh{' '}
          <Link
            target="_blank"
            href="https://en.wikipedia.org/wiki/European_Conference_of_Postal_and_Telecommunications_Administrations"
          >
            državah članicah CEPT
          </Link>
          .
        </p>
      </SubHeader>

      <div className="section container prose">
        <h2>Klicni znak</h2>
        <p>
          Klicne znake v Sloveniji določa <strong>6. člen</strong>{' '}
          <Link
            target="_blank"
            href="https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2023-01-0256/#(klicni%C2%A0znaki)"
          >
            splošnega akta o pogojih za uporabo radijskih frekvenc, namenjenih
            radioamaterski in radioamaterski satelitski storitvi
          </Link>
          .
        </p>
        <p>
          Klicni znak, s katerim se identificira oddajanje radioamaterske
          radijske postaje, je sestavljen iz:
        </p>
        <ul>
          <li>črke in številke &quot;S5&quot;</li>
          <li>ene številke od 0 do 9 in</li>
          <li>ene, dveh ali treh črk od 26-ih črk mednarodne abecede (A-Z).</li>
        </ul>

        <RandomCallsign />

        <h3>Izbira klicnega znaka</h3>
        <p>
          Seznam zasedenih klicnih znakov je dostopen v{' '}
          <Link
            target="_blank"
            href="https://www.akos-rs.si/registri/seznam-registrov/radioamaterji"
          >
            registru radioamaterjev
          </Link>
          .
        </p>
        <p>
          Klicni znak si lahko izbereš glede na razred izpita, ki si ga opravil.
        </p>
        <div className="my-6 flex flex-col gap-6 md:flex-row">
          <div className="flex flex-1 flex-col rounded-lg bg-light px-4 shadow-md">
            <h3 className="text-center">N razred</h3>

            <ul>
              <li>S52AAA - S52XZZ in S52ZAA - S52ZZZ</li>
              <li>S58AAA - S58XZZ</li>
            </ul>
          </div>
          <div className="flex flex-1 flex-col rounded-lg bg-light px-4 shadow-md">
            <h3 className="text-center">A razred</h3>

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

        <Link href="/klicni-znak" className="button w-full">
          Pomagaj izbrati klicni znak
        </Link>
      </div>

      <div className="flex bg-light">
        <div className="section container prose">
          <h2>Vloga za radioamatersko dovoljenje</h2>
          <p>
            Vlogo za radioamatersko dovoljenje je možno oddati elektronsko (z
            digitalnim potrdilom), ali pa z izpolnjenim obrazcem poslanega po
            pošti.
          </p>
          <p>
            Priporočljivo je, da na vlogi izpolniš vse tri klicne znake, ki jih
            želiš imeti v primeru, da je prvi klicni znak že zaseden ali pa ga
            zavrnejo.
          </p>
          <p>
            Od začetka leta 2023 se za izdajo in podaljšanje radioamaterskega
            dovoljenja <strong>plača uporabo dela radijskega spektra</strong>{' '}
            (frekvenčnino) v višini 60 točk. Točka je vredna 0,66 € (2024).
          </p>
          <p>
            Radioamatersko dovoljenje velja 15 let, po tem času pa ga je
            potrebno podaljšati. Po poteku veljavnosti velja še 10 letni
            moratorij za klicni znak.
          </p>

          <div className="mt-6 flex flex-col gap-4 text-center md:flex-row">
            <Link
              target="_blank"
              className="button flex-1"
              href="https://evloge.akos-rs.si/"
            >
              Elektronska vloga
            </Link>
            <Link
              target="_blank"
              className="button flex-1"
              href="https://www.akos-rs.si/fileadmin/user_upload/Vloga_za_radioamatersko_dovoljenje.dotx"
            >
              Obrazec
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
