/*
  My Name:              David Kirby
  Blackboard Username:  dakirby
  Date:                 12/3/2020
  Class:                WEB.115.5172
  Assignment:           Lesson 14/15: Final Project, JavaScript
*/

/*
  This JavaScript file consists of a single function, which is used to generate a
  resume webpage "on the fly", implementing the values entered into various input
  fields on finalProject.html. Aside from the "Personal Information" category,
  the different categories the resume can display are optional, to account for
  aspiring professional developers who lack formal education or previous experience.
*/

// here is the script's function
function generateResume() {
  // the email address entered by the user is validated here, and if invalid
  // the function is terminated without generating a resume webpage
  var email = document.getElementById("email").value;
  var emailRegEx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

  if (!(emailRegEx.test(email))) {
    alert("You must enter a valid email address!");
    return;
  }

  // the 'resume' variable is used to generate an on-the-fly webpage
  // via window.open() and document.open()
  var resume = window.open();
  resume.document.open();

  // the first of many document.write() statements references an external stylesheet used
  // to format the resume webpage
  resume.document.write('<html><head><title>Your Resume</title><link rel="stylesheet" type="text/css" href="resume.css"></head><body>');

  // variables from the "Personal Information" category are initialized via
  // their getElementByID() values
  var name = document.getElementById("name").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  var zip = document.getElementById("zip").value;
  var phone = document.getElementById("phone").value;
  var twitter = document.getElementById("twitter").value;
  var linkedin = document.getElementById("linkedin").value;
  var website = document.getElementById("website").value;

  // this section of the resume page includes information listed as "required" on the input
  // webpage, so we assume there are values for all variables and write HTML to our
  // on-the-fly webpage, including a header and a uniquely formatted <div> element
  resume.document.write('<div class="header">' + name + '</div>');
  resume.document.write('<div class="personal">' + city + ', ' + state + ' ' + zip + ' \u2666 ' + phone + ' \u2666 ' + email + '<br>');
  resume.document.write(twitter + ' \u2666 ' + linkedin + ' \u2666 ' + website + '</div>');
  
  // initialize variables for the "Professional Qualities" section
  var qualities1 = document.getElementById("qualities1").value;
  var qualities2 = document.getElementById("qualities2").value;
  var qualities3 = document.getElementById("qualities3").value;

  // nested if statements mean that a user could write from zero to three entries in the textareas,
  // and the on-the-fly webpage will only include a "Professional Qualities" section
  // if their input included one or more entries
  if (qualities1) {
    resume.document.write('<div class="sectiontitle">Professional Qualities<hr></div>');
    resume.document.write('<div class="section"><ul><li>' + qualities1 + '</li>');
    if (qualities2) {
      resume.document.write('<li>' + qualities2 + '</li>');
      if (qualities3) {
        resume.document.write('<li>' + qualities3 + '</li>');
      }
    }
    resume.document.write('</ul></div>');
  }

  // the following three blocks of code reference the arrays created by the checkbox sections of the
  // HTML form with getElementsByName(), then use for-loops to push only the values corresponding
  // to checked boxes onto new array variables referenced in upcoming code
  var webArray = [];
  var webCheckboxesArray = document.getElementsByName("web");
  for (var i = 0; i < webCheckboxesArray.length; i++) {
    if (webCheckboxesArray[i].checked) {
      webArray.push(webCheckboxesArray[i].value);
    }
  }

  var langArray = [];
  var langCheckboxesArray = document.getElementsByName("lang");
  for (var i = 0; i < langCheckboxesArray.length; i++) {
    if (langCheckboxesArray[i].checked) {
      langArray.push(langCheckboxesArray[i].value);
    }
  }

  var adobeArray = [];
  var adobeCheckboxesArray = document.getElementsByName("adobe");
  for (var i = 0; i < adobeCheckboxesArray.length; i++) {
    if (adobeCheckboxesArray[i].checked) {
      adobeArray.push(adobeCheckboxesArray[i].value);
    }
  }
  
  // if the user checked zero "Technical Expertise" boxes, the on-the-fly resume webpage will not
  // include a "Technical Expertise" section
  if (webArray.length > 0 || langArray.length > 0 || adobeArray.length > 0) {
    resume.document.write('<div class="sectiontitle">Technical Expertise<hr></div>');

    // if a "Technical Expertise" section is to be generated, the following code blocks deterine whether
    // the user checked any boxes from the three different categories, only generating section subtitles
    // and lists if the user checked one or more boxes in a category.
    if (webArray.length > 0) {
      resume.document.write('<div class="sectionsubtitle">Web Development:</div>');
      resume.document.write('<ul class="threecolumnlist">');

      // in each "Technical Expertise" category, lists are generated via for-loops like this one, which
      // iterate through the array variables into which values were previously pushed
      for (var i = 0; i < webArray.length; i++) {
        resume.document.write('<li>' + webArray[i] + '</li>');
      }
      resume.document.write('</ul>');
    }

    if (langArray.length > 0) {
      resume.document.write('<div class="sectionsubtitle">Scripting/Compiled Languages:</div>');
      resume.document.write('<ul class="threecolumnlist">');
      for (var i = 0; i < langArray.length; i++) {
        resume.document.write('<li>' + langArray[i] + '</li>');
      }
      resume.document.write('</ul>');
    }

    if (adobeArray.length > 0) {
      resume.document.write('<div class="sectionsubtitle">Adobe Creative Cloud:</div>');
      resume.document.write('<ul class="threecolumnlist">');
      for (var i = 0; i < adobeArray.length; i++) {
        resume.document.write('<li>' + adobeArray[i] + '</li>');
      }
      resume.document.write('</ul>');
    }
  }

  // variables related to the "Educational Background" textbox inputs are initialized here
  var eduName = document.getElementById("eduName").value;
  var eduCity = document.getElementById("eduCity").value;
  var eduState = document.getElementById("eduState").value;
  var eduDegreeLevel = document.getElementById("eduDegreeLevel").value;
  var eduDegreeName = document.getElementById("eduDegreeName").value;
  var eduDegreeYear = document.getElementById("eduDegreeYear").value;

  // this code references the "Degree Status" radio buttons, iterating over the array accessed
  // via getElementsByName to determine which value to use when initializing the
  // eduDegreeStatus variable
  var eduDegreeStatusRadioArray = document.getElementsByName("eduDegreeStatus");
  for (var i = 0; i < eduDegreeStatusRadioArray.length; i++) {
    if (eduDegreeStatusRadioArray[i].checked) {
     var eduDegreeStatus = eduDegreeStatusRadioArray[i].value;
   }
  }

  // since the "Educational Background" category of the HTML form is intended to
  // be optional, a corresponding category is only generated for the on-the-fly webpage
  // if the user entered a value for their most recent institution
  if (eduName) {
    resume.document.write('<div class="sectiontitle">Education<hr></div>');
    resume.document.write('<div class="section">' + eduName + ' - ' + eduCity + ', ' + eduState + '<br>');
    resume.document.write('<b>' + eduDegreeLevel + ', ' + eduDegreeName + ', </b>' + eduDegreeStatus + ' ' + eduDegreeYear + '</div>');
  }

  // many variables are initialized in the following code, corresponding to values entered
  // into the "Professional Experience" category
  var company1name = document.getElementById("company1name").value;
  var company1city = document.getElementById("company1city").value;
  var company1state = document.getElementById("company1state").value;
  var company1title = document.getElementById("company1title").value;
  var company1start = document.getElementById("company1start").value;
  var company1end = document.getElementById("company1end").value;

  var company1details1 = document.getElementById("company1details1").value;
  var company1details2 = document.getElementById("company1details2").value;
  var company1details3 = document.getElementById("company1details3").value;

  var company2name = document.getElementById("company2name").value;
  var company2city = document.getElementById("company2city").value;
  var company2state = document.getElementById("company2state").value;
  var company2title = document.getElementById("company2title").value;
  var company2start = document.getElementById("company2start").value;
  var company2end = document.getElementById("company2end").value;

  var company2details1 = document.getElementById("company2details1").value;
  var company2details2 = document.getElementById("company2details2").value;
  var company2details3 = document.getElementById("company2details3").value;


  var company3name = document.getElementById("company3name").value;
  var company3city = document.getElementById("company3city").value;
  var company3state = document.getElementById("company3state").value;
  var company3title = document.getElementById("company3title").value;
  var company3start = document.getElementById("company3start").value;
  var company3end = document.getElementById("company3end").value;

  var company3details1 = document.getElementById("company3details1").value;
  var company3details2 = document.getElementById("company3details2").value;
  var company3details3 = document.getElementById("company3details3").value;

  // since the "Employment Experience" category of the HTML form is intended to
  // be optional, a corresponding category is only generated for the on-the-fly webpage
  // if the user entered a value for their most recent company
  if (company1name) {
    resume.document.write('<div class="sectiontitle">Employment Experience<hr></div>');
    resume.document.write('<div class="section">' + company1name + ' - ' + company1city + ', ' + company1state + '<br>');
    resume.document.write(company1title + ', ' + company1start + ' to ' + company1end);

    // the user can enter between zero and three textarea values describing their notable
    // achievements for each job, so the following code block (and others like it below)
    // only generate content for the on-the-fly webpage if the user entered values
    if (company1details1) {
      resume.document.write('<ul><li>' + company1details1 + '</li>');
      if (company1details2) {
        resume.document.write('<li>' + company1details2 + '</li>');
        if (company1details3) {
          resume.document.write('<li>' + company1details3 + '</li>');
        }
      }
      resume.document.write('</ul>');
    } else {
      resume.document.write('<br><br>');
    }

    // this nested for-loop only generates content for the on-the-fly webpage if
    // the user entered a value for their second-most recent company
    if (company2name) {
      resume.document.write(company2name + ' - ' + company2city + ', ' + company2state + '<br>');
      resume.document.write(company2title + ', ' + company2start + ' to ' + company2end);

      // and again, notable achievements are optional
      if (company2details1) {
        resume.document.write('<ul><li>' + company2details1 + '</li>');
        if (company2details2) {
          resume.document.write('<li>' + company2details2 + '</li>');
          if (company2details3) {
            resume.document.write('<li>' + company2details3 + '</li>');
          }
        }
        resume.document.write('</ul>');
      } else {
        resume.document.write('<br><br>');
      }
    }

    // this nested for-loop only generates content for the on-the-fly webpage if
    // the user entered a value for their third-most recent company
    if (company3name) {
      resume.document.write(company3name + ' - ' + company3city + ', ' + company3state + '<br>');
      resume.document.write(company3title + ', ' + company3start + ' to ' + company3end);
      
      // and again, notable achievements are optional
      if (company3details1) {
        resume.document.write('<ul><li>' + company3details1 + '</li>');
        if (company3details2) {
          resume.document.write('<li>' + company3details2 + '</li>');
          if (company3details3) {
            resume.document.write('<li>' + company3details3 + '</li>');
          }
        }
        resume.document.write('</ul>');
      } else {
        resume.document.write('<br>');
      }
    }

    resume.document.write('</div>');
  }

  // many variables are iniialized below, corresponding to values entered into
  // the "Business References" category
  var ref1name = document.getElementById("ref1name").value;
  var ref1company = document.getElementById("ref1company").value;
  var ref1title = document.getElementById("ref1title").value;
  var ref1phone = document.getElementById("ref1phone").value;
  var ref1email = document.getElementById("ref1email").value;

  var ref2name = document.getElementById("ref2name").value;
  var ref2company = document.getElementById("ref2company").value;
  var ref2title = document.getElementById("ref2title").value;
  var ref2phone = document.getElementById("ref2phone").value;
  var ref2email = document.getElementById("ref2email").value;

  var ref3name = document.getElementById("ref3name").value;
  var ref3company = document.getElementById("ref3company").value;
  var ref3title = document.getElementById("ref3title").value;
  var ref3phone = document.getElementById("ref3phone").value;
  var ref3email = document.getElementById("ref3email").value;

  // similar to other categories, content is only generated for the on-the-fly resume
  // webpage if the user entered a value for the name of at least one business reference,
  // and content for more references is only generated if the user entered values
  // for the names of more business references
  if (ref1name) {
    resume.document.write('<div class="sectiontitle">Business References<hr></div>');
    resume.document.write('<div class="section"><ul><li>' + ref1name + ' - ' + ref1company + ' - ' + ref1title + ' - ' + ref1phone + ' - ' + ref1email + '</li>');
    
    if(ref2name) {
      resume.document.write('<li>' + ref2name + ' - ' + ref2company + ' - ' + ref2title + ' - ' + ref2phone + ' - ' + ref2email + '</li>');
    }

    if(ref3name) {
      resume.document.write('<li>' + ref3name + ' - ' + ref3company + ' - ' + ref3title + ' - ' + ref3phone + ' - ' + ref3email + '</li>');
    }

    resume.document.write('</ul></div>');
  }

  resume.document.write('</body></html>');
  resume.document.close();

}