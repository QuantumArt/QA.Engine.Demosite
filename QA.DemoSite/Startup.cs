using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Npgsql;
using QA.DemoSite.Interfaces;
using QA.DemoSite.Models.Pages;
using QA.DemoSite.Mssql.DAL;
using QA.DemoSite.Postgre.DAL;
using QA.DemoSite.Services;
using QA.DemoSite.Templates;
using QA.DemoSite.ViewModels.Builders;
using QA.DotNetCore.Engine.Abstractions;
using QA.DotNetCore.Engine.Abstractions.OnScreen;
using QA.DotNetCore.Engine.AbTesting.Configuration;
using QA.DotNetCore.Engine.CacheTags;
using QA.DotNetCore.Engine.CacheTags.Configuration;
using QA.DotNetCore.Engine.OnScreen.Configuration;
using QA.DotNetCore.Engine.Persistent.Interfaces;
using QA.DotNetCore.Engine.Persistent.Interfaces.Settings;
using QA.DotNetCore.Engine.QpData.Configuration;
using QA.DotNetCore.Engine.Routing.Configuration;
using QA.DotNetCore.Engine.Targeting.Configuration;
using System;
using System.Data.SqlClient;

namespace QA.DemoSite
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var mvc = services.AddMvc(o => {
                //o.EnableEndpointRouting = false;
            }).AddRazorRuntimeCompilation();

            services.AddLogging();
            services.AddSingleton<ILogger>(provider => provider.GetRequiredService<ILogger<Program>>());

            var qpSettings = Configuration.GetSection("QpSettings").Get<QpSettings>();
            if (!Enum.TryParse(qpSettings.DatabaseType, true, out DatabaseType dbType))
            {
                dbType = DatabaseType.SqlServer;
            }
            qpSettings.ConnectionString = dbType == DatabaseType.SqlServer ? Configuration.GetConnectionString("DatabaseQP") : Configuration.GetConnectionString("DatabaseQPPostgre");

            services.AddSingleton(qpSettings);

            //структура сайта виджетной платформы
            services.AddSiteStructureEngine(options =>
            {
                options.UseQpSettings(qpSettings);
                options.TypeFinder.RegisterFromAssemblyContaining<RootPage, IAbstractItem>();
            });

            //ef контекст
            if (dbType == DatabaseType.Postgres)
            {
                services.AddScoped<NpgsqlConnection>(_ => new NpgsqlConnection(qpSettings.ConnectionString));
                services.AddScoped<IDbContext>(sp => PostgreQpDataContext.CreateWithStaticMapping(
                    qpSettings.IsStage ? Postgre.DAL.ContentAccess.Stage : Postgre.DAL.ContentAccess.Live,
                    sp.GetService<NpgsqlConnection>()));
            }
            else
            {
                services.AddScoped<SqlConnection>(_ => new SqlConnection(qpSettings.ConnectionString));
                services.AddScoped<IDbContext>(sp => QpDataContext.CreateWithStaticMapping(
                    qpSettings.IsStage ? Mssql.DAL.ContentAccess.Stage : Mssql.DAL.ContentAccess.Live,
                    sp.GetService<SqlConnection>()));
            }

            //сервисы слоя данных
            services.AddScoped<IFaqService, FaqService>();
            services.AddScoped<IBlogService, BlogService>();

            //сервисы построения view-model
            services.AddScoped<BlogPageViewModelBuilder>();
            services.AddScoped<FaqWidgetViewModelBuilder>();
            services.AddSingleton<MenuViewModelBuilder>();

            //подключение self-hosted аб-тестов
            services.AddAbTestServices(options =>
            {
                options.UseQpSettings(qpSettings);
            });

            //работа с кеш-тэгами
            services.AddScoped<CacheTagUtilities>();
            services.AddCacheTagServices(options =>
            {
                if (qpSettings.IsStage)
                {
                    options.InvalidateByMiddleware(@"^.*\/.+\.[a-zA-Z0-9]+$");//отсекаем левые запросы для статики (для каждого сайта может настраиваться индивидуально)
                }
                else
                {
                    options.InvalidateByTimer(TimeSpan.FromSeconds(30));
                }
            });

            //возможность работы с режимом onscreen
            services.AddOnScreenIntegration(mvc, options =>
            {
                options.AdminSiteBaseUrl = Configuration.GetSection("OnScreen").Get<OnScreenSettings>().AdminSiteBaseUrl;
                options.AvailableFeatures = OnScreenFeatures.Widgets | OnScreenFeatures.AbTests;
                options.UseQpSettings(qpSettings);
            });
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseDeveloperExceptionPage();
            app.UseStaticFiles();

            //включаем инвалидацию по кештегам QP
            app.UseCacheTagsInvalidation(invalidation =>
            {
                invalidation.Register<QpContentCacheTracker>();
            });

            //активируем структуру сайта (добавляем в http-контекст структуру сайта)
            app.UseSiteStructure();

            app.UseRouting();

            //включаем возможность работы onscreen
            var qpSettings = Configuration.GetSection("QpSettings").Get<QpSettings>();
            app.UseOnScreenMode(qpSettings.CustomerCode);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapAbtestEndpointRoute();
                endpoints.MapSiteStructureControllerRoute();
            });

            //app.UseMvc(routes =>
            //{
            //    routes.MapContentRoute("default", "{controller}/{action=Index}/{id?}");
            //    routes.MapRoute("static controllers route", "{controller}/{action=Index}/{id?}");
            //});
        }
    }
}
