import type { ReactNode } from "react";

const SectionCard = ({
  id,
  bodyLabel,
  header,
  body,
  actions,
  cardSpan = 4,
}: {
  id: string;
  bodyLabel: string;
  header: ReactNode;
  body: ReactNode;
  actions?: ReactNode;
  cardSpan?: 4 | 6;
}) => (
  <section id={id} className={`card span-${cardSpan}`}>
    <div className="card-header">{header}</div>
    <div className="card-body scrollable" role="region" aria-label={bodyLabel}>
      {body}
    </div>
    {actions && <div className="card-actions">{actions}</div>}
  </section>
);

export default SectionCard;
