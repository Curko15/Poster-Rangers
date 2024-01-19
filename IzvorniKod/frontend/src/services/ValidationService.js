import validator from "validator";
import axios from "axios";

export async function verifyReCaptcha(
  captchaValue,
  recaptcha,
  setErrorMessage,
) {
  let passedCaptcha = false;
  try {
    // Verify reCAPTCHA
    const response = await axios.post("/api/korisnici/verifyRecaptcha", {
      recaptchaToken: captchaValue,
    });

    if (response.status === 200) {
      passedCaptcha = true;
    } else if (response.status === 400) {
      passedCaptcha = false;
      recaptcha.current.reset();
      setErrorMessage("ReCAPTCHA nije uspješno potvrđena");
    }
  } catch (error) {
    passedCaptcha = false;
    recaptcha.current.reset();
    // alert("Server error");
    console.error("Error during reCAPTCHA verification:", error);
  }
  return passedCaptcha;
}

export const validatePassword = (value) => {
  return validator.isStrongPassword(value, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
};
