using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Com.Cognizant.Truyum.Utility;
using Com.Cognizant.Truyum.Dao;
using Com.Cognizant.Truyum.Model;

namespace TruyumConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            MenuItemDaoCollectionTest obj = new MenuItemDaoCollectionTest();
            obj.TestGetMenuItemListAdmin();

            Console.WriteLine("\n\n");
            obj.TestGetMenuItemListCustomer();

            Console.WriteLine("\n\n");
            obj.TestModifyMenuItem();


            Console.WriteLine("\n\nCart:");
            CartDaoCollectionTest obj2 = new CartDaoCollectionTest();
            obj2.TestAddCartItem();

            Console.WriteLine("\n\n");
            obj2.TestRemoveCartItem();


            // SQL 
            // PART
            Console.WriteLine("SQL CLASSES:");
            MenuItemDaoSql o = new MenuItemDaoSql();

            var x = o.GetMenuItemListAdmin();
            Console.WriteLine("Item in db:");
            x.ForEach(y => Console.WriteLine(y.Name + ":" + y.Price + ":" + y.Active + ":" + y.DateOfLaunch + ":" + y.Category + ":" + y.FreeDelivery));
            Console.WriteLine("\n");

            x = o.GetMenuItemListCustomer();
            Console.WriteLine("Item in stock:");
            x.ForEach(y => Console.WriteLine(y.Name + ":" + y.Price + ":" + y.Active + ":" + y.DateOfLaunch + ":" + y.Category + ":" + y.FreeDelivery));
            Console.WriteLine("\n");

            MenuItem menuItem = new MenuItem();
            menuItem = o.GetMenuItem(5);
            Console.WriteLine("Item with Id = 5 :");
            Console.WriteLine(menuItem.Name + menuItem.Price + menuItem.Active + menuItem.DateOfLaunch + menuItem.Category + menuItem.FreeDelivery);
            Console.WriteLine("\n");

            CartDaoSql o2 = new CartDaoSql();
            o2.AddMenuItem(1, 1);
            o2.AddMenuItem(1, 2);
            o2.AddMenuItem(1, 3);
            o2.AddMenuItem(1, 4);
            o2.AddMenuItem(1, 5);
            o2.AddMenuItem(2, 1);
            o2.AddMenuItem(2, 6);
            o2.AddMenuItem(3, 7);

            List<MenuItem> menuItemList = new List<MenuItem>();
            menuItemList = o2.GetMenuItems(1);
            Console.WriteLine("Item for user=1 Are:");
            menuItemList.ForEach(y => Console.WriteLine(y.Name + y.Price + y.Active + y.DateOfLaunch + y.Category + y.FreeDelivery));

            menuItemList = o2.GetMenuItems(2);
            Console.WriteLine("Item for user=2 Are:");
            menuItemList.ForEach(y => Console.WriteLine(y.Name + y.Price + y.Active + y.DateOfLaunch + y.Category + y.FreeDelivery));

            menuItemList = o2.GetMenuItems(3);
            Console.WriteLine("Item for user=3 Are:");
            menuItemList.ForEach(y => Console.WriteLine(y.Name + y.Price + y.Active + y.DateOfLaunch + y.Category + y.FreeDelivery));


            o2.RemoveMenuItem(2, 6);
            menuItemList = o2.GetMenuItems(2);
            Console.WriteLine("Item for user=2 Are:");
            menuItemList.ForEach(y => Console.WriteLine(y.Name + y.Price + y.Active + y.DateOfLaunch + y.Category + y.FreeDelivery));


            Console.ReadLine();

        }
    }
}
