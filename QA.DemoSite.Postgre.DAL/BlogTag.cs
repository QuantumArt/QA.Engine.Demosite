// Code generated by a template
using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

namespace QA.DemoSite.Postgre.DAL
{
    public partial class BlogTag: IQPArticle
    {
        public BlogTag()
        {
		    BackwardForTags = new HashSet<BlogPost2BlogTagForTags>();
        }

        public virtual Int32 Id { get; set; }
        public virtual Int32 StatusTypeId { get; set; }
        public virtual bool Visible { get; set; }
        public virtual bool Archive { get; set; }
        public virtual DateTime Created { get; set; }
        public virtual DateTime Modified { get; set; }
        public virtual Int32 LastModifiedBy { get; set; }
        public virtual StatusType StatusType { get; set; }

		private String _internalTitle;
		public virtual String Title 
		{ 
			get { return _internalTitle; }
			set { _internalTitle = PostgreQpDataContext.Current.ReplacePlaceholders(value);}
		}
		/// <summary>
		/// Auto-generated backing property for 68571/Tags
		/// </summary>
		public  ICollection<BlogPost2BlogTagForTags> BackwardForTags { get; set; }
	}
}
	
