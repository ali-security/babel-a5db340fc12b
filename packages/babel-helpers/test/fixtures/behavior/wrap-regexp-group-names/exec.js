// Group references in substitution strings only resolve to the group
// indexes registered for the regexp; unknown names and names inherited
// from Object.prototype are replaced with nothing.

function replace(groups, replacement) {
  var re = HELPER_WRAP_REGEXP("(foo)", groups);
  return re[Symbol.replace]("foobar", replacement);
}

// known groups
expect(replace({ _$: 1 }, "$<_$>$<_$>")).toBe("foofoobar");
expect(replace({ hasOwnProperty: 1 }, "$<hasOwnProperty>")).toBe("foobar");
expect(replace({ ["__proto__"]: 1 }, "$<__proto__>")).toBe("foobar");

// unknown groups
expect(replace({ group: 1 }, "$<UNKNOWN>")).toBe("bar");
expect(replace({ group: 1 }, "$<hasOwnProperty>")).toBe("bar");
expect(replace({ group: 1 }, "$<__proto__>")).toBe("bar");
expect(replace({ group: 1 }, "$<toString>$<constructor>")).toBe("bar");
