// Code generated by a template
using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

namespace QA.DemoSite.Mssql.DAL
{
    public partial class AbTestScript: IQPArticle
    {
        public AbTestScript()
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

		private String _internalDescription;
		public virtual String Description 
		{ 
			get { return _internalDescription; }
			set { _internalDescription = QpDataContext.Current.ReplacePlaceholders(value);}
		}
        public virtual Int32? VersionNumber { get; set; }
		private String _internalScriptText;
		public virtual String ScriptText 
		{ 
			get { return _internalScriptText; }
			set { _internalScriptText = QpDataContext.Current.ReplacePlaceholders(value);}
		}
		/// <summary>
		/// 
		/// </summary>			
		public virtual AbTestScriptContainer Container { get; set; }
		/// <summary>
		/// 
		/// </summary>
		public virtual Int32? Container_ID { get; set; }
	}
} 	
