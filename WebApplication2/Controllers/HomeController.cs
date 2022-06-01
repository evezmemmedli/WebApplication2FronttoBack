using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {

            
            List<Slider> sliders = new List<Slider>()
            {
                new Slider
                {
                    Id = 1,
                    ImageUrl = "https://htmldemo.net/juan/juan/assets/img/slider/slider-2.jpg",
                    Title = "Slide1",
                    Subtitle ="About Slide1",
                    ButtonAdress = "https://www.shazam.com/"
                },
                new Slider
                {
                    Id = 2,
                    ImageUrl = "https://htmldemo.net/juan/juan/assets/img/slider/slider-1.jpg",
                    Title = "Slide2",
                    Subtitle ="About Slide2",
                    ButtonAdress="https://www.google.com/"
                },
            };

            ViewBag.sliders = sliders;
            return View(sliders);
        }

        public IActionResult Shop()
        {
            return View();
        }

        public IActionResult BlogDetail()
        {
            return View();
        }

        public IActionResult Blogs()
        {
            return View();
        }

        public IActionResult Cart()
        {
            return View();
        }

        public IActionResult ContactUs()
        {
            return View();
        }

        public IActionResult ProductDetail()
        {
            return View();
        }


    }
}
