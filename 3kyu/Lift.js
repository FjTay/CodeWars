var queues = [ [], [], [ 4, 4, 4, 4 ], [], [ 2, 2, 2, 2 ], [], [] ]


    
const runLift = (queues, capacity, lift, res, i, isUp, next, x) => {
	x ??= 0
  if (!lift.length && !queues.some(queue => queue.length)) {
  	res = res[0] !== 0 ? [0, ...res] : res
    res = res.at(-1) !== 0 ? [...res, 0] : res
    console.log(res)
    return res
  }
  
  if (lift.indexOf(i) > -1) {
  	const newLift = lift.filter(person => person !== i)
    res = newLift.length !== lift.length ? [...res, i] : res
  	lift = newLift
  }
  
  if (queues[i].length) {
  	const newPersons = [...queues[i].filter(person => isUp ? person > i : person < i)]
    res = newPersons.length && res.at(-1) !== i ? [...res, i] : res
    const waitingPersons = [...queues[i].filter(person => isUp ? person < i : person > i)]
    const gettingIn = newPersons.splice(0, capacity - lift.length)
    lift.push(...gettingIn)
    queues[i] = [...newPersons, ...waitingPersons]
  }
  
  next = isUp ?  Math.max(next, ...lift, ...queues[i]) : Math.min(next, ...lift, ...queues[i])
  
  if(next === i) {
  	const gettingIn = queues[i].splice(0, capacity - lift.length)
    res = gettingIn.length && res.at(-1) !== i ? [...res, i] : res
    lift.push(...gettingIn)
    isUp = !isUp
  }
  
  const rangeLimit = queues[isUp ? "findLastIndex" : "findIndex"](floor => floor.length)

  runLift(
  	queues, 
    capacity, 
    lift, 
    res, 
    isUp ? i + 1 : i - 1, 
    isUp, 
    isUp ? Math.max(rangeLimit, ...lift) : Math.min(rangeLimit, ...lift),
    x + 1
  )
  	
}

runLift(queues, 2, [], [], 0, true)