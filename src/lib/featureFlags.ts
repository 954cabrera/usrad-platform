export function useNewEngine() {
  return import.meta.env.USE_NEW_PROCEDURE_ENGINE === "true";
}
