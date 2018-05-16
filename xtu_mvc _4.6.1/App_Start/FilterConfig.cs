using System.Web;
using System.Web.Mvc;

namespace xtu_mvc__4._6._1
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
