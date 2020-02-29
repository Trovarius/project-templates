using GraphDomain.Domain.Posts;
using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphDomain.Application.Queries.Outputs
{
    public class PostQueryOutput : ObjectGraphType<Post>
    {
    }
}
