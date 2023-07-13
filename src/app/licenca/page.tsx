import { SubHeader } from '@/components/sub_header';
import { Metadata } from 'next';
import Link from 'next/link';
import RandomCallsign from './random_callsign';
import { LinkButton } from '@/components/button';

export const metadata: Metadata = {
  title: 'Radioamatersko dovoljenje',
  description: 'O radioamaterskem dovoljenju in klicnem znaku',
};

export default function License() {
  return (
    <>
      <SubHeader title="Radioamatersko dovoljenje (CEPT licenca)">
        <p>
          Radioamaterska dovoljenja izdaja{' '}
          <Link className="link-light" href="https://www.akos-rs.si/">
            agencija za komunikacijska omrežja in storitve Republike Slovenije
            (AKOS)
          </Link>
          .
        </p>
        <p>
          Po opravljenem izpitu lahko zaprosiš za radioamatersko dovoljenje, ki
          ga lahko uporabljaš v vseh{' '}
          <Link
            className="link-light"
            href="https://en.wikipedia.org/wiki/European_Conference_of_Postal_and_Telecommunications_Administrations"
          >
            državah članicah CEPT
          </Link>
          .
        </p>
      </SubHeader>

      <div className="content container my-10">
        <h3>Klicni znak</h3>
        <p>
          Klicne znake v Sloveniji določa <strong>6. člen</strong>{' '}
          <Link
            className="link"
            href="https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2023-01-0256/splosni-akt-o-pogojih-za-uporabo-radijskih-frekvenc-namenjenih-radioamaterski-in-radioamaterski-satelitski-storitvi"
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

        <h4>Izbira klicnega znaka</h4>
        <p>
          Seznam zasedenih klicnih znakov je dostopen v{' '}
          <Link
            className="link"
            href="https://www.akos-rs.si/registri/seznam-registrov/radioamaterji"
          >
            registru radioamaterjev
          </Link>
          .
        </p>
        <p>
          Klicni znak si lahko izbereš glede na razred izpita, ki si ga opravil.
        </p>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex flex-1 flex-col gap-4 rounded-lg bg-light p-6 shadow-md">
            <h4 className="text-center">N razred</h4>

            <ul>
              <li>S52AAA - S52XZZ in S52ZAA - S52ZZZ</li>
              <li>S58AAA - S58XZZ</li>
            </ul>
          </div>
          <div className="flex flex-1 flex-col gap-4 rounded-lg bg-light p-6 shadow-md">
            <h4 className="text-center">A razred</h4>

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

      <div className="flex bg-light">
        <div className="content container my-10">
          <h3>Vloga za radioamatersko dovoljenje</h3>
          <p>
            Vlogo za radioamatersko dovoljenje je možno oddati elektronsko (z
            digitalnim potrdilom), ali pa z izpolnjenim obrazcem poslanega po
            pošti.
          </p>
          <div className="flex flex-col gap-4 text-center md:flex-row">
            <LinkButton className="flex-1" href="https://evloge.akos-rs.si/">
              Elektronska vloga
            </LinkButton>
            <LinkButton
              className="flex-1"
              href="https://www.akos-rs.si/fileadmin/user_upload/Vloga_za_radioamatersko_dovoljenje.dotx"
            >
              Obrazec
            </LinkButton>
          </div>
        </div>
      </div>
    </>
  );
}
