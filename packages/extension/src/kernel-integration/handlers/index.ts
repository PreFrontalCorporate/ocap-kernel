import { clearStateHandler, clearStateSpec } from './clear-state.ts';
import {
  collectGarbageHandler,
  collectGarbageSpec,
} from './collect-garbage.ts';
import {
  executeDBQueryHandler,
  executeDBQuerySpec,
} from './execute-db-query.ts';
import { getStatusHandler, getStatusSpec } from './get-status.ts';
import { launchVatHandler, launchVatSpec } from './launch-vat.ts';
import { pingVatHandler, pingVatSpec } from './ping-vat.ts';
import { queueMessageHandler, queueMessageSpec } from './queue-message.ts';
import { reloadConfigHandler, reloadConfigSpec } from './reload-config.ts';
import { restartVatHandler, restartVatSpec } from './restart-vat.ts';
import {
  terminateAllVatsHandler,
  terminateAllVatsSpec,
} from './terminate-all-vats.ts';
import { terminateVatHandler, terminateVatSpec } from './terminate-vat.ts';
import {
  updateClusterConfigHandler,
  updateClusterConfigSpec,
} from './update-cluster-config.ts';

/**
 * Call-ee side handlers for the kernel control methods.
 */
export const handlers = {
  clearState: clearStateHandler,
  executeDBQuery: executeDBQueryHandler,
  getStatus: getStatusHandler,
  launchVat: launchVatHandler,
  pingVat: pingVatHandler,
  reload: reloadConfigHandler,
  restartVat: restartVatHandler,
  queueMessage: queueMessageHandler,
  terminateAllVats: terminateAllVatsHandler,
  collectGarbage: collectGarbageHandler,
  terminateVat: terminateVatHandler,
  updateClusterConfig: updateClusterConfigHandler,
} as const;

/**
 * Call-er side method specs for the kernel control methods.
 */
export const methodSpecs = {
  clearState: clearStateSpec,
  executeDBQuery: executeDBQuerySpec,
  getStatus: getStatusSpec,
  launchVat: launchVatSpec,
  pingVat: pingVatSpec,
  reload: reloadConfigSpec,
  restartVat: restartVatSpec,
  queueMessage: queueMessageSpec,
  terminateAllVats: terminateAllVatsSpec,
  collectGarbage: collectGarbageSpec,
  terminateVat: terminateVatSpec,
  updateClusterConfig: updateClusterConfigSpec,
} as const;

type Handlers = (typeof handlers)[keyof typeof handlers];

export type KernelControlMethod = Handlers['method'];

export type { KernelStatus } from './get-status.ts';
