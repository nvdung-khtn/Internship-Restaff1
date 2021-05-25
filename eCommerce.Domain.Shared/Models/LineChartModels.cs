using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Shared.Models
{
    public class LineChartModels
    {
        public string Name { get; set; }
        public decimal[] Data { get; set; }
        public LineChartModels()
        {

        }
        public LineChartModels(string name, decimal[] data)
        {
            this.Name = name;
            this.Data = data;
        }
    }

    public class ChartModels
    {
        public int Month { get; set; }
        public decimal Value { get; set; }
        public ChartModels(int month, decimal value)
        {
            this.Month = month;
            this.Value = value;
        }
    }
}
