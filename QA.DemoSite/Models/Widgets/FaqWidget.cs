using QA.DemoSite.Interfaces.PagesAndWidgets;
using QA.DotNetCore.Engine.QpData;
using System.Collections.Generic;

namespace QA.DemoSite.Models.Widgets
{

    public class FaqWidget : AbstractWidget, IFaqWidget
    {
        public string Header => GetDetail("Header", string.Empty);

        public IEnumerable<int> Questions => GetRelationIds("Questions");
    }
}
