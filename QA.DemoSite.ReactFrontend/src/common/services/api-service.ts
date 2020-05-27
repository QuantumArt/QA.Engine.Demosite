import { OK } from 'http-status-codes';
import fetch from 'isomorphic-unfetch';

import { UniversalAbstractItem } from 'page-structure';
import qs from 'qs';

import {
  BlogItemInListViewModel,
  BlogPageDetailsViewModel,
  BlogPageIndexViewModel,
  FaqWidgetItemViewModel,
} from 'common/models';

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
    return await this.getSiteStructureModel(res);
  }

  public async getFaqQuestions(questions: number[]): Promise<FaqWidgetItemViewModel[] | undefined> {
    const params = qs.stringify({ questionIds: questions });
    const url = `http://localhost:5000/api/faq/questions?${params}`;
    const res = await this.apiRequest(url);
    if (res.ok) {
      return (await res.json()) as FaqWidgetItemViewModel[];
    }
    return undefined;
  }

  async getBlogItems(): Promise<BlogItemInListViewModel[] | undefined> {
    const url = 'http://localhost:5000/api/blog/items';
    const res = await this.apiRequest(url);
    if (res.ok) {
      return (await res.json()) as BlogItemInListViewModel[];
    }
    return undefined;
  }

  async getBlogItemDetails(id: number): Promise<BlogPageDetailsViewModel | undefined> {
    const url = `http://localhost:5000/api/blog/item/${id.toString()}`;
    const res = await this.apiRequest(url);
    if (res.ok) {
      return (await res.json()) as BlogPageDetailsViewModel;
    }
    return undefined;
  }
}

export default new ApiService();
