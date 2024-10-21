import 'katex/dist/katex.min.css';
import KaTeX from 'katex';
import { memo } from 'react';

interface TeXProps {
  math: string;
}

export default memo(TeX);

export function TeX({ math }: TeXProps) {
  const innerHtml = KaTeX.renderToString(math);

  return <span dangerouslySetInnerHTML={{ __html: innerHtml }} />;
}
