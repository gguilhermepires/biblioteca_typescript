import * as fs from 'fs';
import passport from 'passport';
import { Strategy } from 'passport-saml';

import OneLoginGetEventTypesException from '../errors/OneLoginGetEventTypesException';
import OneLoginGetUsersByRoleIdsException from '../errors/OneLoginGetUsersByRoleIdsException';
import OneLoginInitException from '../errors/OneLoginInitException';
import OneLoginInvalidTokenException from '../errors/OneLoginInvalidTokenException';
import { IUserFromOnLogin } from '../interfaces/iUser';
import RequestHttp from './requestHttp';

interface IPagination {
  afterCursor: string;
  currentPage: number;
  pageItems: number;
  totalCount: number;
  totalPages: number;
}

interface ICustomAttributes {
  specialite: string;
  Lgroup: string;
  promo: string;
  studentid: string;
  cursus: string;
}
interface IOneLoginUser {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role_ids: number[];
  status: number;
  state: number;
  custom_attributes?: ICustomAttributes;
}

interface IListUser {
  pagination: IPagination | any;
  status: any;
  data: IOneLoginUser[];
}

interface ITokenApi {
  access_token: string;
  created_at: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  account_id: number;
}
interface IOneLoginRole {
  id: number;
  name: string;
  admins: number[];
  apps: number[];
  users: number[];
}

interface IPagination {
  afterCursor: string;
  currentPage: number;
  pageItems: number;
  totalCount: number;
  totalPages: number;
}

interface ICustomAttributes {
  specialite: string;
  Lgroup: string;
  promo: string;
  studentid: string;
  cursus: string;
}
interface IOneLoginUser {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role_ids: number[];
  status: number;
  state: number;
  custom_attributes?: ICustomAttributes;

  activated_at?: string;
  distinguished_name?: any;
  external_id?: any;
  last_login?: string;
  company?: string;
  directory_id?: any;
  invitation_sent_at?: any;
  member_of?: any;
  updated_at?: string;
  preferred_locale_code?: any;
  created_at?: string;
  userprincipalname?: any;
  trusted_idp_id?: any;
  comment?: string;
  title?: string;
  department?: string;
  invalid_login_attempts?: number;
  manager_user_id?: null;
  locked_until?: string;
  manager_ad_id?: null;
  phone?: string;
  group_id?: null;
  password_changed_at?: string;
  samaccountname?: null;
}

interface IListUser {
  pagination: IPagination | any;
  status: any;
  data: IOneLoginUser[];
}

interface ITokenApi {
  access_token: string;
  created_at: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  account_id: number;
}
interface IOneLoginRole {
  id: number;
  name: string;
  admins: number[];
  apps: number[];
  users: number[];
}
interface IEventType {
  id: number;
  name: string;
  description: string;
}
interface IWebhookPayload {
  create: { _id: string };
  error_description: any;
  login_name: any;
  app_name: any;
  authentication_factor_description: any;
  certificate_name: any;
  certificate_id: any;
  event_timestamp: string;
  assumed_by_superadmin_or_reseller: any;
  directory_name: any;
  actor_user_id: number;
  user_name: string;
  mapping_id: any;
  radius_config_id: any;
  risk_score: any;
  otp_device_id: any;
  imported_user_id: any;
  resolution: any;
  directory_id: any;
  authentication_factor_id: any;
  param: any;
  risk_cookie_id: any;
  app_id: any;
  custom_message: any;
  browser_fingerprint: any;
  actor_system: string;
  uuid: string;
  otp_device_name: any;
  actor_user_name: string;
  user_field_name: any;
  assuming_acting_user_id: any;
  adc_id: any;
  solved: any;
  api_credential_name: any;
  imported_user_name: any;
  note_title: any;
  trusted_idp_name: any;
  policy_id: any;
  role_name: any;
  service_directory_id: any;
  object_id: any;
  account_id: number;
  user_field_id: any;
  resolved_by_user_id: any;
  group_id: any;
  client_id: any;
  ipaddr: string;
  login_id: any;
  notes: string;
  event_type_id: number;
  user_id: number;
  risk_reasons: any;
  proxy_agent_name: any;
  policy_type: any;
  role_id: any;
  user_agent: string;
  privilege_name: any;
  group_name: any;
  entity: any;
  resource_type_id: any;
  resolved_at: any;
  note_id: any;
  mapping_name: any;
  task_name: any;
  authentication_factor_type: any;
  proxy_agent_id: any;
  adc_name: any;
  radius_config_name: any;
  policy_name: any;
  trusted_idp_id: any;
  privilege_id: any;
  proxy_ip: any;
  directory_sync_run_id: any;
}

export default class OneLogin {
  tokenApi: ITokenApi | undefined;

  limit = 100;

  async getUserById(userId: number): Promise<IOneLoginUser> {
    if (this.tokenApi === undefined)
      throw new OneLoginInvalidTokenException(500, 'TokenApi can not be empty');

    try {
      const res = await RequestHttp.execute(
        RequestHttp.createConfig({
          url: `${process.env.ONELOGIN_BASE_URL}/api/2/users/${userId}`,
          headers: {
            Authorization: `bearer ${this.tokenApi.access_token}`,
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }),
      );
      if (res.status === 200) return res.data;
      throw new Error(`Erro oneLogin API. error: status code: ${res.status}`);
    } catch (e) {
      throw new Error(`Erro oneLogin API. error: ${e}`);
    }
  }

  async getEventTypes(): Promise<IEventType[]> {
    if (this.tokenApi === undefined)
      throw new OneLoginInvalidTokenException(500, 'TokenApi can not be empty');

    try {
      const res = await RequestHttp.execute(
        RequestHttp.createConfig({
          url: `${process.env.ONELOGIN_BASE_URL}/api/1/events/types`,
          headers: {
            Authorization: `bearer ${this.tokenApi.access_token}`,
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }),
      );
      if (res.status === 200) return res.data;
      throw new OneLoginGetEventTypesException(
        500,
        `Erro oneLogin API. error: status code: ${res.status}`,
      );
    } catch (e) {
      throw new OneLoginGetEventTypesException(
        500,
        `Erro oneLogin API. error: ${e}`,
      );
    }
  }

  extractWebhookPayload(requestBody: any): IWebhookPayload[] {
    return requestBody;
  }

  setToken(token: ITokenApi): void {
    this.tokenApi = token;
  }

  async init(): Promise<void> {
    try {
      this.tokenApi = await this.loginWithApiCredential();
      if (this.tokenApi === undefined)
        throw new OneLoginInitException(
          500,
          'Could not login with api credential',
        );
    } catch (e) {
      throw new OneLoginInitException(
        500,
        'could not login with api credential',
      );
    }
  }

  async loginWithApiCredential(): Promise<ITokenApi | undefined> {
    try {
      const res = await RequestHttp.execute2(
        RequestHttp.createConfig({
          url: `${process.env.ONELOGIN_BASE_URL}/auth/oauth2/v2/token`,
          auth: {
            username: process.env.ONELOGIN_CLIENT_ID,
            password: process.env.ONELOGIN_CLIENT_SECRET,
          },
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          data: {
            grant_type: 'client_credentials',
          },
        }),
      );
      if (res.status === 200) return res.data;
      return undefined;
    } catch (e) {
      return undefined;
    }
  }

  async getRolesByNames(names: string[]): Promise<any> {
    const roles = [];
    const allRole = await this.getRoles();
    for (let i = 0; i < allRole.length; i += 1) {
      const role = allRole[parseInt(`${i}`, 10)];
      for (let j = 0; j < names.length; j += 1) {
        const name = names[parseInt(`${j}`, 10)];
        if (String(role.name).toUpperCase().includes(name.toUpperCase())) {
          roles.push(role);
          break;
        }
      }
    }
    return roles;
  }

  async getRoles(limit?: number): Promise<IOneLoginRole[]> {
    if (this.tokenApi === undefined)
      throw new Error('TokenApi can not be empty');

    try {
      const res = await RequestHttp.execute(
        RequestHttp.createConfig({
          url: `${process.env.ONELOGIN_BASE_URL}/api/2/roles?limit=${
            limit === undefined ? this.limit : limit
          }&fields=id,name`,
          headers: {
            Authorization: `bearer ${this.tokenApi.access_token}`,
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }),
      );
      if (res.status === 200) return res.data;
      throw new Error(`Erro oneLogin API. error: status code: ${res.status}`);
    } catch (e) {
      throw new Error(`Erro oneLogin API. error: ${e}`);
    }
  }

  async getUsersByRoleIds(
    rolesId: number[],
    page?: number,
  ): Promise<IListUser> {
    if (this.tokenApi === undefined)
      throw new OneLoginGetUsersByRoleIdsException(
        500,
        'TokenApi can not be empty',
      );

    try {
      const fields =
        'id,email,username,email,firstname,lastname,status,state,role_ids,custom_attributes';

      let url = `${process.env.ONELOGIN_BASE_URL}/api/1/users?limit=${
        this.limit
      }&role_ids=${rolesId.toString()}`;
      url = `${
        process.env.ONELOGIN_BASE_URL
      }/api/2/users?fields=${fields}&limit=${
        this.limit
      }&role_ids=${rolesId.toString()}`;
      if (page !== undefined) url += `&cursor=${page}`;

      const res = await RequestHttp.execute(
        RequestHttp.createConfig({
          url,
          headers: {
            Authorization: `bearer ${this.tokenApi.access_token}`,
            'Content-Type': 'application/json',
          },
          method: 'GET',
        }),
      );
      if (res.status === 200)
        return {
          pagination: {
            afterCursor: res.headers['after-cursor'],
            currentPage: parseInt(res.headers['current-page'], 10),
            pageItems: parseInt(res.headers['page-items'], 10),
            totalCount: parseInt(res.headers['total-count'], 10),
            totalPages: parseInt(res.headers['total-pages'], 10),
          },
          status: res.headers.status,
          data: res.data,
        };
      throw new OneLoginGetUsersByRoleIdsException(
        500,
        `Erro oneLogin API. error: status code: ${res.status}`,
      );
    } catch (e) {
      throw new OneLoginGetUsersByRoleIdsException(
        500,
        `Erro oneLogin API. error: ${e}`,
      );
    }
  }

  static configurePassport(): any {
    passport.use(
      new Strategy(
        {
          path: process.env.SAML_REDIRECT_PATH,
          entryPoint: process.env.SAML_ENTRYPOINT,
          issuer: process.env.SAML_ISSUER,
          cert: String(fs.readFileSync('src/config/onelogin.pem', 'utf-8')),
        },
        (profile: any, done: any) => {
          return done(null, profile);
        },
      ),
    );

    passport.serializeUser((user: any, done: any) => {
      const userOneLogin: IUserFromOnLogin = user;
      done(null, userOneLogin);
    });

    passport.deserializeUser((user: any, done: any) => {
      done(null, user);
    });
    return passport;
  }
}

export { IOneLoginRole, IListUser, IOneLoginUser, IWebhookPayload, IEventType };
