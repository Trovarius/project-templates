using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphDomain.Domain.Posts
{
    public class Post
    {
        public Guid Id { get; set; }
        public TimeSpan CreatedDate { get; set; }
        public Guid UserId { get; set; }
        public int Likes { get; set; }
    }
}
