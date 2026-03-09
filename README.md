# Student Gradebook Project

My intention with this project was to demonstrate that I can use the Fetch API of Javascript and that I can display data received from a back-end to the front-end. This project was not created by following a tutorial, nor was it a group project.



## Demo
Open the JSON Server link as well in another tab for HTTP requests to work!

My Project: https://student-gradebook-project.vercel.app/

JSON Server: https://grades-server-2.onrender.com/

Instructions: Click on any of the top left buttons to edit student data.

- Plus: Adds a new student to JSON data (intentionally limited to only 1 new entry)
- Pencil: Click on any course or grade to update that data for the student (hit the 'Enter' key to submit that change & hit the 'Escape' key to exit the change field)
- Trash Can: (1) Click on any row in the table to select a course for deletion. (2) Click again on the selected row to confirm deletion. (3) Third click on the same row will delete the course from the table.

## Features

- Ability to switch the student currently being viewed
- Edit the grades of a student with edit buttons
- Add a new student to the gradebook


## Tech Used

- React 19 
- npm JSON-Server
- Visual Studio Code
- Chrome Developer tools
- HTML
- CSS
- JavaScript
- Vercel
- Render


## Development Insights

What challenges did you face, and how did you overcome them?

One challenge I encountered during development was figuring out how to sync changes that occurred in the grades JSON data with the student data state in the application. Originally, on application launch, I fetched the array of students, made a state that only contained the student I needed to view, and passed that down to child components. However, one of the problems of not having the whole array of students available is that I couldn't introduce the 'StudentDropdown' component because I never knew the actual length of the array. After what felt like were too many limitations of functionality I wanted because of bad software architecture, I created a new state with the actual array received from the fetch call that really helped simplify the code.

Another challenge I encountered was when I was trying to deploy my project. During development, I had been using the 'json-server' package on npm to make fetch calls, however when I deployed my project, I could no longer use the local JSON server. To overcome this, I simply did research online as to how to deploy a JSON server, which eventually led to a YouTube video with the exact solution I needed to be able to have a live demo of this project.



Can you describe your development process from its initial stages to final deployment?

The first phase of development was creating and styling primary components of the application. Next, I installed the 'json-server' package, created a JSON file with student grade data, and after fetching that data, displayed it the previously made components. After that, the bulk of the development went towards achieving my desired functionality of the grade table based on the editing mode selected. Finally, there was the deployment of the project in which I had to use Render to create a JSON server that would let me make fetch calls to a backend.


## Planned Improvements
TBD
