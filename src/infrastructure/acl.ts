import { AclUserRole, AclGrant } from '@prisma/client';

import { prismaClient } from '../database/prismaClient';

export default class Acl {
  static async getAclUserRole(
    role: string,
    userId: string,
  ): Promise<(AclUserRole & { AclGrant?: AclGrant }) | null> {
    return prismaClient.aclUserRole.findFirst({
      where: {
        userId,
        AclGrant: {
          role,
        },
      },
      include: {
        AclGrant: true,
      },
    });
  }

  static simplifyRole(fullRole: string): string[] {
    const _role = fullRole.toUpperCase().trim();
    let role = '';

    if (_role.includes('STAFF')) role = 'staff';

    if (_role.includes('TEACHER')) {
      if (role !== '') role += ',';
      role += 'teacher';
    }

    if (_role.includes('STUDENT')) {
      if (role !== '') role += ',';
      role += 'student';
    }

    return role.split(',');
  }

  static contains(element1: string, element2: string): boolean {
    const list1 = element1.split(',');
    const list2 = element2.split(',').toString().toLowerCase();
    for (let i = 0; i < list1.length; i += 1) {
      const item: string = list1
        .slice(i, i + 1)
        .toString()
        .toLowerCase();
      if (list2.includes(item)) return true;
    }

    return false;
  }

  static async can({
    aclGrant,
    resource,
    action,
    attribute,
  }: {
    aclGrant: AclGrant;
    resource: string;
    action: string;
    attribute: string;
  }): Promise<boolean> {
    if (
      aclGrant.resource === '*' &&
      aclGrant.action === '*' &&
      aclGrant.attributes === '*'
    )
      return true;

    if (
      Acl.contains(aclGrant.resource, resource) === false &&
      Acl.contains(aclGrant.resource, '*') === false
    )
      return false;

    if (
      Acl.contains(aclGrant.action, action) === false &&
      Acl.contains(aclGrant.action, '*') === false
    )
      return false;

    if (
      Acl.contains(aclGrant.attributes, attribute) === false &&
      Acl.contains(aclGrant.attributes, '*') === false
    )
      return false;

    return true;
  }
}
