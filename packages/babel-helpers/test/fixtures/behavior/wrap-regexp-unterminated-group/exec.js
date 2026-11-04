// Substitution strings with many unterminated "$<" group references must
// be handled in linear time instead of causing catastrophic backtracking
// (CVE-2025-27789).

function replaceTimed(replacement) {
  var re = HELPER_WRAP_REGEXP("(foo)", { group: 1 });
  var start = Date.now();
  var result = re[Symbol.replace]("foofoo", replacement);
  expect(Date.now() - start).toBeLessThan(2000);
  return result;
}

// unterminated references are kept as-is
var replacement = "$<".repeat(1e5) + "group";
expect(replaceTimed(replacement)).toBe(replacement + "foo");

replacement = "$<g".repeat(1e5) + "group";
expect(replaceTimed(replacement)).toBe(replacement + "foo");

// a terminated reference to an unknown group is replaced with nothing
expect(replaceTimed("$<".repeat(1e5) + "group>")).toBe("foo");
expect(replaceTimed("$<g".repeat(1e5) + "group>")).toBe("foo");

// a short unterminated reference is left untouched
expect(replaceTimed("[$<group")).toBe("[$<groupfoo");
