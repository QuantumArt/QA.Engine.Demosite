import { OK } from 'http-status-codes';
import fetch from 'isomorphic-unfetch';
import qs from 'qs';

import { runtimeConfig } from 'common/config';

import { UniversalAbstractItem } from 'page-structure';
import { BlogItemInListViewModel, BlogPageDetailsViewModel, FaqWidgetItemViewModel } from 'common/models';

class ApiService {
  readonly headers = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  readonly apiBaseUrl = runtimeConfig.apiBaseUrl;

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

    const url = `${this.apiBaseUrl}/sitestructure/?${qs.stringify(params)}`;
    const res = await this.apiRequest(url);
    return await this.getSiteStructureModel(res);
  }

  public async getFaqQuestions(questions: number[]): Promise<FaqWidgetItemViewModel[] | undefined> {
    const params = qs.stringify({ questionIds: questions });
    const url = `${this.apiBaseUrl}/faq/questions?${params}`;
    const res = await this.apiRequest(url);
    if (res.ok) {
      return (await res.json()) as FaqWidgetItemViewModel[];
    }
    return undefined;
  }

  async getBlogItems(): Promise<BlogItemInListViewModel[] | undefined> {
    const url = `${this.apiBaseUrl}/blog/items`;
    const res = await this.apiRequest(url);
    if (res.ok) {
      return (await res.json()) as BlogItemInListViewModel[];
    }
    return undefined;
  }

  async getBlogItemDetails(id: number): Promise<BlogPageDetailsViewModel | undefined> {
    const url = `${this.apiBaseUrl}/blog/item/${id.toString()}`;
    const res = await this.apiRequest(url);
    if (res.ok) {
      return (await res.json()) as BlogPageDetailsViewModel;
    }
    return undefined;
  }
}

export default new ApiService();
