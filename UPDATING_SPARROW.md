## Updating Sparrow Instructions ##

If you are impressed with the capabilities  of this SPARROW Application, and would like to update a sparrow application in order to use your own data; the following steps will help you create your own sparrow application. 
 
## Instructions ## 
<ol> 
<li> Start by creating a Repo for your sparrow project on github.com. You can learn how to create a repo by  going to the following website: <a href ="http://kbroman.org/github_tutorial/pages/init.html">Repo Tutorial </a></li>
<lI> Clone  this sparrow project onto your machine. </li>
<lI> Run NPM Install, and Bower Install. In your command prompt. </li> 
<li> Using an IDE or a Text Editor open the Sparrow-Config file and make changes to the following sections: 
  
   _Note: The clone comes with a json-lock file, this file needs to be deleted in order to ensure no security issues_ 
   
  _Note: Each of the source group objects must match the number of source definitions._ 
  *Note: one of the attribute within thst match the ID in the core file*

	 - var appTitle
	 - var groupResultsLabel
	 - var aggregateDefinitions
	 - var catchmentDefinitions 
	 - var catchmentDefinitions_tn 
	 - var phosphorusSourceDefinitions 
	 - var nitrogenSourceDefinitions 
	 - var Catchments for Phospherous and Nitriogin  
	 - var  Group3, Group 2, and Group 1 
	 - var ST 
	 - var catchments_st
	 - var group 3 (this one is under the states)
	 - var Group3_st
	 - var Group2_st
	 - var Group1_st
   </li>
   
<li>  Open the HTML File.  The following list will showcase what aspects of this file you need to change:
    
    - Title 
    - Subtitle  
    - About Section
    - Data Limitation Section
    - References 
    - Contact Information for both the scientist and the office. </li> 
 
 
 _Note: This step is only required if you changed the ID for the application_
<li> Open the Core File  </li>
    - If in the catchments for the phosphorus and Nitrogen have a different ID Use Search and Replace to change all the ID's that are in captial letters. </li> 
</ol> 







    
    
    
