using System;
using System.Collections.Generic;
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
using QA.DemoSite.Postgre.DAL;
using QA.DemoSite.Services;
using QA.DemoSite.Templates;
using QA.DemoSite.ViewModels.Builders;
using QA.DotNetCore.Engine.CacheTags;
using QA.DotNetCore.Engine.CacheTags.Configuration;
using QA.DotNetCore.Engine.Persistent.Interfaces.Settings;
using QA.DotNetCore.Engine.QpData.Configuration;

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
            services.AddSiteStructure(options => { options.UseQpSettings(qpSettings); });
            services.AddSingleton(qpSettings);

            services.AddScoped<NpgsqlConnection>(_ => new NpgsqlConnection(qpSettings.ConnectionString));
            services.AddScoped<IDbContext>(sp => PostgreQpDataContext.CreateWithStaticMapping(
                qpSettings.IsStage ? ContentAccess.Stage : ContentAccess.Live,
                sp.GetService<NpgsqlConnection>()));

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
