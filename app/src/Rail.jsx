// Left rail = product chrome. SideNav with brand, workspace, nav, files.
import { SideNav, SideNavHeading, SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav';
import { VStack, HStack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { StatusDot } from '@astryxdesign/core/StatusDot';
import { MicroLabel } from './ui.jsx';
import { NAV_FOR, WORKSPACE, CONNECTED_FILES } from './data.js';

// The "S" brand mark — dark rounded square, white serif S (favicon twin).
function BrandMark() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: '22px', height: '22px', flex: 'none',
        borderRadius: 'var(--radius-inner)',
        background: 'var(--color-background-inverted)',
        color: 'var(--color-background-surface)',
        display: 'grid', placeItems: 'center',
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontWeight: 600, fontSize: '13px', lineHeight: 1,
      }}
    >
      S
    </span>
  );
}

function Workspace() {
  return (
    <VStack gap={0.5} style={{ padding: 'var(--spacing-1) var(--spacing-1)' }}>
      <HStack gap={2} vAlign="center">
        <StatusDot variant="accent" label="workspace active" />
        <Text weight="semibold" size="sm">{WORKSPACE.name}</Text>
      </HStack>
      <MicroLabel size="2xs">{WORKSPACE.meta}</MicroLabel>
    </VStack>
  );
}

function ConnectedFiles() {
  return (
    <VStack gap={1} style={{ padding: 'var(--spacing-2) var(--spacing-1) 0' }}>
      <MicroLabel size="3xs">Connected files</MicroLabel>
      <VStack gap={0.5}>
        {CONNECTED_FILES.map((f) => (
          <Text key={f} type="code" size="2xs" color="secondary" maxLines={1}>
            {f}
          </Text>
        ))}
      </VStack>
    </VStack>
  );
}

export default function Rail({ screen, onGo }) {
  const active = NAV_FOR[screen];
  return (
    <SideNav
      header={<SideNavHeading heading="Shift Copilot" icon={<BrandMark />} />}
      topContent={<Workspace />}
      footer={<ConnectedFiles />}
    >
      <SideNavSection title="Workspace">
        <SideNavItem label="Home" isDisabled />
        <SideNavItem label="Tasks" isSelected={active === 'tasks'} onClick={() => onGo('s1')} />
        <SideNavItem label="Briefs" isSelected={active === 'briefs'} onClick={() => onGo('s3')} />
        <SideNavItem label="Documents" isDisabled />
        <SideNavItem label="Settings" isDisabled />
      </SideNavSection>
    </SideNav>
  );
}
