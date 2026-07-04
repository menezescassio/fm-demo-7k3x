// S3 — the habit: Monday recap, live vs dormant (reactivation) variants.
import { VStack, HStack, StackItem } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';
import { Button } from '@astryxdesign/core/Button';
import { Divider } from '@astryxdesign/core/Divider';
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl';
import { Eyebrow, MicroLabel, Cite } from '../ui.jsx';
import { RECAPS } from '../data.js';

function DeliverableItem({ item }) {
  return (
    <Text type="supporting" color="secondary" as="p" style={{ margin: 0 }}>
      {item.html.map((seg, i) =>
        seg.b
          ? <Text as="span" key={i} weight="semibold" color="primary">{seg.b}</Text>
          : <Text as="span" key={i}>{seg.t}</Text>,
      )}
      <Cite text={item.cite} />
    </Text>
  );
}

function Deliverable({ d }) {
  const items = (
    <VStack gap={1}>
      {d.items.map((it, i) => <DeliverableItem key={i} item={it} />)}
    </VStack>
  );
  return (
    <VStack
      gap={1}
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-element)',
        background: 'var(--color-background-body)',
        padding: 'var(--spacing-3)',
      }}
    >
      <Text weight="semibold" size="sm">{d.title}</Text>
      <MicroLabel size="3xs">{d.meta}</MicroLabel>
      {d.locked
        ? <div style={{ filter: 'blur(3.5px)', opacity: 0.5, pointerEvents: 'none', userSelect: 'none' }}>{items}</div>
        : items}
    </VStack>
  );
}

function StatStrip({ stats }) {
  return (
    <HStack
      gap={0}
      style={{ borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
    >
      {stats.map((s, i) => (
        <StackItem key={i} size="fill">
          <VStack
            gap={0.5}
            style={{
              padding: 'var(--spacing-2) var(--spacing-3)',
              borderInlineStart: i === 0 ? 'none' : '1px solid var(--color-border)',
            }}
          >
            <Text type="code" size="xl" weight="medium" color={s.accent ? 'accent' : 'primary'} hasTabularNumbers>
              {s.num}
            </Text>
            <MicroLabel size="3xs">{s.lbl}</MicroLabel>
          </VStack>
        </StackItem>
      ))}
    </HStack>
  );
}

function Callout({ cta }) {
  const warn = cta.kind === 'reactivate';
  const bg = warn ? 'var(--color-warning-muted)' : 'var(--color-accent-muted)';
  const edge = warn ? 'var(--color-warning)' : 'var(--color-accent)';
  return (
    <HStack
      hAlign="between"
      vAlign="center"
      gap={3}
      wrap="wrap"
      style={{
        background: bg,
        border: `1px solid ${edge}`,
        borderInlineStart: `2px solid ${edge}`,
        borderRadius: 'var(--radius-element)',
        padding: 'var(--spacing-3)',
      }}
    >
      <StackItem size="fill">
        <Text type="supporting" color="secondary" style={{ maxWidth: '46ch' }}>
          <Text as="span" weight="semibold" color="primary" size="sm" display="block">{cta.title}</Text>
          {cta.text}
        </Text>
      </StackItem>
      <Button variant={warn ? 'primary' : 'secondary'} size="sm" label={cta.button} />
    </HStack>
  );
}

function EmailBanner({ status, text }) {
  const success = status === 'success';
  return (
    <HStack
      style={{
        padding: 'var(--spacing-1) var(--spacing-3)',
        background: success ? 'var(--color-success-muted)' : 'var(--color-warning-muted)',
        borderBottom: `1px solid ${success ? 'var(--color-success)' : 'var(--color-warning)'}`,
      }}
    >
      <MicroLabel size="2xs" color="inherit" style={{ color: success ? 'var(--color-on-success)' : 'var(--color-on-warning)', letterSpacing: '0.06em' }}>
        {text}
      </MicroLabel>
    </HStack>
  );
}

function Recap({ v }) {
  const r = RECAPS[v];
  return (
    <VStack
      gap={0}
      style={{
        maxWidth: '660px',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-container)',
        overflow: 'hidden',
        background: 'var(--color-background-surface)',
      }}
    >
      <VStack gap={1} style={{ padding: 'var(--spacing-3)' }}>
        <Text type="code" size="2xs" color="secondary">
          <Text as="span" weight="semibold" color="primary">{r.from.name}</Text> {r.from.addr}
        </Text>
        <Text weight="bold" size="lg">{r.subject}</Text>
      </VStack>
      <EmailBanner status={r.bannerStatus} text={r.banner} />
      <VStack gap={3} style={{ padding: 'var(--spacing-3)' }}>
        <Text size="sm">{r.intro}</Text>
        <Deliverable d={r.deliverable} />
        {r.stats && <StatStrip stats={r.stats} />}
        <Callout cta={r.cta} />
      </VStack>
    </VStack>
  );
}

export default function S3({ variant, onVariant }) {
  const r = RECAPS[variant];
  return (
    <VStack gap={0} style={{ maxWidth: '960px' }}>
      <Eyebrow>The habit</Eyebrow>
      <Heading level={1} type="display-3" textWrap="balance">The Monday recap.</Heading>
      <Text color="secondary" style={{ maxWidth: '66ch', marginTop: 'var(--spacing-2)', marginBottom: 'var(--spacing-5)' }}>
        The installed job runs itself and lands every Monday. The dormant variant is what pulls back a seat
        that stopped showing up, without a human in the loop.
      </Text>

      <HStack style={{ marginBottom: 'var(--spacing-5)' }}>
        <SegmentedControl size="sm" label="Recap variant" value={variant} onChange={onVariant}>
          <SegmentedControlItem value="live" label="Active seat" />
          <SegmentedControlItem value="dormant" label="Dormant seat · critical state" />
        </SegmentedControl>
      </HStack>

      <Recap v={variant} />

      <MicroLabel size="2xs" style={{ marginTop: 'var(--spacing-3)', maxWidth: '660px' }}>{r.foot}</MicroLabel>

      <Text type="supporting" color="secondary" style={{ maxWidth: '660px', marginTop: 'var(--spacing-5)', paddingTop: 'var(--spacing-3)', borderTop: '1px solid var(--color-border)' }}>
        <Text as="span" weight="semibold" color="primary" size="xsm">Why the dormant variant is the lever:</Text> 439
        Mid-Market and SMB seats are churned but still under contract. The recap reaches them with a finished
        deliverable, not a "we miss you" nudge. At an 8% return rate that is 35 seats reactivated inside 90 days.
      </Text>
    </VStack>
  );
}
