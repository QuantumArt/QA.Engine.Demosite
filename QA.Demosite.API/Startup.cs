using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Npgsql;
using QA.DemoSite.Interfaces;
using QA.DemoSite.Mssql.DAL;
using QA.DemoSite.Postgre.DAL;
using QA.DemoSite.Services;
using QA.DemoSite.Templates;
using QA.DemoSite.ViewModels.Builders;
using QA.DotNetCore.Engine.CacheTags;
using QA.DotNetCore.Engine.CacheTags.Configuration;
using QA.DotNetCore.Engine.Persistent.Interfaces;
using QA.DotNetCore.Engine.Persistent.Interfaces.Settings;
using QA.DotNetCore.Engine.QpData.Configuration;
using QA.DotNetCore.Engine.QpData.Persistent.Dapper;
using QP.ConfigurationService.Models;
using Quantumart.QPublishing.Database;
using DatabaseType = QA.DotNetCore.Engine.Persistent.Interfaces.DatabaseType;

namespace QA.Demosite.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson();
            services.AddMemoryCache();

            var qpSettings = Configuration.GetSection("QpSettings").Get<QpSettings>();


            services.AddSingleton(qpSettings);

            // services.AddScoped<NpgsqlConnection>(_ => new NpgsqlConnection(qpSettings.ConnectionString));
            // services.AddScoped<IDbContext>(sp => PostgreQpDataContext.CreateWithStaticMapping(
            //     qpSettings.IsStage ? ContentAccess.Stage : ContentAccess.Live,
            //     sp.GetService<NpgsqlConnection>()));

            DBConnector.ConfigServiceUrl = qpSettings.ConfigurationServiceUrl;
            DBConnector.ConfigServiceToken = qpSettings.ConfigurationServiceToken;
            var dbConfig = DBConnector.GetCustomerConfiguration(qpSettings.CustomerCode).Result;

            services.AddSiteStructure(options =>
            {
                options.QpConnectionString = dbConfig.ConnectionString;
                options.QpDatabaseType = dbConfig.DbType.ToString();
                options.IsStage = qpSettings.IsStage;
                options.SiteId = qpSettings.SiteId;
            });

            //ef контекст
            if (dbConfig.DbType == QP.ConfigurationService.Models.DatabaseType.Postgres)
            {
                services.AddScoped<NpgsqlConnection>(_ => new NpgsqlConnection(dbConfig.ConnectionString));
                services.AddScoped<IDbContext>(sp => PostgreQpDataContext.CreateWithStaticMapping(
                    qpSettings.IsStage
                        ? DemoSite.Postgre.DAL.ContentAccess.Stage
                        : DemoSite.Postgre.DAL.ContentAccess.Live,
                    sp.GetService<NpgsqlConnection>()));
            }
            else
            {
                services.AddScoped<SqlConnection>(_ => new SqlConnection(dbConfig.ConnectionString));
                services.AddScoped<IDbContext>(sp => QpDataContext.CreateWithStaticMapping(
                    qpSettings.IsStage ? DemoSite.Mssql.DAL.ContentAccess.Stage : DemoSite.Mssql.DAL.ContentAccess.Live,
                    sp.GetService<SqlConnection>()));
            }

            //сервисы слоя данных
            services.AddScoped<IFaqService, FaqService>();
            services.AddScoped<IBlogService, BlogService>();

            //сервисы построения view-model
            services.AddScoped<BlogPageViewModelBuilder>();
            services.AddScoped<FaqWidgetViewModelBuilder>();

            services.AddScoped<CacheTagUtilities>();
            services.AddCacheTagServices(options => { options.InvalidateByTimer(TimeSpan.FromSeconds(30)); });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            //включаем инвалидацию по кештегам QP
            app.UseCacheTagsInvalidation(invalidation => { invalidation.RegisterScoped<QpContentCacheTracker>(); });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}
