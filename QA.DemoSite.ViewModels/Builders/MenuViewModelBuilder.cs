using QA.DotNetCore.Engine.Abstractions;
using QA.DotNetCore.Engine.Abstractions.Targeting;
using QA.DotNetCore.Engine.QpData;
using System.Collections.Generic;
using System.Linq;

namespace QA.DemoSite.ViewModels.Builders
{
    public class MenuViewModelBuilder
    {
        public MenuViewModelBuilder(ITargetingUrlTransformator urlTransformator)
        {
            UrlTransformator = urlTransformator;
        }

        public MenuViewModel Build(IStartPage startPage, AbstractPage currentPage)
        {
            if (startPage == null) return null;

            var model = new MenuViewModel();

            var topLevelItems = startPage.GetChildren()
                .Where(w => w.IsPage)
                .OfType<AbstractPage>()
                .Where(p => p.IsVisible)
                .OrderBy(o => o.SortOrder);

            var currentPageId = (currentPage?.Id).GetValueOrDefault(0);//currentPage может быть Null, если страница не в структуре сайта

            foreach (var tlitem in topLevelItems)
            {
                var resultBuildMenu = BuildMenu(tlitem, MenuDepth, currentPageId);
                model.Items.Add(new MenuItem
                {
                    Title = tlitem.Title,
                    Alias = tlitem.Alias,
                    Href = tlitem.GetUrl(UrlTransformator),
                    Children = resultBuildMenu,
                    IsActive = tlitem.Id == currentPageId,
                    HasActiveChild = resultBuildMenu.Where(w => w.IsActive).Any()
                });
            }

            model.Items = model.Items?.OrderBy(o => o.Order).ToList();

            return model;
        }

        private const int MenuDepth = 3;

        public ITargetingUrlTransformator UrlTransformator { get; }

        private List<MenuItem> BuildMenu(AbstractPage item, int level, int currentId)
        {
            if (level <= 0)
            {
                return null;
            }

            var itemList = new List<MenuItem>();
            foreach (var itemlv in item.GetChildren().Where(w => w.IsPage).OfType<AbstractPage>().Where(p => p.IsVisible).OrderBy(o => o.SortOrder))
            {
                var resultBuidMenu = BuildMenu(itemlv, level - 1, currentId);
                itemList.Add(new MenuItem
                {
                    Title = itemlv.Title,
                    Alias = itemlv.Alias,
                    Href = itemlv.GetUrl(UrlTransformator),
                    Children = resultBuidMenu,
                    IsActive = itemlv.Id == currentId || resultBuidMenu.Where(w => w.IsActive).Any()
                });
            }
            return itemList;
        }
    }
}
