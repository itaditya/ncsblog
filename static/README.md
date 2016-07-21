# ncsblog
a blogging site to share knowledge amongs geeks , started as a summer project .

for web/prog/design

## Project Structure 
---

* The main page is ncs.html
** The navbar has a register button .
** and about-ncsWebsite also.
** Now comes a banner having login fields on the right .
** and below it is the main section. 
** It has 4 carousels for all categories .
** Each carousel displays the blogs of that category , acc to popularity  .
** In one view , 3 blog cards are shown .
** Each card contains the tech used tag , blog title , author , views .

* The register page .
** It has 3 fields - name , dp , ncsId .

* For a logged in user , he will be redirected to dashboard.html .
** the navbar contains NewBlog btn and logout btn . 
** the dashboard will show blog cards made by the logged in user .
** the page has a New Blog ( + ) button on bottom right too .
** Clicking it opens the blog editor which resembles the /...Blog.html page .
** But every editable thing is marked with pencil .

*  ...Blog.html page is for reading blogs .



## How to make a blog  
--- 

* Visit this site : 
* Register or Login accordingly .
* Now you are on your dashboard .
* Click on "New Blog" .
* You will be redirected now .
* On the creating page , every editable item will be marked by a pencil icon.
* Clicking on the items to edit them . 
* On this page , first fill the title of the blog .
* Then in the sidebar , enter the blog sections main ideas .
    |
    |__ Introduction
    |__ What you should know
    |__ Getting Started
    |__ Making a Layout
    |__ Examples
    |__ Applications
    |__ Conclusion

* The no. of such sections will create input blocks of same no. on left side .
* In each section you will have to enter the respective content .
* In between the text you can place the following --->
    <br>

    |__ Links    
    ```      
       <a href="# hyperLink " class="hyperlink txt-green" > Link </a>
    ```
    <br>

    |__ Bold Text
    ```
    <strong> Bold Text </strong>
    ```
    <br>

    |__ Emphasised Text
    ```
        <span class="emphasise"> Emphasised Text </span>
    ```
    <br>

    |__ Images 
    ```
        <div class="support-image">
           <img src="# imageLink" class="border z-depth-1">
        <div>
    ```
    <br>        
    
    |__ Code
    ```
        <pre class="codebox bg-dk-purple"> Code </pre>
    ```
    <br>

    |__ Quote
    ```
        <div class="quoted-text">
            <p>
               Quoted Text 
            </p>
        </div>
    ```
    <br>

    |__ Embedding ( YT video / Codepen )
    ```
        <div class="codepen">
            Code inclding iframe                    
        </div>
    ```

---
---




