import { Metadata } from 'next';
import Generator from './generator';

export const metadata: Metadata = {
  title: 'Generator izpitnih pol',
  description: 'Pripomoček za generiranje izpitnih pol za radioamaterski izpit',
};

export default function Izpit() {
  return (
    <div className="section">
      <div className="content">
        <h1>Generator izpitnih pol</h1>
      </div>

      <div className="notification is-danger is-light">
        <strong>Opomba:</strong> Generator izpitnih pol je še v razvoju.
      </div>

      <Generator />
    </div>
  );
}
