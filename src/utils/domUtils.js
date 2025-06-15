export function safeSet(id, value) {
    const el = document.getElementById(id);
    if (!el) {
      console.warn(`⚠️ Element #${id} not found`);
    } else {
      el.value = value ?? '';
    }
  }
  