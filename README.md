# RA-P2
New York Time API

Instanews App
Objective: Create a one-page, responsive website that allows a user to filter top news story categories via the New York Times API.

Design Specifications:
The base font size is 16px and it HEX code is #ffffff.
The body font family is Open Sans Light.
The medium grey colour of the text in the footer is #c2c2c2.
Dynamically fetch story data and populate it in a webpage via the Top Stories API based a user’s selection from a <select> field
Resize the header area (i.e. logo plus <select>) so that it transitions from occupying the entire screen on page. Load to only auto height after the <select> field is changed (you will need jQuery for this)
Link each returned image to its URL on the NYT website

Must Haves:
Contain a single .html file and an external, minified .css file
Adequately reflect the designer’s vision for the website when built out using HTML and CSS
Demonstrate effective organization of the project’s root directory
Have a Git repository initialized in its root directory with an appropriately customized .gitignore file
Be pushed to GitHub (with all of your commits synced to it)
Contain a README.md file describing the project (e.g. technologies used, personal learnings, etc.)
Use Gulp for running build tasks, such as minification, Sass compilation, and error checking
Use Sass as a preprocessor, with CSS properly compiled and minified
Use Asynchronous HTTP requests to fetch data from the NYT Top Stories endpoint
Only display a maximum of 12 stories in the grid, and only display a story if it has a photo associated with it Transition users between UI states, starting where no stories have been returned, and then subsequently transitioning where stories populate the grid (by incorporating a loading gif)
Be responsively designed using a mobile-first approach Be optimized for 3 screen sizes: mobile, min-width: 600px, and min-width:1000px

Stretch goals:
Incorporate a <select> field with custom styles applied (you will need a jQuery plugin for this such as Heapbox)
Incorporate a combination of jQuery and CSS3-based animation to animate the movement of the header on the <select> change
Be sure to test your project completely in all major browsers (Chrome, Firefox, Safari, Opera, IE11) when you think you’re finished
Use CSS3 transitions to show and hide the article abstract on hover

Personal Challanges:
During the coding of the sites, it was very easy to split up the tast at hand. Though while coding there was a lot of code that was made up to make the parts stick together. Result was a lot of exsesive code lines. Going though the code though developer mode, it was found a lot of classes where not needed. 

Trying to write the whole page in javascript was not as hard as I thought it would be, though recommended to be done in jQuery. Many task where written out fully giving me a better understanding of what was exactly being done, rather then to relay on jQeury's shortcuts.

