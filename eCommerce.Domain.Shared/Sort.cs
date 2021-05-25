using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Shared
{
    public class Sort
    {
        public static List<SortItem> ListSort(string sort)
        {
            List<SortItem> listSort = new List<SortItem>();
            string[] Sort = SplitSort(sort);
            for (int i = 0; i < Sort.Length; i++)
            {
                listSort.Add(ConvertRequestSort(Sort[i]));
            }
            return listSort;
        }

        private static string[] SplitSort(string requestSort)
        {
            return requestSort.Split(';');
        }

        private static SortItem ConvertRequestSort(string sort)
        {
            string[] sortItem = sort.Split('|');
            SortItem item = new SortItem();
            item.FieldName = sortItem[0];
            item.IsDescending = bool.Parse(sortItem[1]);
            return item;
        }
    }
}
