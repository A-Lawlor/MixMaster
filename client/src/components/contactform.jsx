import React from 'react';

export const ContactForm = () => {
  return (
    <div>
        <form action="mailto:mixmaster.gui2@gmail.com" method="get" enctype="text/plain">
            Subject:<br/>
            <input type="text" name="subject" placeholder="Your Name"/><br/>
            Email:<br/>
            <input type="email" name="email" placeholder="Your Email"/><br/><br/>
            <input type="submit" value="Compose"/>
          </form>
    </div>
  );
};