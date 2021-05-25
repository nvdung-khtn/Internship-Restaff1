using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Shared.Models
{
    public class PaginatedResult<T>
    {
        public IEnumerable<T> Items { get; set; }

        public int TotalRows { get; set; }

        public int TotalPages { get; set; }
    }

    public class Pagination
    {
        private int _pageIndex;
        public int PageIndex 
        {
            get => _pageIndex == 0 ? 0 : _pageIndex;
            set => _pageIndex = value;
        }

        private int _itemsPerPage;
        public int ItemsPerPage 
        {
            get => _itemsPerPage == 0 ? 10 : _itemsPerPage;
            set => _itemsPerPage = value;
        }
    }
}
