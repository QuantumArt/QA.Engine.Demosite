using Microsoft.AspNetCore.Mvc;
using QA.DemoSite.ViewModels.Builders;

namespace QA.Demosite.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly BlogPageViewModelBuilder _viewModelBuilder;

        public BlogController(BlogPageViewModelBuilder viewModelBuilder)
        {
            _viewModelBuilder = viewModelBuilder;
        }

        [HttpGet("items")]
        public ActionResult Get()
        {
            return new JsonResult(_viewModelBuilder.GetBlogItems());
        }

        [HttpGet("item/{id}")]
        public ActionResult GetItem(int id)
        {
            return new JsonResult(_viewModelBuilder.BuildDetails(id));
        }
    }
}
