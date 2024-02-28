document.addEventListener("DOMContentLoaded", () => {
  const preferencesForm = document.querySelector("form");
  const fontSizeInput = document.getElementById("fontsize");
  const fontColorInput = document.getElementById("fontcolor");

  // Function to set cookies
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  };

  // Function to get cookies
  const getCookie = (name) => {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  };

  // Function to apply preferences
  const applyPreferences = () => {
    const fontSize = getCookie("fontSize");
    const fontColor = getCookie("fontColor");
    if (fontSize) {
      document.body.style.fontSize = fontSize + "px";
      fontSizeInput.value = fontSize;
    }
    if (fontColor) {
      document.body.style.color = fontColor;
      fontColorInput.value = fontColor;
    }
  };

  // Apply preferences when the page loads
  applyPreferences();

  // Handle form submission
  preferencesForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    // Get user preferences
    const fontSize = fontSizeInput.value;
    const fontColor = fontColorInput.value;

    // Save preferences as cookies
    setCookie("fontSize", fontSize, 30);
    setCookie("fontColor", fontColor, 30);

    // Apply preferences
    applyPreferences();
  });
});
