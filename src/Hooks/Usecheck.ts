import axios from "axios";
import { useState, useEffect } from "react";
import { string } from "zod";
type statechecktype = "idle" | "valid" | "notvalid" | "error" | "pending";
const Usecheck = () => {
  const [enteredEmail, Setmailtext] = useState<null | string>(null);
  const [statecheck, setstatecheck] = useState<statechecktype>("idle");

  const checkemailfun = async (emailtext: string) => {
    Setmailtext(emailtext);
    if (emailtext) {
      setstatecheck("pending");
    }
    try {
      const response = await axios.get(
        `https://434149a3-f13e-4094-923a-5a54f984bfad-00-1tm6wjlio5rjy.janeway.replit.dev/users?email=${emailtext}`
      );
      const user = response.data;

      if (user.length > 0) {
        setstatecheck("notvalid");
      } else {
        setstatecheck("valid");
      }
    } catch {
      setstatecheck("error");
    }
  }; // ✅ Log state change when it updates
  console.log(statecheck);
  return { statecheck, checkemailfun, enteredEmail };
};

export default Usecheck;
