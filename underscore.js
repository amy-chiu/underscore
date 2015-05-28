var _ = {
	each: function(arg, callback) {
		if(Array.isArray(arg)) {
			for(var i = 0; i < arg.length; i++) {
				callback(arg[i], i, arg);
			}
		} else if(typeof arg === "object") {
			for(var key in arg) {
				callback(arg[key], key, arg);
			}
		}  
	},
	map: function(arg, callback) {
		var newArr = [];
		if(Array.isArray(arg)) {
			for(var i = 0; i < arg.length; i++) {
				var elem = callback(arg[i], i, arg);
				newArr.push(elem);
			}
		} else if(typeof arg === "object") {
			for(var key in arg) {
				var elem = callback(arg[key], key, arg);
				newArr.push(elem);
			}
		}
		return newArr;
	}, 
	reduce: function(arr, callback, initialVal) {
		var storedVal = initialVal;
		var start = 0;

		if(initialVal === undefined) {
			storedVal = arr[0];
			start = 1;
		}

		for(var i = start; i < arr.length; i++) {
			storedVal = callback(arr[i], storedVal) 
		}

		return storedVal;
	},
	reduceWithEach: function(arr, callback, initialVal) {
		var storedVal = initialVal;

		if(initialVal === undefined) {
			storedVal = arr[0];
			arr = arr.slice(1);
		}

		this.each(arr, function(val) {
			storedVal = callback(val, storedVal);
		});

		return storedVal;
	},
	reduceWithMap: function(arr, callback, initialVal) {	
		var storedVal = initialVal;

		if(initialVal === undefined) {
			storedVal = arr[0];
			arr = arr.slice(1);
		}

		this.map(arr, function(val) {
			storedVal = callback(val, storedVal);
		});
		
		return storedVal;
	}, 
	reduceWithMap2: function(arr, callback, initialVal) {
		var storedVal = initialVal;

		if(initialVal === undefined) {
			storedVal = arr[0];
			arr = arr.slice(1);
		}
			
		var mapArr = this.map(arr, function(val) {
			storedVal = callback(val, storedVal);
			return storedVal;
		});
		
		return mapArr[mapArr.length - 1];
	},
	pairs: function(obj) {
		var ret_arr = [];

		for(var key in obj) {
			var elem = [key, obj[key]];
			ret_arr.push(elem);
		}

		return ret_arr;
	},
	pairsWithEach: function(obj) {
		var ret_arr = [];

		this.each(obj, function(val, key) {
			var elem = [val, key];
			ret_arr.push(elem);
		});

		return ret_arr;
	},
	pairsWithMap: function(obj) {
		var map_arr = this.map(obj, function(val, key) {
			var elem = [key, val];
			console.log(elem);
			return elem;
		});

		console.log(map_arr);
		return map_arr;
	},
	mapObject: function(obj, callback) {
		var ret_obj = {};

		for(var key in obj) {
			var new_val = callback(obj[key], key, obj);
			ret_obj[key] = new_val;
		}

		return ret_obj;
	},
	find: function(arr, callbackBool) {
		for(var i = 0; i < arr.length; i++) {
			if(callbackBool(arr[i])) {
				return arr[i];
			}
		}
		return "undefined";
	}, 
	findWithEach: function(arr, callbackBool) {
		var answer = "";

		this.each(arr, function(val) {
			var bool = callbackBool(val);
			if(bool === true && answer === ""){
				answer = value;
			} 
		});

		return answer;
	}, 
	findWithEach2: function(arr, callbackBool) {
		var boolTrue = [];

		this.each(arr, function(val) {
			if(callbackBool(val) === true)
			boolTrue.push(val);
		});

		return boolTrue[0];
	},
	filter: function(arr, callback) {
		var new_arr = [];

		for(var i = 0; i < arr.length; i++) {
			if(callback(arr[i], i , arr)) {
				new_arr.push(arr[i]);
			}
		}

		return new_arr;
	},
	filterWithEach: function(arr, callback) {
		var new_arr = [];

		this.each(arr, function(val) {
			if(callback(val)) {
				new_arr.push(val);
			}
		});

		return new_arr;
	},
	where: function(arg, filterObj) {
		var ret_arr = [];
		var filterKeys = Object.keys(filterObj);

		for(var j = 0; j < arg.length; j++) {
			for(var i = 0; i < filterKeys.length; i++) {
				console.log(arg[j][filterKeys[i]]);
				if(filterObj[filterKeys[i]] === arg[j][filterKeys[i]]) {
					ret_arr.push(arg[j]);
				}
			}
		}

		return ret_arr;
	},
	reject: function(arr, callback) {
		var new_arr = [];

		for(var i = 0; i < arr.length; i++) {
			if(!callback(arr[i])) {
				new_arr.push(arr[i]);
			}
		}

		return new_arr;
	},
	times: function(num, callback) {
		var i = 0;
		for(i = 0; i < num; i++) {
			callback();
		}
	},
	every: function(arr, callback) {
		for(var i = 0; i < arr.length; i++) {
			if(!callback(arr[i])) {
				return false;
			}
		}
		return true;
	},
	some: function(arr, callback) {
		for(var i = 0; i < arr.length; i++) {
			if(callback(arr[i]) === true) {
				return true;
			}
		}
		return false;
	},
	someWithEach: function(arr, callback) {
		var bool = false;

		this.each(arr, function(val) {
			if(callback(val) === true) {
				bool = true;
			}
		})

		return bool;
	},
	contains: function(arg, val) {
		if(Array.isArray(arg)) {
			for(var i = 0; i < arg.length; i++) {
				if(arg[i] === val) {
					return true;
				}
			}
			return false;
		}

		if(typeof arg === "object") {
			for (var key in arg) {
				if(key === val) {
					return true;
				}
			}
			return false;
		}
	},
	containsWithIndexOf: function(arr, value) {
		if(arr.indexOf(value) >= 0) {
			return true;
		} else {
			return false;
		}
	},
	pluck: function(arr, key) {
		var new_arr = [];
		for(var i = 0; i < arg.length; i++) {
			new_arr.push(arg[i][key]);
		}
		return new_arr;
	},
	min: function(arr) {
		var lowest_val = Number.MAX_VALUE;
		for(var i = 0; i < arr.length; i++) {
			if (arr[i] < lowest_val) {
				lowest_val = arr[i];
			}	
		}
		return lowest_val;
	},
	without: function(arr, numbers) {
		var new_arr = [];
		for(var i = 0; i < arr.length; i++) {
			for (var j = 0; j < numbers.length; j++)
				if(numbers[j] !== arr[i] && !this.contains(new_arr, arr[i]) && !this.contains(numbers, arr[i])) {
					new_arr.push(arr[i]);
				}
		}
		return new_arr;
	},
	without2: function(arr) {
		var numbers = arguments.slice(1);
		var new_arr = [];
		for (var i =0; i<arr.length;i++) {
			if (!this.contains(numbers, arr[i])) {
				new_arr.push(arr[i]);
			}
		}
		return new_arr;
	},
	withoutWithMap: function(arr, num) {
		return this.map(arr, function(val) {
			if(num !== val) {
				return val;
			}
		})
	},
	uniq: function(arr) {
		var new_arr = [];
		for(var i = 0; i < arr.length; i++) {
			if(!this.contains(new_arr, arr[i])) {
				new_arr.push(arr[i]);
			}
		}
		return new_arr;
	},
	range: function(num) {
		var newArr = [];
		for(var i = 0; i < num; i++) {
			newArr.push(i);
		}
		return newArr;
	}
};




