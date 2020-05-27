using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using QA.DemoSite.ViewModels;
using QA.DemoSite.ViewModels.Builders;

namespace QA.Demosite.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FaqController : ControllerBase
    {
        private readonly FaqWidgetViewModelBuilder _viewModelBuilder;

        public FaqController(FaqWidgetViewModelBuilder viewModelBuilder)
        {
            _viewModelBuilder = viewModelBuilder;
        }

        [HttpGet("questions")]
        public ActionResult Get([FromQuery] int[] questionIds)
        {
            var vm = questionIds.Any()
                ? _viewModelBuilder.GetFaqQuestions(questionIds)
                : new List<FaqWidgetItemViewModel>();

            return new JsonResult(vm);
        }

        // // [HttpGet]
        // public ActionResult Test()
        // {
        //     return new JsonResult(new {Ok = true});
        // }
    }
}
