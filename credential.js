function getCredentials() {
  const axios = require('axios');
  const qs = require('qs');
  const CLIENT_ID = '270cm85huq2senivl04vbkesuf';
  const CLIENT_SECRET = 'oqgii50cvpn0h87m9tatkce5pc3omlccbsld3ssi4nl1apis6q7';
  const encodedSecret = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  const data = qs.stringify({
    'client_id': `${CLIENT_ID}`,
    'grant_type': 'client_credentials',
  });
  const config = {
    method: 'post',
    url: 'https://auth.sypht.com/oauth2/token',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${encodedSecret}`,
    },
    data: data,
  };

  return axios(config)
};

module.exports = { getCredentials };
