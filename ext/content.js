chrome.runtime.onMessage.addListener((input, sender, reply) => {
  const { key, value, action } = input;
  let response;

  switch (action) {
    default:
      response = null;
  }

  reply(response);
});
