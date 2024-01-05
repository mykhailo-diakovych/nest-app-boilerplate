export const filterEmptyPayloadFields = (payload: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(payload).filter(([, v]) => v !== "" && v !== null)
  );
};
