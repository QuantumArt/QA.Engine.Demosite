using Quantumart.QP8.CoreCodeGeneration.Services;
using System.Linq;

namespace QA.DemoSite.Postgre.DAL
{
    public interface IMappingResolver
    {
        SchemaInfo GetSchema();
        ContentInfo GetContent(string mappedName);
        AttributeInfo GetAttribute(string contentMappedName, string fieldMappedName);
        AttributeInfo GetAttribute(string key);
    }

    public class MappingResolver : IMappingResolver
    {
        private ModelReader _schema;

        public MappingResolver(ModelReader schema)
        {
            _schema = schema;
        }

        public SchemaInfo GetSchema()
        {
            return _schema.Schema;
        }

        public ContentInfo GetContent(string mappedName)
        {
            return _schema.Contents.Single(c => c.MappedName == mappedName);
        }

        public AttributeInfo GetAttribute(string key)
        {

            var attributes = from c in _schema.Contents.Where(x=>!string.IsNullOrWhiteSpace(x.MappedName))
                             from a in c.Attributes
                             where a.IsM2M && key.StartsWith(c.MappedName)
                             && key.EndsWith(a.MappedName)
                             select a;

            return attributes.Single();
        }
        public AttributeInfo GetAttribute(string contentMappedName, string fieldMappedName)
        {
            var attributes = from c in _schema.Contents
                             from a in c.Attributes
                             where
                                 c.MappedName == contentMappedName &&
                                 a.MappedName == fieldMappedName
                             select a;
            if (attributes.Count() == 1)
            {
                return attributes.Single();
            }
            var attributesWithRefToVirtual = from c in _schema.Contents
                                             from a in c.Attributes
                                             where
                                                 c.MappedName == contentMappedName &&
                                                 a.Name == fieldMappedName
                                             select a;
            return attributesWithRefToVirtual.Single();
        }
    }
}
