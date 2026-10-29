import type { Feature } from '@/types';
import { Card } from './Card';
import { CardGrid } from './CardGrid';
import { IconBadge } from './IconBadge';

/** Icon cards in a responsive grid, used for reasons and company values. */
export function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <CardGrid>
      {items.map((item, index) => (
        <Card key={item.title} delay={(index % 3) * 0.06}>
          <IconBadge name={item.icon} />
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </Card>
      ))}
    </CardGrid>
  );
}
