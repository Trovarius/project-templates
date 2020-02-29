using GraphDomain.Application.Queries.Inputs;
using GraphDomain.Application.Queries.Outputs;
using GraphDomain.Domain.Posts;
using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace GraphDomain.Application.Queries
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            this.PostQuery();
        }

        public void PostQuery()
        {
            FieldAsync<PostQueryInput, ListGraphType<PostQueryOutput>>("posts",
               arguments: PostQueryInput.GetArguments(),
               resolve: context => {
                   return Task.FromResult<ListGraphType<PostQueryOutput>>(new ListGraphType<PostQueryOutput>());
               });
        }
    }
}
