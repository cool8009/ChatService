using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatService.Models
{
    public class Message
    {
        public Guid Id { get; set; }
        public string Content { get; set; }
        public DateTime DateSent  { get; set; }
    }
}