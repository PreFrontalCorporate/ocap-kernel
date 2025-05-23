import { Logger } from '@metamask/logger';
import type { VatId, VatConfig } from '@metamask/ocap-kernel';
import { createWindow } from '@metamask/snaps-utils';
import type { initializeMessageChannel } from '@metamask/streams/browser';

import type { VatWorker } from './VatWorkerServer.ts';

const IFRAME_URI = 'iframe.html';

export const makeIframeVatWorker = (
  id: VatId,
  getPort: typeof initializeMessageChannel,
  logger: Logger,
): VatWorker => {
  const vatHtmlId = `ocap-iframe-${id}`;
  return {
    launch: async (_vatConfig: VatConfig) => {
      const newWindow = await createWindow({
        uri: `${IFRAME_URI}?vatId=${id}`,
        id: vatHtmlId,
        testId: 'ocap-iframe',
      });
      const port = await getPort((message, transfer) =>
        newWindow.postMessage(message, '*', transfer),
      );

      return [port, newWindow];
    },
    terminate: async (): Promise<void> => {
      const iframe = document.getElementById(vatHtmlId);
      if (iframe === null) {
        logger.error(
          `iframe of vat with id "${id}" already removed from DOM (#${vatHtmlId})`,
        );
        return undefined;
      }
      iframe.remove();
      return undefined;
    },
  };
};
