import { default as default_2 } from 'react';

export declare function buildLocalMeshUrlMap(files: File[]): Map<string, string>;

export declare function createMeshResolver(options: MeshResolverOptions): (rawPath: string) => string;

export declare function extractPackageNameFromUrdf(urdfText: string): string | null;

/** Extract joint metadata for manual pose sliders (document order). */
export declare function extractUrdfJointDescriptors(urdfText: string): UrdfJointDescriptor[];

export declare type JointStateMsg = {
    name: string[];
    position: number[];
    velocity?: number[];
    effort?: number[];
};

declare type JointType = "fixed" | "continuous" | "revolute" | "planar" | "prismatic" | "floating";

declare type MeshLoadProgress = {
    total: number;
    loaded: number;
    failed: number;
};

export declare type MeshResolverOptions = {
    strategy: MeshStrategy;
    packageName?: string;
    packageBaseUrl?: string;
    localUrls: Map<string, string>;
    defaultRemoteBase?: string;
};

export declare type MeshStrategy = 'localUpload' | 'packageBaseUrl' | 'leaveAsIs';

declare type Pose = {
    xyz: Vector3;
    rpy: Vector3;
};

/** Apply teleop_tf rotate_mesh visual correction and optional RPY offset. */
export declare function prepareUrdfForPreview(urdfText: string, rotateMeshVisuals: boolean, visualRpyOffset: [number, number, number]): string;

export declare function revokeMeshUrlMap(map: Map<string, string>): void;

export declare const UrdfDebugPreview: default_2.FC<UrdfDebugPreviewProps>;

export declare interface UrdfDebugPreviewProps {
    urdfText: string;
    jointState: JointStateMsg | null;
    highFrequencyPoseUpdates?: boolean;
    resolveMeshUrl: (rawPath: string) => string;
    fallbackMeshColor: string;
    showGrid: boolean;
    showAxes: boolean;
    rotateMeshVisuals?: boolean;
    emptyHint?: string;
    onMeshLoadProgressChange?: (progress: MeshLoadProgress | null) => void;
    onMeshIssue?: (meshUrl: string, reason: string) => void;
    onPreviewBuildResult?: (result: UrdfPreviewBuildResult | null) => void;
}

declare type UrdfJoint = {
    name: string;
    jointType: JointType;
    origin: Pose;
    parent: string;
    child: string;
    axis: Vector3;
    limit?: {
        lower: number;
        upper: number;
        effort: number;
        velocity: number;
    };
};

declare type UrdfJointDescriptor = {
    name: string;
    jointType: UrdfJoint['jointType'];
    lower: number;
    upper: number;
    step: number;
    defaultValue: number;
    sliderEnabled: boolean;
    valueUnit: 'rad' | 'm';
};

declare type UrdfPreviewBuildResult = {
    status: 'ready' | 'empty' | 'error';
    frameObjectCount: number;
    visibleFrameCount: number;
    meshTotal: number;
    meshFailed: number;
    issues: UrdfPreviewIssue[];
    errorMessage?: string;
};

declare type UrdfPreviewIssue = {
    url: string;
    reason: string;
};

declare type Vector3 = {
    x: number;
    y: number;
    z: number;
};

export { }
