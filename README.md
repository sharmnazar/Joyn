# Joy/n
Joy/n (pronounced \ ˈjȯin  \)is a responsive web application that uses the user’s geolocation and specified interests to recommend suitable locations nearby.

The solo project used Google Places API to provide recommendations, and Google Maps API to display these locations on a map. 

Other technologies used within the project are React, Socket.io, Node, React Router, and Axios.

## Beginings
The project was done as a capstone project as a BrainStation student in the full-time Web Development Program, and took a period of a week and a half to complete.

Initially, the project was inspired by a typical occurrence in the dating scene, the inability to figure out where to go on a date. Thus, Joy/n was born to help smooth that process. 

## How it works
Joy/n takes in the user's geolocation, and then the user selects a certain interest from a list provided and a radius. After the information is taken, HTTP requests will be created with the user's specified information to Google Places API. The information will come in a list of reccomendations based on the user's input. The list can be viewed and interacted with using a map object, from the Google Maps API. 

Afterwards, if a location is selected, the user can then find out if the location would be available at a certain time or not. If so, the user would be able to add the event to their calendar. 

## Future Work
As it currently is, the project is incomplete. In the future, I would go beyond the chat function that was implemented using sockets. I would create user profiles and a proper log-in, which would allow users who are near each other to communicate and find locations close to both users that suit their interests. Additionally, I would try to implement a way to add the events to the user's calendar, such as Google Calendar. 
