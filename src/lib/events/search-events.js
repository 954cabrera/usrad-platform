// search-events.js - Event registry for USRad search system (Pure JavaScript)

export const SearchEvents = {
  OPEN_MODAL: 'usrad:openSearchModal',
  PROCEDURE_SELECTED: 'usrad:procedureSelected',
  MODAL_CLOSED: 'usrad:modalClosed',
};

/**
 * Opens the search modal with optional initial query
 * @param {string} initialQuery - Optional search term to prefill
 */
export function openSearchModal(initialQuery = '') {
  window.dispatchEvent(
    new CustomEvent(SearchEvents.OPEN_MODAL, { 
      detail: { initialQuery } 
    })
  );
}

/**
 * Registers callback for procedure selection events
 * @param {Function} callback - Function to call with procedure data
 */
export function onProcedureSelected(callback) {
  window.addEventListener(SearchEvents.PROCEDURE_SELECTED, (e) => {
    if (e.detail && e.detail.procedure) {
      callback(e.detail.procedure);
    }
  });
}

/**
 * Dispatches procedure selection event
 * @param {Object} procedure - Selected procedure object
 * @param {string} procedure.cpt_code - CPT code
 * @param {string} procedure.label - Procedure label
 * @param {string} procedure.modality - Modality (MRI, CT, etc)
 */
export function dispatchProcedureSelected(procedure) {
  window.dispatchEvent(
    new CustomEvent(SearchEvents.PROCEDURE_SELECTED, { 
      detail: { procedure } 
    })
  );
}