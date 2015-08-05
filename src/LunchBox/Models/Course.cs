using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace LunchBox.Models
{
    public class Course
    {
        public int Id { get; set; }

        public DateTime Date { get; set; }

        public string Name { get; set; }

        public string AllDiners { get; set; }

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