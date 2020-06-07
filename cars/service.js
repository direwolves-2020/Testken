export default function fetchCall  (search) {
    return fetch (`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${search}/modelyear/2019?format=json`)
    .then(
        (response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    );

  };