import { StartPageModel } from '../../common/models/pages';

import { chain } from 'lodash';
import { mapAbstractItem } from '../../common/models/mappers/map-abstract-item';
import { PathData } from 'page-structure/pathfinder';
import { PageModelBuilderInterface } from 'page-structure/page-model-builder';

export class StartPageModelBuilder implements PageModelBuilderInterface<StartPageModel> {
  buildModelFromPathData(pathData: PathData): StartPageModel | undefined {
    if (!pathData.abstractItem) {
      return undefined;
    }
    const firstChildPage = chain(pathData.abstractItem.childItems)
      .filter(x => x.isPage)
      .sortBy(x => x.sortOrder)
      .head()
      .value();

    if (firstChildPage) {
      const startPageModel = new StartPageModel(pathData.abstractItem, mapAbstractItem);
      startPageModel.redirectTo = `/${firstChildPage.alias}`;
      return startPageModel;
    }
    return undefined;
  }
}
