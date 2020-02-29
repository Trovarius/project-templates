using GraphDomain.Domain.Posts;
using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace GraphDomain.Application.Queries.Inputs
{
    public class PostQueryInput : ObjectGraphType<Post>
    {
        public PostQueryInput()
        {
            Field(x => x.Id);
            Field(x => x.CreatedDate);
            Field(x => x.Likes);
            Field(x => x.UserId);
        }

        public static QueryArguments GetArguments()
        {
            var a = BuildArguments<Post>.Get(x => x.Id);

            return new QueryArguments(new List<QueryArgument>
               {
                    BuildArguments<Post>.Get(x => x.Id),
                    BuildArguments<Post>.Get(x => x.CreatedDate),
                    BuildArguments<Post>.Get(x => x.UserId)
               });
        }
    }


    public static class BuildArguments<T>
    {
        public static QueryArgument Get<Tout>(Expression<Func<T, Tout>> expression, string argumentName = null)
        {
            var body = expression.Body as MemberExpression;

            if (body == null)
            {
                throw new ArgumentException("'expression' should be a member expression");
            }

            var propertyInfo = (PropertyInfo)body.Member;

            var propertyType = propertyInfo.PropertyType;
            var propertyName = argumentName ?? propertyInfo.Name;

            IDictionary<string, QueryArgument> typeMapped = new Dictionary<string, QueryArgument>() {
                { typeof(Guid).Name,  new QueryArgument<IdGraphType>() { Name = propertyName }},
                { typeof(int).Name,  new QueryArgument<IdGraphType>() { Name = propertyName }},
                { typeof(DateTime).Name,  new QueryArgument<DateGraphType>() { Name = propertyName }},
                { typeof(TimeSpan).Name,  new QueryArgument<DateGraphType>() { Name = propertyName }},
            };

            return typeMapped.ContainsKey(propertyType.Name)
                    ? typeMapped[propertyType.Name]
                    : new QueryArgument<StringGraphType>() { Name = propertyName };
        }
    }
}
