using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace LunchBox.Models
{
    // Entity
    public partial class CourseOrder
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public string Name { get; set; }

        public double Price { get; set; }

        public string AllDiners { get; set; }
    }

    // Calculations
    public partial class CourseOrder
    {
        [NotMapped]
        public string[] Diners
        {
            get
            {
                if (AllDiners == null)
                {
                    return new string[] { };
                }

                return AllDiners.Split('\n');
            }
            set
            {
                AllDiners = string.Join("\n", value);
            }
        }
    }
}