import { t as e } from "./messageBus-D2dmTOBd.js";
import { useSyncExternalStore as t } from "react";
//#region src/core/pipeline/useMessageBus.ts
function n(n) {
	return t((t) => e.subscribeTopic(n, t), () => e.getTopicSeq(n), () => 0);
}
function r(n) {
	return t((t) => e.subscribeToMessages(n, t), () => e.getSubscriberSeq(n), () => 0);
}
//#endregion
export { n, r as t };
