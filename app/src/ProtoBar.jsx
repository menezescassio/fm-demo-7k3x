// Prototype scaffolding bar — NOT product chrome. Screen switcher lives here.
import { HStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl';

export default function ProtoBar({ screen, onGo }) {
  return (
    <HStack
      hAlign="between"
      vAlign="center"
      gap={4}
      style={{
        background: 'var(--color-background-inverted)',
        padding: 'var(--spacing-1) var(--spacing-3)',
        minHeight: '44px',
      }}
    >
      <HStack gap={2} vAlign="center" style={{ minWidth: 0 }}>
        <Text
          type="code"
          size="3xs"
          style={{
            textTransform: 'uppercase', letterSpacing: '0.16em', fontWeight: 600,
            color: 'var(--color-background-inverted)',
            background: 'var(--color-accent)',
            padding: '2px 6px', borderRadius: 'var(--radius-none)',
          }}
        >
          Prototype
        </Text>
        <Text type="code" size="2xs" maxLines={1} style={{ color: 'var(--color-text-disabled)' }}>
          First Monday · three-screen flow
        </Text>
      </HStack>

      <SegmentedControl
        size="sm"
        label="Prototype screen"
        value={screen}
        onChange={onGo}
      >
        <SegmentedControlItem value="s1" label="S1 First session" />
        <SegmentedControlItem value="s2" label="S2 Result + install" />
        <SegmentedControlItem value="s3" label="S3 Monday recap" />
      </SegmentedControl>
    </HStack>
  );
}
