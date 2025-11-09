// Event registry for USRad search system

export const SearchEvents = {
  OPEN_MODAL: 'usrad:openSearchModal',
  PROCEDURE_SELECTED: 'usrad:procedureSelected',
  MODAL_CLOSED: 'usrad:modalClosed',
} as const;

export function openSearchModal(initialQuery = '') {
  window.dispatchEvent(
    new CustomEvent(SearchEvents.OPEN_MODAL, { detail: { initialQuery } })
  );
}

export function onProcedureSelected(callback: (procedure: any) => void) {
  window.addEventListener(SearchEvents.PROCEDURE_SELECTED, (e: any) => {
    callback(e.detail.procedure);
  });
}

export function dispatchProcedureSelected(procedure: any) {
  window.dispatchEvent(
    new CustomEvent(SearchEvents.PROCEDURE_SELECTED, { detail: { procedure } })
  );
}
