const SESSION_KEY = "medinova_session";

export function getTeachingSession() {
  const data = sessionStorage.getItem(SESSION_KEY);
  if (!data) return null;

  try {
    const parsed = JSON.parse(data);

    // optional expiry (24h)
    const expired = Date.now() - parsed.time > 24 * 60 * 60 * 1000;
    if (expired) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function isTeachingHospitalAllowed() {
  const session = getTeachingSession();
  if (!session) return false;

  return ["learner", "care", "supervisor"].includes(session.role);
}

export function lockTeachingHospital() {
  sessionStorage.removeItem(SESSION_KEY);
}
