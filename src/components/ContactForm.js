import React, { useState } from "react";
import emailjs from 'emailjs-com';
import { Button} from 'react-bootstrap'



const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
    console.log(e.target)
    emailjs.sendForm('service_a1g5fwm', 'template_i7pkr1x', e.target, 'o6ghJ_eG_g5Uvd8s6')
      .then((result) => {
        //   window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
      }, (error) => {
          console.log(error.text);
      });
    setTimeout(() => {
      setSubmitted(true);
    }, 100);
  };

  if (submitted) {
    return (
      <>
        <div className="text-2xl">Thank you!</div>
        <div className="text-md">We'll be in touch soon.</div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}
    >
      <div className="mb-3 pt-0">
        <input
          type="text"
          placeholder="Your name"
          name="from_name"
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          style={{width: '400px'}}
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          style={{width: '400px'}}
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <textarea
          placeholder="Your message"
          name="message"
          className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          style={{width: '400px', height: '300px'}}
          required
        />
      </div>
      <div className="mb-3 pt-0">
        <Button
            className="rounded-pill"
          type="submit"
        >
          Send a message
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;