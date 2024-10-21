import { SubHeader } from '@/components/sub_header';
import { Metadata } from 'next';
import CallsignTool from './callsign-tool';

export const metadata: Metadata = {
  title: 'Izbira klicnega znaka',
  description: 'Orodje, ki vam pomaga pri izbiri lastnega klicnega znaka',
  keywords: [
    'klicni znak',
    'callsign',
    'call sign',
    'radioamaterski klicni znak',
  ],
};

export default function Callsign() {
  return (
    <>
      <SubHeader>
        <h1>Pomoč pri izbiri klicnega znaka</h1>
        <p className="text-lg">
          Spodaj vpiši želen klicni znak in preveri, če je ta že zaseden in če
          ustreza izbranem razredu.
        </p>
      </SubHeader>

      <CallsignTool />
    </>
  );
}
