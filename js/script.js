
/* =========================
   HOC SUPER APP WEBSITE
   Main JavaScript
========================= */


// Current year in footer

const year = new Date().getFullYear();

const footerText = document.querySelector("footer p");

if (footerText) {

    footerText.innerHTML =
    `© ${year} HOC Super App. All Rights Reserved.`;

}




// Smooth scrolling for navigation links

document.querySelectorAll('a[href^="#"]').forEach(link => {


    link.addEventListener("click", function(e){


        const target = document.querySelector(
            this.getAttribute("href")
        );


        if(target){

            e.preventDefault();


            target.scrollIntoView({

                behavior:"smooth"

            });

        }


    });


});




// Simple scroll reveal animation


const sections = document.querySelectorAll(
    ".section, .card"
);



const observer = new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


    if(entry.isIntersecting){


        entry.target.style.opacity="1";

        entry.target.style.transform="translateY(0)";


    }



});


},

{

threshold:0.15

}

);




sections.forEach(section=>{


    section.style.opacity="0";

    section.style.transform="translateY(40px)";

    section.style.transition="all .8s ease";


    observer.observe(section);


});
