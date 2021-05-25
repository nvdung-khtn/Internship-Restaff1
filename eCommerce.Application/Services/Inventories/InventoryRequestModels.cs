using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Inventories
{
    public class InventoryRequestModels
    {
        public class Search
        {
            public string ProductName { get; set; }

            public int PageIndex { get; set; }

            public int PageSize { get; set; }

            public string OwnerUsername { get; set; }
            public string Sort { get; set; }
        }

        public class Update
        {
            public Guid Id { get; set; }
            public int Quantity { get; set; }
            public string[] RowVersion { get; set; }
        }

        public class UpdateInventoryValidator : AbstractValidator<Update>
        {
            public UpdateInventoryValidator()
            {
                RuleFor(c => c.Id).NotEmpty();
                RuleFor(c => c.Quantity).NotEmpty();
                RuleFor(c => c.RowVersion).NotEmpty();
            }
        }
    }
}
