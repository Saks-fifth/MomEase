**Table of Contents**

1. **Overview**
   1. Description
   1. App Evaluation
1. **Product Specification**
   1. User Stories
      1. Required Must-have Stories
      1. Optional Nice-to-have Stories
   1. Screens
   1. Navigation
      1. Tab Navigation
      1. Flow Navigation
-----
**Overview**

**Description**

MomEase is a productivity app designed for busy single moms with disposable income. It simplifies their lives by providing an all-in-one platform to manage schedules, tasks, family activities, and access premium services like on-demand childcare, housekeeping, and personal shopping. With a user-friendly interface and personalized features, MomEase helps moms stay organized and find more time for themselves.

**App Evaluation**

- **Category**: Productivity / Lifestyle
- **Story**: Empowers single moms to efficiently manage their busy lives by organizing tasks, scheduling family activities, and accessing premium services tailored to their needs.
- **Market**: Busy single moms with disposable income looking for convenience and time-saving solutions to balance work, family, and personal life.
- **Habit**: Intended for daily use to manage schedules, set reminders, and book services.
- **Scope**: Starts with core features like task management and scheduling, with potential to expand into community networking and personalized recommendations.
-----
**Product Specification**

**User Stories**

**Required Must-have Stories**

- **User Authentication**
  - As a user, I want to create an account or log in so that my data is securely stored and accessible.
- **Task Management**
  - As a user, I want to add, edit, and delete tasks so that I can manage my to-do list.
- **Scheduling**
  - As a user, I want to view my schedule in daily, weekly, and monthly views so that I can plan ahead.
- **Reminders and Notifications**
  - As a user, I want to receive reminders for upcoming tasks and appointments so that I don't miss anything important.
- **Family Calendar Sync**
  - As a user, I want to sync my calendar with my children's schedules so that all activities are in one place.
- **Service Booking**
  - As a user, I want to browse and book local services like babysitters and cleaners so that I can get help when needed.
- **Profile Management**
  - As a user, I want to manage my profile and preferences for a personalized experience.
- **Settings**
  - As a user, I want to adjust app settings, such as notification preferences and privacy options.

**Optional Nice-to-have Stories**

- **Recurring Tasks**
  - Set tasks that repeat automatically.
- **Shopping Lists**
  - Create and manage shopping lists for grocery trips.
- **Meal Planning**
  - Plan meals for the week to simplify cooking and shopping.
- **Expense Tracking**
  - Track expenses to manage my budget.
- **Community Networking**
  - Connect with other single moms for support and recommendations.
- **Personalized Suggestions**
  - Receive recommendations based on my preferences.
- **Smart Home Integration**
  - Integrate with smart home devices for seamless control.
- **In-app Messaging**
  - Communicate directly with service providers within the app.
-----
**Screens**

1. **Login Screen**
   1. Users log in or register for a new account.
1. **Home Screen**
   1. Overview of today's schedule, tasks, and quick access to main features.
1. **Calendar Screen**
   1. View tasks and appointments in daily, weekly, or monthly formats.
1. **Task Management Screen**
   1. Add, edit, and delete tasks; categorize and prioritize them.
1. **Service Booking Screen**
   1. Browse and book local services like childcare and cleaning.
1. **Profile Screen**
   1. User information, preferences, and family member profiles.
1. **Settings Screen**
   1. Adjust notifications, privacy settings, linked accounts, and other preferences.
1. **Optional Screens**
   1. **Shopping List Screen**
      1. Create and manage shopping lists.
   1. **Meal Planning Screen**
      1. Plan meals and recipes for the week.
   1. **Expense Tracking Screen**
      1. Input and monitor expenses.
   1. **Community Screen**
      1. Connect with other users, join groups, and share tips.
   1. **In-app Messaging Screen**
      1. Communicate with service providers and other moms.
-----
**Navigation**

**Tab Navigation**

- **Home**
  - Access the Home Screen.
- **Calendar**
  - Open the Calendar Screen.
- **Tasks**
  - Go to the Task Management Screen.
- **Services**
  - Access the Service Booking Screen.
- **Profile**
  - Go to the Profile Screen.
- **Optional Tabs**
  - **Community**
    - Access the Community Screen.
  - **More**
    - Dropdown for additional features like Settings, Shopping List, Meal Planning.

**Flow Navigation**

- **Login Screen**
  - On successful login, navigate to Home Screen.
  - Option to reset password or register a new account.
- **Home Screen**
  - Quick links to Calendar, Tasks, Services, and Profile.
  - Notifications redirect to relevant screens.
- **Calendar Screen**
  - Selecting a date shows tasks and appointments for that day.
  - Option to add new events.
- **Task Management Screen**
  - Add or edit tasks.
  - Navigate back to Home or Calendar.
- **Service Booking Screen**
  - Select and book services.
  - Booking adds events to Calendar and Tasks.
- **Profile Screen**
  - Edit profile information.
  - Access linked family profiles.
- **Settings Screen**
  - Adjust settings and preferences.
- **Optional Flows**
  - **Shopping List Screen**
    - Add, edit, or delete items.
    - Option to share lists with others.
  - **Meal Planning Screen**
    - Select meals and recipes for each day.
    - Integration with Shopping List to add ingredients.
  - **Expense Tracking Screen**
    - Input expenses and view summaries.
  - **Community Screen**
    - View posts, send messages, join groups.
  - **In-app Messaging Screen**
    - Chat interface with service providers or community members.
   
    - Schema
Models
User

Property	Type	Description
objectId	String	Unique id for the user (default field)
username	String	User's unique username
email	String	User's email address
password	String	Hashed password for authentication
profileImage	File	User's profile image
familyProfiles	Array of Objects	Profiles of family members (children)
preferences	Object	User preferences such as services, reminders
linkedAccounts	Array of Strings	Accounts linked to other services (e.g., calendar)
Task

Property	Type	Description
objectId	String	Unique id for the task (default field)
title	String	Title of the task
description	String	Detailed description of the task
dueDate	DateTime	Due date for the task
isCompleted	Boolean	Whether the task is marked as completed
priority	String	Priority of the task (low, medium, high)
ServiceBooking

Property	Type	Description
objectId	String	Unique id for the booking (default field)
serviceType	String	Type of service booked (e.g., cleaning, childcare)
serviceProvider	String	Name of the service provider
date	DateTime	Date and time for the booking
status	String	Status of the booking (confirmed, pending)
ShoppingList

Property	Type	Description
objectId	String	Unique id for the shopping list
items	Array of Strings	List of items added to the shopping list
isShared	Boolean	Whether the list is shared with others
Networking
List of Network Requests by Screen
Login Screen

(POST) Create a new user account
(POST) Authenticate user with email and password
vbnet
Copy code
// POST Request to authenticate user
let query = PFQuery(className: "_User")
query.whereKey("email", equalTo: userEmail)
query.whereKey("password", equalTo: hashedPassword)
query.findObjectsInBackground { (user: [PFObject]?, error: Error?) in
    if let error = error {
        print(error.localizedDescription)
    } else if let user = user {
        print("Successfully authenticated")
    }
}
Task Management Screen

(GET) Fetch user's tasks
(POST) Create a new task
(PUT) Update task details
(DELETE) Delete a task
vbnet
Copy code
// GET Request to retrieve tasks
let query = PFQuery(className: "Task")
query.whereKey("user", equalTo: currentUser)
query.findObjectsInBackground { (tasks: [PFObject]?, error: Error?) in
    if let error = error {
        print(error.localizedDescription)
    } else if let tasks = tasks {
        print("Successfully retrieved tasks")
    }
}
Service Booking Screen

(GET) Fetch available services
(POST) Book a service
(PUT) Update service booking status
(DELETE) Cancel a service booking
scss
Copy code
// POST Request to book a service
let newBooking = PFObject(className: "ServiceBooking")
newBooking["serviceType"] = selectedServiceType
newBooking["serviceProvider"] = providerName
newBooking["date"] = selectedDate
newBooking["status"] = "Pending"
newBooking.saveInBackground { (success, error) in
    if success {
        print("Service successfully booked")
    } else if let error = error {
        print(error.localizedDescription)
    }
}
Profile Screen

(GET) Fetch user profile data
(PUT) Update user profile (including family profiles and preferences)
