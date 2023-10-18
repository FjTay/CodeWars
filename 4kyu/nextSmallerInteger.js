function nextSmaller(n) {
  n = n.toString().split('').map(n => parseInt(n, 10)).reverse()
  const first = n.findIndex((nb, i, arr) => nb < arr[i + 1]) + 1
  if(!first) {
  	return - 1
  }
	const second = n.findIndex(nb1 => nb1 === Math.max(...n.slice(0, first).filter(nb2 => nb2 < n[first])));
	
  [n[first], n[second]] = [n[second], n[first]]
  const sorting = n.splice(0, first).sort((a, b) => a - b)
  const arrOutput = [...sorting, ...n]
  if(![...arrOutput].reverse()[0]) {
  	return - 1
  }
  const res = Number(arrOutput.reverse().join(''))
 	return res
}
