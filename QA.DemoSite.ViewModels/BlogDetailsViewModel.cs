using System.Collections.Generic;

namespace QA.DemoSite.ViewModels
{
    public class BlogDetailsViewModel
    {
        public string Title { get; set; }
        public string CategoryName { get; set; }
        public string Date { get; set; }
        public List<string> Tags { get; set; }
        public string Text { get; set; }

        public string Image { get; set; }
        public string YoutubeVideoCode { get; set; }
    }
}
