var Common = {
  Fetch: async function (httpMethod, url, data, successCallBack, perpetualCallBack = null) {
    if (typeof ($body) != 'undefined') {
      //$body.addClass("loading")
    }

    const fetchedData = await fetch(url, {
      method: httpMethod,
      mode: 'cors',
      body: data,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(result => result.json())
      .then(data => successCallBack(data, perpetualCallBack))
      .catch(error => handleError(error));
      //.finally(() => $body.removeClass("loading"));
    return fetchedData;
  }
}

function handleError(error) {
  if (error.toString().includes('Unexpected token')) {
    alert('Session Expired! Redirecting to login page \n Error: Unexpected Token');
    window.location.href = "/Home/Index/2";
  }
  else if (error.toString().includes('Access to XMLHttpRequest')) {
    alert('Session Expired! Redirecting to login page \n Error: Access to XMLHttpRequest Blocked');
    window.location.href = "/Home/Index/2";
  }
  else if (error.toString().includes('has been blocked by CORS policy')) {
    alert('Session Expired! Redirecting to login page \n Error: Access to XMLHttpRequest Blocked');
    window.location.href = "/Home/Index/2";
  }
  else if (error.toString().includes('Failed to fetch')) {
    alert('Session Expired! Redirecting to login page \n Error: Fetch Error');
    window.location.href = "/Home/Index/2";
  }
  else
    console.log(error);
}
