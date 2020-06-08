// BURGER MENU
const menuIcon = document.querySelector('.burgerMenu');

const navbar = document.querySelector('.top-nav');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle("change");
})


const FrontPage = document.querySelector(".FrontPage");
const MusicPage = document.querySelector(".MusicPage");
const SchedulePage = document.querySelector(".SchedulePage");
const RepertoirePage = document.querySelector(".RepertoirePage");
const AboutPage = document.querySelector(".AboutPage");
const ContactPage = document.querySelector(".ContactPage");


//Fetching for Instagram gallery
fetch("http://designhavn.dk/5Wordpress/wp-json/wp/v2/media?_embed")
    .then(res => res.json())
    .then(handleInstagramPhotosData)

function handleInstagramPhotosData(InstagramPhotos) {
    InstagramPhotos.forEach(instaPhoto => {

        if (FrontPage) {
            document.querySelector(".home-a-link").classList.add("active-nav");
            const instagramTemplate = document.querySelector(".instagramTemplate").content;
            const cloneInstaTemp = instagramTemplate.cloneNode(true);

            cloneInstaTemp.querySelector(".imgInstagramCarousel").src = instaPhoto.source_url
            document.querySelector(".theInstagram").appendChild(cloneInstaTemp);
        }
    });
}


// ***** Fetching youtube links *******
fetch("http://designhavn.dk/5Wordpress/wp-json/wp/v2/youtube_link")
    .then(res => res.json())
    .then(handleYoutubeLinkData)
//has comments √
function handleYoutubeLinkData(youtubeLinks) {
    //Have an array of all links > need to look into each >>
    youtubeLinks.forEach(TheYoutubeLink => {

        //Have an each link

        //Find everything we need to fetch
        var theHeader = TheYoutubeLink.title.rendered;
        var theVideo = TheYoutubeLink.video_link;

        if (MusicPage) {
            document.querySelector(".music-a-link").classList.add("active-nav");
            if (document.querySelector(".performanceVideosTemplate")) {

                const performanceVideosTemplate = document.querySelector(".performanceVideosTemplate").content;

                const cloneYoutubeTemp = performanceVideosTemplate.cloneNode(true);
                cloneYoutubeTemp.querySelector(".youtubeVideosIframe").src = TheYoutubeLink.video_link;

                //        console.log(performanceVideo.video_link)

                //        show  more videos
                if (document.querySelector(".live-performances-videos").childElementCount < 3) {
                    document.querySelector(".live-performances-videos").appendChild(cloneYoutubeTemp);
                } else {
                    document.querySelector(".readMoreVideos").appendChild(cloneYoutubeTemp);
                }


            }
        }



        // Want to filter by category so look into all categories to find what we need
        TheYoutubeLink.categories.forEach(linkCat => {

            // category id of frontpage video is 8
            if (linkCat == 8) {
                if (FrontPage) {
                    // Display the video
                    document.querySelector(".front-page-youtube").src = theVideo;

                    //Display the title of the video
                    document.querySelector(".the-video-title-fetched").textContent = theHeader;
                }
            }
        });
    });
}
if (MusicPage) {
    const buttonExpand = document.querySelector(".videos-button");
    const secondContainer = document.querySelector(".readMoreVideos");
    secondContainer.style.display = "none";

    buttonExpand.addEventListener("click", showMoreVideos);

    function showMoreVideos() {
        if (secondContainer.style.display === "none") {
            secondContainer.style.display = "flex";

            buttonExpand.innerHTML = "Show less"
        } else {
            secondContainer.style.display = "none";
            buttonExpand.innerHTML = "Show more";
        }
    }
}



// ****** Fetching posts ********
fetch("http://designhavn.dk/5Wordpress/wp-json/wp/v2/posts?_embed")
    .then(res => res.json())
    .then(handlePostData)

//has comments √
function handlePostData(PostDataHandled) {

    // Now we have an array with all the posts
    // We need to "look into" the array to see each post "individually"
    PostDataHandled.forEach(item => {

        // Find everything I want to fetch from the json and give it a name (put it into a var)
        var theHeader = item.title.rendered;
        var theContent = item.content.rendered;
        var theExcerpt = item.excerpt.rendered;

        // Inorder to choose the posts I want to display I look into all the category ids being used
        // Since I don't aways want to display every post
        item.categories.forEach(postCategory => {


            // Vocal coaching - the vocal coaching category id is 10
            // So if it is 10 we want to do the following:
            if (postCategory == 10) {
                //To
                if (AboutPage) {
                    document.querySelector(".vocal-coaching-wrapper .vocal-coaching-header").textContent = theHeader;
                    document.querySelector(".vocal-coaching-wrapper .vocal-coaching-paragraph").innerHTML = theContent;
                }
            }


            // Her Album > the category for the text about the album is 6
            // So now we look through each post and if the category is 6 we add the content we need to html
            if (postCategory == 6) {

                //Here I'm choosing where to append it on the front page
                if (FrontPage) {
                    //We choose where to display the content we need
                    document.querySelector(".debut-album .fp-header").textContent = theHeader;

                    //Since in this case wordpress gives us "marked up" text we need to use .innerHTML
                    document.querySelector(".text-about-album").innerHTML = theExcerpt;
                }


                if (MusicPage) {
                    document.querySelector(".album-section-header").textContent = theHeader;



                    document.querySelector(".album-col2").innerHTML = theContent;

                }
            }

            // Newsletter > the category for the Newsletter is 7
            if (postCategory == 7) {

                if (FrontPage) {
                    // document.querySelector(".newsletter-updates .fp-header").textContent = theHeader;

                    document.querySelector(".text-about-newsletter").innerHTML = theContent;
                }
            }


            //About Gudrun short text
            if (postCategory == 2) {
                if (AboutPage) {
                    document.querySelector(".about-a-link").classList.add("active-nav");
                    document.querySelector(".about-wrapper .about-header").textContent = theHeader;

                    document.querySelector(".about-wrapper .about-text").innerHTML = theContent;
                }
            }

            //About Gudrun longer text
            if (postCategory == 11) {
                if (AboutPage) {
                    document.querySelector(".about-wrapper .about-see-more").innerHTML = theContent;
                }
            }



        });
    });
}
if (AboutPage) {
    const seeMoreExpand = document.querySelector(".about-expand");
    const shortAbout = document.querySelector("about-wrapper");
    const longAbout = document.querySelector(".about-see-more");
    longAbout.style.display = "none";

    seeMoreExpand.addEventListener("click", showMoreAbout);

    function showMoreAbout() {
        if (longAbout.style.display === "none") {
            longAbout.style.display = "block";
            longAbout.classList.add("fade-in");
            longAbout.classList.remove("fade-out");
            seeMoreExpand.innerHTML = "Show Less"
        } else {
            setTimeout(function () {
                longAbout.style.display = "none";
                seeMoreExpand.innerHTML = "Show More";
            }, 100);
            longAbout.classList.remove("fade-in");
            longAbout.classList.add("fade-out");
        }
    }
}


// ****** Fetching Article "links" ******
fetch("http://designhavn.dk/5Wordpress/wp-json/wp/v2/article")
    .then(res => res.json())
    .then(handleArticleData)

function handleArticleData(ArticleData) {
    ArticleData.forEach(theArticle => {

        var theArticleLink = theArticle.article_link;
        var theArticleTitle = theArticle.title.rendered;
        var theWebsiteName = theArticle.website_name;
        var theArticlePhotoLink = theArticle.article_image_link;

        if (AboutPage) {

            const pressTemplate = document.querySelector(".pressArticles").content;
            const clonePressTemp = pressTemplate.cloneNode(true);

            clonePressTemp.querySelector(".pressTitle").textContent = theArticleTitle;

            clonePressTemp.querySelector(".websiteName").textContent = theWebsiteName;

            clonePressTemp.querySelector(".pressImg").src = theArticlePhotoLink;

            clonePressTemp.querySelector(".theArticleLink").href = theArticleLink;

            document.querySelector(".press").appendChild(clonePressTemp)
        }
    });
}








fetch("http://designhavn.dk/5Wordpress/wp-json/wp/v2/quote?_embed&per_page=100")
    .then(res => res.json())
    .then(handleQuotes)

function handleQuotes(quotes) {
    quotes.forEach(showQuotes)

    function showQuotes(oneQuote) {

        var thePressQuote = oneQuote.quote_content;
        var quoteAuthor = oneQuote.quote_author;

        oneQuote.categories.forEach(quoteCategory => {

            //Press Quotes
            if (quoteCategory == 13) {
                if (AboutPage) {
                    const pressQuoteTemp = document.querySelector(".pressQuotesTemp").content;

                    const clonePressQuoteTemp = pressQuoteTemp.cloneNode(true);
                    clonePressQuoteTemp.querySelector(".thePressQuote").textContent = thePressQuote;
                    clonePressQuoteTemp.querySelector(".quotedPerson").textContent = quoteAuthor;
                    document.querySelector(".containerPressQuotes").appendChild(clonePressQuoteTemp);
                }

            }

            //vocal coaching quotes
            if (quoteCategory == 14) {

                if (AboutPage) {
                    const aboutQuoteTemp = document.querySelector(".quote-template").content;

                    const cloneAboutQuoteTemp = aboutQuoteTemp.cloneNode(true);
                    console.log(quoteAuthor);

                    cloneAboutQuoteTemp.querySelector(".quote").textContent = thePressQuote;

                    cloneAboutQuoteTemp.querySelector(".author").textContent = quoteAuthor;

                    document.querySelector(".slideshow-container").appendChild(cloneAboutQuoteTemp);
                }
            }
        });
    }

    if (AboutPage) {
        // Press Quotes!
        const onePressSlide = document.querySelector(".myPressSlides");
        onePressSlide.style.display = "block";
        const firstPressDot = document.querySelector(".pressDot");
        firstPressDot.classList.add("active");

        // Vocal Coaching
        const oneSlide = document.querySelector(".mySlides");
        oneSlide.style.display = "block";

        const firstDot = document.querySelector(".dot");
        firstDot.classList.add("active");
    }
}



//Marcelinas code

const checkForElementRepertoire = document.querySelector(".repertoireHeader");
// run the functions only if the element exists on the page
if (checkForElementRepertoire) {
    // fetching for repertoire subpage

    //fetching operas
    document.querySelector(".repertoire-a-link").classList.add("active-nav");

    const operasLink = "http://designhavn.dk/5Wordpress/wp-json/wp/v2/opera?_embed";
    fetch(operasLink)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            showData(data)
        })

    function showData(showOperas) {

        showOperas.forEach(showOneOpera);

        var clone;
        document.querySelector(".rep-opera-button").classList.add("active-rep-button");

        function showOneOpera(oneOpera) {
            // for multiple items
            const operaNameSplit = oneOpera.opera_name.split(", ");
            const operaRoleSplit = oneOpera.role.split(", ");
            const templateRepertoireOperas = document.querySelector(".template-repertoire-all-operas").content;
            clone = templateRepertoireOperas.cloneNode(true);
            clone.querySelector(".repertoire-opera-composer").textContent = oneOpera.composer;
            // adding list items
            for (i = 0; i < operaNameSplit.length; i++) {
                const elemLi = document.createElement("li");
                elemLi.textContent = operaNameSplit[i];
                clone.querySelector(".repertoire-opera-name ul").appendChild(elemLi);

            }
            for (i = 0; i < operaRoleSplit.length; i++) {
                const elemLi = document.createElement("li");
                elemLi.textContent = operaRoleSplit[i];
                clone.querySelector(".repertoire-opera-role ul").appendChild(elemLi);

            }
            document.querySelector(".repertoire-all-operas").appendChild(clone);
        }

    }

    //fetching oratorios

    const oratoriosLink = "http://designhavn.dk/5Wordpress/wp-json/wp/v2/oratorio";
    fetch(oratoriosLink)
        .then(function (response) {
            return response.json()
        })
        .then(function (data2) {
            showData2(data2)
        })

    function showData2(showOratorios) {
        /*console.log(showOperas);*/


        showOratorios.forEach(showOneOratorio);

        var clone;

        function showOneOratorio(oneOratorio) {
            // for multiple items
            const oratorioTitleSplit = oneOratorio.composition_titles.split(", ");
            const templateRepertoireOratorios = document.querySelector(".template-repertoire-all-oratorios").content;
            clone = templateRepertoireOratorios.cloneNode(true);
            clone.querySelector(".repertoire-oratorio-composer").textContent = oneOratorio.composer;
            // adding list items
            for (i = 0; i < oratorioTitleSplit.length; i++) {
                const elemLi = document.createElement("li");
                elemLi.textContent = oratorioTitleSplit[i];
                clone.querySelector(".repertoire-oratorio-titles ul").appendChild(elemLi);

            }

            document.querySelector(".repertoire-all-oratorios").appendChild(clone);
            document.querySelector(".repertoire-all-oratorios").classList.add("hide");
        }

    }

    //fetching chamber music

    const musicLink = "http://designhavn.dk/5Wordpress/wp-json/wp/v2/chamber_music";
    fetch(musicLink)
        .then(function (response) {
            return response.json()
        })
        .then(function (data3) {
            showData3(data3)
        })

    function showData3(showMusic) {
        /*console.log(showOperas);*/


        showMusic.forEach(showOneMusic);

        var clone;

        function showOneMusic(oneMusic) {
            // for multiple items
            const templateRepertoireMusic = document.querySelector(".template-repertoire-all-music").content;
            clone = templateRepertoireMusic.cloneNode(true);
            clone.querySelector(".repertoire-music-title").textContent = oneMusic.event_title;
            clone.querySelector(".repertoire-music-description").textContent = oneMusic.event_description;
            clone.querySelector(".repertoire-music-works").textContent = oneMusic.works;


            document.querySelector(".repertoire-all-music").appendChild(clone);
            document.querySelector(".repertoire-all-music").classList.add("hide");
        }

    }



    document.querySelector(".rep-oratorio-button").addEventListener("click", oratoriosAppear);

    function oratoriosAppear() {
        document.querySelector(".repertoire-all-operas").classList.add("hide");
        document.querySelector(".repertoire-all-music").classList.add("hide");
        document.querySelector(".repertoire-all-oratorios").classList.add("fade-in");
        document.querySelector(".repertoire-all-oratorios").classList.remove("hide");
        document.querySelector(".rep-oratorio-button").classList.add("active-rep-button");
        document.querySelector(".rep-opera-button").classList.remove("active-rep-button");
        document.querySelector(".rep-music-button").classList.remove("active-rep-button");
    }

    document.querySelector(".rep-opera-button").addEventListener("click", operasAppear);

    function operasAppear() {
        document.querySelector(".repertoire-all-oratorios").classList.add("hide");
        document.querySelector(".repertoire-all-music").classList.add("hide");
        document.querySelector(".repertoire-all-operas").classList.add("fade-in");
        document.querySelector(".repertoire-all-operas").classList.remove("hide");
        document.querySelector(".rep-opera-button").classList.add("active-rep-button");
        document.querySelector(".rep-oratorio-button").classList.remove("active-rep-button");
        document.querySelector(".rep-music-button").classList.remove("active-rep-button");
    }

    document.querySelector(".rep-music-button").addEventListener("click", musicAppear);

    function musicAppear() {
        document.querySelector(".repertoire-all-oratorios").classList.add("hide");
        document.querySelector(".repertoire-all-operas").classList.add("hide");
        document.querySelector(".repertoire-all-music").classList.add("fade-in");
        document.querySelector(".repertoire-all-music").classList.remove("hide");
        document.querySelector(".rep-music-button").classList.add("active-rep-button");
        document.querySelector(".rep-oratorio-button").classList.remove("active-rep-button");
        document.querySelector(".rep-opera-button").classList.remove("active-rep-button");
    }

}


var checkForElementScedule = document.querySelector(".schedule-main-heading");
if (checkForElementScedule) {
    // fetching for the schedule subpage
    //fetching events
    document.querySelector(".schedule-a-link").classList.add("active-nav");

    const eventsLink = "http://designhavn.dk/5Wordpress/wp-json/wp/v2/event";
    fetch(eventsLink)
        .then(function (response) {
            return response.json()
        })
        .then(function (data4) {
            showData4(data4)
        })

    function showData4(showEvents) {
        /*console.log(showOperas);*/


        /*showMusic.forEach(showOneMusic);*/

        showEvents.forEach(showOneEvent);


        function showOneEvent(oneEvent) {
            const templateEvents = document.querySelector(".schedule-temp").content;
            const clone = templateEvents.cloneNode(true);
            clone.querySelector(".schedule-date").textContent = oneEvent.event_date;
            console.log(oneEvent.event_date)
            clone.querySelector(".schedule-perf-name").textContent = oneEvent.event_name;
            clone.querySelector(".schedule-perf-location").textContent = oneEvent.event_location;
            const elemBtn = document.createElement("button");
            elemBtn.textContent = "More information";
            elemBtn.addEventListener("click", windowOpen);

            function windowOpen() {
                window.open("http://www.gudrun-ingimars.com/", "_blank", "width=800, height=600");
            }
            elemBtn.classList.add("grey-button");
            clone.querySelector(".schedule-btn-wrapper").appendChild(elemBtn);
            var childNumber = document.querySelector(".upcoming-container").childElementCount;
            if (childNumber < 5) {
                document.querySelector(".upcoming-container").appendChild(clone);
            } else {
                document.querySelector(".upcoming-container2").appendChild(clone);
            }
        }
    }


    const buttonExpand = document.querySelector(".schedule-expand");
    const firstContainer = document.querySelector(".upcoming-container");
    const secondContainer = document.querySelector(".upcoming-container2");
    secondContainer.style.display = "none";

    buttonExpand.addEventListener("click", showMore);

    function showMore() {
        if (secondContainer.style.display === "none") {
            secondContainer.style.display = "block";
            secondContainer.classList.add("fade-in");
            secondContainer.classList.remove("fade-out");
            buttonExpand.innerHTML = "Show less"
        } else {
            setTimeout(function () {
                secondContainer.style.display = "none";
                buttonExpand.innerHTML = "Show more";
            }, 450);
            secondContainer.classList.remove("fade-in");
            secondContainer.classList.add("fade-out");


        }

    }

    document.querySelector(".btn-to-repertoire").addEventListener("click", goToRepertoire)

    function goToRepertoire() {
        window.location.replace("repertoire.html");
    }

    document.querySelector(".btn-to-contact").addEventListener("click", goToContact)

    function goToContact() {
        window.location.replace("contact.html");
    }
}

// check if the page contains specific HTML element - in order to prevent running code meant for different subpages and errors
var checkForElementContact = document.querySelector(".contact-main-wrapper");

if (checkForElementContact) {
    document.querySelector(".contact-a-link").classList.add("active-nav");
    //fetching info for contact page
    const contactLink = "http://designhavn.dk/5Wordpress/wp-json/wp/v2/contact";
    fetch(contactLink)
        .then(function (response) {
            return response.json()
        })
        .then(function (data6) {
            showData6(data6)
        })

    function showData6(showContactInf) {
        /*console.log(showOperas);*/


        /*showMusic.forEach(showOneMusic);*/

        /*  showContactInf.forEach(contactInf);*/
        showContactInf.forEach(showContactDetails);

        function showContactDetails(oneContactInf) {
            const templateContactInf = document.querySelector(".contact-inf-temp").content;
            const clone = templateContactInf.cloneNode(true);
            clone.querySelector(".fullname-d").textContent = oneContactInf.full_name;
            clone.querySelector(".email-d").textContent = oneContactInf.email_address;
            clone.querySelector(".phone-d").textContent = oneContactInf.phone_number;
            clone.querySelector(".address-d").textContent = oneContactInf.location;
            document.querySelector(".contact-info-det").appendChild(clone);
        }


    }

}



/* FETCHING FOOTER */
fetch("https://designhavn.dk/5Wordpress/wp-json/wp/v2/contact?_embed")
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        showInfo(data)
    })

function showInfo(jsonData) {
    jsonData.forEach(showInfo)


    function showInfo(contact) {
        const template = document.querySelector("#myTemplateFooter").content;
        const clone = template.cloneNode(true);

        clone.querySelector(".contact-name").textContent = contact.full_name;

        clone.querySelector(".contact-email").textContent = contact.email_address;

        clone.querySelector(".contact-phone").textContent = contact.phone_number;

        clone.querySelector(".contact-location").textContent = contact.location;

        document.querySelector(".footer-items-contact").appendChild(clone);

    }
}



//Press Quotes!
var slidePressIndex = 1;
showPressSlides(slidePressIndex);

function plusPressSlides(n) {
    showPressSlides(slidePressIndex += n);
}

function currentPressSlide(n) {
    showPressSlides(slidePressIndex = n);
}

document.querySelector(".myPressSlides").style.display = "block";

function showPressSlides(n) {
    var i;
    var pressSlides = document.getElementsByClassName("myPressSlides");

    var pressDots = document.getElementsByClassName("pressDot");
    if (n > pressSlides.length) {
        slidePressIndex = 1
    }
    if (n < 1) {
        slidePressIndex = pressSlides.length
    }
    for (i = 0; i < pressSlides.length; i++) {
        pressSlides[i].style.display = "none";
    }
    for (i = 0; i < pressDots.length; i++) {
        pressDots[i].className = pressDots[i].className.replace(" active", "");
    }
    pressSlides[slidePressIndex - 1].style.display = "block";

    pressDots[slidePressIndex - 1].className += " active";

}









//Vocal Quotes!

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

document.querySelector(".mySlides").style.display = "block";

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}







//burger menu code from: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_menu_icon_js
