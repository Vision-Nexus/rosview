import React from 'react';
import { useIntl } from 'react-intl';
import { Spinner } from '@/shared/ui/spinner';

export const PlaybackBufferingOverlay: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-background/20"
      role="status"
      aria-live="polite"
      aria-busy="true"
      data-testid="rosview-playback-buffering-overlay"
    >
      <div className="flex items-center gap-2 rounded-md border border-border bg-card/90 px-4 py-2 text-sm text-foreground shadow-sm">
        <Spinner className="size-4 text-primary" aria-hidden />
        <span>{formatMessage({ id: 'playback.buffering' })}</span>
      </div>
    </div>
  );
};
