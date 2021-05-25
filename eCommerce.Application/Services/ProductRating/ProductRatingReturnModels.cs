using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;
using static eCommerce.Application.Services.Inventories.InventoryReturnModels;

namespace eCommerce.Application.Services.ProductRating
{
    public static class ProductRatingReturnModels
    {
        public class ProductRating
        {
            public string FullName { get; set; }

            public Product Product { get; set; }

            public string Email { get; set; }

            public string ReviewTitle { get; set; }

            public string ReviewContent { get; set; }

            public int NumberStar { get; set; }

            public DateTime CreatedDate { get; set; }
        }

        public class MappingProductRating : Profile
        {
            public MappingProductRating()
            {
                CreateMap<Domain.Entities.ProductRating, ProductRating>();
            }
        }

        public class StartValue
        {
            public int NumberStar { get; set; }
            public int NumberRating { get; set; }
        }

        public class GetStarResponse
        {

            public Guid ProductId { get; set; }

            public int NumberRating { get; set; }

            public List<StartValue> StartValues { get; set; }

            public int MaxStar { get; set; }

            public int SumValue { get; set; }

            public Double AvgValueDouble { get; set; }

            public void AddRating(int numberStar)
            {
                NumberRating++;

                //set SumValue And Avg Value
                SumValue += numberStar;



                //check MaxStar < numberStar to do add all element star integer with < numberStar
                if (MaxStar < numberStar)
                {
                    for (; MaxStar <= numberStar; MaxStar++)
                    {
                        StartValues.Add(new StartValue { NumberStar = MaxStar, NumberRating = 0 });
                    }
                    MaxStar = numberStar;
                }

                //check star is exist in arry after increment 1 value
                int i = 0;
                foreach (StartValue startValue in StartValues)
                {
                    if (startValue.NumberStar == numberStar)
                    {
                        ++StartValues[i].NumberRating;
                        return;
                    }
                    i++;
                }


            }

            public void CalculatorAvg()
            {
                AvgValueDouble = (Double)SumValue * 10 / NumberRating;
                var AvgValueInt = (int)AvgValueDouble;
                AvgValueDouble = (Double)AvgValueInt / 10;
            }

        }

        public class GetStarInCardResponse
        {
            public Guid ProductId { get; set; }

            public Double AvgValueDouble { get; set; }

        }
    }
}
