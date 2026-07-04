// S1 — first session: role selection -> 3 role-scoped starter tasks.
import { VStack, HStack, StackItem } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { Heading } from '@astryxdesign/core/Heading';
import { SelectableCard } from '@astryxdesign/core/SelectableCard';
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Badge } from '@astryxdesign/core/Badge';
import { Eyebrow, MicroLabel } from '../ui.jsx';
import { ROLES, TASKS } from '../data.js';

function RoleChip({ role, selected, onSelect }) {
  return (
    <SelectableCard
      label={role.label}
      isSelected={selected}
      onChange={() => onSelect(role.id)}
      padding={2}
    >
      <HStack gap={2} vAlign="center">
        <Text size="sm" weight={selected ? 'semibold' : 'normal'}>{role.label}</Text>
        {role.fromInvite && <Badge variant="yellow" label="from your invite" />}
      </HStack>
    </SelectableCard>
  );
}

function TaskCard({ task, onRun }) {
  return (
    <ClickableCard label={task.title} onClick={onRun} padding={3}>
      <HStack gap={4} vAlign="start" wrap="wrap">
        <VStack gap={1} width={84}>
          <MicroLabel size="2xs">{task.tag}</MicroLabel>
        </VStack>
        <StackItem size="fill">
          <VStack gap={0.5}>
            <Text weight="semibold" size="sm">{task.title}</Text>
            <Text type="supporting" color="secondary">{task.desc}</Text>
          </VStack>
        </StackItem>
        <VStack gap={1} width={210}>
          <Text type="code" size="2xs" color="secondary">{task.doc} · {task.pg}</Text>
          <Text size="sm" weight="semibold" color="accent">Run this task →</Text>
        </VStack>
      </HStack>
    </ClickableCard>
  );
}

export default function S1({ role, onSelectRole, onRunTask }) {
  const cfg = TASKS[role];
  return (
    <VStack gap={0} style={{ maxWidth: '960px' }}>
      <Eyebrow>First login</Eyebrow>
      <Heading level={1} type="display-3" textWrap="balance" style={{ maxWidth: '20ch' }}>
        Let's get one real thing done in the next 3 minutes.
      </Heading>
      <Text color="secondary" style={{ maxWidth: '66ch', marginTop: 'var(--spacing-2)', marginBottom: 'var(--spacing-6)' }}>
        Copilot already read the documents connected to Ferro Imóveis. Pick your role and it will
        suggest three tasks it can finish right now, on your own files. No blank box, no prompt to invent.
      </Text>

      <HStack gap={2} wrap="wrap" style={{ marginBottom: 'var(--spacing-6)' }}>
        {ROLES.map((r) => (
          <RoleChip key={r.id} role={r} selected={role === r.id} onSelect={onSelectRole} />
        ))}
      </HStack>

      <HStack hAlign="between" vAlign="baseline" wrap="wrap" gap={4} style={{ marginBottom: 'var(--spacing-2)' }}>
        <Text weight="semibold" size="sm">Starter tasks for a {cfg.name}</Text>
        <MicroLabel size="2xs">Scoped to real estate · grounded in your connected files</MicroLabel>
      </HStack>

      <VStack gap={2}>
        {cfg.items.map((t, i) => (
          <TaskCard key={i} task={t} onRun={() => onRunTask(role)} />
        ))}
      </VStack>

      <Text type="supporting" color="secondary" style={{ maxWidth: '74ch', marginTop: 'var(--spacing-5)', paddingInlineStart: 'var(--spacing-3)', borderInlineStart: '2px solid var(--color-border-emphasized)' }}>
        <Text as="span" weight="semibold" size="xsm">What this replaces:</Text> today a new seat lands on an empty
        prompt and a blinking cursor. 50.6% of Mid-Market and SMB seats never reach first value in week one,
        and the median churned seat lives just two weeks. First Monday removes the blank box.
      </Text>
    </VStack>
  );
}
