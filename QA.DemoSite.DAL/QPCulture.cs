// Code generated by a template
using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

namespace QA.DemoSite.Mssql.DAL
{
    public partial class QPCulture: IQPArticle
    {
        public QPCulture()
        {
		    AbstractItems = new HashSet<QPAbstractItem>();
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
			set { _internalTitle = QpDataContext.Current.ReplacePlaceholders(value);}
		}
		private String _internalName;
		public virtual String Name 
		{ 
			get { return _internalName; }
			set { _internalName = QpDataContext.Current.ReplacePlaceholders(value);}
		}
        public virtual String Icon { get; set; }
		/// <summary>
		/// Auto-generated backing property for field (id: 27521)/Culture AbstractItems
		/// </summary>
		public  ICollection<QPAbstractItem> AbstractItems { get; set; }
	}
}
	