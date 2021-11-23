import { AppDebugger } from 'mobile-app-debugger';
/*
 *  Best practies, create your api service, and add AppDebugger.network call's
 */
export class ApiService {
  static async post(url: string, data: any) {
    const headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: headers,
    });

    const resData = await res.json();

    AppDebugger.network({
      url: url,
      method: 'post',
      status: res.status,

      reqData: data,
      reqHeaders: headers,

      resData: resData,
      resHeaders: res.headers,
    });

    return resData;
  }

  static async get(url: string) {
    const headers = {};

    const res = await fetch(url);

    const resData = await res.json();

    AppDebugger.network({
      url: url,
      method: 'get',
      status: res.status,

      reqHeaders: headers,

      resData: resData,
      resHeaders: res.headers,
    });

    return resData;
  }
}
