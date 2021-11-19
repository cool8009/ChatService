using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatService.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatService.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {


        }
        public DbSet<Message> Messages {get; set;}
    }
}