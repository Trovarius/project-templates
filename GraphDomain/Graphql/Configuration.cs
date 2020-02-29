using GraphQL;
using GraphQL.Server;
using GraphQL.Server.Ui.Playground;
using GraphQL.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphDomain.Graphql
{
    public static class Configuration
    {
        public static void ConfigureGraphQL<T>(this IServiceCollection services)
            where T : Schema
        {
            services.AddScoped<IDependencyResolver>(x =>
                new FuncDependencyResolver(x.GetRequiredService));

            services.AddScoped<T>();

            services.AddGraphQL(x =>
            {
                x.ExposeExceptions = true; //set true only in development mode. make it switchable.
            })
            .AddGraphTypes(ServiceLifetime.Scoped)
            .AddUserContextBuilder(httpContext => httpContext.User)
            .AddDataLoader();
        }

        public static void AddGraphQLPlayground<T>(this IApplicationBuilder app)
            where T : Schema
        {
            app.UseGraphQL<T>();
            app.UseGraphQLPlayground(new GraphQLPlaygroundOptions()); //to explorer API navigate https://*DOMAIN*/ui/playground
        }
    }
}
