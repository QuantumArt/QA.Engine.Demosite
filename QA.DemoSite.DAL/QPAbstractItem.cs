// Code generated by a template
using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

namespace QA.DemoSite.Mssql.DAL
{
    public partial class QPAbstractItem: IQPArticle
    {
        public QPAbstractItem()
        {
		    Children = new HashSet<QPAbstractItem>();
		    Versions = new HashSet<QPAbstractItem>();
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
        public virtual Boolean? IsVisible { get; set; }
        public virtual Boolean? IsPage { get; set; }
		private String _internalZoneName;
		public virtual String ZoneName 
		{ 
			get { return _internalZoneName; }
			set { _internalZoneName = QpDataContext.Current.ReplacePlaceholders(value);}
		}
		private String _internalAllowedUrlPatterns;
		public virtual String AllowedUrlPatterns 
		{ 
			get { return _internalAllowedUrlPatterns; }
			set { _internalAllowedUrlPatterns = QpDataContext.Current.ReplacePlaceholders(value);}
		}
		private String _internalDeniedUrlPatterns;
		public virtual String DeniedUrlPatterns 
		{ 
			get { return _internalDeniedUrlPatterns; }
			set { _internalDeniedUrlPatterns = QpDataContext.Current.ReplacePlaceholders(value);}
		}
		private String _internalDescription;
		public virtual String Description 
		{ 
			get { return _internalDescription; }
			set { _internalDescription = QpDataContext.Current.ReplacePlaceholders(value);}
		}
		private String _internalKeywords;
		public virtual String Keywords 
		{ 
			get { return _internalKeywords; }
			set { _internalKeywords = QpDataContext.Current.ReplacePlaceholders(value);}
		}
		private String _internalMetaDescription;
		public virtual String MetaDescription 
		{ 
			get { return _internalMetaDescription; }
			set { _internalMetaDescription = QpDataContext.Current.ReplacePlaceholders(value);}
		}
		private String _internalTags;
		public virtual String Tags 
		{ 
			get { return _internalTags; }
			set { _internalTags = QpDataContext.Current.ReplacePlaceholders(value);}
		}
        public virtual Boolean? IsInSiteMap { get; set; }
        public virtual Int32? IndexOrder { get; set; }
        public virtual Int32? ExtensionId { get; set; }
        public virtual Int32? ContentId { get; set; }
        public virtual Int32? TitleFormat_ID { get; set; }
		/// <summary>
		/// 
		/// </summary>			
		public virtual QPAbstractItem Parent { get; set; }
		/// <summary>
		/// 
		/// </summary>			
		public virtual QPDiscriminator Discriminator { get; set; }
		/// <summary>
		/// 
		/// </summary>			
		public virtual QPAbstractItem VersionOf { get; set; }
		/// <summary>
		/// 
		/// </summary>			
		public virtual QPCulture Culture { get; set; }
		/// <summary>
		/// 
		/// </summary>
		public virtual Int32? Parent_ID { get; set; }
		/// <summary>
		/// 
		/// </summary>
		public virtual Int32? Discriminator_ID { get; set; }
		/// <summary>
		/// 
		/// </summary>
		public virtual Int32? VersionOf_ID { get; set; }
		/// <summary>
		/// 
		/// </summary>
		public virtual Int32? Culture_ID { get; set; }
		/// <summary>
		/// Auto-generated backing property for field (id: 27508)/Parent Children
		/// </summary>
		public  ICollection<QPAbstractItem> Children { get; set; }
		/// <summary>
		/// Auto-generated backing property for field (id: 27520)/VersionOf Versions
		/// </summary>
		public  ICollection<QPAbstractItem> Versions { get; set; }
	}
} 	
