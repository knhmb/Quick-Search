export function initApple() {
  return new Promise(() => {
    // wait for apple sdk to initialize before starting the vue app
    window.AppleID.auth.init({
      clientId: "com.marvelconnect.oauth2",
      scope: "openid name email",
      redirectURI: `${window.location.protocol}//${window.location.hostname}/api/authenticate/oauth2/apple`,
      state: `${new Date().getTime()}`,
      nonce: "[NONCE]",
      usePopup: true,
    });
  });
}
