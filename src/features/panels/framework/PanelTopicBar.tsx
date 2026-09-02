import React, { createContext, useContext } from 'react';
import { cn } from '@/shared/lib/utils';

const PanelTopicBarVisibilityContext = createContext(true);

interface PanelTopicBarVisibilityProviderProps {
  visible: boolean;
  children: React.ReactNode;
}

/** Supplies the viewer-level topic bar visibility setting to panel renderers. */
export const PanelTopicBarVisibilityProvider: React.FC<PanelTopicBarVisibilityProviderProps> = ({
  visible,
  children,
}) => (
  <PanelTopicBarVisibilityContext.Provider value={visible}>
    {children}
  </PanelTopicBarVisibilityContext.Provider>
);

export interface PanelTopicBarProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * Shared container for a panel's top "topic picker" row (`TopicQuickPicker`
 * plus any adjacent controls). Height comes purely from the row's content
 * (the picker's own `h-8` trigger) with horizontal-only padding, so every
 * panel using this gets the same compact height instead of each hand-rolling
 * its own wrapper with inconsistent vertical padding. Colors/borders stay
 * overridable via `className` (e.g. Image panel's permanently-dark chrome)
 * since panels can differ there while sharing the same box model.
 * Viewer-level visibility defaults to enabled when no provider is present.
 */
export const PanelTopicBar: React.FC<PanelTopicBarProps> = ({ className, children }) => {
  const visible = useContext(PanelTopicBarVisibilityContext);
  if (!visible) {
    return null;
  }
  return (
    <div
      data-testid="panel-topic-bar"
      className={cn('flex shrink-0 items-center gap-2 border-b border-border bg-muted px-2', className)}
    >
      {children}
    </div>
  );
};
