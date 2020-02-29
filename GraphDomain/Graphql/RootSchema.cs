using GraphQL;
using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphDomain.Graphql
{
    public class RootSchema<T> : Schema 
        where T : ObjectGraphType
    {
        public RootSchema(IDependencyResolver resolver) : base(resolver)
        {
            Query = resolver.Resolve<T>();
        }
    }
}
