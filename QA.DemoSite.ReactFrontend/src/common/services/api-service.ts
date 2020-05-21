import { OK } from 'http-status-codes';
import fetch from 'isomorphic-unfetch';

import { UniversalAbstractItem } from 'page-structure/universal-abstract-item';
import qs from 'qs';
import {abstractItemTreeSetParents} from "../../page-structure/abstract-item-tree-parent-utils";

class ApiService {
  readonly headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  async apiRequest(url: string): Promise<Response> {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        ...this.headers,
      },
    });
    if (res.ok) {
      return res;
    }
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw res;
  }

  async getSiteStructureModel(response: Response): Promise<UniversalAbstractItem> {
    const { status } = response;
    if (status !== OK) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw response;
    }
    return await response.json();
  }

  public async getSiteStructure(id?: number): Promise<UniversalAbstractItem> {
    const params = { id };

    const url = `http://localhost:5000/api/sitestructure/?${qs.stringify(params)}`;
    const res = await this.apiRequest(url);
    const model = await this.getSiteStructureModel(res);
    abstractItemTreeSetParents(model);
    return model;
  }
}

export default new ApiService();
