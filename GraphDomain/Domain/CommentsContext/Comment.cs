using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GraphDomain.Domain.Comments
{
    public class Comment
    {
        public Guid Id { get; set; }
        public Guid PostId { get; set; }
        public string Text { get; set; }
        public TimeSpan CreatedDate { get; set; }
    }
}
