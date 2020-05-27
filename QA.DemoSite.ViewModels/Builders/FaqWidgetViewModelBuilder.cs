using QA.DemoSite.Interfaces;
using QA.DemoSite.Interfaces.PagesAndWidgets;
using System;
using System.Collections.Generic;
using System.Linq;

namespace QA.DemoSite.ViewModels.Builders
{
    public class FaqWidgetViewModelBuilder
    {
        public FaqWidgetViewModelBuilder(IFaqService faqService)
        {
            FaqService = faqService;
        }

        public IFaqService FaqService { get; }

        public FaqWidgetViewModel Build(IFaqWidget widget)
        {
            var vm = new FaqWidgetViewModel {Id = widget.Id, Header = widget.Header};
            if (widget.Questions.Any())
            {
                vm.Items.AddRange(GetFaqQuestions(widget.Questions));
            }

            return vm;
        }

        public IEnumerable<FaqWidgetItemViewModel> GetFaqQuestions(IEnumerable<int> questionIds)
        {
            return FaqService.GetItems(questionIds)
                .OrderBy(i => i.SortOrder.GetValueOrDefault(int.MaxValue))
                .Select(i => new FaqWidgetItemViewModel
                    {Id = i.Id, Answer = i.Answer, Question = i.Question, Published = i.Published});
        }
    }
}
