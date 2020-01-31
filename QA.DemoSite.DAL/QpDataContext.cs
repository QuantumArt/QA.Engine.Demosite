using System;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;	
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Threading;

/* place your custom usings here */

namespace QA.DemoSite.Mssql.DAL
{
    public partial class QpDataContext : DbContext
    {
        public static ContentAccess DefaultContentAccess = ContentAccess.Live;

        private static string _Key = Guid.NewGuid().ToString();
        private static string Key
        {
            get
            {
                return "EFCoreUtilDataContextKey " + _Key;
            }
        }
        private static IHttpContextAccessor _accessor;
        public static void SetHttpContextAccessor(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        private static AsyncLocal<QpDataContext> _context = new AsyncLocal<QpDataContext>();

        public static QpDataContext Current
        {
            get
            {
                if (_accessor?.HttpContext == null)
                    return _context.Value;
                else
                    return (QpDataContext)_accessor.HttpContext.Items[Key];
            }

            private set
            {
                 if (_accessor?.HttpContext == null)
                    _context.Value = value;
                else
                    _accessor.HttpContext.Items[Key] = value;
            }
        }

        void OnContextCreated()
        {
            Current = this;
        }

        public QpDataContext()
            : base(DefaultConnectionOptions())
        {
            MappingResolver = GetDefaultMappingResolver();

            OnContextCreated();
        }
		
		public QpDataContext(IConfiguration configuration)
            : base(DefaultConnectionOptions(configuration))
        {
            MappingResolver = GetDefaultMappingResolver();

            OnContextCreated();
        }
		
		public QpDataContext(DbContextOptions<QpDataContext> options)
            : base(options)
        {
            MappingResolver = GetDefaultMappingResolver();

            OnContextCreated();
        }

        public virtual DbSet<StatusType> StatusTypes { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserGroup> UserGroups { get; set; }

        public virtual DbSet<QPAbstractItem> QPAbstractItems { get; set; }
        public virtual DbSet<QPDiscriminator> QPDiscriminators { get; set; }
        public virtual DbSet<QPCulture> QPCultures { get; set; }
        public virtual DbSet<QPItemDefinitionConstraint> QPItemDefinitionConstraints { get; set; }
        public virtual DbSet<AbTest> AbTests { get; set; }
        public virtual DbSet<AbTestBaseContainer> AbTestBaseContainers { get; set; }
        public virtual DbSet<AbTestScript> AbTestScripts { get; set; }
        public virtual DbSet<AbTestScriptContainer> AbTestScriptContainers { get; set; }
        public virtual DbSet<AbTestClientRedirectContainer> AbTestClientRedirectContainers { get; set; }
        public virtual DbSet<AbTestClientRedirect> AbTestClientRedirects { get; set; }
        public virtual DbSet<BlogPost> BlogPosts { get; set; }
        public virtual DbSet<BlogCategory> BlogCategories { get; set; }
        public virtual DbSet<BlogTag> BlogTags { get; set; }
        public virtual DbSet<FaqItem> FaqItems { get; set; }
		public virtual DbSet<QPDiscriminator2QPDiscriminatorForAllowedItemDefinitions1> QPDiscriminator2QPDiscriminatorsForAllowedItemDefinitions1 { get; set; }

		public virtual DbSet<QPDiscriminator2QPDiscriminatorForBackwardForAllowedItemDefinitions1> QPDiscriminator2QPDiscriminatorsForBackwardForAllowedItemDefinitions1 { get; set; }
		public virtual DbSet<BlogPost2BlogTagForTags> BlogPost2BlogTagsForTags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
			var schemaProvider = new StaticSchemaProvider();
			var mapping = new MappingConfigurator(DefaultContentAccess, schemaProvider);
			mapping.OnModelCreating(modelBuilder);
        }

		private static DbContextOptions<QpDataContext> DefaultConnectionOptions()
        {
			var configuration = new ConfigurationBuilder()
						.AddJsonFile("appsettings.json")
						.Build();
			var connectionString = configuration.GetConnectionString("qp_database");
            var optionsBuilder = new DbContextOptionsBuilder<QpDataContext>();
            optionsBuilder.UseNpgsql<QpDataContext>(connectionString);
            return optionsBuilder.Options;
        }
		
		private static DbContextOptions<QpDataContext> DefaultConnectionOptions(IConfiguration configuration)
        {
		    var connectionString = configuration.GetConnectionString("qp_database");
            var optionsBuilder = new DbContextOptionsBuilder<QpDataContext>();
            optionsBuilder.UseNpgsql<QpDataContext>(connectionString);
            return optionsBuilder.Options;
        }
		
		
	}
}
