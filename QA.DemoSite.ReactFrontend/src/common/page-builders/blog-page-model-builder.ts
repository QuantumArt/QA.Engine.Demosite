import { BlogPageModel, BlogPageViewModel } from '../models/pages';
import { PathData } from '../../page-structure/pathfinder';
import { isFinite, trimStart } from 'lodash';
import { mapAbstractItem } from '../models/mappers/map-abstract-item';
import { PageModelBuilderInterface } from 'page-structure/page-model-builder';
import { UniversalAbstractItem } from '../../page-structure';

export class BlogPageModelBuilder implements PageModelBuilderInterface<BlogPageModel> {
  private _defaultPageModelBuilder: PageModelBuilderInterface<UniversalAbstractItem>;

  constructor(defaultPageModelBuilder: PageModelBuilderInterface<UniversalAbstractItem>) {
    this._defaultPageModelBuilder = defaultPageModelBuilder;
  }

  buildModelFromPathData(pathData: PathData): BlogPageModel | undefined {
    console.log('blog page model builder enter');
    const defaultModel = this._defaultPageModelBuilder.buildModelFromPathData(pathData);
    if (!defaultModel) {
      return undefined;
    }
    const result = mapAbstractItem(defaultModel) as BlogPageModel;
    const strippedRemainingPath = trimStart(pathData.remainingPath, '/') || '';

    // console.log({strippedRemainingPath, result});
    if (!strippedRemainingPath) {
      const viewModel: BlogPageViewModel = {
        isDetails: false,
        data: {
          header: 'test blog page',
          items: [
            {
              id: 1,
              brief: 'tt',
              title: 'tt',
              categoryName: 'tt',
              date: 'tt',
              image: 'tt',
              published: true,
              url: 'jkdhbk',
              youtubeVideoCode: 'dgdf',
            },
          ],
        },
      };
      result.viewModel = viewModel;

      return result;
    }
    const splittedPath = strippedRemainingPath?.split('/').filter(x => !!x);

    if (
      splittedPath?.length === 2 &&
      splittedPath[0].toLowerCase() === 'details' &&
      isFinite(Number(splittedPath[1]))
    ) {
      result.viewModel = {
        isDetails: true,
        data: {
          image: 'sdf',
          date: 'sdf',
          categoryName: 'sdfsd',
          tags: undefined,
          text: 'skdjfhbkjsdbf',
          title: 'skjdhnfk',
          youtubeVideoCode: 'skdfjhbksbh',
        },
      };

      return result;
    }

    return undefined;
  }
}
