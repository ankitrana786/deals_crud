import React from 'react';

const getStorageData = (keyName, defaultValue={}) =>{
	// console.log(keyName);
  const savedItem = localStorage.getItem(keyName);
	const parsedItem = savedItem != undefined && JSON.parse(savedItem);
	return parsedItem || defaultValue;
}
 
const useLocalStorage = (keyName, initialValue) => {
  const [value, setValue] = React.useState(() => {
    return getStorageData(keyName, initialValue);
  });
   	// console.log(value);
	React.useEffect(() => {
	    localStorage.setItem(keyName, JSON.stringify(value));
	  }, [keyName, value]);
 
	return [value, setValue];
}
export default useLocalStorage;