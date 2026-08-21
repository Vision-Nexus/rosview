import { default as React_2 } from 'react';
import type { ReactNode } from 'react';

/**
 * Build a Foxglove-compatible LayoutData from the current DockView state
 * plus our runtime panel-state registry.
 */
export declare function buildFoxgloveLayout(input: BuildFoxgloveLayoutInput): FoxgloveLayoutData;

/**
 * Inputs required by `buildFoxgloveLayout`. Accepts a narrowed subset of
 * `DockviewApi` so the function is easy to test.
 */
declare interface BuildFoxgloveLayoutInput {
    apiState: DockviewSerializedState;
    panels: Record<string, PanelInstanceSnapshot>;
    /** Panels that exist in DockView but should not appear in the Foxglove JSON. */
    ignoreIds?: ReadonlySet<string>;
    globalVariables?: Record<string, unknown>;
    userNodes?: Record<string, unknown>;
}

/** Clear the persisted layout so the next mount falls back to auto-layout. */
export declare function clearSavedDockviewLayout(storageKey?: string): void;

declare interface ClockEvidenceWindow {
    beforeNormal: ClockPoint[];
    anomaly: ClockPoint[];
    afterNormal: ClockPoint[];
}

declare interface ClockPoint {
    index: number;
    timeNs: string;
    logTimeNs?: string;
    deltaNs?: string;
    isDroppedEstimate?: boolean;
    isRollback?: boolean;
    isAnomaly?: boolean;
}

/**
 * Build a Foxglove-compatible layout JSON with a single panel.
 * Host apps use this instead of hand-authoring `layout` / `configById`.
 */
export declare function createSinglePanelLayout(input: OpenPanelInput): FoxgloveLayoutData;

declare type DataQualityClockSource = 'header' | 'log';

/** Message id + ICU values; UI merges `clock` with `quality.clock.*` if needed. */
declare interface DataQualityExplainPayload {
    key: string;
    values: Record<string, string | number>;
}

declare interface DataQualityIssue {
    id: string;
    type: DataQualityIssueType;
    clockSource: DataQualityClockSource;
    scope: DataQualityScope;
    severity: DataQualitySeverity;
    topicNames: string[];
    topicGroup?: string;
    startTime: Time;
    endTime: Time;
    count: number;
    maxMagnitudeMs?: number;
    summary: string;
    explainPayload?: DataQualityExplainPayload;
}

declare type DataQualityIssueCounts = Record<DataQualityIssueType, number>;

declare interface DataQualityIssueRange {
    id: string;
    type: DataQualityIssueType;
    clockSource: DataQualityClockSource;
    scope: DataQualityScope;
    severity: DataQualitySeverity;
    topicNames: string[];
    topicGroup?: string;
    start: Time;
    end: Time;
    count: number;
    maxMagnitudeMs?: number;
    evidenceWindow: ClockEvidenceWindow;
    /** Per-topic evidence for drill-down raw table; key is topic name. */
    topicEvidence?: Record<string, ClockEvidenceWindow>;
    summaryStats?: DataQualitySummaryStats;
    explainPayload?: DataQualityExplainPayload;
    titlePayload?: DataQualityExplainPayload;
    impactPayload?: DataQualityExplainPayload;
    recommendationPayload?: DataQualityExplainPayload;
}

declare type DataQualityIssueType = 'timestamp_rollback' | 'topic_frame_drop';

declare interface DataQualityReport {
    status: DataQualityStatus;
    scannedMessages: number;
    totalMessages?: number;
    updatedAt: number;
    issueCounts: DataQualityIssueCounts;
    scanCoverage?: QualityScanCoverage;
    noticePayload?: DataQualityExplainPayload;
    ranges: DataQualityIssueRange[];
    /** User-facing, clustered quality events. Mirrors `ranges` during the transition. */
    incidents?: QualityIncident[];
    issues: DataQualityIssue[];
}

declare type DataQualityScope = 'topic' | 'group' | 'global';

declare type DataQualitySeverity = 'warn' | 'error';

declare type DataQualityStatus = 'idle' | 'scanning' | 'ready';

declare interface DataQualitySummaryStats {
    baselineIntervalNs?: string;
    beforeAvgDeltaNs?: string;
    anomalyAvgDeltaNs?: string;
    afterAvgDeltaNs?: string;
    maxDeviationRatio?: number;
    estimatedDropCount?: number;
    rollbackDepthNs?: string;
    impactedTopicCount?: number;
    impactedGroupCount?: number;
    /** Adaptive merge window used when folding nearby issues (ns string). */
    mergeWindowNs?: string;
    /** How many separate issue ranges were merged into this one (≥1). */
    mergedSourceCount?: number;
    /** Target length for after-normal evidence (matches before cap). */
    evidenceTargetCount?: number;
    /** True when after-normal segment reached the target length. */
    evidenceComplete?: boolean;
    /** Number of raw anomaly points represented by the user-facing incident. */
    rawAnomalyCount?: number;
    /** Duration covered by the incident, including clustered nearby anomalies. */
    incidentDurationNs?: string;
}

export declare type DatasetItem = {
    id: string;
    kind: 'file' | 'url';
    /** Display label (file basename or URL tail) */
    name: string;
    file?: File;
    url?: string;
    /** Immutable remote-object identity used for deduplication and session identity. It does not swap an active reader's URL in place. */
    readonly sourceId?: string;
    /** Optional manifest metadata (remote list or host-injected). */
    sizeBytes?: number;
    durationSec?: number;
    topicCount?: number;
    /** Optional tuning for this remote source's range reader. */
    remoteReader?: RemoteReaderTuning;
    /** Files opened together, e.g. from a directory. Some formats need sibling files to initialize correctly. */
    siblingFiles?: File[];
    /**
     * Session grouping key. Items sharing the same `groupId` are loaded
     * together as one merged multi-source session (topics/time-range unioned
     * via `CombinedSourceProxy`) instead of being independent switchable
     * datasets. Absent for a standalone item, which is equivalent to a group
     * of one (see `datasetGroupKey`).
     */
    groupId?: string;
};

export declare function datasetItemsFromListItems(items: FileListItem[]): DatasetItem[];

declare interface DockviewLeafData {
    id: string;
    views: string[];
    activeView?: string;
}

declare type DockviewOrientation = 'HORIZONTAL' | 'VERTICAL';

declare interface DockviewSerializedBranch {
    type: 'branch';
    data: DockviewSerializedNode[];
    size?: number;
}

declare interface DockviewSerializedLeaf {
    type: 'leaf';
    data: DockviewLeafData;
    size?: number;
}

declare type DockviewSerializedNode = DockviewSerializedLeaf | DockviewSerializedBranch;

declare interface DockviewSerializedPanel {
    id: string;
    contentComponent?: string;
    tabComponent?: string;
    title?: string;
    params?: Record<string, unknown>;
}

declare interface DockviewSerializedState {
    grid: {
        root: DockviewSerializedNode;
        height: number;
        width: number;
        orientation: DockviewOrientation;
    };
    panels: Record<string, DockviewSerializedPanel>;
    activeGroup?: string;
}

declare interface EmbedChromeInput {
    mode?: RosViewerMode;
    chrome?: RosViewerChrome;
    showNavbar?: boolean;
    showSidebar?: boolean;
    showPlaybackBar?: boolean;
}

export declare function exportDockviewLayout(): FoxgloveLayoutData | null;

/** One row from host `fileManifest` or remote dataset JSON. */
export declare type FileListItem = {
    url: string;
    /** Immutable remote-object identity used for deduplication and session identity. It does not swap an active reader's URL in place. */
    readonly sourceId?: string;
    name?: string;
    sizeBytes?: number;
    durationSec?: number;
    topicCount?: number;
    /** Optional tuning for this remote source's range reader. */
    remoteReader?: RemoteReaderTuning;
};

/** Foxglove `configById[id]` is an arbitrary JSON object. */
declare type FoxgloveConfig = Record<string, unknown>;

export declare interface FoxgloveLayoutData {
    layout?: FoxgloveMosaicNode;
    configById: Record<string, FoxgloveConfig>;
    globalVariables: Record<string, unknown>;
    userNodes: Record<string, unknown>;
    playbackConfig?: Record<string, unknown>;
    version?: number;
    /** Private field used by this product to round-trip DockView tab groups. */
    __embodiflow?: {
        tabGroups?: Record<string, FoxgloveTabGroupSnapshot>;
    };
}

declare type FoxgloveMosaicDirection = 'row' | 'column';

declare type FoxgloveMosaicNode = string | {
    first: FoxgloveMosaicNode;
    second: FoxgloveMosaicNode;
    direction: FoxgloveMosaicDirection;
    splitPercentage?: number;
};

declare interface FoxgloveTabGroupSnapshot {
    activePanelId?: string;
    panelIds: string[];
}

/** Arguments for optional range reads (e.g. Align panel). */
export declare interface GetMessagesInTimeRangeArgs {
    start: Time;
    end: Time;
    topics: string[];
}

declare interface HighFrequencyConsumer {
    topic: string;
    lane: 'video' | 'pointcloud';
    mode?: 'latest' | 'all';
    onLatestMessage?: (message: MessageEvent_2) => void;
    onMessageBatch?: (messages: MessageEvent_2[]) => void;
}

export declare function importDockviewLayout(value: unknown): {
    restored: number;
    degraded: number;
    skipped: number;
};

/**
 * Decode a parsed Foxglove layout into everything needed to hydrate the
 * runtime: panel state snapshots, tab-group metadata, and the DockView
 * serialized payload.
 */
export declare function importFoxgloveLayout(parsed: FoxgloveLayoutData, options?: ImportFoxgloveLayoutOptions): ImportFoxgloveLayoutResult;

declare interface ImportFoxgloveLayoutOptions {
    /**
     * DockView panel component name used for panels whose type is degraded to
     * `Unavailable`. When omitted, falls back to `'Unavailable'`.
     */
    unavailableComponent?: string;
}

export declare interface ImportFoxgloveLayoutResult {
    /** Normalized panel snapshots keyed by id, ready to feed `replacePanelStates`. */
    panelStates: Record<string, PanelInstanceSnapshot>;
    /**
     * DockView serialized state ready for `api.fromJSON`. Undefined when the
     * input had no `layout` (shouldn't normally happen; caller can fall back
     * to ad-hoc panel placement).
     */
    dockviewState?: DockviewSerializedState;
    tabGroups: Record<string, FoxgloveTabGroupSnapshot>;
    /** Count of successfully restored panels whose type we recognize. */
    restored: number;
    /** Count of panels that degraded to `Unavailable`. */
    degraded: number;
    /** Count of entries skipped (panel referenced by layout but missing from configById, or invalid). */
    skipped: number;
}

declare const MERGED: {
    readonly en: RosViewMessages;
    readonly zh: RosViewMessages;
    readonly ja: RosViewMessages;
};

/** Read-only message access for host extensions (optional player capability). */
export declare interface MessageAccessApi {
    getMessagesInTimeRange(args: GetMessagesInTimeRangeArgs): Promise<MessageEvent_2[]>;
}

declare interface MessageEvent_2<T = unknown> {
    topic: string;
    receiveTime: Time;
    publishTime: Time;
    message: T;
    schemaName: string;
    payloadKind?: 'object' | 'hybrid-transfer' | 'hybrid-sab';
    sizeInBytes?: number;
}
export { MessageEvent_2 as MessageEvent }

declare interface MessagePipelineState {
    playerState: PlayerState;
    sortedTopics: TopicInfo[];
    datatypes: RosDatatypes;
    subscriptions: Subscription[];
    publishersByTopic: Map<string, Set<string>>;
    setPlayerState: (state: PlayerState) => void;
    setSubscriptions: (subscriptions: Subscription[]) => void;
}

/**
 * No-op player for tool/embed modes without a recording source.
 * Keeps the message pipeline in `ready` with empty topics so panels like UrdfDebug can mount.
 */
export declare class MinimalPlayer implements Player {
    private _closed;
    private _state;
    private _timeSubscribers;
    constructor();
    setListener(listener: (state: PlayerState) => void): void;
    setSubscriptions(_subscriptions: Subscription[]): void;
    registerSubscriptions(_panelId: string, _subscriptions: Subscription[]): void;
    unregisterSubscriptions(_panelId: string): void;
    registerHighFrequencyConsumer(_consumerId: string, _consumer: HighFrequencyConsumer): void;
    unregisterHighFrequencyConsumer(_consumerId: string): void;
    subscribeCurrentTime(cb: (time: Time) => void): () => void;
    getCurrentTime(): Time | undefined;
    play(): void;
    pause(): void;
    seek(_time: Time): void;
    stepBy(_deltaMs: number): void;
    stepMessage(_direction: -1 | 1): void;
    getMessagesInTimeRange(_args: GetMessagesInTimeRangeArgs): Promise<MessageEvent_2[]>;
    startDataQualityScan?(): void;
    setSpeed(_speed: number): void;
    setSamplingFps(_fps: number): void;
    getSamplingFps(): number;
    setLooping(_looping: boolean): void;
    close(): void;
    private _currentTime;
}

export declare function openDockviewPanel(input: OpenPanelInput): string | null;

export declare interface OpenPanelInput {
    type: PanelType;
    id?: string;
    title?: string;
    config?: unknown;
    position?: {
        referencePanel?: string;
        direction: 'above' | 'below' | 'left' | 'right' | 'within';
    };
    activate?: boolean;
}

declare interface PanelInstanceSnapshot {
    id: string;
    type: PanelType;
    title: string;
    config: unknown;
    configVersion: number;
    /**
     * Foxglove-compatible panel type string (e.g. `'Canvas'` when our internal
     * `type` is `'Image'`). Undefined means the id prefix already matches our
     * internal `type`. Preserved so exports can emit the original Foxglove type.
     */
    foxgloveType?: string;
    /**
     * Unknown fields from a Foxglove panel config that we could not map into
     * our own typed `config`. Preserved so re-exports are lossless.
     */
    extras?: Record<string, unknown>;
}

/**
 * Panel type identifiers. Aligned with Foxglove Studio panel types so that
 * a panel id of the form `${PanelType}!${hash}` round-trips with Foxglove
 * layout JSON (see `util/layout.ts#getPanelTypeFromId`).
 */
declare type PanelType = 'RawMessages' | 'Image' | '3D' | 'Pose' | 'Plot' | 'JointStatePlot' | 'Timeline' | 'TopicGraph' | 'Align' | 'Audio' | 'UrdfDebug' | 'Unavailable';

/**
 * Validate and normalize an arbitrary JSON value to the Foxglove layout
 * shape. Returns null when the value is clearly not a layout (not an object,
 * or missing both `layout` and `configById`).
 */
export declare function parseFoxgloveLayout(raw: unknown): FoxgloveLayoutData | null;

/** Parse remote JSON array into rows; invalid entries skipped (logged). */
export declare function parseRemoteDatasetListJson(json: unknown): FileListItem[];

export declare interface PlaybackControlsApi {
    seek(time: Time): void;
    play(): void;
    pause(): void;
    setSpeed(speed: number): void;
    setLooping(looping: boolean): void;
    /** Step playback time by milliseconds (player implementation). */
    stepBy(deltaMs: number): void;
    /** Step one message backward/forward in log time. */
    stepMessage(direction: -1 | 1): void;
    /**
     * Play until `time` is reached (inclusive by log-time compare), then pause.
     * Resolves when paused or if current time is already at/after target.
     */
    playUntil(time: Time): Promise<void>;
    subscribeCurrentTime(cb: (time: Time) => void): Unsubscribe;
    /** Latest playback time without subscribing React to high-frequency pipeline state. */
    getCurrentTime(): Time | undefined;
    getSnapshot(): PlaybackSnapshot;
}

export declare interface PlaybackOverlayContribution {
    id: string;
    order?: number;
    height?: number | 'auto';
    render: (context: RosViewExtensionContext) => ReactNode;
}

export declare interface PlaybackSnapshot {
    presence: PlayerPresence;
    startTime?: Time;
    endTime?: Time;
    currentTime?: Time;
    isPlaying: boolean;
    isLooping: boolean;
    speed: number;
    /** High-level transport / parse progress when available. */
    progressPercent?: number;
    buffering?: boolean;
    problems?: PlayerProblem[];
}

export declare interface Player {
    setListener(listener: (state: PlayerState) => void): void;
    /** @deprecated Prefer registerSubscriptions per panel */
    setSubscriptions(subscriptions: Subscription[]): void;
    registerSubscriptions(panelId: string, subscriptions: Subscription[]): void;
    unregisterSubscriptions(panelId: string): void;
    registerHighFrequencyConsumer(consumerId: string, consumer: HighFrequencyConsumer): void;
    unregisterHighFrequencyConsumer(consumerId: string): void;
    /** Playback time updates without going through React state (rAF path). Immediately emits the current time. */
    subscribeCurrentTime(cb: (time: Time) => void): Unsubscribe;
    /** Latest playback time. Prefer this or subscribeCurrentTime for real-time playhead reads. */
    getCurrentTime(): Time | undefined;
    play(): void;
    pause(): void;
    seek(time: Time): void;
    stepBy(deltaMs: number): void;
    /** Step one message backward/forward in log time (union of subscribed topics). */
    stepMessage(direction: -1 | 1): void;
    /**
     * Read deserialized messages in `[start, end]` by receive time (source-dependent).
     * Implemented by {@link IterablePlayer}; absent on other player stubs.
     */
    getMessagesInTimeRange?(args: GetMessagesInTimeRangeArgs): Promise<MessageEvent_2[]>;
    /**
     * Stream deserialized messages in `[start, end]` by receive time. Batches are yielded as soon
     * as the source cursor produces them so callers can render partial results.
     */
    streamMessagesInTimeRange?(args: StreamMessagesInTimeRangeArgs): AsyncIterable<MessageEvent_2[]>;
    startDataQualityScan?(): void;
    setSpeed(speed: number): void;
    setSamplingFps(fps: number): void;
    getSamplingFps(): number;
    setLooping(looping: boolean): void;
    close(): void;
}

export declare type PlayerPresence = 'preinit' | 'initializing' | 'ready' | 'closed';

export declare interface PlayerProblem {
    severity: 'error' | 'warn';
    message: string;
}

export declare interface PlayerState {
    presence: PlayerPresence;
    progress: {
        /** Remote source download percentage in byte space. */
        percent?: number;
        /** Downloaded byte ranges [start, end) for transport/cache diagnostics. */
        downloadedByteRanges?: Range_2[];
        /** Total source bytes for byte-range diagnostics. */
        totalBytes?: number;
        /** Bytes received in the current HTTP range (or full-file download). */
        loadedBytes?: number;
        /** Session-cumulative HTTP bytes transferred while opening. */
        transferredBytes?: number;
        /** Coarse initialize phase for the loading overlay. */
        initPhase?: SourceInitPhase;
        /** Parsed/playable time ranges rendered on the playback track. */
        parsedMessageRanges?: TimeRange[];
        /** Current worker transport mode. */
        transportMode?: 'sab' | 'transfer' | 'comlink';
        /** Why SAB was not used when downgraded. */
        transportFallbackReason?: string;
        /** Whether browser runtime is cross-origin isolated for SharedArrayBuffer. */
        crossOriginIsolated?: boolean;
        /** Payload byte threshold for hybrid transfer/SAB transport. */
        binaryPayloadThresholdBytes?: number;
        /** Shared payload ring diagnostics when SAB is active. */
        sharedPayloadRing?: {
            slotCount: number;
            slotSizeBytes: number;
            totalBytes: number;
        };
        /** Number of dropped payload writes in worker ring. */
        droppedPayloads?: number;
        /** Number of stale SAB refs detected by main thread resolver. */
        stalePayloadRefs?: number;
        /** Configured sampling FPS for global playback ticks. */
        samplingFps?: number;
        /** Consecutive empty batches seen in playback loop. */
        emptyBatchStreak?: number;
        /** Cursor rebuild count for empty-batch recovery. */
        cursorRebuildCount?: number;
        /** Backfill fallback count for sustained empty batches. */
        fallbackBackfillCount?: number;
        /** Playback is intentionally waiting for a continuous local buffer. */
        buffering?: boolean;
        /** Estimated continuous local buffer ahead of the current playback time. */
        bufferedAheadMs?: number;
        /** Decoded-message look-ahead beyond the current playhead. */
        prefetchBufferedAheadMs?: number;
        /** Decoded-message target look-ahead for the current playback speed. */
        prefetchTargetAheadMs?: number;
        /** Decoded-message refill threshold for the current playback speed. */
        prefetchLowWaterMs?: number;
        /** Whether a decoded-message refill is currently in flight. */
        prefetchInFlight?: boolean;
        /** Background data quality scan report (session-only). */
        dataQualityReport?: DataQualityReport;
    };
    activeData?: {
        topics: TopicInfo[];
        datatypes: RosDatatypes;
        publishersByTopic: Map<string, Set<string>>;
        startTime: Time;
        endTime: Time;
        currentTime: Time;
        isPlaying: boolean;
        isLooping: boolean;
        speed: number;
        problems: PlayerProblem[];
        /** Whether the source supports efficient per-topic random access reads. */
        randomAccessByTopic?: boolean;
    };
}

export declare type PreferencePersistence = 'localStorage' | 'off';

declare type QualityIncident = DataQualityIssueRange;

declare interface QualityScanCoverage {
    scannedRanges: TimeRange[];
    activeRange?: TimeRange;
    mode: 'visible' | 'background' | 'complete';
}

declare type Range_2 = {
    /** inclusive */
    start: number;
    /** exclusive */
    end: number;
};

/** Read and validate prefs from localStorage; returns null on parse/version mismatch. */
export declare function readPreferences(): RosViewPreferencesV1 | null;

/** Load the saved Foxglove layout, or `null` when absent/corrupt/legacy. */
export declare function readSavedDockviewLayout(storageKey?: string): FoxgloveLayoutData | null;

/**
 * Unified dataset list for ROSView: local files + remote URLs.
 * Merge order: `files` → `file` → `urls` → `url` (files before URLs).
 */
/** Optional per-source limits for remote range readers. Omitted fields retain the reader defaults. */
export declare type RemoteReaderTuning = Readonly<{
    cacheSizeInBytes?: number;
    fetchBlockSizeInBytes?: number;
    maxRequestSizeInBytes?: number;
}>;

export declare interface ResolvedEmbedChrome {
    showNavbar: boolean;
    showSidebar: boolean;
    showPlaybackBar: boolean;
}

declare type ResolvedTheme = 'light' | 'dark';

export declare function resolveEmbedChrome(input: EmbedChromeInput): ResolvedEmbedChrome;

/** Dockview layout blob (Foxglove-compatible `LayoutData` JSON). */
export declare const ROS_VIEW_LAYOUT_STORAGE_KEY = "ioai.rosview.layout";

declare const ROS_VIEW_PREFERENCE_SCHEMA_VERSION: 1;

/** Versioned prefs JSON in localStorage; keep stable to avoid wiping user data. */
export declare const ROS_VIEW_PREFERENCES_STORAGE_KEY = "ioai.rosview.prefs";

/** ROS datatype definitions keyed by schema name (payload shape is source-dependent). */
declare type RosDatatypes = Record<string, unknown>;

export declare const RosViewer: React_2.FC<RosViewerProps>;

export declare type RosViewerChrome = 'full' | 'minimal' | 'panels-only';

export declare type RosViewerMode = 'viewer' | 'tool';

export declare interface RosViewerProps {
    url?: string;
    file?: File;
    urls?: string[];
    files?: File[];
    /**
     * When `true`, every dataset produced from `file`/`files`/`url`/`urls`/
     * `fileManifest` is merged into a single multi-source session (topics and
     * time range unioned) instead of the default "list + switch" behavior.
     * @default false
     */
    mergeSources?: boolean;
    theme?: 'light' | 'dark' | 'system';
    language?: 'en' | 'zh' | 'ja';
    /** CSS class applied to the outermost container element. */
    className?: string;
    /** Inline styles applied to the outermost container element. */
    style?: React_2.CSSProperties;
    onFatalError?: (error: Error) => void;
    /**
     * `'localStorage'`: read/write `ioai.rosview.prefs`. `'off'`: no storage (host owns prefs).
     * @default 'localStorage'
     */
    preferencePersistence?: PreferencePersistence;
    /** Fired when the user changes theme in the navbar (orthogonal to persistence). */
    onThemeChange?: (theme: 'light' | 'dark' | 'system') => void;
    /** Fired when the user changes language in the navbar. */
    onLanguageChange?: (language: 'en' | 'zh' | 'ja') => void;
    /** Fired after this component rewrites SPA query state and the host should re-read `window.location.search`. */
    onSpaUrlQuerySync?: () => void;
    /**
     * Remote dataset manifest: JSON URL or parsed rows. Parsed rows may carry an immutable `sourceId`
     * and remote reader policy. `sourceId` deduplicates an immutable object, but does not hot-swap an
     * active reader: changing a row URL rebuilds the affected worker-backed source. Hosts that renew
     * without a rebuild must keep the URL stable and refresh its transport beneath RosViewer.
     * Merged/deduped with `url` / `urls`; fetch errors are logged only and do not block other sources.
     */
    fileManifest?: string | FileListItem[];
    /** Optional third-party extension contributions for sidebar and playback overlays. */
    extensions?: RosViewExtension[];
    /** Optional center label override shown in navbar source area. */
    navbarSourceName?: string;
    /** Whether to show the left navbar brand button. @default true */
    showNavbarBrand?: boolean;
    /** Custom label for the left navbar brand button (defaults to product name). */
    navbarBrandLabel?: string;
    /** Whether to show navbar language switcher. @default true */
    showLanguageSwitcher?: boolean;
    /** Whether to show navbar theme switcher. @default true */
    showThemeSwitcher?: boolean;
    /** Prefer auto layout bootstrap over welcome placeholder in embedded mode. @default false */
    preferAutoLayout?: boolean;
    /**
     * `spa`: sync `?url=` with the active source; restore `file://` / `folder://` from IndexedDB on load, and `sample://` from the sample manifest.
     * `off`: library / embed — never writes the URL; custom locators in `url` do not auto-restore.
     * @default 'off'
     */
    urlState?: 'spa' | 'off';
    /**
     * Opaque host payload forwarded to every `RosViewExtension` as `context.hostContext`.
     * RosView does not read or validate this object.
     */
    hostContext?: unknown;
    /**
     * Embed preset. `tool` opens panels without a recording source (MinimalPlayer) and defaults to panels-only chrome.
     * @default 'viewer'
     */
    mode?: RosViewerMode;
    /** When false, mount MinimalPlayer and workspace without url/file. @default true (false when mode='tool'). */
    requireSource?: boolean;
    /** Chrome preset; overridden by explicit showNavbar/showSidebar/showPlaybackBar. */
    chrome?: RosViewerChrome;
    showNavbar?: boolean;
    showSidebar?: boolean;
    showPlaybackBar?: boolean;
    /** Hide navbar file menus and disable recording drag-and-drop in the workspace. */
    hideOpenFileMenus?: boolean;
    /**
     * `'inherit'`: follow `preferencePersistence`. `'off'`: never read/write layout localStorage.
     * @default 'inherit'
     */
    layoutPersistence?: PreferencePersistence | 'inherit';
    layoutStorageKey?: string;
    /** Applied on mount before saved layout. */
    initialLayout?: FoxgloveLayoutData;
    /** Shorthand single-panel layout when `initialLayout` is omitted. */
    defaultPanel?: OpenPanelInput;
    /** When true (default for mode='tool'), skip Dockview Welcome placeholder. */
    suppressWelcomePanel?: boolean;
    onLayoutReady?: (info: {
        panelCount: number;
    }) => void;
    onPlayerReady?: (ctx: {
        player: Player;
        hasSource: boolean;
    }) => void;
    onSourceLoadingChange?: (loading: boolean) => void;
    /** Sidebar tab id to select on first mount (e.g. extension `sidebarTabs[].id`). */
    initialSidebarTab?: string;
}

export declare interface RosViewExtension {
    id: string;
    sidebarTabs?: SidebarTabContribution[];
    playbackOverlays?: PlaybackOverlayContribution[];
    /**
     * Same rendering slot as `playbackOverlays` (merged after those), for hosts that name overlays by timeline semantics.
     */
    timelineOverlays?: TimelineOverlayContribution[];
}

export declare interface RosViewExtensionContext {
    playback: PlaybackControlsApi;
    timeline: TimelineApi;
    messages: MessageAccessApi;
    /**
     * Opaque value from {@link RosViewerProps.hostContext}.
     * RosView does not interpret it; hosts pass dataset ids, feature flags, etc.
     */
    hostContext?: unknown;
    dataset?: DatasetItem;
    topics: TopicInfo[];
    locale: RosViewLanguageCode;
    theme: RosViewUiTheme;
}

export declare type RosViewLanguageCode = 'en' | 'zh' | 'ja';

declare type RosViewLocale = keyof typeof MERGED;

/**
 * Merges shard JSON files under `messages/<locale>/`.
 *
 * Panel UI message ids use dotted prefixes; see {@link PANEL_TYPE_MESSAGE_SLUG}
 * in `@/features/panels/framework/panelMessageSlug` for `PanelType` → slug map
 * and naming (`panels.<slug>.settings.*`, `panels.framework.*`, …).
 */
/** Flat ICU message map used by react-intl */
declare type RosViewMessages = Record<string, string>;

/** Persisted theme: light/dark only (navbar); `system` is resolved at runtime, not stored yet. */
export declare type RosViewPersistedTheme = 'light' | 'dark';

declare type RosViewPreferencesV1 = {
    schemaVersion: typeof ROS_VIEW_PREFERENCE_SCHEMA_VERSION;
    theme?: RosViewPersistedTheme;
    language?: RosViewLanguageCode;
    sidebarWidth?: number;
    sidebarPanelPercent?: number;
    autoDataQualityScan?: boolean;
};

export declare const RosViewProvider: React_2.FC<RosViewProviderProps>;

export declare interface RosViewProviderProps {
    theme?: 'light' | 'dark' | 'system';
    language?: RosViewLocale;
    children: React_2.ReactNode;
}

declare type RosViewThemeContextValue = {
    theme: 'light' | 'dark' | 'system';
    resolvedTheme: ResolvedTheme;
};

export declare type RosViewUiTheme = 'light' | 'dark' | 'system';

/** Persist a Foxglove-compatible layout payload. */
export declare function saveDockviewLayoutToStorage(payload: FoxgloveLayoutData, storageKey?: string): void;

export declare interface SidebarTabContribution {
    id: string;
    title: ReactNode;
    icon?: ReactNode;
    order?: number;
    render: (context: RosViewExtensionContext) => ReactNode;
}

/** Worker-reported phase while a remote (or large local) source is opening. */
declare type SourceInitPhase = 'connecting' | 'downloading' | 'opening';

declare interface StreamMessagesInTimeRangeArgs extends GetMessagesInTimeRangeArgs {
    maxMessages?: number;
    batchSize?: number;
    batchWallTimeMs?: number;
}

/**
 * Open a dedicated MCAP worker and yield decoded messages for `topics` in the
 * inclusive `[start, end]` receive-time range. The worker, reader, cache, and
 * cursor are never shared with a visible player and are terminated when this
 * iterator finishes, is cancelled, or fails.
 */
export declare function streamRemoteMcapMessages<T = unknown>(options: StreamRemoteMcapMessagesOptions): AsyncIterableIterator<MessageEvent_2<T>>;

/**
 * Parameters for an independent, full-range MCAP read.
 *
 * `url` is the same-origin virtual MCAP URL registered with the host service
 * worker. It must remain mapped to one immutable object while this iterator
 * runs; do not pass a direct signed or leased storage URL.
 * `totalBytes` is that immutable object's frozen byte size and lets the reader
 * open it without a separate size probe.
 */
export declare interface StreamRemoteMcapMessagesOptions {
    /** Service-worker virtual URL for one immutable remote MCAP object. */
    url: string;
    /** Frozen byte size of the immutable remote MCAP object. */
    totalBytes: number;
    topics: readonly string[];
    /** Inclusive lower receive-time bound. */
    start: Time;
    /** Inclusive upper receive-time bound. */
    end: Time;
    /** Cancels the reader and terminates its dedicated worker. */
    signal?: AbortSignal;
}

export declare interface Subscription {
    topic: string;
    subscriberId: string;
}

export declare type Time = {
    sec: number;
    nsec: number;
};

/**
 * Helpers aligned with the main playback scrubber time basis (log start/end).
 * Hosts use this for marker lanes, overlays, and seek math without importing Foxglove internals.
 */
export declare interface TimelineApi {
    getTimeBounds(): {
        start: Time;
        end: Time;
    } | null;
    timeToPercent(time: Time): number;
    percentToTime(percent: number): Time | null;
}

/** Semantic alias for {@link PlaybackOverlayContribution} (timeline lanes above the scrubber). */
export declare type TimelineOverlayContribution = PlaybackOverlayContribution;

export declare interface TimeRange {
    start: Time;
    end: Time;
}

export declare interface TopicInfo {
    name: string;
    type: string;
    messageCount?: number;
    frequency?: number;
    durationSec?: number;
    /**
     * Display labels for the recording file(s) this topic came from. Only
     * populated when multiple sources are merged into one session (see
     * `CombinedSourceProxy`); absent for single-file sessions so existing UI
     * is unaffected.
     */
    sourceLabels?: string[];
}

export declare interface TopicStats {
    messageCount: number;
    frequency: number;
    durationSec?: number;
}

declare type Unsubscribe = () => void;

export declare function useMessagePipeline<T>(selector: (state: MessagePipelineState) => T): T;

export declare function useRosViewTheme(): RosViewThemeContextValue;

/** Merge patch into stored prefs and write back (browser + localStorage only). */
export declare function writePreferences(patch: {
    theme?: RosViewPersistedTheme;
    language?: RosViewLanguageCode;
    sidebarWidth?: number;
    sidebarPanelPercent?: number;
    autoDataQualityScan?: boolean;
}): void;

export { }
