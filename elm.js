
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Result //

var _elm_lang$core$Native_Date = function() {

function fromString(str)
{
	var date = new Date(str);
	return isNaN(date.getTime())
		? _elm_lang$core$Result$Err('Unable to parse \'' + str + '\' as a date. Dates must be in the ISO 8601 format.')
		: _elm_lang$core$Result$Ok(date);
}

var dayTable = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthTable =
	['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


return {
	fromString: fromString,
	year: function(d) { return d.getFullYear(); },
	month: function(d) { return { ctor: monthTable[d.getMonth()] }; },
	day: function(d) { return d.getDate(); },
	hour: function(d) { return d.getHours(); },
	minute: function(d) { return d.getMinutes(); },
	second: function(d) { return d.getSeconds(); },
	millisecond: function(d) { return d.getMilliseconds(); },
	toTime: function(d) { return d.getTime(); },
	fromTime: function(t) { return new Date(t); },
	dayOfWeek: function(d) { return { ctor: dayTable[d.getDay()] }; }
};

}();
//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function (router, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Scheduler.spawn(
			A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Platform$sendToApp(router),
				_p1._0));
	});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			_elm_lang$core$Task$onError,
			function (_p2) {
				return _elm_lang$core$Task$fail(
					convert(_p2));
			},
			task);
	});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return _elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map3 = F4(
	function (func, taskA, taskB, taskC) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return _elm_lang$core$Task$succeed(
									A3(func, a, b, c));
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return _elm_lang$core$Task$succeed(
											A4(func, a, b, c, d));
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map5 = F6(
	function (func, taskA, taskB, taskC, taskD, taskE) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Task$andThen,
											function (e) {
												return _elm_lang$core$Task$succeed(
													A5(func, a, b, c, d, e));
											},
											taskE);
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$sequence = function (tasks) {
	var _p3 = tasks;
	if (_p3.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			{ctor: '[]'});
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p3._0,
			_elm_lang$core$Task$sequence(_p3._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			_elm_lang$core$Task$map,
			function (_p4) {
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function (_p7, _p6, _p5) {
		return _elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'});
	});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$Perform = function (a) {
	return {ctor: 'Perform', _0: a};
};
var _elm_lang$core$Task$perform = F2(
	function (toMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(_elm_lang$core$Task$map, toMessage, task)));
	});
var _elm_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(
					_elm_lang$core$Task$onError,
					function (_p8) {
						return _elm_lang$core$Task$succeed(
							resultToMessage(
								_elm_lang$core$Result$Err(_p8)));
					},
					A2(
						_elm_lang$core$Task$andThen,
						function (_p9) {
							return _elm_lang$core$Task$succeed(
								resultToMessage(
									_elm_lang$core$Result$Ok(_p9)));
						},
						task))));
	});
var _elm_lang$core$Task$cmdMap = F2(
	function (tagger, _p10) {
		var _p11 = _p10;
		return _elm_lang$core$Task$Perform(
			A2(_elm_lang$core$Task$map, tagger, _p11._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

//import Native.Scheduler //

var _elm_lang$core$Native_Time = function() {

var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
{
	callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
});

function setInterval_(interval, task)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = setInterval(function() {
			_elm_lang$core$Native_Scheduler.rawSpawn(task);
		}, interval);

		return function() { clearInterval(id); };
	});
}

return {
	now: now,
	setInterval_: F2(setInterval_)
};

}();
var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
var _elm_lang$core$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		var _p0 = intervals;
		if (_p0.ctor === '[]') {
			return _elm_lang$core$Task$succeed(processes);
		} else {
			var _p1 = _p0._0;
			var spawnRest = function (id) {
				return A3(
					_elm_lang$core$Time$spawnHelp,
					router,
					_p0._1,
					A3(_elm_lang$core$Dict$insert, _p1, id, processes));
			};
			var spawnTimer = _elm_lang$core$Native_Scheduler.spawn(
				A2(
					_elm_lang$core$Time$setInterval,
					_p1,
					A2(_elm_lang$core$Platform$sendToSelf, router, _p1)));
			return A2(_elm_lang$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var _elm_lang$core$Time$addMySub = F2(
	function (_p2, state) {
		var _p3 = _p2;
		var _p6 = _p3._1;
		var _p5 = _p3._0;
		var _p4 = A2(_elm_lang$core$Dict$get, _p5, state);
		if (_p4.ctor === 'Nothing') {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{
					ctor: '::',
					_0: _p6,
					_1: {ctor: '[]'}
				},
				state);
		} else {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{ctor: '::', _0: _p6, _1: _p4._0},
				state);
		}
	});
var _elm_lang$core$Time$inMilliseconds = function (t) {
	return t;
};
var _elm_lang$core$Time$millisecond = 1;
var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
var _elm_lang$core$Time$inHours = function (t) {
	return t / _elm_lang$core$Time$hour;
};
var _elm_lang$core$Time$inMinutes = function (t) {
	return t / _elm_lang$core$Time$minute;
};
var _elm_lang$core$Time$inSeconds = function (t) {
	return t / _elm_lang$core$Time$second;
};
var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
var _elm_lang$core$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _p7 = A2(_elm_lang$core$Dict$get, interval, state.taggers);
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var tellTaggers = function (time) {
				return _elm_lang$core$Task$sequence(
					A2(
						_elm_lang$core$List$map,
						function (tagger) {
							return A2(
								_elm_lang$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						_p7._0));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p8) {
					return _elm_lang$core$Task$succeed(state);
				},
				A2(_elm_lang$core$Task$andThen, tellTaggers, _elm_lang$core$Time$now));
		}
	});
var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
var _elm_lang$core$Time$State = F2(
	function (a, b) {
		return {taggers: a, processes: b};
	});
var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
	A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
var _elm_lang$core$Time$onEffects = F3(
	function (router, subs, _p9) {
		var _p10 = _p9;
		var rightStep = F3(
			function (_p12, id, _p11) {
				var _p13 = _p11;
				return {
					ctor: '_Tuple3',
					_0: _p13._0,
					_1: _p13._1,
					_2: A2(
						_elm_lang$core$Task$andThen,
						function (_p14) {
							return _p13._2;
						},
						_elm_lang$core$Native_Scheduler.kill(id))
				};
			});
		var bothStep = F4(
			function (interval, taggers, id, _p15) {
				var _p16 = _p15;
				return {
					ctor: '_Tuple3',
					_0: _p16._0,
					_1: A3(_elm_lang$core$Dict$insert, interval, id, _p16._1),
					_2: _p16._2
				};
			});
		var leftStep = F3(
			function (interval, taggers, _p17) {
				var _p18 = _p17;
				return {
					ctor: '_Tuple3',
					_0: {ctor: '::', _0: interval, _1: _p18._0},
					_1: _p18._1,
					_2: _p18._2
				};
			});
		var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
		var _p19 = A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			_p10.processes,
			{
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			function (newProcesses) {
				return _elm_lang$core$Task$succeed(
					A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
			},
			A2(
				_elm_lang$core$Task$andThen,
				function (_p20) {
					return A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var _elm_lang$core$Time$Every = F2(
	function (a, b) {
		return {ctor: 'Every', _0: a, _1: b};
	});
var _elm_lang$core$Time$every = F2(
	function (interval, tagger) {
		return _elm_lang$core$Time$subscription(
			A2(_elm_lang$core$Time$Every, interval, tagger));
	});
var _elm_lang$core$Time$subMap = F2(
	function (f, _p21) {
		var _p22 = _p21;
		return A2(
			_elm_lang$core$Time$Every,
			_p22._0,
			function (_p23) {
				return f(
					_p22._1(_p23));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};

var _elm_lang$core$Date$millisecond = _elm_lang$core$Native_Date.millisecond;
var _elm_lang$core$Date$second = _elm_lang$core$Native_Date.second;
var _elm_lang$core$Date$minute = _elm_lang$core$Native_Date.minute;
var _elm_lang$core$Date$hour = _elm_lang$core$Native_Date.hour;
var _elm_lang$core$Date$dayOfWeek = _elm_lang$core$Native_Date.dayOfWeek;
var _elm_lang$core$Date$day = _elm_lang$core$Native_Date.day;
var _elm_lang$core$Date$month = _elm_lang$core$Native_Date.month;
var _elm_lang$core$Date$year = _elm_lang$core$Native_Date.year;
var _elm_lang$core$Date$fromTime = _elm_lang$core$Native_Date.fromTime;
var _elm_lang$core$Date$toTime = _elm_lang$core$Native_Date.toTime;
var _elm_lang$core$Date$fromString = _elm_lang$core$Native_Date.fromString;
var _elm_lang$core$Date$now = A2(_elm_lang$core$Task$map, _elm_lang$core$Date$fromTime, _elm_lang$core$Time$now);
var _elm_lang$core$Date$Date = {ctor: 'Date'};
var _elm_lang$core$Date$Sun = {ctor: 'Sun'};
var _elm_lang$core$Date$Sat = {ctor: 'Sat'};
var _elm_lang$core$Date$Fri = {ctor: 'Fri'};
var _elm_lang$core$Date$Thu = {ctor: 'Thu'};
var _elm_lang$core$Date$Wed = {ctor: 'Wed'};
var _elm_lang$core$Date$Tue = {ctor: 'Tue'};
var _elm_lang$core$Date$Mon = {ctor: 'Mon'};
var _elm_lang$core$Date$Dec = {ctor: 'Dec'};
var _elm_lang$core$Date$Nov = {ctor: 'Nov'};
var _elm_lang$core$Date$Oct = {ctor: 'Oct'};
var _elm_lang$core$Date$Sep = {ctor: 'Sep'};
var _elm_lang$core$Date$Aug = {ctor: 'Aug'};
var _elm_lang$core$Date$Jul = {ctor: 'Jul'};
var _elm_lang$core$Date$Jun = {ctor: 'Jun'};
var _elm_lang$core$Date$May = {ctor: 'May'};
var _elm_lang$core$Date$Apr = {ctor: 'Apr'};
var _elm_lang$core$Date$Mar = {ctor: 'Mar'};
var _elm_lang$core$Date$Feb = {ctor: 'Feb'};
var _elm_lang$core$Date$Jan = {ctor: 'Jan'};

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$core$Set$foldr = F3(
	function (f, b, _p0) {
		var _p1 = _p0;
		return A3(
			_elm_lang$core$Dict$foldr,
			F3(
				function (k, _p2, b) {
					return A2(f, k, b);
				}),
			b,
			_p1._0);
	});
var _elm_lang$core$Set$foldl = F3(
	function (f, b, _p3) {
		var _p4 = _p3;
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, _p5, b) {
					return A2(f, k, b);
				}),
			b,
			_p4._0);
	});
var _elm_lang$core$Set$toList = function (_p6) {
	var _p7 = _p6;
	return _elm_lang$core$Dict$keys(_p7._0);
};
var _elm_lang$core$Set$size = function (_p8) {
	var _p9 = _p8;
	return _elm_lang$core$Dict$size(_p9._0);
};
var _elm_lang$core$Set$member = F2(
	function (k, _p10) {
		var _p11 = _p10;
		return A2(_elm_lang$core$Dict$member, k, _p11._0);
	});
var _elm_lang$core$Set$isEmpty = function (_p12) {
	var _p13 = _p12;
	return _elm_lang$core$Dict$isEmpty(_p13._0);
};
var _elm_lang$core$Set$Set_elm_builtin = function (a) {
	return {ctor: 'Set_elm_builtin', _0: a};
};
var _elm_lang$core$Set$empty = _elm_lang$core$Set$Set_elm_builtin(_elm_lang$core$Dict$empty);
var _elm_lang$core$Set$singleton = function (k) {
	return _elm_lang$core$Set$Set_elm_builtin(
		A2(
			_elm_lang$core$Dict$singleton,
			k,
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Set$insert = F2(
	function (k, _p14) {
		var _p15 = _p14;
		return _elm_lang$core$Set$Set_elm_builtin(
			A3(
				_elm_lang$core$Dict$insert,
				k,
				{ctor: '_Tuple0'},
				_p15._0));
	});
var _elm_lang$core$Set$fromList = function (xs) {
	return A3(_elm_lang$core$List$foldl, _elm_lang$core$Set$insert, _elm_lang$core$Set$empty, xs);
};
var _elm_lang$core$Set$map = F2(
	function (f, s) {
		return _elm_lang$core$Set$fromList(
			A2(
				_elm_lang$core$List$map,
				f,
				_elm_lang$core$Set$toList(s)));
	});
var _elm_lang$core$Set$remove = F2(
	function (k, _p16) {
		var _p17 = _p16;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$remove, k, _p17._0));
	});
var _elm_lang$core$Set$union = F2(
	function (_p19, _p18) {
		var _p20 = _p19;
		var _p21 = _p18;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$union, _p20._0, _p21._0));
	});
var _elm_lang$core$Set$intersect = F2(
	function (_p23, _p22) {
		var _p24 = _p23;
		var _p25 = _p22;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$intersect, _p24._0, _p25._0));
	});
var _elm_lang$core$Set$diff = F2(
	function (_p27, _p26) {
		var _p28 = _p27;
		var _p29 = _p26;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$diff, _p28._0, _p29._0));
	});
var _elm_lang$core$Set$filter = F2(
	function (p, _p30) {
		var _p31 = _p30;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(
				_elm_lang$core$Dict$filter,
				F2(
					function (k, _p32) {
						return p(k);
					}),
				_p31._0));
	});
var _elm_lang$core$Set$partition = F2(
	function (p, _p33) {
		var _p34 = _p33;
		var _p35 = A2(
			_elm_lang$core$Dict$partition,
			F2(
				function (k, _p36) {
					return p(k);
				}),
			_p34._0);
		var p1 = _p35._0;
		var p2 = _p35._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Set$Set_elm_builtin(p1),
			_1: _elm_lang$core$Set$Set_elm_builtin(p2)
		};
	});

var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

var _elm_community$json_extra$Json_Decode_Extra$combine = A2(
	_elm_lang$core$List$foldr,
	_elm_lang$core$Json_Decode$map2(
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})),
	_elm_lang$core$Json_Decode$succeed(
		{ctor: '[]'}));
var _elm_community$json_extra$Json_Decode_Extra$collection = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		function (length) {
			return _elm_community$json_extra$Json_Decode_Extra$combine(
				A2(
					_elm_lang$core$List$map,
					function (index) {
						return A2(
							_elm_lang$core$Json_Decode$field,
							_elm_lang$core$Basics$toString(index),
							decoder);
					},
					A2(_elm_lang$core$List$range, 0, length - 1)));
		},
		A2(_elm_lang$core$Json_Decode$field, 'length', _elm_lang$core$Json_Decode$int));
};
var _elm_community$json_extra$Json_Decode_Extra$fromResult = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Json_Decode$succeed(_p0._0);
	} else {
		return _elm_lang$core$Json_Decode$fail(_p0._0);
	}
};
var _elm_community$json_extra$Json_Decode_Extra$parseInt = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (_p1) {
		return _elm_community$json_extra$Json_Decode_Extra$fromResult(
			_elm_lang$core$String$toInt(_p1));
	},
	_elm_lang$core$Json_Decode$string);
var _elm_community$json_extra$Json_Decode_Extra$parseFloat = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (_p2) {
		return _elm_community$json_extra$Json_Decode_Extra$fromResult(
			_elm_lang$core$String$toFloat(_p2));
	},
	_elm_lang$core$Json_Decode$string);
var _elm_community$json_extra$Json_Decode_Extra$doubleEncoded = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		function (_p3) {
			return _elm_community$json_extra$Json_Decode_Extra$fromResult(
				A2(_elm_lang$core$Json_Decode$decodeString, decoder, _p3));
		},
		_elm_lang$core$Json_Decode$string);
};
var _elm_community$json_extra$Json_Decode_Extra$sequenceHelp = F2(
	function (decoders, jsonValues) {
		return (!_elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(jsonValues),
			_elm_lang$core$List$length(decoders))) ? _elm_lang$core$Json_Decode$fail('Number of decoders does not match number of values') : _elm_community$json_extra$Json_Decode_Extra$fromResult(
			A3(
				_elm_lang$core$List$foldr,
				_elm_lang$core$Result$map2(
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})),
				_elm_lang$core$Result$Ok(
					{ctor: '[]'}),
				A3(_elm_lang$core$List$map2, _elm_lang$core$Json_Decode$decodeValue, decoders, jsonValues)));
	});
var _elm_community$json_extra$Json_Decode_Extra$sequence = function (decoders) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		_elm_community$json_extra$Json_Decode_Extra$sequenceHelp(decoders),
		_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value));
};
var _elm_community$json_extra$Json_Decode_Extra$indexedList = function (indexedDecoder) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		function (values) {
			return _elm_community$json_extra$Json_Decode_Extra$sequence(
				A2(
					_elm_lang$core$List$map,
					indexedDecoder,
					A2(
						_elm_lang$core$List$range,
						0,
						_elm_lang$core$List$length(values) - 1)));
		},
		_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$value));
};
var _elm_community$json_extra$Json_Decode_Extra$optionalField = F2(
	function (fieldName, decoder) {
		var finishDecoding = function (json) {
			var _p4 = A2(
				_elm_lang$core$Json_Decode$decodeValue,
				A2(_elm_lang$core$Json_Decode$field, fieldName, _elm_lang$core$Json_Decode$value),
				json);
			if (_p4.ctor === 'Ok') {
				return A2(
					_elm_lang$core$Json_Decode$map,
					_elm_lang$core$Maybe$Just,
					A2(_elm_lang$core$Json_Decode$field, fieldName, decoder));
			} else {
				return _elm_lang$core$Json_Decode$succeed(_elm_lang$core$Maybe$Nothing);
			}
		};
		return A2(_elm_lang$core$Json_Decode$andThen, finishDecoding, _elm_lang$core$Json_Decode$value);
	});
var _elm_community$json_extra$Json_Decode_Extra$withDefault = F2(
	function (fallback, decoder) {
		return A2(
			_elm_lang$core$Json_Decode$map,
			_elm_lang$core$Maybe$withDefault(fallback),
			_elm_lang$core$Json_Decode$maybe(decoder));
	});
var _elm_community$json_extra$Json_Decode_Extra$decodeDictFromTuples = F2(
	function (keyDecoder, tuples) {
		var _p5 = tuples;
		if (_p5.ctor === '[]') {
			return _elm_lang$core$Json_Decode$succeed(_elm_lang$core$Dict$empty);
		} else {
			var _p6 = A2(_elm_lang$core$Json_Decode$decodeString, keyDecoder, _p5._0._0);
			if (_p6.ctor === 'Ok') {
				return A2(
					_elm_lang$core$Json_Decode$andThen,
					function (_p7) {
						return _elm_lang$core$Json_Decode$succeed(
							A3(_elm_lang$core$Dict$insert, _p6._0, _p5._0._1, _p7));
					},
					A2(_elm_community$json_extra$Json_Decode_Extra$decodeDictFromTuples, keyDecoder, _p5._1));
			} else {
				return _elm_lang$core$Json_Decode$fail(_p6._0);
			}
		}
	});
var _elm_community$json_extra$Json_Decode_Extra$dict2 = F2(
	function (keyDecoder, valueDecoder) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			_elm_community$json_extra$Json_Decode_Extra$decodeDictFromTuples(keyDecoder),
			_elm_lang$core$Json_Decode$keyValuePairs(valueDecoder));
	});
var _elm_community$json_extra$Json_Decode_Extra$set = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Set$fromList,
		_elm_lang$core$Json_Decode$list(decoder));
};
var _elm_community$json_extra$Json_Decode_Extra$date = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (_p8) {
		return _elm_community$json_extra$Json_Decode_Extra$fromResult(
			_elm_lang$core$Date$fromString(_p8));
	},
	_elm_lang$core$Json_Decode$string);
var _elm_community$json_extra$Json_Decode_Extra$andMap = _elm_lang$core$Json_Decode$map2(
	F2(
		function (x, y) {
			return y(x);
		}));
var _elm_community$json_extra$Json_Decode_Extra_ops = _elm_community$json_extra$Json_Decode_Extra_ops || {};
_elm_community$json_extra$Json_Decode_Extra_ops['|:'] = _elm_lang$core$Basics$flip(_elm_community$json_extra$Json_Decode_Extra$andMap);

var _elm_community$list_extra$List_Extra$greedyGroupsOfWithStep = F3(
	function (size, step, xs) {
		var okayXs = _elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(xs),
			0) > 0;
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		return (okayArgs && okayXs) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
	});
var _elm_community$list_extra$List_Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$groupsOfWithStep = F3(
	function (size, step, xs) {
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		var okayLength = _elm_lang$core$Native_Utils.eq(
			size,
			_elm_lang$core$List$length(group));
		return (okayArgs && okayLength) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
	});
var _elm_community$list_extra$List_Extra$groupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$zip5 = _elm_lang$core$List$map5(
	F5(
		function (v0, v1, v2, v3, v4) {
			return {ctor: '_Tuple5', _0: v0, _1: v1, _2: v2, _3: v3, _4: v4};
		}));
var _elm_community$list_extra$List_Extra$zip4 = _elm_lang$core$List$map4(
	F4(
		function (v0, v1, v2, v3) {
			return {ctor: '_Tuple4', _0: v0, _1: v1, _2: v2, _3: v3};
		}));
var _elm_community$list_extra$List_Extra$zip3 = _elm_lang$core$List$map3(
	F3(
		function (v0, v1, v2) {
			return {ctor: '_Tuple3', _0: v0, _1: v1, _2: v2};
		}));
var _elm_community$list_extra$List_Extra$zip = _elm_lang$core$List$map2(
	F2(
		function (v0, v1) {
			return {ctor: '_Tuple2', _0: v0, _1: v1};
		}));
var _elm_community$list_extra$List_Extra$isPrefixOf = F2(
	function (prefix, xs) {
		var _p0 = {ctor: '_Tuple2', _0: prefix, _1: xs};
		if (_p0._0.ctor === '[]') {
			return true;
		} else {
			if (_p0._1.ctor === '[]') {
				return false;
			} else {
				return _elm_lang$core$Native_Utils.eq(_p0._0._0, _p0._1._0) && A2(_elm_community$list_extra$List_Extra$isPrefixOf, _p0._0._1, _p0._1._1);
			}
		}
	});
var _elm_community$list_extra$List_Extra$isSuffixOf = F2(
	function (suffix, xs) {
		return A2(
			_elm_community$list_extra$List_Extra$isPrefixOf,
			_elm_lang$core$List$reverse(suffix),
			_elm_lang$core$List$reverse(xs));
	});
var _elm_community$list_extra$List_Extra$selectSplit = function (xs) {
	var _p1 = xs;
	if (_p1.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p5 = _p1._1;
		var _p4 = _p1._0;
		return {
			ctor: '::',
			_0: {
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _p4,
				_2: _p5
			},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p2) {
					var _p3 = _p2;
					return {
						ctor: '_Tuple3',
						_0: {ctor: '::', _0: _p4, _1: _p3._0},
						_1: _p3._1,
						_2: _p3._2
					};
				},
				_elm_community$list_extra$List_Extra$selectSplit(_p5))
		};
	}
};
var _elm_community$list_extra$List_Extra$select = function (xs) {
	var _p6 = xs;
	if (_p6.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p10 = _p6._1;
		var _p9 = _p6._0;
		return {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: _p9, _1: _p10},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p7) {
					var _p8 = _p7;
					return {
						ctor: '_Tuple2',
						_0: _p8._0,
						_1: {ctor: '::', _0: _p9, _1: _p8._1}
					};
				},
				_elm_community$list_extra$List_Extra$select(_p10))
		};
	}
};
var _elm_community$list_extra$List_Extra$tailsHelp = F2(
	function (e, list) {
		var _p11 = list;
		if (_p11.ctor === '::') {
			var _p12 = _p11._0;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: e, _1: _p12},
				_1: {ctor: '::', _0: _p12, _1: _p11._1}
			};
		} else {
			return {ctor: '[]'};
		}
	});
var _elm_community$list_extra$List_Extra$tails = A2(
	_elm_lang$core$List$foldr,
	_elm_community$list_extra$List_Extra$tailsHelp,
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
var _elm_community$list_extra$List_Extra$isInfixOf = F2(
	function (infix, xs) {
		return A2(
			_elm_lang$core$List$any,
			_elm_community$list_extra$List_Extra$isPrefixOf(infix),
			_elm_community$list_extra$List_Extra$tails(xs));
	});
var _elm_community$list_extra$List_Extra$inits = A2(
	_elm_lang$core$List$foldr,
	F2(
		function (e, acc) {
			return {
				ctor: '::',
				_0: {ctor: '[]'},
				_1: A2(
					_elm_lang$core$List$map,
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(e),
					acc)
			};
		}),
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
var _elm_community$list_extra$List_Extra$groupWhileTransitively = F2(
	function (cmp, xs_) {
		var _p13 = xs_;
		if (_p13.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p13._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: {
						ctor: '::',
						_0: _p13._0,
						_1: {ctor: '[]'}
					},
					_1: {ctor: '[]'}
				};
			} else {
				var _p15 = _p13._0;
				var _p14 = A2(_elm_community$list_extra$List_Extra$groupWhileTransitively, cmp, _p13._1);
				if (_p14.ctor === '::') {
					return A2(cmp, _p15, _p13._1._0) ? {
						ctor: '::',
						_0: {ctor: '::', _0: _p15, _1: _p14._0},
						_1: _p14._1
					} : {
						ctor: '::',
						_0: {
							ctor: '::',
							_0: _p15,
							_1: {ctor: '[]'}
						},
						_1: _p14
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$stripPrefix = F2(
	function (prefix, xs) {
		var step = F2(
			function (e, m) {
				var _p16 = m;
				if (_p16.ctor === 'Nothing') {
					return _elm_lang$core$Maybe$Nothing;
				} else {
					if (_p16._0.ctor === '[]') {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						return _elm_lang$core$Native_Utils.eq(e, _p16._0._0) ? _elm_lang$core$Maybe$Just(_p16._0._1) : _elm_lang$core$Maybe$Nothing;
					}
				}
			});
		return A3(
			_elm_lang$core$List$foldl,
			step,
			_elm_lang$core$Maybe$Just(xs),
			prefix);
	});
var _elm_community$list_extra$List_Extra$dropWhileRight = function (p) {
	return A2(
		_elm_lang$core$List$foldr,
		F2(
			function (x, xs) {
				return (p(x) && _elm_lang$core$List$isEmpty(xs)) ? {ctor: '[]'} : {ctor: '::', _0: x, _1: xs};
			}),
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$takeWhileRight = function (p) {
	var step = F2(
		function (x, _p17) {
			var _p18 = _p17;
			var _p19 = _p18._0;
			return (p(x) && _p18._1) ? {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: x, _1: _p19},
				_1: true
			} : {ctor: '_Tuple2', _0: _p19, _1: false};
		});
	return function (_p20) {
		return _elm_lang$core$Tuple$first(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
					_1: true
				},
				_p20));
	};
};
var _elm_community$list_extra$List_Extra$splitAt = F2(
	function (n, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_lang$core$List$take, n, xs),
			_1: A2(_elm_lang$core$List$drop, n, xs)
		};
	});
var _elm_community$list_extra$List_Extra$groupsOfVarying_ = F3(
	function (listOflengths, list, accu) {
		groupsOfVarying_:
		while (true) {
			var _p21 = {ctor: '_Tuple2', _0: listOflengths, _1: list};
			if (((_p21.ctor === '_Tuple2') && (_p21._0.ctor === '::')) && (_p21._1.ctor === '::')) {
				var _p22 = A2(_elm_community$list_extra$List_Extra$splitAt, _p21._0._0, list);
				var head = _p22._0;
				var tail = _p22._1;
				var _v11 = _p21._0._1,
					_v12 = tail,
					_v13 = {ctor: '::', _0: head, _1: accu};
				listOflengths = _v11;
				list = _v12;
				accu = _v13;
				continue groupsOfVarying_;
			} else {
				return _elm_lang$core$List$reverse(accu);
			}
		}
	});
var _elm_community$list_extra$List_Extra$groupsOfVarying = F2(
	function (listOflengths, list) {
		return A3(
			_elm_community$list_extra$List_Extra$groupsOfVarying_,
			listOflengths,
			list,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$unfoldr = F2(
	function (f, seed) {
		var _p23 = f(seed);
		if (_p23.ctor === 'Nothing') {
			return {ctor: '[]'};
		} else {
			return {
				ctor: '::',
				_0: _p23._0._0,
				_1: A2(_elm_community$list_extra$List_Extra$unfoldr, f, _p23._0._1)
			};
		}
	});
var _elm_community$list_extra$List_Extra$scanr1 = F2(
	function (f, xs_) {
		var _p24 = xs_;
		if (_p24.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p24._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: _p24._0,
					_1: {ctor: '[]'}
				};
			} else {
				var _p25 = A2(_elm_community$list_extra$List_Extra$scanr1, f, _p24._1);
				if (_p25.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, _p24._0, _p25._0),
						_1: _p25
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanr = F3(
	function (f, acc, xs_) {
		var _p26 = xs_;
		if (_p26.ctor === '[]') {
			return {
				ctor: '::',
				_0: acc,
				_1: {ctor: '[]'}
			};
		} else {
			var _p27 = A3(_elm_community$list_extra$List_Extra$scanr, f, acc, _p26._1);
			if (_p27.ctor === '::') {
				return {
					ctor: '::',
					_0: A2(f, _p26._0, _p27._0),
					_1: _p27
				};
			} else {
				return {ctor: '[]'};
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanl1 = F2(
	function (f, xs_) {
		var _p28 = xs_;
		if (_p28.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			return A3(_elm_lang$core$List$scanl, f, _p28._0, _p28._1);
		}
	});
var _elm_community$list_extra$List_Extra$indexedFoldr = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p29) {
				var _p30 = _p29;
				var _p31 = _p30._0;
				return {
					ctor: '_Tuple2',
					_0: _p31 - 1,
					_1: A3(func, _p31, x, _p30._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$length(list) - 1,
					_1: acc
				},
				list));
	});
var _elm_community$list_extra$List_Extra$indexedFoldl = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p32) {
				var _p33 = _p32;
				var _p34 = _p33._0;
				return {
					ctor: '_Tuple2',
					_0: _p34 + 1,
					_1: A3(func, _p34, x, _p33._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldl,
				step,
				{ctor: '_Tuple2', _0: 0, _1: acc},
				list));
	});
var _elm_community$list_extra$List_Extra$foldr1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p35 = m;
						if (_p35.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, x, _p35._0);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldr, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$foldl1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p36 = m;
						if (_p36.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, _p36._0, x);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldl, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$interweaveHelp = F3(
	function (l1, l2, acc) {
		interweaveHelp:
		while (true) {
			var _p37 = {ctor: '_Tuple2', _0: l1, _1: l2};
			_v24_1:
			do {
				if (_p37._0.ctor === '::') {
					if (_p37._1.ctor === '::') {
						var _v25 = _p37._0._1,
							_v26 = _p37._1._1,
							_v27 = A2(
							_elm_lang$core$Basics_ops['++'],
							acc,
							{
								ctor: '::',
								_0: _p37._0._0,
								_1: {
									ctor: '::',
									_0: _p37._1._0,
									_1: {ctor: '[]'}
								}
							});
						l1 = _v25;
						l2 = _v26;
						acc = _v27;
						continue interweaveHelp;
					} else {
						break _v24_1;
					}
				} else {
					if (_p37._1.ctor === '[]') {
						break _v24_1;
					} else {
						return A2(_elm_lang$core$Basics_ops['++'], acc, _p37._1);
					}
				}
			} while(false);
			return A2(_elm_lang$core$Basics_ops['++'], acc, _p37._0);
		}
	});
var _elm_community$list_extra$List_Extra$interweave = F2(
	function (l1, l2) {
		return A3(
			_elm_community$list_extra$List_Extra$interweaveHelp,
			l1,
			l2,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$permutations = function (xs_) {
	var _p38 = xs_;
	if (_p38.ctor === '[]') {
		return {
			ctor: '::',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		};
	} else {
		var f = function (_p39) {
			var _p40 = _p39;
			return A2(
				_elm_lang$core$List$map,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(_p40._0),
				_elm_community$list_extra$List_Extra$permutations(_p40._1));
		};
		return A2(
			_elm_lang$core$List$concatMap,
			f,
			_elm_community$list_extra$List_Extra$select(_p38));
	}
};
var _elm_community$list_extra$List_Extra$isPermutationOf = F2(
	function (permut, xs) {
		return A2(
			_elm_lang$core$List$member,
			permut,
			_elm_community$list_extra$List_Extra$permutations(xs));
	});
var _elm_community$list_extra$List_Extra$subsequencesNonEmpty = function (xs) {
	var _p41 = xs;
	if (_p41.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p42 = _p41._0;
		var f = F2(
			function (ys, r) {
				return {
					ctor: '::',
					_0: ys,
					_1: {
						ctor: '::',
						_0: {ctor: '::', _0: _p42, _1: ys},
						_1: r
					}
				};
			});
		return {
			ctor: '::',
			_0: {
				ctor: '::',
				_0: _p42,
				_1: {ctor: '[]'}
			},
			_1: A3(
				_elm_lang$core$List$foldr,
				f,
				{ctor: '[]'},
				_elm_community$list_extra$List_Extra$subsequencesNonEmpty(_p41._1))
		};
	}
};
var _elm_community$list_extra$List_Extra$subsequences = function (xs) {
	return {
		ctor: '::',
		_0: {ctor: '[]'},
		_1: _elm_community$list_extra$List_Extra$subsequencesNonEmpty(xs)
	};
};
var _elm_community$list_extra$List_Extra$isSubsequenceOf = F2(
	function (subseq, xs) {
		return A2(
			_elm_lang$core$List$member,
			subseq,
			_elm_community$list_extra$List_Extra$subsequences(xs));
	});
var _elm_community$list_extra$List_Extra$transpose = function (ll) {
	transpose:
	while (true) {
		var _p43 = ll;
		if (_p43.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p43._0.ctor === '[]') {
				var _v32 = _p43._1;
				ll = _v32;
				continue transpose;
			} else {
				var _p44 = _p43._1;
				var tails = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$tail, _p44);
				var heads = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$head, _p44);
				return {
					ctor: '::',
					_0: {ctor: '::', _0: _p43._0._0, _1: heads},
					_1: _elm_community$list_extra$List_Extra$transpose(
						{ctor: '::', _0: _p43._0._1, _1: tails})
				};
			}
		}
	}
};
var _elm_community$list_extra$List_Extra$intercalate = function (xs) {
	return function (_p45) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$intersperse, xs, _p45));
	};
};
var _elm_community$list_extra$List_Extra$filterNot = F2(
	function (pred, list) {
		return A2(
			_elm_lang$core$List$filter,
			function (_p46) {
				return !pred(_p46);
			},
			list);
	});
var _elm_community$list_extra$List_Extra$removeAt = F2(
	function (index, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return l;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p47 = tail;
			if (_p47.ctor === 'Nothing') {
				return l;
			} else {
				return A2(_elm_lang$core$List$append, head, _p47._0);
			}
		}
	});
var _elm_community$list_extra$List_Extra$stableSortWith = F2(
	function (pred, list) {
		var predWithIndex = F2(
			function (_p49, _p48) {
				var _p50 = _p49;
				var _p51 = _p48;
				var result = A2(pred, _p50._0, _p51._0);
				var _p52 = result;
				if (_p52.ctor === 'EQ') {
					return A2(_elm_lang$core$Basics$compare, _p50._1, _p51._1);
				} else {
					return result;
				}
			});
		var listWithIndex = A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, a) {
					return {ctor: '_Tuple2', _0: a, _1: i};
				}),
			list);
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(_elm_lang$core$List$sortWith, predWithIndex, listWithIndex));
	});
var _elm_community$list_extra$List_Extra$setAt = F3(
	function (index, value, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p53 = tail;
			if (_p53.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Just(
					A2(
						_elm_lang$core$List$append,
						head,
						{ctor: '::', _0: value, _1: _p53._0}));
			}
		}
	});
var _elm_community$list_extra$List_Extra$remove = F2(
	function (x, xs) {
		var _p54 = xs;
		if (_p54.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p56 = _p54._1;
			var _p55 = _p54._0;
			return _elm_lang$core$Native_Utils.eq(x, _p55) ? _p56 : {
				ctor: '::',
				_0: _p55,
				_1: A2(_elm_community$list_extra$List_Extra$remove, x, _p56)
			};
		}
	});
var _elm_community$list_extra$List_Extra$updateIfIndex = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, x) {
					return predicate(i) ? update(x) : x;
				}),
			list);
	});
var _elm_community$list_extra$List_Extra$updateAt = F3(
	function (index, update, list) {
		return ((_elm_lang$core$Native_Utils.cmp(index, 0) < 0) || (_elm_lang$core$Native_Utils.cmp(
			index,
			_elm_lang$core$List$length(list)) > -1)) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
			A3(
				_elm_community$list_extra$List_Extra$updateIfIndex,
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					})(index),
				update,
				list));
	});
var _elm_community$list_extra$List_Extra$updateIf = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$map,
			function (item) {
				return predicate(item) ? update(item) : item;
			},
			list);
	});
var _elm_community$list_extra$List_Extra$replaceIf = F3(
	function (predicate, replacement, list) {
		return A3(
			_elm_community$list_extra$List_Extra$updateIf,
			predicate,
			_elm_lang$core$Basics$always(replacement),
			list);
	});
var _elm_community$list_extra$List_Extra$findIndices = function (p) {
	return function (_p57) {
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(
				_elm_lang$core$List$filter,
				function (_p58) {
					var _p59 = _p58;
					return p(_p59._1);
				},
				A2(
					_elm_lang$core$List$indexedMap,
					F2(
						function (v0, v1) {
							return {ctor: '_Tuple2', _0: v0, _1: v1};
						}),
					_p57)));
	};
};
var _elm_community$list_extra$List_Extra$findIndex = function (p) {
	return function (_p60) {
		return _elm_lang$core$List$head(
			A2(_elm_community$list_extra$List_Extra$findIndices, p, _p60));
	};
};
var _elm_community$list_extra$List_Extra$splitWhen = F2(
	function (predicate, list) {
		return A2(
			_elm_lang$core$Maybe$map,
			function (i) {
				return A2(_elm_community$list_extra$List_Extra$splitAt, i, list);
			},
			A2(_elm_community$list_extra$List_Extra$findIndex, predicate, list));
	});
var _elm_community$list_extra$List_Extra$elemIndices = function (x) {
	return _elm_community$list_extra$List_Extra$findIndices(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$elemIndex = function (x) {
	return _elm_community$list_extra$List_Extra$findIndex(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			var _p61 = list;
			if (_p61.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p62 = _p61._0;
				if (predicate(_p62)) {
					return _elm_lang$core$Maybe$Just(_p62);
				} else {
					var _v41 = predicate,
						_v42 = _p61._1;
					predicate = _v41;
					list = _v42;
					continue find;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$notMember = function (x) {
	return function (_p63) {
		return !A2(_elm_lang$core$List$member, x, _p63);
	};
};
var _elm_community$list_extra$List_Extra$andThen = _elm_lang$core$List$concatMap;
var _elm_community$list_extra$List_Extra$lift2 = F3(
	function (f, la, lb) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return {
							ctor: '::',
							_0: A2(f, a, b),
							_1: {ctor: '[]'}
						};
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$lift3 = F4(
	function (f, la, lb, lc) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return {
									ctor: '::',
									_0: A3(f, a, b, c),
									_1: {ctor: '[]'}
								};
							},
							lc);
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$lift4 = F5(
	function (f, la, lb, lc, ld) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return A2(
									_elm_community$list_extra$List_Extra$andThen,
									function (d) {
										return {
											ctor: '::',
											_0: A4(f, a, b, c, d),
											_1: {ctor: '[]'}
										};
									},
									ld);
							},
							lc);
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$andMap = F2(
	function (l, fl) {
		return A3(
			_elm_lang$core$List$map2,
			F2(
				function (x, y) {
					return x(y);
				}),
			fl,
			l);
	});
var _elm_community$list_extra$List_Extra$uniqueHelp = F3(
	function (f, existing, remaining) {
		uniqueHelp:
		while (true) {
			var _p64 = remaining;
			if (_p64.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				var _p66 = _p64._1;
				var _p65 = _p64._0;
				var computedFirst = f(_p65);
				if (A2(_elm_lang$core$Set$member, computedFirst, existing)) {
					var _v44 = f,
						_v45 = existing,
						_v46 = _p66;
					f = _v44;
					existing = _v45;
					remaining = _v46;
					continue uniqueHelp;
				} else {
					return {
						ctor: '::',
						_0: _p65,
						_1: A3(
							_elm_community$list_extra$List_Extra$uniqueHelp,
							f,
							A2(_elm_lang$core$Set$insert, computedFirst, existing),
							_p66)
					};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$uniqueBy = F2(
	function (f, list) {
		return A3(_elm_community$list_extra$List_Extra$uniqueHelp, f, _elm_lang$core$Set$empty, list);
	});
var _elm_community$list_extra$List_Extra$allDifferentBy = F2(
	function (f, list) {
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(list),
			_elm_lang$core$List$length(
				A2(_elm_community$list_extra$List_Extra$uniqueBy, f, list)));
	});
var _elm_community$list_extra$List_Extra$allDifferent = function (list) {
	return A2(_elm_community$list_extra$List_Extra$allDifferentBy, _elm_lang$core$Basics$identity, list);
};
var _elm_community$list_extra$List_Extra$unique = function (list) {
	return A3(_elm_community$list_extra$List_Extra$uniqueHelp, _elm_lang$core$Basics$identity, _elm_lang$core$Set$empty, list);
};
var _elm_community$list_extra$List_Extra$dropWhile = F2(
	function (predicate, list) {
		dropWhile:
		while (true) {
			var _p67 = list;
			if (_p67.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				if (predicate(_p67._0)) {
					var _v48 = predicate,
						_v49 = _p67._1;
					predicate = _v48;
					list = _v49;
					continue dropWhile;
				} else {
					return list;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$takeWhile = function (predicate) {
	var takeWhileMemo = F2(
		function (memo, list) {
			takeWhileMemo:
			while (true) {
				var _p68 = list;
				if (_p68.ctor === '[]') {
					return _elm_lang$core$List$reverse(memo);
				} else {
					var _p69 = _p68._0;
					if (predicate(_p69)) {
						var _v51 = {ctor: '::', _0: _p69, _1: memo},
							_v52 = _p68._1;
						memo = _v51;
						list = _v52;
						continue takeWhileMemo;
					} else {
						return _elm_lang$core$List$reverse(memo);
					}
				}
			}
		});
	return takeWhileMemo(
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$span = F2(
	function (p, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_community$list_extra$List_Extra$takeWhile, p, xs),
			_1: A2(_elm_community$list_extra$List_Extra$dropWhile, p, xs)
		};
	});
var _elm_community$list_extra$List_Extra$break = function (p) {
	return _elm_community$list_extra$List_Extra$span(
		function (_p70) {
			return !p(_p70);
		});
};
var _elm_community$list_extra$List_Extra$groupWhile = F2(
	function (eq, xs_) {
		var _p71 = xs_;
		if (_p71.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p73 = _p71._0;
			var _p72 = A2(
				_elm_community$list_extra$List_Extra$span,
				eq(_p73),
				_p71._1);
			var ys = _p72._0;
			var zs = _p72._1;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: _p73, _1: ys},
				_1: A2(_elm_community$list_extra$List_Extra$groupWhile, eq, zs)
			};
		}
	});
var _elm_community$list_extra$List_Extra$group = _elm_community$list_extra$List_Extra$groupWhile(
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		}));
var _elm_community$list_extra$List_Extra$minimumBy = F2(
	function (f, ls) {
		var minBy = F2(
			function (x, _p74) {
				var _p75 = _p74;
				var _p76 = _p75._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p76) < 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p75._0, _1: _p76};
			});
		var _p77 = ls;
		if (_p77.ctor === '::') {
			if (_p77._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p77._0);
			} else {
				var _p78 = _p77._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							minBy,
							{
								ctor: '_Tuple2',
								_0: _p78,
								_1: f(_p78)
							},
							_p77._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$maximumBy = F2(
	function (f, ls) {
		var maxBy = F2(
			function (x, _p79) {
				var _p80 = _p79;
				var _p81 = _p80._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p81) > 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p80._0, _1: _p81};
			});
		var _p82 = ls;
		if (_p82.ctor === '::') {
			if (_p82._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p82._0);
			} else {
				var _p83 = _p82._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							maxBy,
							{
								ctor: '_Tuple2',
								_0: _p83,
								_1: f(_p83)
							},
							_p82._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$uncons = function (xs) {
	var _p84 = xs;
	if (_p84.ctor === '[]') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return _elm_lang$core$Maybe$Just(
			{ctor: '_Tuple2', _0: _p84._0, _1: _p84._1});
	}
};
var _elm_community$list_extra$List_Extra$swapAt = F3(
	function (index1, index2, l) {
		swapAt:
		while (true) {
			if (_elm_lang$core$Native_Utils.eq(index1, index2)) {
				return _elm_lang$core$Maybe$Just(l);
			} else {
				if (_elm_lang$core$Native_Utils.cmp(index1, index2) > 0) {
					var _v59 = index2,
						_v60 = index1,
						_v61 = l;
					index1 = _v59;
					index2 = _v60;
					l = _v61;
					continue swapAt;
				} else {
					if (_elm_lang$core$Native_Utils.cmp(index1, 0) < 0) {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						var _p85 = A2(_elm_community$list_extra$List_Extra$splitAt, index1, l);
						var part1 = _p85._0;
						var tail1 = _p85._1;
						var _p86 = A2(_elm_community$list_extra$List_Extra$splitAt, index2 - index1, tail1);
						var head2 = _p86._0;
						var tail2 = _p86._1;
						return A3(
							_elm_lang$core$Maybe$map2,
							F2(
								function (_p88, _p87) {
									var _p89 = _p88;
									var _p90 = _p87;
									return _elm_lang$core$List$concat(
										{
											ctor: '::',
											_0: part1,
											_1: {
												ctor: '::',
												_0: {ctor: '::', _0: _p90._0, _1: _p89._1},
												_1: {
													ctor: '::',
													_0: {ctor: '::', _0: _p89._0, _1: _p90._1},
													_1: {ctor: '[]'}
												}
											}
										});
								}),
							_elm_community$list_extra$List_Extra$uncons(head2),
							_elm_community$list_extra$List_Extra$uncons(tail2));
					}
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$iterate = F2(
	function (f, x) {
		var _p91 = f(x);
		if (_p91.ctor === 'Just') {
			return {
				ctor: '::',
				_0: x,
				_1: A2(_elm_community$list_extra$List_Extra$iterate, f, _p91._0)
			};
		} else {
			return {
				ctor: '::',
				_0: x,
				_1: {ctor: '[]'}
			};
		}
	});
var _elm_community$list_extra$List_Extra$getAt = F2(
	function (idx, xs) {
		return (_elm_lang$core$Native_Utils.cmp(idx, 0) < 0) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$List$head(
			A2(_elm_lang$core$List$drop, idx, xs));
	});
var _elm_community$list_extra$List_Extra_ops = _elm_community$list_extra$List_Extra_ops || {};
_elm_community$list_extra$List_Extra_ops['!!'] = _elm_lang$core$Basics$flip(_elm_community$list_extra$List_Extra$getAt);
var _elm_community$list_extra$List_Extra$init = function () {
	var maybe = F2(
		function (d, f) {
			return function (_p92) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					d,
					A2(_elm_lang$core$Maybe$map, f, _p92));
			};
		});
	return A2(
		_elm_lang$core$List$foldr,
		function (x) {
			return function (_p93) {
				return _elm_lang$core$Maybe$Just(
					A3(
						maybe,
						{ctor: '[]'},
						F2(
							function (x, y) {
								return {ctor: '::', _0: x, _1: y};
							})(x),
						_p93));
			};
		},
		_elm_lang$core$Maybe$Nothing);
}();
var _elm_community$list_extra$List_Extra$last = _elm_community$list_extra$List_Extra$foldl1(
	_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always));

var _elm_community$maybe_extra$Maybe_Extra$foldrValues = F2(
	function (item, list) {
		var _p0 = item;
		if (_p0.ctor === 'Nothing') {
			return list;
		} else {
			return {ctor: '::', _0: _p0._0, _1: list};
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$values = A2(
	_elm_lang$core$List$foldr,
	_elm_community$maybe_extra$Maybe_Extra$foldrValues,
	{ctor: '[]'});
var _elm_community$maybe_extra$Maybe_Extra$filter = F2(
	function (f, m) {
		var _p1 = A2(_elm_lang$core$Maybe$map, f, m);
		if ((_p1.ctor === 'Just') && (_p1._0 === true)) {
			return m;
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$traverseArray = function (f) {
	var step = F2(
		function (e, acc) {
			var _p2 = f(e);
			if (_p2.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return A2(
					_elm_lang$core$Maybe$map,
					_elm_lang$core$Array$push(_p2._0),
					acc);
			}
		});
	return A2(
		_elm_lang$core$Array$foldl,
		step,
		_elm_lang$core$Maybe$Just(_elm_lang$core$Array$empty));
};
var _elm_community$maybe_extra$Maybe_Extra$combineArray = _elm_community$maybe_extra$Maybe_Extra$traverseArray(_elm_lang$core$Basics$identity);
var _elm_community$maybe_extra$Maybe_Extra$traverse = function (f) {
	var step = F2(
		function (e, acc) {
			var _p3 = f(e);
			if (_p3.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return A2(
					_elm_lang$core$Maybe$map,
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(_p3._0),
					acc);
			}
		});
	return A2(
		_elm_lang$core$List$foldr,
		step,
		_elm_lang$core$Maybe$Just(
			{ctor: '[]'}));
};
var _elm_community$maybe_extra$Maybe_Extra$combine = _elm_community$maybe_extra$Maybe_Extra$traverse(_elm_lang$core$Basics$identity);
var _elm_community$maybe_extra$Maybe_Extra$toArray = function (m) {
	var _p4 = m;
	if (_p4.ctor === 'Nothing') {
		return _elm_lang$core$Array$empty;
	} else {
		return A2(_elm_lang$core$Array$repeat, 1, _p4._0);
	}
};
var _elm_community$maybe_extra$Maybe_Extra$toList = function (m) {
	var _p5 = m;
	if (_p5.ctor === 'Nothing') {
		return {ctor: '[]'};
	} else {
		return {
			ctor: '::',
			_0: _p5._0,
			_1: {ctor: '[]'}
		};
	}
};
var _elm_community$maybe_extra$Maybe_Extra$orElse = F2(
	function (ma, mb) {
		var _p6 = mb;
		if (_p6.ctor === 'Nothing') {
			return ma;
		} else {
			return mb;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$orElseLazy = F2(
	function (fma, mb) {
		var _p7 = mb;
		if (_p7.ctor === 'Nothing') {
			return fma(
				{ctor: '_Tuple0'});
		} else {
			return mb;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$orLazy = F2(
	function (ma, fmb) {
		var _p8 = ma;
		if (_p8.ctor === 'Nothing') {
			return fmb(
				{ctor: '_Tuple0'});
		} else {
			return ma;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$or = F2(
	function (ma, mb) {
		var _p9 = ma;
		if (_p9.ctor === 'Nothing') {
			return mb;
		} else {
			return ma;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$prev = _elm_lang$core$Maybe$map2(_elm_lang$core$Basics$always);
var _elm_community$maybe_extra$Maybe_Extra$next = _elm_lang$core$Maybe$map2(
	_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always));
var _elm_community$maybe_extra$Maybe_Extra$andMap = _elm_lang$core$Maybe$map2(
	F2(
		function (x, y) {
			return y(x);
		}));
var _elm_community$maybe_extra$Maybe_Extra$unpack = F3(
	function (d, f, m) {
		var _p10 = m;
		if (_p10.ctor === 'Nothing') {
			return d(
				{ctor: '_Tuple0'});
		} else {
			return f(_p10._0);
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$unwrap = F3(
	function (d, f, m) {
		var _p11 = m;
		if (_p11.ctor === 'Nothing') {
			return d;
		} else {
			return f(_p11._0);
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$isJust = function (m) {
	var _p12 = m;
	if (_p12.ctor === 'Nothing') {
		return false;
	} else {
		return true;
	}
};
var _elm_community$maybe_extra$Maybe_Extra$isNothing = function (m) {
	var _p13 = m;
	if (_p13.ctor === 'Nothing') {
		return true;
	} else {
		return false;
	}
};
var _elm_community$maybe_extra$Maybe_Extra$join = function (mx) {
	var _p14 = mx;
	if (_p14.ctor === 'Just') {
		return _p14._0;
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_community$maybe_extra$Maybe_Extra_ops = _elm_community$maybe_extra$Maybe_Extra_ops || {};
_elm_community$maybe_extra$Maybe_Extra_ops['?'] = F2(
	function (mx, x) {
		return A2(_elm_lang$core$Maybe$withDefault, x, mx);
	});

var _elm_community$result_extra$Result_Extra$merge = function (r) {
	var _p0 = r;
	if (_p0.ctor === 'Ok') {
		return _p0._0;
	} else {
		return _p0._0;
	}
};
var _elm_community$result_extra$Result_Extra$orElse = F2(
	function (ra, rb) {
		var _p1 = rb;
		if (_p1.ctor === 'Err') {
			return ra;
		} else {
			return rb;
		}
	});
var _elm_community$result_extra$Result_Extra$orElseLazy = F2(
	function (fra, rb) {
		var _p2 = rb;
		if (_p2.ctor === 'Err') {
			return fra(
				{ctor: '_Tuple0'});
		} else {
			return rb;
		}
	});
var _elm_community$result_extra$Result_Extra$orLazy = F2(
	function (ra, frb) {
		var _p3 = ra;
		if (_p3.ctor === 'Err') {
			return frb(
				{ctor: '_Tuple0'});
		} else {
			return ra;
		}
	});
var _elm_community$result_extra$Result_Extra$or = F2(
	function (ra, rb) {
		var _p4 = ra;
		if (_p4.ctor === 'Err') {
			return rb;
		} else {
			return ra;
		}
	});
var _elm_community$result_extra$Result_Extra$andMap = F2(
	function (ra, rb) {
		var _p5 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p5._1.ctor === 'Err') {
			return _elm_lang$core$Result$Err(_p5._1._0);
		} else {
			return A2(_elm_lang$core$Result$map, _p5._1._0, _p5._0);
		}
	});
var _elm_community$result_extra$Result_Extra$singleton = _elm_lang$core$Result$Ok;
var _elm_community$result_extra$Result_Extra$combine = A2(
	_elm_lang$core$List$foldr,
	_elm_lang$core$Result$map2(
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})),
	_elm_lang$core$Result$Ok(
		{ctor: '[]'}));
var _elm_community$result_extra$Result_Extra$mapBoth = F3(
	function (errFunc, okFunc, result) {
		var _p6 = result;
		if (_p6.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				okFunc(_p6._0));
		} else {
			return _elm_lang$core$Result$Err(
				errFunc(_p6._0));
		}
	});
var _elm_community$result_extra$Result_Extra$unpack = F3(
	function (errFunc, okFunc, result) {
		var _p7 = result;
		if (_p7.ctor === 'Ok') {
			return okFunc(_p7._0);
		} else {
			return errFunc(_p7._0);
		}
	});
var _elm_community$result_extra$Result_Extra$unwrap = F3(
	function (defaultValue, okFunc, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return okFunc(_p8._0);
		} else {
			return defaultValue;
		}
	});
var _elm_community$result_extra$Result_Extra$extract = F2(
	function (f, x) {
		var _p9 = x;
		if (_p9.ctor === 'Ok') {
			return _p9._0;
		} else {
			return f(_p9._0);
		}
	});
var _elm_community$result_extra$Result_Extra$isErr = function (x) {
	var _p10 = x;
	if (_p10.ctor === 'Ok') {
		return false;
	} else {
		return true;
	}
};
var _elm_community$result_extra$Result_Extra$isOk = function (x) {
	var _p11 = x;
	if (_p11.ctor === 'Ok') {
		return true;
	} else {
		return false;
	}
};

//import Maybe, Native.List //

var _elm_lang$core$Native_Regex = function() {

function escape(str)
{
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function caseInsensitive(re)
{
	return new RegExp(re.source, 'gi');
}
function regex(raw)
{
	return new RegExp(raw, 'g');
}

function contains(re, string)
{
	return string.match(re) !== null;
}

function find(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex === re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		out.push({
			match: result[0],
			submatches: _elm_lang$core$Native_List.fromArray(subs),
			index: result.index,
			number: number
		});
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

function replace(n, re, replacer, string)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		return replacer({
			match: match,
			submatches: _elm_lang$core$Native_List.fromArray(submatches),
			index: arguments[arguments.length - 2],
			number: count
		});
	}
	return string.replace(re, jsReplacer);
}

function split(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	if (n === Infinity)
	{
		return _elm_lang$core$Native_List.fromArray(str.split(re));
	}
	var string = str;
	var result;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		if (!(result = re.exec(string))) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

return {
	regex: regex,
	caseInsensitive: caseInsensitive,
	escape: escape,

	contains: F2(contains),
	find: F3(find),
	replace: F4(replace),
	split: F3(split)
};

}();

var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;

var _elm_lang$core$Regex$split = _elm_lang$core$Native_Regex.split;
var _elm_lang$core$Regex$replace = _elm_lang$core$Native_Regex.replace;
var _elm_lang$core$Regex$find = _elm_lang$core$Native_Regex.find;
var _elm_lang$core$Regex$contains = _elm_lang$core$Native_Regex.contains;
var _elm_lang$core$Regex$caseInsensitive = _elm_lang$core$Native_Regex.caseInsensitive;
var _elm_lang$core$Regex$regex = _elm_lang$core$Native_Regex.regex;
var _elm_lang$core$Regex$escape = _elm_lang$core$Native_Regex.escape;
var _elm_lang$core$Regex$Match = F4(
	function (a, b, c, d) {
		return {match: a, submatches: b, index: c, number: d};
	});
var _elm_lang$core$Regex$Regex = {ctor: 'Regex'};
var _elm_lang$core$Regex$AtMost = function (a) {
	return {ctor: 'AtMost', _0: a};
};
var _elm_lang$core$Regex$All = {ctor: 'All'};

var _elm_lang$http$Native_Http = function() {


// ENCODING AND DECODING

function encodeUri(string)
{
	return encodeURIComponent(string);
}

function decodeUri(string)
{
	try
	{
		return _elm_lang$core$Maybe$Just(decodeURIComponent(string));
	}
	catch(e)
	{
		return _elm_lang$core$Maybe$Nothing;
	}
}


// SEND REQUEST

function toTask(request, maybeProgress)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NetworkError' }));
		});
		xhr.addEventListener('timeout', function() {
			callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'Timeout' }));
		});
		xhr.addEventListener('load', function() {
			callback(handleResponse(xhr, request.expect.responseToResult));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'BadUrl', _0: request.url }));
		}

		configureRequest(xhr, request);
		send(xhr, request.body);

		return function() { xhr.abort(); };
	});
}

function configureProgress(xhr, maybeProgress)
{
	if (maybeProgress.ctor === 'Nothing')
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_elm_lang$core$Native_Scheduler.rawSpawn(maybeProgress._0({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function configureRequest(xhr, request)
{
	function setHeader(pair)
	{
		xhr.setRequestHeader(pair._0, pair._1);
	}

	A2(_elm_lang$core$List$map, setHeader, request.headers);
	xhr.responseType = request.expect.responseType;
	xhr.withCredentials = request.withCredentials;

	if (request.timeout.ctor === 'Just')
	{
		xhr.timeout = request.timeout._0;
	}
}

function send(xhr, body)
{
	switch (body.ctor)
	{
		case 'EmptyBody':
			xhr.send();
			return;

		case 'StringBody':
			xhr.setRequestHeader('Content-Type', body._0);
			xhr.send(body._1);
			return;

		case 'FormDataBody':
			xhr.send(body._0);
			return;
	}
}


// RESPONSES

function handleResponse(xhr, responseToResult)
{
	var response = toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _elm_lang$core$Native_Scheduler.fail({
			ctor: 'BadStatus',
			_0: response
		});
	}

	var result = responseToResult(response);

	if (result.ctor === 'Ok')
	{
		return _elm_lang$core$Native_Scheduler.succeed(result._0);
	}
	else
	{
		response.body = xhr.responseText;
		return _elm_lang$core$Native_Scheduler.fail({
			ctor: 'BadPayload',
			_0: result._0,
			_1: response
		});
	}
}

function toResponse(xhr)
{
	return {
		status: { code: xhr.status, message: xhr.statusText },
		headers: parseHeaders(xhr.getAllResponseHeaders()),
		url: xhr.responseURL,
		body: xhr.response
	};
}

function parseHeaders(rawHeaders)
{
	var headers = _elm_lang$core$Dict$empty;

	if (!rawHeaders)
	{
		return headers;
	}

	var headerPairs = rawHeaders.split('\u000d\u000a');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(_elm_lang$core$Dict$update, key, function(oldValue) {
				if (oldValue.ctor === 'Just')
				{
					return _elm_lang$core$Maybe$Just(value + ', ' + oldValue._0);
				}
				return _elm_lang$core$Maybe$Just(value);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function expectStringResponse(responseToResult)
{
	return {
		responseType: 'text',
		responseToResult: responseToResult
	};
}

function mapExpect(func, expect)
{
	return {
		responseType: expect.responseType,
		responseToResult: function(response) {
			var convertedResponse = expect.responseToResult(response);
			return A2(_elm_lang$core$Result$map, func, convertedResponse);
		}
	};
}


// BODY

function multipart(parts)
{
	var formData = new FormData();

	while (parts.ctor !== '[]')
	{
		var part = parts._0;
		formData.append(part._0, part._1);
		parts = parts._1;
	}

	return { ctor: 'FormDataBody', _0: formData };
}

return {
	toTask: F2(toTask),
	expectStringResponse: expectStringResponse,
	mapExpect: F2(mapExpect),
	multipart: multipart,
	encodeUri: encodeUri,
	decodeUri: decodeUri
};

}();

var _elm_lang$http$Http_Internal$map = F2(
	function (func, request) {
		return _elm_lang$core$Native_Utils.update(
			request,
			{
				expect: A2(_elm_lang$http$Native_Http.mapExpect, func, request.expect)
			});
	});
var _elm_lang$http$Http_Internal$RawRequest = F7(
	function (a, b, c, d, e, f, g) {
		return {method: a, headers: b, url: c, body: d, expect: e, timeout: f, withCredentials: g};
	});
var _elm_lang$http$Http_Internal$Request = function (a) {
	return {ctor: 'Request', _0: a};
};
var _elm_lang$http$Http_Internal$Expect = {ctor: 'Expect'};
var _elm_lang$http$Http_Internal$FormDataBody = {ctor: 'FormDataBody'};
var _elm_lang$http$Http_Internal$StringBody = F2(
	function (a, b) {
		return {ctor: 'StringBody', _0: a, _1: b};
	});
var _elm_lang$http$Http_Internal$EmptyBody = {ctor: 'EmptyBody'};
var _elm_lang$http$Http_Internal$Header = F2(
	function (a, b) {
		return {ctor: 'Header', _0: a, _1: b};
	});

var _elm_lang$http$Http$decodeUri = _elm_lang$http$Native_Http.decodeUri;
var _elm_lang$http$Http$encodeUri = _elm_lang$http$Native_Http.encodeUri;
var _elm_lang$http$Http$expectStringResponse = _elm_lang$http$Native_Http.expectStringResponse;
var _elm_lang$http$Http$expectJson = function (decoder) {
	return _elm_lang$http$Http$expectStringResponse(
		function (response) {
			return A2(_elm_lang$core$Json_Decode$decodeString, decoder, response.body);
		});
};
var _elm_lang$http$Http$expectString = _elm_lang$http$Http$expectStringResponse(
	function (response) {
		return _elm_lang$core$Result$Ok(response.body);
	});
var _elm_lang$http$Http$multipartBody = _elm_lang$http$Native_Http.multipart;
var _elm_lang$http$Http$stringBody = _elm_lang$http$Http_Internal$StringBody;
var _elm_lang$http$Http$jsonBody = function (value) {
	return A2(
		_elm_lang$http$Http_Internal$StringBody,
		'application/json',
		A2(_elm_lang$core$Json_Encode$encode, 0, value));
};
var _elm_lang$http$Http$emptyBody = _elm_lang$http$Http_Internal$EmptyBody;
var _elm_lang$http$Http$header = _elm_lang$http$Http_Internal$Header;
var _elm_lang$http$Http$request = _elm_lang$http$Http_Internal$Request;
var _elm_lang$http$Http$post = F3(
	function (url, body, decoder) {
		return _elm_lang$http$Http$request(
			{
				method: 'POST',
				headers: {ctor: '[]'},
				url: url,
				body: body,
				expect: _elm_lang$http$Http$expectJson(decoder),
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: false
			});
	});
var _elm_lang$http$Http$get = F2(
	function (url, decoder) {
		return _elm_lang$http$Http$request(
			{
				method: 'GET',
				headers: {ctor: '[]'},
				url: url,
				body: _elm_lang$http$Http$emptyBody,
				expect: _elm_lang$http$Http$expectJson(decoder),
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: false
			});
	});
var _elm_lang$http$Http$getString = function (url) {
	return _elm_lang$http$Http$request(
		{
			method: 'GET',
			headers: {ctor: '[]'},
			url: url,
			body: _elm_lang$http$Http$emptyBody,
			expect: _elm_lang$http$Http$expectString,
			timeout: _elm_lang$core$Maybe$Nothing,
			withCredentials: false
		});
};
var _elm_lang$http$Http$toTask = function (_p0) {
	var _p1 = _p0;
	return A2(_elm_lang$http$Native_Http.toTask, _p1._0, _elm_lang$core$Maybe$Nothing);
};
var _elm_lang$http$Http$send = F2(
	function (resultToMessage, request) {
		return A2(
			_elm_lang$core$Task$attempt,
			resultToMessage,
			_elm_lang$http$Http$toTask(request));
	});
var _elm_lang$http$Http$Response = F4(
	function (a, b, c, d) {
		return {url: a, status: b, headers: c, body: d};
	});
var _elm_lang$http$Http$BadPayload = F2(
	function (a, b) {
		return {ctor: 'BadPayload', _0: a, _1: b};
	});
var _elm_lang$http$Http$BadStatus = function (a) {
	return {ctor: 'BadStatus', _0: a};
};
var _elm_lang$http$Http$NetworkError = {ctor: 'NetworkError'};
var _elm_lang$http$Http$Timeout = {ctor: 'Timeout'};
var _elm_lang$http$Http$BadUrl = function (a) {
	return {ctor: 'BadUrl', _0: a};
};
var _elm_lang$http$Http$StringPart = F2(
	function (a, b) {
		return {ctor: 'StringPart', _0: a, _1: b};
	});
var _elm_lang$http$Http$stringPart = _elm_lang$http$Http$StringPart;

const _elm_node$core$Native_Buffer = function () {
    const Ok = _elm_lang$core$Result$Ok
    const Err = _elm_lang$core$Result$Err
    const { Buffer } = require("buffer")
    const { StringDecoder } = require("string_decoder")


    // fromString : String -> String -> Result String Buffer
    const fromString = F2((encoding, string) => {
        try {
            const buffer = Buffer.from(string, encoding)
            return Ok(buffer)
        } catch (error) { return Err(error) }
    })


    // toString : String -> Buffer -> Result String String
    const toString = F2((encoding, buffer) => {
        try {
            const decoder = new StringDecoder(encoding)
            const string = decoder.end(buffer)
            return Ok(string)
        } catch (error) { return Err(error) }
    })


    const exports =
        { fromString
        , toString
        }
    return exports
}()

const _elm_node$core$Native_FileSystem = (_ => {
    const cpr = require( "cpr" )
    const fs = require( "fs" )
    const mkdirp = require("mkdirp")
    const path = require("path")
    const rm = require("rimraf")
    const { nativeBinding, succeed, fail } = _elm_lang$core$Native_Scheduler
    const { Tuple0 } = _elm_lang$core$Native_Utils


    // COPY


    // copy : Bool -> String -> String -> Task Decode.Value Decode.Value
    const copy = F3((overwrite, to, from) => nativeBinding(callback => {
        const extractFilename = message => {
            const match = (/(?:File ){0,1}(.*) exists/).exec(message)
            return match ? match[1] : null
        }
        try {
            cpr(from, to, { overwrite }, (error, files) => {
                // single file case
                if (error && !files) {
                    const filename = extractFilename(error.message)
                    if (filename) return callback(succeed({ errors : [ error ], files : [ filename ] }))
                    return callback(fail(error))
                }
                // multiple file case
                if (error && files) return callback(succeed({ errors : error.list, files }))
                // copying a single file with no errors returns files and error undefined ...
                return callback(succeed({ errors : [], files : files || [ to ] }))
            })
        } catch (error) { callback(fail(error)) }
    }))


    // READ


    const readFile = (filename, encoding) => nativeBinding(callback => {
        try {
            fs.readFile(filename, encoding, (error, data) => {
                if (error) return callback(fail(error))
                return callback(succeed(data))
            })
        } catch (error) { callback(fail(error)) }
    })


    // readFileAsString : String -> String -> Task Decode.Value String
    const readFileAsString = F2(readFile)


    // readFileAsBuffer : String -> Task Decode.Value Buffer
    const readFileAsBuffer = filename => readFile(filename, null)


    // REMOVE


    // remove : String -> Task Decode.Value ()
    const remove = filename => nativeBinding(callback => {
        try {
            rm(filename, error => {
                if (error) return callback(fail(error))
                return callback(succeed(Tuple0))
            })
        } catch (error) { return callback(fail(error)) }
    })


    // WRITE


    const writeFile = (filename, mode, encoding, data) => nativeBinding(callback => {
        const octalStringToInt = string => parseInt(string, 8)
        try {
            const dirname = path.dirname(filename)
            mkdirp(dirname, error => {
                if (error) return callback(fail(error))
                const options =
                    { encoding : encoding
                    , mode : octalStringToInt(mode)
                    }
                fs.writeFile(filename, data, options, error => {
                    if (error) return callback(fail(error))
                    return callback(succeed(Tuple0))
                })
            })
        } catch (error) { return callback(fail(error)) }
    })


    // writeFileFromString : String -> String -> String -> String -> Task Decode.Value ()
    const writeFileFromString = F4(writeFile)


    // writeFileFromBuffer : String -> String -> Buffer -> Task Decode.Value ()
    const writeFileFromBuffer = F3((filename, mode, buffer) => writeFile(filename, mode, null, buffer))

    const exists = path => nativeBinding(callback => {
        try {
            fs.access(path, fs.constants.F_OK, err => callback(err ? succeed(false) : succeed(true)))
        }
        catch (error) {callback(fail(error))}
    })

    const mkdirp_ = path => nativeBinding(callback => {
        try {
            mkdirp(path, err => callback(err ? fail(err) : succeed()))
        }
        catch (error) {callback(fail(error))}
    })

    const rename = (oldPath, newPath) => nativeBinding(callback => {
        try {
            fs.rename(oldPath, newPath, err => callback(err ? fail(err) : succeed()))
        }
        catch (error) {callback(fail(error))}
    })

    const isSymlink = path => nativeBinding(callback => {
        try {
            fs.lstat(path, (err, stats) => callback(err ? fail(err) : succeed(stats.isSymbolicLink())))
        }
        catch (error) {callback(fail(error))}
    })

    const makeSymlink = (target, path, type) => nativeBinding(callback => {
        try {
            fs.symlink(target, path, type, err => callback(err ? fail(err) : succeed()))
        }
        catch (error) {callback(fail(error))}
    })

    const exports =
        { copy
        , readFileAsString
        , readFileAsBuffer
        , remove
        , writeFileFromString
        , writeFileFromBuffer
        , exists
        , mkdirp : mkdirp_
        , rename : F2(rename)
		, isSymlink
		, makeSymlink : F3(makeSymlink)
        }
    return exports
})()

var _elm_node$core$Node_Buffer_LowLevel$toString = _elm_node$core$Native_Buffer.toString;
var _elm_node$core$Node_Buffer_LowLevel$fromString = _elm_node$core$Native_Buffer.fromString;
var _elm_node$core$Node_Buffer_LowLevel$Buffer = {ctor: 'Buffer'};

var _elm_node$core$Node_Encoding$toString = function (_p0) {
	return _elm_lang$core$String$toLower(
		_elm_lang$core$Basics$toString(_p0));
};
var _elm_node$core$Node_Encoding$Hex = {ctor: 'Hex'};
var _elm_node$core$Node_Encoding$Latin1 = {ctor: 'Latin1'};
var _elm_node$core$Node_Encoding$Base64 = {ctor: 'Base64'};
var _elm_node$core$Node_Encoding$Utf16le = {ctor: 'Utf16le'};
var _elm_node$core$Node_Encoding$Utf8 = {ctor: 'Utf8'};
var _elm_node$core$Node_Encoding$Ascii = {ctor: 'Ascii'};

var _elm_node$core$Node_Error$message = function (error) {
	var _p0 = error;
	if (_p0.ctor === 'Error') {
		return _p0._0;
	} else {
		return _p0._1.message;
	}
};
var _elm_node$core$Node_Error$SystemError = F2(
	function (a, b) {
		return {ctor: 'SystemError', _0: a, _1: b};
	});
var _elm_node$core$Node_Error$Error = F2(
	function (a, b) {
		return {ctor: 'Error', _0: a, _1: b};
	});
var _elm_node$core$Node_Error$ExchangeFull = {ctor: 'ExchangeFull'};
var _elm_node$core$Node_Error$ImproperLink = {ctor: 'ImproperLink'};
var _elm_node$core$Node_Error$OperationWouldBlock = {ctor: 'OperationWouldBlock'};
var _elm_node$core$Node_Error$TooManyUsers = {ctor: 'TooManyUsers'};
var _elm_node$core$Node_Error$ProtocolDriverNotAttached = {ctor: 'ProtocolDriverNotAttached'};
var _elm_node$core$Node_Error$StructureNeedsCleaning = {ctor: 'StructureNeedsCleaning'};
var _elm_node$core$Node_Error$TextFileBusy = {ctor: 'TextFileBusy'};
var _elm_node$core$Node_Error$ConnectionTimedOut = {ctor: 'ConnectionTimedOut'};
var _elm_node$core$Node_Error$TimerExpired = {ctor: 'TimerExpired'};
var _elm_node$core$Node_Error$StreamPipe = {ctor: 'StreamPipe'};
var _elm_node$core$Node_Error$StaleFileHandle = {ctor: 'StaleFileHandle'};
var _elm_node$core$Node_Error$NoProcess = {ctor: 'NoProcess'};
var _elm_node$core$Node_Error$SocketNotSupported = {ctor: 'SocketNotSupported'};
var _elm_node$core$Node_Error$InvalidSeek = {ctor: 'InvalidSeek'};
var _elm_node$core$Node_Error$TransportEndpointShutdown = {ctor: 'TransportEndpointShutdown'};
var _elm_node$core$Node_Error$ReadOnlyFileSystem = {ctor: 'ReadOnlyFileSystem'};
var _elm_node$core$Node_Error$RestartCall = {ctor: 'RestartCall'};
var _elm_node$core$Node_Error$RemoteIO = {ctor: 'RemoteIO'};
var _elm_node$core$Node_Error$ObjectRemote = {ctor: 'ObjectRemote'};
var _elm_node$core$Node_Error$RemoteAddressChanged = {ctor: 'RemoteAddressChanged'};
var _elm_node$core$Node_Error$ResultTooLarge = {ctor: 'ResultTooLarge'};
var _elm_node$core$Node_Error$WrongProtocolForSocket = {ctor: 'WrongProtocolForSocket'};
var _elm_node$core$Node_Error$ProtocolNotSupported = {ctor: 'ProtocolNotSupported'};
var _elm_node$core$Node_Error$Protocol = {ctor: 'Protocol'};
var _elm_node$core$Node_Error$BrokenPipe = {ctor: 'BrokenPipe'};
var _elm_node$core$Node_Error$ProtocolFamilyNotAvailable = {ctor: 'ProtocolFamilyNotAvailable'};
var _elm_node$core$Node_Error$OperationNotPermitted = {ctor: 'OperationNotPermitted'};
var _elm_node$core$Node_Error$ValueTooLarge = {ctor: 'ValueTooLarge'};
var _elm_node$core$Node_Error$OperationNotSupportedOnSocket = {ctor: 'OperationNotSupportedOnSocket'};
var _elm_node$core$Node_Error$NoDeviceOrAddress = {ctor: 'NoDeviceOrAddress'};
var _elm_node$core$Node_Error$NameNotUniqueOnNetwork = {ctor: 'NameNotUniqueOnNetwork'};
var _elm_node$core$Node_Error$InappropriateIOControlOperation = {ctor: 'InappropriateIOControlOperation'};
var _elm_node$core$Node_Error$OperationNotSupported = {ctor: 'OperationNotSupported'};
var _elm_node$core$Node_Error$NotSocket = {ctor: 'NotSocket'};
var _elm_node$core$Node_Error$DirectoryNotEmpty = {ctor: 'DirectoryNotEmpty'};
var _elm_node$core$Node_Error$NotADirectory = {ctor: 'NotADirectory'};
var _elm_node$core$Node_Error$SocketNotConnected = {ctor: 'SocketNotConnected'};
var _elm_node$core$Node_Error$BlockDeviceRequired = {ctor: 'BlockDeviceRequired'};
var _elm_node$core$Node_Error$FunctionNotImplemented = {ctor: 'FunctionNotImplemented'};
var _elm_node$core$Node_Error$NotStream = {ctor: 'NotStream'};
var _elm_node$core$Node_Error$NoStreamResources = {ctor: 'NoStreamResources'};
var _elm_node$core$Node_Error$ProtocolNotAvailable = {ctor: 'ProtocolNotAvailable'};
var _elm_node$core$Node_Error$PackageNotInstalled = {ctor: 'PackageNotInstalled'};
var _elm_node$core$Node_Error$NotOnNetwork = {ctor: 'NotOnNetwork'};
var _elm_node$core$Node_Error$NoMessage = {ctor: 'NoMessage'};
var _elm_node$core$Node_Error$NotEnoughSpace = {ctor: 'NotEnoughSpace'};
var _elm_node$core$Node_Error$NoMedium = {ctor: 'NoMedium'};
var _elm_node$core$Node_Error$NoLink = {ctor: 'NoLink'};
var _elm_node$core$Node_Error$NoLocksAvailable = {ctor: 'NoLocksAvailable'};
var _elm_node$core$Node_Error$RequiredKeyNotAvailable = {ctor: 'RequiredKeyNotAvailable'};
var _elm_node$core$Node_Error$ExecuteFormatError = {ctor: 'ExecuteFormatError'};
var _elm_node$core$Node_Error$NoSuchFileOrDirectory = {ctor: 'NoSuchFileOrDirectory'};
var _elm_node$core$Node_Error$NoDevice = {ctor: 'NoDevice'};
var _elm_node$core$Node_Error$NoDataAvailable = {ctor: 'NoDataAvailable'};
var _elm_node$core$Node_Error$NoBufferSpaceAvailable = {ctor: 'NoBufferSpaceAvailable'};
var _elm_node$core$Node_Error$NetworkUnreachable = {ctor: 'NetworkUnreachable'};
var _elm_node$core$Node_Error$ConnectionAbortedByNetwork = {ctor: 'ConnectionAbortedByNetwork'};
var _elm_node$core$Node_Error$NetworkDown = {ctor: 'NetworkDown'};
var _elm_node$core$Node_Error$FilenameTooLong = {ctor: 'FilenameTooLong'};
var _elm_node$core$Node_Error$MultihopAttempted = {ctor: 'MultihopAttempted'};
var _elm_node$core$Node_Error$MessageTooLong = {ctor: 'MessageTooLong'};
var _elm_node$core$Node_Error$TooManyLinks = {ctor: 'TooManyLinks'};
var _elm_node$core$Node_Error$TooManyOpenFiles = {ctor: 'TooManyOpenFiles'};
var _elm_node$core$Node_Error$WrongMediumType = {ctor: 'WrongMediumType'};
var _elm_node$core$Node_Error$TooManyLevelsOfSymbolicLinks = {ctor: 'TooManyLevelsOfSymbolicLinks'};
var _elm_node$core$Node_Error$CannotExecuteLibrary = {ctor: 'CannotExecuteLibrary'};
var _elm_node$core$Node_Error$LibSectionCorrupted = {ctor: 'LibSectionCorrupted'};
var _elm_node$core$Node_Error$TooManyLibraries = {ctor: 'TooManyLibraries'};
var _elm_node$core$Node_Error$LibraryCorrupted = {ctor: 'LibraryCorrupted'};
var _elm_node$core$Node_Error$CannotAccessLibrary = {ctor: 'CannotAccessLibrary'};
var _elm_node$core$Node_Error$Level3Halted = {ctor: 'Level3Halted'};
var _elm_node$core$Node_Error$Level2NotSynchronized = {ctor: 'Level2NotSynchronized'};
var _elm_node$core$Node_Error$Level2Halted = {ctor: 'Level2Halted'};
var _elm_node$core$Node_Error$KeyRevoked = {ctor: 'KeyRevoked'};
var _elm_node$core$Node_Error$KeyRejected = {ctor: 'KeyRejected'};
var _elm_node$core$Node_Error$KeyExpired = {ctor: 'KeyExpired'};
var _elm_node$core$Node_Error$NamedTypeFile = {ctor: 'NamedTypeFile'};
var _elm_node$core$Node_Error$IsADirectory = {ctor: 'IsADirectory'};
var _elm_node$core$Node_Error$SocketConnected = {ctor: 'SocketConnected'};
var _elm_node$core$Node_Error$InputOutput = {ctor: 'InputOutput'};
var _elm_node$core$Node_Error$InvalidArgument = {ctor: 'InvalidArgument'};
var _elm_node$core$Node_Error$InteruptedFunctionCall = {ctor: 'InteruptedFunctionCall'};
var _elm_node$core$Node_Error$OperationInProgress = {ctor: 'OperationInProgress'};
var _elm_node$core$Node_Error$IllegalByteSequence = {ctor: 'IllegalByteSequence'};
var _elm_node$core$Node_Error$IdentifierRemoved = {ctor: 'IdentifierRemoved'};
var _elm_node$core$Node_Error$HostUnreachable = {ctor: 'HostUnreachable'};
var _elm_node$core$Node_Error$HostDown = {ctor: 'HostDown'};
var _elm_node$core$Node_Error$FileTooLarge = {ctor: 'FileTooLarge'};
var _elm_node$core$Node_Error$BadAddress = {ctor: 'BadAddress'};
var _elm_node$core$Node_Error$FileExists = {ctor: 'FileExists'};
var _elm_node$core$Node_Error$DiskQuotaExceeded = {ctor: 'DiskQuotaExceeded'};
var _elm_node$core$Node_Error$ArgumentOutOfDomain = {ctor: 'ArgumentOutOfDomain'};
var _elm_node$core$Node_Error$DestinationAddressRequired = {ctor: 'DestinationAddressRequired'};
var _elm_node$core$Node_Error$ResourceDeadlockAvoided = {ctor: 'ResourceDeadlockAvoided'};
var _elm_node$core$Node_Error$ConnectionReset = {ctor: 'ConnectionReset'};
var _elm_node$core$Node_Error$ConnectionRefused = {ctor: 'ConnectionRefused'};
var _elm_node$core$Node_Error$ConnectionAborted = {ctor: 'ConnectionAborted'};
var _elm_node$core$Node_Error$CommunicationErrorOnSend = {ctor: 'CommunicationErrorOnSend'};
var _elm_node$core$Node_Error$ChannelNumberOutOfRange = {ctor: 'ChannelNumberOutOfRange'};
var _elm_node$core$Node_Error$NoChildProcesses = {ctor: 'NoChildProcesses'};
var _elm_node$core$Node_Error$OperationCancelled = {ctor: 'OperationCancelled'};
var _elm_node$core$Node_Error$DeviceOrResourceBusy = {ctor: 'DeviceOrResourceBusy'};
var _elm_node$core$Node_Error$InvalidSlot = {ctor: 'InvalidSlot'};
var _elm_node$core$Node_Error$InvalidRequestCode = {ctor: 'InvalidRequestCode'};
var _elm_node$core$Node_Error$InvalidRequestDescriptor = {ctor: 'InvalidRequestDescriptor'};
var _elm_node$core$Node_Error$BadMessage = {ctor: 'BadMessage'};
var _elm_node$core$Node_Error$FileDescriptorInBadState = {ctor: 'FileDescriptorInBadState'};
var _elm_node$core$Node_Error$BadFileDescriptor = {ctor: 'BadFileDescriptor'};
var _elm_node$core$Node_Error$InvalidExchange = {ctor: 'InvalidExchange'};
var _elm_node$core$Node_Error$ConnectionAlreadyInProgress = {ctor: 'ConnectionAlreadyInProgress'};
var _elm_node$core$Node_Error$ResourceTemporarilyUnavailable = {ctor: 'ResourceTemporarilyUnavailable'};
var _elm_node$core$Node_Error$AddressFamilyNotSupported = {ctor: 'AddressFamilyNotSupported'};
var _elm_node$core$Node_Error$AddressNotAvailable = {ctor: 'AddressNotAvailable'};
var _elm_node$core$Node_Error$AddressInUse = {ctor: 'AddressInUse'};
var _elm_node$core$Node_Error$PermissionDenied = {ctor: 'PermissionDenied'};
var _elm_node$core$Node_Error$ArgumentListTooLong = {ctor: 'ArgumentListTooLong'};
var _elm_node$core$Node_Error$codeMap = {
	ctor: '::',
	_0: {
		ctor: '_Tuple2',
		_0: _elm_node$core$Node_Error$ArgumentListTooLong,
		_1: {
			ctor: '::',
			_0: 'E2BIG',
			_1: {ctor: '[]'}
		}
	},
	_1: {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: _elm_node$core$Node_Error$PermissionDenied,
			_1: {
				ctor: '::',
				_0: 'EACCES',
				_1: {ctor: '[]'}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: _elm_node$core$Node_Error$AddressInUse,
				_1: {
					ctor: '::',
					_0: 'EADDRINUSE',
					_1: {ctor: '[]'}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: _elm_node$core$Node_Error$AddressNotAvailable,
					_1: {
						ctor: '::',
						_0: 'EADDRNOTAVAIL',
						_1: {ctor: '[]'}
					}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: _elm_node$core$Node_Error$AddressFamilyNotSupported,
						_1: {
							ctor: '::',
							_0: 'EAFNOSUPPORT',
							_1: {ctor: '[]'}
						}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _elm_node$core$Node_Error$ResourceTemporarilyUnavailable,
							_1: {
								ctor: '::',
								_0: 'EAGAIN',
								_1: {ctor: '[]'}
							}
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: _elm_node$core$Node_Error$ConnectionAlreadyInProgress,
								_1: {
									ctor: '::',
									_0: 'EALREADY',
									_1: {ctor: '[]'}
								}
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: _elm_node$core$Node_Error$InvalidExchange,
									_1: {
										ctor: '::',
										_0: 'EBADE',
										_1: {ctor: '[]'}
									}
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: _elm_node$core$Node_Error$BadFileDescriptor,
										_1: {
											ctor: '::',
											_0: 'EBADF',
											_1: {ctor: '[]'}
										}
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: _elm_node$core$Node_Error$FileDescriptorInBadState,
											_1: {
												ctor: '::',
												_0: 'EBADFD',
												_1: {ctor: '[]'}
											}
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: _elm_node$core$Node_Error$BadMessage,
												_1: {
													ctor: '::',
													_0: 'EBADMSG',
													_1: {ctor: '[]'}
												}
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: _elm_node$core$Node_Error$InvalidRequestDescriptor,
													_1: {
														ctor: '::',
														_0: 'EBADR',
														_1: {ctor: '[]'}
													}
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: _elm_node$core$Node_Error$InvalidRequestCode,
														_1: {
															ctor: '::',
															_0: 'EBADRQC',
															_1: {ctor: '[]'}
														}
													},
													_1: {
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: _elm_node$core$Node_Error$InvalidSlot,
															_1: {
																ctor: '::',
																_0: 'EBADSLT',
																_1: {ctor: '[]'}
															}
														},
														_1: {
															ctor: '::',
															_0: {
																ctor: '_Tuple2',
																_0: _elm_node$core$Node_Error$DeviceOrResourceBusy,
																_1: {
																	ctor: '::',
																	_0: 'EBUSY',
																	_1: {ctor: '[]'}
																}
															},
															_1: {
																ctor: '::',
																_0: {
																	ctor: '_Tuple2',
																	_0: _elm_node$core$Node_Error$OperationCancelled,
																	_1: {
																		ctor: '::',
																		_0: 'ECANCELED',
																		_1: {ctor: '[]'}
																	}
																},
																_1: {
																	ctor: '::',
																	_0: {
																		ctor: '_Tuple2',
																		_0: _elm_node$core$Node_Error$NoChildProcesses,
																		_1: {
																			ctor: '::',
																			_0: 'ECHILD',
																			_1: {ctor: '[]'}
																		}
																	},
																	_1: {
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: _elm_node$core$Node_Error$ChannelNumberOutOfRange,
																			_1: {
																				ctor: '::',
																				_0: 'ECHRNG',
																				_1: {ctor: '[]'}
																			}
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				ctor: '_Tuple2',
																				_0: _elm_node$core$Node_Error$CommunicationErrorOnSend,
																				_1: {
																					ctor: '::',
																					_0: 'ECOMM',
																					_1: {ctor: '[]'}
																				}
																			},
																			_1: {
																				ctor: '::',
																				_0: {
																					ctor: '_Tuple2',
																					_0: _elm_node$core$Node_Error$ConnectionAborted,
																					_1: {
																						ctor: '::',
																						_0: 'ECONNABORTED',
																						_1: {ctor: '[]'}
																					}
																				},
																				_1: {
																					ctor: '::',
																					_0: {
																						ctor: '_Tuple2',
																						_0: _elm_node$core$Node_Error$ConnectionRefused,
																						_1: {
																							ctor: '::',
																							_0: 'ECONNREFUSED',
																							_1: {ctor: '[]'}
																						}
																					},
																					_1: {
																						ctor: '::',
																						_0: {
																							ctor: '_Tuple2',
																							_0: _elm_node$core$Node_Error$ConnectionReset,
																							_1: {
																								ctor: '::',
																								_0: 'ECONNRESET',
																								_1: {ctor: '[]'}
																							}
																						},
																						_1: {
																							ctor: '::',
																							_0: {
																								ctor: '_Tuple2',
																								_0: _elm_node$core$Node_Error$ResourceDeadlockAvoided,
																								_1: {
																									ctor: '::',
																									_0: 'EDEADLK',
																									_1: {
																										ctor: '::',
																										_0: 'EDEADLOCK',
																										_1: {ctor: '[]'}
																									}
																								}
																							},
																							_1: {
																								ctor: '::',
																								_0: {
																									ctor: '_Tuple2',
																									_0: _elm_node$core$Node_Error$DestinationAddressRequired,
																									_1: {
																										ctor: '::',
																										_0: 'EDESTADDRREQ',
																										_1: {ctor: '[]'}
																									}
																								},
																								_1: {
																									ctor: '::',
																									_0: {
																										ctor: '_Tuple2',
																										_0: _elm_node$core$Node_Error$ArgumentOutOfDomain,
																										_1: {
																											ctor: '::',
																											_0: 'EDOM',
																											_1: {ctor: '[]'}
																										}
																									},
																									_1: {
																										ctor: '::',
																										_0: {
																											ctor: '_Tuple2',
																											_0: _elm_node$core$Node_Error$DiskQuotaExceeded,
																											_1: {
																												ctor: '::',
																												_0: 'EDQUOT',
																												_1: {ctor: '[]'}
																											}
																										},
																										_1: {
																											ctor: '::',
																											_0: {
																												ctor: '_Tuple2',
																												_0: _elm_node$core$Node_Error$FileExists,
																												_1: {
																													ctor: '::',
																													_0: 'EEXIST',
																													_1: {ctor: '[]'}
																												}
																											},
																											_1: {
																												ctor: '::',
																												_0: {
																													ctor: '_Tuple2',
																													_0: _elm_node$core$Node_Error$BadAddress,
																													_1: {
																														ctor: '::',
																														_0: 'EFAULT',
																														_1: {ctor: '[]'}
																													}
																												},
																												_1: {
																													ctor: '::',
																													_0: {
																														ctor: '_Tuple2',
																														_0: _elm_node$core$Node_Error$FileTooLarge,
																														_1: {
																															ctor: '::',
																															_0: 'EFBIG',
																															_1: {ctor: '[]'}
																														}
																													},
																													_1: {
																														ctor: '::',
																														_0: {
																															ctor: '_Tuple2',
																															_0: _elm_node$core$Node_Error$HostDown,
																															_1: {
																																ctor: '::',
																																_0: 'EHOSTDOWN',
																																_1: {ctor: '[]'}
																															}
																														},
																														_1: {
																															ctor: '::',
																															_0: {
																																ctor: '_Tuple2',
																																_0: _elm_node$core$Node_Error$HostUnreachable,
																																_1: {
																																	ctor: '::',
																																	_0: 'EHOSTUNREACH',
																																	_1: {ctor: '[]'}
																																}
																															},
																															_1: {
																																ctor: '::',
																																_0: {
																																	ctor: '_Tuple2',
																																	_0: _elm_node$core$Node_Error$IdentifierRemoved,
																																	_1: {
																																		ctor: '::',
																																		_0: 'EIDRM',
																																		_1: {ctor: '[]'}
																																	}
																																},
																																_1: {
																																	ctor: '::',
																																	_0: {
																																		ctor: '_Tuple2',
																																		_0: _elm_node$core$Node_Error$IllegalByteSequence,
																																		_1: {
																																			ctor: '::',
																																			_0: 'EILSEQ',
																																			_1: {ctor: '[]'}
																																		}
																																	},
																																	_1: {
																																		ctor: '::',
																																		_0: {
																																			ctor: '_Tuple2',
																																			_0: _elm_node$core$Node_Error$OperationInProgress,
																																			_1: {
																																				ctor: '::',
																																				_0: 'EINPROGRESS',
																																				_1: {ctor: '[]'}
																																			}
																																		},
																																		_1: {
																																			ctor: '::',
																																			_0: {
																																				ctor: '_Tuple2',
																																				_0: _elm_node$core$Node_Error$InteruptedFunctionCall,
																																				_1: {
																																					ctor: '::',
																																					_0: 'EINTR',
																																					_1: {ctor: '[]'}
																																				}
																																			},
																																			_1: {
																																				ctor: '::',
																																				_0: {
																																					ctor: '_Tuple2',
																																					_0: _elm_node$core$Node_Error$InvalidArgument,
																																					_1: {
																																						ctor: '::',
																																						_0: 'EINVAL',
																																						_1: {ctor: '[]'}
																																					}
																																				},
																																				_1: {
																																					ctor: '::',
																																					_0: {
																																						ctor: '_Tuple2',
																																						_0: _elm_node$core$Node_Error$InputOutput,
																																						_1: {
																																							ctor: '::',
																																							_0: 'EIO',
																																							_1: {ctor: '[]'}
																																						}
																																					},
																																					_1: {
																																						ctor: '::',
																																						_0: {
																																							ctor: '_Tuple2',
																																							_0: _elm_node$core$Node_Error$SocketConnected,
																																							_1: {
																																								ctor: '::',
																																								_0: 'EISCONN',
																																								_1: {ctor: '[]'}
																																							}
																																						},
																																						_1: {
																																							ctor: '::',
																																							_0: {
																																								ctor: '_Tuple2',
																																								_0: _elm_node$core$Node_Error$IsADirectory,
																																								_1: {
																																									ctor: '::',
																																									_0: 'EISDIR',
																																									_1: {ctor: '[]'}
																																								}
																																							},
																																							_1: {
																																								ctor: '::',
																																								_0: {
																																									ctor: '_Tuple2',
																																									_0: _elm_node$core$Node_Error$NamedTypeFile,
																																									_1: {
																																										ctor: '::',
																																										_0: 'EISNAM',
																																										_1: {ctor: '[]'}
																																									}
																																								},
																																								_1: {
																																									ctor: '::',
																																									_0: {
																																										ctor: '_Tuple2',
																																										_0: _elm_node$core$Node_Error$KeyExpired,
																																										_1: {
																																											ctor: '::',
																																											_0: 'EKEYEXPIRED',
																																											_1: {ctor: '[]'}
																																										}
																																									},
																																									_1: {
																																										ctor: '::',
																																										_0: {
																																											ctor: '_Tuple2',
																																											_0: _elm_node$core$Node_Error$KeyRejected,
																																											_1: {
																																												ctor: '::',
																																												_0: 'EKEYREJECTED',
																																												_1: {ctor: '[]'}
																																											}
																																										},
																																										_1: {
																																											ctor: '::',
																																											_0: {
																																												ctor: '_Tuple2',
																																												_0: _elm_node$core$Node_Error$KeyRevoked,
																																												_1: {
																																													ctor: '::',
																																													_0: 'EKEYREVOKED',
																																													_1: {ctor: '[]'}
																																												}
																																											},
																																											_1: {
																																												ctor: '::',
																																												_0: {
																																													ctor: '_Tuple2',
																																													_0: _elm_node$core$Node_Error$Level2Halted,
																																													_1: {
																																														ctor: '::',
																																														_0: 'EL2HLT',
																																														_1: {ctor: '[]'}
																																													}
																																												},
																																												_1: {
																																													ctor: '::',
																																													_0: {
																																														ctor: '_Tuple2',
																																														_0: _elm_node$core$Node_Error$Level2NotSynchronized,
																																														_1: {
																																															ctor: '::',
																																															_0: 'EL2NSYNC',
																																															_1: {ctor: '[]'}
																																														}
																																													},
																																													_1: {
																																														ctor: '::',
																																														_0: {
																																															ctor: '_Tuple2',
																																															_0: _elm_node$core$Node_Error$Level3Halted,
																																															_1: {
																																																ctor: '::',
																																																_0: 'EL3HLT',
																																																_1: {
																																																	ctor: '::',
																																																	_0: 'EL3RST',
																																																	_1: {ctor: '[]'}
																																																}
																																															}
																																														},
																																														_1: {
																																															ctor: '::',
																																															_0: {
																																																ctor: '_Tuple2',
																																																_0: _elm_node$core$Node_Error$CannotAccessLibrary,
																																																_1: {
																																																	ctor: '::',
																																																	_0: 'ELIBACCESS',
																																																	_1: {ctor: '[]'}
																																																}
																																															},
																																															_1: {
																																																ctor: '::',
																																																_0: {
																																																	ctor: '_Tuple2',
																																																	_0: _elm_node$core$Node_Error$LibraryCorrupted,
																																																	_1: {
																																																		ctor: '::',
																																																		_0: 'ELIBBAD',
																																																		_1: {ctor: '[]'}
																																																	}
																																																},
																																																_1: {
																																																	ctor: '::',
																																																	_0: {
																																																		ctor: '_Tuple2',
																																																		_0: _elm_node$core$Node_Error$TooManyLibraries,
																																																		_1: {
																																																			ctor: '::',
																																																			_0: 'ELIBMAX',
																																																			_1: {ctor: '[]'}
																																																		}
																																																	},
																																																	_1: {
																																																		ctor: '::',
																																																		_0: {
																																																			ctor: '_Tuple2',
																																																			_0: _elm_node$core$Node_Error$LibSectionCorrupted,
																																																			_1: {
																																																				ctor: '::',
																																																				_0: 'ELIBSCN',
																																																				_1: {ctor: '[]'}
																																																			}
																																																		},
																																																		_1: {
																																																			ctor: '::',
																																																			_0: {
																																																				ctor: '_Tuple2',
																																																				_0: _elm_node$core$Node_Error$CannotExecuteLibrary,
																																																				_1: {
																																																					ctor: '::',
																																																					_0: 'ELIBEXEC',
																																																					_1: {ctor: '[]'}
																																																				}
																																																			},
																																																			_1: {
																																																				ctor: '::',
																																																				_0: {
																																																					ctor: '_Tuple2',
																																																					_0: _elm_node$core$Node_Error$TooManyLevelsOfSymbolicLinks,
																																																					_1: {
																																																						ctor: '::',
																																																						_0: 'ELOOP',
																																																						_1: {ctor: '[]'}
																																																					}
																																																				},
																																																				_1: {
																																																					ctor: '::',
																																																					_0: {
																																																						ctor: '_Tuple2',
																																																						_0: _elm_node$core$Node_Error$WrongMediumType,
																																																						_1: {
																																																							ctor: '::',
																																																							_0: 'EMEDIUMTYPE',
																																																							_1: {ctor: '[]'}
																																																						}
																																																					},
																																																					_1: {
																																																						ctor: '::',
																																																						_0: {
																																																							ctor: '_Tuple2',
																																																							_0: _elm_node$core$Node_Error$TooManyOpenFiles,
																																																							_1: {
																																																								ctor: '::',
																																																								_0: 'EMFILE',
																																																								_1: {
																																																									ctor: '::',
																																																									_0: 'ENFILE',
																																																									_1: {ctor: '[]'}
																																																								}
																																																							}
																																																						},
																																																						_1: {
																																																							ctor: '::',
																																																							_0: {
																																																								ctor: '_Tuple2',
																																																								_0: _elm_node$core$Node_Error$TooManyLinks,
																																																								_1: {
																																																									ctor: '::',
																																																									_0: 'EMLINK',
																																																									_1: {ctor: '[]'}
																																																								}
																																																							},
																																																							_1: {
																																																								ctor: '::',
																																																								_0: {
																																																									ctor: '_Tuple2',
																																																									_0: _elm_node$core$Node_Error$MessageTooLong,
																																																									_1: {
																																																										ctor: '::',
																																																										_0: 'EMSGSIZE',
																																																										_1: {ctor: '[]'}
																																																									}
																																																								},
																																																								_1: {
																																																									ctor: '::',
																																																									_0: {
																																																										ctor: '_Tuple2',
																																																										_0: _elm_node$core$Node_Error$MultihopAttempted,
																																																										_1: {
																																																											ctor: '::',
																																																											_0: 'EMULTIHOP',
																																																											_1: {ctor: '[]'}
																																																										}
																																																									},
																																																									_1: {
																																																										ctor: '::',
																																																										_0: {
																																																											ctor: '_Tuple2',
																																																											_0: _elm_node$core$Node_Error$FilenameTooLong,
																																																											_1: {
																																																												ctor: '::',
																																																												_0: 'ENAMETOOLONG',
																																																												_1: {ctor: '[]'}
																																																											}
																																																										},
																																																										_1: {
																																																											ctor: '::',
																																																											_0: {
																																																												ctor: '_Tuple2',
																																																												_0: _elm_node$core$Node_Error$NetworkDown,
																																																												_1: {
																																																													ctor: '::',
																																																													_0: 'ENETDOWN',
																																																													_1: {ctor: '[]'}
																																																												}
																																																											},
																																																											_1: {
																																																												ctor: '::',
																																																												_0: {
																																																													ctor: '_Tuple2',
																																																													_0: _elm_node$core$Node_Error$ConnectionAbortedByNetwork,
																																																													_1: {
																																																														ctor: '::',
																																																														_0: 'ENETRESET',
																																																														_1: {ctor: '[]'}
																																																													}
																																																												},
																																																												_1: {
																																																													ctor: '::',
																																																													_0: {
																																																														ctor: '_Tuple2',
																																																														_0: _elm_node$core$Node_Error$NetworkUnreachable,
																																																														_1: {
																																																															ctor: '::',
																																																															_0: 'ENETUNREACH',
																																																															_1: {ctor: '[]'}
																																																														}
																																																													},
																																																													_1: {
																																																														ctor: '::',
																																																														_0: {
																																																															ctor: '_Tuple2',
																																																															_0: _elm_node$core$Node_Error$NoBufferSpaceAvailable,
																																																															_1: {
																																																																ctor: '::',
																																																																_0: 'ENOBUFS',
																																																																_1: {ctor: '[]'}
																																																															}
																																																														},
																																																														_1: {
																																																															ctor: '::',
																																																															_0: {
																																																																ctor: '_Tuple2',
																																																																_0: _elm_node$core$Node_Error$NoDataAvailable,
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: 'ENODATA',
																																																																	_1: {ctor: '[]'}
																																																																}
																																																															},
																																																															_1: {
																																																																ctor: '::',
																																																																_0: {
																																																																	ctor: '_Tuple2',
																																																																	_0: _elm_node$core$Node_Error$NoDevice,
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: 'ENODEV',
																																																																		_1: {ctor: '[]'}
																																																																	}
																																																																},
																																																																_1: {
																																																																	ctor: '::',
																																																																	_0: {
																																																																		ctor: '_Tuple2',
																																																																		_0: _elm_node$core$Node_Error$NoSuchFileOrDirectory,
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: 'ENOENT',
																																																																			_1: {ctor: '[]'}
																																																																		}
																																																																	},
																																																																	_1: {
																																																																		ctor: '::',
																																																																		_0: {
																																																																			ctor: '_Tuple2',
																																																																			_0: _elm_node$core$Node_Error$ExecuteFormatError,
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: 'ENOEXEC',
																																																																				_1: {ctor: '[]'}
																																																																			}
																																																																		},
																																																																		_1: {
																																																																			ctor: '::',
																																																																			_0: {
																																																																				ctor: '_Tuple2',
																																																																				_0: _elm_node$core$Node_Error$RequiredKeyNotAvailable,
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: 'ENOKEY',
																																																																					_1: {ctor: '[]'}
																																																																				}
																																																																			},
																																																																			_1: {
																																																																				ctor: '::',
																																																																				_0: {
																																																																					ctor: '_Tuple2',
																																																																					_0: _elm_node$core$Node_Error$NoLocksAvailable,
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: 'ENOLCK',
																																																																						_1: {ctor: '[]'}
																																																																					}
																																																																				},
																																																																				_1: {
																																																																					ctor: '::',
																																																																					_0: {
																																																																						ctor: '_Tuple2',
																																																																						_0: _elm_node$core$Node_Error$NoLink,
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: 'ENOLINK',
																																																																							_1: {ctor: '[]'}
																																																																						}
																																																																					},
																																																																					_1: {
																																																																						ctor: '::',
																																																																						_0: {
																																																																							ctor: '_Tuple2',
																																																																							_0: _elm_node$core$Node_Error$NoMedium,
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: 'ENOMEDIUM',
																																																																								_1: {ctor: '[]'}
																																																																							}
																																																																						},
																																																																						_1: {
																																																																							ctor: '::',
																																																																							_0: {
																																																																								ctor: '_Tuple2',
																																																																								_0: _elm_node$core$Node_Error$NotEnoughSpace,
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: 'ENOMEM',
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: 'ENOSPC',
																																																																										_1: {ctor: '[]'}
																																																																									}
																																																																								}
																																																																							},
																																																																							_1: {
																																																																								ctor: '::',
																																																																								_0: {
																																																																									ctor: '_Tuple2',
																																																																									_0: _elm_node$core$Node_Error$NoMessage,
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: 'ENOMSG',
																																																																										_1: {ctor: '[]'}
																																																																									}
																																																																								},
																																																																								_1: {
																																																																									ctor: '::',
																																																																									_0: {
																																																																										ctor: '_Tuple2',
																																																																										_0: _elm_node$core$Node_Error$NotOnNetwork,
																																																																										_1: {
																																																																											ctor: '::',
																																																																											_0: 'ENONET',
																																																																											_1: {ctor: '[]'}
																																																																										}
																																																																									},
																																																																									_1: {
																																																																										ctor: '::',
																																																																										_0: {
																																																																											ctor: '_Tuple2',
																																																																											_0: _elm_node$core$Node_Error$PackageNotInstalled,
																																																																											_1: {
																																																																												ctor: '::',
																																																																												_0: 'ENOPKG',
																																																																												_1: {ctor: '[]'}
																																																																											}
																																																																										},
																																																																										_1: {
																																																																											ctor: '::',
																																																																											_0: {
																																																																												ctor: '_Tuple2',
																																																																												_0: _elm_node$core$Node_Error$ProtocolNotAvailable,
																																																																												_1: {
																																																																													ctor: '::',
																																																																													_0: 'ENOPROTOOPT',
																																																																													_1: {ctor: '[]'}
																																																																												}
																																																																											},
																																																																											_1: {
																																																																												ctor: '::',
																																																																												_0: {
																																																																													ctor: '_Tuple2',
																																																																													_0: _elm_node$core$Node_Error$NoStreamResources,
																																																																													_1: {
																																																																														ctor: '::',
																																																																														_0: 'ENOSR',
																																																																														_1: {ctor: '[]'}
																																																																													}
																																																																												},
																																																																												_1: {
																																																																													ctor: '::',
																																																																													_0: {
																																																																														ctor: '_Tuple2',
																																																																														_0: _elm_node$core$Node_Error$NotStream,
																																																																														_1: {
																																																																															ctor: '::',
																																																																															_0: 'ENOSTR',
																																																																															_1: {ctor: '[]'}
																																																																														}
																																																																													},
																																																																													_1: {
																																																																														ctor: '::',
																																																																														_0: {
																																																																															ctor: '_Tuple2',
																																																																															_0: _elm_node$core$Node_Error$FunctionNotImplemented,
																																																																															_1: {
																																																																																ctor: '::',
																																																																																_0: 'ENOSYS',
																																																																																_1: {ctor: '[]'}
																																																																															}
																																																																														},
																																																																														_1: {
																																																																															ctor: '::',
																																																																															_0: {
																																																																																ctor: '_Tuple2',
																																																																																_0: _elm_node$core$Node_Error$BlockDeviceRequired,
																																																																																_1: {
																																																																																	ctor: '::',
																																																																																	_0: 'ENOTBLK',
																																																																																	_1: {ctor: '[]'}
																																																																																}
																																																																															},
																																																																															_1: {
																																																																																ctor: '::',
																																																																																_0: {
																																																																																	ctor: '_Tuple2',
																																																																																	_0: _elm_node$core$Node_Error$SocketNotConnected,
																																																																																	_1: {
																																																																																		ctor: '::',
																																																																																		_0: 'ENOTCONN',
																																																																																		_1: {ctor: '[]'}
																																																																																	}
																																																																																},
																																																																																_1: {
																																																																																	ctor: '::',
																																																																																	_0: {
																																																																																		ctor: '_Tuple2',
																																																																																		_0: _elm_node$core$Node_Error$NotADirectory,
																																																																																		_1: {
																																																																																			ctor: '::',
																																																																																			_0: 'ENOTDIR',
																																																																																			_1: {ctor: '[]'}
																																																																																		}
																																																																																	},
																																																																																	_1: {
																																																																																		ctor: '::',
																																																																																		_0: {
																																																																																			ctor: '_Tuple2',
																																																																																			_0: _elm_node$core$Node_Error$DirectoryNotEmpty,
																																																																																			_1: {
																																																																																				ctor: '::',
																																																																																				_0: 'ENOTEMPTY',
																																																																																				_1: {ctor: '[]'}
																																																																																			}
																																																																																		},
																																																																																		_1: {
																																																																																			ctor: '::',
																																																																																			_0: {
																																																																																				ctor: '_Tuple2',
																																																																																				_0: _elm_node$core$Node_Error$NotSocket,
																																																																																				_1: {
																																																																																					ctor: '::',
																																																																																					_0: 'ENOTSOCKET',
																																																																																					_1: {ctor: '[]'}
																																																																																				}
																																																																																			},
																																																																																			_1: {
																																																																																				ctor: '::',
																																																																																				_0: {
																																																																																					ctor: '_Tuple2',
																																																																																					_0: _elm_node$core$Node_Error$OperationNotSupported,
																																																																																					_1: {
																																																																																						ctor: '::',
																																																																																						_0: 'ENOTSUP',
																																																																																						_1: {ctor: '[]'}
																																																																																					}
																																																																																				},
																																																																																				_1: {
																																																																																					ctor: '::',
																																																																																					_0: {
																																																																																						ctor: '_Tuple2',
																																																																																						_0: _elm_node$core$Node_Error$InappropriateIOControlOperation,
																																																																																						_1: {
																																																																																							ctor: '::',
																																																																																							_0: 'ENOTTY',
																																																																																							_1: {ctor: '[]'}
																																																																																						}
																																																																																					},
																																																																																					_1: {
																																																																																						ctor: '::',
																																																																																						_0: {
																																																																																							ctor: '_Tuple2',
																																																																																							_0: _elm_node$core$Node_Error$NameNotUniqueOnNetwork,
																																																																																							_1: {
																																																																																								ctor: '::',
																																																																																								_0: 'ENOTUNIQ',
																																																																																								_1: {ctor: '[]'}
																																																																																							}
																																																																																						},
																																																																																						_1: {
																																																																																							ctor: '::',
																																																																																							_0: {
																																																																																								ctor: '_Tuple2',
																																																																																								_0: _elm_node$core$Node_Error$NoDeviceOrAddress,
																																																																																								_1: {
																																																																																									ctor: '::',
																																																																																									_0: 'ENXIO',
																																																																																									_1: {ctor: '[]'}
																																																																																								}
																																																																																							},
																																																																																							_1: {
																																																																																								ctor: '::',
																																																																																								_0: {
																																																																																									ctor: '_Tuple2',
																																																																																									_0: _elm_node$core$Node_Error$OperationNotSupportedOnSocket,
																																																																																									_1: {
																																																																																										ctor: '::',
																																																																																										_0: 'EOPNOTSUPP',
																																																																																										_1: {ctor: '[]'}
																																																																																									}
																																																																																								},
																																																																																								_1: {
																																																																																									ctor: '::',
																																																																																									_0: {
																																																																																										ctor: '_Tuple2',
																																																																																										_0: _elm_node$core$Node_Error$ValueTooLarge,
																																																																																										_1: {
																																																																																											ctor: '::',
																																																																																											_0: 'EOVERFLOW',
																																																																																											_1: {ctor: '[]'}
																																																																																										}
																																																																																									},
																																																																																									_1: {
																																																																																										ctor: '::',
																																																																																										_0: {
																																																																																											ctor: '_Tuple2',
																																																																																											_0: _elm_node$core$Node_Error$OperationNotPermitted,
																																																																																											_1: {
																																																																																												ctor: '::',
																																																																																												_0: ' EPERM',
																																																																																												_1: {ctor: '[]'}
																																																																																											}
																																																																																										},
																																																																																										_1: {
																																																																																											ctor: '::',
																																																																																											_0: {
																																																																																												ctor: '_Tuple2',
																																																																																												_0: _elm_node$core$Node_Error$ProtocolFamilyNotAvailable,
																																																																																												_1: {
																																																																																													ctor: '::',
																																																																																													_0: 'EPFNOSUPPORT',
																																																																																													_1: {ctor: '[]'}
																																																																																												}
																																																																																											},
																																																																																											_1: {
																																																																																												ctor: '::',
																																																																																												_0: {
																																																																																													ctor: '_Tuple2',
																																																																																													_0: _elm_node$core$Node_Error$BrokenPipe,
																																																																																													_1: {
																																																																																														ctor: '::',
																																																																																														_0: 'EPIPE',
																																																																																														_1: {ctor: '[]'}
																																																																																													}
																																																																																												},
																																																																																												_1: {
																																																																																													ctor: '::',
																																																																																													_0: {
																																																																																														ctor: '_Tuple2',
																																																																																														_0: _elm_node$core$Node_Error$Protocol,
																																																																																														_1: {
																																																																																															ctor: '::',
																																																																																															_0: 'EPROTO',
																																																																																															_1: {ctor: '[]'}
																																																																																														}
																																																																																													},
																																																																																													_1: {
																																																																																														ctor: '::',
																																																																																														_0: {
																																																																																															ctor: '_Tuple2',
																																																																																															_0: _elm_node$core$Node_Error$ProtocolNotSupported,
																																																																																															_1: {
																																																																																																ctor: '::',
																																																																																																_0: 'EPROTONOSUPPORT',
																																																																																																_1: {ctor: '[]'}
																																																																																															}
																																																																																														},
																																																																																														_1: {
																																																																																															ctor: '::',
																																																																																															_0: {
																																																																																																ctor: '_Tuple2',
																																																																																																_0: _elm_node$core$Node_Error$WrongProtocolForSocket,
																																																																																																_1: {
																																																																																																	ctor: '::',
																																																																																																	_0: 'EPROTOTYPE',
																																																																																																	_1: {ctor: '[]'}
																																																																																																}
																																																																																															},
																																																																																															_1: {
																																																																																																ctor: '::',
																																																																																																_0: {
																																																																																																	ctor: '_Tuple2',
																																																																																																	_0: _elm_node$core$Node_Error$ResultTooLarge,
																																																																																																	_1: {
																																																																																																		ctor: '::',
																																																																																																		_0: 'ERANGE',
																																																																																																		_1: {ctor: '[]'}
																																																																																																	}
																																																																																																},
																																																																																																_1: {
																																																																																																	ctor: '::',
																																																																																																	_0: {
																																																																																																		ctor: '_Tuple2',
																																																																																																		_0: _elm_node$core$Node_Error$RemoteAddressChanged,
																																																																																																		_1: {
																																																																																																			ctor: '::',
																																																																																																			_0: 'EREMCHG',
																																																																																																			_1: {ctor: '[]'}
																																																																																																		}
																																																																																																	},
																																																																																																	_1: {
																																																																																																		ctor: '::',
																																																																																																		_0: {
																																																																																																			ctor: '_Tuple2',
																																																																																																			_0: _elm_node$core$Node_Error$ObjectRemote,
																																																																																																			_1: {
																																																																																																				ctor: '::',
																																																																																																				_0: 'EREMOTE',
																																																																																																				_1: {ctor: '[]'}
																																																																																																			}
																																																																																																		},
																																																																																																		_1: {
																																																																																																			ctor: '::',
																																																																																																			_0: {
																																																																																																				ctor: '_Tuple2',
																																																																																																				_0: _elm_node$core$Node_Error$RemoteIO,
																																																																																																				_1: {
																																																																																																					ctor: '::',
																																																																																																					_0: 'EREMOTEIO',
																																																																																																					_1: {ctor: '[]'}
																																																																																																				}
																																																																																																			},
																																																																																																			_1: {
																																																																																																				ctor: '::',
																																																																																																				_0: {
																																																																																																					ctor: '_Tuple2',
																																																																																																					_0: _elm_node$core$Node_Error$RestartCall,
																																																																																																					_1: {
																																																																																																						ctor: '::',
																																																																																																						_0: 'ERESTART',
																																																																																																						_1: {ctor: '[]'}
																																																																																																					}
																																																																																																				},
																																																																																																				_1: {
																																																																																																					ctor: '::',
																																																																																																					_0: {
																																																																																																						ctor: '_Tuple2',
																																																																																																						_0: _elm_node$core$Node_Error$ReadOnlyFileSystem,
																																																																																																						_1: {
																																																																																																							ctor: '::',
																																																																																																							_0: 'EROFS',
																																																																																																							_1: {ctor: '[]'}
																																																																																																						}
																																																																																																					},
																																																																																																					_1: {
																																																																																																						ctor: '::',
																																																																																																						_0: {
																																																																																																							ctor: '_Tuple2',
																																																																																																							_0: _elm_node$core$Node_Error$TransportEndpointShutdown,
																																																																																																							_1: {
																																																																																																								ctor: '::',
																																																																																																								_0: 'ESHUTDOWN',
																																																																																																								_1: {ctor: '[]'}
																																																																																																							}
																																																																																																						},
																																																																																																						_1: {
																																																																																																							ctor: '::',
																																																																																																							_0: {
																																																																																																								ctor: '_Tuple2',
																																																																																																								_0: _elm_node$core$Node_Error$InvalidSeek,
																																																																																																								_1: {
																																																																																																									ctor: '::',
																																																																																																									_0: 'ESPIPE',
																																																																																																									_1: {ctor: '[]'}
																																																																																																								}
																																																																																																							},
																																																																																																							_1: {
																																																																																																								ctor: '::',
																																																																																																								_0: {
																																																																																																									ctor: '_Tuple2',
																																																																																																									_0: _elm_node$core$Node_Error$SocketNotSupported,
																																																																																																									_1: {
																																																																																																										ctor: '::',
																																																																																																										_0: 'ESOCKTNOSUPPORT',
																																																																																																										_1: {ctor: '[]'}
																																																																																																									}
																																																																																																								},
																																																																																																								_1: {
																																																																																																									ctor: '::',
																																																																																																									_0: {
																																																																																																										ctor: '_Tuple2',
																																																																																																										_0: _elm_node$core$Node_Error$NoProcess,
																																																																																																										_1: {
																																																																																																											ctor: '::',
																																																																																																											_0: 'ESRCH',
																																																																																																											_1: {ctor: '[]'}
																																																																																																										}
																																																																																																									},
																																																																																																									_1: {
																																																																																																										ctor: '::',
																																																																																																										_0: {
																																																																																																											ctor: '_Tuple2',
																																																																																																											_0: _elm_node$core$Node_Error$StaleFileHandle,
																																																																																																											_1: {
																																																																																																												ctor: '::',
																																																																																																												_0: 'ESTALE',
																																																																																																												_1: {ctor: '[]'}
																																																																																																											}
																																																																																																										},
																																																																																																										_1: {
																																																																																																											ctor: '::',
																																																																																																											_0: {
																																																																																																												ctor: '_Tuple2',
																																																																																																												_0: _elm_node$core$Node_Error$StreamPipe,
																																																																																																												_1: {
																																																																																																													ctor: '::',
																																																																																																													_0: 'ESTRPIPE',
																																																																																																													_1: {ctor: '[]'}
																																																																																																												}
																																																																																																											},
																																																																																																											_1: {
																																																																																																												ctor: '::',
																																																																																																												_0: {
																																																																																																													ctor: '_Tuple2',
																																																																																																													_0: _elm_node$core$Node_Error$TimerExpired,
																																																																																																													_1: {
																																																																																																														ctor: '::',
																																																																																																														_0: 'ETIME',
																																																																																																														_1: {ctor: '[]'}
																																																																																																													}
																																																																																																												},
																																																																																																												_1: {
																																																																																																													ctor: '::',
																																																																																																													_0: {
																																																																																																														ctor: '_Tuple2',
																																																																																																														_0: _elm_node$core$Node_Error$ConnectionTimedOut,
																																																																																																														_1: {
																																																																																																															ctor: '::',
																																																																																																															_0: 'ETIMEOUT',
																																																																																																															_1: {ctor: '[]'}
																																																																																																														}
																																																																																																													},
																																																																																																													_1: {
																																																																																																														ctor: '::',
																																																																																																														_0: {
																																																																																																															ctor: '_Tuple2',
																																																																																																															_0: _elm_node$core$Node_Error$TextFileBusy,
																																																																																																															_1: {
																																																																																																																ctor: '::',
																																																																																																																_0: 'ETXTBUSY',
																																																																																																																_1: {ctor: '[]'}
																																																																																																															}
																																																																																																														},
																																																																																																														_1: {
																																																																																																															ctor: '::',
																																																																																																															_0: {
																																																																																																																ctor: '_Tuple2',
																																																																																																																_0: _elm_node$core$Node_Error$StructureNeedsCleaning,
																																																																																																																_1: {
																																																																																																																	ctor: '::',
																																																																																																																	_0: 'EUCLEAN',
																																																																																																																	_1: {ctor: '[]'}
																																																																																																																}
																																																																																																															},
																																																																																																															_1: {
																																																																																																																ctor: '::',
																																																																																																																_0: {
																																																																																																																	ctor: '_Tuple2',
																																																																																																																	_0: _elm_node$core$Node_Error$ProtocolDriverNotAttached,
																																																																																																																	_1: {
																																																																																																																		ctor: '::',
																																																																																																																		_0: 'EUNATCH',
																																																																																																																		_1: {ctor: '[]'}
																																																																																																																	}
																																																																																																																},
																																																																																																																_1: {
																																																																																																																	ctor: '::',
																																																																																																																	_0: {
																																																																																																																		ctor: '_Tuple2',
																																																																																																																		_0: _elm_node$core$Node_Error$TooManyUsers,
																																																																																																																		_1: {
																																																																																																																			ctor: '::',
																																																																																																																			_0: 'EUSERS',
																																																																																																																			_1: {ctor: '[]'}
																																																																																																																		}
																																																																																																																	},
																																																																																																																	_1: {
																																																																																																																		ctor: '::',
																																																																																																																		_0: {
																																																																																																																			ctor: '_Tuple2',
																																																																																																																			_0: _elm_node$core$Node_Error$OperationWouldBlock,
																																																																																																																			_1: {
																																																																																																																				ctor: '::',
																																																																																																																				_0: 'EWOULDBLOCK',
																																																																																																																				_1: {ctor: '[]'}
																																																																																																																			}
																																																																																																																		},
																																																																																																																		_1: {
																																																																																																																			ctor: '::',
																																																																																																																			_0: {
																																																																																																																				ctor: '_Tuple2',
																																																																																																																				_0: _elm_node$core$Node_Error$ImproperLink,
																																																																																																																				_1: {
																																																																																																																					ctor: '::',
																																																																																																																					_0: 'EXDEV',
																																																																																																																					_1: {ctor: '[]'}
																																																																																																																				}
																																																																																																																			},
																																																																																																																			_1: {
																																																																																																																				ctor: '::',
																																																																																																																				_0: {
																																																																																																																					ctor: '_Tuple2',
																																																																																																																					_0: _elm_node$core$Node_Error$ExchangeFull,
																																																																																																																					_1: {
																																																																																																																						ctor: '::',
																																																																																																																						_0: 'EXFULL',
																																																																																																																						_1: {ctor: '[]'}
																																																																																																																					}
																																																																																																																				},
																																																																																																																				_1: {ctor: '[]'}
																																																																																																																			}
																																																																																																																		}
																																																																																																																	}
																																																																																																																}
																																																																																																															}
																																																																																																														}
																																																																																																													}
																																																																																																												}
																																																																																																											}
																																																																																																										}
																																																																																																									}
																																																																																																								}
																																																																																																							}
																																																																																																						}
																																																																																																					}
																																																																																																				}
																																																																																																			}
																																																																																																		}
																																																																																																	}
																																																																																																}
																																																																																															}
																																																																																														}
																																																																																													}
																																																																																												}
																																																																																											}
																																																																																										}
																																																																																									}
																																																																																								}
																																																																																							}
																																																																																						}
																																																																																					}
																																																																																				}
																																																																																			}
																																																																																		}
																																																																																	}
																																																																																}
																																																																															}
																																																																														}
																																																																													}
																																																																												}
																																																																											}
																																																																										}
																																																																									}
																																																																								}
																																																																							}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _elm_node$core$Node_Error$codeFromString = function (string) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		_elm_lang$core$Result$Err(
			A2(_elm_lang$core$Basics_ops['++'], 'Unrecognized system error code: ', string)),
		A2(
			_elm_lang$core$Maybe$map,
			function (_p1) {
				return _elm_lang$core$Result$Ok(
					_elm_lang$core$Tuple$first(_p1));
			},
			A2(
				_elm_community$list_extra$List_Extra$find,
				function (_p2) {
					return A2(
						_elm_lang$core$List$member,
						string,
						_elm_lang$core$Tuple$second(_p2));
				},
				_elm_node$core$Node_Error$codeMap)));
};
var _elm_node$core$Node_Error$decoder = A2(
	_elm_lang$core$Json_Decode$andThen,
	function (code) {
		var _p3 = code;
		if (_p3.ctor === 'Just') {
			return A8(
				_elm_lang$core$Json_Decode$map7,
				F7(
					function (message, stack, code, syscall, path, address, port_) {
						return A2(
							_elm_node$core$Node_Error$SystemError,
							code,
							{message: message, stack: stack, syscall: syscall, path: path, address: address, port_: port_});
					}),
				A2(_elm_lang$core$Json_Decode$field, 'message', _elm_lang$core$Json_Decode$string),
				A2(_elm_lang$core$Json_Decode$field, 'stack', _elm_lang$core$Json_Decode$string),
				A2(
					_elm_lang$core$Json_Decode$field,
					'code',
					A2(
						_elm_lang$core$Json_Decode$andThen,
						function (_p4) {
							return _elm_community$json_extra$Json_Decode_Extra$fromResult(
								_elm_node$core$Node_Error$codeFromString(_p4));
						},
						_elm_lang$core$Json_Decode$string)),
				A2(_elm_lang$core$Json_Decode$field, 'syscall', _elm_lang$core$Json_Decode$string),
				_elm_lang$core$Json_Decode$maybe(
					A2(_elm_lang$core$Json_Decode$field, 'path', _elm_lang$core$Json_Decode$string)),
				_elm_lang$core$Json_Decode$maybe(
					A2(_elm_lang$core$Json_Decode$field, 'address', _elm_lang$core$Json_Decode$string)),
				_elm_lang$core$Json_Decode$maybe(
					A2(_elm_lang$core$Json_Decode$field, 'port', _elm_lang$core$Json_Decode$string)));
		} else {
			return A3(
				_elm_lang$core$Json_Decode$map2,
				_elm_node$core$Node_Error$Error,
				A2(_elm_lang$core$Json_Decode$field, 'message', _elm_lang$core$Json_Decode$string),
				A2(_elm_lang$core$Json_Decode$field, 'stack', _elm_lang$core$Json_Decode$string));
		}
	},
	_elm_lang$core$Json_Decode$maybe(
		A2(_elm_lang$core$Json_Decode$field, 'code', _elm_lang$core$Json_Decode$string)));
var _elm_node$core$Node_Error$fromValue = function (value) {
	return A2(
		_elm_community$result_extra$Result_Extra$extract,
		function (error) {
			return A2(
				_elm_node$core$Node_Error$Error,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Decoding Error: ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						error,
						A2(
							_elm_lang$core$Basics_ops['++'],
							' value failed: ',
							_elm_lang$core$Basics$toString(value)))),
				error);
		},
		A2(_elm_lang$core$Json_Decode$decodeValue, _elm_node$core$Node_Error$decoder, value));
};

var _elm_node$core$Node_Buffer$toString = F2(
	function (encoding, data) {
		return A2(
			_elm_lang$core$Result$mapError,
			_elm_node$core$Node_Error$fromValue,
			A2(
				_elm_node$core$Node_Buffer_LowLevel$toString,
				_elm_node$core$Node_Encoding$toString(encoding),
				data));
	});
var _elm_node$core$Node_Buffer$fromString = F2(
	function (encoding, data) {
		return A2(
			_elm_lang$core$Result$mapError,
			_elm_node$core$Node_Error$fromValue,
			A2(
				_elm_node$core$Node_Buffer_LowLevel$fromString,
				_elm_node$core$Node_Encoding$toString(encoding),
				data));
	});

var _elm_node$core$Node_FileSystem_LowLevel$makeSymlink = _elm_node$core$Native_FileSystem.makeSymlink;
var _elm_node$core$Node_FileSystem_LowLevel$isSymlink = _elm_node$core$Native_FileSystem.isSymlink;
var _elm_node$core$Node_FileSystem_LowLevel$rename = _elm_node$core$Native_FileSystem.rename;
var _elm_node$core$Node_FileSystem_LowLevel$mkdirp = _elm_node$core$Native_FileSystem.mkdirp;
var _elm_node$core$Node_FileSystem_LowLevel$exists = _elm_node$core$Native_FileSystem.exists;
var _elm_node$core$Node_FileSystem_LowLevel$writeFileFromBuffer = _elm_node$core$Native_FileSystem.writeFileFromBuffer;
var _elm_node$core$Node_FileSystem_LowLevel$writeFileFromString = _elm_node$core$Native_FileSystem.writeFileFromString;
var _elm_node$core$Node_FileSystem_LowLevel$remove = _elm_node$core$Native_FileSystem.remove;
var _elm_node$core$Node_FileSystem_LowLevel$readFileAsBuffer = _elm_node$core$Native_FileSystem.readFileAsBuffer;
var _elm_node$core$Node_FileSystem_LowLevel$readFileAsString = _elm_node$core$Native_FileSystem.readFileAsString;
var _elm_node$core$Node_FileSystem_LowLevel$copy = _elm_node$core$Native_FileSystem.copy;

var _elm_node$core$Node_FileSystem$makeSymlink = F3(
	function (target, path, type_) {
		return A2(
			_elm_lang$core$Task$mapError,
			_elm_node$core$Node_Error$fromValue,
			A3(_elm_node$core$Node_FileSystem_LowLevel$makeSymlink, target, path, type_));
	});
var _elm_node$core$Node_FileSystem$isSymlink = function (path) {
	return A2(
		_elm_lang$core$Task$mapError,
		_elm_node$core$Node_Error$fromValue,
		_elm_node$core$Node_FileSystem_LowLevel$isSymlink(path));
};
var _elm_node$core$Node_FileSystem$rename = F2(
	function (oldPath, newPath) {
		return A2(
			_elm_lang$core$Task$mapError,
			_elm_node$core$Node_Error$fromValue,
			A2(_elm_node$core$Node_FileSystem_LowLevel$rename, oldPath, newPath));
	});
var _elm_node$core$Node_FileSystem$mkdirp = function (path) {
	return A2(
		_elm_lang$core$Task$mapError,
		_elm_node$core$Node_Error$fromValue,
		_elm_node$core$Node_FileSystem_LowLevel$mkdirp(path));
};
var _elm_node$core$Node_FileSystem$exists = function (path) {
	return A2(
		_elm_lang$core$Task$mapError,
		_elm_node$core$Node_Error$fromValue,
		_elm_node$core$Node_FileSystem_LowLevel$exists(path));
};
var _elm_node$core$Node_FileSystem$writeFileFromBuffer = F3(
	function (filename, mode, data) {
		return A2(
			_elm_lang$core$Task$mapError,
			_elm_node$core$Node_Error$fromValue,
			A3(_elm_node$core$Node_FileSystem_LowLevel$writeFileFromBuffer, filename, mode, data));
	});
var _elm_node$core$Node_FileSystem$writeFileFromString = F4(
	function (filename, mode, encoding, data) {
		return A2(
			_elm_lang$core$Task$mapError,
			_elm_node$core$Node_Error$fromValue,
			A4(
				_elm_node$core$Node_FileSystem_LowLevel$writeFileFromString,
				filename,
				mode,
				_elm_node$core$Node_Encoding$toString(encoding),
				data));
	});
var _elm_node$core$Node_FileSystem$defaultMode = '666';
var _elm_node$core$Node_FileSystem$writeFile = F2(
	function (filename, data) {
		return A2(
			_elm_lang$core$Task$mapError,
			_elm_node$core$Node_Error$fromValue,
			A3(_elm_node$core$Node_FileSystem_LowLevel$writeFileFromBuffer, filename, _elm_node$core$Node_FileSystem$defaultMode, data));
	});
var _elm_node$core$Node_FileSystem$remove = function (filename) {
	return A2(
		_elm_lang$core$Task$mapError,
		_elm_node$core$Node_Error$fromValue,
		_elm_node$core$Node_FileSystem_LowLevel$remove(filename));
};
var _elm_node$core$Node_FileSystem$readFileAsString = F2(
	function (filename, encoding) {
		return A2(
			_elm_lang$core$Task$mapError,
			_elm_node$core$Node_Error$fromValue,
			A2(
				_elm_node$core$Node_FileSystem_LowLevel$readFileAsString,
				filename,
				_elm_node$core$Node_Encoding$toString(encoding)));
	});
var _elm_node$core$Node_FileSystem$readFile = function (filename) {
	return A2(
		_elm_lang$core$Task$mapError,
		_elm_node$core$Node_Error$fromValue,
		_elm_node$core$Node_FileSystem_LowLevel$readFileAsBuffer(filename));
};
var _elm_node$core$Node_FileSystem$copy = F3(
	function (overwrite, to, from) {
		var decode = _elm_lang$core$Json_Decode$decodeValue(
			A3(
				_elm_lang$core$Json_Decode$map2,
				F2(
					function (errors, files) {
						return A3(
							_elm_lang$core$List$foldl,
							F2(
								function (filename, results) {
									var error = A2(
										_elm_community$list_extra$List_Extra$find,
										function (_p0) {
											return A2(
												_elm_lang$core$String$contains,
												filename,
												_elm_node$core$Node_Error$message(_p0));
										},
										errors);
									var result = A2(
										_elm_lang$core$Maybe$withDefault,
										_elm_lang$core$Result$Ok(
											{ctor: '_Tuple0'}),
										A2(_elm_lang$core$Maybe$map, _elm_lang$core$Result$Err, error));
									return A3(_elm_lang$core$Dict$insert, filename, result, results);
								}),
							_elm_lang$core$Dict$empty,
							files);
					}),
				A2(
					_elm_lang$core$Json_Decode$field,
					'errors',
					_elm_lang$core$Json_Decode$list(_elm_node$core$Node_Error$decoder)),
				A2(
					_elm_lang$core$Json_Decode$field,
					'files',
					_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string))));
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p1) {
				return A3(
					_elm_community$result_extra$Result_Extra$unpack,
					function (_p2) {
						return _elm_lang$core$Task$fail(
							A2(_elm_node$core$Node_Error$Error, 'FileSystem', _p2));
					},
					_elm_lang$core$Task$succeed,
					decode(_p1));
			},
			A2(
				_elm_lang$core$Task$mapError,
				_elm_node$core$Node_Error$fromValue,
				A3(_elm_node$core$Node_FileSystem_LowLevel$copy, overwrite, to, from)));
	});
var _elm_node$core$Node_FileSystem$defaultEncoding = _elm_node$core$Node_Encoding$Utf8;

var _panosoft$elm_string_utils$Native_StringUtils = function() {
	function isString(v) {
        return typeof v == 'string' || v instanceof String
    }

    function nopToString(v) {
        return v;
    }
	return {
        isString: isString,
        nopToString : nopToString
    }
}();

var _panosoft$elm_string_utils$StringUtils$nopToString = _panosoft$elm_string_utils$Native_StringUtils.nopToString;
var _panosoft$elm_string_utils$StringUtils$isString = _panosoft$elm_string_utils$Native_StringUtils.isString;
var _panosoft$elm_string_utils$StringUtils$cleanElmString = function (string) {
	return A4(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$All,
		_elm_lang$core$Regex$regex('†t'),
		_elm_lang$core$Basics$always('\\t'),
		A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_elm_lang$core$Regex$regex('†n'),
			_elm_lang$core$Basics$always('\\n'),
			A4(
				_elm_lang$core$Regex$replace,
				_elm_lang$core$Regex$All,
				_elm_lang$core$Regex$regex('\\\\\"'),
				_elm_lang$core$Basics$always('\"'),
				A4(
					_elm_lang$core$Regex$replace,
					_elm_lang$core$Regex$All,
					_elm_lang$core$Regex$regex('\\\\'),
					_elm_lang$core$Basics$always(''),
					A4(
						_elm_lang$core$Regex$replace,
						_elm_lang$core$Regex$All,
						_elm_lang$core$Regex$regex('\\\\t'),
						_elm_lang$core$Basics$always('†t'),
						A4(
							_elm_lang$core$Regex$replace,
							_elm_lang$core$Regex$All,
							_elm_lang$core$Regex$regex('\\\\n'),
							_elm_lang$core$Basics$always('†n'),
							string))))));
};
var _panosoft$elm_string_utils$StringUtils_ops = _panosoft$elm_string_utils$StringUtils_ops || {};
_panosoft$elm_string_utils$StringUtils_ops['+++'] = F2(
	function (a, b) {
		var asString = function (v) {
			var _p0 = _panosoft$elm_string_utils$Native_StringUtils.isString(v);
			if (_p0 === true) {
				return _panosoft$elm_string_utils$StringUtils$nopToString(v);
			} else {
				return _elm_lang$core$Basics$toString(v);
			}
		};
		return A2(
			_elm_lang$core$Basics_ops['++'],
			asString(a),
			asString(b));
	});
var _panosoft$elm_string_utils$StringUtils_ops = _panosoft$elm_string_utils$StringUtils_ops || {};
_panosoft$elm_string_utils$StringUtils_ops['+-+'] = F2(
	function (a, b) {
		return A2(
			_panosoft$elm_string_utils$StringUtils_ops['+++'],
			A2(_panosoft$elm_string_utils$StringUtils_ops['+++'], a, ' '),
			b);
	});
var _panosoft$elm_string_utils$StringUtils$concatWithSpaces = F3(
	function (count, a, b) {
		return A2(
			_panosoft$elm_string_utils$StringUtils_ops['+++'],
			A2(
				_panosoft$elm_string_utils$StringUtils_ops['+++'],
				a,
				A2(_elm_lang$core$String$repeat, count, ' ')),
			b);
	});

var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|??****>'] = F2(
	function (_p1, _p0) {
		var _p2 = _p1;
		var _p3 = _p0;
		var _p4 = {ctor: '_Tuple4', _0: _p2._0, _1: _p2._1, _2: _p2._2, _3: _p2._3};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				if (_p4._2.ctor === 'Ok') {
					if (_p4._3.ctor === 'Ok') {
						return _p3._4(
							{ctor: '_Tuple4', _0: _p4._0._0, _1: _p4._1._0, _2: _p4._2._0, _3: _p4._3._0});
					} else {
						return _p3._3(_p4._3._0);
					}
				} else {
					return _p3._2(_p4._2._0);
				}
			} else {
				return _p3._1(_p4._1._0);
			}
		} else {
			return _p3._0(_p4._0._0);
		}
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|??***>'] = F2(
	function (_p6, _p5) {
		var _p7 = _p6;
		var _p8 = _p5;
		var _p9 = {ctor: '_Tuple3', _0: _p7._0, _1: _p7._1, _2: _p7._2};
		if (_p9._0.ctor === 'Ok') {
			if (_p9._1.ctor === 'Ok') {
				if (_p9._2.ctor === 'Ok') {
					return _p8._3(
						{ctor: '_Tuple3', _0: _p9._0._0, _1: _p9._1._0, _2: _p9._2._0});
				} else {
					return _p8._2(_p9._2._0);
				}
			} else {
				return _p8._1(_p9._1._0);
			}
		} else {
			return _p8._0(_p9._0._0);
		}
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|??**>'] = F2(
	function (_p11, _p10) {
		var _p12 = _p11;
		var _p13 = _p10;
		var _p14 = {ctor: '_Tuple2', _0: _p12._0, _1: _p12._1};
		if (_p14._0.ctor === 'Ok') {
			if (_p14._1.ctor === 'Ok') {
				return _p13._2(
					{ctor: '_Tuple2', _0: _p14._0._0, _1: _p14._1._0});
			} else {
				return _p13._1(_p14._1._0);
			}
		} else {
			return _p13._0(_p14._0._0);
		}
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['??='] = F2(
	function (result, f) {
		var _p15 = result;
		if (_p15.ctor === 'Ok') {
			return _p15._0;
		} else {
			return f(_p15._0);
		}
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|??>'] = _elm_lang$core$Basics$flip(_elm_lang$core$Result$map);
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|??->'] = F2(
	function (r, _p16) {
		var _p17 = _p16;
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['??='],
			A2(_panosoft$elm_utils$Utils_Ops_ops['|??>'], r, _p17._1),
			_p17._0);
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|??-->'] = F2(
	function (rr, _p18) {
		var _p19 = _p18;
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['??='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|??>'],
				rr,
				function (r) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['|??->'],
						r,
						{ctor: '_Tuple2', _0: _p19._1, _1: _p19._2});
				}),
			_p19._0);
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|?!****>'] = F2(
	function (_p21, _p20) {
		var _p22 = _p21;
		var _p23 = _p20;
		var _p24 = {ctor: '_Tuple4', _0: _p22._0, _1: _p22._1, _2: _p22._2, _3: _p22._3};
		if (_p24._0.ctor === 'Just') {
			if (_p24._1.ctor === 'Just') {
				if (_p24._2.ctor === 'Just') {
					if (_p24._3.ctor === 'Just') {
						return _p23._4(
							{ctor: '_Tuple4', _0: _p24._0._0, _1: _p24._1._0, _2: _p24._2._0, _3: _p24._3._0});
					} else {
						return _p23._3(
							{ctor: '_Tuple0'});
					}
				} else {
					return _p23._2(
						{ctor: '_Tuple0'});
				}
			} else {
				return _p23._1(
					{ctor: '_Tuple0'});
			}
		} else {
			return _p23._0(
				{ctor: '_Tuple0'});
		}
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|?****>'] = F2(
	function (_p26, _p25) {
		var _p27 = _p26;
		var _p28 = _p25;
		var _p29 = {ctor: '_Tuple4', _0: _p27._0, _1: _p27._1, _2: _p27._2, _3: _p27._3};
		if (_p29._0.ctor === 'Just') {
			if (_p29._1.ctor === 'Just') {
				if (_p29._2.ctor === 'Just') {
					if (_p29._3.ctor === 'Just') {
						return _p28._4(
							{ctor: '_Tuple4', _0: _p29._0._0, _1: _p29._1._0, _2: _p29._2._0, _3: _p29._3._0});
					} else {
						return _p28._3;
					}
				} else {
					return _p28._2;
				}
			} else {
				return _p28._1;
			}
		} else {
			return _p28._0;
		}
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|?!***>'] = F2(
	function (_p31, _p30) {
		var _p32 = _p31;
		var _p33 = _p30;
		var _p34 = {ctor: '_Tuple3', _0: _p32._0, _1: _p32._1, _2: _p32._2};
		if (_p34._0.ctor === 'Just') {
			if (_p34._1.ctor === 'Just') {
				if (_p34._2.ctor === 'Just') {
					return _p33._3(
						{ctor: '_Tuple3', _0: _p34._0._0, _1: _p34._1._0, _2: _p34._2._0});
				} else {
					return _p33._2(
						{ctor: '_Tuple0'});
				}
			} else {
				return _p33._1(
					{ctor: '_Tuple0'});
			}
		} else {
			return _p33._0(
				{ctor: '_Tuple0'});
		}
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|?***>'] = F2(
	function (_p36, _p35) {
		var _p37 = _p36;
		var _p38 = _p35;
		var _p39 = {ctor: '_Tuple3', _0: _p37._0, _1: _p37._1, _2: _p37._2};
		if (_p39._0.ctor === 'Just') {
			if (_p39._1.ctor === 'Just') {
				if (_p39._2.ctor === 'Just') {
					return _p38._3(
						{ctor: '_Tuple3', _0: _p39._0._0, _1: _p39._1._0, _2: _p39._2._0});
				} else {
					return _p38._2;
				}
			} else {
				return _p38._1;
			}
		} else {
			return _p38._0;
		}
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|?!**>'] = F2(
	function (_p41, _p40) {
		var _p42 = _p41;
		var _p43 = _p40;
		var _p44 = {ctor: '_Tuple2', _0: _p42._0, _1: _p42._1};
		if (_p44._0.ctor === 'Just') {
			if (_p44._1.ctor === 'Just') {
				return _p43._2(
					{ctor: '_Tuple2', _0: _p44._0._0, _1: _p44._1._0});
			} else {
				return _p43._1(
					{ctor: '_Tuple0'});
			}
		} else {
			return _p43._0(
				{ctor: '_Tuple0'});
		}
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|?**>'] = F2(
	function (_p46, _p45) {
		var _p47 = _p46;
		var _p48 = _p45;
		var _p49 = {ctor: '_Tuple2', _0: _p47._0, _1: _p47._1};
		if (_p49._0.ctor === 'Just') {
			if (_p49._1.ctor === 'Just') {
				return _p48._2(
					{ctor: '_Tuple2', _0: _p49._0._0, _1: _p49._1._0});
			} else {
				return _p48._1;
			}
		} else {
			return _p48._0;
		}
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|?>'] = _elm_lang$core$Basics$flip(_elm_lang$core$Maybe$map);
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['?!='] = F2(
	function (maybe, lazy) {
		var _p50 = maybe;
		if (_p50.ctor === 'Just') {
			return _p50._0;
		} else {
			return lazy(
				{ctor: '_Tuple0'});
		}
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|?!->'] = F2(
	function (ma, _p51) {
		var _p52 = _p51;
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?!='],
			A2(_panosoft$elm_utils$Utils_Ops_ops['|?>'], ma, _p52._1),
			_p52._0);
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|?!-->'] = F2(
	function (mma, _p53) {
		var _p54 = _p53;
		var _p55 = _p54._0;
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?!='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|?>'],
				mma,
				function (ma) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?!='],
						A2(_panosoft$elm_utils$Utils_Ops_ops['|?>'], ma, _p54._1),
						_p55);
				}),
			_p55);
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|?!--->'] = F2(
	function (mmma, _p56) {
		var _p57 = _p56;
		var _p58 = _p57._0;
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?!='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|?>'],
				mmma,
				function (mma) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['|?!-->'],
						mma,
						{ctor: '_Tuple2', _0: _p58, _1: _p57._1});
				}),
			_p58);
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['?='] = _elm_lang$core$Basics$flip(_elm_lang$core$Maybe$withDefault);
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|?->'] = F2(
	function (ma, _p59) {
		var _p60 = _p59;
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?='],
			A2(_panosoft$elm_utils$Utils_Ops_ops['|?>'], ma, _p60._1),
			_p60._0);
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|?-->'] = F2(
	function (mma, _p61) {
		var _p62 = _p61;
		var _p63 = _p62._0;
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|?>'],
				mma,
				function (ma) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?='],
						A2(_panosoft$elm_utils$Utils_Ops_ops['|?>'], ma, _p62._1),
						_p63);
				}),
			_p63);
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['|?--->'] = F2(
	function (mmma, _p64) {
		var _p65 = _p64;
		var _p66 = _p65._0;
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|?>'],
				mmma,
				function (mma) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['|?-->'],
						mma,
						{ctor: '_Tuple2', _0: _p66, _1: _p65._1});
				}),
			_p66);
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['?!'] = F2(
	function (bool, _p67) {
		var _p68 = _p67;
		return bool ? _p68._0(
			{ctor: '_Tuple0'}) : _p68._1(
			{ctor: '_Tuple0'});
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['?'] = F2(
	function (bool, _p69) {
		var _p70 = _p69;
		return bool ? _p70._0 : _p70._1;
	});
var _panosoft$elm_utils$Utils_Ops_ops = _panosoft$elm_utils$Utils_Ops_ops || {};
_panosoft$elm_utils$Utils_Ops_ops['!!'] = F2(
	function (list, index) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?'],
			_elm_lang$core$Native_Utils.eq(
				list,
				{ctor: '[]'}),
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Maybe$Nothing,
				_1: _elm_lang$core$List$head(
					A2(_elm_lang$core$List$drop, index, list))
			});
	});

var _panosoft$elm_utils$Utils_Dict$zip = F2(
	function (keys, values) {
		var toList = F3(
			function (keys, values, list) {
				toList:
				while (true) {
					var _p0 = keys;
					if (_p0.ctor === '[]') {
						return list;
					} else {
						var _p1 = values;
						if (_p1.ctor === '[]') {
							return list;
						} else {
							var _v2 = _p0._1,
								_v3 = _p1._1,
								_v4 = {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: _p0._0, _1: _p1._0},
								_1: list
							};
							keys = _v2;
							values = _v3;
							list = _v4;
							continue toList;
						}
					}
				}
			});
		return _elm_lang$core$Dict$fromList(
			A3(
				toList,
				keys,
				values,
				{ctor: '[]'}));
	});
var _panosoft$elm_utils$Utils_Dict$swap = function (dict) {
	return function (newDict) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?'],
			_elm_lang$core$Native_Utils.eq(
				_elm_lang$core$Dict$size(newDict),
				_elm_lang$core$Dict$size(dict)),
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Result$Ok(newDict),
				_1: _elm_lang$core$Result$Err('Values are not unique')
			});
	}(
		_elm_lang$core$Dict$fromList(
			A2(
				_elm_lang$core$List$map,
				function (_p2) {
					var _p3 = _p2;
					return {ctor: '_Tuple2', _0: _p3._1, _1: _p3._0};
				},
				_elm_lang$core$Dict$toList(dict))));
};

var _panosoft$elm_utils$Utils_Regex$parametricReplacer = function ($new) {
	var asStrings = _elm_lang$core$List$map(
		_elm_lang$core$Maybe$withDefault(''));
	var replaceParam = F2(
		function (match, subMatch) {
			return _elm_lang$core$Native_Utils.eq(
				A2(_elm_lang$core$String$left, 2, match),
				'$$') ? A2(_elm_lang$core$String$dropLeft, 1, match) : subMatch;
		});
	var paramRegex = function (index) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'\\$\\$?',
			_elm_lang$core$Basics$toString(index));
	};
	var replace = F3(
		function (index, subMatch, $new) {
			return A4(
				_elm_lang$core$Regex$replace,
				_elm_lang$core$Regex$All,
				_elm_lang$core$Regex$regex(
					paramRegex(index)),
				function (m) {
					return A2(replaceParam, m.match, subMatch);
				},
				$new);
		});
	var replaceSubmatchesInNew = A2(
		_elm_lang$core$List$foldl,
		F2(
			function (subMatch, state) {
				return _elm_lang$core$Native_Utils.update(
					state,
					{
						$new: A3(replace, state.index, subMatch, state.$new),
						index: state.index + 1
					});
			}),
		{$new: $new, index: 1});
	return function (m) {
		return function (_) {
			return _.$new;
		}(
			replaceSubmatchesInNew(
				asStrings(m.submatches)));
	};
};
var _panosoft$elm_utils$Utils_Regex$replace = F4(
	function (howMany, r, replacer, old) {
		return A4(
			_elm_lang$core$Regex$replace,
			howMany,
			_elm_lang$core$Regex$regex(r),
			replacer,
			old);
	});
var _panosoft$elm_utils$Utils_Regex$simpleReplacer = F2(
	function ($new, _p0) {
		return $new;
	});
var _panosoft$elm_utils$Utils_Regex$replaceSimple = F4(
	function (howMany, r, $new, old) {
		return A4(
			_panosoft$elm_utils$Utils_Regex$replace,
			howMany,
			r,
			_panosoft$elm_utils$Utils_Regex$simpleReplacer($new),
			old);
	});
var _panosoft$elm_utils$Utils_Regex$replaceAll = _panosoft$elm_utils$Utils_Regex$replaceSimple(_elm_lang$core$Regex$All);
var _panosoft$elm_utils$Utils_Regex$replaceFirst = _panosoft$elm_utils$Utils_Regex$replaceSimple(
	_elm_lang$core$Regex$AtMost(1));

var _panosoft$elm_utils$Utils_Match$extract4 = function (match) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['|?****>'],
		{
			ctor: '_Tuple4',
			_0: A2(_panosoft$elm_utils$Utils_Ops_ops['!!'], match.submatches, 0),
			_1: A2(_panosoft$elm_utils$Utils_Ops_ops['!!'], match.submatches, 1),
			_2: A2(_panosoft$elm_utils$Utils_Ops_ops['!!'], match.submatches, 2),
			_3: A2(_panosoft$elm_utils$Utils_Ops_ops['!!'], match.submatches, 3)
		},
		{ctor: '_Tuple5', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing, _2: _elm_lang$core$Maybe$Nothing, _3: _elm_lang$core$Maybe$Nothing, _4: _elm_lang$core$Maybe$Just});
};
var _panosoft$elm_utils$Utils_Match$getSubmatches4 = function (match) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
		_panosoft$elm_utils$Utils_Match$extract4(match),
		{
			ctor: '_Tuple2',
			_0: function (_p0) {
				return _elm_lang$core$Native_Utils.crash(
					'Utils.Match',
					{
						start: {line: 133, column: 21},
						end: {line: 133, column: 32}
					})('missing submatches');
			},
			_1: A2(
				_elm_lang$core$Basics$flip,
				F2(
					function (x, y) {
						return A2(_panosoft$elm_utils$Utils_Ops_ops['|?!****>'], x, y);
					}),
				{
					ctor: '_Tuple5',
					_0: function (_p1) {
						return _elm_lang$core$Native_Utils.crash(
							'Utils.Match',
							{
								start: {line: 135, column: 25},
								end: {line: 135, column: 36}
							})('missing first');
					},
					_1: function (_p2) {
						return _elm_lang$core$Native_Utils.crash(
							'Utils.Match',
							{
								start: {line: 136, column: 25},
								end: {line: 136, column: 36}
							})('missing second');
					},
					_2: function (_p3) {
						return _elm_lang$core$Native_Utils.crash(
							'Utils.Match',
							{
								start: {line: 137, column: 25},
								end: {line: 137, column: 36}
							})('missing third');
					},
					_3: function (_p4) {
						return _elm_lang$core$Native_Utils.crash(
							'Utils.Match',
							{
								start: {line: 138, column: 25},
								end: {line: 138, column: 36}
							})('missing fourth');
					},
					_4: _elm_lang$core$Basics$identity
				})
		});
};
var _panosoft$elm_utils$Utils_Match$extract3 = function (match) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['|?***>'],
		{
			ctor: '_Tuple3',
			_0: A2(_panosoft$elm_utils$Utils_Ops_ops['!!'], match.submatches, 0),
			_1: A2(_panosoft$elm_utils$Utils_Ops_ops['!!'], match.submatches, 1),
			_2: A2(_panosoft$elm_utils$Utils_Ops_ops['!!'], match.submatches, 2)
		},
		{ctor: '_Tuple4', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing, _2: _elm_lang$core$Maybe$Nothing, _3: _elm_lang$core$Maybe$Just});
};
var _panosoft$elm_utils$Utils_Match$getSubmatches3 = function (match) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
		_panosoft$elm_utils$Utils_Match$extract3(match),
		{
			ctor: '_Tuple2',
			_0: function (_p5) {
				return _elm_lang$core$Native_Utils.crash(
					'Utils.Match',
					{
						start: {line: 117, column: 21},
						end: {line: 117, column: 32}
					})('missing submatches');
			},
			_1: A2(
				_elm_lang$core$Basics$flip,
				F2(
					function (x, y) {
						return A2(_panosoft$elm_utils$Utils_Ops_ops['|?!***>'], x, y);
					}),
				{
					ctor: '_Tuple4',
					_0: function (_p6) {
						return _elm_lang$core$Native_Utils.crash(
							'Utils.Match',
							{
								start: {line: 119, column: 25},
								end: {line: 119, column: 36}
							})('missing first');
					},
					_1: function (_p7) {
						return _elm_lang$core$Native_Utils.crash(
							'Utils.Match',
							{
								start: {line: 120, column: 25},
								end: {line: 120, column: 36}
							})('missing second');
					},
					_2: function (_p8) {
						return _elm_lang$core$Native_Utils.crash(
							'Utils.Match',
							{
								start: {line: 121, column: 25},
								end: {line: 121, column: 36}
							})('missing third');
					},
					_3: _elm_lang$core$Basics$identity
				})
		});
};
var _panosoft$elm_utils$Utils_Match$extract2 = function (match) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['|?**>'],
		{
			ctor: '_Tuple2',
			_0: A2(_panosoft$elm_utils$Utils_Ops_ops['!!'], match.submatches, 0),
			_1: A2(_panosoft$elm_utils$Utils_Ops_ops['!!'], match.submatches, 1)
		},
		{ctor: '_Tuple3', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Nothing, _2: _elm_lang$core$Maybe$Just});
};
var _panosoft$elm_utils$Utils_Match$getSubmatches2 = function (match) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
		_panosoft$elm_utils$Utils_Match$extract2(match),
		{
			ctor: '_Tuple2',
			_0: function (_p9) {
				return _elm_lang$core$Native_Utils.crash(
					'Utils.Match',
					{
						start: {line: 102, column: 21},
						end: {line: 102, column: 32}
					})('missing submatcheses');
			},
			_1: A2(
				_elm_lang$core$Basics$flip,
				F2(
					function (x, y) {
						return A2(_panosoft$elm_utils$Utils_Ops_ops['|?!**>'], x, y);
					}),
				{
					ctor: '_Tuple3',
					_0: function (_p10) {
						return _elm_lang$core$Native_Utils.crash(
							'Utils.Match',
							{
								start: {line: 104, column: 25},
								end: {line: 104, column: 36}
							})('missing first');
					},
					_1: function (_p11) {
						return _elm_lang$core$Native_Utils.crash(
							'Utils.Match',
							{
								start: {line: 105, column: 25},
								end: {line: 105, column: 36}
							})('missing second');
					},
					_2: _elm_lang$core$Basics$identity
				})
		});
};
var _panosoft$elm_utils$Utils_Match$extract1 = function (match) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['|?->'],
		A2(_panosoft$elm_utils$Utils_Ops_ops['!!'], match.submatches, 0),
		{ctor: '_Tuple2', _0: _elm_lang$core$Maybe$Nothing, _1: _elm_lang$core$Maybe$Just});
};
var _panosoft$elm_utils$Utils_Match$getSubmatches1 = function (match) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
		_panosoft$elm_utils$Utils_Match$extract1(match),
		{
			ctor: '_Tuple2',
			_0: function (_p12) {
				return _elm_lang$core$Native_Utils.crash(
					'Utils.Match',
					{
						start: {line: 71, column: 21},
						end: {line: 71, column: 32}
					})('missing submatches');
			},
			_1: A2(
				_elm_lang$core$Basics$flip,
				F2(
					function (x, y) {
						return A2(_panosoft$elm_utils$Utils_Ops_ops['|?!->'], x, y);
					}),
				{
					ctor: '_Tuple2',
					_0: function (_p13) {
						return _elm_lang$core$Native_Utils.crash(
							'Utils.Match',
							{
								start: {line: 73, column: 25},
								end: {line: 73, column: 36}
							})('missing first');
					},
					_1: function (first) {
						return first;
					}
				})
		});
};

var _panosoft$elm_docs$Docs_Generator$space = function (number) {
	return A2(
		_elm_lang$core$String$join,
		'',
		A2(_elm_lang$core$List$repeat, number, ' '));
};
var _panosoft$elm_docs$Docs_Generator$tab = _panosoft$elm_docs$Docs_Generator$space(4);
var _panosoft$elm_docs$Docs_Generator$newLine = '  \n';
var _panosoft$elm_docs$Docs_Generator$caseToMarkdown = function (tag) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Tuple$first(tag),
		A2(
			_elm_lang$core$Basics_ops['++'],
			' ',
			A2(
				_elm_lang$core$String$join,
				' ',
				_elm_lang$core$Tuple$second(tag))));
};
var _panosoft$elm_docs$Docs_Generator$caseDecoder = A3(
	_elm_lang$core$Json_Decode$map2,
	F2(
		function (name, args) {
			return {ctor: '_Tuple2', _0: name, _1: args};
		}),
	A2(_elm_lang$core$Json_Decode$index, 0, _elm_lang$core$Json_Decode$string),
	A2(
		_elm_lang$core$Json_Decode$index,
		1,
		_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string)));
var _panosoft$elm_docs$Docs_Generator$docsRegex = _elm_lang$core$Regex$regex('\\@docs (.*)?,?');
var _panosoft$elm_docs$Docs_Generator$makeLink = function (_p0) {
	var _p1 = _p0;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'- [',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_p1._1,
			A2(
				_elm_lang$core$Basics_ops['++'],
				']',
				A2(
					_elm_lang$core$Basics_ops['++'],
					'(#',
					A2(_elm_lang$core$Basics_ops['++'], _p1._0, ')')))));
};
var _panosoft$elm_docs$Docs_Generator$makeTableOfContents = F2(
	function (dict, names) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['|??->'],
			_panosoft$elm_utils$Utils_Dict$swap(dict),
			{
				ctor: '_Tuple2',
				_0: function (_p2) {
					return _elm_lang$core$Native_Utils.crash(
						'Docs.Generator',
						{
							start: {line: 165, column: 21},
							end: {line: 165, column: 32}
						})('BUG: non-unique name');
				},
				_1: function (dict) {
					return A3(
						_elm_lang$core$Basics$flip,
						F2(
							function (x, y) {
								return A2(_elm_lang$core$Basics_ops['++'], x, y);
							}),
						'\n\n',
						A2(
							_elm_lang$core$String$join,
							'\n',
							A2(
								_elm_lang$core$List$map,
								_panosoft$elm_docs$Docs_Generator$makeLink,
								A2(
									_elm_lang$core$List$filterMap,
									function (name) {
										return A2(
											_panosoft$elm_utils$Utils_Ops_ops['|?->'],
											A2(_elm_lang$core$Dict$get, name, dict),
											{
												ctor: '_Tuple2',
												_0: _elm_lang$core$Maybe$Nothing,
												_1: function (link) {
													return _elm_lang$core$Maybe$Just(
														{ctor: '_Tuple2', _0: link, _1: name});
												}
											});
									},
									names))));
				}
			});
	});
var _panosoft$elm_docs$Docs_Generator$makeUnique = F3(
	function (dict, index, name) {
		return function (newName) {
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['|?->'],
				A3(_elm_lang$core$Basics$flip, _elm_lang$core$Dict$get, dict, newName),
				{
					ctor: '_Tuple2',
					_0: newName,
					_1: function (_p3) {
						return A3(_panosoft$elm_docs$Docs_Generator$makeUnique, dict, index + 1, name);
					}
				});
		}(
			A2(
				_elm_lang$core$Basics_ops['++'],
				name,
				A2(_panosoft$elm_string_utils$StringUtils_ops['+++'], '-', index)));
	});
var _panosoft$elm_docs$Docs_Generator$makeLinkName = F2(
	function (dict, name) {
		return function (linkName) {
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['|?->'],
				A3(_elm_lang$core$Basics$flip, _elm_lang$core$Dict$get, dict, linkName),
				{
					ctor: '_Tuple2',
					_0: linkName,
					_1: function (_p4) {
						return A3(_panosoft$elm_docs$Docs_Generator$makeUnique, dict, 1, linkName);
					}
				});
		}(
			A3(
				_panosoft$elm_utils$Utils_Regex$replaceAll,
				'[^a-zA-Z0-9- ]',
				'',
				_elm_lang$core$String$toLower(name)));
	});
var _panosoft$elm_docs$Docs_Generator$removeRedundantTypes = function (code) {
	return A4(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$All,
		_elm_lang$core$Regex$regex('(\\b\\w+\\b)\\.(\\b\\w+\\b)'),
		function (match) {
			return function (_p5) {
				var _p6 = _p5;
				var _p8 = _p6._1;
				var _p7 = _p6._0;
				return A2(
					_panosoft$elm_utils$Utils_Ops_ops['?'],
					_elm_lang$core$Native_Utils.eq(_p7, _p8),
					{
						ctor: '_Tuple2',
						_0: _p7,
						_1: A2(
							_elm_lang$core$Basics_ops['++'],
							_p7,
							A2(_elm_lang$core$Basics_ops['++'], '.', _p8))
					});
			}(
				_panosoft$elm_utils$Utils_Match$getSubmatches2(match));
		},
		code);
};
var _panosoft$elm_docs$Docs_Generator$operatorize = function (name) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['?'],
		A2(
			_elm_lang$core$Regex$contains,
			_elm_lang$core$Regex$regex('[a-z_A-Z]'),
			name),
		{
			ctor: '_Tuple2',
			_0: name,
			_1: A2(
				_elm_lang$core$Basics_ops['++'],
				'(',
				A2(_elm_lang$core$Basics_ops['++'], name, ')'))
		});
};
var _panosoft$elm_docs$Docs_Generator$elmCode = function (s) {
	return _panosoft$elm_docs$Docs_Generator$removeRedundantTypes(
		A2(
			_elm_lang$core$Basics_ops['++'],
			'```elm\n',
			A2(_elm_lang$core$Basics_ops['++'], s, '\n```')));
};
var _panosoft$elm_docs$Docs_Generator$definitionHeader = function (s) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'### ',
		A2(_elm_lang$core$Basics_ops['++'], s, '\n'));
};
var _panosoft$elm_docs$Docs_Generator$bold = function (s) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'**',
		A2(
			_elm_lang$core$Basics_ops['++'],
			A3(_panosoft$elm_utils$Utils_Regex$replaceAll, '\\*', '\\*', s),
			'**'));
};
var _panosoft$elm_docs$Docs_Generator$aliasSignature = function (alias_) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		function (_p9) {
			return _panosoft$elm_docs$Docs_Generator$definitionHeader(
				_panosoft$elm_docs$Docs_Generator$bold(_p9));
		}(
			A2(_elm_lang$core$Basics_ops['++'], 'type alias ', alias_.name)),
		_panosoft$elm_docs$Docs_Generator$elmCode(
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$Basics_ops['++'],
					'type alias ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						alias_.name,
						A2(
							_elm_lang$core$Basics_ops['++'],
							' ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								A2(_elm_lang$core$String$join, ' ', alias_.args),
								A2(_elm_lang$core$Basics_ops['++'], ' =', _panosoft$elm_docs$Docs_Generator$newLine))))),
				A2(_elm_lang$core$Basics_ops['++'], _panosoft$elm_docs$Docs_Generator$tab, alias_.type_))));
};
var _panosoft$elm_docs$Docs_Generator$aliasToMarkdown = function (alias_) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_panosoft$elm_docs$Docs_Generator$aliasSignature(alias_),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'\n\n',
			_elm_lang$core$String$trim(alias_.comment)));
};
var _panosoft$elm_docs$Docs_Generator$unionSignature = function (union) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		function (_p10) {
			return _panosoft$elm_docs$Docs_Generator$definitionHeader(
				_panosoft$elm_docs$Docs_Generator$bold(_p10));
		}(
			A2(_elm_lang$core$Basics_ops['++'], 'type ', union.name)),
		_panosoft$elm_docs$Docs_Generator$elmCode(
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$Basics_ops['++'],
					'type ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						union.name,
						A2(
							_elm_lang$core$Basics_ops['++'],
							' ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								A2(_elm_lang$core$String$join, ' ', union.args),
								_panosoft$elm_docs$Docs_Generator$newLine)))),
				A2(
					_elm_lang$core$Basics_ops['++'],
					_panosoft$elm_docs$Docs_Generator$tab,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'= ',
						A2(
							_elm_lang$core$String$join,
							A2(
								_elm_lang$core$Basics_ops['++'],
								_panosoft$elm_docs$Docs_Generator$newLine,
								A2(_elm_lang$core$Basics_ops['++'], _panosoft$elm_docs$Docs_Generator$tab, '| ')),
							A2(_elm_lang$core$List$map, _panosoft$elm_docs$Docs_Generator$caseToMarkdown, union.tags)))))));
};
var _panosoft$elm_docs$Docs_Generator$unionToMarkdown = function (union) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_panosoft$elm_docs$Docs_Generator$unionSignature(union),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'\n\n',
			_elm_lang$core$String$trim(union.comment)));
};
var _panosoft$elm_docs$Docs_Generator$valueSignature = function (value) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		function (_p11) {
			return _panosoft$elm_docs$Docs_Generator$definitionHeader(
				_panosoft$elm_docs$Docs_Generator$bold(_p11));
		}(
			_panosoft$elm_docs$Docs_Generator$operatorize(value.name)),
		_panosoft$elm_docs$Docs_Generator$elmCode(
			A2(
				_elm_lang$core$Basics_ops['++'],
				_panosoft$elm_docs$Docs_Generator$operatorize(value.name),
				A2(_elm_lang$core$Basics_ops['++'], ' : ', value.type_))));
};
var _panosoft$elm_docs$Docs_Generator$valueToMarkdown = function (value) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_panosoft$elm_docs$Docs_Generator$valueSignature(value),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'\n\n',
			_elm_lang$core$String$trim(value.comment)));
};
var _panosoft$elm_docs$Docs_Generator$processComments = function (_p12) {
	var _p13 = _p12;
	var _p19 = _p13.comment;
	return function (pageDict) {
		return A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_panosoft$elm_docs$Docs_Generator$docsRegex,
			function (_p14) {
				return function (names) {
					return function (tableOfContents) {
						return A2(
							_elm_lang$core$Basics_ops['++'],
							tableOfContents,
							A2(
								_elm_lang$core$String$join,
								'\n\n---\n\n',
								A2(
									_elm_lang$core$List$map,
									function (name) {
										return function (name) {
											return A2(
												_elm_lang$core$Maybe$withDefault,
												A2(_elm_lang$core$Basics_ops['++'], name, ' : Not Found!!!'),
												_elm_lang$core$List$head(
													_elm_community$maybe_extra$Maybe_Extra$values(
														{
															ctor: '::',
															_0: A2(
																_elm_lang$core$Maybe$map,
																_panosoft$elm_docs$Docs_Generator$aliasToMarkdown,
																A2(
																	_elm_community$list_extra$List_Extra$find,
																	function (_p15) {
																		return A2(
																			F2(
																				function (x, y) {
																					return _elm_lang$core$Native_Utils.eq(x, y);
																				}),
																			name,
																			function (_) {
																				return _.name;
																			}(_p15));
																	},
																	_p13.aliases)),
															_1: {
																ctor: '::',
																_0: A2(
																	_elm_lang$core$Maybe$map,
																	_panosoft$elm_docs$Docs_Generator$unionToMarkdown,
																	A2(
																		_elm_community$list_extra$List_Extra$find,
																		function (_p16) {
																			return A2(
																				F2(
																					function (x, y) {
																						return _elm_lang$core$Native_Utils.eq(x, y);
																					}),
																				name,
																				function (_) {
																					return _.name;
																				}(_p16));
																		},
																		_p13.unions)),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$core$Maybe$map,
																		_panosoft$elm_docs$Docs_Generator$valueToMarkdown,
																		A2(
																			_elm_community$list_extra$List_Extra$find,
																			function (_p17) {
																				return A2(
																					F2(
																						function (x, y) {
																							return _elm_lang$core$Native_Utils.eq(x, y);
																						}),
																					name,
																					function (_) {
																						return _.name;
																					}(_p17));
																			},
																			_p13.values)),
																	_1: {ctor: '[]'}
																}
															}
														})));
										}(
											A3(
												_panosoft$elm_utils$Utils_Regex$replaceFirst,
												'\\)$',
												'',
												A3(_panosoft$elm_utils$Utils_Regex$replaceFirst, '^\\(', '', name)));
									},
									names)));
					}(
						A2(_panosoft$elm_docs$Docs_Generator$makeTableOfContents, pageDict, names));
				}(
					_elm_community$list_extra$List_Extra$unique(
						A3(
							_elm_lang$core$Regex$split,
							_elm_lang$core$Regex$All,
							_elm_lang$core$Regex$regex('\\s*,\\s*'),
							A4(
								_elm_lang$core$Regex$replace,
								_elm_lang$core$Regex$All,
								_elm_lang$core$Regex$regex('\\@docs\\s*'),
								_elm_lang$core$Basics$always(''),
								function (_) {
									return _.match;
								}(_p14)))));
			},
			_elm_lang$core$String$trim(_p19));
	}(
		A3(
			_elm_lang$core$List$foldl,
			F2(
				function (match, dict) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
						_panosoft$elm_utils$Utils_Match$extract1(match),
						{
							ctor: '_Tuple2',
							_0: function (_p18) {
								return _elm_lang$core$Native_Utils.crash(
									'Docs.Generator',
									{
										start: {line: 191, column: 33},
										end: {line: 191, column: 44}
									})('BUG: bad regex');
							},
							_1: A2(
								_elm_lang$core$Basics$flip,
								F2(
									function (x, y) {
										return A2(_panosoft$elm_utils$Utils_Ops_ops['|?->'], x, y);
									}),
								{
									ctor: '_Tuple2',
									_0: dict,
									_1: function (match) {
										return A3(
											_elm_lang$core$List$foldl,
											F2(
												function (name, dict) {
													return A3(
														_elm_lang$core$Dict$insert,
														A2(_panosoft$elm_docs$Docs_Generator$makeLinkName, dict, name),
														name,
														dict);
												}),
											dict,
											_elm_community$list_extra$List_Extra$unique(
												A3(
													_elm_lang$core$Regex$split,
													_elm_lang$core$Regex$All,
													_elm_lang$core$Regex$regex('\\s*,\\s*'),
													A4(
														_elm_lang$core$Regex$replace,
														_elm_lang$core$Regex$All,
														_elm_lang$core$Regex$regex('\\@docs\\s*'),
														_elm_lang$core$Basics$always(''),
														match))));
									}
								})
						});
				}),
			_elm_lang$core$Dict$empty,
			A3(
				_elm_lang$core$Regex$find,
				_elm_lang$core$Regex$All,
				_panosoft$elm_docs$Docs_Generator$docsRegex,
				_elm_lang$core$String$trim(_p19))));
};
var _panosoft$elm_docs$Docs_Generator$moduleToMarkdown = function (module_) {
	return {
		ctor: '_Tuple2',
		_0: module_.name,
		_1: A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$Basics_ops['++'],
				'# ',
				A2(_elm_lang$core$Basics_ops['++'], module_.name, '\n\n')),
			A2(
				_elm_lang$core$Basics_ops['++'],
				_panosoft$elm_docs$Docs_Generator$processComments(module_),
				'\n\n'))
	};
};
var _panosoft$elm_docs$Docs_Generator$Alias = F4(
	function (a, b, c, d) {
		return {name: a, comment: b, args: c, type_: d};
	});
var _panosoft$elm_docs$Docs_Generator$Union = F4(
	function (a, b, c, d) {
		return {name: a, comment: b, args: c, tags: d};
	});
var _panosoft$elm_docs$Docs_Generator$Value = F3(
	function (a, b, c) {
		return {name: a, comment: b, type_: c};
	});
var _panosoft$elm_docs$Docs_Generator$Module = F5(
	function (a, b, c, d, e) {
		return {name: a, comment: b, aliases: c, unions: d, values: e};
	});
var _panosoft$elm_docs$Docs_Generator$EditCodeBlockState = F3(
	function (a, b, c) {
		return {inBlock: a, comment: b, trailingBlankLineCount: c};
	});
var _panosoft$elm_docs$Docs_Generator$fixCodeBlocks = function (comment) {
	return function (_p20) {
		var _p21 = _p20;
		var _p25 = _p21._5;
		var _p24 = _p21._1;
		var _p23 = _p21._4;
		var _p22 = _p21._3;
		return A2(
			_elm_lang$core$String$join,
			'\n',
			_elm_lang$core$List$reverse(
				function (_) {
					return _.comment;
				}(
					A3(
						_elm_lang$core$List$foldl,
						F2(
							function (line, state) {
								return A2(
									_panosoft$elm_utils$Utils_Ops_ops['?'],
									_p21._2(line),
									{
										ctor: '_Tuple2',
										_0: A2(
											_panosoft$elm_utils$Utils_Ops_ops['?'],
											state.inBlock,
											{
												ctor: '_Tuple2',
												_0: _p22(
													_p23(state)),
												_1: state
											}),
										_1: A2(
											_panosoft$elm_utils$Utils_Ops_ops['?'],
											state.inBlock,
											{
												ctor: '_Tuple2',
												_0: A2(
													_panosoft$elm_utils$Utils_Ops_ops['?'],
													_p21._0(line),
													{
														ctor: '_Tuple2',
														_0: _elm_lang$core$Native_Utils.update(
															state,
															{trailingBlankLineCount: state.trailingBlankLineCount + 1}),
														_1: A2(
															_panosoft$elm_utils$Utils_Ops_ops['?'],
															_p24(line),
															{
																ctor: '_Tuple2',
																_0: function (state) {
																	return _elm_lang$core$Native_Utils.update(
																		state,
																		{
																			comment: {
																				ctor: '::',
																				_0: _p25(line),
																				_1: state.comment
																			}
																		});
																}(
																	_p22(state)),
																_1: function (state) {
																	return _elm_lang$core$Native_Utils.update(
																		state,
																		{
																			comment: {ctor: '::', _0: line, _1: state.comment}
																		});
																}(
																	_p23(
																		_p22(state)))
															})
													}),
												_1: A2(
													_panosoft$elm_utils$Utils_Ops_ops['?'],
													_p24(line),
													{
														ctor: '_Tuple2',
														_0: _elm_lang$core$Native_Utils.update(
															state,
															{
																inBlock: true,
																comment: {
																	ctor: '::',
																	_0: A2(
																		_elm_lang$core$Basics_ops['++'],
																		'```elm\n',
																		_p25(line)),
																	_1: state.comment
																},
																trailingBlankLineCount: 0
															}),
														_1: _elm_lang$core$Native_Utils.update(
															state,
															{
																comment: {ctor: '::', _0: line, _1: state.comment}
															})
													})
											})
									});
							}),
						A3(
							_panosoft$elm_docs$Docs_Generator$EditCodeBlockState,
							false,
							{ctor: '[]'},
							0),
						A3(
							_elm_lang$core$Basics$flip,
							_elm_lang$core$List$append,
							{
								ctor: '::',
								_0: '†',
								_1: {ctor: '[]'}
							},
							A2(_elm_lang$core$String$split, '\n', comment))))));
	}(
		{
			ctor: '_Tuple6',
			_0: function (_p26) {
				return A2(
					F2(
						function (x, y) {
							return _elm_lang$core$Native_Utils.eq(x, y);
						}),
					0,
					_elm_lang$core$String$length(_p26));
			},
			_1: _elm_lang$core$String$startsWith('    '),
			_2: F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				})('†'),
			_3: function (state) {
				return _elm_lang$core$Native_Utils.update(
					state,
					{
						comment: A2(
							_elm_lang$core$List$append,
							A2(_elm_lang$core$List$repeat, state.trailingBlankLineCount, ''),
							state.comment),
						trailingBlankLineCount: 0
					});
			},
			_4: function (state) {
				return _elm_lang$core$Native_Utils.update(
					state,
					{
						inBlock: false,
						comment: {ctor: '::', _0: '```\n', _1: state.comment}
					});
			},
			_5: _elm_lang$core$String$dropLeft(4)
		});
};
var _panosoft$elm_docs$Docs_Generator$aliasDecoder = A2(
	_elm_community$json_extra$Json_Decode_Extra$andMap,
	A2(_elm_lang$core$Json_Decode$field, 'type', _elm_lang$core$Json_Decode$string),
	A2(
		_elm_community$json_extra$Json_Decode_Extra$andMap,
		A2(
			_elm_lang$core$Json_Decode$field,
			'args',
			_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string)),
		A2(
			_elm_community$json_extra$Json_Decode_Extra$andMap,
			A2(
				_elm_lang$core$Json_Decode$andThen,
				function (_p27) {
					return _elm_lang$core$Json_Decode$succeed(
						_panosoft$elm_docs$Docs_Generator$fixCodeBlocks(_p27));
				},
				A2(_elm_lang$core$Json_Decode$field, 'comment', _elm_lang$core$Json_Decode$string)),
			A2(
				_elm_community$json_extra$Json_Decode_Extra$andMap,
				A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string),
				_elm_lang$core$Json_Decode$succeed(_panosoft$elm_docs$Docs_Generator$Alias)))));
var _panosoft$elm_docs$Docs_Generator$unionDecoder = A2(
	_elm_community$json_extra$Json_Decode_Extra$andMap,
	A2(
		_elm_lang$core$Json_Decode$field,
		'cases',
		_elm_lang$core$Json_Decode$list(_panosoft$elm_docs$Docs_Generator$caseDecoder)),
	A2(
		_elm_community$json_extra$Json_Decode_Extra$andMap,
		A2(
			_elm_lang$core$Json_Decode$field,
			'args',
			_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string)),
		A2(
			_elm_community$json_extra$Json_Decode_Extra$andMap,
			A2(
				_elm_lang$core$Json_Decode$andThen,
				function (_p28) {
					return _elm_lang$core$Json_Decode$succeed(
						_panosoft$elm_docs$Docs_Generator$fixCodeBlocks(_p28));
				},
				A2(_elm_lang$core$Json_Decode$field, 'comment', _elm_lang$core$Json_Decode$string)),
			A2(
				_elm_community$json_extra$Json_Decode_Extra$andMap,
				A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string),
				_elm_lang$core$Json_Decode$succeed(_panosoft$elm_docs$Docs_Generator$Union)))));
var _panosoft$elm_docs$Docs_Generator$valueDecoder = A2(
	_elm_community$json_extra$Json_Decode_Extra$andMap,
	A2(_elm_lang$core$Json_Decode$field, 'type', _elm_lang$core$Json_Decode$string),
	A2(
		_elm_community$json_extra$Json_Decode_Extra$andMap,
		A2(
			_elm_lang$core$Json_Decode$andThen,
			function (_p29) {
				return _elm_lang$core$Json_Decode$succeed(
					_panosoft$elm_docs$Docs_Generator$fixCodeBlocks(_p29));
			},
			A2(_elm_lang$core$Json_Decode$field, 'comment', _elm_lang$core$Json_Decode$string)),
		A2(
			_elm_community$json_extra$Json_Decode_Extra$andMap,
			A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string),
			_elm_lang$core$Json_Decode$succeed(_panosoft$elm_docs$Docs_Generator$Value))));
var _panosoft$elm_docs$Docs_Generator$moduleDecoder = A2(
	_elm_community$json_extra$Json_Decode_Extra$andMap,
	A2(
		_elm_lang$core$Json_Decode$field,
		'values',
		_elm_lang$core$Json_Decode$list(_panosoft$elm_docs$Docs_Generator$valueDecoder)),
	A2(
		_elm_community$json_extra$Json_Decode_Extra$andMap,
		A2(
			_elm_lang$core$Json_Decode$field,
			'types',
			_elm_lang$core$Json_Decode$list(_panosoft$elm_docs$Docs_Generator$unionDecoder)),
		A2(
			_elm_community$json_extra$Json_Decode_Extra$andMap,
			A2(
				_elm_lang$core$Json_Decode$field,
				'aliases',
				_elm_lang$core$Json_Decode$list(_panosoft$elm_docs$Docs_Generator$aliasDecoder)),
			A2(
				_elm_community$json_extra$Json_Decode_Extra$andMap,
				A2(
					_elm_lang$core$Json_Decode$andThen,
					function (_p30) {
						return _elm_lang$core$Json_Decode$succeed(
							_panosoft$elm_docs$Docs_Generator$fixCodeBlocks(_p30));
					},
					A2(_elm_lang$core$Json_Decode$field, 'comment', _elm_lang$core$Json_Decode$string)),
				A2(
					_elm_community$json_extra$Json_Decode_Extra$andMap,
					A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string),
					_elm_lang$core$Json_Decode$succeed(_panosoft$elm_docs$Docs_Generator$Module))))));
var _panosoft$elm_docs$Docs_Generator$generate = F3(
	function (pathSep, source, destination) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (files) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (_p31) {
						return _elm_lang$core$Task$succeed(
							{ctor: '_Tuple0'});
					},
					_elm_lang$core$Task$sequence(
						A2(
							_elm_lang$core$List$map,
							function (file) {
								return A2(
									_elm_lang$core$Task$mapError,
									function (_p32) {
										return 'File write error';
									},
									A4(
										_elm_node$core$Node_FileSystem$writeFileFromString,
										A2(
											_elm_lang$core$Basics_ops['++'],
											destination,
											A2(
												_elm_lang$core$Basics_ops['++'],
												pathSep,
												A2(
													_elm_lang$core$Basics_ops['++'],
													_elm_lang$core$Tuple$first(file),
													'.md'))),
										_elm_node$core$Node_FileSystem$defaultMode,
										_elm_node$core$Node_FileSystem$defaultEncoding,
										_elm_lang$core$Tuple$second(file)));
							},
							files)));
			},
			A2(
				_elm_lang$core$Task$andThen,
				function (content) {
					return A3(
						_elm_community$result_extra$Result_Extra$unpack,
						_elm_lang$core$Task$fail,
						_elm_lang$core$Task$succeed,
						A2(
							_elm_lang$core$Result$map,
							_elm_lang$core$List$map(_panosoft$elm_docs$Docs_Generator$moduleToMarkdown),
							A2(
								_elm_lang$core$Json_Decode$decodeString,
								_elm_lang$core$Json_Decode$list(_panosoft$elm_docs$Docs_Generator$moduleDecoder),
								content)));
				},
				A2(
					_elm_lang$core$Task$mapError,
					_elm_node$core$Node_Error$message,
					A2(_elm_node$core$Node_FileSystem$readFileAsString, source, _elm_node$core$Node_Encoding$Utf8))));
	});


const _panosoft$elm_grove$Native_Git = (_ => {
	const os = require('os');
	const path = require('path');
	const git = require('nodegit');
	const rm = require('rimraf');
	const mkdirp = require('mkdirp');

	/* global _elm_lang$core$Native_Scheduler:false _elm_lang$core$Native_List:false */
	const { nativeBinding, succeed, fail } = _elm_lang$core$Native_Scheduler;
	const { toArray, fromArray } = _elm_lang$core$Native_List;

	const failure = (callback, prefix) => error => callback(fail(prefix + ' (' + error + ')'));

	const clone = url => nativeBinding(callback => {
		try {
			const fail = failure(callback, 'Unable to clone: ' + url);
			const w = '[a-zA-Z0-9]';
			const hostnameRegex = `(?:(?:${w}|${w}[a-zA-Z0-9-]*${w})\.)*(?:${w}|${w}[A-Za-z0-9-]*${w})`;
			const repoRegex = '([a-zA-Z0-9-]+)/([a-zA-Z0-9-]+)';
			const sshRegex = RegExp(`^git@${hostnameRegex}:${repoRegex}(?:\.git)?$`, 'g');
			const httpRegex = RegExp(`^https?://${hostnameRegex}/${repoRegex}(?:\.git)?$`, 'g');
			let match = sshRegex.exec(url);
			if (!match)
				match = httpRegex.exec(url);
			if (match && match[1]) {
				const cloneLocation = path.join(os.tmpdir(), match[1], match[2]);
				rm(cloneLocation, err => {
					if (err)
						callback(fail(err));
					else {
						git.Clone(url, cloneLocation, {
							fetchOpts: {
								callbacks: {
									certificateCheck: _ => 1,
									credentials: (url, username) => git.Cred.sshKeyNew(username, path.join(os.homedir(), '.ssh', 'id_rsa.pub'), path.join(os.homedir(), '.ssh', 'id_rsa'), '')
								}
							}
						})
						.then(repo => callback(succeed({repo, url, cloneLocation})))
						.catch(fail);
					}
				});
			}
			else
				fail('Invalid url');
		}
		catch (error) { fail(error); }
	});

	const initRepo = path => nativeBinding(callback => {
		const fail = failure(callback, 'Unable to init repo at: ' + path);
		try {
			git.Repository.init(path, 0)
			.then(repo => callback(succeed({repo, url: 'file://' + path})))
			.catch(fail);
		}
		catch (error) { fail(error); }
	});

	const getRepo = path => nativeBinding(callback => {
		const fail = failure(callback, 'Unable get repo at: ' + path);
		try {
			git.Repository.open(path)
			.then(repo => callback(succeed({repo, url: 'file://' + path})))
			.catch(fail);
		}
		catch (error) { fail(error); }
	});

	const createLightweightTag = (Repo, tagName) => nativeBinding(callback => {
		const fail = failure(callback, 'Unable create tag: ' + tagName + ' for repo: ' + Repo.url);
		try {
			Repo.repo.getHeadCommit()
			.then(commit =>
				git.Tag.createLightweight(Repo.repo, tagName, commit, 0)
				.then(tag => callback(succeed(tag)))
				.catch(fail)
			)
			.catch(fail);
		}
		catch (error) { fail(error); }
	});

	const createAnnotatedTag = (Repo, tagName, message) => nativeBinding(callback => {
		const fail = failure(callback, 'Unable create tag: ' + tagName + ' for repo: ' + Repo.url);
		try {
			Repo.repo.getHeadCommit()
			.then(commit =>
				Repo.repo.createTag(commit.id().tostrS(), tagName, message)
				.then(tag => callback(succeed(tag)))
				.catch(fail)
			)
			.catch(fail);
		}
		catch (error) { fail(error); }
	});

	const getTags = Repo => nativeBinding(callback => {
		const fail = failure(callback, 'Unable get tags for repo: ' + Repo.url);
		try {
			git.Tag.list(Repo.repo)
			.then(list => callback(succeed(fromArray(list))))
			.catch(fail);
		}
		catch (error) { fail(error); }
	});

	const getFileStatuses = Repo => nativeBinding(callback => {
		const filter = list => list.filter(x => x);
		Repo.repo.getStatusExt()
		.then(fileStatuses => {
			callback (succeed ({
				'conflicted': fromArray(filter(fileStatuses.map(status => status.isConflicted() ? status.path() : null))),
				'deleted': fromArray(filter(fileStatuses.map(status => status.isDeleted() ? status.path() : null))),
				'modified': fromArray(filter(fileStatuses.map(status => status.isModified() ? status.path() : null))),
				'$new': fromArray(filter(fileStatuses.map(status => status.isNew() ? status.path() : null))),
				'renamed': fromArray(filter(fileStatuses.map(status => status.isRenamed() ? status.path() : null))),
				'typeChange': fromArray(filter(fileStatuses.map(status => status.isTypechange() ? status.path() : null))),
			}));
		})
		.catch(fail);
	});

	const commit = (Repo, filesToAdd, filesToDelete, message) => nativeBinding(callback => {
		const fail = failure(callback, 'Unable commit to repo: ' + Repo.url);
		try {
			let _index;
			Repo.repo.refreshIndex()
			.then (index => _index = index)
			.then (_ => toArray(filesToAdd).reduce( (lastFilePromise, path) => lastFilePromise .then(_ => _index.addByPath(path)), Promise.resolve()))
			.then (_ => toArray(filesToDelete).reduce( (lastFilePromise, path) => lastFilePromise .then(_ => _index.removeByPath(path)), Promise.resolve()))
			.then (_ => _index.write())
			.then (_ => _index.writeTree())
			.then(treeOid =>
				Repo.repo.getHeadCommit()
				.then (parent =>
					Repo.repo.createCommit('HEAD', git.Signature.default(Repo.repo), git.Signature.default(Repo.repo), message, treeOid, parent ? [parent] : parent)
					.then(oid => callback(succeed(oid.tostrS())))
				)
			)
			.catch(fail);
		}
		catch (error) { fail(error); }
	});

	// const commit = (Repo, filesToAdd, filesToDelete, message) => nativeBinding(callback => {
	// 	const fail = failure(callback, 'Unable commit to repo: ' + Repo.url);
	// 	try {
	// 		Repo.repo.refreshIndex()
	// 		.then (index =>
	// 			toArray(filesToDelete).reduce( (lastFilePromise, path) => lastFilePromise
	// 			.then(_ => index.removeByPath(path)), Promise.resolve())
	// 			.then (_ => index.write())
	// 			.then (_ => index.writeTree())
	// 		)
	// 		.then(_ =>
	// 			Repo.repo.createCommitOnHead(toArray(filesToAdd), git.Signature.default(Repo.repo), git.Signature.default(Repo.repo), message)
	// 			.then(oid => callback(succeed(oid.tostrS())))
	// 		)
	// 		.catch(fail);
	// 	}
	// 	catch (error) { fail(error); }
	// });
	//
	const checkout = (Repo, tag, targetDirectory) => nativeBinding(callback => {
		const fail = failure(callback, 'Unable check out tag: "' + tag + '" for repo: '+ Repo.url);
		try {
			const co = commit =>
				mkdirp(targetDirectory, err =>
					err ? fail(err) :
						git.Checkout.tree(Repo.repo, commit, {
							checkoutStrategy: git.Checkout.STRATEGY.FORCE,
							targetDirectory
						}).then(_ => callback(succeed()))
						.catch(fail)
				);
			// first treat the tag as an Annotated Tag, if errors then treat as Lightweight Tag
			Repo.repo.getTagByName(tag)
			.then(co)
			// .then(oid =>  co(oid.id().toString()))
			.catch(_ =>
				Repo.repo.getReferenceCommit(tag)
				.then(co)
				.catch(fail)
			);
		}
		catch (error) { fail(error); }
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////
	/* global F2:false, F3:false, F4:false */
	return {
		clone,
		initRepo,
		getRepo,
		createLightweightTag: F2(createLightweightTag),
		createAnnotatedTag: F3(createAnnotatedTag),
		getTags,
		getFileStatuses,
		commit: F4(commit),
		checkout: F3(checkout)
	};
})();

var _panosoft$elm_grove$Git$printableRepo = function (repo) {
	return function (_p0) {
		var _p1 = _p0;
		return _elm_lang$core$Basics$toString(
			{url: _p1.url, cloneLocation: _p1.cloneLocation});
	}(repo);
};
var _panosoft$elm_grove$Git$checkout = _panosoft$elm_grove$Native_Git.checkout;
var _panosoft$elm_grove$Git$commit = _panosoft$elm_grove$Native_Git.commit;
var _panosoft$elm_grove$Git$getFileStatuses = _panosoft$elm_grove$Native_Git.getFileStatuses;
var _panosoft$elm_grove$Git$getTags = _panosoft$elm_grove$Native_Git.getTags;
var _panosoft$elm_grove$Git$createAnnotatedTag = _panosoft$elm_grove$Native_Git.createAnnotatedTag;
var _panosoft$elm_grove$Git$createLightweightTag = _panosoft$elm_grove$Native_Git.createLightweightTag;
var _panosoft$elm_grove$Git$getRepo = _panosoft$elm_grove$Native_Git.getRepo;
var _panosoft$elm_grove$Git$initRepo = _panosoft$elm_grove$Native_Git.initRepo;
var _panosoft$elm_grove$Git$clone = _panosoft$elm_grove$Native_Git.clone;
var _panosoft$elm_grove$Git$fileStatusAccessors = {
	ctor: '::',
	_0: {
		ctor: '_Tuple2',
		_0: function (_) {
			return _.conflicted;
		},
		_1: 'conflicted'
	},
	_1: {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: function (_) {
				return _.deleted;
			},
			_1: 'deleted'
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: function (_) {
					return _.modified;
				},
				_1: 'modified'
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: function (_) {
						return _.$new;
					},
					_1: 'new'
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: function (_) {
							return _.renamed;
						},
						_1: 'renamed'
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: function (_) {
								return _.typeChange;
							},
							_1: 'typeChange'
						},
						_1: {ctor: '[]'}
					}
				}
			}
		}
	}
};
var _panosoft$elm_grove$Git$Repo = F3(
	function (a, b, c) {
		return {repo: a, url: b, cloneLocation: c};
	});
var _panosoft$elm_grove$Git$FileStatuses = F6(
	function (a, b, c, d, e, f) {
		return {conflicted: a, deleted: b, modified: c, $new: d, renamed: e, typeChange: f};
	});
var _panosoft$elm_grove$Git$String = {ctor: 'String'};
var _panosoft$elm_grove$Git$RepoOpaque = {ctor: 'RepoOpaque'};
var _panosoft$elm_grove$Git$Tag = {ctor: 'Tag'};

var _panosoft$elm_grove$Version$nextPatch = function (version) {
	return _elm_lang$core$Native_Utils.update(
		version,
		{patch: version.patch + 1});
};
var _panosoft$elm_grove$Version$nextMinor = function (version) {
	return _elm_lang$core$Native_Utils.update(
		version,
		{minor: version.minor + 1, patch: 0});
};
var _panosoft$elm_grove$Version$nextMajor = function (version) {
	return _elm_lang$core$Native_Utils.update(
		version,
		{major: version.major + 1, minor: 0, patch: 0});
};
var _panosoft$elm_grove$Version$versionCompare = F2(
	function (v1, v2) {
		return function (diff) {
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				_elm_lang$core$Native_Utils.eq(diff, 0),
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$Basics$EQ,
					_1: A2(
						_panosoft$elm_utils$Utils_Ops_ops['?'],
						_elm_lang$core$Native_Utils.cmp(diff, 0) > 0,
						{ctor: '_Tuple2', _0: _elm_lang$core$Basics$GT, _1: _elm_lang$core$Basics$LT})
				});
		}(
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				_elm_lang$core$Native_Utils.eq(v1.major, v2.major),
				{
					ctor: '_Tuple2',
					_0: A2(
						_panosoft$elm_utils$Utils_Ops_ops['?'],
						_elm_lang$core$Native_Utils.eq(v1.minor, v2.minor),
						{ctor: '_Tuple2', _0: v1.patch - v2.patch, _1: v1.minor - v2.minor}),
					_1: v1.major - v2.major
				}));
	});
var _panosoft$elm_grove$Version$inRange = F2(
	function (range, version) {
		var _p0 = range;
		if (_p0.ctor === 'Range') {
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				A2(
					_elm_lang$core$List$member,
					A2(_panosoft$elm_grove$Version$versionCompare, version, _p0._0),
					{
						ctor: '::',
						_0: _elm_lang$core$Basics$EQ,
						_1: {
							ctor: '::',
							_0: _elm_lang$core$Basics$GT,
							_1: {ctor: '[]'}
						}
					}),
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.eq(
						A2(_panosoft$elm_grove$Version$versionCompare, version, _p0._1),
						_elm_lang$core$Basics$LT),
					_1: false
				});
		} else {
			return _elm_lang$core$Native_Utils.eq(
				A2(_panosoft$elm_grove$Version$versionCompare, version, _p0._0),
				_elm_lang$core$Basics$EQ);
		}
	});
var _panosoft$elm_grove$Version$versionToString = function (version) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_elm_lang$core$Basics$toString(version.major),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'.',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(version.minor),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'.',
					_elm_lang$core$Basics$toString(version.patch)))));
};
var _panosoft$elm_grove$Version$rangeToString = function (range) {
	var _p1 = range;
	if (_p1.ctor === 'Range') {
		return A2(
			_panosoft$elm_string_utils$StringUtils_ops['+-+'],
			A2(
				_panosoft$elm_string_utils$StringUtils_ops['+-+'],
				_panosoft$elm_grove$Version$versionToString(_p1._0),
				'<= v <'),
			_panosoft$elm_grove$Version$versionToString(_p1._1));
	} else {
		var _p2 = _p1._0;
		return A2(
			_panosoft$elm_string_utils$StringUtils_ops['+-+'],
			A2(
				_panosoft$elm_string_utils$StringUtils_ops['+-+'],
				_panosoft$elm_grove$Version$versionToString(_p2),
				'<= v <='),
			_panosoft$elm_grove$Version$versionToString(_p2));
	}
};
var _panosoft$elm_grove$Version$get = F2(
	function (index, list) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['?='],
				A2(_panosoft$elm_utils$Utils_Ops_ops['!!'], list, index),
				_elm_lang$core$Maybe$Just('')),
			'');
	});
var _panosoft$elm_grove$Version$getNum = F2(
	function (index, list) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['??='],
			_elm_lang$core$String$toInt(
				A2(_panosoft$elm_grove$Version$get, index, list)),
			_elm_lang$core$Basics$always(0));
	});
var _panosoft$elm_grove$Version$Version = F3(
	function (a, b, c) {
		return {major: a, minor: b, patch: c};
	});
var _panosoft$elm_grove$Version$versionFromString = function (versionStr) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['|?>'],
		_elm_lang$core$List$head(
			A3(
				_elm_lang$core$Regex$find,
				_elm_lang$core$Regex$All,
				_elm_lang$core$Regex$regex('^(\\d+)\\.(\\d+)\\.(\\d+)$'),
				versionStr)),
		function (match) {
			return A3(
				_panosoft$elm_grove$Version$Version,
				A2(_panosoft$elm_grove$Version$getNum, 0, match.submatches),
				A2(_panosoft$elm_grove$Version$getNum, 1, match.submatches),
				A2(_panosoft$elm_grove$Version$getNum, 2, match.submatches));
		});
};
var _panosoft$elm_grove$Version$ExactRange = function (a) {
	return {ctor: 'ExactRange', _0: a};
};
var _panosoft$elm_grove$Version$rangeFromVersion = function (version) {
	return _panosoft$elm_grove$Version$ExactRange(version);
};
var _panosoft$elm_grove$Version$Range = F2(
	function (a, b) {
		return {ctor: 'Range', _0: a, _1: b};
	});
var _panosoft$elm_grove$Version$rangeFromString = function (rangeStr) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['?='],
		A2(
			_panosoft$elm_utils$Utils_Ops_ops['|?>'],
			_elm_lang$core$List$head(
				A3(
					_elm_lang$core$Regex$find,
					_elm_lang$core$Regex$All,
					_elm_lang$core$Regex$regex('^(\\d+\\.\\d+\\.\\d+)\\s+<=\\s+v\\s+<(=?)\\s+(\\d+\\.\\d+\\.\\d+)$'),
					rangeStr)),
			function (match) {
				return A2(
					_panosoft$elm_utils$Utils_Ops_ops['?='],
					A2(
						_panosoft$elm_utils$Utils_Ops_ops['|?>'],
						_panosoft$elm_grove$Version$versionFromString(
							A2(_panosoft$elm_grove$Version$get, 0, match.submatches)),
						function (from) {
							return A2(
								_panosoft$elm_utils$Utils_Ops_ops['?='],
								A2(
									_panosoft$elm_utils$Utils_Ops_ops['|?>'],
									_panosoft$elm_grove$Version$versionFromString(
										A2(_panosoft$elm_grove$Version$get, 2, match.submatches)),
									function (to) {
										return A2(
											_panosoft$elm_utils$Utils_Ops_ops['?'],
											_elm_lang$core$Native_Utils.eq(
												A2(_panosoft$elm_grove$Version$get, 1, match.submatches),
												'='),
											{
												ctor: '_Tuple2',
												_0: A2(
													_panosoft$elm_utils$Utils_Ops_ops['?'],
													!_elm_lang$core$Native_Utils.eq(from, to),
													{
														ctor: '_Tuple2',
														_0: _elm_lang$core$Maybe$Nothing,
														_1: _elm_lang$core$Maybe$Just(
															_panosoft$elm_grove$Version$ExactRange(from))
													}),
												_1: _elm_lang$core$Maybe$Just(
													A2(_panosoft$elm_grove$Version$Range, from, to))
											});
									}),
								_elm_lang$core$Maybe$Nothing);
						}),
					_elm_lang$core$Maybe$Nothing);
			}),
		_elm_lang$core$Maybe$Nothing);
};
var _panosoft$elm_grove$Version$toRangeToNextMajorVersion = function (version) {
	return _panosoft$elm_grove$Version$rangeToString(
		A2(
			_panosoft$elm_grove$Version$Range,
			version,
			_elm_lang$core$Native_Utils.update(
				version,
				{major: version.major + 1, minor: 0, patch: 0})));
};

var _panosoft$elm_grove$AppUtils$determineJsonIndent = function (json) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['|?->'],
		_elm_lang$core$List$head(
			A3(
				_elm_lang$core$Regex$find,
				_elm_lang$core$Regex$AtMost(1),
				_elm_lang$core$Regex$regex('†(\\s*)\"'),
				A3(_panosoft$elm_utils$Utils_Regex$replaceAll, '\\n', '†', json))),
		{
			ctor: '_Tuple2',
			_0: 4,
			_1: function (match) {
				return _elm_lang$core$String$length(
					_panosoft$elm_utils$Utils_Match$getSubmatches1(match));
			}
		});
};
var _panosoft$elm_grove$AppUtils$sortedVersions = function (tags) {
	return _elm_lang$core$List$reverse(
		A2(
			_elm_lang$core$List$sortWith,
			_panosoft$elm_grove$Version$versionCompare,
			A2(_elm_lang$core$List$filterMap, _panosoft$elm_grove$Version$versionFromString, tags)));
};
var _panosoft$elm_grove$AppUtils$writeFile = function (filename) {
	return A3(_elm_node$core$Node_FileSystem$writeFileFromString, filename, '666', _elm_node$core$Node_Encoding$Utf8);
};
var _panosoft$elm_grove$AppUtils$pathJoin = F3(
	function (pathSep, rootDir, pathParts) {
		return function (pathParts) {
			return function (isAbsolute) {
				return A2(
					_elm_lang$core$String$join,
					pathSep,
					A2(
						_panosoft$elm_utils$Utils_Ops_ops['?'],
						isAbsolute,
						{
							ctor: '_Tuple2',
							_0: pathParts,
							_1: {ctor: '::', _0: rootDir, _1: pathParts}
						}));
			}(
				A2(
					_panosoft$elm_utils$Utils_Ops_ops['|?->'],
					_elm_lang$core$List$head(pathParts),
					{
						ctor: '_Tuple2',
						_0: false,
						_1: function (root) {
							return _elm_lang$core$Native_Utils.eq(
								A2(_elm_lang$core$String$left, 1, root),
								pathSep);
						}
					}));
		}(
			A2(
				_elm_lang$core$List$filter,
				F2(
					function (x, y) {
						return !_elm_lang$core$Native_Utils.eq(x, y);
					})(''),
				pathParts));
	});
var _panosoft$elm_grove$AppUtils$msgToCmd = function (msg) {
	return A2(
		_elm_lang$core$Task$perform,
		_elm_lang$core$Basics$always(msg),
		_elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'}));
};
var _panosoft$elm_grove$AppUtils$bugMissing = F2(
	function (missing, _p0) {
		return _elm_lang$core$Native_Utils.crash(
			'AppUtils',
			{
				start: {line: 33, column: 12},
				end: {line: 33, column: 23}
			})(
			A2(
				_panosoft$elm_string_utils$StringUtils_ops['+-+'],
				A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'BUG:', missing),
				'missing'));
	});
var _panosoft$elm_grove$AppUtils$bug = F2(
	function (message, _p1) {
		return _elm_lang$core$Native_Utils.crash(
			'AppUtils',
			{
				start: {line: 28, column: 12},
				end: {line: 28, column: 23}
			})(
			A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'BUG:', message));
	});

var _panosoft$elm_grove$Package$defaultGitServer = 'https://github.com/';
var _panosoft$elm_grove$Package$defaultRepoLocation = function (packageName) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_panosoft$elm_grove$Package$defaultGitServer,
		A2(_elm_lang$core$Basics_ops['++'], packageName, '.git'));
};
var _panosoft$elm_grove$Package$getRepoLocation = F2(
	function (sources, packageName) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?='],
			A2(
				_elm_lang$core$Dict$get,
				packageName,
				A2(_panosoft$elm_utils$Utils_Ops_ops['?='], sources, _elm_lang$core$Dict$empty)),
			_panosoft$elm_grove$Package$defaultRepoLocation(packageName));
	});
var _panosoft$elm_grove$Package$elmCorePackageName = 'elm-lang/core';
var _panosoft$elm_grove$Package$elmJsonFilename = 'elm-package.json';
var _panosoft$elm_grove$Package$npmJsonFilename = 'package.json';
var _panosoft$elm_grove$Package$elmVersion = function (elmVersion) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'0.',
		A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(elmVersion),
			A2(
				_elm_lang$core$Basics_ops['++'],
				'.0 <= v < 0.',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(elmVersion + 1),
					'.0'))));
};
var _panosoft$elm_grove$Package$exactDependenciesFileName = 'exact-dependencies.json';
var _panosoft$elm_grove$Package$elmStuff = function (testing) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['?'],
		testing,
		{ctor: '_Tuple2', _0: 'elm-test-stuff', _1: 'elm-stuff'});
};
var _panosoft$elm_grove$Package$elmPackagesRoot = F2(
	function (testing, pathSep) {
		return A2(
			_elm_lang$core$String$join,
			pathSep,
			{
				ctor: '::',
				_0: _panosoft$elm_grove$Package$elmStuff(testing),
				_1: {
					ctor: '::',
					_0: 'packages',
					_1: {ctor: '[]'}
				}
			});
	});

var _panosoft$elm_utils$Utils_Tuple$secondMap = function (f) {
	return _elm_lang$core$List$map(
		function (_p0) {
			var _p1 = _p0;
			return {
				ctor: '_Tuple2',
				_0: _p1._0,
				_1: f(_p1._1)
			};
		});
};
var _panosoft$elm_utils$Utils_Tuple$firstMap = function (f) {
	return _elm_lang$core$List$map(
		function (_p2) {
			var _p3 = _p2;
			return {
				ctor: '_Tuple2',
				_0: f(_p3._0),
				_1: _p3._1
			};
		});
};

var _panosoft$elm_utils$Utils_Func$compose = F2(
	function (f2, f1) {
		return A2(
			F2(
				function (x, y) {
					return function (_p0) {
						return x(
							y(_p0));
					};
				}),
			f2,
			f1);
	});
var _panosoft$elm_utils$Utils_Func$compose2 = F3(
	function (f2, f1, a) {
		return A2(
			_panosoft$elm_utils$Utils_Func$compose,
			f2,
			f1(a));
	});
var _panosoft$elm_utils$Utils_Func$compose3 = F3(
	function (f2, f1, a) {
		return A2(
			_panosoft$elm_utils$Utils_Func$compose2,
			f2,
			f1(a));
	});
var _panosoft$elm_utils$Utils_Func$compose4 = F3(
	function (f2, f1, a) {
		return A2(
			_panosoft$elm_utils$Utils_Func$compose3,
			f2,
			f1(a));
	});
var _panosoft$elm_utils$Utils_Func$compose5 = F3(
	function (f2, f1, a) {
		return A2(
			_panosoft$elm_utils$Utils_Func$compose4,
			f2,
			f1(a));
	});
var _panosoft$elm_utils$Utils_Func$compose6 = F3(
	function (f2, f1, a) {
		return A2(
			_panosoft$elm_utils$Utils_Func$compose5,
			f2,
			f1(a));
	});
var _panosoft$elm_utils$Utils_Func$compose7 = F3(
	function (f2, f1, a) {
		return A2(
			_panosoft$elm_utils$Utils_Func$compose6,
			f2,
			f1(a));
	});
var _panosoft$elm_utils$Utils_Func$compose8 = F3(
	function (f2, f1, a) {
		return A2(
			_panosoft$elm_utils$Utils_Func$compose7,
			f2,
			f1(a));
	});
var _panosoft$elm_utils$Utils_Func$apply = function (p1) {
	return F2(
		function (x, y) {
			return y(x);
		})(p1);
};
var _panosoft$elm_utils$Utils_Func$apply2 = F2(
	function (p1, p2) {
		return function (_p1) {
			return A2(
				F2(
					function (x, y) {
						return y(x);
					}),
				p2,
				A2(_panosoft$elm_utils$Utils_Func$apply, p1, _p1));
		};
	});
var _panosoft$elm_utils$Utils_Func$apply3 = F3(
	function (p1, p2, p3) {
		return function (_p2) {
			return A2(
				F2(
					function (x, y) {
						return y(x);
					}),
				p3,
				A3(_panosoft$elm_utils$Utils_Func$apply2, p1, p2, _p2));
		};
	});
var _panosoft$elm_utils$Utils_Func$apply4 = F4(
	function (p1, p2, p3, p4) {
		return function (_p3) {
			return A2(
				F2(
					function (x, y) {
						return y(x);
					}),
				p4,
				A4(_panosoft$elm_utils$Utils_Func$apply3, p1, p2, p3, _p3));
		};
	});

var _panosoft$elm_utils$Utils_Json$resultDecoder = F2(
	function (errorDecoder, okayDecoder) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			function (maybeOkay) {
				return A2(
					_panosoft$elm_utils$Utils_Ops_ops['?='],
					A2(
						_panosoft$elm_utils$Utils_Ops_ops['|?>'],
						maybeOkay,
						function (_p0) {
							return _elm_lang$core$Json_Decode$succeed(
								_elm_lang$core$Result$Ok(_p0));
						}),
					A2(
						_elm_lang$core$Json_Decode$andThen,
						function (_p1) {
							return _elm_lang$core$Json_Decode$succeed(
								_elm_lang$core$Result$Err(_p1));
						},
						A2(_elm_lang$core$Json_Decode$field, 'error', errorDecoder)));
			},
			_elm_lang$core$Json_Decode$maybe(
				A2(_elm_lang$core$Json_Decode$field, 'okay', okayDecoder)));
	});
var _panosoft$elm_utils$Utils_Json$resultDecode = A2(_panosoft$elm_utils$Utils_Func$compose2, _elm_lang$core$Json_Decode$decodeString, _panosoft$elm_utils$Utils_Json$resultDecoder);
var _panosoft$elm_utils$Utils_Json$resultEncoder = F3(
	function (errorEncoder, okayEncoder, result) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['??='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|??>'],
				result,
				function (okay) {
					return _elm_lang$core$Json_Encode$object(
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'okay',
								_1: okayEncoder(okay)
							},
							_1: {ctor: '[]'}
						});
				}),
			function (error) {
				return _elm_lang$core$Json_Encode$object(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'error',
							_1: errorEncoder(error)
						},
						_1: {ctor: '[]'}
					});
			});
	});
var _panosoft$elm_utils$Utils_Json$resultEncode = A2(
	_panosoft$elm_utils$Utils_Func$compose3,
	_elm_lang$core$Json_Encode$encode(0),
	_panosoft$elm_utils$Utils_Json$resultEncoder);
var _panosoft$elm_utils$Utils_Json$decConvertDict = F3(
	function (valuesConverter, keyDecoder, valueDecoder) {
		var makeDict = F2(
			function (keys, values) {
				return _elm_lang$core$Dict$fromList(
					A2(
						_panosoft$elm_utils$Utils_Tuple$secondMap,
						valuesConverter,
						A3(
							_elm_lang$core$List$map2,
							F2(
								function (v0, v1) {
									return {ctor: '_Tuple2', _0: v0, _1: v1};
								}),
							keys,
							values)));
			});
		return A3(
			_elm_lang$core$Json_Decode$map2,
			makeDict,
			A2(
				_elm_lang$core$Json_Decode$field,
				'keys',
				_elm_lang$core$Json_Decode$list(keyDecoder)),
			A2(
				_elm_lang$core$Json_Decode$field,
				'values',
				_elm_lang$core$Json_Decode$list(valueDecoder)));
	});
var _panosoft$elm_utils$Utils_Json$decDict = _panosoft$elm_utils$Utils_Json$decConvertDict(_elm_lang$core$Basics$identity);
var _panosoft$elm_utils$Utils_Json$encDict = F3(
	function (keyEncoder, valueEncoder, dict) {
		return _elm_lang$core$Json_Encode$object(
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'keys',
					_1: _elm_lang$core$Json_Encode$list(
						A2(
							_elm_lang$core$List$map,
							keyEncoder,
							_elm_lang$core$Dict$keys(dict)))
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'values',
						_1: _elm_lang$core$Json_Encode$list(
							A2(
								_elm_lang$core$List$map,
								valueEncoder,
								_elm_lang$core$Dict$values(dict)))
					},
					_1: {ctor: '[]'}
				}
			});
	});
var _panosoft$elm_utils$Utils_Json$encMaybe = F2(
	function (encoder, maybe) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|?>'],
				maybe,
				function (just) {
					return encoder(just);
				}),
			_elm_lang$core$Json_Encode$null);
	});
var _panosoft$elm_utils$Utils_Json_ops = _panosoft$elm_utils$Utils_Json_ops || {};
_panosoft$elm_utils$Utils_Json_ops['///'] = F2(
	function (decoder, $default) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			function (maybe) {
				return _elm_lang$core$Json_Decode$succeed(
					A2(_panosoft$elm_utils$Utils_Ops_ops['?='], maybe, $default));
			},
			_elm_lang$core$Json_Decode$maybe(decoder));
	});
var _panosoft$elm_utils$Utils_Json_ops = _panosoft$elm_utils$Utils_Json_ops || {};
_panosoft$elm_utils$Utils_Json_ops['<||'] = _elm_lang$core$Json_Decode$map2(
	F2(
		function (x, y) {
			return x(y);
		}));

var _panosoft$elm_grove$ElmJson$elmJsonEncoder = function (elmJson) {
	return _elm_lang$core$Json_Encode$object(
		A2(
			_elm_lang$core$List$filter,
			function (_p0) {
				var _p1 = _p0;
				return !_elm_lang$core$Native_Utils.eq(_p1._1, _elm_lang$core$Json_Encode$null);
			},
			{
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'version',
					_1: _elm_lang$core$Json_Encode$string(elmJson.version)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'summary',
						_1: _elm_lang$core$Json_Encode$string(elmJson.summary)
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'repository',
							_1: _elm_lang$core$Json_Encode$string(
								A2(_elm_lang$core$Basics_ops['++'], 'https://github.com/', elmJson.repository))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'license',
								_1: _elm_lang$core$Json_Encode$string(elmJson.license)
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'source-directories',
									_1: _elm_lang$core$Json_Encode$list(
										A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, elmJson.sourceDirectories))
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'exposed-modules',
										_1: _elm_lang$core$Json_Encode$list(
											A2(_elm_lang$core$List$map, _elm_lang$core$Json_Encode$string, elmJson.exposedModules))
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'native-modules',
											_1: A2(_panosoft$elm_utils$Utils_Json$encMaybe, _elm_lang$core$Json_Encode$bool, elmJson.nativeModules)
										},
										_1: {
											ctor: '::',
											_0: {
												ctor: '_Tuple2',
												_0: 'dependencies',
												_1: _elm_lang$core$Json_Encode$object(
													A2(
														_elm_lang$core$List$map,
														function (_p2) {
															var _p3 = _p2;
															return {
																ctor: '_Tuple2',
																_0: _p3._0,
																_1: _elm_lang$core$Json_Encode$string(
																	A2(
																		_panosoft$elm_utils$Utils_Ops_ops['?!='],
																		_p3._1,
																		function (_p4) {
																			return _elm_lang$core$Native_Utils.crash(
																				'ElmJson',
																				{
																					start: {line: 73, column: 84},
																					end: {line: 73, column: 95}
																				})('missing dependency value');
																		}))
															};
														},
														_elm_lang$core$Dict$toList(elmJson.dependencies)))
											},
											_1: {
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'dependency-sources',
													_1: A2(
														_panosoft$elm_utils$Utils_Json$encMaybe,
														function (sources) {
															return _elm_lang$core$Json_Encode$object(
																A2(
																	_elm_lang$core$List$map,
																	function (_p5) {
																		var _p6 = _p5;
																		return {
																			ctor: '_Tuple2',
																			_0: _p6._0,
																			_1: _elm_lang$core$Json_Encode$string(_p6._1)
																		};
																	},
																	_elm_lang$core$Dict$toList(sources)));
														},
														elmJson.dependencySources)
												},
												_1: {
													ctor: '::',
													_0: {
														ctor: '_Tuple2',
														_0: 'elm-version',
														_1: _elm_lang$core$Json_Encode$string(elmJson.elmVersion)
													},
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}));
};
var _panosoft$elm_grove$ElmJson$ElmJson = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {version: a, summary: b, repository: c, license: d, sourceDirectories: e, exposedModules: f, nativeModules: g, dependencies: h, dependencySources: i, elmVersion: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _panosoft$elm_grove$ElmJson$elmJsonDecoder = A2(
	_panosoft$elm_utils$Utils_Json_ops['<||'],
	A2(
		_panosoft$elm_utils$Utils_Json_ops['<||'],
		A2(
			_panosoft$elm_utils$Utils_Json_ops['<||'],
			A2(
				_panosoft$elm_utils$Utils_Json_ops['<||'],
				A2(
					_panosoft$elm_utils$Utils_Json_ops['<||'],
					A2(
						_panosoft$elm_utils$Utils_Json_ops['<||'],
						A2(
							_panosoft$elm_utils$Utils_Json_ops['<||'],
							A2(
								_panosoft$elm_utils$Utils_Json_ops['<||'],
								A2(
									_panosoft$elm_utils$Utils_Json_ops['<||'],
									A2(
										_panosoft$elm_utils$Utils_Json_ops['<||'],
										_elm_lang$core$Json_Decode$succeed(_panosoft$elm_grove$ElmJson$ElmJson),
										A2(_elm_lang$core$Json_Decode$field, 'version', _elm_lang$core$Json_Decode$string)),
									A2(_elm_lang$core$Json_Decode$field, 'summary', _elm_lang$core$Json_Decode$string)),
								A2(
									_elm_lang$core$Json_Decode$field,
									'repository',
									A2(
										_elm_lang$core$Json_Decode$andThen,
										function (repoPath) {
											return _elm_lang$core$Json_Decode$succeed(
												A2(
													_elm_lang$core$String$join,
													'/',
													A2(
														_elm_lang$core$List$drop,
														3,
														A2(_elm_lang$core$String$split, '/', repoPath))));
										},
										_elm_lang$core$Json_Decode$string))),
							A2(_elm_lang$core$Json_Decode$field, 'license', _elm_lang$core$Json_Decode$string)),
						A2(
							_elm_lang$core$Json_Decode$field,
							'source-directories',
							_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string))),
					A2(
						_elm_lang$core$Json_Decode$field,
						'exposed-modules',
						_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string))),
				_elm_lang$core$Json_Decode$maybe(
					A2(_elm_lang$core$Json_Decode$field, 'native-modules', _elm_lang$core$Json_Decode$bool))),
			A2(
				_elm_lang$core$Json_Decode$field,
				'dependencies',
				_elm_lang$core$Json_Decode$dict(
					A2(
						_elm_lang$core$Json_Decode$andThen,
						function (rangeStr) {
							return _elm_lang$core$Json_Decode$succeed(
								_elm_lang$core$Maybe$Just(rangeStr));
						},
						_elm_lang$core$Json_Decode$string)))),
		_elm_lang$core$Json_Decode$maybe(
			A2(
				_elm_lang$core$Json_Decode$field,
				'dependency-sources',
				_elm_lang$core$Json_Decode$dict(_elm_lang$core$Json_Decode$string)))),
	A2(_elm_lang$core$Json_Decode$field, 'elm-version', _elm_lang$core$Json_Decode$string));
var _panosoft$elm_grove$ElmJson$decodeElmJson = F2(
	function (path, elmPackageJson) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['??='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|??>'],
				A2(_elm_lang$core$Json_Decode$decodeString, _panosoft$elm_grove$ElmJson$elmJsonDecoder, elmPackageJson),
				_elm_lang$core$Result$Ok),
			function (error) {
				return _elm_lang$core$Result$Err(
					A2(
						_panosoft$elm_string_utils$StringUtils_ops['+-+'],
						A2(
							_panosoft$elm_string_utils$StringUtils_ops['+-+'],
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Cannot decode JSON in', _panosoft$elm_grove$Package$elmJsonFilename),
									'location:'),
								path),
							'Error:'),
						error));
			});
	});

const _panosoft$elm_grove$Native_Console = (_ => {
	/* global _elm_lang$core$Native_Scheduler:false _elm_lang$core$Native_List:false */
	const { nativeBinding, succeed, fail } = _elm_lang$core$Native_Scheduler;
	///////////////////////////////////////////////////////////////////////////////////////////////////
	const log = msg => nativeBinding(callback => {
		/*eslint no-control-regex: "off"*/
		const displayMsg = process.stdout.isTTY ? msg : msg.replace(/\x1B\[\d+?m/g, '');
		console.log(displayMsg);
		callback(succeed(msg));
	});

	return {
		log
	};
})();

var _panosoft$elm_grove$Console$log = _panosoft$elm_grove$Native_Console.log;

var _panosoft$elm_grove$Output$getPrefix = function (msg) {
	return function (_p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: A3(_panosoft$elm_utils$Utils_Regex$replaceAll, '†', '\n', _p1._0),
			_1: A3(_panosoft$elm_utils$Utils_Regex$replaceAll, '†', '\n', _p1._1)
		};
	}(
		A2(
			_panosoft$elm_utils$Utils_Ops_ops['|?->'],
			_elm_lang$core$List$head(
				A3(
					_elm_lang$core$Regex$find,
					_elm_lang$core$Regex$AtMost(1),
					_elm_lang$core$Regex$regex('^(†*)(.+$)'),
					A3(_panosoft$elm_utils$Utils_Regex$replaceAll, '\\n', '†', msg))),
			{
				ctor: '_Tuple2',
				_0: {ctor: '_Tuple2', _0: '', _1: msg},
				_1: _panosoft$elm_utils$Utils_Match$getSubmatches2
			}));
};
var _panosoft$elm_grove$Output$parens = function (str) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'(',
		A2(_elm_lang$core$Basics_ops['++'], str, ')'));
};
var _panosoft$elm_grove$Output$colorize = F2(
	function (color, str) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'[',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(color),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'm',
					A2(_elm_lang$core$Basics_ops['++'], str, '[0m'))));
	});
var _panosoft$elm_grove$Output$magenta = 35;
var _panosoft$elm_grove$Output$cyan = 36;
var _panosoft$elm_grove$Output$yellow = 33;
var _panosoft$elm_grove$Output$warnLog = function (msg) {
	return function (_p2) {
		var _p3 = _p2;
		return _panosoft$elm_grove$Console$log(
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p3._0,
				A2(
					_panosoft$elm_grove$Output$colorize,
					_panosoft$elm_grove$Output$yellow,
					A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'WARNING:', _p3._1))));
	}(
		_panosoft$elm_grove$Output$getPrefix(msg));
};
var _panosoft$elm_grove$Output$red = 31;
var _panosoft$elm_grove$Output$errorLog = function (msg) {
	return function (_p4) {
		var _p5 = _p4;
		return _panosoft$elm_grove$Console$log(
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p5._0,
				A2(
					_panosoft$elm_grove$Output$colorize,
					_panosoft$elm_grove$Output$red,
					A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'ERROR:', _p5._1))));
	}(
		_panosoft$elm_grove$Output$getPrefix(msg));
};
var _panosoft$elm_grove$Output$green = 32;

var _panosoft$elm_grove$NpmJson$validateName = F2(
	function (name, repository) {
		return function (repository) {
			return function (errors) {
				return A2(
					_panosoft$elm_utils$Utils_Ops_ops['?'],
					_elm_lang$core$Native_Utils.eq(
						_elm_lang$core$List$length(errors),
						0),
					{
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Nothing,
						_1: _elm_lang$core$Maybe$Just(errors)
					});
			}(
				A2(
					_elm_lang$core$List$filterMap,
					function (_p0) {
						var _p1 = _p0;
						return A2(
							_panosoft$elm_utils$Utils_Ops_ops['?'],
							_p1._0(name),
							{
								ctor: '_Tuple2',
								_0: _elm_lang$core$Maybe$Just(
									A2(
										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
										A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'npm name:', name),
										_p1._1)),
								_1: _elm_lang$core$Maybe$Nothing
							});
					},
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: function (name) {
								return A2(
									F2(
										function (x, y) {
											return !_elm_lang$core$Native_Utils.eq(x, y);
										}),
									2,
									_elm_lang$core$List$length(
										A2(_elm_lang$core$String$split, '/', name)));
							},
							_1: 'must be in the format <user>/<repo>'
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: function (name) {
									return !_elm_lang$core$Native_Utils.eq(
										A2(_elm_lang$core$String$left, 1, name),
										'@');
								},
								_1: 'must start with an @'
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: function (name) {
										return !_elm_lang$core$Native_Utils.eq(
											name,
											A2(_elm_lang$core$Basics_ops['++'], '@', repository));
									},
									_1: A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'must match elm json repository:', repository)
								},
								_1: {ctor: '[]'}
							}
						}
					}));
		}(
			A3(_panosoft$elm_utils$Utils_Regex$replaceFirst, '\\.git$', '', repository));
	});
var _panosoft$elm_grove$NpmJson$validateNpmJson = F3(
	function (json, versionStr, repository) {
		return function (errors) {
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				_elm_lang$core$Native_Utils.eq(
					errors,
					{ctor: '[]'}),
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$Result$Ok(
						{ctor: '_Tuple0'}),
					_1: _elm_lang$core$Result$Err(errors)
				});
		}(
			A3(
				_elm_lang$core$List$foldl,
				F2(
					function (maybeError, errors) {
						return A2(
							_panosoft$elm_utils$Utils_Ops_ops['|?->'],
							maybeError,
							{
								ctor: '_Tuple2',
								_0: errors,
								_1: A2(_elm_lang$core$Basics$flip, _elm_lang$core$List$append, errors)
							});
					}),
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_panosoft$elm_utils$Utils_Ops_ops['??='],
						A2(
							_panosoft$elm_utils$Utils_Ops_ops['|??>'],
							_elm_lang$core$Json_Decode$decodeString(
								_elm_lang$core$Json_Decode$maybe(
									A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string)))(json),
							A2(
								_elm_lang$core$Basics$flip,
								F2(
									function (x, y) {
										return A2(_panosoft$elm_utils$Utils_Ops_ops['|?->'], x, y);
									}),
								{
									ctor: '_Tuple2',
									_0: _elm_lang$core$Maybe$Just(
										{
											ctor: '::',
											_0: 'name is missing',
											_1: {ctor: '[]'}
										}),
									_1: function (name) {
										return A2(_panosoft$elm_grove$NpmJson$validateName, name, repository);
									}
								})),
						function (error) {
							return _elm_lang$core$Maybe$Just(
								{
									ctor: '::',
									_0: A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'cannot parse for name, error:', error),
									_1: {ctor: '[]'}
								});
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_panosoft$elm_utils$Utils_Ops_ops['??='],
							A2(
								_panosoft$elm_utils$Utils_Ops_ops['|??>'],
								_elm_lang$core$Json_Decode$decodeString(
									_elm_lang$core$Json_Decode$maybe(
										A2(_elm_lang$core$Json_Decode$field, 'version', _elm_lang$core$Json_Decode$string)))(json),
								A2(
									_elm_lang$core$Basics$flip,
									F2(
										function (x, y) {
											return A2(_panosoft$elm_utils$Utils_Ops_ops['|?->'], x, y);
										}),
									{
										ctor: '_Tuple2',
										_0: _elm_lang$core$Maybe$Just(
											{
												ctor: '::',
												_0: 'version is missing',
												_1: {ctor: '[]'}
											}),
										_1: function (versionStr2) {
											return A2(
												_panosoft$elm_utils$Utils_Ops_ops['?'],
												!_elm_lang$core$Native_Utils.eq(versionStr2, versionStr),
												{
													ctor: '_Tuple2',
													_0: _elm_lang$core$Maybe$Just(
														{
															ctor: '::',
															_0: 'npm json version doesn\'t match elm json version',
															_1: {ctor: '[]'}
														}),
													_1: _elm_lang$core$Maybe$Nothing
												});
										}
									})),
							function (error) {
								return _elm_lang$core$Maybe$Just(
									{
										ctor: '::',
										_0: A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'cannot parse for version, error:', error),
										_1: {ctor: '[]'}
									});
							}),
						_1: {ctor: '[]'}
					}
				}));
	});
var _panosoft$elm_grove$NpmJson$has = F2(
	function (fieldName, json) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['??='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|??>'],
				_elm_lang$core$Json_Decode$decodeString(
					_elm_lang$core$Json_Decode$maybe(
						A2(
							_elm_lang$core$Json_Decode$field,
							fieldName,
							_elm_lang$core$Json_Decode$dict(_elm_lang$core$Json_Decode$string))))(json),
				function (maybeValue) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?='],
						A2(
							_panosoft$elm_utils$Utils_Ops_ops['|?>'],
							maybeValue,
							_elm_lang$core$Basics$always(true)),
						false);
				}),
			_elm_lang$core$Basics$always(false));
	});
var _panosoft$elm_grove$NpmJson$hasDependencies = function (json) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (fieldName, result) {
				return result || A2(_panosoft$elm_grove$NpmJson$has, fieldName, json);
			}),
		false,
		{
			ctor: '::',
			_0: 'dependencies',
			_1: {
				ctor: '::',
				_0: 'optionalDependencies',
				_1: {ctor: '[]'}
			}
		});
};
var _panosoft$elm_grove$NpmJson$npmDependenciesEncoder = function (npmJson) {
	return _elm_lang$core$Json_Encode$object(
		A2(
			_elm_lang$core$List$map,
			function (_p2) {
				var _p3 = _p2;
				return {
					ctor: '_Tuple2',
					_0: _p3._0,
					_1: _elm_lang$core$Json_Encode$string(_p3._1)
				};
			},
			_elm_lang$core$Dict$toList(npmJson)));
};
var _panosoft$elm_grove$NpmJson$npmDependenciesDecoder = _elm_lang$core$Json_Decode$dict(_elm_lang$core$Json_Decode$string);
var _panosoft$elm_grove$NpmJson$dependenciesRegex = '\"dependencies\":\\s*\\{.*?\\}';
var _panosoft$elm_grove$NpmJson$extractOrAddDependencies = function (json) {
	return function (_p4) {
		var _p5 = _p4;
		return {
			ctor: '_Tuple2',
			_0: A3(_panosoft$elm_utils$Utils_Regex$replaceFirst, '\"dependencies\":', '', _p5._0),
			_1: _p5._1
		};
	}(
		function (singleLineJson) {
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['?='],
				A2(
					_panosoft$elm_utils$Utils_Ops_ops['|?>'],
					_elm_lang$core$List$head(
						A3(
							_elm_lang$core$Regex$find,
							_elm_lang$core$Regex$AtMost(1),
							_elm_lang$core$Regex$regex(_panosoft$elm_grove$NpmJson$dependenciesRegex),
							singleLineJson)),
					function (match) {
						return {
							ctor: '_Tuple2',
							_0: A3(_panosoft$elm_utils$Utils_Regex$replaceAll, '†', '\n', match.match),
							_1: singleLineJson
						};
					}),
				{
					ctor: '_Tuple2',
					_0: '  \"dependencies\":{\n}\n',
					_1: A3(_panosoft$elm_utils$Utils_Regex$replaceFirst, '†\\}†$', ',†  \"dependencies\": {†}†}†', singleLineJson)
				});
		}(
			A3(_panosoft$elm_utils$Utils_Regex$replaceAll, '\\n', '†', json)));
};
var _panosoft$elm_grove$NpmJson$decodeNpmJsonDependencies = function (npmPackageJson) {
	return function (_p6) {
		var _p7 = _p6;
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['??='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|??>'],
				A2(_elm_lang$core$Json_Decode$decodeString, _panosoft$elm_grove$NpmJson$npmDependenciesDecoder, _p7._0),
				function (npmDependencies) {
					return _elm_lang$core$Result$Ok(
						{ctor: '_Tuple2', _0: npmDependencies, _1: _p7._1});
				}),
			function (error) {
				return _elm_lang$core$Result$Err(
					A2(
						_panosoft$elm_string_utils$StringUtils_ops['+-+'],
						A2(
							_panosoft$elm_string_utils$StringUtils_ops['+-+'],
							A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to decode dependencies in', _panosoft$elm_grove$Package$npmJsonFilename),
							'Error:'),
						error));
			});
	}(
		_panosoft$elm_grove$NpmJson$extractOrAddDependencies(npmPackageJson));
};
var _panosoft$elm_grove$NpmJson$replaceDependencies = F2(
	function (singleLineJson, dependenciesStr) {
		return A3(
			_panosoft$elm_utils$Utils_Regex$replaceAll,
			'†',
			'\n',
			A3(
				_panosoft$elm_utils$Utils_Regex$replaceFirst,
				_panosoft$elm_grove$NpmJson$dependenciesRegex,
				A3(
					_panosoft$elm_utils$Utils_Regex$replaceAll,
					'\\}$',
					'  }',
					A2(_elm_lang$core$Basics_ops['++'], '\"dependencies\": ', dependenciesStr)),
				singleLineJson));
	});
var _panosoft$elm_grove$NpmJson$versionRegex = '\"version\":\\s*\"\\d+\\.\\d+\\.\\d+\"';
var _panosoft$elm_grove$NpmJson$extractVersion = function (json) {
	return function (singleLineJson) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|?>'],
				_elm_lang$core$List$head(
					A3(
						_elm_lang$core$Regex$find,
						_elm_lang$core$Regex$AtMost(1),
						_elm_lang$core$Regex$regex(_panosoft$elm_grove$NpmJson$versionRegex),
						singleLineJson)),
				function (match) {
					return function (versionStr) {
						return _elm_lang$core$Maybe$Just(
							{
								ctor: '_Tuple2',
								_0: A3(
									_panosoft$elm_utils$Utils_Regex$replaceAll,
									'\"',
									'',
									A3(_panosoft$elm_utils$Utils_Regex$replaceFirst, '\"version\":\\s*', '', versionStr)),
								_1: singleLineJson
							});
					}(
						A3(_panosoft$elm_utils$Utils_Regex$replaceAll, '†', '\n', match.match));
				}),
			_elm_lang$core$Maybe$Nothing);
	}(
		A3(_panosoft$elm_utils$Utils_Regex$replaceAll, '\\n', '†', json));
};
var _panosoft$elm_grove$NpmJson$decodeNpmJsonVersion = function (npmPackageJson) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['?='],
		A2(
			_panosoft$elm_utils$Utils_Ops_ops['|?>'],
			_panosoft$elm_grove$NpmJson$extractVersion(npmPackageJson),
			function (_p8) {
				var _p9 = _p8;
				var _p10 = _p9._0;
				return A2(
					_panosoft$elm_utils$Utils_Ops_ops['?='],
					A2(
						_panosoft$elm_utils$Utils_Ops_ops['|?>'],
						_panosoft$elm_grove$Version$versionFromString(_p10),
						function (version) {
							return _elm_lang$core$Result$Ok(
								{ctor: '_Tuple2', _0: version, _1: _p9._1});
						}),
					_elm_lang$core$Result$Err(
						A2(
							_panosoft$elm_string_utils$StringUtils_ops['+-+'],
							A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Bad version string in', _panosoft$elm_grove$Package$npmJsonFilename),
							_panosoft$elm_grove$Output$parens(_p10))));
			}),
		_elm_lang$core$Result$Err(
			A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Missing version in', _panosoft$elm_grove$Package$npmJsonFilename)));
};
var _panosoft$elm_grove$NpmJson$replaceVersion = F2(
	function (singleLineJson, versionStr) {
		return A3(
			_panosoft$elm_utils$Utils_Regex$replaceAll,
			'†',
			'\n',
			A3(
				_panosoft$elm_utils$Utils_Regex$replaceFirst,
				_panosoft$elm_grove$NpmJson$versionRegex,
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], '\"version\":', '\"'),
					A2(_elm_lang$core$Basics_ops['++'], versionStr, '\"')),
				singleLineJson));
	});

const _panosoft$elm_grove$Native_Env = (_ => {
	///////////////////////////////////////////////////////////////////////////////////////////////////
	const env = JSON.stringify(process.env);
	const homedir = require('os').homedir();
	const tmpdir = require('os').tmpdir();

	return {
		env,
		homedir,
		tmpdir
	};
})();

var _panosoft$elm_grove$Env$tmpdir = _panosoft$elm_grove$Native_Env.tmpdir;
var _panosoft$elm_grove$Env$homedir = _panosoft$elm_grove$Native_Env.homedir;
var _panosoft$elm_grove$Env$env = A2(
	_panosoft$elm_utils$Utils_Ops_ops['??='],
	A2(
		_elm_lang$core$Json_Decode$decodeString,
		_elm_lang$core$Json_Decode$dict(_elm_lang$core$Json_Decode$string),
		_panosoft$elm_grove$Native_Env.env),
	function (_p0) {
		return _elm_lang$core$Native_Utils.crash(
			'Env',
			{
				start: {line: 17, column: 20},
				end: {line: 17, column: 31}
			})('BUG: Cannot decode env');
	});

var _panosoft$elm_grove$Component_Config$localOrGlobalPath = function (config) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['|?->'],
		config.local,
		{
			ctor: '_Tuple2',
			_0: _panosoft$elm_grove$Env$homedir,
			_1: A2(
				_elm_lang$core$Basics$flip,
				F2(
					function (x, y) {
						return A2(_panosoft$elm_utils$Utils_Ops_ops['?'], x, y);
					}),
				{ctor: '_Tuple2', _0: '.', _1: _panosoft$elm_grove$Env$homedir})
		});
};
var _panosoft$elm_grove$Component_Config$pathJoin = F2(
	function (config, pathParts) {
		return A3(_panosoft$elm_grove$AppUtils$pathJoin, config.pathSep, config.cwd, pathParts);
	});
var _panosoft$elm_grove$Component_Config$configPath = F2(
	function (config, path) {
		return A2(
			_panosoft$elm_grove$Component_Config$pathJoin,
			config,
			{
				ctor: '::',
				_0: A2(
					_panosoft$elm_utils$Utils_Ops_ops['?'],
					config.testing,
					{ctor: '_Tuple2', _0: 'test', _1: path}),
				_1: {
					ctor: '::',
					_0: config.configFilename,
					_1: {ctor: '[]'}
				}
			});
	});
var _panosoft$elm_grove$Component_Config$encoder = function (configFile) {
	return _elm_lang$core$Json_Encode$object(
		_elm_lang$core$List$concat(
			{
				ctor: '::',
				_0: A2(
					_panosoft$elm_utils$Utils_Ops_ops['|?->'],
					configFile.safeMode,
					{
						ctor: '_Tuple2',
						_0: {ctor: '[]'},
						_1: function (safeMode) {
							return {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'safeMode',
									_1: _elm_lang$core$Json_Encode$string(
										function () {
											var _p0 = safeMode;
											switch (_p0.ctor) {
												case 'SafeModeOn':
													return 'on';
												case 'SafeModeOff':
													return 'off';
												default:
													return 'none';
											}
										}())
								},
								_1: {ctor: '[]'}
							};
						}
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_panosoft$elm_utils$Utils_Ops_ops['|?->'],
						configFile.generateDocs,
						{
							ctor: '_Tuple2',
							_0: {ctor: '[]'},
							_1: function (generateDocs) {
								return {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: 'generateDocs',
										_1: _elm_lang$core$Json_Encode$string(
											function () {
												var _p1 = generateDocs;
												if (_p1.ctor === 'GenerateDocsOn') {
													return 'on';
												} else {
													return 'off';
												}
											}())
									},
									_1: {ctor: '[]'}
								};
							}
						}),
					_1: {ctor: '[]'}
				}
			}));
};
var _panosoft$elm_grove$Component_Config$defaultConfigFile = {safeMode: _elm_lang$core$Maybe$Nothing, generateDocs: _elm_lang$core$Maybe$Nothing};
var _panosoft$elm_grove$Component_Config$defaultConfigFileString = A2(
	_elm_lang$core$Json_Encode$encode,
	4,
	_panosoft$elm_grove$Component_Config$encoder(_panosoft$elm_grove$Component_Config$defaultConfigFile));
var _panosoft$elm_grove$Component_Config$Config = F9(
	function (a, b, c, d, e, f, g, h, i) {
		return {testing: a, routeToMe: b, operationComplete: c, cwd: d, pathSep: e, configFilename: f, local: g, safe: h, docs: i};
	});
var _panosoft$elm_grove$Component_Config$Model = function (a) {
	return {configFile: a};
};
var _panosoft$elm_grove$Component_Config$ConfigFile = F2(
	function (a, b) {
		return {safeMode: a, generateDocs: b};
	});
var _panosoft$elm_grove$Component_Config$SafeModeNone = {ctor: 'SafeModeNone'};
var _panosoft$elm_grove$Component_Config$safeMode = F2(
	function (config, model) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['|?->'],
			model.configFile,
			{
				ctor: '_Tuple2',
				_0: _panosoft$elm_grove$Component_Config$SafeModeNone,
				_1: function (configFile) {
					return A2(_panosoft$elm_utils$Utils_Ops_ops['?='], configFile.safeMode, _panosoft$elm_grove$Component_Config$SafeModeNone);
				}
			});
	});
var _panosoft$elm_grove$Component_Config$SafeModeOff = {ctor: 'SafeModeOff'};
var _panosoft$elm_grove$Component_Config$SafeModeOn = {ctor: 'SafeModeOn'};
var _panosoft$elm_grove$Component_Config$GenerateDocsOff = {ctor: 'GenerateDocsOff'};
var _panosoft$elm_grove$Component_Config$generateDocs = F2(
	function (config, model) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['|?->'],
			model.configFile,
			{
				ctor: '_Tuple2',
				_0: _panosoft$elm_grove$Component_Config$GenerateDocsOff,
				_1: function (configFile) {
					return A2(_panosoft$elm_utils$Utils_Ops_ops['?='], configFile.generateDocs, _panosoft$elm_grove$Component_Config$GenerateDocsOff);
				}
			});
	});
var _panosoft$elm_grove$Component_Config$GenerateDocsOn = {ctor: 'GenerateDocsOn'};
var _panosoft$elm_grove$Component_Config$decoder = A2(
	_panosoft$elm_utils$Utils_Json_ops['<||'],
	A2(
		_panosoft$elm_utils$Utils_Json_ops['<||'],
		_elm_lang$core$Json_Decode$succeed(_panosoft$elm_grove$Component_Config$ConfigFile),
		A2(
			_elm_lang$core$Json_Decode$andThen,
			function (maybeSafe) {
				return _elm_lang$core$Json_Decode$succeed(
					A2(
						_panosoft$elm_utils$Utils_Ops_ops['|?->'],
						maybeSafe,
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Maybe$Nothing,
							_1: function (safe) {
								return _elm_lang$core$Maybe$Just(
									function () {
										var _p2 = _elm_lang$core$String$toLower(safe);
										switch (_p2) {
											case 'on':
												return _panosoft$elm_grove$Component_Config$SafeModeOn;
											case 'off':
												return _panosoft$elm_grove$Component_Config$SafeModeOff;
											default:
												return _panosoft$elm_grove$Component_Config$SafeModeNone;
										}
									}());
							}
						}));
			},
			_elm_lang$core$Json_Decode$maybe(
				A2(_elm_lang$core$Json_Decode$field, 'safeMode', _elm_lang$core$Json_Decode$string)))),
	A2(
		_elm_lang$core$Json_Decode$andThen,
		function (maybeGenerateDocs) {
			return _elm_lang$core$Json_Decode$succeed(
				A2(
					_panosoft$elm_utils$Utils_Ops_ops['|?->'],
					maybeGenerateDocs,
					{
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Nothing,
						_1: function (generateDocs) {
							return _elm_lang$core$Maybe$Just(
								function () {
									var _p3 = _elm_lang$core$String$toLower(generateDocs);
									if (_p3 === 'on') {
										return _panosoft$elm_grove$Component_Config$GenerateDocsOn;
									} else {
										return _panosoft$elm_grove$Component_Config$GenerateDocsOff;
									}
								}());
						}
					}));
		},
		_elm_lang$core$Json_Decode$maybe(
			A2(_elm_lang$core$Json_Decode$field, 'generateDocs', _elm_lang$core$Json_Decode$string))));
var _panosoft$elm_grove$Component_Config$ConfigurationComplete = function (a) {
	return {ctor: 'ConfigurationComplete', _0: a};
};
var _panosoft$elm_grove$Component_Config$configure = F2(
	function (config, model) {
		return function (configFile) {
			return function (path) {
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							configFile: _elm_lang$core$Maybe$Just(configFile)
						}),
					{
						ctor: '::',
						_0: A2(
							_elm_lang$core$Task$attempt,
							function (_p4) {
								return config.routeToMe(
									_panosoft$elm_grove$Component_Config$ConfigurationComplete(_p4));
							},
							A2(
								_panosoft$elm_grove$AppUtils$writeFile,
								path,
								A2(
									_elm_lang$core$Json_Encode$encode,
									2,
									_panosoft$elm_grove$Component_Config$encoder(configFile)))),
						_1: {ctor: '[]'}
					});
			}(
				A2(
					_panosoft$elm_utils$Utils_Ops_ops['?'],
					A2(_panosoft$elm_utils$Utils_Ops_ops['?='], config.local, false),
					{
						ctor: '_Tuple2',
						_0: config.configFilename,
						_1: A2(
							_panosoft$elm_grove$Component_Config$configPath,
							config,
							_panosoft$elm_grove$Component_Config$localOrGlobalPath(config))
					}));
		}(
			function (configFile) {
				return A2(
					_panosoft$elm_utils$Utils_Ops_ops['|?->'],
					config.docs,
					{
						ctor: '_Tuple2',
						_0: configFile,
						_1: function (docs) {
							return function (generateDocs) {
								return _elm_lang$core$Native_Utils.update(
									configFile,
									{generateDocs: generateDocs});
							}(
								function () {
									var _p5 = docs;
									switch (_p5) {
										case 'on':
											return _elm_lang$core$Maybe$Just(_panosoft$elm_grove$Component_Config$GenerateDocsOn);
										case 'off':
											return _elm_lang$core$Maybe$Just(_panosoft$elm_grove$Component_Config$GenerateDocsOff);
										case '':
											return _elm_lang$core$Maybe$Nothing;
										default:
											return A2(
												_panosoft$elm_grove$AppUtils$bug,
												'Should never get here',
												_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing));
									}
								}());
						}
					});
			}(
				function (configFile) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['|?->'],
						config.safe,
						{
							ctor: '_Tuple2',
							_0: configFile,
							_1: function (safe) {
								return function (safeMode) {
									return _elm_lang$core$Native_Utils.update(
										configFile,
										{safeMode: safeMode});
								}(
									function () {
										var _p6 = safe;
										switch (_p6) {
											case 'on':
												return _elm_lang$core$Maybe$Just(_panosoft$elm_grove$Component_Config$SafeModeOn);
											case 'off':
												return _elm_lang$core$Maybe$Just(_panosoft$elm_grove$Component_Config$SafeModeOff);
											case 'none':
												return _elm_lang$core$Maybe$Just(_panosoft$elm_grove$Component_Config$SafeModeNone);
											case '':
												return _elm_lang$core$Maybe$Nothing;
											default:
												return A2(
													_panosoft$elm_grove$AppUtils$bug,
													'Should never get here',
													_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing));
										}
									}());
							}
						});
				}(
					A2(
						_panosoft$elm_utils$Utils_Ops_ops['?!='],
						model.configFile,
						_panosoft$elm_grove$AppUtils$bugMissing('configFile')))));
	});
var _panosoft$elm_grove$Component_Config$ConfigFileRead = F2(
	function (a, b) {
		return {ctor: 'ConfigFileRead', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Config$init = F2(
	function (config, initializedMsg) {
		return {
			ctor: '_Tuple2',
			_0: {configFile: _elm_lang$core$Maybe$Nothing},
			_1: _elm_lang$core$Maybe$Just(
				function (_p7) {
					var _p8 = _p7;
					var _p15 = _p8._0;
					var _p14 = _p8._1;
					return A2(
						_elm_lang$core$Task$attempt,
						function (_p9) {
							return config.routeToMe(
								A2(_panosoft$elm_grove$Component_Config$ConfigFileRead, initializedMsg, _p9));
						},
						A2(
							_elm_lang$core$Task$andThen,
							function (_p10) {
								var _p11 = _p10;
								return _elm_lang$core$Task$succeed(
									{
										ctor: '_Tuple2',
										_0: {ctor: '_Tuple2', _0: _p11._0, _1: _p15},
										_1: {ctor: '_Tuple2', _0: _p11._1, _1: _p14}
									});
							},
							A2(
								_elm_lang$core$Task$andThen,
								function (localData) {
									return A2(
										_elm_lang$core$Task$onError,
										function (nodeError) {
											var _p12 = nodeError;
											if (_p12.ctor === 'SystemError') {
												return A2(
													_panosoft$elm_utils$Utils_Ops_ops['?'],
													_elm_lang$core$Native_Utils.eq(_p12._0, _elm_node$core$Node_Error$NoSuchFileOrDirectory),
													{
														ctor: '_Tuple2',
														_0: _elm_lang$core$Task$succeed(
															{ctor: '_Tuple2', _0: localData, _1: _panosoft$elm_grove$Component_Config$defaultConfigFileString}),
														_1: _elm_lang$core$Task$fail(
															{ctor: '_Tuple2', _0: nodeError, _1: _p14})
													});
											} else {
												return _elm_lang$core$Task$fail(
													{ctor: '_Tuple2', _0: nodeError, _1: _p14});
											}
										},
										A2(
											_elm_lang$core$Task$andThen,
											function (globalData) {
												return _elm_lang$core$Task$succeed(
													{ctor: '_Tuple2', _0: localData, _1: globalData});
											},
											A2(_elm_node$core$Node_FileSystem$readFileAsString, _p14, _elm_node$core$Node_Encoding$Utf8)));
								},
								A2(
									_elm_lang$core$Task$onError,
									function (nodeError) {
										var _p13 = nodeError;
										if (_p13.ctor === 'SystemError') {
											return A2(
												_panosoft$elm_utils$Utils_Ops_ops['?'],
												_elm_lang$core$Native_Utils.eq(_p13._0, _elm_node$core$Node_Error$NoSuchFileOrDirectory),
												{
													ctor: '_Tuple2',
													_0: _elm_lang$core$Task$succeed(_panosoft$elm_grove$Component_Config$defaultConfigFileString),
													_1: _elm_lang$core$Task$fail(
														{ctor: '_Tuple2', _0: nodeError, _1: _p15})
												});
										} else {
											return _elm_lang$core$Task$fail(
												{ctor: '_Tuple2', _0: nodeError, _1: _p15});
										}
									},
									A2(_elm_node$core$Node_FileSystem$readFileAsString, _p15, _elm_node$core$Node_Encoding$Utf8)))));
				}(
					{
						ctor: '_Tuple2',
						_0: A2(_panosoft$elm_grove$Component_Config$configPath, config, '.'),
						_1: A2(_panosoft$elm_grove$Component_Config$configPath, config, _panosoft$elm_grove$Env$homedir)
					}))
		};
	});
var _panosoft$elm_grove$Component_Config$OperationComplete = function (a) {
	return {ctor: 'OperationComplete', _0: a};
};
var _panosoft$elm_grove$Component_Config$operationError = F2(
	function (model, task) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Task$perform,
						function (_p16) {
							return _panosoft$elm_grove$Component_Config$OperationComplete(-1);
						},
						task),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	});
var _panosoft$elm_grove$Component_Config$operationSuccessful = F2(
	function (model, task) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Task$perform,
						function (_p17) {
							return _panosoft$elm_grove$Component_Config$OperationComplete(0);
						},
						task),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	});
var _panosoft$elm_grove$Component_Config$update = F3(
	function (config, msg, model) {
		var _p18 = msg;
		switch (_p18.ctor) {
			case 'OperationComplete':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: config.operationComplete(_p18._0),
						_1: {ctor: '[]'}
					}
				};
			case 'ConfigFileRead':
				if (_p18._1.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Config$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to read:', _p18._1._0._1),
									'Error:'),
								_p18._1._0._0)));
				} else {
					return function (decodingError) {
						return A2(
							_panosoft$elm_utils$Utils_Ops_ops['|??**>'],
							{
								ctor: '_Tuple2',
								_0: A2(_elm_lang$core$Json_Decode$decodeString, _panosoft$elm_grove$Component_Config$decoder, _p18._1._0._0._0),
								_1: A2(_elm_lang$core$Json_Decode$decodeString, _panosoft$elm_grove$Component_Config$decoder, _p18._1._0._1._0)
							},
							{
								ctor: '_Tuple3',
								_0: decodingError(_p18._1._0._0._1),
								_1: decodingError(_p18._1._0._1._1),
								_2: function (_p19) {
									var _p20 = _p19;
									var _p22 = _p20._0;
									var _p21 = _p20._1;
									return function (configFile) {
										return {
											ctor: '_Tuple2',
											_0: A2(
												_elm_lang$core$Platform_Cmd_ops['!'],
												_elm_lang$core$Native_Utils.update(
													model,
													{
														configFile: _elm_lang$core$Maybe$Just(configFile)
													}),
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: _p18._0,
												_1: {ctor: '[]'}
											}
										};
									}(
										{
											safeMode: A2(
												_panosoft$elm_utils$Utils_Ops_ops['|?->'],
												_p22.safeMode,
												{ctor: '_Tuple2', _0: _p21.safeMode, _1: _elm_lang$core$Maybe$Just}),
											generateDocs: A2(
												_panosoft$elm_utils$Utils_Ops_ops['|?->'],
												_p22.generateDocs,
												{ctor: '_Tuple2', _0: _p21.generateDocs, _1: _elm_lang$core$Maybe$Just})
										});
								}
							});
					}(
						F2(
							function (path, error) {
								return A2(
									_panosoft$elm_grove$Component_Config$operationError,
									model,
									_panosoft$elm_grove$Output$errorLog(
										A2(
											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
											A2(
												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
												A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Config file:', path),
												'decoding error:'),
											error)));
							}));
				}
			default:
				if (_p18._0.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Config$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(
										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
										'Unable to write:',
										_panosoft$elm_grove$Component_Config$configPath(config)),
									'Error:'),
								_p18._0._0)));
				} else {
					return A2(
						_panosoft$elm_grove$Component_Config$operationSuccessful,
						model,
						_panosoft$elm_grove$Console$log('Grove configuration updated'));
				}
		}
	});

const _panosoft$elm_grove$Native_Spawn = (_ => {
	const { spawn } = require('child_process');
	/* global _elm_lang$core$Native_Scheduler:false _elm_lang$core$Native_List:false */
	const { nativeBinding, succeed, fail } = _elm_lang$core$Native_Scheduler;
	///////////////////////////////////////////////////////////////////////////////////////////////////
	const exec = (cmdLine, successExitCode, silent) => nativeBinding(callback => {
		try {
			const cmdLineParts = cmdLine.split(' ');
			const cmd = spawn(cmdLineParts[0], cmdLineParts.slice(1, cmdLineParts.length));
			if (!silent) {
				cmd.stdout.on('data', data => process.stdout.write(data.toString()));
				cmd.stderr.on('data', data => process.stderr.write(data.toString()));
			}
			cmd.on('exit', exitCode => callback(exitCode == successExitCode ? succeed() : fail(Error(`Exited with error code: ${exitCode}`))));
		}
		catch (error) {callback(fail(error));}
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////
	/* global F3:false */
	return {
		exec: F3(exec)
	};
})();

var _panosoft$elm_grove$Spawn$exec = A2(
	_panosoft$elm_utils$Utils_Func$compose3,
	_elm_lang$core$Task$mapError(_elm_node$core$Node_Error$fromValue),
	_panosoft$elm_grove$Native_Spawn.exec);

var _panosoft$elm_grove$DocGenerator$pathJoin = F2(
	function (config, pathParts) {
		return A3(_panosoft$elm_grove$AppUtils$pathJoin, config.pathSep, config.cwd, pathParts);
	});
var _panosoft$elm_grove$DocGenerator$docsJsonFilename = 'documentation.json';
var _panosoft$elm_grove$DocGenerator$elmDocsPath = 'elm-docs';
var _panosoft$elm_grove$DocGenerator$generateDocs = function (config) {
	return A2(
		_elm_lang$core$Task$andThen,
		function (_p0) {
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				_elm_lang$core$Native_Utils.eq(config.generateDocs, _panosoft$elm_grove$Component_Config$GenerateDocsOn),
				{
					ctor: '_Tuple2',
					_0: function (docsJsonFilename) {
						return A2(
							_elm_lang$core$Task$mapError,
							function (error) {
								return A2(_elm_node$core$Node_Error$Error, error, '');
							},
							A2(
								_elm_lang$core$Task$andThen,
								function (_p1) {
									return A3(
										_panosoft$elm_docs$Docs_Generator$generate,
										config.pathSep,
										docsJsonFilename,
										A2(
											_panosoft$elm_grove$DocGenerator$pathJoin,
											config,
											{
												ctor: '::',
												_0: '.',
												_1: {
													ctor: '::',
													_0: _panosoft$elm_grove$DocGenerator$elmDocsPath,
													_1: {ctor: '[]'}
												}
											}));
								},
								A2(
									_elm_lang$core$Task$onError,
									function (error) {
										return A2(
											_elm_lang$core$Task$onError,
											function (_p2) {
												return _elm_lang$core$Task$fail(error);
											},
											A3(
												_panosoft$elm_grove$Spawn$exec,
												A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'elm-make --docs', docsJsonFilename),
												0,
												false));
									},
									A2(
										_elm_lang$core$Task$mapError,
										function (error) {
											return A2(
												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
												'Elm compilation failure:',
												_elm_node$core$Node_Error$message(error));
										},
										A3(
											_panosoft$elm_grove$Spawn$exec,
											A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'elm-make --docs', docsJsonFilename),
											0,
											true)))));
					}(
						A2(
							_panosoft$elm_grove$DocGenerator$pathJoin,
							config,
							{
								ctor: '::',
								_0: _panosoft$elm_grove$Env$tmpdir,
								_1: {
									ctor: '::',
									_0: _panosoft$elm_grove$DocGenerator$docsJsonFilename,
									_1: {ctor: '[]'}
								}
							})),
					_1: _elm_lang$core$Task$succeed(
						{ctor: '_Tuple0'})
				});
		},
		_elm_node$core$Node_FileSystem$remove(
			A2(
				_panosoft$elm_grove$DocGenerator$pathJoin,
				config,
				{
					ctor: '::',
					_0: config.cwd,
					_1: {
						ctor: '::',
						_0: A2(
							_panosoft$elm_utils$Utils_Ops_ops['?'],
							config.testing,
							{ctor: '_Tuple2', _0: 'test', _1: ''}),
						_1: {
							ctor: '::',
							_0: _panosoft$elm_grove$DocGenerator$elmDocsPath,
							_1: {ctor: '[]'}
						}
					}
				})));
};
var _panosoft$elm_grove$DocGenerator$Config = F4(
	function (a, b, c, d) {
		return {testing: a, cwd: b, pathSep: c, generateDocs: d};
	});

const _panosoft$elm_grove$Native_Glob = (_ => {
	const glob = require('glob');
	/* global _elm_lang$core$Native_Scheduler:false _elm_lang$core$Native_List:false */
	const { nativeBinding, succeed, fail } = _elm_lang$core$Native_Scheduler;
	const { fromArray } = _elm_lang$core$Native_List;
	///////////////////////////////////////////////////////////////////////////////////////////////////
	const isNothing = (v => v.ctor == 'Nothing');
	const find = (pattern, ignore, follow) => nativeBinding(callback => {
		try {
			ignore =isNothing(ignore) ? null : ignore._0;
			glob(pattern, {ignore, follow}, (err, matches) => callback(err ? fail(err) : succeed(fromArray(matches))));
		}
		catch (error) { fail(error); }
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////
	/* global F3:false */
	return {
		find: F3(find)
	};
})();

var _panosoft$elm_grove$Glob$find = A2(
	_panosoft$elm_utils$Utils_Func$compose3,
	_elm_lang$core$Task$mapError(_elm_node$core$Node_Error$fromValue),
	_panosoft$elm_grove$Native_Glob.find);

var _panosoft$elm_grove$Component_Bump$delayUpdateMsg = F2(
	function (msg, delay) {
		return A2(
			_elm_lang$core$Task$perform,
			function (_p0) {
				return msg;
			},
			_elm_lang$core$Process$sleep(delay));
	});
var _panosoft$elm_grove$Component_Bump$decodeExactDependencies = F2(
	function (path, exactDependenciesJson) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['??='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|??>'],
				A2(
					_elm_lang$core$Json_Decode$decodeString,
					_elm_lang$core$Json_Decode$dict(_elm_lang$core$Json_Decode$string),
					exactDependenciesJson),
				_elm_lang$core$Result$Ok),
			function (error) {
				return _elm_lang$core$Result$Err(
					A2(
						_panosoft$elm_string_utils$StringUtils_ops['+-+'],
						A2(
							_panosoft$elm_string_utils$StringUtils_ops['+-+'],
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Cannot decode JSON in', _panosoft$elm_grove$Package$exactDependenciesFileName),
									'location:'),
								path),
							'Error:'),
						error));
			});
	});
var _panosoft$elm_grove$Component_Bump$pathJoin = F2(
	function (config, pathParts) {
		return A3(_panosoft$elm_grove$AppUtils$pathJoin, config.pathSep, config.cwd, pathParts);
	});
var _panosoft$elm_grove$Component_Bump$Config = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return {testing: a, dryRun: b, major: c, minor: d, patch: e, allowUncommitted: f, allowOldDependencies: g, routeToMe: h, operationComplete: i, elmVersion: j, cwd: k, pathSep: l, generateDocs: m};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _panosoft$elm_grove$Component_Bump$Model = F8(
	function (a, b, c, d, e, f, g, h) {
		return {exactDependencies: a, elmJson: b, npmJsonStr: c, linkCheckCount: d, linkedPackages: e, newVersionCheckCountDown: f, newVersionCheckFailed: g, elmJsonIndent: h};
	});
var _panosoft$elm_grove$Component_Bump$ReadingNpmPackage = function (a) {
	return {ctor: 'ReadingNpmPackage', _0: a};
};
var _panosoft$elm_grove$Component_Bump$ReadingElmPackage = function (a) {
	return {ctor: 'ReadingElmPackage', _0: a};
};
var _panosoft$elm_grove$Component_Bump$ReadingExactDependencies = function (a) {
	return {ctor: 'ReadingExactDependencies', _0: a};
};
var _panosoft$elm_grove$Component_Bump$GettingTags = function (a) {
	return {ctor: 'GettingTags', _0: a};
};
var _panosoft$elm_grove$Component_Bump$BumpComplete = F3(
	function (a, b, c) {
		return {ctor: 'BumpComplete', _0: a, _1: b, _2: c};
	});
var _panosoft$elm_grove$Component_Bump$doBump = F2(
	function (config, model) {
		return function (_p1) {
			var _p2 = _p1;
			return A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(_elm_lang$core$Task$attempt, _p2._0, _p2._1),
					_1: {ctor: '[]'}
				});
		}(
			function (_p3) {
				var _p4 = _p3;
				return A2(
					F2(
						function (v0, v1) {
							return {ctor: '_Tuple2', _0: v0, _1: v1};
						}),
					_p4._1,
					A2(
						_elm_lang$core$Task$andThen,
						function (_p5) {
							return _elm_lang$core$Task$succeed(
								{ctor: '_Tuple0'});
						},
						A2(
							_elm_lang$core$Task$andThen,
							function (repo) {
								return A2(
									_panosoft$elm_grove$Git$createLightweightTag,
									repo,
									_panosoft$elm_grove$Version$versionToString(_p4._0));
							},
							_p4._2)));
			}(
				function (_p6) {
					var _p7 = _p6;
					var _p19 = _p7._0;
					var _p18 = _p7._2;
					return A3(
						F3(
							function (v0, v1, v2) {
								return {ctor: '_Tuple3', _0: v0, _1: v1, _2: v2};
							}),
						_p19,
						_p7._1,
						function (_p8) {
							var _p9 = _p8;
							return A2(
								_elm_lang$core$Task$andThen,
								function (repo) {
									return A2(
										_elm_lang$core$Task$andThen,
										function (_p10) {
											return _elm_lang$core$Task$succeed(repo);
										},
										function (filesToAdd) {
											return A2(
												_elm_lang$core$Task$andThen,
												function (docFiles) {
													return function (docFiles) {
														return A2(
															_elm_lang$core$Task$andThen,
															function (_p11) {
																var _p12 = _p11;
																return A4(
																	_panosoft$elm_grove$Git$commit,
																	repo,
																	_elm_lang$core$List$concat(
																		{
																			ctor: '::',
																			_0: docFiles,
																			_1: {
																				ctor: '::',
																				_0: filesToAdd,
																				_1: {ctor: '[]'}
																			}
																		}),
																	_p12.deleted,
																	A2(
																		_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																		'Bumped version to',
																		_panosoft$elm_grove$Version$versionToString(_p19)));
															},
															_panosoft$elm_grove$Git$getFileStatuses(repo));
													}(
														A2(
															_elm_lang$core$List$map,
															A2(
																_panosoft$elm_utils$Utils_Regex$replaceFirst,
																_elm_lang$core$Regex$escape(
																	A2(_elm_lang$core$Basics_ops['++'], config.cwd, config.pathSep)),
																''),
															docFiles));
												},
												A2(
													_elm_lang$core$Task$mapError,
													_elm_node$core$Node_Error$message,
													A3(
														_panosoft$elm_grove$Glob$find,
														A2(
															_panosoft$elm_grove$Component_Bump$pathJoin,
															config,
															{
																ctor: '::',
																_0: _panosoft$elm_grove$DocGenerator$elmDocsPath,
																_1: {
																	ctor: '::',
																	_0: '**',
																	_1: {
																		ctor: '::',
																		_0: '*',
																		_1: {ctor: '[]'}
																	}
																}
															}),
														_elm_lang$core$Maybe$Nothing,
														false)));
										}(
											A2(
												_panosoft$elm_utils$Utils_Ops_ops['|?!**>'],
												{ctor: '_Tuple2', _0: model.elmJson, _1: model.npmJsonStr},
												{
													ctor: '_Tuple3',
													_0: _panosoft$elm_grove$AppUtils$bugMissing('elmJsonStr'),
													_1: _elm_lang$core$Basics$always(
														{
															ctor: '::',
															_0: _panosoft$elm_grove$Package$elmJsonFilename,
															_1: {ctor: '[]'}
														}),
													_2: _elm_lang$core$Basics$always(
														{
															ctor: '::',
															_0: _panosoft$elm_grove$Package$elmJsonFilename,
															_1: {
																ctor: '::',
																_0: _panosoft$elm_grove$Package$npmJsonFilename,
																_1: {ctor: '[]'}
															}
														})
												})));
								},
								A2(
									_elm_lang$core$Task$andThen,
									function (_p13) {
										return _panosoft$elm_grove$Git$getRepo(_p9._0);
									},
									_p9._1));
						}(
							A2(
								_panosoft$elm_utils$Utils_Ops_ops['?'],
								config.testing,
								{
									ctor: '_Tuple2',
									_0: {
										ctor: '_Tuple2',
										_0: A2(
											_panosoft$elm_grove$Component_Bump$pathJoin,
											config,
											{
												ctor: '::',
												_0: config.cwd,
												_1: {
													ctor: '::',
													_0: 'test',
													_1: {ctor: '[]'}
												}
											}),
										_1: A2(
											_elm_lang$core$Task$andThen,
											function (_p14) {
												return _elm_lang$core$Task$succeed(
													{ctor: '_Tuple0'});
											},
											A2(
												_elm_lang$core$Task$andThen,
												function (_p15) {
													return _panosoft$elm_grove$Git$initRepo(
														A2(
															_panosoft$elm_grove$Component_Bump$pathJoin,
															config,
															{
																ctor: '::',
																_0: config.cwd,
																_1: {
																	ctor: '::',
																	_0: 'test',
																	_1: {
																		ctor: '::',
																		_0: '.git',
																		_1: {ctor: '[]'}
																	}
																}
															}));
												},
												A2(
													_elm_lang$core$Task$mapError,
													_elm_node$core$Node_Error$message,
													A2(
														_elm_lang$core$Task$andThen,
														function (_p16) {
															return _elm_node$core$Node_FileSystem$remove(
																A2(
																	_panosoft$elm_grove$Component_Bump$pathJoin,
																	config,
																	{
																		ctor: '::',
																		_0: config.cwd,
																		_1: {
																			ctor: '::',
																			_0: 'test',
																			_1: {
																				ctor: '::',
																				_0: '.git',
																				_1: {ctor: '[]'}
																			}
																		}
																	}));
														},
														_p18))))
									},
									_1: {
										ctor: '_Tuple2',
										_0: config.cwd,
										_1: A2(
											_elm_lang$core$Task$andThen,
											function (_p17) {
												return _elm_lang$core$Task$succeed(
													{ctor: '_Tuple0'});
											},
											A2(_elm_lang$core$Task$mapError, _elm_node$core$Node_Error$message, _p18))
									}
								})));
				}(
					function (_p20) {
						var _p21 = _p20;
						var _p23 = _p21._0;
						return A3(
							F3(
								function (v0, v1, v2) {
									return {ctor: '_Tuple3', _0: v0, _1: v1, _2: v2};
								}),
							_p23,
							_p21._1,
							A2(
								_elm_lang$core$Task$andThen,
								function (_p22) {
									return A2(
										_panosoft$elm_utils$Utils_Ops_ops['|?->'],
										model.npmJsonStr,
										{
											ctor: '_Tuple2',
											_0: _elm_lang$core$Task$succeed(
												{ctor: '_Tuple0'}),
											_1: function (npmJsonStr) {
												return A2(
													_panosoft$elm_grove$AppUtils$writeFile,
													A2(
														_panosoft$elm_grove$Component_Bump$pathJoin,
														config,
														{
															ctor: '::',
															_0: config.cwd,
															_1: {
																ctor: '::',
																_0: A2(
																	_panosoft$elm_utils$Utils_Ops_ops['?'],
																	config.testing,
																	{ctor: '_Tuple2', _0: 'test', _1: ''}),
																_1: {
																	ctor: '::',
																	_0: _panosoft$elm_grove$Package$npmJsonFilename,
																	_1: {ctor: '[]'}
																}
															}
														}),
													A3(
														_elm_lang$core$Basics$flip,
														_panosoft$elm_grove$NpmJson$replaceVersion,
														_panosoft$elm_grove$Version$versionToString(_p23),
														npmJsonStr));
											}
										});
								},
								_p21._2));
					}(
						function (bumpTask) {
							return A2(
								_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
								model.elmJson,
								{
									ctor: '_Tuple2',
									_0: _panosoft$elm_grove$AppUtils$bugMissing('elmJson'),
									_1: function (elmJson) {
										return A2(
											_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
											_panosoft$elm_grove$Version$versionFromString(elmJson.version),
											{
												ctor: '_Tuple2',
												_0: _panosoft$elm_grove$AppUtils$bug(
													A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'bad version in elmJson:', elmJson.version)),
												_1: function (oldVersion) {
													return A2(
														_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
														_elm_lang$core$List$head(
															A2(
																_elm_lang$core$List$map,
																_elm_lang$core$Tuple$second,
																A2(
																	_elm_lang$core$List$filter,
																	_elm_lang$core$Tuple$first,
																	{
																		ctor: '::',
																		_0: {
																			ctor: '_Tuple2',
																			_0: config.major,
																			_1: _panosoft$elm_grove$Version$nextMajor(oldVersion)
																		},
																		_1: {
																			ctor: '::',
																			_0: {
																				ctor: '_Tuple2',
																				_0: config.minor,
																				_1: _panosoft$elm_grove$Version$nextMinor(oldVersion)
																			},
																			_1: {
																				ctor: '::',
																				_0: {
																					ctor: '_Tuple2',
																					_0: config.patch,
																					_1: _panosoft$elm_grove$Version$nextPatch(oldVersion)
																				},
																				_1: {ctor: '[]'}
																			}
																		}
																	}))),
														{
															ctor: '_Tuple2',
															_0: _panosoft$elm_grove$AppUtils$bug('major/minor/patch are all False'),
															_1: function (newVersion) {
																return A3(
																	F3(
																		function (v0, v1, v2) {
																			return {ctor: '_Tuple3', _0: v0, _1: v1, _2: v2};
																		}),
																	newVersion,
																	A2(_panosoft$elm_grove$Component_Bump$BumpComplete, oldVersion, newVersion),
																	A2(
																		_elm_lang$core$Task$andThen,
																		function (_p24) {
																			return A2(
																				_panosoft$elm_grove$AppUtils$writeFile,
																				A2(
																					_panosoft$elm_grove$Component_Bump$pathJoin,
																					config,
																					{
																						ctor: '::',
																						_0: config.cwd,
																						_1: {
																							ctor: '::',
																							_0: A2(
																								_panosoft$elm_utils$Utils_Ops_ops['?'],
																								config.testing,
																								{ctor: '_Tuple2', _0: 'test', _1: ''}),
																							_1: {
																								ctor: '::',
																								_0: _panosoft$elm_grove$Package$elmJsonFilename,
																								_1: {ctor: '[]'}
																							}
																						}
																					}),
																				A2(
																					_elm_lang$core$Json_Encode$encode,
																					A2(
																						_panosoft$elm_utils$Utils_Ops_ops['?!='],
																						model.elmJsonIndent,
																						_panosoft$elm_grove$AppUtils$bugMissing('elmJsonIndent')),
																					_panosoft$elm_grove$ElmJson$elmJsonEncoder(
																						_elm_lang$core$Native_Utils.update(
																							elmJson,
																							{
																								version: _panosoft$elm_grove$Version$versionToString(newVersion)
																							}))));
																		},
																		bumpTask));
															}
														});
												}
											});
									}
								});
						}(
							A2(
								_elm_lang$core$Task$andThen,
								function (_p25) {
									return A2(
										_elm_lang$core$Task$mapError,
										function (_p26) {
											return A2(_elm_node$core$Node_Error$Error, 'Should never happen', '');
										},
										A2(
											_panosoft$elm_utils$Utils_Ops_ops['?'],
											_elm_lang$core$Native_Utils.eq(config.generateDocs, _panosoft$elm_grove$Component_Config$GenerateDocsOn),
											{
												ctor: '_Tuple2',
												_0: _panosoft$elm_grove$Console$log('Documentation generated'),
												_1: _elm_lang$core$Task$succeed('')
											}));
								},
								_panosoft$elm_grove$DocGenerator$generateDocs(
									{testing: config.testing, cwd: config.cwd, pathSep: config.pathSep, generateDocs: config.generateDocs})))))));
	});
var _panosoft$elm_grove$Component_Bump$GitNewerVersionCheckComplete = function (a) {
	return {ctor: 'GitNewerVersionCheckComplete', _0: a};
};
var _panosoft$elm_grove$Component_Bump$checkForNewVersions = F2(
	function (config, model) {
		return function (cmds) {
			return {
				ctor: '_Tuple2',
				_0: A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							newVersionCheckCountDown: _elm_lang$core$List$length(cmds)
						}),
					cmds),
				_1: {ctor: '[]'}
			};
		}(
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
				model.elmJson,
				{
					ctor: '_Tuple2',
					_0: _panosoft$elm_grove$AppUtils$bugMissing('elmJson'),
					_1: function (elmJson) {
						return A2(
							_elm_lang$core$List$map,
							function (packageName) {
								return A2(
									_elm_lang$core$Task$attempt,
									_panosoft$elm_grove$Component_Bump$GitNewerVersionCheckComplete,
									A2(
										_elm_lang$core$Task$andThen,
										function (_p27) {
											var _p28 = _p27;
											return _elm_lang$core$Task$succeed(
												A2(
													_panosoft$elm_utils$Utils_Ops_ops['|?->'],
													_elm_lang$core$List$head(
														_panosoft$elm_grove$AppUtils$sortedVersions(_p28._2)),
													{
														ctor: '_Tuple2',
														_0: _elm_lang$core$Result$Err(
															A2(
																_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'no valid versions in repo:', packageName),
																_panosoft$elm_grove$Output$parens(_p28._0))),
														_1: function (latestVersion) {
															return A2(
																_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
																A2(_elm_lang$core$Dict$get, packageName, model.exactDependencies),
																{
																	ctor: '_Tuple2',
																	_0: _panosoft$elm_grove$AppUtils$bugMissing(
																		A2(
																			_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																			A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'package:', packageName),
																			'in exactDependencies')),
																	_1: function (versionStr) {
																		return A2(
																			_panosoft$elm_utils$Utils_Ops_ops['|?->'],
																			_panosoft$elm_grove$Version$versionFromString(versionStr),
																			{
																				ctor: '_Tuple2',
																				_0: _elm_lang$core$Result$Err(
																					A2(
																						_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																						A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'invalid version in exactDependencies for:', packageName),
																						_panosoft$elm_grove$Output$parens(versionStr))),
																				_1: function (version) {
																					return _elm_lang$core$Result$Ok(
																						A2(
																							_panosoft$elm_utils$Utils_Ops_ops['?'],
																							!_elm_lang$core$Native_Utils.eq(latestVersion, version),
																							{
																								ctor: '_Tuple2',
																								_0: _elm_lang$core$Maybe$Just(
																									{
																										ctor: '_Tuple2',
																										_0: _panosoft$elm_grove$Version$versionToString(latestVersion),
																										_1: packageName
																									}),
																								_1: _elm_lang$core$Maybe$Nothing
																							}));
																				}
																			});
																	}
																});
														}
													}));
										},
										function (repoLocation) {
											return A2(
												_elm_lang$core$Task$andThen,
												function (repo) {
													return A2(
														_elm_lang$core$Task$andThen,
														function (tags) {
															return _elm_lang$core$Task$succeed(
																{ctor: '_Tuple3', _0: repoLocation, _1: repo, _2: tags});
														},
														_panosoft$elm_grove$Git$getTags(repo));
												},
												_panosoft$elm_grove$Git$clone(repoLocation));
										}(
											A2(_panosoft$elm_grove$Package$getRepoLocation, elmJson.dependencySources, packageName))));
							},
							_elm_lang$core$Dict$keys(elmJson.dependencies));
					}
				}));
	});
var _panosoft$elm_grove$Component_Bump$GitStatusCheckComplete = function (a) {
	return {ctor: 'GitStatusCheckComplete', _0: a};
};
var _panosoft$elm_grove$Component_Bump$checkGitStatus = F2(
	function (config, model) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Task$attempt,
						_panosoft$elm_grove$Component_Bump$GitStatusCheckComplete,
						A2(
							_elm_lang$core$Task$andThen,
							_panosoft$elm_grove$Git$getFileStatuses,
							_panosoft$elm_grove$Git$getRepo(config.cwd))),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	});
var _panosoft$elm_grove$Component_Bump$IsSymLinkCheckComplete = F3(
	function (a, b, c) {
		return {ctor: 'IsSymLinkCheckComplete', _0: a, _1: b, _2: c};
	});
var _panosoft$elm_grove$Component_Bump$bump = F2(
	function (config, model) {
		return function (cmds) {
			return A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_elm_lang$core$Native_Utils.update(
					model,
					{linkCheckCount: 0}),
				cmds);
		}(
			A2(
				_elm_lang$core$List$map,
				function (_p29) {
					var _p30 = _p29;
					var _p32 = _p30._0;
					return function (path) {
						return A2(
							_elm_lang$core$Task$attempt,
							function (_p31) {
								return config.routeToMe(
									A3(_panosoft$elm_grove$Component_Bump$IsSymLinkCheckComplete, _p32, path, _p31));
							},
							A2(
								_elm_lang$core$Task$mapError,
								_elm_node$core$Node_Error$message,
								_elm_node$core$Node_FileSystem$isSymlink(path)));
					}(
						A2(
							_panosoft$elm_grove$Component_Bump$pathJoin,
							config,
							{
								ctor: '::',
								_0: A2(_panosoft$elm_grove$Package$elmPackagesRoot, config.testing, config.pathSep),
								_1: {
									ctor: '::',
									_0: _p32,
									_1: {
										ctor: '::',
										_0: _p30._1,
										_1: {ctor: '[]'}
									}
								}
							}));
				},
				_elm_lang$core$Dict$toList(model.exactDependencies)));
	});
var _panosoft$elm_grove$Component_Bump$PackagesRead = F2(
	function (a, b) {
		return {ctor: 'PackagesRead', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Bump$init = F2(
	function (config, initializedMsg) {
		return {
			ctor: '_Tuple2',
			_0: {
				exactDependencies: _elm_lang$core$Dict$empty,
				elmJson: _elm_lang$core$Maybe$Nothing,
				npmJsonStr: _elm_lang$core$Maybe$Nothing,
				linkCheckCount: 0,
				linkedPackages: {ctor: '[]'},
				newVersionCheckCountDown: 0,
				newVersionCheckFailed: false,
				elmJsonIndent: _elm_lang$core$Maybe$Nothing
			},
			_1: _elm_lang$core$Maybe$Just(
				A2(
					_elm_lang$core$Task$attempt,
					function (_p33) {
						return config.routeToMe(
							A2(_panosoft$elm_grove$Component_Bump$PackagesRead, initializedMsg, _p33));
					},
					A2(
						_elm_lang$core$Task$andThen,
						function (_p34) {
							var _p35 = _p34;
							var _p40 = _p35._2;
							var _p39 = _p35._1;
							var _p38 = _p35._0;
							return A2(
								_elm_lang$core$Task$onError,
								function (initError) {
									var _p36 = initError;
									if (_p36.ctor === 'ReadingNpmPackage') {
										var _p37 = _p36._0;
										if (_p37.ctor === 'SystemError') {
											return A2(
												_panosoft$elm_utils$Utils_Ops_ops['?'],
												_elm_lang$core$Native_Utils.eq(_p37._0, _elm_node$core$Node_Error$NoSuchFileOrDirectory),
												{
													ctor: '_Tuple2',
													_0: _elm_lang$core$Task$succeed(
														{ctor: '_Tuple4', _0: _p40, _1: _p39, _2: _p38, _3: _elm_lang$core$Maybe$Nothing}),
													_1: _elm_lang$core$Task$fail(initError)
												});
										} else {
											return _elm_lang$core$Task$fail(initError);
										}
									} else {
										return A2(
											_panosoft$elm_grove$AppUtils$bug,
											'Bad initError',
											A2(_elm_lang$core$Basics$always, _elm_lang$core$Task$fail, initError));
									}
								},
								A2(
									_elm_lang$core$Task$andThen,
									function (npm) {
										return _elm_lang$core$Task$succeed(
											{
												ctor: '_Tuple4',
												_0: _p40,
												_1: _p39,
												_2: _p38,
												_3: _elm_lang$core$Maybe$Just(npm)
											});
									},
									A2(
										_elm_lang$core$Task$mapError,
										_panosoft$elm_grove$Component_Bump$ReadingNpmPackage,
										A2(_elm_node$core$Node_FileSystem$readFileAsString, _panosoft$elm_grove$Package$npmJsonFilename, _elm_node$core$Node_Encoding$Utf8))));
						},
						A2(
							_elm_lang$core$Task$andThen,
							function (tags) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (exactDependencies) {
										return A2(
											_elm_lang$core$Task$andThen,
											function (elm) {
												return _elm_lang$core$Task$succeed(
													{ctor: '_Tuple3', _0: elm, _1: exactDependencies, _2: tags});
											},
											A2(
												_elm_lang$core$Task$mapError,
												_panosoft$elm_grove$Component_Bump$ReadingElmPackage,
												A2(_elm_node$core$Node_FileSystem$readFileAsString, _panosoft$elm_grove$Package$elmJsonFilename, _elm_node$core$Node_Encoding$Utf8)));
									},
									A2(
										_elm_lang$core$Task$mapError,
										_panosoft$elm_grove$Component_Bump$ReadingExactDependencies,
										A2(
											_elm_node$core$Node_FileSystem$readFileAsString,
											A2(
												_panosoft$elm_grove$Component_Bump$pathJoin,
												config,
												{
													ctor: '::',
													_0: _panosoft$elm_grove$Package$elmStuff(config.testing),
													_1: {
														ctor: '::',
														_0: _panosoft$elm_grove$Package$exactDependenciesFileName,
														_1: {ctor: '[]'}
													}
												}),
											_elm_node$core$Node_Encoding$Utf8)));
							},
							A2(
								_elm_lang$core$Task$mapError,
								_panosoft$elm_grove$Component_Bump$GettingTags,
								A2(
									_elm_lang$core$Task$andThen,
									_panosoft$elm_grove$Git$getTags,
									_panosoft$elm_grove$Git$getRepo(config.cwd)))))))
		};
	});
var _panosoft$elm_grove$Component_Bump$OperationComplete = function (a) {
	return {ctor: 'OperationComplete', _0: a};
};
var _panosoft$elm_grove$Component_Bump$operationError = F2(
	function (model, task) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Task$perform,
						function (_p41) {
							return _panosoft$elm_grove$Component_Bump$OperationComplete(-1);
						},
						task),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	});
var _panosoft$elm_grove$Component_Bump$operationSuccessful = F2(
	function (model, task) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Task$perform,
						function (_p42) {
							return _panosoft$elm_grove$Component_Bump$OperationComplete(0);
						},
						task),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	});
var _panosoft$elm_grove$Component_Bump$OutputComplete = function (a) {
	return {ctor: 'OutputComplete', _0: a};
};
var _panosoft$elm_grove$Component_Bump$DoCmd = function (a) {
	return {ctor: 'DoCmd', _0: a};
};
var _panosoft$elm_grove$Component_Bump$delayCmd = function (cmd) {
	return _panosoft$elm_grove$Component_Bump$delayUpdateMsg(
		_panosoft$elm_grove$Component_Bump$DoCmd(cmd));
};
var _panosoft$elm_grove$Component_Bump$update = F3(
	function (config, msg, model) {
		var _p43 = msg;
		switch (_p43.ctor) {
			case 'DoCmd':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{
							ctor: '::',
							_0: _p43._0,
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				};
			case 'OutputComplete':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				};
			case 'OperationComplete':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: config.operationComplete(_p43._0),
						_1: {ctor: '[]'}
					}
				};
			case 'PackagesRead':
				if (_p43._1.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Bump$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							function (fileError) {
								var _p44 = _p43._1._0;
								switch (_p44.ctor) {
									case 'GettingTags':
										return A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to get tags in current repo Error:', _p44._0);
									case 'ReadingExactDependencies':
										return A2(fileError, _panosoft$elm_grove$Package$exactDependenciesFileName, _p44._0);
									case 'ReadingElmPackage':
										return A2(fileError, _panosoft$elm_grove$Package$elmJsonFilename, _p44._0);
									default:
										return A2(fileError, _panosoft$elm_grove$Package$npmJsonFilename, _p44._0);
								}
							}(
								F2(
									function (filename, nodeError) {
										return A2(
											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
											A2(
												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
												A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to read', filename),
												'Error:'),
											_elm_node$core$Node_Error$message(nodeError));
									}))));
				} else {
					var _p57 = _p43._1._0._2;
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['|??->'],
						A2(_panosoft$elm_grove$Component_Bump$decodeExactDependencies, _panosoft$elm_grove$Package$exactDependenciesFileName, _p43._1._0._1),
						{
							ctor: '_Tuple2',
							_0: function (_p45) {
								return A2(
									_panosoft$elm_grove$Component_Bump$operationError,
									model,
									_panosoft$elm_grove$Output$errorLog(_p45));
							},
							_1: function (exactDependencies) {
								return function (_p46) {
									var _p47 = _p46;
									return A2(
										_panosoft$elm_utils$Utils_Ops_ops['|??->'],
										A2(
											_panosoft$elm_utils$Utils_Ops_ops['|??->'],
											_p47._1,
											{
												ctor: '_Tuple2',
												_0: _elm_lang$core$Result$Err,
												_1: function (_p48) {
													var _p49 = _p48;
													var _p55 = _p49._0;
													var _p54 = _p49._2;
													return A2(
														_panosoft$elm_utils$Utils_Ops_ops['|?->'],
														_p43._1._0._3,
														{
															ctor: '_Tuple2',
															_0: _elm_lang$core$Result$Ok(_p55),
															_1: function (npmJsonStr) {
																return A2(
																	_panosoft$elm_utils$Utils_Ops_ops['|??->'],
																	A3(
																		_panosoft$elm_grove$NpmJson$validateNpmJson,
																		npmJsonStr,
																		_panosoft$elm_grove$Version$versionToString(_p54),
																		_p49._1.repository),
																	{
																		ctor: '_Tuple2',
																		_0: function (errors) {
																			return _elm_lang$core$Result$Err(
																				_panosoft$elm_grove$Output$errorLog(
																					A2(
																						_elm_lang$core$Basics_ops['++'],
																						A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], _panosoft$elm_grove$Package$npmJsonFilename, 'has the following errors:\n\t'),
																						A2(_elm_lang$core$String$join, '\n\t', errors))));
																		},
																		_1: function (_p50) {
																			return A2(
																				_panosoft$elm_utils$Utils_Ops_ops['|??->'],
																				_panosoft$elm_grove$NpmJson$decodeNpmJsonVersion(npmJsonStr),
																				{
																					ctor: '_Tuple2',
																					_0: function (error) {
																						return _elm_lang$core$Result$Err(
																							_panosoft$elm_grove$Output$errorLog(
																								A2(
																									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																									A2(
																										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																										A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Cannot extract version from', _panosoft$elm_grove$Package$npmJsonFilename),
																										'Error:'),
																									error)));
																					},
																					_1: function (_p51) {
																						var _p52 = _p51;
																						var _p53 = _p52._0;
																						return A2(
																							_panosoft$elm_utils$Utils_Ops_ops['?'],
																							!_elm_lang$core$Native_Utils.eq(
																								A2(_panosoft$elm_grove$Version$versionCompare, _p53, _p54),
																								_elm_lang$core$Basics$EQ),
																							{
																								ctor: '_Tuple2',
																								_0: _elm_lang$core$Result$Err(
																									_panosoft$elm_grove$Output$errorLog(
																										A2(
																											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																											A2(
																												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																												A2(
																													_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																													A2(
																														_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																														A2(
																															_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																															A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], _panosoft$elm_grove$Package$elmJsonFilename, 'version:'),
																															_panosoft$elm_grove$Output$parens(
																																_panosoft$elm_grove$Version$versionToString(_p54))),
																														'must equal'),
																													_panosoft$elm_grove$Package$npmJsonFilename),
																												'version:'),
																											_panosoft$elm_grove$Output$parens(
																												_panosoft$elm_grove$Version$versionToString(_p53))))),
																								_1: _elm_lang$core$Result$Ok(
																									_elm_lang$core$Native_Utils.update(
																										_p55,
																										{
																											npmJsonStr: _elm_lang$core$Maybe$Just(_p52._1)
																										}))
																							});
																					}
																				});
																		}
																	});
															}
														});
												}
											}),
										{
											ctor: '_Tuple2',
											_0: _panosoft$elm_grove$Component_Bump$operationError(_p47._0),
											_1: function (model) {
												return {
													ctor: '_Tuple2',
													_0: A2(
														_elm_lang$core$Platform_Cmd_ops['!'],
														model,
														{ctor: '[]'}),
													_1: {
														ctor: '::',
														_0: _p43._0,
														_1: {ctor: '[]'}
													}
												};
											}
										});
								}(
									function (model) {
										return A2(
											F2(
												function (v0, v1) {
													return {ctor: '_Tuple2', _0: v0, _1: v1};
												}),
											model,
											A2(
												_panosoft$elm_utils$Utils_Ops_ops['|??->'],
												A2(_panosoft$elm_grove$ElmJson$decodeElmJson, _panosoft$elm_grove$Package$elmJsonFilename, _p57),
												{
													ctor: '_Tuple2',
													_0: function (_p56) {
														return _elm_lang$core$Result$Err(
															_panosoft$elm_grove$Output$errorLog(_p56));
													},
													_1: function (elmJson) {
														return A2(
															_panosoft$elm_utils$Utils_Ops_ops['?='],
															A2(
																_panosoft$elm_utils$Utils_Ops_ops['|?>'],
																_panosoft$elm_grove$Version$versionFromString(elmJson.version),
																function (currentElmVersion) {
																	return function (currentRepoVersion) {
																		return A2(
																			_panosoft$elm_utils$Utils_Ops_ops['?'],
																			!_elm_lang$core$Native_Utils.eq(
																				A2(_panosoft$elm_grove$Version$versionCompare, currentRepoVersion, currentElmVersion),
																				_elm_lang$core$Basics$EQ),
																			{
																				ctor: '_Tuple2',
																				_0: _elm_lang$core$Result$Err(
																					_panosoft$elm_grove$Output$errorLog(
																						A2(
																							_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																							A2(
																								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																								A2(
																									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																									A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], _panosoft$elm_grove$Package$elmJsonFilename, 'version:'),
																									_panosoft$elm_grove$Output$parens(
																										_panosoft$elm_grove$Version$versionToString(currentElmVersion))),
																								'must equal current repo\'s version'),
																							_panosoft$elm_grove$Output$parens(
																								_panosoft$elm_grove$Version$versionToString(currentRepoVersion))))),
																				_1: _elm_lang$core$Result$Ok(
																					{
																						ctor: '_Tuple3',
																						_0: _elm_lang$core$Native_Utils.update(
																							model,
																							{
																								elmJson: _elm_lang$core$Maybe$Just(elmJson)
																							}),
																						_1: elmJson,
																						_2: currentElmVersion
																					})
																			});
																	}(
																		A2(
																			_panosoft$elm_utils$Utils_Ops_ops['?='],
																			_elm_lang$core$List$head(
																				_panosoft$elm_grove$AppUtils$sortedVersions(_p43._1._0._0)),
																			A2(
																				_panosoft$elm_utils$Utils_Ops_ops['?!='],
																				_panosoft$elm_grove$Version$versionFromString('0.0.0'),
																				_panosoft$elm_grove$AppUtils$bug('Bad version string'))));
																}),
															_elm_lang$core$Result$Err(
																_panosoft$elm_grove$Output$errorLog(
																	A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Missing version in:', _panosoft$elm_grove$Package$elmJsonFilename))));
													}
												}));
									}(
										_elm_lang$core$Native_Utils.update(
											model,
											{
												exactDependencies: exactDependencies,
												elmJsonIndent: _elm_lang$core$Maybe$Just(
													_panosoft$elm_grove$AppUtils$determineJsonIndent(_p57))
											})));
							}
						});
				}
			case 'IsSymLinkCheckComplete':
				if (_p43._2.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Bump$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to check:', 'for symbolic links Error:'),
								_p43._2._0)));
				} else {
					return function (elmJson) {
						return function (model) {
							return function (model) {
								return A2(
									_panosoft$elm_utils$Utils_Ops_ops['?'],
									_elm_lang$core$Native_Utils.eq(
										model.linkCheckCount,
										_elm_lang$core$Dict$size(elmJson.dependencies)),
									{
										ctor: '_Tuple2',
										_0: A2(
											_panosoft$elm_utils$Utils_Ops_ops['?'],
											_elm_lang$core$Native_Utils.eq(
												model.linkedPackages,
												{ctor: '[]'}),
											{
												ctor: '_Tuple2',
												_0: A2(_panosoft$elm_grove$Component_Bump$checkGitStatus, config, model),
												_1: A2(
													_panosoft$elm_grove$Component_Bump$operationError,
													model,
													_panosoft$elm_grove$Output$errorLog(
														A2(
															_elm_lang$core$Basics_ops['++'],
															'The following packages are linked locally and should be released first:\n\t',
															A2(_elm_lang$core$String$join, '\n\t', model.linkedPackages))))
											}),
										_1: {
											ctor: '_Tuple2',
											_0: A2(
												_elm_lang$core$Platform_Cmd_ops['!'],
												model,
												{ctor: '[]'}),
											_1: {ctor: '[]'}
										}
									});
							}(
								A2(
									_panosoft$elm_utils$Utils_Ops_ops['?'],
									_p43._2._0,
									{
										ctor: '_Tuple2',
										_0: _elm_lang$core$Native_Utils.update(
											model,
											{
												linkedPackages: {ctor: '::', _0: _p43._0, _1: model.linkedPackages}
											}),
										_1: model
									}));
						}(
							_elm_lang$core$Native_Utils.update(
								model,
								{linkCheckCount: model.linkCheckCount + 1}));
					}(
						A2(
							_panosoft$elm_utils$Utils_Ops_ops['?!='],
							model.elmJson,
							_panosoft$elm_grove$AppUtils$bugMissing('elmJson')));
				}
			case 'GitStatusCheckComplete':
				if (_p43._0.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Bump$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to check repository git status Error:', _p43._0._0)));
				} else {
					return function (errors) {
						return A2(
							_panosoft$elm_utils$Utils_Ops_ops['?'],
							_elm_lang$core$Native_Utils.eq(
								errors,
								{ctor: '[]'}) || config.allowUncommitted,
							{
								ctor: '_Tuple2',
								_0: A2(_panosoft$elm_grove$Component_Bump$checkForNewVersions, config, model),
								_1: function (errors) {
									return A2(
										_panosoft$elm_grove$Component_Bump$operationError,
										model,
										_panosoft$elm_grove$Output$errorLog(
											A2(
												_elm_lang$core$Basics_ops['++'],
												'Not all files have been checked in to git\n\n',
												A2(_elm_lang$core$String$join, '\n', errors))));
								}(
									A2(
										_elm_lang$core$List$map,
										function (_p58) {
											var _p59 = _p58;
											return A2(
												_elm_lang$core$Basics_ops['++'],
												A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Status:', _p59._1),
												A2(
													_panosoft$elm_string_utils$StringUtils_ops['+-+'],
													'\n\t',
													A2(_elm_lang$core$String$join, ', ', _p59._0)));
										},
										errors))
							});
					}(
						A2(
							_elm_lang$core$List$filterMap,
							function (_p60) {
								var _p61 = _p60;
								var _p62 = _p61._0;
								return A2(
									_panosoft$elm_utils$Utils_Ops_ops['?'],
									_elm_lang$core$Native_Utils.eq(
										_p62,
										{ctor: '[]'}),
									{
										ctor: '_Tuple2',
										_0: _elm_lang$core$Maybe$Nothing,
										_1: _elm_lang$core$Maybe$Just(
											{ctor: '_Tuple2', _0: _p62, _1: _p61._1})
									});
							},
							A2(
								_elm_lang$core$List$map,
								function (accessor) {
									return {
										ctor: '_Tuple2',
										_0: A2(_elm_lang$core$Tuple$first, accessor, _p43._0._0),
										_1: _elm_lang$core$Tuple$second(accessor)
									};
								},
								_panosoft$elm_grove$Git$fileStatusAccessors)));
				}
			case 'GitNewerVersionCheckComplete':
				if (_p43._0.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Bump$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to check for newer versions Error:', _p43._0._0)));
				} else {
					return function (_p63) {
						var _p64 = _p63;
						var _p76 = _p64._0;
						return A2(
							_panosoft$elm_utils$Utils_Ops_ops['|??->'],
							_p43._0._0,
							{
								ctor: '_Tuple2',
								_0: function (error) {
									return A2(
										_panosoft$elm_grove$Component_Bump$operationError,
										_p76,
										_panosoft$elm_grove$Output$errorLog(error));
								},
								_1: function (maybePackageInfo) {
									return function (_p65) {
										var _p66 = _p65;
										var _p71 = _p66._1;
										var _p70 = _p66._0._0;
										var _p69 = _p66._0._1;
										return A2(
											_panosoft$elm_utils$Utils_Ops_ops['?'],
											_elm_lang$core$Native_Utils.eq(_p70.newVersionCheckCountDown, 0),
											{
												ctor: '_Tuple2',
												_0: A2(
													_panosoft$elm_utils$Utils_Ops_ops['?'],
													_p70.newVersionCheckFailed,
													{
														ctor: '_Tuple2',
														_0: {
															ctor: '_Tuple2',
															_0: A2(
																_elm_lang$core$Platform_Cmd_ops['!'],
																_p70,
																{
																	ctor: '::',
																	_0: _p69,
																	_1: {
																		ctor: '::',
																		_0: _p64._1._0._1,
																		_1: {ctor: '[]'}
																	}
																}),
															_1: _p71
														},
														_1: function (_p67) {
															var _p68 = _p67;
															return {
																ctor: '_Tuple2',
																_0: A2(
																	_elm_lang$core$Platform_Cmd_ops['!'],
																	_p68._0._0,
																	{
																		ctor: '::',
																		_0: _p69,
																		_1: {
																			ctor: '::',
																			_0: A2(_panosoft$elm_grove$Component_Bump$delayCmd, _p68._0._1, 100),
																			_1: {ctor: '[]'}
																		}
																	}),
																_1: A2(_elm_lang$core$List$append, _p71, _p68._1)
															};
														}(
															A2(
																_panosoft$elm_utils$Utils_Ops_ops['?'],
																config.dryRun,
																{
																	ctor: '_Tuple2',
																	_0: A2(
																		_panosoft$elm_grove$Component_Bump$operationSuccessful,
																		_p70,
																		_panosoft$elm_grove$Console$log('Bump validation passed, skipping operation due to --dry-run parameter specified')),
																	_1: {
																		ctor: '_Tuple2',
																		_0: A2(_panosoft$elm_grove$Component_Bump$doBump, config, _p70),
																		_1: {ctor: '[]'}
																	}
																}))
													}),
												_1: {
													ctor: '_Tuple2',
													_0: A2(
														_elm_lang$core$Platform_Cmd_ops['!'],
														_p70,
														{
															ctor: '::',
															_0: _p69,
															_1: {ctor: '[]'}
														}),
													_1: _p71
												}
											});
									}(
										A2(
											_panosoft$elm_utils$Utils_Ops_ops['|?->'],
											maybePackageInfo,
											{
												ctor: '_Tuple2',
												_0: {
													ctor: '_Tuple2',
													_0: A2(
														_elm_lang$core$Platform_Cmd_ops['!'],
														_p76,
														{ctor: '[]'}),
													_1: {ctor: '[]'}
												},
												_1: function (_p72) {
													var _p73 = _p72;
													return function (_p74) {
														var _p75 = _p74;
														return {
															ctor: '_Tuple2',
															_0: A2(
																_elm_lang$core$Platform_Cmd_ops['!'],
																_p75._0,
																{
																	ctor: '::',
																	_0: A2(
																		_elm_lang$core$Task$perform,
																		_panosoft$elm_grove$Component_Bump$OutputComplete,
																		_p75._1(
																			A2(
																				_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																				A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Newer version exists for:', _p73._1),
																				_panosoft$elm_grove$Output$parens(_p73._0)))),
																	_1: {ctor: '[]'}
																}),
															_1: {ctor: '[]'}
														};
													}(
														A2(
															_panosoft$elm_utils$Utils_Ops_ops['?'],
															config.allowOldDependencies,
															{
																ctor: '_Tuple2',
																_0: {ctor: '_Tuple2', _0: _p76, _1: _panosoft$elm_grove$Output$warnLog},
																_1: {
																	ctor: '_Tuple2',
																	_0: _elm_lang$core$Native_Utils.update(
																		_p76,
																		{newVersionCheckFailed: true}),
																	_1: _panosoft$elm_grove$Output$errorLog
																}
															}));
												}
											}));
								}
							});
					}(
						{
							ctor: '_Tuple2',
							_0: _elm_lang$core$Native_Utils.update(
								model,
								{newVersionCheckCountDown: model.newVersionCheckCountDown - 1}),
							_1: function (_p77) {
								var _p78 = _p77;
								return {
									ctor: '_Tuple2',
									_0: A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_p78._0._0,
										{
											ctor: '::',
											_0: A2(_panosoft$elm_grove$Component_Bump$delayCmd, _p78._0._1, 100),
											_1: {ctor: '[]'}
										}),
									_1: _p78._1
								};
							}(
								A2(
									_panosoft$elm_grove$Component_Bump$operationError,
									model,
									_elm_lang$core$Task$succeed('')))
						});
				}
			default:
				if (_p43._2.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Bump$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to bump Error:', _p43._2._0)));
				} else {
					return A2(
						_panosoft$elm_grove$Component_Bump$operationSuccessful,
						model,
						_panosoft$elm_grove$Console$log(
							A2(
								_elm_lang$core$Basics_ops['++'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(
										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
										A2(
											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
											'Bumped version from:',
											_panosoft$elm_grove$Version$versionToString(_p43._0)),
										'to:'),
									_panosoft$elm_grove$Version$versionToString(_p43._1)),
								'\t(use \"git push && git push --tags\" to release package)')));
				}
		}
	});

const _panosoft$elm_grove$Native_Prompt = (_ => {
	const prompt = require('prompt');
	/* global _elm_lang$core$Native_Scheduler:false _elm_lang$core$Native_List:false */
	const { nativeBinding, succeed, fail } = _elm_lang$core$Native_Scheduler;
	const isNothing = (v => v.ctor == 'Nothing');
	///////////////////////////////////////////////////////////////////////////////////////////////////
	const doPrompt = (promptOptions) => nativeBinding(callback => {
		try {
			prompt.message = '';
			prompt.start();
			const schema = {
				properties: {
					response: {
						description: promptOptions.prompt,
						pattern: isNothing(promptOptions.pattern) ? /./ : promptOptions.pattern._0,
						message: isNothing(promptOptions.message) ? null : promptOptions.message._0,
						required: promptOptions.required
					}
				}
			};
			prompt.get(schema, (err, result) => callback(
				err
					? fail(err.message)
					: succeed(result.response == '' && !isNothing(promptOptions.$default) ? promptOptions.$default._0 : result.response))
			);
		}
		catch (error) {callback(fail(error));}
	});
	///////////////////////////////////////////////////////////////////////////////////////////////////
	return {
		prompt: doPrompt
	};
})();

var _panosoft$elm_grove$Prompt$prompt = _panosoft$elm_grove$Native_Prompt.prompt;
var _panosoft$elm_grove$Prompt$defaultPrompt = {pattern: _elm_lang$core$Maybe$Nothing, message: _elm_lang$core$Maybe$Nothing, prompt: '', required: true, $default: _elm_lang$core$Maybe$Nothing};
var _panosoft$elm_grove$Prompt$PromptOptions = F5(
	function (a, b, c, d, e) {
		return {pattern: a, message: b, prompt: c, required: d, $default: e};
	});

var _panosoft$elm_grove$Component_Init$prompts = {
	ctor: '::',
	_0: {
		ctor: '_Tuple2',
		_0: F2(
			function (model, value) {
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						summary: _elm_lang$core$Maybe$Just(value)
					});
			}),
		_1: _elm_lang$core$Native_Utils.update(
			_panosoft$elm_grove$Prompt$defaultPrompt,
			{prompt: 'Summary of package []', required: false})
	},
	_1: {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: F2(
				function (model, value) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{
							repository: _elm_lang$core$Maybe$Just(value)
						});
				}),
			_1: _elm_lang$core$Native_Utils.update(
				_panosoft$elm_grove$Prompt$defaultPrompt,
				{
					prompt: 'Repository name',
					pattern: _elm_lang$core$Maybe$Just('^([a-zA-Z](?:[-][a-zA-Z]+)*)+/(?:[a-zA-Z](?:[-_][a-zA-Z]+)*)+$'),
					message: _elm_lang$core$Maybe$Just('Invalid repo name... must be like: your-user-name/your-repo-name')
				})
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: F2(
					function (model, value) {
						return _elm_lang$core$Native_Utils.update(
							model,
							{
								license: _elm_lang$core$Maybe$Just(value)
							});
					}),
				_1: _elm_lang$core$Native_Utils.update(
					_panosoft$elm_grove$Prompt$defaultPrompt,
					{
						prompt: 'License [BSD-3-Clause]',
						pattern: _elm_lang$core$Maybe$Just('^[A-Za-z]+$'),
						message: _elm_lang$core$Maybe$Just('Invalid license name'),
						$default: _elm_lang$core$Maybe$Just('BSD-3-Clause'),
						required: false
					})
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: F2(
						function (model, value) {
							return _elm_lang$core$Native_Utils.update(
								model,
								{
									sourceDirectory: _elm_lang$core$Maybe$Just(value)
								});
						}),
					_1: _elm_lang$core$Native_Utils.update(
						_panosoft$elm_grove$Prompt$defaultPrompt,
						{
							prompt: 'Source directory [src]',
							pattern: _elm_lang$core$Maybe$Just('^([.]|[.]{2}|/?[A-Za-z0-9_-]+(?:/[A-Za-z0-9_-]+)*)$'),
							message: _elm_lang$core$Maybe$Just('Invalid path'),
							$default: _elm_lang$core$Maybe$Just('src'),
							required: false
						})
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: F2(
							function (model, value) {
								return _elm_lang$core$Native_Utils.update(
									model,
									{
										createNpmJson: _elm_lang$core$Maybe$Just(value)
									});
							}),
						_1: _elm_lang$core$Native_Utils.update(
							_panosoft$elm_grove$Prompt$defaultPrompt,
							{
								prompt: 'Also create \'package.json\' [Y/n]',
								pattern: _elm_lang$core$Maybe$Just('^(y(es)?|Y(es)?|n(o)?|N(o)?)$'),
								message: _elm_lang$core$Maybe$Just('Invalid yes/no answer'),
								$default: _elm_lang$core$Maybe$Just('y'),
								required: false
							})
					},
					_1: {ctor: '[]'}
				}
			}
		}
	}
};
var _panosoft$elm_grove$Component_Init$minimalNpmJsonEncoder = function (minimalNpmJson) {
	return _elm_lang$core$Json_Encode$object(
		{
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'name',
				_1: _elm_lang$core$Json_Encode$string(minimalNpmJson.name)
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'version',
					_1: _elm_lang$core$Json_Encode$string(minimalNpmJson.version)
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'license',
						_1: _elm_lang$core$Json_Encode$string(minimalNpmJson.license)
					},
					_1: {ctor: '[]'}
				}
			}
		});
};
var _panosoft$elm_grove$Component_Init$pathJoin = F2(
	function (config, pathParts) {
		return A3(_panosoft$elm_grove$AppUtils$pathJoin, config.pathSep, config.cwd, pathParts);
	});
var _panosoft$elm_grove$Component_Init$Config = F6(
	function (a, b, c, d, e, f) {
		return {testing: a, routeToMe: b, operationComplete: c, elmVersion: d, cwd: e, pathSep: f};
	});
var _panosoft$elm_grove$Component_Init$Model = F5(
	function (a, b, c, d, e) {
		return {summary: a, repository: b, license: c, sourceDirectory: d, createNpmJson: e};
	});
var _panosoft$elm_grove$Component_Init$MinimalNpmJson = F3(
	function (a, b, c) {
		return {name: a, version: b, license: c};
	});
var _panosoft$elm_grove$Component_Init$NpmJsonWriteStepError = function (a) {
	return {ctor: 'NpmJsonWriteStepError', _0: a};
};
var _panosoft$elm_grove$Component_Init$ElmJsonWriteStepError = function (a) {
	return {ctor: 'ElmJsonWriteStepError', _0: a};
};
var _panosoft$elm_grove$Component_Init$ElmJsonWritten = function (a) {
	return {ctor: 'ElmJsonWritten', _0: a};
};
var _panosoft$elm_grove$Component_Init$PromptsComplete = {ctor: 'PromptsComplete'};
var _panosoft$elm_grove$Component_Init$PromptResponse = F3(
	function (a, b, c) {
		return {ctor: 'PromptResponse', _0: a, _1: b, _2: c};
	});
var _panosoft$elm_grove$Component_Init$nextPrompt = F3(
	function (config, model, promptIndex) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['|?->'],
			A2(
				_elm_lang$core$Array$get,
				promptIndex,
				_elm_lang$core$Array$fromList(_panosoft$elm_grove$Component_Init$prompts)),
			{
				ctor: '_Tuple2',
				_0: A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: _panosoft$elm_grove$AppUtils$msgToCmd(_panosoft$elm_grove$Component_Init$PromptsComplete),
						_1: {ctor: '[]'}
					}),
				_1: function (_p0) {
					var _p1 = _p0;
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{
							ctor: '::',
							_0: A2(
								_elm_lang$core$Task$attempt,
								A2(_panosoft$elm_grove$Component_Init$PromptResponse, promptIndex + 1, _p1._0),
								_panosoft$elm_grove$Prompt$prompt(_p1._1)),
							_1: {ctor: '[]'}
						});
				}
			});
	});
var _panosoft$elm_grove$Component_Init$initialize = F2(
	function (config, model) {
		return function (_p2) {
			var _p3 = _p2;
			return A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p3._0,
				{
					ctor: '::',
					_0: A2(_elm_lang$core$Platform_Cmd$map, config.routeToMe, _p3._1),
					_1: {ctor: '[]'}
				});
		}(
			A3(_panosoft$elm_grove$Component_Init$nextPrompt, config, model, 0));
	});
var _panosoft$elm_grove$Component_Init$FileExists = F2(
	function (a, b) {
		return {ctor: 'FileExists', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Init$init = F2(
	function (config, initializedMsg) {
		return {
			ctor: '_Tuple2',
			_0: {summary: _elm_lang$core$Maybe$Nothing, repository: _elm_lang$core$Maybe$Nothing, license: _elm_lang$core$Maybe$Nothing, sourceDirectory: _elm_lang$core$Maybe$Nothing, createNpmJson: _elm_lang$core$Maybe$Nothing},
			_1: _elm_lang$core$Maybe$Just(
				A2(
					_elm_lang$core$Task$attempt,
					function (_p4) {
						return config.routeToMe(
							A2(_panosoft$elm_grove$Component_Init$FileExists, initializedMsg, _p4));
					},
					_elm_node$core$Node_FileSystem$exists(_panosoft$elm_grove$Package$elmJsonFilename)))
		};
	});
var _panosoft$elm_grove$Component_Init$OperationComplete = function (a) {
	return {ctor: 'OperationComplete', _0: a};
};
var _panosoft$elm_grove$Component_Init$operationError = F2(
	function (model, task) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Task$perform,
						function (_p5) {
							return _panosoft$elm_grove$Component_Init$OperationComplete(-1);
						},
						task),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	});
var _panosoft$elm_grove$Component_Init$update = F3(
	function (config, msg, model) {
		var _p6 = msg;
		switch (_p6.ctor) {
			case 'OperationComplete':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: config.operationComplete(_p6._0),
						_1: {ctor: '[]'}
					}
				};
			case 'FileExists':
				if (_p6._1.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Init$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Cannot check existence of:', _panosoft$elm_grove$Package$elmJsonFilename),
									'Error:'),
								_elm_node$core$Node_Error$message(_p6._1._0))));
				} else {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?'],
						_p6._1._0,
						{
							ctor: '_Tuple2',
							_0: A2(
								_panosoft$elm_grove$Component_Init$operationError,
								model,
								_panosoft$elm_grove$Output$errorLog(
									A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], _panosoft$elm_grove$Package$elmJsonFilename, 'already exists'))),
							_1: {
								ctor: '_Tuple2',
								_0: A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: _p6._0,
									_1: {ctor: '[]'}
								}
							}
						});
				}
			case 'PromptResponse':
				if (_p6._2.ctor === 'Err') {
					var _p7 = _p6._2._0;
					return _elm_lang$core$Basics$always(
						{
							ctor: '_Tuple2',
							_0: A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: config.operationComplete(-1),
								_1: {ctor: '[]'}
							}
						})(
						A2(
							_panosoft$elm_utils$Utils_Ops_ops['?'],
							_elm_lang$core$Native_Utils.eq(_p7, 'canceled'),
							{
								ctor: '_Tuple2',
								_0: {
									ctor: '_Tuple2',
									_0: A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										model,
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								},
								_1: A2(
									_panosoft$elm_grove$Component_Init$operationError,
									model,
									_panosoft$elm_grove$Output$errorLog(
										A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Prompt error:', _p7)))
							}));
				} else {
					return function (model) {
						return {
							ctor: '_Tuple2',
							_0: A3(_panosoft$elm_grove$Component_Init$nextPrompt, config, model, _p6._0),
							_1: {ctor: '[]'}
						};
					}(
						A2(_p6._1, model, _p6._2._0));
				}
			case 'PromptsComplete':
				return function (cmd) {
					return {
						ctor: '_Tuple2',
						_0: A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: cmd,
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					};
				}(
					A2(
						_elm_lang$core$Task$attempt,
						_panosoft$elm_grove$Component_Init$ElmJsonWritten,
						A2(
							_elm_lang$core$Task$andThen,
							function (result) {
								return A2(
									_panosoft$elm_utils$Utils_Ops_ops['?'],
									A2(
										_elm_lang$core$String$startsWith,
										'y',
										_elm_lang$core$String$toLower(
											A2(
												_panosoft$elm_utils$Utils_Ops_ops['?!='],
												model.createNpmJson,
												_panosoft$elm_grove$AppUtils$bugMissing('createNpmJson')))),
									{
										ctor: '_Tuple2',
										_0: A2(
											_elm_lang$core$Task$mapError,
											_panosoft$elm_grove$Component_Init$NpmJsonWriteStepError,
											A2(
												_panosoft$elm_grove$AppUtils$writeFile,
												A2(
													_panosoft$elm_grove$Component_Init$pathJoin,
													config,
													{
														ctor: '::',
														_0: config.cwd,
														_1: {
															ctor: '::',
															_0: A2(
																_panosoft$elm_utils$Utils_Ops_ops['?'],
																config.testing,
																{ctor: '_Tuple2', _0: 'test', _1: ''}),
															_1: {
																ctor: '::',
																_0: _panosoft$elm_grove$Package$npmJsonFilename,
																_1: {ctor: '[]'}
															}
														}
													}),
												A2(
													_elm_lang$core$Json_Encode$encode,
													4,
													_panosoft$elm_grove$Component_Init$minimalNpmJsonEncoder(
														{
															name: A2(
																_elm_lang$core$Basics_ops['++'],
																'@',
																A2(
																	_panosoft$elm_utils$Utils_Ops_ops['?!='],
																	model.repository,
																	_panosoft$elm_grove$AppUtils$bugMissing('repository'))),
															version: '0.0.0',
															license: A2(
																_panosoft$elm_utils$Utils_Ops_ops['?!='],
																model.license,
																_panosoft$elm_grove$AppUtils$bugMissing('license'))
														})))),
										_1: _elm_lang$core$Task$succeed(result)
									});
							},
							A2(
								_elm_lang$core$Task$mapError,
								_panosoft$elm_grove$Component_Init$ElmJsonWriteStepError,
								A2(
									_panosoft$elm_grove$AppUtils$writeFile,
									A2(
										_panosoft$elm_grove$Component_Init$pathJoin,
										config,
										{
											ctor: '::',
											_0: config.cwd,
											_1: {
												ctor: '::',
												_0: A2(
													_panosoft$elm_utils$Utils_Ops_ops['?'],
													config.testing,
													{ctor: '_Tuple2', _0: 'test', _1: ''}),
												_1: {
													ctor: '::',
													_0: _panosoft$elm_grove$Package$elmJsonFilename,
													_1: {ctor: '[]'}
												}
											}
										}),
									A2(
										_elm_lang$core$Json_Encode$encode,
										4,
										_panosoft$elm_grove$ElmJson$elmJsonEncoder(
											{
												version: '0.0.0',
												summary: A2(
													_panosoft$elm_utils$Utils_Ops_ops['?!='],
													model.summary,
													_panosoft$elm_grove$AppUtils$bugMissing('summary')),
												repository: A2(
													_elm_lang$core$Basics_ops['++'],
													A2(
														_panosoft$elm_utils$Utils_Ops_ops['?!='],
														model.repository,
														_panosoft$elm_grove$AppUtils$bugMissing('repository')),
													'.git'),
												license: A2(
													_panosoft$elm_utils$Utils_Ops_ops['?!='],
													model.license,
													_panosoft$elm_grove$AppUtils$bugMissing('license')),
												sourceDirectories: {
													ctor: '::',
													_0: A2(
														_panosoft$elm_utils$Utils_Ops_ops['?!='],
														model.sourceDirectory,
														_panosoft$elm_grove$AppUtils$bugMissing('sourceDirectory')),
													_1: {ctor: '[]'}
												},
												exposedModules: {ctor: '[]'},
												nativeModules: _elm_lang$core$Maybe$Nothing,
												dependencies: _elm_lang$core$Dict$fromList(
													{
														ctor: '::',
														_0: {
															ctor: '_Tuple2',
															_0: 'elm-lang/core',
															_1: _elm_lang$core$Maybe$Just('5.1.1 <= v < 6.0.0')
														},
														_1: {ctor: '[]'}
													}),
												dependencySources: _elm_lang$core$Maybe$Nothing,
												elmVersion: '0.18.0 <= v < 0.19.0'
											})))))));
			default:
				if (_p6._0.ctor === 'Err') {
					return function (_p8) {
						var _p9 = _p8;
						return A2(
							_panosoft$elm_grove$Component_Init$operationError,
							model,
							_panosoft$elm_grove$Output$errorLog(
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(
										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
										A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to write', _p9._0),
										'Error:'),
									_elm_node$core$Node_Error$message(_p9._1))));
					}(
						function () {
							var _p10 = _p6._0._0;
							if (_p10.ctor === 'ElmJsonWriteStepError') {
								return {ctor: '_Tuple2', _0: _panosoft$elm_grove$Package$elmJsonFilename, _1: _p10._0};
							} else {
								return {ctor: '_Tuple2', _0: _panosoft$elm_grove$Package$npmJsonFilename, _1: _p10._0};
							}
						}());
				} else {
					return {
						ctor: '_Tuple2',
						_0: A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: config.operationComplete(0),
							_1: {ctor: '[]'}
						}
					};
				}
		}
	});
var _panosoft$elm_grove$Component_Init$operationSuccessful = F2(
	function (model, task) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Task$perform,
						function (_p11) {
							return _panosoft$elm_grove$Component_Init$OperationComplete(0);
						},
						task),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	});

var _panosoft$elm_parent_child_update$ParentChildUpdate$updateChildParentCommon = F7(
	function (doParentMsgs, childUpdate, childModelAccessor, childTagger, replaceChildModel, childMsg, parentModel) {
		var _p0 = A2(
			childUpdate,
			childMsg,
			childModelAccessor(parentModel));
		var childModel = _p0._0._0;
		var childCmd = _p0._0._1;
		var parentMsgs = _p0._1;
		return A4(
			doParentMsgs,
			A2(replaceChildModel, parentModel, childModel),
			parentMsgs,
			childTagger,
			childCmd);
	});
var _panosoft$elm_parent_child_update$ParentChildUpdate$doParentMsgs = F5(
	function (parentUpdate, parentModel, parentMsgs, childTagger, childCmd) {
		var doUpdate = F4(
			function (parentMsg, parentModel, parentCmds, grandParentMsgs) {
				var _p1 = A2(parentUpdate, parentMsg, parentModel);
				var newParentModel = _p1._0._0;
				var parentCmd = _p1._0._1;
				var additionalGrandParentMsgs = _p1._1;
				return {
					ctor: '_Tuple2',
					_0: {
						ctor: '_Tuple2',
						_0: newParentModel,
						_1: {ctor: '::', _0: parentCmd, _1: parentCmds}
					},
					_1: A2(_elm_lang$core$List$append, additionalGrandParentMsgs, grandParentMsgs)
				};
			});
		var _p2 = A3(
			_elm_lang$core$List$foldl,
			F2(
				function (msg, _p3) {
					var _p4 = _p3;
					return A4(doUpdate, msg, _p4._0._0, _p4._0._1, _p4._1);
				}),
			{
				ctor: '_Tuple2',
				_0: {
					ctor: '_Tuple2',
					_0: parentModel,
					_1: {ctor: '[]'}
				},
				_1: {ctor: '[]'}
			},
			parentMsgs);
		var finalModel = _p2._0._0;
		var parentCmds = _p2._0._1;
		var grandParentMsgs = _p2._1;
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				finalModel,
				{
					ctor: '::',
					_0: A2(_elm_lang$core$Platform_Cmd$map, childTagger, childCmd),
					_1: parentCmds
				}),
			_1: grandParentMsgs
		};
	});
var _panosoft$elm_parent_child_update$ParentChildUpdate$updateChildParent = F5(
	function (childUpdate, parentUpdate, childModelAccessor, childTagger, replaceChildModel) {
		return A5(
			_panosoft$elm_parent_child_update$ParentChildUpdate$updateChildParentCommon,
			_panosoft$elm_parent_child_update$ParentChildUpdate$doParentMsgs(parentUpdate),
			childUpdate,
			childModelAccessor,
			childTagger,
			replaceChildModel);
	});
var _panosoft$elm_parent_child_update$ParentChildUpdate$doAppMsgs = F5(
	function (appUpdate, appModel, appMsgs, childTagger, childCmd) {
		var doUpdate = F3(
			function (appMsg, appModel, appCmds) {
				var _p5 = A2(appUpdate, appMsg, appModel);
				var newappModel = _p5._0;
				var appCmd = _p5._1;
				return {
					ctor: '_Tuple2',
					_0: newappModel,
					_1: {ctor: '::', _0: appCmd, _1: appCmds}
				};
			});
		var _p6 = A3(
			_elm_lang$core$List$foldl,
			F2(
				function (msg, _p7) {
					var _p8 = _p7;
					return A3(doUpdate, msg, _p8._0, _p8._1);
				}),
			{
				ctor: '_Tuple2',
				_0: appModel,
				_1: {ctor: '[]'}
			},
			appMsgs);
		var finalModel = _p6._0;
		var appCmds = _p6._1;
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				finalModel,
				{
					ctor: '::',
					_0: A2(_elm_lang$core$Platform_Cmd$map, childTagger, childCmd),
					_1: appCmds
				}),
			_1: {ctor: '[]'}
		};
	});
var _panosoft$elm_parent_child_update$ParentChildUpdate$updateChildApp = F7(
	function (childUpdate, appUpdate, childModelAccessor, childTagger, replaceChildModel, childMsg, appModel) {
		return _elm_lang$core$Tuple$first(
			A7(
				_panosoft$elm_parent_child_update$ParentChildUpdate$updateChildParentCommon,
				_panosoft$elm_parent_child_update$ParentChildUpdate$doAppMsgs(appUpdate),
				childUpdate,
				childModelAccessor,
				childTagger,
				replaceChildModel,
				childMsg,
				appModel));
	});

var _panosoft$elm_grove$Dependency$pathDelimiter = ' -> ';
var _panosoft$elm_grove$Dependency$addToPath = F2(
	function (parent, child) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|?>'],
				_elm_lang$core$List$head(
					A2(
						_elm_lang$core$List$filter,
						function (pathPart) {
							return _elm_lang$core$Native_Utils.eq(pathPart, child);
						},
						A2(_elm_lang$core$String$split, _panosoft$elm_grove$Dependency$pathDelimiter, parent))),
				_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing)),
			_elm_lang$core$Maybe$Just(
				A2(
					_elm_lang$core$Basics_ops['++'],
					parent,
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(
							_panosoft$elm_utils$Utils_Ops_ops['?'],
							_elm_lang$core$Native_Utils.eq(parent, ''),
							{ctor: '_Tuple2', _0: '', _1: _panosoft$elm_grove$Dependency$pathDelimiter}),
						child))));
	});
var _panosoft$elm_grove$Dependency$isInPath = F2(
	function (pathPart, path) {
		return A2(
			F2(
				function (x, y) {
					return _elm_lang$core$Native_Utils.eq(x, y);
				}),
			{ctor: '[]'},
			A2(
				_elm_lang$core$List$filter,
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					})(pathPart),
				A2(_elm_lang$core$String$split, _panosoft$elm_grove$Dependency$pathDelimiter, path)));
	});
var _panosoft$elm_grove$Dependency$isDirectDependency = function (path) {
	return A2(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			}),
		1,
		_elm_lang$core$List$length(
			A2(_elm_lang$core$String$split, _panosoft$elm_grove$Dependency$pathDelimiter, path)));
};
var _panosoft$elm_grove$Dependency$DependsOn = F2(
	function (a, b) {
		return {packageName: a, dependencyPath: b};
	});

var _panosoft$elm_grove$Component_Rewriter$conflictLibsPattern = F2(
	function (config, packages) {
		return function (s) {
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				_elm_lang$core$Native_Utils.eq(
					_elm_lang$core$List$length(packages),
					1),
				{
					ctor: '_Tuple2',
					_0: s,
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						'{',
						A2(_elm_lang$core$Basics_ops['++'], s, '}'))
				});
		}(
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				_elm_lang$core$Native_Utils.eq(config.pathSep, '\\'),
				{
					ctor: '_Tuple2',
					_0: A2(_panosoft$elm_utils$Utils_Regex$replaceAll, '/', '\\'),
					_1: _elm_lang$core$Basics$identity
				})(
				A2(
					_elm_lang$core$String$join,
					',',
					A2(
						_elm_lang$core$List$map,
						function (packageName) {
							return A2(
								_elm_lang$core$Basics_ops['++'],
								config.cwd,
								A2(
									_elm_lang$core$Basics_ops['++'],
									'/node_modules/@',
									A2(_elm_lang$core$Basics_ops['++'], packageName, '/node_modules/*')));
						},
						packages))));
	});
var _panosoft$elm_grove$Component_Rewriter$endOfLine = '†';
var _panosoft$elm_grove$Component_Rewriter$initModel = function (config) {
	return {rewriteCountDown: 0, rewriteCount: 0};
};
var _panosoft$elm_grove$Component_Rewriter$pathJoin = F2(
	function (config, pathParts) {
		return A3(_panosoft$elm_grove$AppUtils$pathJoin, config.pathSep, config.cwd, pathParts);
	});
var _panosoft$elm_grove$Component_Rewriter$linkedRepoRewriteError = F3(
	function (config, packageName, packagesConflicts) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'\n\nUnable to rewrite code for a Linked Repo. The following npm libraries are in conflict:\n\t',
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(_elm_lang$core$String$join, '\n\t', packagesConflicts),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\n\nResolve these conflicts by changing \'',
					A2(
						_elm_lang$core$Basics_ops['++'],
						packageName,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'\' to use a version that\'s compatible with the versions used by other Elm packages that your program is dependent on.',
							A2(
								_elm_lang$core$Basics_ops['++'],
								A2(
									_elm_lang$core$Basics_ops['++'],
									'\n\nOr you can change the other packages to match the version that \'',
									A2(_elm_lang$core$Basics_ops['++'], packageName, '\' is using.')),
								A2(
									_elm_lang$core$Basics_ops['++'],
									A2(
										_elm_lang$core$Basics_ops['++'],
										'\n\nFor each conflicting library, compare the version that\'s in your program\'s node_modules directory with the version used by \'',
										A2(
											_elm_lang$core$Basics_ops['++'],
											packageName,
											A2(
												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
												'\' which is located at:',
												A2(
													_panosoft$elm_grove$Component_Rewriter$pathJoin,
													config,
													{
														ctor: '::',
														_0: 'node_modules',
														_1: {
															ctor: '::',
															_0: A2(
																_elm_lang$core$Basics_ops['++'],
																'@',
																A3(_panosoft$elm_utils$Utils_Regex$replaceAll, '/', config.pathSep, packageName)),
															_1: {
																ctor: '::',
																_0: 'node_modules',
																_1: {ctor: '[]'}
															}
														}
													})))),
									A2(
										_elm_lang$core$Basics_ops['++'],
										'\n\nOr you can NOT link to \'',
										A2(_elm_lang$core$Basics_ops['++'], packageName, '\' by simply removing the link option when running grove.\n\n')))))))));
	});
var _panosoft$elm_grove$Component_Rewriter$rewriteContents = F4(
	function (config, contents, packageName, conflictLibs) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?!'],
			_elm_lang$core$Native_Utils.eq(
				conflictLibs,
				{ctor: '[]'}),
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Basics$always(
					_elm_lang$core$Result$Ok(
						{ctor: '_Tuple2', _0: false, _1: contents})),
				_1: function (_p0) {
					return function (packagesConflicts) {
						return function (conflicLibsRegex) {
							return A2(
								_panosoft$elm_utils$Utils_Ops_ops['|??->'],
								function (oldContents) {
									return function (newContents) {
										return A2(
											_panosoft$elm_utils$Utils_Ops_ops['?'],
											(!_elm_lang$core$Native_Utils.eq(oldContents, newContents)) && A2(_elm_lang$core$Set$member, packageName, config.linkedRepos),
											{
												ctor: '_Tuple2',
												_0: _elm_lang$core$Result$Err(
													A3(_panosoft$elm_grove$Component_Rewriter$linkedRepoRewriteError, config, packageName, packagesConflicts)),
												_1: _elm_lang$core$Result$Ok(
													{
														ctor: '_Tuple2',
														_0: !_elm_lang$core$Native_Utils.eq(oldContents, newContents),
														_1: newContents
													})
											});
									}(
										A4(
											_elm_lang$core$Regex$replace,
											_elm_lang$core$Regex$All,
											_elm_lang$core$Regex$regex(
												A2(
													_elm_lang$core$Basics_ops['++'],
													'(require\\s*',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_panosoft$elm_grove$Component_Rewriter$endOfLine,
														A2(
															_elm_lang$core$Basics_ops['++'],
															'*)\\([\'\"](',
															A2(
																_elm_lang$core$Basics_ops['++'],
																conflicLibsRegex,
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	')[\'\"]\\)([\\.\t ;',
																	A2(_elm_lang$core$Basics_ops['++'], _panosoft$elm_grove$Component_Rewriter$endOfLine, '])'))))))),
											_panosoft$elm_utils$Utils_Regex$parametricReplacer(
												A2(
													_elm_lang$core$Basics_ops['++'],
													'$1(\'./node_modules/@',
													A2(_elm_lang$core$Basics_ops['++'], packageName, '/node_modules/$2\')$3'))),
											oldContents));
								}(
									A3(_panosoft$elm_utils$Utils_Regex$replaceAll, '\n', _panosoft$elm_grove$Component_Rewriter$endOfLine, contents)),
								{
									ctor: '_Tuple2',
									_0: _elm_lang$core$Result$Err,
									_1: function (_p1) {
										var _p2 = _p1;
										return _elm_lang$core$Result$Ok(
											{
												ctor: '_Tuple2',
												_0: _p2._0,
												_1: A3(_panosoft$elm_utils$Utils_Regex$replaceAll, _panosoft$elm_grove$Component_Rewriter$endOfLine, '\n', _p2._1)
											});
									}
								});
						}(
							A3(
								_elm_lang$core$Basics$flip,
								F2(
									function (x, y) {
										return A2(_elm_lang$core$Basics_ops['++'], x, y);
									}),
								')',
								A2(
									F2(
										function (x, y) {
											return A2(_elm_lang$core$Basics_ops['++'], x, y);
										}),
									'(?:',
									A2(_elm_lang$core$String$join, '|', packagesConflicts))));
					}(
						A2(
							_elm_lang$core$List$filterMap,
							function (_p3) {
								var _p4 = _p3;
								return A2(
									_panosoft$elm_utils$Utils_Ops_ops['?'],
									_elm_lang$core$Native_Utils.eq(_p4._0, packageName),
									{
										ctor: '_Tuple2',
										_0: _elm_lang$core$Maybe$Just(_p4._1),
										_1: _elm_lang$core$Maybe$Nothing
									});
							},
							conflictLibs));
				}
			});
	});
var _panosoft$elm_grove$Component_Rewriter$getPackageAndPath = F2(
	function (config, path) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
			_elm_lang$core$List$head(
				A3(
					_elm_lang$core$Regex$find,
					_elm_lang$core$Regex$AtMost(1),
					_elm_lang$core$Regex$regex(
						A2(
							_panosoft$elm_utils$Utils_Ops_ops['?'],
							_elm_lang$core$Native_Utils.eq(config.pathSep, '\\'),
							{
								ctor: '_Tuple2',
								_0: A2(_panosoft$elm_utils$Utils_Regex$replaceAll, '/', '\\'),
								_1: _elm_lang$core$Basics$identity
							})(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'^',
								A2(
									_panosoft$elm_grove$Component_Rewriter$pathJoin,
									config,
									{
										ctor: '::',
										_0: A2(_panosoft$elm_grove$Package$elmPackagesRoot, config.testing, config.pathSep),
										_1: {
											ctor: '::',
											_0: '([a-zA-Z0-9\\-]+/[a-zA-Z0-9\\-]+)/\\d+\\.\\d+\\.\\d+/(.+\\.js$)',
											_1: {ctor: '[]'}
										}
									})))),
					path)),
			{
				ctor: '_Tuple2',
				_0: _panosoft$elm_grove$AppUtils$bugMissing('match'),
				_1: _panosoft$elm_utils$Utils_Match$getSubmatches2
			});
	});
var _panosoft$elm_grove$Component_Rewriter$rewriteFilesPattern = F2(
	function (config, packages) {
		return function (s) {
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				_elm_lang$core$Native_Utils.eq(
					_elm_lang$core$List$length(packages),
					1),
				{
					ctor: '_Tuple2',
					_0: s,
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						'{',
						A2(_elm_lang$core$Basics_ops['++'], s, '}'))
				});
		}(
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				_elm_lang$core$Native_Utils.eq(config.pathSep, '\\'),
				{
					ctor: '_Tuple2',
					_0: A2(_panosoft$elm_utils$Utils_Regex$replaceAll, '/', '\\'),
					_1: _elm_lang$core$Basics$identity
				})(
				A2(
					_elm_lang$core$String$join,
					',',
					A2(
						_elm_lang$core$List$map,
						function (packageName) {
							return A2(
								_panosoft$elm_grove$Component_Rewriter$pathJoin,
								config,
								{
									ctor: '::',
									_0: A2(_panosoft$elm_grove$Package$elmPackagesRoot, config.testing, config.pathSep),
									_1: {
										ctor: '::',
										_0: packageName,
										_1: {
											ctor: '::',
											_0: '**/*.js',
											_1: {ctor: '[]'}
										}
									}
								});
						},
						packages))));
	});
var _panosoft$elm_grove$Component_Rewriter$rewriteFilesIgnorePattern = function (config) {
	return function (s) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'{',
			A2(_elm_lang$core$Basics_ops['++'], s, '}'));
	}(
		A2(
			_panosoft$elm_utils$Utils_Ops_ops['?'],
			_elm_lang$core$Native_Utils.eq(config.pathSep, '\\'),
			{
				ctor: '_Tuple2',
				_0: A2(_panosoft$elm_utils$Utils_Regex$replaceAll, '/', '\\'),
				_1: _elm_lang$core$Basics$identity
			})(
			A2(
				_elm_lang$core$String$join,
				',',
				A2(
					_elm_lang$core$List$map,
					function (pattern) {
						return A2(
							_panosoft$elm_grove$Component_Rewriter$pathJoin,
							config,
							{
								ctor: '::',
								_0: A2(_panosoft$elm_grove$Package$elmPackagesRoot, config.testing, config.pathSep),
								_1: {
									ctor: '::',
									_0: pattern,
									_1: {ctor: '[]'}
								}
							});
					},
					{
						ctor: '::',
						_0: '**/elm-stuff/**',
						_1: {
							ctor: '::',
							_0: '**/node_modules/**',
							_1: {ctor: '[]'}
						}
					}))));
};
var _panosoft$elm_grove$Component_Rewriter$Config = F6(
	function (a, b, c, d, e, f) {
		return {linkedRepos: a, testing: b, routeToMe: c, operationComplete: d, cwd: e, pathSep: f};
	});
var _panosoft$elm_grove$Component_Rewriter$Model = F2(
	function (a, b) {
		return {rewriteCountDown: a, rewriteCount: b};
	});
var _panosoft$elm_grove$Component_Rewriter$RewriteFailed = {ctor: 'RewriteFailed'};
var _panosoft$elm_grove$Component_Rewriter$RewriteSuccess = {ctor: 'RewriteSuccess'};
var _panosoft$elm_grove$Component_Rewriter$FileWrittenComplete = F2(
	function (a, b) {
		return {ctor: 'FileWrittenComplete', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Rewriter$FileReadComplete = F3(
	function (a, b, c) {
		return {ctor: 'FileReadComplete', _0: a, _1: b, _2: c};
	});
var _panosoft$elm_grove$Component_Rewriter$ConflictLibsFound = F2(
	function (a, b) {
		return {ctor: 'ConflictLibsFound', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Rewriter$FilesToRewriteFound = F2(
	function (a, b) {
		return {ctor: 'FilesToRewriteFound', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Rewriter$rewrite = F3(
	function (config, model, packages) {
		return A2(
			_elm_lang$core$Platform_Cmd_ops['!'],
			model,
			{
				ctor: '::',
				_0: A2(
					_elm_lang$core$Task$attempt,
					function (_p5) {
						return config.routeToMe(
							A2(_panosoft$elm_grove$Component_Rewriter$FilesToRewriteFound, packages, _p5));
					},
					A3(
						_panosoft$elm_grove$Glob$find,
						A2(_panosoft$elm_grove$Component_Rewriter$rewriteFilesPattern, config, packages),
						_elm_lang$core$Maybe$Just(
							_panosoft$elm_grove$Component_Rewriter$rewriteFilesIgnorePattern(config)),
						true)),
				_1: {ctor: '[]'}
			});
	});
var _panosoft$elm_grove$Component_Rewriter$OperationComplete = F2(
	function (a, b) {
		return {ctor: 'OperationComplete', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Rewriter$operationError = F2(
	function (model, task) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Task$perform,
						function (_p6) {
							return A2(_panosoft$elm_grove$Component_Rewriter$OperationComplete, model.rewriteCount, _panosoft$elm_grove$Component_Rewriter$RewriteFailed);
						},
						task),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	});
var _panosoft$elm_grove$Component_Rewriter$update = F3(
	function (config, msg, model) {
		var _p7 = msg;
		switch (_p7.ctor) {
			case 'OperationComplete':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: A2(config.operationComplete, _p7._0, _p7._1),
						_1: {ctor: '[]'}
					}
				};
			case 'FilesToRewriteFound':
				if (_p7._1.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Rewriter$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								'Unable to retrieve Native Code for rewriting Error:',
								_elm_node$core$Node_Error$message(_p7._1._0))));
				} else {
					return {
						ctor: '_Tuple2',
						_0: A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: A2(
									_elm_lang$core$Task$attempt,
									_panosoft$elm_grove$Component_Rewriter$ConflictLibsFound(_p7._1._0),
									A3(
										_panosoft$elm_grove$Glob$find,
										A2(_panosoft$elm_grove$Component_Rewriter$conflictLibsPattern, config, _p7._0),
										_elm_lang$core$Maybe$Nothing,
										true)),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					};
				}
			case 'ConflictLibsFound':
				if (_p7._1.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Rewriter$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								'Unable to retrieve Conflict Libs for rewriting Error:',
								_elm_node$core$Node_Error$message(_p7._1._0))));
				} else {
					var _p8 = _p7._0;
					return function (conflictLibs) {
						return function (cmds) {
							return function (numFilesToRewrite) {
								return A2(
									_panosoft$elm_utils$Utils_Ops_ops['?'],
									_elm_lang$core$Native_Utils.eq(numFilesToRewrite, 0),
									{
										ctor: '_Tuple2',
										_0: {
											ctor: '_Tuple2',
											_0: A2(
												_elm_lang$core$Platform_Cmd_ops['!'],
												model,
												{ctor: '[]'}),
											_1: {
												ctor: '::',
												_0: A2(config.operationComplete, model.rewriteCount, _panosoft$elm_grove$Component_Rewriter$RewriteSuccess),
												_1: {ctor: '[]'}
											}
										},
										_1: {
											ctor: '_Tuple2',
											_0: A2(
												_elm_lang$core$Platform_Cmd_ops['!'],
												_elm_lang$core$Native_Utils.update(
													model,
													{rewriteCountDown: numFilesToRewrite}),
												cmds),
											_1: {ctor: '[]'}
										}
									});
							}(
								_elm_lang$core$List$length(_p8));
						}(
							A2(
								_elm_lang$core$List$map,
								function (path) {
									return A2(
										_elm_lang$core$Task$attempt,
										A2(_panosoft$elm_grove$Component_Rewriter$FileReadComplete, path, conflictLibs),
										A2(_elm_node$core$Node_FileSystem$readFileAsString, path, _elm_node$core$Node_Encoding$Utf8));
								},
								_p8));
					}(
						A2(
							_elm_lang$core$List$map,
							function (path) {
								return A2(
									_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
									_elm_lang$core$List$head(
										A3(
											_elm_lang$core$Regex$find,
											_elm_lang$core$Regex$All,
											_elm_lang$core$Regex$regex(
												A2(
													_panosoft$elm_utils$Utils_Ops_ops['?'],
													_elm_lang$core$Native_Utils.eq(config.pathSep, '\\'),
													{
														ctor: '_Tuple2',
														_0: A2(_panosoft$elm_utils$Utils_Regex$replaceAll, '/', '\\'),
														_1: _elm_lang$core$Basics$identity
													})(
													A2(
														_elm_lang$core$Basics_ops['++'],
														'^',
														A2(_elm_lang$core$Basics_ops['++'], config.cwd, '/node_modules/@(.+?)/node_modules/(.+?)$')))),
											path)),
									{
										ctor: '_Tuple2',
										_0: _panosoft$elm_grove$AppUtils$bug('bad regex'),
										_1: _panosoft$elm_utils$Utils_Match$getSubmatches2
									});
							},
							_p7._1._0));
				}
			case 'FileReadComplete':
				if (_p7._2.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Rewriter$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to read file:', _p7._0),
									' for rewriting Error:'),
								_elm_node$core$Node_Error$message(_p7._2._0))));
				} else {
					var _p18 = _p7._0;
					return function (_p9) {
						var _p10 = _p9;
						var _p17 = _p10._0;
						return function (cmd) {
							return {
								ctor: '_Tuple2',
								_0: A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									{
										ctor: '::',
										_0: cmd,
										_1: {ctor: '[]'}
									}),
								_1: {ctor: '[]'}
							};
						}(
							A2(
								_elm_lang$core$Task$attempt,
								_panosoft$elm_grove$Component_Rewriter$FileWrittenComplete(_p18),
								A2(
									_panosoft$elm_utils$Utils_Ops_ops['|??->'],
									A4(_panosoft$elm_grove$Component_Rewriter$rewriteContents, config, _p7._2._0, _p17, _p7._1),
									{
										ctor: '_Tuple2',
										_0: function (_p11) {
											return _elm_lang$core$Task$fail(
												A3(_elm_lang$core$Basics$flip, _elm_node$core$Node_Error$Error, '', _p11));
										},
										_1: function (_p12) {
											var _p13 = _p12;
											return A2(
												_panosoft$elm_utils$Utils_Ops_ops['?'],
												_p13._0,
												{
													ctor: '_Tuple2',
													_0: A2(
														_elm_lang$core$Task$andThen,
														function (_p14) {
															return _elm_lang$core$Task$succeed(true);
														},
														A2(
															_elm_lang$core$Task$andThen,
															function (_p15) {
																return A2(_panosoft$elm_grove$AppUtils$writeFile, _p18, _p13._1);
															},
															A2(
																_elm_lang$core$Task$mapError,
																function (_p16) {
																	return A2(_elm_node$core$Node_Error$Error, 'should never happen', '');
																},
																_panosoft$elm_grove$Console$log(
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		A2(
																			_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																			'Rewriting',
																			A2(
																				_panosoft$elm_grove$Output$colorize,
																				_panosoft$elm_grove$Output$cyan,
																				A2(
																					_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																					_p17,
																					_panosoft$elm_grove$Output$parens(_p10._1)))),
																		''))))),
													_1: _elm_lang$core$Task$succeed(false)
												});
										}
									})));
					}(
						A2(_panosoft$elm_grove$Component_Rewriter$getPackageAndPath, config, _p18));
				}
			default:
				if (_p7._1.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Rewriter$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to write file:', _p7._0),
									'for rewriting Error:'),
								_elm_node$core$Node_Error$message(_p7._1._0))));
				} else {
					return function (model) {
						return {
							ctor: '_Tuple2',
							_0: A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								{ctor: '[]'}),
							_1: A2(
								_panosoft$elm_utils$Utils_Ops_ops['?'],
								_elm_lang$core$Native_Utils.eq(model.rewriteCountDown, 0),
								{
									ctor: '_Tuple2',
									_0: {
										ctor: '::',
										_0: A2(config.operationComplete, model.rewriteCount, _panosoft$elm_grove$Component_Rewriter$RewriteSuccess),
										_1: {ctor: '[]'}
									},
									_1: {ctor: '[]'}
								})
						};
					}(
						_elm_lang$core$Native_Utils.update(
							model,
							{
								rewriteCountDown: model.rewriteCountDown - 1,
								rewriteCount: model.rewriteCount + A2(
									_panosoft$elm_utils$Utils_Ops_ops['?'],
									_p7._1._0,
									{ctor: '_Tuple2', _0: 1, _1: 0})
							}));
				}
		}
	});
var _panosoft$elm_grove$Component_Rewriter$operationSuccessful = F2(
	function (model, task) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Task$perform,
						function (_p19) {
							return A2(_panosoft$elm_grove$Component_Rewriter$OperationComplete, model.rewriteCount, _panosoft$elm_grove$Component_Rewriter$RewriteSuccess);
						},
						task),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	});

var _panosoft$elm_grove$Component_Install$getNpmPackages = function (_p0) {
	return _elm_lang$core$Set$toList(
		function (_) {
			return _.npmPackages;
		}(_p0));
};
var _panosoft$elm_grove$Component_Install$timeToInstall = function (model) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (set, result) {
				return result && _elm_lang$core$Native_Utils.eq(
					_elm_lang$core$Set$size(set),
					0);
			}),
		true,
		{
			ctor: '::',
			_0: model.readingElmJson,
			_1: {
				ctor: '::',
				_0: model.cloning,
				_1: {
					ctor: '::',
					_0: model.checkingOut,
					_1: {
						ctor: '::',
						_0: model.preparingLink,
						_1: {
							ctor: '::',
							_0: model.checkingNpm,
							_1: {ctor: '[]'}
						}
					}
				}
			}
		});
};
var _panosoft$elm_grove$Component_Install$getRepoDetails = function (installState) {
	return A2(
		_panosoft$elm_utils$Utils_Ops_ops['?!='],
		installState.maybeRepoDetails,
		_panosoft$elm_grove$AppUtils$bugMissing('repoDetails'));
};
var _panosoft$elm_grove$Component_Install$getVersions = F4(
	function (tags, range, parentPackageName, packageName) {
		return function (allVersions) {
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['|?!**>'],
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$head(
						A2(
							_elm_lang$core$List$filter,
							_panosoft$elm_grove$Version$inRange(range),
							allVersions)),
					_1: _elm_lang$core$List$head(allVersions)
				},
				{
					ctor: '_Tuple3',
					_0: function (_p1) {
						return _elm_lang$core$Result$Err(
							_panosoft$elm_grove$Output$errorLog(
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(
										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
										A2(
											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
											A2(
												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
												A2(
													_panosoft$elm_string_utils$StringUtils_ops['+-+'],
													A2(
														_panosoft$elm_string_utils$StringUtils_ops['+-+'],
														A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'No version exists for:', packageName),
														'as specified by:'),
													parentPackageName),
												'which is range:'),
											range),
										'existing versions:'),
									A2(_elm_lang$core$List$map, _panosoft$elm_grove$Version$versionToString, allVersions))));
					},
					_1: _panosoft$elm_grove$AppUtils$bug('Cannot get head of allVersions EVEN THOUGH head of inRangeVersion was retrieved'),
					_2: function (_p2) {
						var _p3 = _p2;
						return _elm_lang$core$Result$Ok(
							{
								ctor: '_Tuple2',
								_0: _panosoft$elm_grove$Version$versionToString(_p3._0),
								_1: _panosoft$elm_grove$Version$versionToString(_p3._1)
							});
					}
				});
		}(
			_panosoft$elm_grove$AppUtils$sortedVersions(tags));
	});
var _panosoft$elm_grove$Component_Install$hasPackageBeenClonedOrLinked = F2(
	function (packageName, model) {
		return A2(
			_elm_lang$core$Set$member,
			packageName,
			A3(
				_elm_lang$core$List$foldl,
				F2(
					function (set, union) {
						return A2(_elm_lang$core$Set$union, set, union);
					}),
				_elm_lang$core$Set$empty,
				{
					ctor: '::',
					_0: model.cloning,
					_1: {
						ctor: '::',
						_0: model.cloned,
						_1: {
							ctor: '::',
							_0: model.preparingLink,
							_1: {
								ctor: '::',
								_0: model.preparedLink,
								_1: {ctor: '[]'}
							}
						}
					}
				}));
	});
var _panosoft$elm_grove$Component_Install$pathJoin = F2(
	function (config, pathParts) {
		return A3(_panosoft$elm_grove$AppUtils$pathJoin, config.pathSep, config.cwd, pathParts);
	});
var _panosoft$elm_grove$Component_Install$exactDependenciesLocation = function (config) {
	return A2(
		_panosoft$elm_grove$Component_Install$pathJoin,
		config,
		{
			ctor: '::',
			_0: A2(_panosoft$elm_grove$Package$elmPackagesRoot, config.testing, config.pathSep),
			_1: {
				ctor: '::',
				_0: '..',
				_1: {
					ctor: '::',
					_0: _panosoft$elm_grove$Package$exactDependenciesFileName,
					_1: {ctor: '[]'}
				}
			}
		});
};
var _panosoft$elm_grove$Component_Install$decodeOfficialPackageList = _elm_lang$core$Json_Decode$list(
	A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string));
var _panosoft$elm_grove$Component_Install$officialElmPackagesUrl = 'http://package.elm-lang.org/all-packages';
var _panosoft$elm_grove$Component_Install$Config = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return {testing: a, linking: b, dryRun: c, npmProduction: d, npmSilent: e, noRewrite: f, skipNpmInstall: g, routeToMe: h, operationComplete: i, elmVersion: j, cwd: k, pathSep: l, packages: m, sources: n, safeMode: o};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _panosoft$elm_grove$Component_Install$RepoDetails = F2(
	function (a, b) {
		return {repo: a, tags: b};
	});
var _panosoft$elm_grove$Component_Install$InstallState = F7(
	function (a, b, c, d, e, f, g) {
		return {maybeRepoDetails: a, parentPackageName: b, dependsOn: c, maybeVersionStr: d, maybeRepoLocation: e, maybeElmJsonStr: f, maybeElmJson: g};
	});
var _panosoft$elm_grove$Component_Install$clonePackageTask = F4(
	function (elmJson, parentPackageName, model, dependsOn) {
		return function (repoLocation) {
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				A2(_panosoft$elm_grove$Component_Install$hasPackageBeenClonedOrLinked, dependsOn.packageName, model),
				{
					ctor: '_Tuple2',
					_0: {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Maybe$Nothing},
					_1: {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								cloning: A2(_elm_lang$core$Set$insert, dependsOn.packageName, model.cloning)
							}),
						_1: _elm_lang$core$Maybe$Just(
							A2(
								_elm_lang$core$Task$andThen,
								function (_p4) {
									return A2(
										_elm_lang$core$Task$mapError,
										function (error) {
											return {ctor: '_Tuple2', _0: dependsOn, _1: error};
										},
										A2(
											_elm_lang$core$Task$andThen,
											function (repo) {
												return A2(
													_elm_lang$core$Task$andThen,
													function (tags) {
														return _elm_lang$core$Task$succeed(
															A7(
																_panosoft$elm_grove$Component_Install$InstallState,
																_elm_lang$core$Maybe$Just(
																	{repo: repo, tags: tags}),
																parentPackageName,
																dependsOn,
																_elm_lang$core$Maybe$Nothing,
																_elm_lang$core$Maybe$Just(repoLocation),
																_elm_lang$core$Maybe$Nothing,
																_elm_lang$core$Maybe$Nothing));
													},
													_panosoft$elm_grove$Git$getTags(repo));
											},
											_panosoft$elm_grove$Git$clone(repoLocation)));
								},
								A2(
									_elm_lang$core$Task$mapError,
									function (_p5) {
										return {ctor: '_Tuple2', _0: dependsOn, _1: 'Should never happen'};
									},
									_panosoft$elm_grove$Console$log(
										A2(
											_elm_lang$core$Basics_ops['++'],
											A2(
												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
												'Cloning',
												A2(_panosoft$elm_grove$Output$colorize, _panosoft$elm_grove$Output$cyan, repoLocation)),
											'')))))
					}
				});
		}(
			A2(_panosoft$elm_grove$Package$getRepoLocation, elmJson.dependencySources, dependsOn.packageName));
	});
var _panosoft$elm_grove$Component_Install$linkPackageTask = F5(
	function (config, repoLocation, parentPackageName, model, dependsOn) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?'],
			A2(_panosoft$elm_grove$Component_Install$hasPackageBeenClonedOrLinked, dependsOn.packageName, model),
			{
				ctor: '_Tuple2',
				_0: {ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Maybe$Nothing},
				_1: {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{
							preparingLink: A2(_elm_lang$core$Set$insert, dependsOn.packageName, model.preparingLink)
						}),
					_1: _elm_lang$core$Maybe$Just(
						function (path) {
							return A2(
								_elm_lang$core$Task$andThen,
								function (_p6) {
									return A2(
										_elm_lang$core$Task$mapError,
										function (error) {
											return {
												ctor: '_Tuple2',
												_0: dependsOn,
												_1: _elm_node$core$Node_Error$message(error)
											};
										},
										A2(
											_elm_lang$core$Task$andThen,
											function (contents) {
												return _elm_lang$core$Task$succeed(
													A7(
														_panosoft$elm_grove$Component_Install$InstallState,
														_elm_lang$core$Maybe$Nothing,
														parentPackageName,
														dependsOn,
														_elm_lang$core$Maybe$Nothing,
														_elm_lang$core$Maybe$Just(repoLocation),
														_elm_lang$core$Maybe$Just(contents),
														_elm_lang$core$Maybe$Nothing));
											},
											A2(_elm_node$core$Node_FileSystem$readFileAsString, path, _elm_node$core$Node_Encoding$Utf8)));
								},
								A2(
									_elm_lang$core$Task$mapError,
									function (_p7) {
										return {ctor: '_Tuple2', _0: dependsOn, _1: 'Should never happen'};
									},
									_panosoft$elm_grove$Console$log(
										A2(
											_elm_lang$core$Basics_ops['++'],
											A2(
												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
												'Preparing to Link',
												A2(_panosoft$elm_grove$Output$colorize, _panosoft$elm_grove$Output$cyan, repoLocation)),
											''))));
						}(
							A2(
								_elm_lang$core$String$join,
								config.pathSep,
								{
									ctor: '::',
									_0: repoLocation,
									_1: {
										ctor: '::',
										_0: _panosoft$elm_grove$Package$elmJsonFilename,
										_1: {ctor: '[]'}
									}
								})))
				}
			});
	});
var _panosoft$elm_grove$Component_Install$CheckedOutPackage = F4(
	function (a, b, c, d) {
		return {dependsOn: a, versionStr: b, repoDetails: c, repoLocation: d};
	});
var _panosoft$elm_grove$Component_Install$checkoutPackageTask = F4(
	function (config, installState, range, model) {
		return function (_p8) {
			var _p9 = _p8;
			var _p20 = _p9._1;
			var _p19 = _p9._0;
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['|??->'],
				A4(_panosoft$elm_grove$Component_Install$getVersions, _p20.tags, range, installState.parentPackageName, _p19.packageName),
				{
					ctor: '_Tuple2',
					_0: function (logTask) {
						return {
							ctor: '_Tuple2',
							_0: {
								ctor: '::',
								_0: logTask,
								_1: {ctor: '[]'}
							},
							_1: _elm_lang$core$Result$Err(-1)
						};
					},
					_1: function (_p10) {
						var _p11 = _p10;
						var _p18 = _p11._1;
						var _p17 = _p11._0;
						return function (warnTask) {
							return function (installState) {
								return function (_p12) {
									var _p13 = _p12;
									var _p14 = _p13._1;
									return {
										ctor: '_Tuple2',
										_0: {ctor: '::', _0: warnTask, _1: _p14},
										_1: A2(
											_panosoft$elm_utils$Utils_Ops_ops['?'],
											!_elm_lang$core$Native_Utils.eq(
												_p14,
												{ctor: '[]'}),
											{
												ctor: '_Tuple2',
												_0: _elm_lang$core$Result$Err(-1),
												_1: _elm_lang$core$Result$Ok(
													{ctor: '_Tuple2', _0: _p13._0, _1: _p13._2})
											})
									};
								}(
									A2(
										_panosoft$elm_utils$Utils_Ops_ops['?='],
										A2(
											_panosoft$elm_utils$Utils_Ops_ops['|?>'],
											A2(_elm_lang$core$Dict$get, _p19.packageName, model.checkedOut),
											function (checkedOutPackage) {
												return {
													ctor: '_Tuple3',
													_0: model,
													_1: A2(
														_panosoft$elm_utils$Utils_Ops_ops['?'],
														_elm_lang$core$Native_Utils.eq(checkedOutPackage.versionStr, _p17),
														{
															ctor: '_Tuple2',
															_0: {ctor: '[]'},
															_1: {
																ctor: '::',
																_0: _panosoft$elm_grove$Output$errorLog(
																	A2(
																		_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																		A2(
																			_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																			A2(
																				_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																				A2(
																					_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																					A2(
																						_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																						A2(
																							_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																							A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Version mismatch for:', _p19.packageName),
																							'version:'),
																						_p17),
																					_panosoft$elm_grove$Output$parens(_p19.dependencyPath)),
																				'with previously checked out version:'),
																			checkedOutPackage.versionStr),
																		_panosoft$elm_grove$Output$parens(checkedOutPackage.dependsOn.dependencyPath))),
																_1: {ctor: '[]'}
															}
														}),
													_2: _elm_lang$core$Maybe$Nothing
												};
											}),
										{
											ctor: '_Tuple3',
											_0: _elm_lang$core$Native_Utils.update(
												model,
												{
													checkingOut: A2(_elm_lang$core$Set$insert, _p19.packageName, model.checkingOut),
													checkedOut: A3(
														_elm_lang$core$Dict$insert,
														_p19.packageName,
														A4(
															_panosoft$elm_grove$Component_Install$CheckedOutPackage,
															_p19,
															_p17,
															_p20,
															A2(
																_panosoft$elm_utils$Utils_Ops_ops['?!='],
																installState.maybeRepoLocation,
																_panosoft$elm_grove$AppUtils$bugMissing('repoLocation'))),
														model.checkedOut)
												}),
											_1: {ctor: '[]'},
											_2: _elm_lang$core$Maybe$Just(
												A2(
													_elm_lang$core$Task$andThen,
													function (_p15) {
														return A2(
															_elm_lang$core$Task$andThen,
															_elm_lang$core$Basics$always(
																_elm_lang$core$Task$succeed(installState)),
															A2(
																_elm_lang$core$Task$mapError,
																function (error) {
																	return {ctor: '_Tuple2', _0: installState, _1: error};
																},
																A3(
																	_panosoft$elm_grove$Git$checkout,
																	_p20.repo,
																	_p17,
																	A2(
																		_panosoft$elm_grove$Component_Install$pathJoin,
																		config,
																		{
																			ctor: '::',
																			_0: _p20.repo.cloneLocation,
																			_1: {
																				ctor: '::',
																				_0: _p17,
																				_1: {ctor: '[]'}
																			}
																		}))));
													},
													A2(
														_elm_lang$core$Task$mapError,
														function (_p16) {
															return {ctor: '_Tuple2', _0: installState, _1: 'Should never happen'};
														},
														_panosoft$elm_grove$Console$log(
															A2(
																_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																A2(
																	_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																	'Checking out:',
																	A2(_panosoft$elm_grove$Output$colorize, _panosoft$elm_grove$Output$magenta, _p19.packageName)),
																_panosoft$elm_grove$Output$parens(_p17))))))
										}));
							}(
								_elm_lang$core$Native_Utils.update(
									installState,
									{
										maybeVersionStr: _elm_lang$core$Maybe$Just(_p17)
									}));
						}(
							A2(
								_panosoft$elm_utils$Utils_Ops_ops['?'],
								!_elm_lang$core$Native_Utils.eq(_p17, _p18),
								{
									ctor: '_Tuple2',
									_0: _panosoft$elm_grove$Output$warnLog(
										A2(
											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
											A2(
												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
												A2(
													_panosoft$elm_string_utils$StringUtils_ops['+-+'],
													A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Newer version of:', _p19.packageName),
													'exists:'),
												_p18),
											_panosoft$elm_grove$Output$parens(installState.dependsOn.dependencyPath))),
									_1: _elm_lang$core$Task$succeed('')
								}));
					}
				});
		}(
			{
				ctor: '_Tuple2',
				_0: installState.dependsOn,
				_1: _panosoft$elm_grove$Component_Install$getRepoDetails(installState)
			});
	});
var _panosoft$elm_grove$Component_Install$LinkedRepo = F3(
	function (a, b, c) {
		return {repoLocation: a, maybeInstallState: b, maybeVersion: c};
	});
var _panosoft$elm_grove$Component_Install$Model = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return function (q) {
																	return {linkedRepos: a, elmJson: b, readingElmJson: c, cloning: d, cloned: e, preparingLink: f, preparedLink: g, checkingOut: h, checkedOut: i, checkingNpm: j, checkedNpm: k, installed: l, npmPackages: m, finalCheckoutCount: n, rewriterModel: o, elmJsonIndent: p, officialElmPackages: q};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _panosoft$elm_grove$Component_Install$Linked = {ctor: 'Linked'};
var _panosoft$elm_grove$Component_Install$Cloned = {ctor: 'Cloned'};
var _panosoft$elm_grove$Component_Install$cloneAllPackagesTasks = F5(
	function (config, elmJson, parentPackageName, model, dependencyRanges) {
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p22, _p21) {
					var _p23 = _p22;
					var _p29 = _p23._0;
					var _p24 = _p21;
					var _p28 = _p24._1;
					var _p27 = _p24._0;
					return function (_p25) {
						var _p26 = _p25;
						return {
							ctor: '_Tuple2',
							_0: _p26._1._0,
							_1: A2(
								_panosoft$elm_utils$Utils_Ops_ops['?='],
								A2(
									_panosoft$elm_utils$Utils_Ops_ops['|?>'],
									_p26._1._1,
									function (task) {
										return {
											ctor: '::',
											_0: {ctor: '_Tuple4', _0: _p26._0, _1: _p29, _2: _p23._1, _3: task},
											_1: _p28
										};
									}),
								_p28)
						};
					}(
						A2(
							_panosoft$elm_utils$Utils_Ops_ops['?='],
							A2(
								_panosoft$elm_utils$Utils_Ops_ops['|?>'],
								A2(_elm_lang$core$Dict$get, _p29.packageName, _p27.linkedRepos),
								function (linkedRepo) {
									return {
										ctor: '_Tuple2',
										_0: _panosoft$elm_grove$Component_Install$Linked,
										_1: A5(_panosoft$elm_grove$Component_Install$linkPackageTask, config, linkedRepo.repoLocation, parentPackageName, _p27, _p29)
									};
								}),
							{
								ctor: '_Tuple2',
								_0: _panosoft$elm_grove$Component_Install$Cloned,
								_1: A4(_panosoft$elm_grove$Component_Install$clonePackageTask, elmJson, parentPackageName, _p27, _p29)
							}));
				}),
			{
				ctor: '_Tuple2',
				_0: model,
				_1: {ctor: '[]'}
			},
			dependencyRanges);
	});
var _panosoft$elm_grove$Component_Install$Subsequent = {ctor: 'Subsequent'};
var _panosoft$elm_grove$Component_Install$Initial = {ctor: 'Initial'};
var _panosoft$elm_grove$Component_Install$RewriterMsg = function (a) {
	return {ctor: 'RewriterMsg', _0: a};
};
var _panosoft$elm_grove$Component_Install$RewritingComplete = F2(
	function (a, b) {
		return {ctor: 'RewritingComplete', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Install$rewriterConfig = F2(
	function (config, linkedRepos) {
		return {linkedRepos: linkedRepos, testing: config.testing, routeToMe: _panosoft$elm_grove$Component_Install$RewriterMsg, operationComplete: _panosoft$elm_grove$Component_Install$RewritingComplete, cwd: config.cwd, pathSep: config.pathSep};
	});
var _panosoft$elm_grove$Component_Install$NpmOperationComplete = F2(
	function (a, b) {
		return {ctor: 'NpmOperationComplete', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Install$NpmPackageWritten = function (a) {
	return {ctor: 'NpmPackageWritten', _0: a};
};
var _panosoft$elm_grove$Component_Install$NpmPackageRead = function (a) {
	return {ctor: 'NpmPackageRead', _0: a};
};
var _panosoft$elm_grove$Component_Install$FinalElmFilesWritten = function (a) {
	return {ctor: 'FinalElmFilesWritten', _0: a};
};
var _panosoft$elm_grove$Component_Install$InstallOrLinkComplete = F4(
	function (a, b, c, d) {
		return {ctor: 'InstallOrLinkComplete', _0: a, _1: b, _2: c, _3: d};
	});
var _panosoft$elm_grove$Component_Install$installOrLink = F2(
	function (config, model) {
		return function (_p30) {
			var _p31 = _p30;
			var _p33 = _p31._1;
			var _p32 = _p31._0;
			return {
				ctor: '_Tuple2',
				_0: A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					_elm_lang$core$Native_Utils.update(
						model,
						{
							finalCheckoutCount: _elm_lang$core$List$length(_p32) + _elm_lang$core$List$length(_p33)
						}),
					A2(_elm_lang$core$List$append, _p32, _p33)),
				_1: {ctor: '[]'}
			};
		}(
			{
				ctor: '_Tuple2',
				_0: A3(
					_elm_lang$core$List$foldl,
					F2(
						function (_p34, cmds) {
							var _p35 = _p34;
							var _p42 = _p35._0;
							var _p41 = _p35._1;
							return function (installPath) {
								return {
									ctor: '::',
									_0: A2(
										_elm_lang$core$Task$attempt,
										A3(_panosoft$elm_grove$Component_Install$InstallOrLinkComplete, _p42, _p41.versionStr, _p41.repoLocation),
										A2(
											_elm_lang$core$Task$andThen,
											function (_p36) {
												return A2(
													_elm_lang$core$Task$andThen,
													function (_p37) {
														return A3(_panosoft$elm_grove$Git$checkout, _p41.repoDetails.repo, _p41.versionStr, installPath);
													},
													A2(
														_elm_lang$core$Task$mapError,
														_elm_node$core$Node_Error$message,
														_elm_node$core$Node_FileSystem$remove(
															A2(
																_panosoft$elm_grove$Component_Install$pathJoin,
																config,
																{
																	ctor: '::',
																	_0: A2(_panosoft$elm_grove$Package$elmPackagesRoot, config.testing, config.pathSep),
																	_1: {
																		ctor: '::',
																		_0: _p42,
																		_1: {ctor: '[]'}
																	}
																}))));
											},
											A2(
												_elm_lang$core$Task$andThen,
												function (_p38) {
													return A2(
														_elm_lang$core$Task$mapError,
														_elm_lang$core$Basics$always('Should never happen'),
														_panosoft$elm_grove$Console$log(
															A2(
																_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																A2(
																	_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																	'Installing:',
																	A2(_panosoft$elm_grove$Output$colorize, _panosoft$elm_grove$Output$green, _p42)),
																_panosoft$elm_grove$Output$parens(_p41.versionStr))));
												},
												function (isOfficial) {
													var _p39 = config.safeMode;
													switch (_p39.ctor) {
														case 'SafeModeOn':
															return A2(
																_panosoft$elm_utils$Utils_Ops_ops['?'],
																isOfficial,
																{
																	ctor: '_Tuple2',
																	_0: _elm_lang$core$Task$fail('Non-Official Elm Package (SafeMode: ON)'),
																	_1: _elm_lang$core$Task$succeed('')
																});
														case 'SafeModeOff':
															return A2(
																_panosoft$elm_utils$Utils_Ops_ops['?'],
																isOfficial,
																{
																	ctor: '_Tuple2',
																	_0: A2(
																		_elm_lang$core$Task$andThen,
																		function (_p40) {
																			return _elm_lang$core$Task$succeed('');
																		},
																		A2(
																			_elm_lang$core$Task$mapError,
																			_elm_lang$core$Basics$always('Should never happen'),
																			_panosoft$elm_grove$Output$warnLog(
																				A2(
																					_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																					A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Package:', _p42),
																					'is not an Official Elm Package (SafeMode: OFF)')))),
																	_1: _elm_lang$core$Task$succeed('')
																});
														default:
															return _elm_lang$core$Task$succeed('');
													}
												}(
													!A3(_elm_lang$core$Basics$flip, _elm_lang$core$Set$member, model.officialElmPackages, _p42))))),
									_1: cmds
								};
							}(
								A2(
									_panosoft$elm_grove$Component_Install$pathJoin,
									config,
									{
										ctor: '::',
										_0: A2(_panosoft$elm_grove$Package$elmPackagesRoot, config.testing, config.pathSep),
										_1: {
											ctor: '::',
											_0: _p42,
											_1: {
												ctor: '::',
												_0: _p41.versionStr,
												_1: {ctor: '[]'}
											}
										}
									}));
						}),
					{ctor: '[]'},
					_elm_lang$core$Dict$toList(model.checkedOut)),
				_1: A3(
					_elm_lang$core$List$foldl,
					F2(
						function (_p43, cmds) {
							var _p44 = _p43;
							var _p51 = _p44._0;
							var _p50 = _p44._1;
							return A2(
								_panosoft$elm_utils$Utils_Ops_ops['|?**>'],
								{ctor: '_Tuple2', _0: _p50.maybeInstallState, _1: _p50.maybeVersion},
								{
									ctor: '_Tuple3',
									_0: cmds,
									_1: cmds,
									_2: function (_p45) {
										var _p46 = _p45;
										return function (versionStr) {
											return function (packageRootPath) {
												return function (installPath) {
													return {
														ctor: '::',
														_0: A2(
															_elm_lang$core$Task$attempt,
															A3(_panosoft$elm_grove$Component_Install$InstallOrLinkComplete, _p51, versionStr, _p50.repoLocation),
															A2(
																_elm_lang$core$Task$andThen,
																function (_p47) {
																	return A2(
																		_elm_lang$core$Task$mapError,
																		_elm_node$core$Node_Error$message,
																		A2(
																			_elm_lang$core$Task$andThen,
																			function (_p48) {
																				return A3(_elm_node$core$Node_FileSystem$makeSymlink, _p50.repoLocation, installPath, 'dir');
																			},
																			A2(
																				_elm_lang$core$Task$andThen,
																				function (_p49) {
																					return _elm_node$core$Node_FileSystem$mkdirp(packageRootPath);
																				},
																				_elm_node$core$Node_FileSystem$remove(packageRootPath))));
																},
																A2(
																	_elm_lang$core$Task$mapError,
																	_elm_lang$core$Basics$always('Should never happen'),
																	_panosoft$elm_grove$Console$log(
																		A2(
																			_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																			A2(
																				_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																				'Linking:',
																				A2(_panosoft$elm_grove$Output$colorize, _panosoft$elm_grove$Output$green, _p51)),
																			_panosoft$elm_grove$Output$parens(versionStr)))))),
														_1: cmds
													};
												}(
													A2(
														_panosoft$elm_grove$Component_Install$pathJoin,
														config,
														{
															ctor: '::',
															_0: packageRootPath,
															_1: {
																ctor: '::',
																_0: versionStr,
																_1: {ctor: '[]'}
															}
														}));
											}(
												A2(
													_panosoft$elm_grove$Component_Install$pathJoin,
													config,
													{
														ctor: '::',
														_0: A2(_panosoft$elm_grove$Package$elmPackagesRoot, config.testing, config.pathSep),
														_1: {
															ctor: '::',
															_0: _p51,
															_1: {ctor: '[]'}
														}
													}));
										}(
											_panosoft$elm_grove$Version$versionToString(_p46._1));
									}
								});
						}),
					{ctor: '[]'},
					_elm_lang$core$Dict$toList(model.linkedRepos))
			});
	});
var _panosoft$elm_grove$Component_Install$DependentNpmPackageRead = F2(
	function (a, b) {
		return {ctor: 'DependentNpmPackageRead', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Install$CheckoutComplete = function (a) {
	return {ctor: 'CheckoutComplete', _0: a};
};
var _panosoft$elm_grove$Component_Install$CloneComplete = F2(
	function (a, b) {
		return {ctor: 'CloneComplete', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Install$LinkPrepareComplete = F2(
	function (a, b) {
		return {ctor: 'LinkPrepareComplete', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Install$cloneAllPackages = F5(
	function (config, elmJson, parentPackageName, model, dependencyRanges) {
		return function (_p52) {
			var _p53 = _p52;
			return function (cmds) {
				return A2(_elm_lang$core$Platform_Cmd_ops['!'], _p53._0, cmds);
			}(
				A2(
					_elm_lang$core$List$map,
					function (_p54) {
						var _p55 = _p54;
						var _p58 = _p55._3;
						var _p57 = _p55._2;
						var _p56 = _p55._0;
						if (_p56.ctor === 'Linked') {
							return A2(
								_elm_lang$core$Task$attempt,
								_panosoft$elm_grove$Component_Install$LinkPrepareComplete(_p57),
								_p58);
						} else {
							return A2(
								_elm_lang$core$Task$attempt,
								_panosoft$elm_grove$Component_Install$CloneComplete(_p57),
								_p58);
						}
					},
					_p53._1));
		}(
			A5(_panosoft$elm_grove$Component_Install$cloneAllPackagesTasks, config, elmJson, parentPackageName, model, dependencyRanges));
	});
var _panosoft$elm_grove$Component_Install$ElmJsonFileRead = F6(
	function (a, b, c, d, e, f) {
		return {ctor: 'ElmJsonFileRead', _0: a, _1: b, _2: c, _3: d, _4: e, _5: f};
	});
var _panosoft$elm_grove$Component_Install$install = F2(
	function (config, model) {
		return A2(
			_elm_lang$core$Platform_Cmd_ops['!'],
			_elm_lang$core$Native_Utils.update(
				model,
				{
					readingElmJson: A2(_elm_lang$core$Set$insert, '', model.readingElmJson)
				}),
			{
				ctor: '::',
				_0: A2(
					_elm_lang$core$Task$attempt,
					function (_p59) {
						return config.routeToMe(
							A6(_panosoft$elm_grove$Component_Install$ElmJsonFileRead, '', config.cwd, '', _panosoft$elm_grove$Component_Install$Initial, _elm_lang$core$Maybe$Nothing, _p59));
					},
					A2(_elm_node$core$Node_FileSystem$readFileAsString, _panosoft$elm_grove$Package$elmJsonFilename, _elm_node$core$Node_Encoding$Utf8)),
				_1: {ctor: '[]'}
			});
	});
var _panosoft$elm_grove$Component_Install$LinkedReposRead = F3(
	function (a, b, c) {
		return {ctor: 'LinkedReposRead', _0: a, _1: b, _2: c};
	});
var _panosoft$elm_grove$Component_Install$OfficialListRetrieved = F2(
	function (a, b) {
		return {ctor: 'OfficialListRetrieved', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Install$SkipOfficialListRetrieval = function (a) {
	return {ctor: 'SkipOfficialListRetrieval', _0: a};
};
var _panosoft$elm_grove$Component_Install$retrieveOfficialElmPackageList = F2(
	function (config, initializedMsg) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?'],
			_elm_lang$core$Native_Utils.eq(config.safeMode, _panosoft$elm_grove$Component_Config$SafeModeNone),
			{
				ctor: '_Tuple2',
				_0: _panosoft$elm_grove$AppUtils$msgToCmd(
					_panosoft$elm_grove$Component_Install$SkipOfficialListRetrieval(initializedMsg)),
				_1: A2(
					_elm_lang$core$Task$attempt,
					_panosoft$elm_grove$Component_Install$OfficialListRetrieved(initializedMsg),
					_elm_lang$http$Http$toTask(
						A2(_elm_lang$http$Http$get, _panosoft$elm_grove$Component_Install$officialElmPackagesUrl, _panosoft$elm_grove$Component_Install$decodeOfficialPackageList)))
			});
	});
var _panosoft$elm_grove$Component_Install$init = F3(
	function (config, initializedMsg, linkedReposFilename) {
		return {
			ctor: '_Tuple2',
			_0: {
				linkedRepos: _elm_lang$core$Dict$empty,
				elmJson: _elm_lang$core$Maybe$Nothing,
				readingElmJson: _elm_lang$core$Set$empty,
				cloning: _elm_lang$core$Set$empty,
				cloned: _elm_lang$core$Set$empty,
				preparingLink: _elm_lang$core$Set$empty,
				preparedLink: _elm_lang$core$Set$empty,
				checkingOut: _elm_lang$core$Set$empty,
				checkedOut: _elm_lang$core$Dict$empty,
				checkingNpm: _elm_lang$core$Set$empty,
				checkedNpm: _elm_lang$core$Set$empty,
				installed: _elm_lang$core$Dict$empty,
				npmPackages: _elm_lang$core$Set$empty,
				finalCheckoutCount: 0,
				rewriterModel: _panosoft$elm_grove$Component_Rewriter$initModel(
					A2(_panosoft$elm_grove$Component_Install$rewriterConfig, config, _elm_lang$core$Set$empty)),
				elmJsonIndent: _elm_lang$core$Maybe$Nothing,
				officialElmPackages: _elm_lang$core$Set$empty
			},
			_1: A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				config.linking,
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$Maybe$Just(
						A2(
							_elm_lang$core$Task$attempt,
							function (_p60) {
								return config.routeToMe(
									A3(_panosoft$elm_grove$Component_Install$LinkedReposRead, initializedMsg, linkedReposFilename, _p60));
							},
							A2(_elm_node$core$Node_FileSystem$readFileAsString, linkedReposFilename, _elm_node$core$Node_Encoding$Utf8))),
					_1: _elm_lang$core$Maybe$Just(
						A2(
							_elm_lang$core$Platform_Cmd$map,
							config.routeToMe,
							A2(_panosoft$elm_grove$Component_Install$retrieveOfficialElmPackageList, config, initializedMsg)))
				})
		};
	});
var _panosoft$elm_grove$Component_Install$OperationComplete = function (a) {
	return {ctor: 'OperationComplete', _0: a};
};
var _panosoft$elm_grove$Component_Install$checkoutPackage = F4(
	function (config, installState, range, model) {
		return function (_p61) {
			var _p62 = _p61;
			var _p68 = _p62._0;
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['|??->'],
				_p62._1,
				{
					ctor: '_Tuple2',
					_0: function (exitCode) {
						return function (cmd) {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								{
									ctor: '::',
									_0: cmd,
									_1: {ctor: '[]'}
								});
						}(
							A2(
								_elm_lang$core$Task$perform,
								function (_p63) {
									return _panosoft$elm_grove$Component_Install$OperationComplete(exitCode);
								},
								_elm_lang$core$Task$sequence(_p68)));
					},
					_1: function (_p64) {
						var _p65 = _p64;
						return function (cmd) {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_p65._0,
								{
									ctor: '::',
									_0: cmd,
									_1: {ctor: '[]'}
								});
						}(
							A2(
								_elm_lang$core$Task$attempt,
								_panosoft$elm_grove$Component_Install$CheckoutComplete,
								A2(
									_elm_lang$core$Task$andThen,
									function (_p66) {
										return A2(
											_panosoft$elm_utils$Utils_Ops_ops['?='],
											_p65._1,
											_elm_lang$core$Task$succeed(installState));
									},
									A2(
										_elm_lang$core$Task$mapError,
										function (_p67) {
											return {ctor: '_Tuple2', _0: installState, _1: 'Should never happen'};
										},
										_elm_lang$core$Task$sequence(_p68)))));
					}
				});
		}(
			A4(_panosoft$elm_grove$Component_Install$checkoutPackageTask, config, installState, range, model));
	});
var _panosoft$elm_grove$Component_Install$operationError = F2(
	function (model, task) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Task$perform,
						function (_p69) {
							return _panosoft$elm_grove$Component_Install$OperationComplete(-1);
						},
						task),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	});
var _panosoft$elm_grove$Component_Install$operationSuccessful = F2(
	function (model, task) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Task$perform,
						function (_p70) {
							return _panosoft$elm_grove$Component_Install$OperationComplete(0);
						},
						task),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	});
var _panosoft$elm_grove$Component_Install$installIfTime = F2(
	function (config, model) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?'],
			_panosoft$elm_grove$Component_Install$timeToInstall(model),
			{
				ctor: '_Tuple2',
				_0: A2(
					_panosoft$elm_utils$Utils_Ops_ops['?'],
					config.dryRun,
					{
						ctor: '_Tuple2',
						_0: A2(
							_panosoft$elm_grove$Component_Install$operationSuccessful,
							model,
							_panosoft$elm_grove$Console$log('\n\n***** Ending prematurely due to --dry-run *****\n')),
						_1: A2(_panosoft$elm_grove$Component_Install$installOrLink, config, model)
					}),
				_1: {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				}
			});
	});
var _panosoft$elm_grove$Component_Install$processElmJson = F6(
	function (config, model, packageName, parentPath, readOccurence, elmJson) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['|?->'],
			_panosoft$elm_grove$Version$rangeFromString(elmJson.elmVersion),
			{
				ctor: '_Tuple2',
				_0: A2(
					_panosoft$elm_grove$Component_Install$operationError,
					model,
					_panosoft$elm_grove$Output$errorLog(
						A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Invalid elmVersion:', elmJson.elmVersion))),
				_1: function (elmVersionRange) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?'],
						!A2(
							_panosoft$elm_grove$Version$inRange,
							elmVersionRange,
							A3(_panosoft$elm_grove$Version$Version, 0, config.elmVersion, 0)),
						{
							ctor: '_Tuple2',
							_0: A2(
								_panosoft$elm_grove$Component_Install$operationError,
								model,
								_panosoft$elm_grove$Output$errorLog(
									A2(
										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
										A2(
											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
											A2(
												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
												A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Supported Elm version is:', config.elmVersion),
												'which is incompatible with package:'),
											A2(
												_panosoft$elm_utils$Utils_Ops_ops['?'],
												_elm_lang$core$Native_Utils.eq(packageName, ''),
												{ctor: '_Tuple2', _0: '<your program>', _1: packageName})),
										_panosoft$elm_grove$Output$parens(elmJson.elmVersion)))),
							_1: function (elmJson) {
								return function (model) {
									return A2(
										_panosoft$elm_utils$Utils_Ops_ops['?'],
										_elm_lang$core$Native_Utils.eq(
											A2(
												_elm_lang$core$Basics_ops['++'],
												_elm_lang$core$String$toLower(packageName),
												'.git'),
											_elm_lang$core$String$toLower(elmJson.repository)) || _elm_lang$core$Native_Utils.eq(packageName, ''),
										{
											ctor: '_Tuple2',
											_0: A2(
												_panosoft$elm_utils$Utils_Ops_ops['|?->'],
												A2(_panosoft$elm_grove$Dependency$addToPath, parentPath, elmJson.repository),
												{
													ctor: '_Tuple2',
													_0: A2(
														_panosoft$elm_grove$Component_Install$operationError,
														model,
														_panosoft$elm_grove$Output$errorLog(
															A2(
																_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																A2(
																	_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																	A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Circular dependency encountered with package:', elmJson.repository),
																	'parental dependecies:'),
																parentPath))),
													_1: function (path) {
														return function (_p71) {
															var _p72 = _p71;
															return function (_p73) {
																var _p74 = _p73;
																return {
																	ctor: '_Tuple2',
																	_0: A2(
																		_elm_lang$core$Platform_Cmd_ops['!'],
																		_p74._0._0,
																		{
																			ctor: '::',
																			_0: _p74._0._1,
																			_1: {
																				ctor: '::',
																				_0: _p72._1,
																				_1: {ctor: '[]'}
																			}
																		}),
																	_1: _p74._1
																};
															}(
																A2(_panosoft$elm_grove$Component_Install$installIfTime, config, _p72._0));
														}(
															function (dependencyRangesResults) {
																return function (errorTasks) {
																	return A2(
																		_panosoft$elm_utils$Utils_Ops_ops['?'],
																		!_elm_lang$core$Native_Utils.eq(
																			errorTasks,
																			{ctor: '[]'}),
																		{
																			ctor: '_Tuple2',
																			_0: A2(
																				_elm_lang$core$Platform_Cmd_ops['!'],
																				model,
																				{
																					ctor: '::',
																					_0: A2(
																						_elm_lang$core$Task$perform,
																						function (_p75) {
																							return _panosoft$elm_grove$Component_Install$OperationComplete(-1);
																						},
																						_elm_lang$core$Task$sequence(errorTasks)),
																					_1: {ctor: '[]'}
																				}),
																			_1: function (dependencyRanges) {
																				return A5(_panosoft$elm_grove$Component_Install$cloneAllPackages, config, elmJson, elmJson.repository, model, dependencyRanges);
																			}(
																				A2(
																					_elm_lang$core$List$filterMap,
																					function (_p76) {
																						var _p77 = _p76;
																						return A2(
																							_panosoft$elm_utils$Utils_Ops_ops['|??->'],
																							_p77._1,
																							{
																								ctor: '_Tuple2',
																								_0: _elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
																								_1: function (maybeRange) {
																									return _elm_lang$core$Maybe$Just(
																										{ctor: '_Tuple2', _0: _p77._0, _1: maybeRange});
																								}
																							});
																					},
																					dependencyRangesResults))
																		});
																}(
																	A2(
																		_elm_lang$core$List$filterMap,
																		function (_p78) {
																			var _p79 = _p78;
																			return A2(
																				_panosoft$elm_utils$Utils_Ops_ops['|??->'],
																				_p79._1,
																				{
																					ctor: '_Tuple2',
																					_0: _elm_lang$core$Maybe$Just,
																					_1: _elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing)
																				});
																		},
																		dependencyRangesResults));
															}(
																A2(
																	_elm_lang$core$List$map,
																	function (_p80) {
																		var _p81 = _p80;
																		var _p83 = _p81._0;
																		return {
																			ctor: '_Tuple2',
																			_0: {packageName: _p83, dependencyPath: path},
																			_1: A2(
																				_panosoft$elm_utils$Utils_Ops_ops['|?->'],
																				_p81._1,
																				{
																					ctor: '_Tuple2',
																					_0: _elm_lang$core$Result$Ok(_elm_lang$core$Maybe$Nothing),
																					_1: function (rangeStr) {
																						return A2(
																							_panosoft$elm_utils$Utils_Ops_ops['|?->'],
																							_panosoft$elm_grove$Version$rangeFromString(rangeStr),
																							{
																								ctor: '_Tuple2',
																								_0: _elm_lang$core$Result$Err(
																									_panosoft$elm_grove$Output$errorLog(
																										A2(
																											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																											A2(
																												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																												A2(
																													_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																													A2(
																														_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																														A2(
																															_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																															A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Invalid version range:', rangeStr),
																															'for package:'),
																														_p83),
																													'in'),
																												_panosoft$elm_grove$Package$elmJsonFilename),
																											A2(
																												_panosoft$elm_utils$Utils_Ops_ops['?'],
																												_elm_lang$core$Native_Utils.eq(parentPath, ''),
																												{
																													ctor: '_Tuple2',
																													_0: '',
																													_1: _panosoft$elm_grove$Output$parens(parentPath)
																												})))),
																								_1: function (_p82) {
																									return _elm_lang$core$Result$Ok(
																										_elm_lang$core$Maybe$Just(_p82));
																								}
																							});
																					}
																				})
																		};
																	},
																	_elm_lang$core$Dict$toList(elmJson.dependencies))));
													}
												}),
											_1: A2(
												_panosoft$elm_grove$Component_Install$operationError,
												model,
												_panosoft$elm_grove$Output$errorLog(
													A2(
														_panosoft$elm_string_utils$StringUtils_ops['+-+'],
														A2(
															_panosoft$elm_string_utils$StringUtils_ops['+-+'],
															A2(
																_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																A2(
																	_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																	A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Package name mismatch in', _panosoft$elm_grove$Package$elmJsonFilename),
																	'in repository field for package:'),
																packageName),
															'has value of:'),
														elmJson.repository)))
										});
								}(
									A2(
										_panosoft$elm_utils$Utils_Ops_ops['?'],
										_elm_lang$core$Native_Utils.eq(readOccurence, _panosoft$elm_grove$Component_Install$Initial),
										{
											ctor: '_Tuple2',
											_0: _elm_lang$core$Native_Utils.update(
												model,
												{
													elmJson: _elm_lang$core$Maybe$Just(elmJson)
												}),
											_1: model
										}));
							}(
								function (_p84) {
									var _p85 = _p84;
									return _elm_lang$core$Native_Utils.update(
										elmJson,
										{
											dependencySources: _p85._0,
											dependencies: A2(_elm_lang$core$Dict$union, _p85._1, elmJson.dependencies)
										});
								}(
									{
										ctor: '_Tuple2',
										_0: function (sources) {
											return A2(
												_panosoft$elm_utils$Utils_Ops_ops['?'],
												_elm_lang$core$Native_Utils.eq(sources, _elm_lang$core$Dict$empty),
												{
													ctor: '_Tuple2',
													_0: _elm_lang$core$Maybe$Nothing,
													_1: _elm_lang$core$Maybe$Just(sources)
												});
										}(
											A2(
												_elm_lang$core$Dict$filter,
												function (_p86) {
													return function (_p87) {
														return !A2(_elm_lang$core$String$contains, 'github.com', _p87);
													};
												},
												A2(
													_elm_lang$core$Dict$union,
													config.sources,
													A2(_panosoft$elm_utils$Utils_Ops_ops['?='], elmJson.dependencySources, _elm_lang$core$Dict$empty)))),
										_1: _elm_lang$core$Dict$fromList(
											A2(
												_elm_lang$core$List$map,
												A2(
													_elm_lang$core$Basics$flip,
													F2(
														function (v0, v1) {
															return {ctor: '_Tuple2', _0: v0, _1: v1};
														}),
													_elm_lang$core$Maybe$Nothing),
												A2(
													_panosoft$elm_utils$Utils_Ops_ops['?'],
													_elm_lang$core$Native_Utils.eq(readOccurence, _panosoft$elm_grove$Component_Install$Initial),
													{
														ctor: '_Tuple2',
														_0: A2(
															_panosoft$elm_utils$Utils_Ops_ops['?='],
															config.packages,
															{ctor: '[]'}),
														_1: {ctor: '[]'}
													})))
									}))
						});
				}
			});
	});
var _panosoft$elm_grove$Component_Install$OutputComplete = function (a) {
	return {ctor: 'OutputComplete', _0: a};
};
var _panosoft$elm_grove$Component_Install$update = F3(
	function (config, msg, model) {
		var updateRewriter = A5(
			_panosoft$elm_parent_child_update$ParentChildUpdate$updateChildParent,
			_panosoft$elm_grove$Component_Rewriter$update(
				A2(
					_panosoft$elm_grove$Component_Install$rewriterConfig,
					config,
					_elm_lang$core$Set$fromList(
						_elm_lang$core$Dict$keys(model.linkedRepos)))),
			_panosoft$elm_grove$Component_Install$update(config),
			function (_) {
				return _.rewriterModel;
			},
			_panosoft$elm_grove$Component_Install$RewriterMsg,
			F2(
				function (model, rewriterModel) {
					return _elm_lang$core$Native_Utils.update(
						model,
						{rewriterModel: rewriterModel});
				}));
		var isPackageBeingAdded = F2(
			function (config, installState) {
				return A3(
					_elm_lang$core$Basics$flip,
					_elm_lang$core$List$member,
					A2(
						_panosoft$elm_utils$Utils_Ops_ops['?='],
						config.packages,
						{ctor: '[]'}),
					installState.dependsOn.packageName);
			});
		var cloneComplete = F2(
			function (model, installState) {
				return _elm_lang$core$Native_Utils.update(
					model,
					{
						cloning: A2(_elm_lang$core$Set$remove, installState.dependsOn.packageName, model.cloning),
						cloned: A2(_elm_lang$core$Set$insert, installState.dependsOn.packageName, model.cloned)
					});
			});
		var _p88 = msg;
		switch (_p88.ctor) {
			case 'OutputComplete':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				};
			case 'OperationComplete':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: config.operationComplete(_p88._0),
						_1: {ctor: '[]'}
					}
				};
			case 'OfficialListRetrieved':
				if (_p88._1.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Install$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to retrieve Official Elm Packages from:', _panosoft$elm_grove$Component_Install$officialElmPackagesUrl),
									'Error:'),
								_p88._1._0)));
				} else {
					return {
						ctor: '_Tuple2',
						_0: A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									officialElmPackages: _elm_lang$core$Set$fromList(_p88._1._0)
								}),
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: _p88._0,
							_1: {ctor: '[]'}
						}
					};
				}
			case 'SkipOfficialListRetrieval':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: _p88._0,
						_1: {ctor: '[]'}
					}
				};
			case 'LinkedReposRead':
				var _p94 = _p88._1;
				return function (_p89) {
					var _p90 = _p89;
					var _p92 = _p90._0;
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['??='],
						A2(
							_panosoft$elm_utils$Utils_Ops_ops['|??>'],
							_p88._2,
							function (contents) {
								return A2(
									_panosoft$elm_utils$Utils_Ops_ops['??='],
									A2(
										_panosoft$elm_utils$Utils_Ops_ops['|??>'],
										A2(
											_elm_lang$core$Json_Decode$decodeString,
											_elm_lang$core$Json_Decode$dict(_elm_lang$core$Json_Decode$string),
											contents),
										function (repoLocation) {
											return {
												ctor: '_Tuple2',
												_0: A2(
													_elm_lang$core$Platform_Cmd_ops['!'],
													_elm_lang$core$Native_Utils.update(
														model,
														{
															linkedRepos: _p90._1(repoLocation)
														}),
													{
														ctor: '::',
														_0: A2(_panosoft$elm_grove$Component_Install$retrieveOfficialElmPackageList, config, _p88._0),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											};
										}),
									_p92(
										A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to decode JSON', _p94)));
							}),
						function (_p91) {
							return A2(
								_p92,
								A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to read', _p94),
								_elm_node$core$Node_Error$message(_p91));
						});
				}(
					{
						ctor: '_Tuple2',
						_0: F2(
							function (msg, error) {
								return A2(
									_panosoft$elm_grove$Component_Install$operationError,
									model,
									_panosoft$elm_grove$Output$errorLog(
										A2(
											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
											A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], msg, 'Error:'),
											error)));
							}),
						_1: function (linkedRepos) {
							return A2(
								_elm_lang$core$Dict$map,
								F2(
									function (_p93, repoLocation) {
										return A3(
											_panosoft$elm_grove$Component_Install$LinkedRepo,
											A4(
												_elm_lang$core$Regex$replace,
												_elm_lang$core$Regex$All,
												_elm_lang$core$Regex$regex('(\\{.+?\\})'),
												function (match) {
													return A2(
														_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
														_elm_lang$core$List$head(match.submatches),
														{
															ctor: '_Tuple2',
															_0: _panosoft$elm_grove$AppUtils$bug('no submatches - bad regex?'),
															_1: function (submatch) {
																return A2(
																	_panosoft$elm_utils$Utils_Ops_ops['?='],
																	A2(
																		_panosoft$elm_utils$Utils_Ops_ops['|?>'],
																		submatch,
																		function (envVar) {
																			return function (envVar) {
																				return A2(
																					_panosoft$elm_utils$Utils_Ops_ops['?='],
																					A2(_elm_lang$core$Dict$get, envVar, _panosoft$elm_grove$Env$env),
																					'');
																			}(
																				A3(
																					_elm_lang$core$String$slice,
																					1,
																					_elm_lang$core$String$length(envVar) - 1,
																					envVar));
																		}),
																	repoLocation);
															}
														});
												},
												repoLocation),
											_elm_lang$core$Maybe$Nothing,
											_elm_lang$core$Maybe$Nothing);
									}),
								linkedRepos);
						}
					});
			case 'LinkPrepareComplete':
				if (_p88._1.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Install$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to link to:', _p88._1._0._0.packageName),
									'Error:'),
								_p88._1._0._1)));
				} else {
					var _p107 = _p88._0;
					var _p106 = _p88._1._0;
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['|?!**>'],
						{ctor: '_Tuple2', _0: _p106.maybeElmJsonStr, _1: _p106.maybeRepoLocation},
						{
							ctor: '_Tuple3',
							_0: _panosoft$elm_grove$AppUtils$bugMissing('elmJson'),
							_1: _panosoft$elm_grove$AppUtils$bugMissing('repoLocation'),
							_2: function (_p95) {
								var _p96 = _p95;
								var _p105 = _p96._1;
								return A2(
									_panosoft$elm_utils$Utils_Ops_ops['|??->'],
									A2(
										_panosoft$elm_grove$ElmJson$decodeElmJson,
										A2(
											_elm_lang$core$String$join,
											config.pathSep,
											{
												ctor: '::',
												_0: _p105,
												_1: {
													ctor: '::',
													_0: _panosoft$elm_grove$Package$elmJsonFilename,
													_1: {ctor: '[]'}
												}
											}),
										_p96._0),
									{
										ctor: '_Tuple2',
										_0: function (_p97) {
											return A2(
												_panosoft$elm_grove$Component_Install$operationError,
												model,
												_panosoft$elm_grove$Output$errorLog(_p97));
										},
										_1: function (elmJson) {
											return A2(
												_panosoft$elm_utils$Utils_Ops_ops['|??->'],
												function (installState) {
													return A2(
														_panosoft$elm_utils$Utils_Ops_ops['|?->'],
														_panosoft$elm_grove$Version$versionFromString(elmJson.version),
														{
															ctor: '_Tuple2',
															_0: _elm_lang$core$Result$Err(
																_panosoft$elm_grove$Output$errorLog(
																	A2(
																		_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																		A2(
																			_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																			A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Package:', installState.dependsOn.packageName),
																			'has invalid version:'),
																		elmJson.version))),
															_1: function (version) {
																return _elm_lang$core$Result$Ok(
																	{
																		ctor: '_Tuple3',
																		_0: _elm_lang$core$Native_Utils.update(
																			installState,
																			{
																				maybeVersionStr: _elm_lang$core$Maybe$Just(elmJson.version)
																			}),
																		_1: version,
																		_2: function (rangeStr) {
																			return A2(
																				_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
																				model.elmJson,
																				{
																					ctor: '_Tuple2',
																					_0: _panosoft$elm_grove$AppUtils$bugMissing('elmJson'),
																					_1: function (elmJson) {
																						return function (elmJson) {
																							return _elm_lang$core$Native_Utils.update(
																								model,
																								{
																									elmJson: _elm_lang$core$Maybe$Just(elmJson)
																								});
																						}(
																							_elm_lang$core$Native_Utils.update(
																								elmJson,
																								{
																									dependencies: A2(
																										_panosoft$elm_utils$Utils_Ops_ops['?'],
																										A2(isPackageBeingAdded, config, installState),
																										{
																											ctor: '_Tuple2',
																											_0: A3(
																												_elm_lang$core$Dict$insert,
																												installState.dependsOn.packageName,
																												_elm_lang$core$Maybe$Just(rangeStr),
																												elmJson.dependencies),
																											_1: elmJson.dependencies
																										})
																								}));
																					}
																				});
																		}(
																			_panosoft$elm_grove$Version$toRangeToNextMajorVersion(version))
																	});
															}
														});
												}(
													_elm_lang$core$Native_Utils.update(
														_p106,
														{
															maybeElmJson: _elm_lang$core$Maybe$Just(elmJson)
														})),
												{
													ctor: '_Tuple2',
													_0: _panosoft$elm_grove$Component_Install$operationError(model),
													_1: function (_p98) {
														var _p99 = _p98;
														var _p104 = _p99._1;
														var _p103 = _p99._2;
														var _p102 = _p99._0;
														return A2(
															_panosoft$elm_utils$Utils_Ops_ops['?'],
															A2(
																_panosoft$elm_utils$Utils_Ops_ops['|?->'],
																_p107,
																{
																	ctor: '_Tuple2',
																	_0: true,
																	_1: function (range) {
																		return A2(_panosoft$elm_grove$Version$inRange, range, _p104);
																	}
																}),
															{
																ctor: '_Tuple2',
																_0: A2(
																	_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
																	A2(_elm_lang$core$Dict$get, _p102.dependsOn.packageName, _p103.linkedRepos),
																	{
																		ctor: '_Tuple2',
																		_0: _panosoft$elm_grove$AppUtils$bugMissing('linkedRepo'),
																		_1: function (linkedRepo) {
																			return function (packageName) {
																				return function (pathJoin) {
																					return function (_p100) {
																						var _p101 = _p100;
																						return {
																							ctor: '_Tuple2',
																							_0: A2(
																								_elm_lang$core$Platform_Cmd_ops['!'],
																								_p101._0._0,
																								{
																									ctor: '::',
																									_0: _p101._0._1,
																									_1: {
																										ctor: '::',
																										_0: A2(
																											_elm_lang$core$Task$attempt,
																											A5(
																												_panosoft$elm_grove$Component_Install$ElmJsonFileRead,
																												_p102.dependsOn.packageName,
																												pathJoin(_panosoft$elm_grove$Package$elmJsonFilename),
																												_p102.dependsOn.dependencyPath,
																												_panosoft$elm_grove$Component_Install$Subsequent,
																												_elm_lang$core$Maybe$Just(
																													{
																														ctor: '_Tuple2',
																														_0: _p102,
																														_1: pathJoin(_panosoft$elm_grove$Package$npmJsonFilename)
																													})),
																											A2(
																												_elm_node$core$Node_FileSystem$readFileAsString,
																												pathJoin(_panosoft$elm_grove$Package$elmJsonFilename),
																												_elm_node$core$Node_Encoding$Utf8)),
																										_1: {ctor: '[]'}
																									}
																								}),
																							_1: _p101._1
																						};
																					}(
																						A6(
																							_panosoft$elm_grove$Component_Install$processElmJson,
																							config,
																							_elm_lang$core$Native_Utils.update(
																								_p103,
																								{
																									preparingLink: A2(_elm_lang$core$Set$remove, packageName, _p103.preparingLink),
																									preparedLink: A2(_elm_lang$core$Set$insert, packageName, _p103.preparedLink),
																									linkedRepos: A3(
																										_elm_lang$core$Dict$insert,
																										packageName,
																										_elm_lang$core$Native_Utils.update(
																											linkedRepo,
																											{
																												maybeInstallState: _elm_lang$core$Maybe$Just(_p102),
																												maybeVersion: _elm_lang$core$Maybe$Just(_p104)
																											}),
																										_p103.linkedRepos)
																								}),
																							packageName,
																							_p102.dependsOn.dependencyPath,
																							_panosoft$elm_grove$Component_Install$Subsequent,
																							elmJson));
																				}(
																					function (filename) {
																						return A2(
																							_panosoft$elm_grove$Component_Install$pathJoin,
																							config,
																							{
																								ctor: '::',
																								_0: _p105,
																								_1: {
																									ctor: '::',
																									_0: filename,
																									_1: {ctor: '[]'}
																								}
																							});
																					});
																			}(_p102.dependsOn.packageName);
																		}
																	}),
																_1: function (versionMessage) {
																	return A2(
																		_panosoft$elm_grove$Component_Install$operationError,
																		_p103,
																		_panosoft$elm_grove$Output$errorLog(
																			A2(
																				_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																				A2(
																					_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																					A2(
																						_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																						A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Cannot link to:', _p102.dependsOn.packageName),
																						versionMessage),
																					'as required by:'),
																				_p102.dependsOn.dependencyPath)));
																}(
																	A2(
																		_panosoft$elm_utils$Utils_Ops_ops['|?->'],
																		_p107,
																		{
																			ctor: '_Tuple2',
																			_0: '',
																			_1: function (range) {
																				return A2(
																					_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																					A2(
																						_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																						A2(
																							_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																							'since it\'s version:',
																							_panosoft$elm_grove$Version$versionToString(_p104)),
																						'is not within range:'),
																					_panosoft$elm_grove$Version$rangeToString(range));
																			}
																		}))
															});
													}
												});
										}
									});
							}
						});
				}
			case 'CloneComplete':
				if (_p88._1.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Install$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to clone:', _p88._1._0._0.packageName),
									'Error:'),
								_p88._1._0._1)));
				} else {
					var _p115 = _p88._1._0;
					return function (_p108) {
						var _p109 = _p108;
						var _p112 = _p109._0;
						return A2(
							_panosoft$elm_utils$Utils_Ops_ops['?='],
							A2(
								_panosoft$elm_utils$Utils_Ops_ops['|?>'],
								_p109._2,
								function (exitCode) {
									return {
										ctor: '_Tuple2',
										_0: A2(
											_elm_lang$core$Platform_Cmd_ops['!'],
											_p112,
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: config.operationComplete(exitCode),
											_1: {ctor: '[]'}
										}
									};
								}),
							function (_p110) {
								var _p111 = _p110;
								return {
									ctor: '_Tuple2',
									_0: A2(
										_elm_lang$core$Platform_Cmd_ops['!'],
										_p111._0,
										{
											ctor: '::',
											_0: _p111._1,
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								};
							}(
								A4(
									_panosoft$elm_grove$Component_Install$checkoutPackage,
									config,
									_p115,
									A2(
										_panosoft$elm_utils$Utils_Ops_ops['?!='],
										_panosoft$elm_grove$Version$rangeFromString(_p109._1),
										_panosoft$elm_grove$AppUtils$bug('bad range string')),
									A2(cloneComplete, _p112, _p115))));
					}(
						A2(
							_panosoft$elm_utils$Utils_Ops_ops['?!'],
							A2(isPackageBeingAdded, config, _p115),
							{
								ctor: '_Tuple2',
								_0: function (_p113) {
									return function (repoDetails) {
										return A2(
											_panosoft$elm_utils$Utils_Ops_ops['?='],
											A2(
												_panosoft$elm_utils$Utils_Ops_ops['|?>'],
												_elm_lang$core$List$head(
													_panosoft$elm_grove$AppUtils$sortedVersions(repoDetails.tags)),
												function (currentVersion) {
													return function (rangeStr) {
														return A2(
															_panosoft$elm_utils$Utils_Ops_ops['?!='],
															A2(
																_panosoft$elm_utils$Utils_Ops_ops['|?>'],
																model.elmJson,
																function (elmJson) {
																	return function (elmJson) {
																		return {
																			ctor: '_Tuple3',
																			_0: _elm_lang$core$Native_Utils.update(
																				model,
																				{
																					elmJson: _elm_lang$core$Maybe$Just(elmJson)
																				}),
																			_1: rangeStr,
																			_2: _elm_lang$core$Maybe$Nothing
																		};
																	}(
																		_elm_lang$core$Native_Utils.update(
																			elmJson,
																			{
																				dependencies: A3(
																					_elm_lang$core$Dict$insert,
																					_p115.dependsOn.packageName,
																					_elm_lang$core$Maybe$Just(rangeStr),
																					elmJson.dependencies)
																			}));
																}),
															_panosoft$elm_grove$AppUtils$bugMissing('elmJson'));
													}(
														_panosoft$elm_grove$Version$toRangeToNextMajorVersion(currentVersion));
												}),
											{
												ctor: '_Tuple3',
												_0: model,
												_1: '',
												_2: _elm_lang$core$Maybe$Just(-1)
											});
									}(
										_panosoft$elm_grove$Component_Install$getRepoDetails(_p115));
								},
								_1: function (_p114) {
									return {
										ctor: '_Tuple3',
										_0: model,
										_1: _panosoft$elm_grove$Version$rangeToString(
											A2(
												_panosoft$elm_utils$Utils_Ops_ops['?!='],
												_p88._0,
												_panosoft$elm_grove$AppUtils$bug(
													A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'missing range for:', _p115)))),
										_2: _elm_lang$core$Maybe$Nothing
									};
								}
							}));
				}
			case 'CheckoutComplete':
				if (_p88._0.ctor === 'Err') {
					var _p116 = _p88._0._0._0;
					return function (repoDetails) {
						return A2(
							_panosoft$elm_utils$Utils_Ops_ops['?!='],
							A2(
								_panosoft$elm_utils$Utils_Ops_ops['|?>'],
								_p116.maybeVersionStr,
								function (versionStr) {
									return A2(
										_panosoft$elm_grove$Component_Install$operationError,
										model,
										_panosoft$elm_grove$Output$errorLog(
											A2(
												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
												A2(
													_panosoft$elm_string_utils$StringUtils_ops['+-+'],
													A2(
														_panosoft$elm_string_utils$StringUtils_ops['+-+'],
														A2(
															_panosoft$elm_string_utils$StringUtils_ops['+-+'],
															A2(
																_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																A2(
																	_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																	A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to checkout:', versionStr),
																	'for package:'),
																_p116.dependsOn.packageName),
															'in repo:'),
														repoDetails.repo.url),
													'Error:'),
												_p88._0._0._1)));
								}),
							_panosoft$elm_grove$AppUtils$bug('versionStr missing from installState'));
					}(
						_panosoft$elm_grove$Component_Install$getRepoDetails(_p116));
				} else {
					var _p120 = _p88._0._0;
					return function (_p117) {
						var _p118 = _p117;
						var _p119 = _p118._1;
						return function (model) {
							return {
								ctor: '_Tuple2',
								_0: function (pathJoin) {
									return A2(
										_panosoft$elm_utils$Utils_Ops_ops['?'],
										_elm_lang$core$Native_Utils.eq(_p120.dependsOn.packageName, _panosoft$elm_grove$Package$elmCorePackageName),
										{
											ctor: '_Tuple2',
											_0: A2(
												_elm_lang$core$Platform_Cmd_ops['!'],
												model,
												{
													ctor: '::',
													_0: _panosoft$elm_grove$AppUtils$msgToCmd(
														A2(
															_panosoft$elm_grove$Component_Install$DependentNpmPackageRead,
															_p120,
															_elm_lang$core$Result$Err(
																A2(_elm_node$core$Node_Error$Error, '', '')))),
													_1: {ctor: '[]'}
												}),
											_1: A2(
												_elm_lang$core$Platform_Cmd_ops['!'],
												_elm_lang$core$Native_Utils.update(
													model,
													{
														readingElmJson: A2(_elm_lang$core$Set$insert, _p119, model.readingElmJson),
														checkingNpm: A2(_elm_lang$core$Set$insert, _p119, model.checkingNpm)
													}),
												{
													ctor: '::',
													_0: A2(
														_elm_lang$core$Task$attempt,
														A5(
															_panosoft$elm_grove$Component_Install$ElmJsonFileRead,
															_p120.dependsOn.packageName,
															pathJoin(_panosoft$elm_grove$Package$elmJsonFilename),
															_p120.dependsOn.dependencyPath,
															_panosoft$elm_grove$Component_Install$Subsequent,
															_elm_lang$core$Maybe$Just(
																{
																	ctor: '_Tuple2',
																	_0: _p120,
																	_1: pathJoin(_panosoft$elm_grove$Package$npmJsonFilename)
																})),
														A2(
															_elm_node$core$Node_FileSystem$readFileAsString,
															pathJoin(_panosoft$elm_grove$Package$elmJsonFilename),
															_elm_node$core$Node_Encoding$Utf8)),
													_1: {ctor: '[]'}
												})
										});
								}(
									function (filename) {
										return A2(
											_panosoft$elm_grove$Component_Install$pathJoin,
											config,
											{
												ctor: '::',
												_0: _p118._0.repo.cloneLocation,
												_1: {
													ctor: '::',
													_0: filename,
													_1: {ctor: '[]'}
												}
											});
									}),
								_1: {ctor: '[]'}
							};
						}(
							_elm_lang$core$Native_Utils.update(
								model,
								{
									checkingOut: A2(_elm_lang$core$Set$remove, _p119, model.checkingOut)
								}));
					}(
						{
							ctor: '_Tuple2',
							_0: _panosoft$elm_grove$Component_Install$getRepoDetails(_p120),
							_1: _p120.dependsOn.packageName
						});
				}
			case 'DependentNpmPackageRead':
				var _p123 = _p88._0;
				return function (checkComplete) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['??='],
						A2(
							_panosoft$elm_utils$Utils_Ops_ops['|??>'],
							_p88._1,
							function (npmJsonStr) {
								return A2(
									_panosoft$elm_utils$Utils_Ops_ops['?'],
									_panosoft$elm_grove$NpmJson$hasDependencies(npmJsonStr),
									{
										ctor: '_Tuple2',
										_0: A2(
											_panosoft$elm_utils$Utils_Ops_ops['??='],
											A2(
												_panosoft$elm_utils$Utils_Ops_ops['|??>'],
												A3(
													_panosoft$elm_grove$NpmJson$validateNpmJson,
													npmJsonStr,
													A2(
														_panosoft$elm_utils$Utils_Ops_ops['?!='],
														_p123.maybeVersionStr,
														_panosoft$elm_grove$AppUtils$bugMissing('checked out version')),
													A2(
														_panosoft$elm_utils$Utils_Ops_ops['?!='],
														_p123.maybeElmJson,
														_panosoft$elm_grove$AppUtils$bugMissing('elmJson')).repository),
												function (_p121) {
													return A3(
														checkComplete,
														_p123,
														model,
														_panosoft$elm_grove$Dependency$isDirectDependency(_p123.dependsOn.dependencyPath));
												}),
											function (errors) {
												return A2(
													_panosoft$elm_grove$Component_Install$operationError,
													model,
													_panosoft$elm_grove$Output$errorLog(
														A2(
															_elm_lang$core$Basics_ops['++'],
															A2(
																_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Package', _p123.dependsOn.packageName),
																'has the following errors:\n\t'),
															A2(_elm_lang$core$String$join, '\n\t', errors))));
											}),
										_1: A3(checkComplete, _p123, model, false)
									});
							}),
						function (_p122) {
							return A3(checkComplete, _p123, model, false);
						});
				}(
					F3(
						function (installState, model, includeNpm) {
							return function (packageName) {
								return function (model) {
									return A2(_panosoft$elm_grove$Component_Install$installIfTime, config, model);
								}(
									_elm_lang$core$Native_Utils.update(
										model,
										{
											checkingNpm: A2(_elm_lang$core$Set$remove, packageName, model.checkingNpm),
											checkedNpm: A2(_elm_lang$core$Set$insert, packageName, model.checkedNpm),
											npmPackages: A2(
												_panosoft$elm_utils$Utils_Ops_ops['?'],
												includeNpm,
												{
													ctor: '_Tuple2',
													_0: _elm_lang$core$Set$insert(packageName),
													_1: _elm_lang$core$Basics$identity
												})(model.npmPackages)
										}));
							}(installState.dependsOn.packageName);
						}));
			case 'InstallOrLinkComplete':
				if (_p88._3.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Install$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(
										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
										A2(
											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
											A2(
												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
												A2(
													_panosoft$elm_string_utils$StringUtils_ops['+-+'],
													A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to install:', 'package:'),
													_p88._0),
												_panosoft$elm_grove$Output$parens(_p88._1)),
											'in repo:'),
										_p88._2),
									'Error:'),
								_p88._3._0)));
				} else {
					var _p135 = _p88._2;
					var _p134 = _p88._0;
					return function (getGitPrefix) {
						return function (_p124) {
							var _p125 = _p124;
							var _p127 = _p125._1;
							return function (cmds) {
								return {
									ctor: '_Tuple2',
									_0: A2(_elm_lang$core$Platform_Cmd_ops['!'], _p127, cmds),
									_1: {ctor: '[]'}
								};
							}(
								A2(
									_panosoft$elm_utils$Utils_Ops_ops['?'],
									_elm_lang$core$Native_Utils.cmp(_p127.finalCheckoutCount, 0) < 1,
									{
										ctor: '_Tuple2',
										_0: {
											ctor: '::',
											_0: A2(
												_elm_lang$core$Task$attempt,
												_panosoft$elm_grove$Component_Install$FinalElmFilesWritten,
												A2(
													_elm_lang$core$Task$andThen,
													function (_p126) {
														return A2(
															_panosoft$elm_utils$Utils_Ops_ops['?='],
															A2(
																_panosoft$elm_utils$Utils_Ops_ops['|?>'],
																_p127.elmJson,
																function (elmJson) {
																	return A2(
																		_panosoft$elm_grove$AppUtils$writeFile,
																		A2(
																			_panosoft$elm_grove$Component_Install$pathJoin,
																			config,
																			{
																				ctor: '::',
																				_0: config.cwd,
																				_1: {
																					ctor: '::',
																					_0: A2(
																						_panosoft$elm_utils$Utils_Ops_ops['?'],
																						config.testing,
																						{ctor: '_Tuple2', _0: 'test', _1: ''}),
																					_1: {
																						ctor: '::',
																						_0: _panosoft$elm_grove$Package$elmJsonFilename,
																						_1: {ctor: '[]'}
																					}
																				}
																			}),
																		A2(
																			_elm_lang$core$Json_Encode$encode,
																			A2(
																				_panosoft$elm_utils$Utils_Ops_ops['?!='],
																				_p127.elmJsonIndent,
																				_panosoft$elm_grove$AppUtils$bugMissing('elmJsonIndent')),
																			_panosoft$elm_grove$ElmJson$elmJsonEncoder(elmJson)));
																}),
															_elm_lang$core$Task$succeed(
																{ctor: '_Tuple0'}));
													},
													A2(
														_panosoft$elm_grove$AppUtils$writeFile,
														_panosoft$elm_grove$Component_Install$exactDependenciesLocation(config),
														_p125._0(_p127)))),
											_1: {ctor: '[]'}
										},
										_1: {ctor: '[]'}
									}));
						}(
							{
								ctor: '_Tuple2',
								_0: function (model) {
									return A2(
										_elm_lang$core$Json_Encode$encode,
										4,
										_elm_lang$core$Json_Encode$object(
											A2(
												_elm_lang$core$List$map,
												function (_p128) {
													var _p129 = _p128;
													return {
														ctor: '_Tuple2',
														_0: _p129._0,
														_1: _elm_lang$core$Json_Encode$string(_p129._1)
													};
												},
												_elm_lang$core$Dict$toList(
													A2(
														_elm_lang$core$Dict$union,
														A2(
															_elm_lang$core$Dict$map,
															F2(
																function (_p130, checkedOutPackage) {
																	return checkedOutPackage.versionStr;
																}),
															model.checkedOut),
														A2(
															_elm_lang$core$Dict$map,
															F2(
																function (_p131, linkedRepo) {
																	return A2(
																		_panosoft$elm_utils$Utils_Ops_ops['?!='],
																		A2(_panosoft$elm_utils$Utils_Ops_ops['|?>'], linkedRepo.maybeVersion, _panosoft$elm_grove$Version$versionToString),
																		_panosoft$elm_grove$AppUtils$bug('Should never happen'));
																}),
															A2(
																_elm_lang$core$Dict$filter,
																F2(
																	function (_p132, linkedRepo) {
																		return A2(
																			_panosoft$elm_utils$Utils_Ops_ops['|?->'],
																			linkedRepo.maybeVersion,
																			{
																				ctor: '_Tuple2',
																				_0: false,
																				_1: _elm_lang$core$Basics$always(true)
																			});
																	}),
																model.linkedRepos)))))));
								},
								_1: function (prefix) {
									return function (versionStr) {
										return _elm_lang$core$Native_Utils.update(
											model,
											{
												finalCheckoutCount: model.finalCheckoutCount - 1,
												installed: A3(
													_elm_lang$core$Dict$insert,
													_p134,
													{
														ctor: '_Tuple3',
														_0: A2(_elm_lang$core$Basics_ops['++'], prefix, _p135),
														_1: A2(
															_panosoft$elm_grove$Component_Install$pathJoin,
															config,
															{
																ctor: '::',
																_0: A2(_panosoft$elm_grove$Package$elmPackagesRoot, config.testing, config.pathSep),
																_1: {
																	ctor: '::',
																	_0: _p134,
																	_1: {
																		ctor: '::',
																		_0: versionStr,
																		_1: {ctor: '[]'}
																	}
																}
															}),
														_2: versionStr
													},
													model.installed)
											});
									}(
										A2(
											_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
											A2(_elm_lang$core$Dict$get, _p134, model.checkedOut),
											{
												ctor: '_Tuple2',
												_0: function (_p133) {
													return A2(
														_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
														A2(_elm_lang$core$Dict$get, _p134, model.linkedRepos),
														{
															ctor: '_Tuple2',
															_0: _panosoft$elm_grove$AppUtils$bugMissing(
																A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'linked repo entry for package:', _p134)),
															_1: function (linkedRepo) {
																return _panosoft$elm_grove$Version$versionToString(
																	A2(
																		_panosoft$elm_utils$Utils_Ops_ops['?!='],
																		linkedRepo.maybeVersion,
																		_panosoft$elm_grove$AppUtils$bugMissing(
																			A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'version for linkedRepo:', _p134))));
															}
														});
												},
												_1: function (_) {
													return _.versionStr;
												}
											}));
								}(
									A3(getGitPrefix, _p134, _p135, model))
							});
					}(
						F3(
							function (packageName, repoLocation, model) {
								return A2(
									_panosoft$elm_utils$Utils_Ops_ops['?='],
									A2(
										_panosoft$elm_utils$Utils_Ops_ops['|?>'],
										A2(_elm_lang$core$Dict$get, packageName, model.linkedRepos),
										_elm_lang$core$Basics$always('git+file://')),
									A2(
										_panosoft$elm_utils$Utils_Ops_ops['?'],
										_elm_lang$core$Native_Utils.eq(
											A3(
												_elm_lang$core$Regex$find,
												_elm_lang$core$Regex$AtMost(1),
												_elm_lang$core$Regex$regex('^[A-Za-z_]+@'),
												repoLocation),
											{ctor: '[]'}),
										{ctor: '_Tuple2', _0: 'git+', _1: 'git+ssh://'}));
							}));
				}
			case 'FinalElmFilesWritten':
				if (_p88._0.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Install$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to write', _panosoft$elm_grove$Package$exactDependenciesFileName),
									'Error:'),
								_p88._0._0)));
				} else {
					return {
						ctor: '_Tuple2',
						_0: A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: A2(
									_elm_lang$core$Task$attempt,
									_panosoft$elm_grove$Component_Install$NpmPackageRead,
									A2(_elm_node$core$Node_FileSystem$readFileAsString, _panosoft$elm_grove$Package$npmJsonFilename, _elm_node$core$Node_Encoding$Utf8)),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					};
				}
			case 'NpmPackageRead':
				if (_p88._0.ctor === 'Err') {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?'],
						config.skipNpmInstall,
						{
							ctor: '_Tuple2',
							_0: {
								ctor: '_Tuple2',
								_0: A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									{ctor: '[]'}),
								_1: {
									ctor: '::',
									_0: config.operationComplete(-1),
									_1: {ctor: '[]'}
								}
							},
							_1: A2(
								_panosoft$elm_grove$Component_Install$operationSuccessful,
								model,
								_panosoft$elm_grove$Output$warnLog(
									A2(
										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
										A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], '\n\nSkipping Npm install since', _panosoft$elm_grove$Package$npmJsonFilename),
										'does not exist\n')))
						});
				} else {
					var _p143 = _p88._0._0;
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
						model.elmJson,
						{
							ctor: '_Tuple2',
							_0: _panosoft$elm_grove$AppUtils$bugMissing('elmJson'),
							_1: function (elmJson) {
								return A2(
									_panosoft$elm_utils$Utils_Ops_ops['|??->'],
									A3(_panosoft$elm_grove$NpmJson$validateNpmJson, _p143, elmJson.version, elmJson.repository),
									{
										ctor: '_Tuple2',
										_0: function (errors) {
											return A2(
												_panosoft$elm_grove$Component_Install$operationError,
												model,
												_panosoft$elm_grove$Output$errorLog(
													A2(
														_elm_lang$core$Basics_ops['++'],
														A2(
															_panosoft$elm_string_utils$StringUtils_ops['+-+'],
															A2(
																_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																'Package',
																A3(_panosoft$elm_utils$Utils_Regex$replaceFirst, '\\.git', '', elmJson.repository)),
															'has the following errors:\n\t'),
														A2(_elm_lang$core$String$join, '\n\t', errors))));
										},
										_1: function (_p136) {
											return A2(
												_panosoft$elm_utils$Utils_Ops_ops['?'],
												_elm_lang$core$Native_Utils.eq(
													_elm_lang$core$Set$size(model.npmPackages),
													0),
												{
													ctor: '_Tuple2',
													_0: {
														ctor: '_Tuple2',
														_0: A2(
															_elm_lang$core$Platform_Cmd_ops['!'],
															model,
															{ctor: '[]'}),
														_1: {
															ctor: '::',
															_0: config.operationComplete(0),
															_1: {ctor: '[]'}
														}
													},
													_1: A2(
														_panosoft$elm_utils$Utils_Ops_ops['|??->'],
														_panosoft$elm_grove$NpmJson$decodeNpmJsonDependencies(_p143),
														{
															ctor: '_Tuple2',
															_0: function (error) {
																return A2(
																	_panosoft$elm_grove$Component_Install$operationError,
																	model,
																	_panosoft$elm_grove$Output$errorLog(error));
															},
															_1: function (_p137) {
																var _p138 = _p137;
																var _p142 = _p138._1;
																return function (npmJsonStr) {
																	return {
																		ctor: '_Tuple2',
																		_0: A2(
																			_elm_lang$core$Platform_Cmd_ops['!'],
																			model,
																			{
																				ctor: '::',
																				_0: A2(
																					_elm_lang$core$Task$attempt,
																					_panosoft$elm_grove$Component_Install$NpmPackageWritten,
																					A2(
																						_panosoft$elm_grove$AppUtils$writeFile,
																						A2(
																							_panosoft$elm_grove$Component_Install$pathJoin,
																							config,
																							{
																								ctor: '::',
																								_0: config.cwd,
																								_1: {
																									ctor: '::',
																									_0: A2(
																										_panosoft$elm_utils$Utils_Ops_ops['?'],
																										config.testing,
																										{ctor: '_Tuple2', _0: 'test', _1: ''}),
																									_1: {
																										ctor: '::',
																										_0: _panosoft$elm_grove$Package$npmJsonFilename,
																										_1: {ctor: '[]'}
																									}
																								}
																							}),
																						npmJsonStr)),
																				_1: {ctor: '[]'}
																			}),
																		_1: {ctor: '[]'}
																	};
																}(
																	A2(
																		_panosoft$elm_grove$NpmJson$replaceDependencies,
																		_p142,
																		A2(
																			_elm_lang$core$Json_Encode$encode,
																			2 * _panosoft$elm_grove$AppUtils$determineJsonIndent(_p142),
																			_panosoft$elm_grove$NpmJson$npmDependenciesEncoder(
																				A2(
																					_elm_lang$core$Dict$union,
																					_elm_lang$core$Dict$fromList(
																						A2(
																							_elm_lang$core$List$filterMap,
																							function (packageName) {
																								return A2(
																									_panosoft$elm_utils$Utils_Ops_ops['|?->'],
																									A2(_elm_lang$core$Dict$get, packageName, model.installed),
																									{
																										ctor: '_Tuple2',
																										_0: _elm_lang$core$Maybe$Nothing,
																										_1: function (_p139) {
																											var _p140 = _p139;
																											return _elm_lang$core$Maybe$Just(
																												{
																													ctor: '_Tuple2',
																													_0: A2(_elm_lang$core$Basics_ops['++'], '@', packageName),
																													_1: A2(
																														_elm_lang$core$Basics_ops['++'],
																														_p140._0,
																														A2(
																															_panosoft$elm_utils$Utils_Ops_ops['|?->'],
																															A2(_elm_lang$core$Dict$get, packageName, model.linkedRepos),
																															{
																																ctor: '_Tuple2',
																																_0: A2(_elm_lang$core$Basics_ops['++'], '#semver:^', _p140._2),
																																_1: _elm_lang$core$Basics$always('')
																															}))
																												});
																										}
																									});
																							},
																							_elm_lang$core$Set$toList(model.npmPackages))),
																					A2(
																						_elm_lang$core$Dict$filter,
																						F2(
																							function (key, _p141) {
																								return !_elm_lang$core$Native_Utils.eq(
																									A2(_elm_lang$core$String$left, 1, key),
																									'@');
																							}),
																						_p138._0))))));
															}
														})
												});
										}
									});
							}
						});
				}
			case 'NpmPackageWritten':
				if (_p88._0.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Install$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to write', _panosoft$elm_grove$Package$npmJsonFilename),
									'Error:'),
								_p88._0._0)));
				} else {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?'],
						config.skipNpmInstall,
						{
							ctor: '_Tuple2',
							_0: A3(
								_panosoft$elm_grove$Component_Install$update,
								config,
								A2(
									_panosoft$elm_grove$Component_Install$NpmOperationComplete,
									_elm_lang$core$Task$succeed(''),
									_elm_lang$core$Result$Ok(
										{ctor: '_Tuple0'})),
								model),
							_1: A2(
								_panosoft$elm_utils$Utils_Ops_ops['?'],
								_elm_lang$core$Native_Utils.eq(
									_elm_lang$core$Set$size(model.npmPackages),
									0),
								{
									ctor: '_Tuple2',
									_0: {
										ctor: '_Tuple2',
										_0: A2(
											_elm_lang$core$Platform_Cmd_ops['!'],
											model,
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: config.operationComplete(0),
											_1: {ctor: '[]'}
										}
									},
									_1: function (task) {
										return {
											ctor: '_Tuple2',
											_0: A2(
												_elm_lang$core$Platform_Cmd_ops['!'],
												model,
												{
													ctor: '::',
													_0: A2(
														_elm_lang$core$Task$attempt,
														_panosoft$elm_grove$Component_Install$NpmOperationComplete(
															_panosoft$elm_grove$Console$log('\n\n***** Npm Install Complete *****\n')),
														task),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										};
									}(
										A2(
											_elm_lang$core$Task$andThen,
											function (_p144) {
												return A2(
													_elm_lang$core$Task$mapError,
													_elm_node$core$Node_Error$message,
													A3(
														_panosoft$elm_grove$Spawn$exec,
														A2(
															_panosoft$elm_string_utils$StringUtils_ops['+-+'],
															'npm install',
															A2(
																_panosoft$elm_utils$Utils_Ops_ops['?'],
																config.npmProduction,
																{ctor: '_Tuple2', _0: '-production', _1: ''})),
														0,
														config.npmSilent));
											},
											A2(
												_elm_lang$core$Task$mapError,
												_elm_lang$core$Basics$always('Should never happen'),
												_panosoft$elm_grove$Console$log('\n\n***** Npm installing *****'))))
								})
						});
				}
			case 'NpmOperationComplete':
				if (_p88._1.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Install$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Npm install failed:', _p88._1._0)));
				} else {
					var _p149 = _p88._0;
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?'],
						config.noRewrite,
						{
							ctor: '_Tuple2',
							_0: A2(
								_panosoft$elm_grove$Component_Install$operationSuccessful,
								model,
								A2(
									_elm_lang$core$Task$andThen,
									function (_p145) {
										return _panosoft$elm_grove$Output$warnLog('Native code may use wrong versions of node modules without further processing');
									},
									A2(
										_elm_lang$core$Task$andThen,
										function (_p146) {
											return _panosoft$elm_grove$Output$warnLog('Skipping native code rewrite due to --no-rewrite');
										},
										_p149))),
							_1: function (logCmd) {
								return function (_p147) {
									var _p148 = _p147;
									return {
										ctor: '_Tuple2',
										_0: A2(
											_elm_lang$core$Platform_Cmd_ops['!'],
											_elm_lang$core$Native_Utils.update(
												model,
												{rewriterModel: _p148._0}),
											{
												ctor: '::',
												_0: logCmd,
												_1: {
													ctor: '::',
													_0: _p148._1,
													_1: {ctor: '[]'}
												}
											}),
										_1: {ctor: '[]'}
									};
								}(
									A3(
										_panosoft$elm_grove$Component_Rewriter$rewrite,
										A2(
											_panosoft$elm_grove$Component_Install$rewriterConfig,
											config,
											_elm_lang$core$Set$fromList(
												_elm_lang$core$Dict$keys(model.linkedRepos))),
										model.rewriterModel,
										_elm_lang$core$Set$toList(model.npmPackages)));
							}(
								A2(_elm_lang$core$Task$perform, _panosoft$elm_grove$Component_Install$OutputComplete, _p149))
						});
				}
			case 'RewritingComplete':
				return A2(
					_panosoft$elm_utils$Utils_Ops_ops['?'],
					_elm_lang$core$Native_Utils.eq(_p88._1, _panosoft$elm_grove$Component_Rewriter$RewriteFailed),
					{
						ctor: '_Tuple2',
						_0: {
							ctor: '_Tuple2',
							_0: A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								{ctor: '[]'}),
							_1: {
								ctor: '::',
								_0: config.operationComplete(-1),
								_1: {ctor: '[]'}
							}
						},
						_1: A2(
							_panosoft$elm_grove$Component_Install$operationSuccessful,
							model,
							A2(
								_panosoft$elm_utils$Utils_Ops_ops['?'],
								_elm_lang$core$Native_Utils.eq(_p88._0, 0),
								{
									ctor: '_Tuple2',
									_0: _elm_lang$core$Task$succeed(''),
									_1: _panosoft$elm_grove$Console$log('\n\n***** Rewrite Complete *****')
								}))
					});
			case 'ElmJsonFileRead':
				if (_p88._5.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Install$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(
										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
										A2(
											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
											A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to read:', _panosoft$elm_grove$Package$elmJsonFilename),
											'location:'),
										_p88._1),
									'Error:'),
								_p88._5._0)));
				} else {
					var _p159 = _p88._0;
					var _p158 = _p88._5._0;
					return function (model) {
						return function (model) {
							return A2(
								_panosoft$elm_utils$Utils_Ops_ops['??='],
								A2(
									_panosoft$elm_utils$Utils_Ops_ops['|??>'],
									A2(_panosoft$elm_grove$ElmJson$decodeElmJson, _p88._1, _p158),
									function (elmJson) {
										return function (_p150) {
											var _p151 = _p150;
											var _p156 = _p151._1;
											var _p155 = _p151._0._0;
											var _p154 = _p151._0._1;
											return A2(
												_panosoft$elm_utils$Utils_Ops_ops['?='],
												A2(
													_panosoft$elm_utils$Utils_Ops_ops['|?>'],
													_p88._4,
													function (_p152) {
														var _p153 = _p152;
														return {
															ctor: '_Tuple2',
															_0: A2(
																_elm_lang$core$Platform_Cmd_ops['!'],
																_p155,
																{
																	ctor: '::',
																	_0: _p154,
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_elm_lang$core$Task$attempt,
																			_panosoft$elm_grove$Component_Install$DependentNpmPackageRead(
																				_elm_lang$core$Native_Utils.update(
																					_p153._0,
																					{
																						maybeElmJson: _elm_lang$core$Maybe$Just(elmJson)
																					})),
																			A2(_elm_node$core$Node_FileSystem$readFileAsString, _p153._1, _elm_node$core$Node_Encoding$Utf8)),
																		_1: {ctor: '[]'}
																	}
																}),
															_1: _p156
														};
													}),
												{
													ctor: '_Tuple2',
													_0: A2(
														_elm_lang$core$Platform_Cmd_ops['!'],
														_p155,
														{
															ctor: '::',
															_0: _p154,
															_1: {ctor: '[]'}
														}),
													_1: _p156
												});
										}(
											A6(_panosoft$elm_grove$Component_Install$processElmJson, config, model, _p159, _p88._2, _p88._3, elmJson));
									}),
								function (_p157) {
									return A2(
										_panosoft$elm_grove$Component_Install$operationError,
										model,
										_panosoft$elm_grove$Output$errorLog(_p157));
								});
						}(
							_elm_lang$core$Native_Utils.update(
								model,
								{
									readingElmJson: A2(_elm_lang$core$Set$remove, _p159, model.readingElmJson)
								}));
					}(
						_elm_lang$core$Native_Utils.update(
							model,
							{
								elmJsonIndent: _elm_lang$core$Maybe$Just(
									A2(
										_panosoft$elm_utils$Utils_Ops_ops['?='],
										model.elmJsonIndent,
										_panosoft$elm_grove$AppUtils$determineJsonIndent(_p158)))
							}));
				}
			default:
				return A2(updateRewriter, _p88._0, model);
		}
	});

var _panosoft$elm_utils$Utils_Task$andThenIf = F2(
	function (cond, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Task$andThen(
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				cond,
				{ctor: '_Tuple2', _0: _p1._0, _1: _p1._1}));
	});
var _panosoft$elm_utils$Utils_Task$untilSuccess = F2(
	function (failureValue, tasks) {
		var _p2 = tasks;
		if (_p2.ctor === '[]') {
			return _elm_lang$core$Task$fail(failureValue);
		} else {
			return A2(
				_elm_lang$core$Task$onError,
				function (_p3) {
					return A2(_panosoft$elm_utils$Utils_Task$untilSuccess, failureValue, _p2._1);
				},
				A2(_elm_lang$core$Task$andThen, _elm_lang$core$Task$succeed, _p2._0));
		}
	});

var _panosoft$elm_grove$Component_Uninstall$copyFile = F2(
	function (old, $new) {
		return A3(_elm_node$core$Node_FileSystem$copy, true, $new, old);
	});
var _panosoft$elm_grove$Component_Uninstall$pathJoin = F2(
	function (config, pathParts) {
		return A3(_panosoft$elm_grove$AppUtils$pathJoin, config.pathSep, config.cwd, pathParts);
	});
var _panosoft$elm_grove$Component_Uninstall$Config = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return {testing: a, npmProduction: b, npmSilent: c, noRewrite: d, routeToMe: e, installMsg: f, operationComplete: g, cwd: h, pathSep: i, packages: j};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _panosoft$elm_grove$Component_Uninstall$Model = function (a) {
	return {elmNpmDependencies: a};
};
var _panosoft$elm_grove$Component_Uninstall$DeleteElmStuff = {ctor: 'DeleteElmStuff'};
var _panosoft$elm_grove$Component_Uninstall$DeletePackages = {ctor: 'DeletePackages'};
var _panosoft$elm_grove$Component_Uninstall$NpmUninstallComplete = function (a) {
	return {ctor: 'NpmUninstallComplete', _0: a};
};
var _panosoft$elm_grove$Component_Uninstall$ExitApp = function (a) {
	return {ctor: 'ExitApp', _0: a};
};
var _panosoft$elm_grove$Component_Uninstall$operationError = F2(
	function (model, task) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Task$perform,
						function (_p0) {
							return _panosoft$elm_grove$Component_Uninstall$ExitApp(-1);
						},
						task),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	});
var _panosoft$elm_grove$Component_Uninstall$operationSuccessful = F2(
	function (model, task) {
		return {
			ctor: '_Tuple2',
			_0: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				model,
				{
					ctor: '::',
					_0: A2(
						_elm_lang$core$Task$perform,
						function (_p1) {
							return _panosoft$elm_grove$Component_Uninstall$ExitApp(0);
						},
						task),
					_1: {ctor: '[]'}
				}),
			_1: {ctor: '[]'}
		};
	});
var _panosoft$elm_grove$Component_Uninstall$installComplete = F3(
	function (config, model, installedElmNpmDependencies) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['|?->'],
			model.elmNpmDependencies,
			{
				ctor: '_Tuple2',
				_0: function (task) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{
							ctor: '::',
							_0: A2(
								_elm_lang$core$Task$perform,
								function (_p2) {
									return config.routeToMe(
										_panosoft$elm_grove$Component_Uninstall$ExitApp(0));
								},
								task),
							_1: {ctor: '[]'}
						});
				}(
					_panosoft$elm_grove$Output$warnLog(
						A2(
							_panosoft$elm_string_utils$StringUtils_ops['+-+'],
							A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Skipping Npm uninstall since', _panosoft$elm_grove$Package$npmJsonFilename),
							'does not exist'))),
				_1: function (elmNpmDependencies) {
					return function (installedElmNpmDependencies) {
						return function (_p3) {
							var _p4 = _p3;
							var _p14 = _p4._1;
							var _p13 = _p4._2;
							var _p12 = _p4._0;
							return function (task) {
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									model,
									{
										ctor: '::',
										_0: A2(
											_elm_lang$core$Task$attempt,
											function (_p5) {
												return config.routeToMe(
													_panosoft$elm_grove$Component_Uninstall$NpmUninstallComplete(_p5));
											},
											task),
										_1: {ctor: '[]'}
									});
							}(
								A3(
									_panosoft$elm_utils$Utils_Task$andThenIf,
									config.testing,
									{
										ctor: '_Tuple2',
										_0: function (_p6) {
											return A2(
												_elm_lang$core$Task$mapError,
												_elm_node$core$Node_Error$message,
												A2(
													_elm_lang$core$Task$andThen,
													function (_p7) {
														return A2(_elm_node$core$Node_FileSystem$rename, _p13, _p12);
													},
													A2(_elm_node$core$Node_FileSystem$rename, _p12, _p14)));
										},
										_1: _elm_lang$core$Basics$always(
											_elm_lang$core$Task$succeed(
												{ctor: '_Tuple0'}))
									},
									A2(
										_elm_lang$core$Task$andThen,
										function (_p8) {
											return A2(
												_elm_lang$core$Task$mapError,
												_elm_node$core$Node_Error$message,
												A3(
													_panosoft$elm_grove$Spawn$exec,
													A2(
														_panosoft$elm_string_utils$StringUtils_ops['+-+'],
														A2(
															_panosoft$elm_string_utils$StringUtils_ops['+-+'],
															'npm uninstall',
															A2(
																_panosoft$elm_utils$Utils_Ops_ops['?'],
																config.npmProduction,
																{ctor: '_Tuple2', _0: '-production', _1: ''})),
														A2(_elm_lang$core$String$join, ' ', installedElmNpmDependencies)),
													0,
													config.npmSilent));
										},
										A3(
											_panosoft$elm_utils$Utils_Task$andThenIf,
											config.testing,
											{
												ctor: '_Tuple2',
												_0: function (_p9) {
													return A2(
														_elm_lang$core$Task$mapError,
														_elm_node$core$Node_Error$message,
														A2(
															_elm_lang$core$Task$andThen,
															function (_p10) {
																return A2(_elm_node$core$Node_FileSystem$rename, _p14, _p12);
															},
															A2(
																_elm_lang$core$Task$andThen,
																function (_p11) {
																	return A2(_panosoft$elm_grove$Component_Uninstall$copyFile, _p12, _p13);
																},
																_elm_node$core$Node_FileSystem$remove(_p13))));
												},
												_1: _elm_lang$core$Basics$always(
													_elm_lang$core$Task$succeed(
														{ctor: '_Tuple0'}))
											},
											A2(
												_elm_lang$core$Task$mapError,
												_elm_lang$core$Basics$always(''),
												_panosoft$elm_grove$Console$log(
													A2(
														_elm_lang$core$Basics_ops['++'],
														A2(
															_panosoft$elm_string_utils$StringUtils_ops['+-+'],
															'\n***** Npm Uninstall *****\n\nUninstalling packages:',
															A2(_elm_lang$core$String$join, ', ', installedElmNpmDependencies)),
														'\n\n')))))));
						}(
							{
								ctor: '_Tuple3',
								_0: A2(
									_panosoft$elm_grove$Component_Uninstall$pathJoin,
									config,
									{
										ctor: '::',
										_0: _panosoft$elm_grove$Package$npmJsonFilename,
										_1: {ctor: '[]'}
									}),
								_1: A2(
									_panosoft$elm_grove$Component_Uninstall$pathJoin,
									config,
									{
										ctor: '::',
										_0: 'test',
										_1: {
											ctor: '::',
											_0: _panosoft$elm_grove$Package$npmJsonFilename,
											_1: {ctor: '[]'}
										}
									}),
								_2: A2(
									_panosoft$elm_grove$Component_Uninstall$pathJoin,
									config,
									{
										ctor: '::',
										_0: A2(_elm_lang$core$Basics_ops['++'], 'SAVE', _panosoft$elm_grove$Package$npmJsonFilename),
										_1: {ctor: '[]'}
									})
							});
					}(
						_elm_lang$core$Set$toList(
							A2(
								_elm_lang$core$Set$diff,
								_elm_lang$core$Set$fromList(
									_elm_lang$core$Dict$keys(elmNpmDependencies)),
								_elm_lang$core$Set$fromList(
									A2(
										_elm_lang$core$List$map,
										F2(
											function (x, y) {
												return A2(_elm_lang$core$Basics_ops['++'], x, y);
											})('@'),
										installedElmNpmDependencies)))));
				}
			});
	});
var _panosoft$elm_grove$Component_Uninstall$PreInstallDone = function (a) {
	return {ctor: 'PreInstallDone', _0: a};
};
var _panosoft$elm_grove$Component_Uninstall$update = F3(
	function (config, msg, model) {
		var _p15 = msg;
		switch (_p15.ctor) {
			case 'OutputComplete':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'}),
					_1: {ctor: '[]'}
				};
			case 'ExitApp':
				return {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'}),
					_1: {
						ctor: '::',
						_0: config.operationComplete(_p15._0),
						_1: {ctor: '[]'}
					}
				};
			case 'NpmPackageRead':
				if (_p15._1.ctor === 'Err') {
					return {
						ctor: '_Tuple2',
						_0: A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: _p15._0,
							_1: {ctor: '[]'}
						}
					};
				} else {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['|??->'],
						_panosoft$elm_grove$NpmJson$decodeNpmJsonDependencies(_p15._1._0),
						{
							ctor: '_Tuple2',
							_0: function (error) {
								return A2(
									_panosoft$elm_grove$Component_Uninstall$operationError,
									model,
									_panosoft$elm_grove$Output$errorLog(error));
							},
							_1: function (_p16) {
								var _p17 = _p16;
								return function (elmNpmDependencies) {
									return {
										ctor: '_Tuple2',
										_0: A2(
											_elm_lang$core$Platform_Cmd_ops['!'],
											_elm_lang$core$Native_Utils.update(
												model,
												{
													elmNpmDependencies: _elm_lang$core$Maybe$Just(elmNpmDependencies)
												}),
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: _p15._0,
											_1: {ctor: '[]'}
										}
									};
								}(
									A2(
										_elm_lang$core$Dict$filter,
										F2(
											function (key, _p18) {
												return _elm_lang$core$Native_Utils.eq(
													A2(_elm_lang$core$String$left, 1, key),
													'@');
											}),
										_p17._0));
							}
						});
				}
			case 'ElmJsonFileRead':
				if (_p15._1.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Uninstall$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(
								_panosoft$elm_string_utils$StringUtils_ops['+-+'],
								A2(
									_panosoft$elm_string_utils$StringUtils_ops['+-+'],
									A2(
										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
										A2(
											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
											A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to read:', _panosoft$elm_grove$Package$elmJsonFilename),
											'location:'),
										_p15._0),
									'Error:'),
								_p15._1._0)));
				} else {
					var _p32 = _p15._0;
					var _p31 = _p15._1._0;
					var filterPackages = F3(
						function (packages, packageName, _p19) {
							return !A2(_elm_lang$core$List$member, packageName, packages);
						});
					return function (_p20) {
						var _p21 = _p20;
						var _p25 = _p21._0;
						var _p24 = _p21._1;
						return A2(
							_panosoft$elm_utils$Utils_Ops_ops['?'],
							!_elm_lang$core$Native_Utils.eq(
								_p24,
								{ctor: '[]'}),
							{
								ctor: '_Tuple2',
								_0: A2(
									_panosoft$elm_grove$Component_Uninstall$operationError,
									model,
									_panosoft$elm_grove$Output$errorLog(
										A2(_elm_lang$core$String$join, '\n', _p24))),
								_1: A2(
									_panosoft$elm_utils$Utils_Ops_ops['??='],
									A2(
										_panosoft$elm_utils$Utils_Ops_ops['|??>'],
										A2(_panosoft$elm_grove$ElmJson$decodeElmJson, _p32, _p31),
										function (elmJson) {
											return function (cmd) {
												return {
													ctor: '_Tuple2',
													_0: A2(
														_elm_lang$core$Platform_Cmd_ops['!'],
														model,
														{
															ctor: '::',
															_0: cmd,
															_1: {ctor: '[]'}
														}),
													_1: {ctor: '[]'}
												};
											}(
												function (elmJson) {
													return A2(
														_elm_lang$core$Task$attempt,
														_panosoft$elm_grove$Component_Uninstall$PreInstallDone,
														A2(
															_elm_lang$core$Task$andThen,
															function (_p22) {
																return A2(
																	_elm_lang$core$Task$mapError,
																	function (error) {
																		return {
																			ctor: '_Tuple2',
																			_0: _panosoft$elm_grove$Component_Uninstall$DeleteElmStuff,
																			_1: _elm_node$core$Node_Error$message(error)
																		};
																	},
																	_elm_node$core$Node_FileSystem$remove(
																		A2(
																			_panosoft$elm_grove$Component_Uninstall$pathJoin,
																			config,
																			{
																				ctor: '::',
																				_0: _panosoft$elm_grove$Package$elmStuff(config.testing),
																				_1: {ctor: '[]'}
																			})));
															},
															A2(
																_elm_lang$core$Task$andThen,
																function (_p23) {
																	return A2(
																		_elm_lang$core$Task$mapError,
																		function (error) {
																			return {
																				ctor: '_Tuple2',
																				_0: _panosoft$elm_grove$Component_Uninstall$DeletePackages,
																				_1: _elm_node$core$Node_Error$message(error)
																			};
																		},
																		A2(
																			_panosoft$elm_grove$AppUtils$writeFile,
																			A2(
																				_panosoft$elm_grove$Component_Uninstall$pathJoin,
																				config,
																				{
																					ctor: '::',
																					_0: config.cwd,
																					_1: {
																						ctor: '::',
																						_0: A2(
																							_panosoft$elm_utils$Utils_Ops_ops['?'],
																							config.testing,
																							{ctor: '_Tuple2', _0: 'test', _1: ''}),
																						_1: {
																							ctor: '::',
																							_0: _panosoft$elm_grove$Package$elmJsonFilename,
																							_1: {ctor: '[]'}
																						}
																					}
																				}),
																			A2(
																				_elm_lang$core$Json_Encode$encode,
																				_panosoft$elm_grove$AppUtils$determineJsonIndent(_p31),
																				_panosoft$elm_grove$ElmJson$elmJsonEncoder(elmJson))));
																},
																A2(
																	_elm_lang$core$Task$onError,
																	_panosoft$elm_grove$AppUtils$bug('Cannot happen'),
																	_panosoft$elm_grove$Console$log(
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			A2(
																				_panosoft$elm_string_utils$StringUtils_ops['+-+'],
																				'Removing packages from Elm Package Json:',
																				A2(_elm_lang$core$String$join, ', ', _p25)),
																			'\n\n'))))));
												}(
													function (dependencies) {
														return function (dependencySources) {
															return _elm_lang$core$Native_Utils.update(
																elmJson,
																{dependencies: dependencies, dependencySources: dependencySources});
														}(
															A2(
																_panosoft$elm_utils$Utils_Ops_ops['|?>'],
																elmJson.dependencySources,
																_elm_lang$core$Dict$filter(
																	filterPackages(_p25))));
													}(
														A2(
															_elm_lang$core$Dict$filter,
															filterPackages(_p25),
															elmJson.dependencies))));
										}),
									function (error) {
										return A2(
											_panosoft$elm_grove$Component_Uninstall$operationError,
											model,
											_panosoft$elm_grove$Output$errorLog(
												A2(
													_panosoft$elm_string_utils$StringUtils_ops['+-+'],
													A2(
														_panosoft$elm_string_utils$StringUtils_ops['+-+'],
														A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to decode:', _p32),
														'Error:'),
													error)));
									})
							});
					}(
						A3(
							_elm_lang$core$List$foldl,
							F2(
								function (packageName, _p26) {
									var _p27 = _p26;
									var _p30 = _p27._0;
									var _p29 = _p27._1;
									return A2(
										_panosoft$elm_utils$Utils_Ops_ops['|?!->'],
										_elm_lang$core$List$head(
											A3(
												_elm_lang$core$Regex$find,
												_elm_lang$core$Regex$AtMost(1),
												_elm_lang$core$Regex$regex('([a-zA-Z0-9\\-]+/[a-zA-Z0-9\\-]+)(?:\\.git)?$'),
												packageName)),
										{
											ctor: '_Tuple2',
											_0: _elm_lang$core$Basics$always(
												{
													ctor: '_Tuple2',
													_0: _p30,
													_1: {
														ctor: '::',
														_0: A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Invalid package specification:', packageName),
														_1: _p29
													}
												}),
											_1: function (_p28) {
												return function (repo) {
													return {
														ctor: '_Tuple2',
														_0: {ctor: '::', _0: repo, _1: _p30},
														_1: _p29
													};
												}(
													_panosoft$elm_utils$Utils_Match$getSubmatches1(_p28));
											}
										});
								}),
							{
								ctor: '_Tuple2',
								_0: {ctor: '[]'},
								_1: {ctor: '[]'}
							},
							A2(
								_panosoft$elm_utils$Utils_Ops_ops['?='],
								config.packages,
								{ctor: '[]'})));
				}
			case 'PreInstallDone':
				if (_p15._0.ctor === 'Err') {
					var _p34 = _p15._0._0._1;
					return A2(
						_panosoft$elm_grove$Component_Uninstall$operationError,
						model,
						function () {
							var _p33 = _p15._0._0._0;
							if (_p33.ctor === 'DeletePackages') {
								return _panosoft$elm_grove$Output$errorLog(
									A2(
										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
										A2(
											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
											A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Unable to write:', _panosoft$elm_grove$Package$elmJsonFilename),
											'Error:'),
										_p34));
							} else {
								return _panosoft$elm_grove$Output$errorLog(
									A2(
										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
										A2(
											_panosoft$elm_string_utils$StringUtils_ops['+-+'],
											A2(
												_panosoft$elm_string_utils$StringUtils_ops['+-+'],
												'Unable to delete:',
												A2(
													_panosoft$elm_grove$Component_Uninstall$pathJoin,
													config,
													{
														ctor: '::',
														_0: A2(_panosoft$elm_grove$Package$elmPackagesRoot, config.testing, config.pathSep),
														_1: {ctor: '[]'}
													})),
											'Error:'),
										_p34));
							}
						}());
				} else {
					return {
						ctor: '_Tuple2',
						_0: A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{ctor: '[]'}),
						_1: {
							ctor: '::',
							_0: config.installMsg,
							_1: {ctor: '[]'}
						}
					};
				}
			default:
				if (_p15._0.ctor === 'Err') {
					return A2(
						_panosoft$elm_grove$Component_Uninstall$operationError,
						model,
						_panosoft$elm_grove$Output$errorLog(
							A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'Npm uninstall failed:', _p15._0._0)));
				} else {
					return A2(
						_panosoft$elm_grove$Component_Uninstall$operationSuccessful,
						model,
						_panosoft$elm_grove$Console$log('\n\n***** Npm Uninstall Complete *****'));
				}
		}
	});
var _panosoft$elm_grove$Component_Uninstall$NpmPackageRead = F2(
	function (a, b) {
		return {ctor: 'NpmPackageRead', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Uninstall$init = F2(
	function (config, initializedMsg) {
		return {
			ctor: '_Tuple2',
			_0: {elmNpmDependencies: _elm_lang$core$Maybe$Nothing},
			_1: _elm_lang$core$Maybe$Just(
				A2(
					_elm_lang$core$Task$attempt,
					function (_p35) {
						return config.routeToMe(
							A2(_panosoft$elm_grove$Component_Uninstall$NpmPackageRead, initializedMsg, _p35));
					},
					A2(_elm_node$core$Node_FileSystem$readFileAsString, _panosoft$elm_grove$Package$npmJsonFilename, _elm_node$core$Node_Encoding$Utf8)))
		};
	});
var _panosoft$elm_grove$Component_Uninstall$ElmJsonFileRead = F2(
	function (a, b) {
		return {ctor: 'ElmJsonFileRead', _0: a, _1: b};
	});
var _panosoft$elm_grove$Component_Uninstall$uninstall = F2(
	function (config, model) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['?='],
			A2(
				_panosoft$elm_utils$Utils_Ops_ops['|?>'],
				config.packages,
				function (_p36) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{
							ctor: '::',
							_0: A2(
								_elm_lang$core$Task$attempt,
								function (_p37) {
									return config.routeToMe(
										A2(_panosoft$elm_grove$Component_Uninstall$ElmJsonFileRead, config.cwd, _p37));
								},
								A2(_elm_node$core$Node_FileSystem$readFileAsString, _panosoft$elm_grove$Package$elmJsonFilename, _elm_node$core$Node_Encoding$Utf8)),
							_1: {ctor: '[]'}
						});
				}),
			function (task) {
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					model,
					{
						ctor: '::',
						_0: A2(
							_elm_lang$core$Task$perform,
							function (_p38) {
								return config.routeToMe(
									function (_p39) {
										return _panosoft$elm_grove$Component_Uninstall$ExitApp(-1);
									}(_p38));
							},
							task),
						_1: {ctor: '[]'}
					});
			}(
				_panosoft$elm_grove$Output$errorLog('Packages must be defined for uninstall operation')));
	});
var _panosoft$elm_grove$Component_Uninstall$OutputComplete = function (a) {
	return {ctor: 'OutputComplete', _0: a};
};

var _panosoft$elm_grove$Grove_App$parsePackages = function (packages) {
	return function (parseResults) {
		return function (badPackageNames) {
			return A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				!_elm_lang$core$Native_Utils.eq(
					badPackageNames,
					{ctor: '[]'}),
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$Result$Err(badPackageNames),
					_1: _elm_lang$core$Result$Ok(
						A2(
							_panosoft$elm_utils$Utils_Ops_ops['?'],
							_elm_lang$core$Native_Utils.eq(
								packages,
								{ctor: '[]'}),
							{
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$empty,
								_1: _elm_lang$core$Dict$fromList(
									A2(
										_elm_lang$core$List$map,
										function (match) {
											var _p0 = match.submatches;
											_v0_4:
											do {
												if (_p0.ctor === '::') {
													if (_p0._0.ctor === 'Nothing') {
														if (((_p0._1.ctor === '::') && (_p0._1._0.ctor === 'Just')) && (_p0._1._1.ctor === '::')) {
															if (_p0._1._1._0.ctor === 'Nothing') {
																if (_p0._1._1._1.ctor === '[]') {
																	var _p2 = _p0._1._0._0;
																	return {
																		ctor: '_Tuple2',
																		_0: _p2,
																		_1: _panosoft$elm_grove$Package$defaultRepoLocation(_p2)
																	};
																} else {
																	break _v0_4;
																}
															} else {
																if (_p0._1._1._1.ctor === '[]') {
																	var _p3 = _p0._1._0._0;
																	return {
																		ctor: '_Tuple2',
																		_0: _p3,
																		_1: A2(
																			_elm_lang$core$Basics_ops['++'],
																			_panosoft$elm_grove$Package$defaultGitServer,
																			A2(_elm_lang$core$Basics_ops['++'], _p3, _p0._1._1._0._0))
																	};
																} else {
																	break _v0_4;
																}
															}
														} else {
															break _v0_4;
														}
													} else {
														if (((_p0._1.ctor === '::') && (_p0._1._0.ctor === 'Just')) && (_p0._1._1.ctor === '::')) {
															if (_p0._1._1._0.ctor === 'Nothing') {
																if (_p0._1._1._1.ctor === '[]') {
																	var _p1 = _p0._1._0._0;
																	return {
																		ctor: '_Tuple2',
																		_0: _p1,
																		_1: A2(_elm_lang$core$Basics_ops['++'], _p0._0._0, _p1)
																	};
																} else {
																	break _v0_4;
																}
															} else {
																if (_p0._1._1._1.ctor === '[]') {
																	var _p4 = _p0._1._0._0;
																	return {
																		ctor: '_Tuple2',
																		_0: _p4,
																		_1: A2(
																			_elm_lang$core$Basics_ops['++'],
																			_p0._0._0,
																			A2(_elm_lang$core$Basics_ops['++'], _p4, _p0._1._1._0._0))
																	};
																} else {
																	break _v0_4;
																}
															}
														} else {
															break _v0_4;
														}
													}
												} else {
													break _v0_4;
												}
											} while(false);
											return _elm_lang$core$Native_Utils.crashCase(
												'Grove.App',
												{
													start: {line: 105, column: 57},
													end: {line: 119, column: 105}
												},
												_p0)('BUG: Should never get here');
										},
										A2(
											_elm_lang$core$List$filterMap,
											function (_p6) {
												return _elm_lang$core$List$head(
													_elm_lang$core$Tuple$second(_p6));
											},
											parseResults)))
							}))
				});
		}(
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(
					_elm_lang$core$List$filterMap,
					function (_p7) {
						var _p8 = _p7;
						var _p9 = _p8._1;
						return A2(
							_panosoft$elm_utils$Utils_Ops_ops['|?->'],
							_elm_lang$core$List$head(_p9),
							{
								ctor: '_Tuple2',
								_0: _elm_lang$core$Maybe$Just(
									{ctor: '_Tuple2', _0: _p8._0, _1: _p9}),
								_1: _elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing)
							});
					},
					parseResults)));
	}(
		A2(
			_elm_lang$core$List$map,
			function ($package) {
				return {
					ctor: '_Tuple2',
					_0: $package,
					_1: A3(
						_elm_lang$core$Regex$find,
						_elm_lang$core$Regex$All,
						_elm_lang$core$Regex$regex('(.+?[/:])?([a-zA-Z0-9\\-]+/[a-zA-Z0-9\\-]+)(\\.git)?$'),
						$package)
				};
			},
			packages));
};
var _panosoft$elm_grove$Grove_App$configFilename = 'grove-config.json';
var _panosoft$elm_grove$Grove_App$linkedReposFilename = 'grove-links.json';
var _panosoft$elm_grove$Grove_App$exitApp = _elm_lang$core$Native_Platform.outgoingPort(
	'exitApp',
	function (v) {
		return v;
	});
var _panosoft$elm_grove$Grove_App$Options = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return {link: a, dryRun: b, npmProduction: c, npmSilent: d, major: e, minor: f, patch: g, allowUncommitted: h, allowOldDependencies: i, noRewrite: j, local: k, safe: l, docs: m};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _panosoft$elm_grove$Grove_App$Flags = F7(
	function (a, b, c, d, e, f, g) {
		return {elmVersion: a, testing: b, cwd: c, pathSep: d, command: e, options: f, packages: g};
	});
var _panosoft$elm_grove$Grove_App$Model = F7(
	function (a, b, c, d, e, f, g) {
		return {flags: a, packageSourceDict: b, configModel: c, installModel: d, uninstallModel: e, bumpModel: f, initModel: g};
	});
var _panosoft$elm_grove$Grove_App$FinishUninstall = function (a) {
	return {ctor: 'FinishUninstall', _0: a};
};
var _panosoft$elm_grove$Grove_App$InitMsg = function (a) {
	return {ctor: 'InitMsg', _0: a};
};
var _panosoft$elm_grove$Grove_App$BumpMsg = function (a) {
	return {ctor: 'BumpMsg', _0: a};
};
var _panosoft$elm_grove$Grove_App$UninstallMsg = function (a) {
	return {ctor: 'UninstallMsg', _0: a};
};
var _panosoft$elm_grove$Grove_App$InstallMsg = function (a) {
	return {ctor: 'InstallMsg', _0: a};
};
var _panosoft$elm_grove$Grove_App$ConfigMsg = function (a) {
	return {ctor: 'ConfigMsg', _0: a};
};
var _panosoft$elm_grove$Grove_App$ExitApp = function (a) {
	return {ctor: 'ExitApp', _0: a};
};
var _panosoft$elm_grove$Grove_App$configConfig = function (flags) {
	return {
		testing: flags.testing,
		routeToMe: _panosoft$elm_grove$Grove_App$ConfigMsg,
		operationComplete: _panosoft$elm_grove$Grove_App$ExitApp,
		cwd: flags.cwd,
		pathSep: flags.pathSep,
		configFilename: _panosoft$elm_grove$Grove_App$configFilename,
		local: flags.options.local,
		safe: A2(_panosoft$elm_utils$Utils_Ops_ops['|?>'], flags.options.safe, _elm_lang$core$String$toLower),
		docs: A2(_panosoft$elm_utils$Utils_Ops_ops['|?>'], flags.options.docs, _elm_lang$core$String$toLower)
	};
};
var _panosoft$elm_grove$Grove_App$configCfg = function (model) {
	return _panosoft$elm_grove$Grove_App$configConfig(model.flags);
};
var _panosoft$elm_grove$Grove_App$installConfig = F3(
	function (model, flags, packageSourceDict) {
		return function (configCfg) {
			return {
				testing: flags.testing,
				linking: flags.options.link,
				dryRun: flags.options.dryRun,
				npmProduction: flags.options.npmProduction,
				npmSilent: flags.options.npmSilent,
				noRewrite: flags.options.noRewrite,
				skipNpmInstall: A2(
					_panosoft$elm_utils$Utils_Ops_ops['?'],
					_elm_lang$core$Native_Utils.eq(flags.command, 'install'),
					{ctor: '_Tuple2', _0: false, _1: true}),
				routeToMe: _panosoft$elm_grove$Grove_App$InstallMsg,
				operationComplete: A2(
					_panosoft$elm_utils$Utils_Ops_ops['?'],
					_elm_lang$core$Native_Utils.eq(flags.command, 'install'),
					{ctor: '_Tuple2', _0: _panosoft$elm_grove$Grove_App$ExitApp, _1: _panosoft$elm_grove$Grove_App$FinishUninstall}),
				elmVersion: flags.elmVersion,
				cwd: flags.cwd,
				pathSep: flags.pathSep,
				packages: A2(
					_panosoft$elm_utils$Utils_Ops_ops['?'],
					_elm_lang$core$Native_Utils.eq(flags.command, 'install'),
					{
						ctor: '_Tuple2',
						_0: _elm_lang$core$Maybe$Just(
							_elm_lang$core$Dict$keys(packageSourceDict)),
						_1: _elm_lang$core$Maybe$Nothing
					}),
				sources: packageSourceDict,
				safeMode: A2(
					_panosoft$elm_grove$Component_Config$safeMode,
					configCfg,
					A2(
						_panosoft$elm_utils$Utils_Ops_ops['?!='],
						model.configModel,
						_panosoft$elm_grove$AppUtils$bugMissing('configModel')))
			};
		}(
			_panosoft$elm_grove$Grove_App$configConfig(flags));
	});
var _panosoft$elm_grove$Grove_App$installCfg = function (model) {
	return A3(_panosoft$elm_grove$Grove_App$installConfig, model, model.flags, model.packageSourceDict);
};
var _panosoft$elm_grove$Grove_App$bumpConfig = F2(
	function (model, flags) {
		return function (configCfg) {
			return {
				testing: flags.testing,
				dryRun: flags.options.dryRun,
				major: flags.options.major,
				minor: flags.options.minor,
				patch: flags.options.patch,
				allowUncommitted: flags.options.allowUncommitted,
				allowOldDependencies: flags.options.allowOldDependencies,
				routeToMe: _panosoft$elm_grove$Grove_App$BumpMsg,
				operationComplete: _panosoft$elm_grove$Grove_App$ExitApp,
				elmVersion: flags.elmVersion,
				cwd: flags.cwd,
				pathSep: flags.pathSep,
				generateDocs: A2(
					_panosoft$elm_grove$Component_Config$generateDocs,
					configCfg,
					A2(
						_panosoft$elm_utils$Utils_Ops_ops['?!='],
						model.configModel,
						_panosoft$elm_grove$AppUtils$bugMissing('configModel')))
			};
		}(
			_panosoft$elm_grove$Grove_App$configConfig(flags));
	});
var _panosoft$elm_grove$Grove_App$bumpCfg = function (model) {
	return A2(_panosoft$elm_grove$Grove_App$bumpConfig, model, model.flags);
};
var _panosoft$elm_grove$Grove_App$initConfig = function (flags) {
	return {testing: flags.testing, routeToMe: _panosoft$elm_grove$Grove_App$InitMsg, operationComplete: _panosoft$elm_grove$Grove_App$ExitApp, elmVersion: flags.elmVersion, cwd: flags.cwd, pathSep: flags.pathSep};
};
var _panosoft$elm_grove$Grove_App$initCfg = function (model) {
	return _panosoft$elm_grove$Grove_App$initConfig(model.flags);
};
var _panosoft$elm_grove$Grove_App$InstallForUninstall = {ctor: 'InstallForUninstall'};
var _panosoft$elm_grove$Grove_App$uninstallConfig = F2(
	function (flags, packageSourceDict) {
		return {
			testing: flags.testing,
			npmProduction: flags.options.npmProduction,
			npmSilent: flags.options.npmSilent,
			noRewrite: flags.options.noRewrite,
			routeToMe: _panosoft$elm_grove$Grove_App$UninstallMsg,
			installMsg: _panosoft$elm_grove$Grove_App$InstallForUninstall,
			operationComplete: _panosoft$elm_grove$Grove_App$ExitApp,
			cwd: flags.cwd,
			pathSep: flags.pathSep,
			packages: A2(
				_panosoft$elm_utils$Utils_Ops_ops['?'],
				_elm_lang$core$Native_Utils.eq(packageSourceDict, _elm_lang$core$Dict$empty),
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$Maybe$Nothing,
					_1: _elm_lang$core$Maybe$Just(
						_elm_lang$core$Dict$keys(packageSourceDict))
				})
		};
	});
var _panosoft$elm_grove$Grove_App$uninstallCfg = function (model) {
	return A2(_panosoft$elm_grove$Grove_App$uninstallConfig, model.flags, model.packageSourceDict);
};
var _panosoft$elm_grove$Grove_App$DocsGenerated = function (a) {
	return {ctor: 'DocsGenerated', _0: a};
};
var _panosoft$elm_grove$Grove_App$InitInitialized = {ctor: 'InitInitialized'};
var _panosoft$elm_grove$Grove_App$BumpInitialized = {ctor: 'BumpInitialized'};
var _panosoft$elm_grove$Grove_App$UninstallInitialized = {ctor: 'UninstallInitialized'};
var _panosoft$elm_grove$Grove_App$InstallInitialized = {ctor: 'InstallInitialized'};
var _panosoft$elm_grove$Grove_App$initCommand = F2(
	function (command, model) {
		return function (flags) {
			var _p10 = command;
			switch (_p10) {
				case 'config':
					return A2(
						_elm_lang$core$Basics$always,
						A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{ctor: '[]'}),
						_panosoft$elm_grove$AppUtils$bug('Should never get here'));
				case 'install':
					return function (_p11) {
						var _p12 = _p11;
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									installModel: _elm_lang$core$Maybe$Just(_p12._0)
								}),
							{
								ctor: '::',
								_0: A2(
									_panosoft$elm_utils$Utils_Ops_ops['?='],
									_p12._1,
									_panosoft$elm_grove$AppUtils$msgToCmd(_panosoft$elm_grove$Grove_App$InstallInitialized)),
								_1: {ctor: '[]'}
							});
					}(
						A3(
							_panosoft$elm_grove$Component_Install$init,
							A3(_panosoft$elm_grove$Grove_App$installConfig, model, flags, model.packageSourceDict),
							_panosoft$elm_grove$Grove_App$InstallInitialized,
							_panosoft$elm_grove$Grove_App$linkedReposFilename));
				case 'uninstall':
					return function (_p13) {
						var _p14 = _p13;
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									uninstallModel: _elm_lang$core$Maybe$Just(_p14._0)
								}),
							{
								ctor: '::',
								_0: A2(
									_panosoft$elm_utils$Utils_Ops_ops['?='],
									_p14._1,
									_panosoft$elm_grove$AppUtils$msgToCmd(_panosoft$elm_grove$Grove_App$UninstallInitialized)),
								_1: {ctor: '[]'}
							});
					}(
						A2(
							_panosoft$elm_grove$Component_Uninstall$init,
							A2(_panosoft$elm_grove$Grove_App$uninstallConfig, flags, model.packageSourceDict),
							_panosoft$elm_grove$Grove_App$UninstallInitialized));
				case 'bump':
					return function (_p15) {
						var _p16 = _p15;
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									bumpModel: _elm_lang$core$Maybe$Just(_p16._0)
								}),
							{
								ctor: '::',
								_0: A2(
									_panosoft$elm_utils$Utils_Ops_ops['?='],
									_p16._1,
									_panosoft$elm_grove$AppUtils$msgToCmd(_panosoft$elm_grove$Grove_App$BumpInitialized)),
								_1: {ctor: '[]'}
							});
					}(
						A2(
							_panosoft$elm_grove$Component_Bump$init,
							A2(_panosoft$elm_grove$Grove_App$bumpConfig, model, flags),
							_panosoft$elm_grove$Grove_App$BumpInitialized));
				case 'init':
					return function (_p17) {
						var _p18 = _p17;
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									initModel: _elm_lang$core$Maybe$Just(_p18._0)
								}),
							{
								ctor: '::',
								_0: A2(
									_panosoft$elm_utils$Utils_Ops_ops['?='],
									_p18._1,
									_panosoft$elm_grove$AppUtils$msgToCmd(_panosoft$elm_grove$Grove_App$InitInitialized)),
								_1: {ctor: '[]'}
							});
					}(
						A2(
							_panosoft$elm_grove$Component_Init$init,
							_panosoft$elm_grove$Grove_App$initConfig(flags),
							_panosoft$elm_grove$Grove_App$InitInitialized));
				case 'docs':
					return function (task) {
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							model,
							{
								ctor: '::',
								_0: A2(_elm_lang$core$Task$attempt, _panosoft$elm_grove$Grove_App$DocsGenerated, task),
								_1: {ctor: '[]'}
							});
					}(
						_panosoft$elm_grove$DocGenerator$generateDocs(
							{testing: flags.testing, cwd: flags.cwd, pathSep: flags.pathSep, generateDocs: _panosoft$elm_grove$Component_Config$GenerateDocsOn}));
				default:
					return _elm_lang$core$Native_Utils.crashCase(
						'Grove.App',
						{
							start: {line: 249, column: 17},
							end: {line: 291, column: 84}
						},
						_p10)(
						A2(_panosoft$elm_string_utils$StringUtils_ops['+-+'], 'BUG: Unsupported command:', flags.command));
			}
		}(model.flags);
	});
var _panosoft$elm_grove$Grove_App$ConfigInitialized = function (a) {
	return {ctor: 'ConfigInitialized', _0: a};
};
var _panosoft$elm_grove$Grove_App$initConfigModule = F2(
	function (command, model) {
		return function (_p20) {
			var _p21 = _p20;
			return A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_elm_lang$core$Native_Utils.update(
					model,
					{
						configModel: _elm_lang$core$Maybe$Just(_p21._0)
					}),
				{
					ctor: '::',
					_0: A2(
						_panosoft$elm_utils$Utils_Ops_ops['?='],
						_p21._1,
						_panosoft$elm_grove$AppUtils$msgToCmd(
							_panosoft$elm_grove$Grove_App$ConfigInitialized(command))),
					_1: {ctor: '[]'}
				});
		}(
			A2(
				_panosoft$elm_grove$Component_Config$init,
				_panosoft$elm_grove$Grove_App$configConfig(model.flags),
				_panosoft$elm_grove$Grove_App$ConfigInitialized(command)));
	});
var _panosoft$elm_grove$Grove_App$DoCmd = function (a) {
	return {ctor: 'DoCmd', _0: a};
};
var _panosoft$elm_grove$Grove_App$init = function (flags) {
	return function (model) {
		return A2(
			_panosoft$elm_utils$Utils_Ops_ops['|??->'],
			_panosoft$elm_grove$Grove_App$parsePackages(flags.packages),
			{
				ctor: '_Tuple2',
				_0: function (badPackageNames) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{
							ctor: '::',
							_0: A2(
								_elm_lang$core$Task$perform,
								function (_p22) {
									return _panosoft$elm_grove$Grove_App$DoCmd(
										_panosoft$elm_grove$Grove_App$exitApp(-1));
								},
								_panosoft$elm_grove$Output$errorLog(
									A2(
										_elm_lang$core$Basics_ops['++'],
										'The following package names are invalid:\n\n\t',
										A2(_elm_lang$core$String$join, '\n\t', badPackageNames)))),
							_1: {ctor: '[]'}
						});
				},
				_1: function (packageSourceDict) {
					return A2(
						_panosoft$elm_grove$Grove_App$initConfigModule,
						flags.command,
						_elm_lang$core$Native_Utils.update(
							model,
							{packageSourceDict: packageSourceDict}));
				}
			});
	}(
		{flags: flags, packageSourceDict: _elm_lang$core$Dict$empty, configModel: _elm_lang$core$Maybe$Nothing, installModel: _elm_lang$core$Maybe$Nothing, uninstallModel: _elm_lang$core$Maybe$Nothing, bumpModel: _elm_lang$core$Maybe$Nothing, initModel: _elm_lang$core$Maybe$Nothing});
};
var _panosoft$elm_grove$Grove_App$Nop = {ctor: 'Nop'};
var _panosoft$elm_grove$Grove_App$update = F2(
	function (msg, model) {
		return function (_p23) {
			var _p24 = _p23;
			var _p49 = _p24._2;
			var _p48 = _p24._1;
			var _p47 = _p24._4;
			var _p46 = _p24._0;
			var _p45 = _p24._3;
			var updateInit = A5(
				_panosoft$elm_parent_child_update$ParentChildUpdate$updateChildApp,
				_panosoft$elm_grove$Component_Init$update(
					_panosoft$elm_grove$Grove_App$initCfg(model)),
				_panosoft$elm_grove$Grove_App$update,
				_p47,
				_panosoft$elm_grove$Grove_App$InitMsg,
				F2(
					function (model, initModel) {
						return _elm_lang$core$Native_Utils.update(
							model,
							{
								initModel: _elm_lang$core$Maybe$Just(initModel)
							});
					}));
			var updateBump = A5(
				_panosoft$elm_parent_child_update$ParentChildUpdate$updateChildApp,
				_panosoft$elm_grove$Component_Bump$update(
					_panosoft$elm_grove$Grove_App$bumpCfg(model)),
				_panosoft$elm_grove$Grove_App$update,
				_p45,
				_panosoft$elm_grove$Grove_App$BumpMsg,
				F2(
					function (model, bumpModel) {
						return _elm_lang$core$Native_Utils.update(
							model,
							{
								bumpModel: _elm_lang$core$Maybe$Just(bumpModel)
							});
					}));
			var updateUninstall = A5(
				_panosoft$elm_parent_child_update$ParentChildUpdate$updateChildApp,
				_panosoft$elm_grove$Component_Uninstall$update(
					_panosoft$elm_grove$Grove_App$uninstallCfg(model)),
				_panosoft$elm_grove$Grove_App$update,
				_p49,
				_panosoft$elm_grove$Grove_App$UninstallMsg,
				F2(
					function (model, uninstallModel) {
						return _elm_lang$core$Native_Utils.update(
							model,
							{
								uninstallModel: _elm_lang$core$Maybe$Just(uninstallModel)
							});
					}));
			var updateInstall = A5(
				_panosoft$elm_parent_child_update$ParentChildUpdate$updateChildApp,
				_panosoft$elm_grove$Component_Install$update(
					_panosoft$elm_grove$Grove_App$installCfg(model)),
				_panosoft$elm_grove$Grove_App$update,
				_p48,
				_panosoft$elm_grove$Grove_App$InstallMsg,
				F2(
					function (model, installModel) {
						return _elm_lang$core$Native_Utils.update(
							model,
							{
								installModel: _elm_lang$core$Maybe$Just(installModel)
							});
					}));
			var updateConfig = A5(
				_panosoft$elm_parent_child_update$ParentChildUpdate$updateChildApp,
				_panosoft$elm_grove$Component_Config$update(
					_panosoft$elm_grove$Grove_App$configCfg(model)),
				_panosoft$elm_grove$Grove_App$update,
				_p46,
				_panosoft$elm_grove$Grove_App$ConfigMsg,
				F2(
					function (model, configModel) {
						return _elm_lang$core$Native_Utils.update(
							model,
							{
								configModel: _elm_lang$core$Maybe$Just(configModel)
							});
					}));
			var _p25 = msg;
			switch (_p25.ctor) {
				case 'Nop':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{ctor: '[]'});
				case 'DoCmd':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{
							ctor: '::',
							_0: _p25._0,
							_1: {ctor: '[]'}
						});
				case 'ConfigInitialized':
					var _p28 = _p25._0;
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?'],
						_elm_lang$core$Native_Utils.eq(_p28, 'config'),
						{
							ctor: '_Tuple2',
							_0: function (_p26) {
								var _p27 = _p26;
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									_elm_lang$core$Native_Utils.update(
										model,
										{
											configModel: _elm_lang$core$Maybe$Just(_p27._0)
										}),
									{
										ctor: '::',
										_0: _p27._1,
										_1: {ctor: '[]'}
									});
							}(
								A2(
									_panosoft$elm_grove$Component_Config$configure,
									_panosoft$elm_grove$Grove_App$configCfg(model),
									_p46(model))),
							_1: A2(_panosoft$elm_grove$Grove_App$initCommand, _p28, model)
						});
				case 'InstallInitialized':
					return function (_p29) {
						var _p30 = _p29;
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									installModel: _elm_lang$core$Maybe$Just(_p30._0)
								}),
							{
								ctor: '::',
								_0: _p30._1,
								_1: {ctor: '[]'}
							});
					}(
						A2(
							_panosoft$elm_grove$Component_Install$install,
							_panosoft$elm_grove$Grove_App$installCfg(model),
							_p48(model)));
				case 'UninstallInitialized':
					return function (_p31) {
						var _p32 = _p31;
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									uninstallModel: _elm_lang$core$Maybe$Just(_p32._0)
								}),
							{
								ctor: '::',
								_0: _p32._1,
								_1: {ctor: '[]'}
							});
					}(
						A2(
							_panosoft$elm_grove$Component_Uninstall$uninstall,
							_panosoft$elm_grove$Grove_App$uninstallCfg(model),
							_p49(model)));
				case 'BumpInitialized':
					return function (_p33) {
						var _p34 = _p33;
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									bumpModel: _elm_lang$core$Maybe$Just(_p34._0)
								}),
							{
								ctor: '::',
								_0: _p34._1,
								_1: {ctor: '[]'}
							});
					}(
						A2(
							_panosoft$elm_grove$Component_Bump$bump,
							_panosoft$elm_grove$Grove_App$bumpCfg(model),
							_p45(model)));
				case 'InitInitialized':
					return function (_p35) {
						var _p36 = _p35;
						return A2(
							_elm_lang$core$Platform_Cmd_ops['!'],
							_elm_lang$core$Native_Utils.update(
								model,
								{
									initModel: _elm_lang$core$Maybe$Just(_p36._0)
								}),
							{
								ctor: '::',
								_0: _p36._1,
								_1: {ctor: '[]'}
							});
					}(
						A2(
							_panosoft$elm_grove$Component_Init$initialize,
							_panosoft$elm_grove$Grove_App$initCfg(model),
							_p47(model)));
				case 'DocsGenerated':
					if (_p25._0.ctor === 'Err') {
						return function (cmd) {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								{
									ctor: '::',
									_0: cmd,
									_1: {ctor: '[]'}
								});
						}(
							A2(
								_elm_lang$core$Task$perform,
								function (_p37) {
									return _panosoft$elm_grove$Grove_App$ExitApp(-1);
								},
								_panosoft$elm_grove$Output$errorLog(
									A2(
										_panosoft$elm_string_utils$StringUtils_ops['+-+'],
										'Failed to create Elm Docs Error:',
										_elm_node$core$Node_Error$message(_p25._0._0)))));
					} else {
						return function (cmd) {
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								model,
								{
									ctor: '::',
									_0: cmd,
									_1: {ctor: '[]'}
								});
						}(
							A2(
								_elm_lang$core$Task$perform,
								function (_p38) {
									return _panosoft$elm_grove$Grove_App$ExitApp(0);
								},
								_panosoft$elm_grove$Console$log('Elm Docs created')));
					}
				case 'InstallForUninstall':
					return function (cmd) {
						return function (_p39) {
							var _p40 = _p39;
							return A2(
								_elm_lang$core$Platform_Cmd_ops['!'],
								_p40._0,
								{
									ctor: '::',
									_0: cmd,
									_1: {
										ctor: '::',
										_0: _p40._1,
										_1: {ctor: '[]'}
									}
								});
						}(
							A2(_panosoft$elm_grove$Grove_App$initCommand, 'install', model));
					}(
						A2(
							_elm_lang$core$Task$perform,
							function (_p41) {
								return _panosoft$elm_grove$Grove_App$Nop;
							},
							_panosoft$elm_grove$Console$log('***** Reinstalling remaining packages *****\n')));
				case 'FinishUninstall':
					var _p44 = _p25._0;
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?'],
						!_elm_lang$core$Native_Utils.eq(_p44, 0),
						{
							ctor: '_Tuple2',
							_0: A2(
								_panosoft$elm_grove$Grove_App$update,
								_panosoft$elm_grove$Grove_App$ExitApp(_p44),
								model),
							_1: function (_p42) {
								var _p43 = _p42;
								return A2(
									_elm_lang$core$Platform_Cmd_ops['!'],
									_elm_lang$core$Native_Utils.update(
										model,
										{
											uninstallModel: _elm_lang$core$Maybe$Just(_p43._0)
										}),
									{
										ctor: '::',
										_0: _p43._1,
										_1: {ctor: '[]'}
									});
							}(
								A3(
									_panosoft$elm_grove$Component_Uninstall$installComplete,
									_panosoft$elm_grove$Grove_App$uninstallCfg(model),
									_p49(model),
									_panosoft$elm_grove$Component_Install$getNpmPackages(
										_p48(model))))
						});
				case 'ExitApp':
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						model,
						{
							ctor: '::',
							_0: _panosoft$elm_grove$Grove_App$exitApp(_p25._0),
							_1: {ctor: '[]'}
						});
				case 'ConfigMsg':
					return A2(updateConfig, _p25._0, model);
				case 'InstallMsg':
					return A2(updateInstall, _p25._0, model);
				case 'UninstallMsg':
					return A2(updateUninstall, _p25._0, model);
				case 'BumpMsg':
					return A2(updateBump, _p25._0, model);
				default:
					return A2(updateInit, _p25._0, model);
			}
		}(
			{
				ctor: '_Tuple5',
				_0: function (model) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?!='],
						model.configModel,
						_panosoft$elm_grove$AppUtils$bugMissing('config model'));
				},
				_1: function (model) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?!='],
						model.installModel,
						_panosoft$elm_grove$AppUtils$bugMissing('install model'));
				},
				_2: function (model) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?!='],
						model.uninstallModel,
						_panosoft$elm_grove$AppUtils$bugMissing('uninstall model'));
				},
				_3: function (model) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?!='],
						model.bumpModel,
						_panosoft$elm_grove$AppUtils$bugMissing('bump model'));
				},
				_4: function (model) {
					return A2(
						_panosoft$elm_utils$Utils_Ops_ops['?!='],
						model.initModel,
						_panosoft$elm_grove$AppUtils$bugMissing('init model'));
				}
			});
	});
var _panosoft$elm_grove$Grove_App$main = _elm_lang$core$Platform$programWithFlags(
	{
		init: _panosoft$elm_grove$Grove_App$init,
		update: _panosoft$elm_grove$Grove_App$update,
		subscriptions: _elm_lang$core$Basics$always(_elm_lang$core$Platform_Sub$none)
	})(
	A2(
		_elm_lang$core$Json_Decode$andThen,
		function (command) {
			return A2(
				_elm_lang$core$Json_Decode$andThen,
				function (cwd) {
					return A2(
						_elm_lang$core$Json_Decode$andThen,
						function (elmVersion) {
							return A2(
								_elm_lang$core$Json_Decode$andThen,
								function (options) {
									return A2(
										_elm_lang$core$Json_Decode$andThen,
										function (packages) {
											return A2(
												_elm_lang$core$Json_Decode$andThen,
												function (pathSep) {
													return A2(
														_elm_lang$core$Json_Decode$andThen,
														function (testing) {
															return _elm_lang$core$Json_Decode$succeed(
																{command: command, cwd: cwd, elmVersion: elmVersion, options: options, packages: packages, pathSep: pathSep, testing: testing});
														},
														A2(_elm_lang$core$Json_Decode$field, 'testing', _elm_lang$core$Json_Decode$bool));
												},
												A2(_elm_lang$core$Json_Decode$field, 'pathSep', _elm_lang$core$Json_Decode$string));
										},
										A2(
											_elm_lang$core$Json_Decode$field,
											'packages',
											_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string)));
								},
								A2(
									_elm_lang$core$Json_Decode$field,
									'options',
									A2(
										_elm_lang$core$Json_Decode$andThen,
										function (allowOldDependencies) {
											return A2(
												_elm_lang$core$Json_Decode$andThen,
												function (allowUncommitted) {
													return A2(
														_elm_lang$core$Json_Decode$andThen,
														function (docs) {
															return A2(
																_elm_lang$core$Json_Decode$andThen,
																function (dryRun) {
																	return A2(
																		_elm_lang$core$Json_Decode$andThen,
																		function (link) {
																			return A2(
																				_elm_lang$core$Json_Decode$andThen,
																				function (local) {
																					return A2(
																						_elm_lang$core$Json_Decode$andThen,
																						function (major) {
																							return A2(
																								_elm_lang$core$Json_Decode$andThen,
																								function (minor) {
																									return A2(
																										_elm_lang$core$Json_Decode$andThen,
																										function (noRewrite) {
																											return A2(
																												_elm_lang$core$Json_Decode$andThen,
																												function (npmProduction) {
																													return A2(
																														_elm_lang$core$Json_Decode$andThen,
																														function (npmSilent) {
																															return A2(
																																_elm_lang$core$Json_Decode$andThen,
																																function (patch) {
																																	return A2(
																																		_elm_lang$core$Json_Decode$andThen,
																																		function (safe) {
																																			return _elm_lang$core$Json_Decode$succeed(
																																				{allowOldDependencies: allowOldDependencies, allowUncommitted: allowUncommitted, docs: docs, dryRun: dryRun, link: link, local: local, major: major, minor: minor, noRewrite: noRewrite, npmProduction: npmProduction, npmSilent: npmSilent, patch: patch, safe: safe});
																																		},
																																		A2(
																																			_elm_lang$core$Json_Decode$field,
																																			'safe',
																																			_elm_lang$core$Json_Decode$oneOf(
																																				{
																																					ctor: '::',
																																					_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
																																					_1: {
																																						ctor: '::',
																																						_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, _elm_lang$core$Json_Decode$string),
																																						_1: {ctor: '[]'}
																																					}
																																				})));
																																},
																																A2(_elm_lang$core$Json_Decode$field, 'patch', _elm_lang$core$Json_Decode$bool));
																														},
																														A2(_elm_lang$core$Json_Decode$field, 'npmSilent', _elm_lang$core$Json_Decode$bool));
																												},
																												A2(_elm_lang$core$Json_Decode$field, 'npmProduction', _elm_lang$core$Json_Decode$bool));
																										},
																										A2(_elm_lang$core$Json_Decode$field, 'noRewrite', _elm_lang$core$Json_Decode$bool));
																								},
																								A2(_elm_lang$core$Json_Decode$field, 'minor', _elm_lang$core$Json_Decode$bool));
																						},
																						A2(_elm_lang$core$Json_Decode$field, 'major', _elm_lang$core$Json_Decode$bool));
																				},
																				A2(
																					_elm_lang$core$Json_Decode$field,
																					'local',
																					_elm_lang$core$Json_Decode$oneOf(
																						{
																							ctor: '::',
																							_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
																							_1: {
																								ctor: '::',
																								_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, _elm_lang$core$Json_Decode$bool),
																								_1: {ctor: '[]'}
																							}
																						})));
																		},
																		A2(_elm_lang$core$Json_Decode$field, 'link', _elm_lang$core$Json_Decode$bool));
																},
																A2(_elm_lang$core$Json_Decode$field, 'dryRun', _elm_lang$core$Json_Decode$bool));
														},
														A2(
															_elm_lang$core$Json_Decode$field,
															'docs',
															_elm_lang$core$Json_Decode$oneOf(
																{
																	ctor: '::',
																	_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
																	_1: {
																		ctor: '::',
																		_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, _elm_lang$core$Json_Decode$string),
																		_1: {ctor: '[]'}
																	}
																})));
												},
												A2(_elm_lang$core$Json_Decode$field, 'allowUncommitted', _elm_lang$core$Json_Decode$bool));
										},
										A2(_elm_lang$core$Json_Decode$field, 'allowOldDependencies', _elm_lang$core$Json_Decode$bool))));
						},
						A2(_elm_lang$core$Json_Decode$field, 'elmVersion', _elm_lang$core$Json_Decode$int));
				},
				A2(_elm_lang$core$Json_Decode$field, 'cwd', _elm_lang$core$Json_Decode$string));
		},
		A2(_elm_lang$core$Json_Decode$field, 'command', _elm_lang$core$Json_Decode$string)));

var Elm = {};
Elm['Grove'] = Elm['Grove'] || {};
Elm['Grove']['App'] = Elm['Grove']['App'] || {};
if (typeof _panosoft$elm_grove$Grove_App$main !== 'undefined') {
    _panosoft$elm_grove$Grove_App$main(Elm['Grove']['App'], 'Grove.App', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

