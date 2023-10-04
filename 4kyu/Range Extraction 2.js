const x = ['-74,-72,-71,-69,-66,-63--61,-59,-57,-55,-54,-52,-50,-48,-47']

  const sortedList = x.reduce((acc, val, i, arr) => {
  if (arr.length === 1) {return arr.join("")}
		if (acc.at(-1)?.at(-1) + 1 === val) {
      acc = [...acc.slice(0, acc.length - 1), 
      	i < arr.length - 1 ? [...acc.at(-1), val] : acc.at(-1)[0] + "-" + val]
    } else {           
      if(acc.at(-1)?.length >= 3) {
        acc[acc.length - 1] = acc.at(-1)[0] + "-" + acc.at(-1).at(-1)
      }          
      acc = [...acc, [val]]
    }
    return acc
  }, [])