using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace LunchBox.Models
{
    // Entity
    public partial class Course
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public double Price { get; set; }
    }
}