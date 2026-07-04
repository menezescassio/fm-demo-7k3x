// S2 — first value: result card with source citations + install moment.
import { VStack, HStack, StackItem } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';
import { Card } from '@astryxdesign/core/Card';
import { Divider } from '@astryxdesign/core/Divider';
import { Button } from '@astryxdesign/core/Button';
import { Banner } from '@astryxdesign/core/Banner';
import { MetadataList, MetadataListItem } from '@astryxdesign/core/MetadataList';
import { List, ListItem } from '@astryxdesign/core/List';
import { Eyebrow, MicroLabel, Cite } from '../ui.jsx';
import { S2_RESULTS, INSTALL } from '../data.js';

function ResultCard({ r }) {
  return (
    <Card padding={0}>
      <VStack gap={0}>
        <HStack hAlign="between" vAlign="center" gap={4} style={{ padding: 'var(--spacing-3)' }}>
          <Text color="secondary" size="sm">
            Task: <Text as="span" weight="semibold" color="primary">{r.task}</Text>
          </Text>
          <MicroLabel color="accent" size="2xs" style={{ whiteSpace: 'nowrap' }}>{r.ok}</MicroLabel>
        </HStack>
        <Divider />
        <VStack gap={3} style={{ padding: 'var(--spacing-3)' }}>
          <Text style={{ maxWidth: '72ch' }}>{r.summary}</Text>
          <MetadataList columns="single" label={{ position: 'start', width: 240 }}>
            {r.rows.map((row, i) => (
              <MetadataListItem key={i} label={row.k}>
                <Text as="span" hasTabularNumbers weight="medium">{row.v}</Text>
                <Cite text={row.cite.text} title={row.cite.title} />
              </MetadataListItem>
            ))}
          </MetadataList>
        </VStack>
        <Divider />
        <VStack gap={2} style={{ padding: 'var(--spacing-3)' }}>
          <MicroLabel size="3xs">{r.sourcesHead}</MicroLabel>
          <List listStyle="decimal" density="compact">
            {r.sources.map((s, i) => (
              <ListItem
                key={i}
                label={
                  <Text size="xsm" color="secondary">
                    <Text as="span" type="code" size="2xs" weight="semibold" color="primary">{s.file}</Text>
                    {s.detail}
                  </Text>
                }
              />
            ))}
          </List>
        </VStack>
      </VStack>
    </Card>
  );
}

function Install({ installed, onInstall }) {
  if (installed) {
    return (
      <Banner
        status="success"
        title={INSTALL.doneTitle}
        description={INSTALL.doneBody}
      />
    );
  }
  return (
    <HStack
      hAlign="between"
      vAlign="center"
      gap={5}
      wrap="wrap"
      style={{
        background: 'var(--color-background-inverted)',
        borderRadius: 'var(--radius-element)',
        padding: 'var(--spacing-5)',
      }}
    >
      <StackItem size="fill">
        <VStack gap={1} style={{ maxWidth: '58ch' }}>
          <Text weight="semibold" size="lg" style={{ color: 'var(--color-background-surface)' }}>
            {INSTALL.title}
          </Text>
          <Text size="sm" style={{ color: 'var(--color-text-disabled)' }}>{INSTALL.body}</Text>
        </VStack>
      </StackItem>
      <Button variant="primary" label={INSTALL.button} onClick={onInstall} />
    </HStack>
  );
}

export default function S2({ role, installed, onBack, onInstall }) {
  const r = S2_RESULTS[role] || S2_RESULTS.broker;
  return (
    <VStack gap={0} style={{ maxWidth: '960px' }}>
      <HStack style={{ marginBottom: 'var(--spacing-2)' }}>
        <Button variant="ghost" size="sm" label="← Back to starter tasks" onClick={onBack} />
      </HStack>
      <Eyebrow>First value</Eyebrow>
      <Heading level={1} type="display-3" textWrap="balance" style={{ maxWidth: '30ch' }}>
        {r.title}
      </Heading>
      <Text color="secondary" style={{ maxWidth: '66ch', marginTop: 'var(--spacing-2)', marginBottom: 'var(--spacing-5)' }}>
        {r.lede}
      </Text>

      <VStack gap={3}>
        <ResultCard r={r} />
        <Install installed={installed} onInstall={onInstall} />
      </VStack>
    </VStack>
  );
}
