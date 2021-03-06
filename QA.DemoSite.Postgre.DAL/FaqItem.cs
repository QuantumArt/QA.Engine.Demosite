// Code generated by a template
using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

namespace QA.DemoSite.Postgre.DAL
{
    public partial class FaqItem: IQPArticle
    {
        public FaqItem()
        {
        }

        public virtual Int32 Id { get; set; }
        public virtual Int32 StatusTypeId { get; set; }
        public virtual bool Visible { get; set; }
        public virtual bool Archive { get; set; }
        public virtual DateTime Created { get; set; }
        public virtual DateTime Modified { get; set; }
        public virtual Int32 LastModifiedBy { get; set; }
        public virtual StatusType StatusType { get; set; }

		private String _internalQuestion;
		public virtual String Question 
		{ 
			get { return _internalQuestion; }
			set { _internalQuestion = PostgreQpDataContext.Current.ReplacePlaceholders(value);}
		}
		private String _internalAnswer;
		public virtual String Answer 
		{ 
			get { return _internalAnswer; }
			set { _internalAnswer = PostgreQpDataContext.Current.ReplacePlaceholders(value);}
		}
        public virtual Int32? SortOrder { get; set; }
	}
} 