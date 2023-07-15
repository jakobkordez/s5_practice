import { SubHeader } from '@/components/sub_header';
import { Metadata } from 'next';
import CallsignTool from './callsign-tool';

export const metadata: Metadata = {
  title: 'Izbira klicnega znaka',
  description: 'Pomoč pri izbiri klicnega znaka',
};

export default function Callsign() {
  return (
    <>
      <SubHeader title="Pomoč pri izbiri klicnega znaka">
        <p className="text-lg">
          Spodaj vpiši želen klicni znak in preveri, če je ta že zaseden in če
          je za pravi razred.
        </p>
      </SubHeader>

      <CallsignTool />
    </>
  );
}
