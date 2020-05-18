using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using QA.DotNetCore.Engine.Abstractions;
using QA.DotNetCore.Engine.QpData;

namespace QA.Demosite.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SiteStructureController : ControllerBase
    {
        public SiteStructureController(IAbstractItemStorageProvider abstractItemStorageProvider)
        {
            _abstractItemStorageProvider = abstractItemStorageProvider;
        }

        private IAbstractItemStorageProvider _abstractItemStorageProvider { get; }

        [HttpGet]
        public ActionResult Get(int? id)
        {
            var storage = _abstractItemStorageProvider.Get();
            var item = id.HasValue ? storage.Get(id.Value) : storage.Root;

            return new JsonResult(item, IgnoreParentSerializeSettings());
        }


        private static JsonSerializerSettings IgnoreParentSerializeSettings()
        {
            return new JsonSerializerSettings
            {
                ContractResolver = new IgnoreParentSerializerContractResolver(),
            };
        }
    }



    public class IgnoreParentSerializerContractResolver : DefaultContractResolver
    {
        public IgnoreParentSerializerContractResolver()
        {
            NamingStrategy = new CamelCaseNamingStrategy();
        }

        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            var property = base.CreateProperty(member, memberSerialization);

            if (property.DeclaringType.IsAssignableFrom(typeof(AbstractItem)) && property.PropertyName == "parent")
            {
                property.ShouldSerialize =
                    _ => { return false; };
            }

            return property;
        }
    }
}
