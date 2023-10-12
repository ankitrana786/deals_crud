import React from 'react';

const getSessionData = (keyName, defaultValue) =>{
	const savedItem = sessionStorage.getItem(keyName);
	console.log(savedItem);
	// const parsedItem = JSON.parse(savedItem);
	return savedItem || defaultValue;
}
 
const useSessionStorage = (keyName, initialValue) => {
  const [value, setValue] = React.useState(() => {
    return getSessionData(keyName, initialValue);
  });
   	console.log(value);
	React.useEffect(() => {
	    sessionStorage.setItem(keyName, value);
	  }, [keyName, value]);
 
	return [value, setValue];
}
export default useSessionStorage;