export function hasRole(userData: any, role: string): boolean {
  if (!userData) return false;
  const direct = Array.isArray(userData.roles) ? userData.roles : [];
  const realm = userData?.realm_access?.roles ?? [];
  const resourceObj = userData?.resource_access ?? {};
  const resource = Object.values(resourceObj)
    .flatMap((r: any) => r?.roles ?? []);

  return [...direct, ...realm, ...resource].includes(role);
}
