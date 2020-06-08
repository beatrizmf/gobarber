## User registration

- [x] The user must be able to register in the application informing, name, email and password.

## Enter the application

- [x] The user must be able to enter the application with the correct email and password.

## Password recovery

**Functional Requirements**

- [x] The user must be able to recover his password informing his email;
- [x] The user should receive an email with password recovery instructions;
- [x] The user must be able to reset his password.

**Non-functional requirements**

- [x] Use Ethereal to test in a dev environment;
- [ ] Use Amazon SES for production shipments;
- [ ] E-mails should be sent in the background (background job).

**Business rules**

- [x] The link sent by email to reset password, must expire in 2h;
- [ ] The user needs to confirm the new password when resetting his password.

## Profile update

**Functional Requirements**

- [ ] The user must be able to update his name, email and password.

**Non-functional requirements**

**Business rules**

- [ ] The user cannot change his email to an email already used;
- [ ] To update your password, the user must inform the old password;
- [ ] To update your password, the user needs to confirm the new password.

## Provider panel

**Functional Requirements**

- [ ] The user must be able to list their schedules for a specific day;
- [ ] The provider must receive a notification whenever there is a new appointment;
- [ ] The provider must be able to view unread notifications.

**Non-functional requirements**

- [ ] The provider's schedules for the day must be cached;
- [ ] The provider's notifications must be stored in MongoDB;
- [ ] Service provider notifications must be sent in real time using Socket.io.

**Business rules**

- [ ] The notification must have a read or unread status for the provider to control.

## Service scheduling

**Functional Requirements**

- [ ] The user must be able to list all registered service providers;
- [ ] The user must be able to list the days of a month with at least one available time from a provider;
- [ ] The user must be able to list available times on a specific day for a provider;
- [ ] The user must be able to make a new appointment with a provider.

**Non-functional requirements**

- [ ] The list of providers must be cached.

**Business rules**

- [ ] Each appointment must last exactly 1 hour;
- [ ] Appointments must be available between 8 am and 6 pm (First at 8 am, last at 5 pm);
- [ ] The user cannot schedule an already busy time;
- [ ] The user cannot schedule an appointment that has already passed;
- [ ] The user cannot schedule services with himself.
