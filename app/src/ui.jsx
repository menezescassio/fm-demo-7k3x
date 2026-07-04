// Shared presentational helpers built on Astryx primitives.
import { Text } from '@astryxdesign/core/Text';
import { HStack } from '@astryxdesign/core/Stack';
import { Tooltip } from '@astryxdesign/core/Tooltip';

// Signature Avra-style micro-label: tiny uppercase monospace, wide tracking.
// `code` type pulls the JetBrains Mono family from the theme.
export function MicroLabel({ children, color = 'secondary', size = '2xs', style }) {
  return (
    <Text
      type="code"
      size={size}
      color={color}
      style={{ textTransform: 'uppercase', letterSpacing: '0.18em', ...style }}
    >
      {children}
    </Text>
  );
}

// Eyebrow: micro-label followed by a short amber rule (the single accent).
export function Eyebrow({ children }) {
  return (
    <HStack gap={2} vAlign="center" style={{ marginBottom: 'var(--spacing-2)' }}>
      <MicroLabel color="accent" size="xsm">{children}</MicroLabel>
      <span
        aria-hidden="true"
        style={{ height: '1px', width: '42px', background: 'var(--color-accent)' }}
      />
    </HStack>
  );
}

// Inline source citation: mono chip, amber dotted underline. When a provenance
// `title` is given it carries the exact "Source: …" string in a hover tooltip.
export function Cite({ text, title }) {
  const chip = (
    <Text
      type="code"
      size="2xs"
      color="accent"
      style={{
        borderBottom: '1px dotted var(--color-accent)',
        cursor: title ? 'help' : 'default',
        whiteSpace: 'nowrap',
        marginInlineStart: 'var(--spacing-1)',
      }}
    >
      {text}
    </Text>
  );
  if (!title) return chip;
  return (
    <Tooltip content={title} hasHoverIndication={false}>
      {chip}
    </Tooltip>
  );
}
