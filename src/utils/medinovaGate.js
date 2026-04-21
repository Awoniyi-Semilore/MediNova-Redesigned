const GATE_KEY = "medinova_gate_access";

export function unlockTeachingHospital(user) {
  sessionStorage.setItem(GATE_KEY, JSON.stringify({
    allowed: true,
    role: user.role,
    hospital: user.hospitalId,
    time: Date.now()
  }));
}

export function isTeachingHospitalAllowed() {
  const data = sessionStorage.getItem(GATE_KEY);
  if (!data) return false;

  try {
    const parsed = JSON.parse(data);

    const expired = Date.now() - parsed.time > 24 * 60 * 60 * 1000;
    if (expired) {
      sessionStorage.removeItem(GATE_KEY);
      return false;
    }

    return parsed.allowed === true;
  } catch {
    return false;
  }
}

export function lockTeachingHospital() {
  sessionStorage.removeItem(GATE_KEY);
}
