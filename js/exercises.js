/* ============================================================
   exercises.js — Generadors d'exercicis aleatoris per practicar
   Càlcul (1r Parcial, Enginyeria Informàtica UAB).
   Cada generador retorna un objecte amb:
     { type, prompt (latex), ...dades necessàries per corregir }
   ============================================================ */

const Gen = (function () {

  function ri(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function rsign() { return Math.random() < 0.5 ? 1 : -1; }
  function rNonZero(min, max) { let v; do { v = ri(min, max); } while (v === 0); return v; }
  function choice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function fmtSigned(n) { return n >= 0 ? "+ " + n : "- " + Math.abs(n); }
  function fact(n) { let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; }

  // --- helpers de formatació LaTeX per evitar "1x", "x^{1}", "x^{0}", "1e^{...}" ---
  function cf(n) { if (n === 1) return ""; if (n === -1) return "-"; return String(n); } // prefix coeficient
  function cx(n) { if (n === 1) return "x"; if (n === -1) return "-x"; return `${n}x`; } // "n·x"
  function lin(a, b) { // "a x + b" (b pot ser 0 -> s'omet)
    let s = cx(a);
    if (b !== 0) s += ` ${fmtSigned(b)}`;
    return s;
  }
  function pw(base, exp) { // base^{exp} simplificant exp=0,1
    if (exp === 0) return "1";
    if (exp === 1) return base;
    return `${base}^{${exp}}`;
  }
  function onePlus(a) { // "1 + a x" amb signe correcte
    if (a === 0) return "1";
    return `1 ${a >= 0 ? "+" : "-"} ${Math.abs(a) === 1 ? "" : Math.abs(a)}x`;
  }
  function mulCoef(n, sym) { if (n === 1) return sym; return `${n}\\cdot ${sym}`; }

  /* ---------------- DERIVADES ---------------- */
  const derivativeTemplates = [
    // D1: potència + lineal
    function () {
      const a = ri(2, 6), n = ri(3, 5), signB = rsign(), b = ri(2, 6);
      return {
        latex: `f(x) = ${a}x^{${n}} ${signB > 0 ? "+" : "-"} ${b}x`,
        refFn: x => a * n * Math.pow(x, n - 1) + signB * b,
        solutionLatex: `f'(x) = ${a * n}x^{${n - 1}} ${signB > 0 ? "+" : "-"} ${b}`,
        samples: [0.5, 1, 1.7, -0.6, 2.2],
        hint: "Regla de la potència terme a terme: (x^n)' = n x^{n-1}."
      };
    },
    // D2: cadena amb potència
    function () {
      const a = ri(2, 4), b = rNonZero(-5, 5), n = ri(2, 4);
      const base = `(${a}x ${fmtSigned(b)})`;
      return {
        latex: `f(x) = ${base}^{${n}}`,
        refFn: x => n * a * Math.pow(a * x + b, n - 1),
        solutionLatex: `f'(x) = ${n * a}${pw(base, n - 1)}`,
        samples: [0.3, 0.9, 1.6, -0.4, 2.1],
        hint: "Regla de la cadena: [g(x)^n]' = n·g(x)^{n-1}·g'(x)."
      };
    },
    // D3: exponencial
    function () {
      const a = rNonZero(-4, 4), b = ri(-4, 4);
      const arg = `${cx(a)} ${fmtSigned(b)}`;
      return {
        latex: `f(x) = e^{${arg}}`,
        refFn: x => a * Math.exp(a * x + b),
        solutionLatex: `f'(x) = ${cf(a)}e^{${arg}}`,
        samples: [0.2, 0.6, -0.3, 1.1, -0.8],
        hint: "(e^{g(x)})' = g'(x)·e^{g(x)}."
      };
    },
    // D4: logaritme
    function () {
      const a = ri(1, 4), b = ri(1, 6);
      return {
        latex: `f(x) = \\ln(${lin(a, b)})`,
        refFn: x => a / (a * x + b),
        solutionLatex: `f'(x) = \\dfrac{${a}}{${lin(a, b)}}`,
        samples: [0, 0.4, 1, 2, 3.5],
        hint: "(ln(g(x)))' = g'(x)/g(x)."
      };
    },
    // D5: sinus
    function () {
      const a = ri(1, 4);
      return {
        latex: `f(x) = \\sin(${cx(a)})`,
        refFn: x => a * Math.cos(a * x),
        solutionLatex: `f'(x) = ${cf(a)}\\cos(${cx(a)})`,
        samples: [0.2, 0.5, -0.4, 1.0, -1.2],
        hint: "(sin(g(x)))' = g'(x)·cos(g(x))."
      };
    },
    // D6: cosinus
    function () {
      const a = ri(1, 4);
      return {
        latex: `f(x) = \\cos(${cx(a)})`,
        refFn: x => -a * Math.sin(a * x),
        solutionLatex: `f'(x) = -${cf(a)}\\sin(${cx(a)})`,
        samples: [0.2, 0.5, -0.4, 1.0, -1.2],
        hint: "(cos(g(x)))' = -g'(x)·sin(g(x))."
      };
    },
    // D7: producte x^n * e^{ax}
    function () {
      const n = ri(2, 3), a = rNonZero(-3, 3);
      const sign2 = a < 0 ? "-" : "+";
      const term2 = `${Math.abs(a) === 1 ? "" : Math.abs(a)}${pw("x", n)}`;
      return {
        latex: `f(x) = x^{${n}} e^{${cx(a)}}`,
        refFn: x => Math.exp(a * x) * (n * Math.pow(x, n - 1) + a * Math.pow(x, n)),
        solutionLatex: `f'(x) = e^{${cx(a)}}\\left(${n}${pw("x", n - 1)} ${sign2} ${term2}\\right)`,
        samples: [0.5, 1, 1.5, -0.5, -1],
        hint: "Regla del producte: (uv)' = u'v + uv'."
      };
    },
    // D8: quocient lineal/lineal
    function () {
      let a, b, c, d, det;
      do {
        a = ri(1, 5); b = ri(-5, 5); c = ri(1, 5); d = ri(-5, 5);
        det = a * d - b * c;
      } while (det === 0);
      const den = lin(c, d);
      return {
        latex: `f(x) = \\dfrac{${lin(a, b)}}{${den}}`,
        refFn: x => det / Math.pow(c * x + d, 2),
        solutionLatex: `f'(x) = \\dfrac{${det}}{(${den})^{2}}`,
        samples: [0.15, 0.55, 1.25, -0.35, 2.05],
        hint: "Regla del quocient: (u/v)' = (u'v - uv')/v²."
      };
    },
    // D9: arrel
    function () {
      const a = ri(1, 5), b = ri(1, 8);
      return {
        latex: `f(x) = \\sqrt{${lin(a, b)}}`,
        refFn: x => a / (2 * Math.sqrt(a * x + b)),
        solutionLatex: `f'(x) = \\dfrac{${a}}{2\\sqrt{${lin(a, b)}}}`,
        samples: [0, 0.3, 0.9, 1.6, 2.4],
        hint: "(sqrt(g(x)))' = g'(x)/(2·sqrt(g(x)))."
      };
    },
    // D10: arctan
    function () {
      const a = ri(1, 4), aa = a * a;
      return {
        latex: `f(x) = \\arctan(${cx(a)})`,
        refFn: x => a / (1 + Math.pow(a * x, 2)),
        solutionLatex: `f'(x) = \\dfrac{${a}}{1 + ${cf(aa)}x^{2}}`,
        samples: [0.2, 0.6, -0.5, 1.1, -1.3],
        hint: "(arctan(g(x)))' = g'(x)/(1+g(x)^2)."
      };
    },
    // D11: ln(x)*x^n
    function () {
      const n = ri(2, 3);
      return {
        latex: `f(x) = \\ln(x)\\,x^{${n}}`,
        refFn: x => Math.pow(x, n - 1) * (1 + n * Math.log(x)),
        solutionLatex: `f'(x) = ${pw("x", n - 1)}\\left(1 + ${n}\\ln x\\right)`,
        samples: [0.4, 0.8, 1.3, 2, 3],
        hint: "Regla del producte amb (ln x)' = 1/x."
      };
    },
    // D12: tangent
    function () {
      const a = ri(1, 3);
      return {
        latex: `f(x) = \\tan(${cx(a)})`,
        refFn: x => a / Math.pow(Math.cos(a * x), 2),
        solutionLatex: `f'(x) = \\dfrac{${a}}{\\cos^{2}(${cx(a)})}`,
        samples: [0.1, 0.2, -0.15, 0.25, -0.2],
        hint: "(tan(g(x)))' = g'(x)/cos²(g(x))."
      };
    }
  ];

  function derivative() {
    const t = choice(derivativeTemplates)();
    return {
      kind: "derivative",
      promptLatex: t.latex,
      instructions: "Escriu f'(x) (pots usar x, +,-,*,/,^, sin, cos, tan, exp, ln, sqrt...).",
      checker: (userInput) => MathParser.checkFunction(userInput, t.refFn, t.samples),
      solutionLatex: t.solutionLatex,
      hint: t.hint
    };
  }

  /* ---------------- LÍMITS ---------------- */
  const limitTemplates = [
    function () {
      const a = ri(1, 5), b = ri(1, 5);
      return { latex: `\\lim_{x\\to 0} \\dfrac{\\sin(${cx(a)})}{${cx(b)}}`, value: a / b, hint: "Equivalent a a/b (límit fonamental sin(t)/t → 1)." };
    },
    function () {
      const a = ri(1, 4);
      return { latex: `\\lim_{x\\to 0} \\dfrac{1-\\cos(${cx(a)})}{x^{2}}`, value: (a * a) / 2, hint: "Aplica l'Hôpital dues vegades, o l'equivalent 1-cos(t)~t²/2." };
    },
    function () {
      const a = ri(1, 5), b = ri(-5, 5), c = ri(1, 5), d = ri(-5, 5);
      const num = `${cf(a)}x^{2}${b === 0 ? "" : ` ${b > 0 ? "+" : "-"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x`}`;
      const den = `${cf(c)}x^{2} ${fmtSigned(d)}`;
      return { latex: `\\lim_{x\\to \\infty} \\dfrac{${num}}{${den}}`, value: a / c, hint: "Divideix numerador i denominador per x², o aplica l'Hôpital dues vegades." };
    },
    function () {
      const a = rNonZero(-5, 5);
      return { latex: `\\lim_{x\\to 0} \\dfrac{e^{${cx(a)}}-1}{x}`, value: a, hint: "L'Hôpital: deriva numerador i denominador." };
    },
    function () {
      const a = rNonZero(-5, 5);
      return { latex: `\\lim_{x\\to 0} \\dfrac{\\ln(${onePlus(a)})}{x}`, value: a, hint: "L'Hôpital, o l'equivalent ln(1+t) ~ t." };
    },
    function () {
      const a = ri(1, 5);
      return { latex: `\\lim_{x\\to \\infty} x\\sin\\!\\left(\\dfrac{${a}}{x}\\right)`, value: a, hint: "Canvia t=1/x i aplica l'Hôpital a sin(at)/t." };
    },
    function () {
      const a = ri(2, 5);
      return { latex: `\\lim_{x\\to 1} \\dfrac{x^{${a}}-1}{x-1}`, value: a, hint: "L'Hôpital, o factoritza x^a - 1 = (x-1)(x^{a-1}+...+1)." };
    },
    function () {
      const a = ri(1, 4);
      return { latex: `\\lim_{x\\to \\infty} \\left(1+\\dfrac{${a}}{x}\\right)^{x}`, value: Math.exp(a), hint: "Indeterminació 1^infinit: escriu-ho com e^(x·ln(1+a/x)) i fes l'Hôpital a l'exponent." };
    },
    function () {
      const a = ri(1, 5), b = ri(1, 5);
      return { latex: `\\lim_{x\\to 0} \\dfrac{\\tan(${cx(a)})}{${cx(b)}}`, value: a / b, hint: "tan(t)/t → 1, igual que amb el sinus." };
    },
    function () {
      const a = ri(1, 4);
      return { latex: `\\lim_{x\\to 0} \\dfrac{${cx(a)} - \\sin(${cx(a)})}{x^{3}}`, value: Math.pow(a, 3) / 6, hint: "Cal aplicar l'Hôpital tres vegades (indeterminació 0/0 repetida)." };
    }
  ];

  function limit() {
    const t = choice(limitTemplates)();
    return {
      kind: "limit",
      promptLatex: t.latex,
      instructions: "Escriu el valor del límit (admet expressions com e^2, ln(3), sqrt(2)...).",
      checker: (userInput) => MathParser.checkNumber(userInput, t.value, { tol: Math.max(1e-2, Math.abs(t.value) * 0.02) }),
      solutionLatex: `= ${t.value.toFixed(4)}`,
      hint: t.hint
    };
  }

  /* ---------------- EQUACIONS EXPONENCIALS I LOGARÍTMIQUES ---------------- */
  function equation() {
    const kind = ri(1, 4);
    let latex, value, hint;
    if (kind === 1) {
      const t0 = ri(2, 5), k = ri(1, 2), a = ri(1, 3), m = ri(1, 3);
      const b = m * t0, c = a * t0 - m;
      const kx = k === 1 ? "x" : `${k}x`;
      latex = `${cf(a)}e^{${kx}} - ${b}e^{-${kx}} = ${c}`;
      value = Math.log(t0) / k;
      hint = `Fes el canvi t=e^(${kx}). Queda ${cf(a)}t - ${b}/t = ${c}, és a dir ${cf(a)}t^2 - ${c}t - ${b}=0.`;
    } else if (kind === 2) {
      const b = ri(1, 4), x0 = ri(b + 1, b + 6), N = x0 * (x0 - b);
      latex = `\\ln(x) + \\ln(x-${b}) = \\ln(${N})`;
      value = x0;
      hint = `ln(x)+ln(x-${b}) = ln(x(x-${b})). Resol x(x-${b})=${N} i descarta l'arrel negativa.`;
    } else if (kind === 3) {
      const a = ri(2, 4), x0 = ri(1, 4), b = Math.pow(a, x0);
      latex = `${a}^{x} = ${b}`;
      value = x0;
      hint = `x = log base ${a} de ${b}. Pots escriure-ho com log(${a},${b}) a la caixa de resposta.`;
    } else {
      const t0 = ri(2, 5), a = ri(1, 3), m = ri(1, 3);
      const b = m * t0, c = a * t0 - m;
      latex = `${mulCoef(a, "10^{x}")} - ${mulCoef(b, "10^{-x}")} = ${c}`;
      value = Math.log10(t0);
      hint = `Canvi t=10^x. Queda ${cf(a)}t - ${b}/t = ${c}, és a dir ${cf(a)}t^2-${c}t-${b}=0.`;
    }
    return {
      kind: "equation",
      promptLatex: latex,
      instructions: "Dona el valor de x (expressions com ln(3)/2 o log(2,8) són vàlides).",
      checker: (userInput) => MathParser.checkNumber(userInput, value, { tol: Math.max(1e-3, Math.abs(value) * 0.01) }),
      solutionLatex: `x = ${value.toFixed(4)}`,
      hint
    };
  }

  /* ---------------- TAYLOR: VALOR DEL POLINOMI ---------------- */
  const taylorFamilies = {
    exp: { name: "e^x", coeff: k => 1 / fact(k) },
    sin: { name: "\\sin x", coeff: k => (k % 2 === 0) ? 0 : (Math.pow(-1, (k - 1) / 2) / fact(k)) },
    cos: { name: "\\cos x", coeff: k => (k % 2 !== 0) ? 0 : (Math.pow(-1, k / 2) / fact(k)) },
    ln1px: { name: "\\ln(1+x)", coeff: k => (k === 0) ? 0 : (Math.pow(-1, k - 1) / k) },
    geom: { name: "\\dfrac{1}{1-x}", coeff: k => 1 },
    geomAlt: { name: "\\dfrac{1}{1+x}", coeff: k => Math.pow(-1, k) }
  };

  function taylorValue() {
    const keys = Object.keys(taylorFamilies);
    const famKey = choice(keys);
    const fam = taylorFamilies[famKey];
    const n = ri(3, 6);
    const xs = (famKey === "ln1px" || famKey === "geom" || famKey === "geomAlt")
      ? [0.5, -0.4, 0.3, -0.3, 0.6] : [0.5, -0.5, 1, -1, 0.8, -0.8];
    const x = choice(xs);
    let val = 0;
    for (let k = 0; k <= n; k++) val += fam.coeff(k) * Math.pow(x, k);
    return {
      kind: "taylor",
      promptLatex: `$P_{${n}}(x)$ és el polinomi de Taylor de grau $${n}$ de $f(x)=${fam.name}$ centrat en $a=0$. Calculeu $P_{${n}}(${x})$.`,
      instructions: "Dona el valor numèric del polinomi avaluat en aquest punt.",
      checker: (userInput) => MathParser.checkNumber(userInput, val, { tol: Math.max(1e-3, Math.abs(val) * 0.02) }),
      solutionLatex: `P_{${n}}(${x}) \\approx ${val.toFixed(6)}`,
      hint: `P_n(x) = suma per k=0..${n} de [f^(k)(0)/k!]·x^k. Suma els termes fins a grau ${n}.`
    };
  }

  /* ---------------- TAYLOR: FITA DE L'ERROR ---------------- */
  function taylorError() {
    const family = choice(["exp", "trig"]);
    const n = ri(3, 6);
    let x0, M, fname;
    if (family === "exp") {
      x0 = choice([0.5, 1, 1.5, 2]);
      M = Math.exp(x0);
      fname = "e^x";
    } else {
      x0 = choice([0.2, 0.3, 0.4, 0.5]);
      M = 1;
      fname = choice(["\\sin x", "\\cos x"]);
    }
    const bound = (M / fact(n + 1)) * Math.pow(Math.abs(x0), n + 1);
    return {
      kind: "taylorError",
      promptLatex: `Fiteu l'error $|R_{${n}}(x)|$ en aproximar $f(x)=${fname}$ pel seu polinomi de Taylor de grau $${n}$ centrat en $a=0$, en $x=${x0}$ (forma de Lagrange${family === "exp" ? `, amb $M=e^{${x0}}$` : ", amb $M=1$"}).`,
      instructions: "Dona el valor numèric de la fita de l'error.",
      checker: (userInput) => MathParser.checkNumber(userInput, bound, { tol: Math.max(1e-5, bound * 0.05) }),
      solutionLatex: `|R_{${n}}(${x0})| \\le \\dfrac{M}{(${n}+1)!}|${x0}|^{${n + 1}} \\approx ${bound.toExponential(4)}`,
      hint: `|R_n(x)| ≤ [M/(n+1)!]·|x-c|^(n+1), amb M = màxim de |f^(n+1)(t)| a l'interval.`
    };
  }

  /* ---------------- INTERPOLACIÓ POLINOMIAL ---------------- */
  function newtonDividedDiff(xs, ys) {
    const n = xs.length;
    let table = [ys.slice()];
    for (let lvl = 1; lvl < n; lvl++) {
      const prev = table[lvl - 1], cur = [];
      for (let i = 0; i < prev.length - 1; i++) {
        cur.push((prev[i + 1] - prev[i]) / (xs[i + lvl] - xs[i]));
      }
      table.push(cur);
    }
    return table.map(row => row[0]);
  }
  function evalNewton(xs, coeffs, x) {
    let result = coeffs[0], prod = 1;
    for (let k = 1; k < coeffs.length; k++) {
      prod *= (x - xs[k - 1]);
      result += coeffs[k] * prod;
    }
    return result;
  }

  function interpolation() {
    const m = choice([3, 4]);
    const pool = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
    const xs = [];
    while (xs.length < m) {
      const c = choice(pool);
      if (!xs.includes(c)) xs.push(c);
    }
    xs.sort((a, b) => a - b);
    const ys = xs.map(() => ri(-6, 6));
    const coeffs = newtonDividedDiff(xs, ys);
    let targetX;
    do { targetX = choice([-2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5]); } while (xs.includes(targetX));
    const val = evalNewton(xs, coeffs, targetX);
    const tableStr = xs.map((xi, i) => `x_{${i}}=${xi},\\ y_{${i}}=${ys[i]}`).join("\\quad ");
    return {
      kind: "interpolation",
      promptLatex: `Donada la taula de punts $(${tableStr})$, calculeu el valor del polinomi interpolador en $x=${targetX}$.`,
      instructions: "Fes servir el mètode de Newton o de Lagrange i dona el valor numèric de p(x) en aquest punt.",
      checker: (userInput) => MathParser.checkNumber(userInput, val, { tol: Math.max(1e-2, Math.abs(val) * 0.02) }),
      solutionLatex: `p(${targetX}) \\approx ${val.toFixed(4)}`,
      hint: "Amb Newton: p(x) = f[x_0] + f[x_0,x_1](x-x_0) + f[x_0,x_1,x_2](x-x_0)(x-x_1) + ..."
    };
  }

  /* ---------------- ASÍMPTOTES (resposta de dos valors: m i n) ---------------- */
  function asymptote() {
    let a, b, c, d;
    do {
      a = ri(1, 4); b = ri(-6, 6); c = ri(-6, 6); d = rNonZero(-4, 4);
    } while (a * d * d + b * d + c === 0);
    const m = a, n = b + a * d;
    const num = `${cf(a)}x^{2}${b === 0 ? "" : ` ${b > 0 ? "+" : "-"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}x`}${c === 0 ? "" : ` ${fmtSigned(c)}`}`;
    const den = lin(1, -d);
    return {
      kind: "asymptote",
      promptLatex: `f(x) = \\dfrac{${num}}{${den}}`,
      instructions: "Dona el pendent m i el terme n de l'asímptota obliqua y = mx + n.",
      fields: [
        { label: "m =", checker: num0(m, 0.05) },
        { label: "n =", checker: num0(n, 0.05) }
      ],
      solutionLatex: `y = ${cx(m)} ${fmtSigned(n)} \\qquad \\text{(asímptota vertical a } x=${d}\\text{)}`,
      hint: "Divideix el numerador pel denominador: f(x) = mx + n + (residu)/(x-d)."
    };
  }

  /* ---------------- Helpers de correcció ---------------- */
  function num0(value, tol) {
    const fn = (s) => MathParser.checkNumber(s, value, { tol: tol !== undefined ? tol : Math.max(1e-3, Math.abs(value) * 0.01) });
    fn.value = value;
    return fn;
  }
  // Llista de valors separats per ";" (l'ordre no importa)
  function listChecker(values, tol) {
    const fn = (s) => {
      const parts = s.split(";").map(p => p.trim()).filter(p => p !== "");
      if (parts.length !== values.length) {
        return { ok: false, error: `cal donar ${values.length} valor${values.length > 1 ? "s" : ""} separats per ";"` };
      }
      const nums = [];
      for (const p of parts) {
        try { nums.push(MathParser.compile(p)(0)); } catch (e) { return { ok: false, error: e.message }; }
      }
      const left = values.slice();
      for (const v of nums) {
        const i = left.findIndex(w => Math.abs(w - v) <= (tol || Math.max(1e-3, Math.abs(w) * 0.01)));
        if (i < 0) return { ok: false };
        left.splice(i, 1);
      }
      return { ok: true };
    };
    fn.values = values;
    return fn;
  }
  function fmtNum(v, d) { return Number(v.toFixed(d === undefined ? 4 : d)).toString(); }
  function frac(p, q) { // fracció simplificada en LaTeX
    const g = (a, b) => b === 0 ? Math.abs(a) : g(b, a % b);
    const k = g(p, q) || 1; let n = p / k, m = q / k;
    if (m < 0) { n = -n; m = -m; }
    if (m === 1) return String(n);
    return `${n < 0 ? "-" : ""}\\tfrac{${Math.abs(n)}}{${m}}`;
  }

  /* ---------------- EQUACIONS EXPONENCIALS QUADRÀTIQUES (tipus examen 2023/2024) ---------------- */
  function expQuadratic() {
    const k = choice([1, 2]);
    const ekx = k === 1 ? "e^{x}" : "e^{2x}";
    let latex, roots, hint, solution;
    if (Math.random() < 0.6) {
      // e^{2kx} - S e^{kx} + P = 0 amb arrels t1, t2
      let t1, t2;
      do { t1 = ri(1, 6); t2 = choice([ri(1, 6), -ri(1, 4)]); } while (t1 === t2);
      const S = t1 + t2, P = t1 * t2;
      const e2 = k === 1 ? "e^{2x}" : "e^{4x}";
      latex = `${e2} ${S === 0 ? "" : (S > 0 ? "- " : "+ ") + (Math.abs(S) === 1 ? "" : Math.abs(S)) + ekx} ${P === 0 ? "" : fmtSigned(P)} = 0`;
      const ts = [t1, t2].filter(t => t > 0);
      roots = ts.map(t => Math.log(t) / k);
      hint = `Canvi t = ${k === 1 ? "e^x" : "e^(2x)"}: queda t² ${S >= 0 ? "-" : "+"} ${Math.abs(S)}t ${P >= 0 ? "+" : "-"} ${Math.abs(P)} = 0. Descarta les t ≤ 0.`;
      solution = `t=${t1},\\ t=${t2}${ts.length < 2 ? "\\ (\\text{descartada } t\\le 0)" : ""} \\Rightarrow ` +
        ts.map(t => t === 1 ? "x=0" : `x=${k === 1 ? `\\ln ${t}` : `\\tfrac{\\ln ${t}}{2}`}`).join(",\\ ");
    } else {
      // a e^{kx} - b e^{-kx} = c  (tipus Abril 2023: e^{2x} - 6e^{-2x} = -1)
      let t1, t2;
      do { t1 = ri(1, 5); t2 = -ri(1, 5); } while (t1 === -t2);
      // t^2 - (t1+t2) t + t1 t2 = 0  <=>  t - (t1 t2)(-1)/t ... => e^{kx} + (t1 t2) e^{-kx} = t1 + t2
      const c = t1 + t2, b = -t1 * t2;
      latex = `${ekx} - ${cf(b)}e^{-${k === 1 ? "" : "2"}x} = ${c}`;
      roots = [Math.log(t1) / k];
      hint = `Multiplica per ${k === 1 ? "e^x" : "e^(2x)"} i fes t = ${k === 1 ? "e^x" : "e^(2x)"}: t² ${c >= 0 ? "-" : "+"} ${Math.abs(c)}t - ${b} = 0.`;
      solution = `t^2 ${c === 0 ? "" : (c > 0 ? "-" : "+") + (Math.abs(c) === 1 ? "" : Math.abs(c)) + "t"} - ${b} = 0 \\Rightarrow t=${t1},\\ t=${t2}\\ (\\text{descartada}) \\Rightarrow ${t1 === 1 ? "x=0" : `x=${k === 1 ? `\\ln ${t1}` : `\\tfrac{\\ln ${t1}}{2}`}`}`;
    }
    return {
      kind: "expQuadratic",
      promptLatex: `Trobeu totes les solucions de $${latex}$.`,
      instructions: "Escriu totes les solucions separades per ; (p. ex. ln(2)/2; ln(3)/2).",
      checker: listChecker(roots),
      solutionLatex: solution,
      hint
    };
  }

  /* ---------------- INEQUACIONS (tipus Abril 2024: x²+1 < x+3) ---------------- */
  function inequality() {
    let r1, r2;
    do { r1 = ri(-5, 4); r2 = ri(-4, 6); } while (r1 >= r2);
    // x² - (r1+r2)x + r1 r2 < 0  repartit en dos costats
    const S = r1 + r2, P = r1 * r2;
    const p = ri(-3, 3), q = ri(-4, 6);           // terme que afegim a tots dos costats
    const lhsB = -S + p, lhsC = P + q;
    const lhs = `x^{2}${lhsB === 0 ? "" : ` ${lhsB > 0 ? "+" : "-"} ${Math.abs(lhsB) === 1 ? "" : Math.abs(lhsB)}x`}${lhsC === 0 ? "" : ` ${fmtSigned(lhsC)}`}`;
    const rhs = p === 0 ? String(q) : `${cx(p)}${q === 0 ? "" : ` ${fmtSigned(q)}`}`;
    return {
      kind: "inequality",
      promptLatex: `Trobeu tots els valors de $x$ tals que $${lhs} \\lt ${rhs}$. La solució és un interval $(a,b)$.`,
      instructions: "Dona els extrems de l'interval solució (a, b).",
      fields: [
        { label: "a =", checker: num0(r1, 0.01) },
        { label: "b =", checker: num0(r2, 0.01) }
      ],
      solutionLatex: `x^2 ${S === 0 ? "" : (S > 0 ? "-" : "+") + (Math.abs(S) === 1 ? "" : Math.abs(S)) + "x"} ${P === 0 ? "" : fmtSigned(P)} \\lt 0 \\iff (x-(${r1}))(x-(${r2}))\\lt 0 \\iff x\\in(${r1},${r2})`,
      hint: "Passa-ho tot a un costat, troba les arrels de la quadràtica i mira el signe: una paràbola amb coeficient positiu és negativa ENTRE les arrels."
    };
  }

  /* ---------------- RECTA TANGENT ---------------- */
  const tangentTemplates = [
    function () { // ln(c + x²)  (Abril 2024: ln(1+x²) en x=-2;  2021: ln(x²+1) en x=-1)
      const c = choice([1, 1, 2, 3]), a = rNonZero(-3, 3);
      const fa = Math.log(c + a * a), m = 2 * a / (c + a * a);
      return { latex: `f(x)=\\ln(${c === 1 ? "1+x^{2}" : `${c}+x^{2}`})`, a, fa, m,
        faTex: `\\ln ${c + a * a}`, mTex: frac(2 * a, c + a * a) };
    },
    function () { // x² e^{kx} en x=1 o x=-1
      const k = rNonZero(-2, 2), a = choice([1, -1]);
      const fa = a * a * Math.exp(k * a), m = (2 * a + k * a * a) * Math.exp(k * a);
      return { latex: `f(x)=x^{2}e^{${cx(k)}}`, a, fa, m,
        faTex: `e^{${k * a}}`, mTex: `${2 * a + k * a * a}e^{${k * a}}` };
    },
    function () { // sqrt(p x + q) en un punt on p a + q és quadrat perfecte
      const s = ri(1, 4), p = ri(1, 4), a = ri(-2, 3), q = s * s - p * a;
      return { latex: `f(x)=\\sqrt{${lin(p, q)}}`, a, fa: s, m: p / (2 * s),
        faTex: String(s), mTex: frac(p, 2 * s) };
    },
    function () { // (cos(k x) + 1)^2 en x = 0  i  sin(kx)+x
      const k = ri(1, 4);
      if (Math.random() < 0.5) {
        return { latex: `f(x)=(\\cos(${cx(k)})+1)^{2}`, a: 0, fa: 4, m: 0, faTex: "4", mTex: "0" };
      }
      return { latex: `f(x)=\\sin(${cx(k)})+x`, a: 0, fa: 0, m: k + 1, faTex: "0", mTex: String(k + 1) };
    },
    function () { // x ln x en x = e^j
      const j = ri(0, 2);
      const a = Math.exp(j);
      return { latex: `f(x)=x\\ln x`, aTex: j === 0 ? "1" : (j === 1 ? "e" : "e^{2}"), a, fa: j * a, m: j + 1,
        faTex: j === 0 ? "0" : (j === 1 ? "e" : "2e^{2}"), mTex: String(j + 1) };
    }
  ];
  function tangent() {
    const t = choice(tangentTemplates)();
    const n = t.fa - t.m * t.a;
    const aTex = t.aTex || String(t.a);
    return {
      kind: "tangent",
      promptLatex: `Doneu l'equació de la recta tangent a la gràfica de $${t.latex}$ en el punt $x=${aTex}$, en la forma $y=mx+n$.`,
      instructions: "Dona el pendent m i l'ordenada a l'origen n (pots escriure ln(5), e^2...).",
      fields: [
        { label: "m =", checker: num0(t.m, Math.max(1e-3, Math.abs(t.m) * 0.01)) },
        { label: "n =", checker: num0(n, Math.max(1e-3, Math.abs(n) * 0.01)) }
      ],
      solutionLatex: `f(${aTex})=${t.faTex},\\quad f'(${aTex})=${t.mTex} \\;\\Rightarrow\\; y-f(${aTex})=f'(${aTex})(x${t.a < 0 ? `+${-t.a}` : `-${aTex}`}) \\;\\Rightarrow\\; y\\approx ${fmtNum(t.m)}x ${n >= 0 ? "+" : "-"} ${fmtNum(Math.abs(n))}`,
      hint: "Recta tangent: y - f(a) = f'(a)(x - a). Calcula f(a) i f'(a) i desenvolupa."
    };
  }

  /* ---------------- CONTINUÏTAT AMB PARÀMETRE (2025, pregunta 1) ---------------- */
  const continuityTemplates = [
    () => { const a = ri(1, 3); return { tex: `\\dfrac{(\\sin(${pw("x", a)}))^{2}}{${pw("x", 2 * a)}}`, k: 1, why: "sin(t)/t → 1, i aquí tenim [sin(t)/t]²." }; },
    () => { const a = ri(1, 4), b = ri(1, 4); return { tex: `\\dfrac{\\sin(${cx(a)})}{${cx(b)}}`, k: a / b, why: "sin(ax)/(bx) → a/b." }; },
    () => { const a = ri(1, 4); return { tex: `\\dfrac{1-\\cos(${cx(a)})}{x^{2}}`, k: a * a / 2, why: "1 - cos(t) ~ t²/2." }; },
    () => { const a = rNonZero(-4, 4); return { tex: `\\dfrac{e^{${cx(a)}}-1}{x}`, k: a, why: "e^t - 1 ~ t." }; },
    () => { const a = ri(1, 3); return { tex: `\\dfrac{\\ln(1+${pw("x", 2)})}{${cf(a)}x^{2}}`, k: 1 / a, why: "ln(1+t) ~ t." }; }
  ];
  function continuity() {
    const t = choice(continuityTemplates)();
    return {
      kind: "continuity",
      promptLatex: `$$f(x)=\\begin{cases} ${t.tex}, & x\\neq 0\\\\ k, & x=0\\end{cases}$$ Per a quin valor de $k$ la funció és contínua en $x=0$?`,
      instructions: "Dona el valor de k.",
      checker: num0(t.k, 1e-3),
      solutionLatex: `k=\\lim_{x\\to0} f(x) = ${fmtNum(t.k)}`,
      hint: "Contínua en 0 vol dir que f(0) = límit quan x → 0. Calcula el límit (l'Hôpital o infinitèsims equivalents). " + t.why
    };
  }

  /* ---------------- DERIVADA LOGARÍTMICA f(x)^g(x) (Abril 2024, 1c) ---------------- */
  const logDerivTemplates = [
    () => { const p = ri(2, 4), q = ri(1, 4); return { tex: `(${p}+\\sin(${cx(q)}))^{\\cos x}`, x0: "0", x0v: 0, val: q,
      sol: `f'(x)=f(x)\\left[-\\sin x\\,\\ln(${p}+\\sin ${cx(q)})+\\cos x\\,\\dfrac{${q}\\cos ${cx(q)}}{${p}+\\sin ${cx(q)}}\\right],\\ f'(0)=${p}\\cdot\\tfrac{${q}}{${p}}=${q}` }; },
    () => { const a = ri(1, 3); return { tex: "x^{x}", x0: String(a), x0v: a, val: Math.pow(a, a) * (Math.log(a) + 1),
      sol: `f'(x)=x^{x}(\\ln x+1),\\ f'(${a})=${Math.pow(a, a)}(\\ln ${a}+1)` }; },
    () => { const c = ri(1, 3); return { tex: `(${c}+x^{2})^{x}`, x0: "1", x0v: 1, val: (c + 1) * (Math.log(c + 1) + 2 / (c + 1)),
      sol: `f'(x)=(${c}+x^2)^{x}\\left[\\ln(${c}+x^2)+\\dfrac{2x^2}{${c}+x^2}\\right],\\ f'(1)=${c + 1}\\left(\\ln ${c + 1}+\\tfrac{2}{${c + 1}}\\right)` }; },
    () => ({ tex: "x^{\\sin x}", x0: "\\pi/2", x0v: Math.PI / 2, val: 1,
      sol: `f'(x)=x^{\\sin x}\\left[\\cos x\\ln x+\\dfrac{\\sin x}{x}\\right],\\ f'(\\pi/2)=\\tfrac{\\pi}{2}\\cdot\\tfrac{2}{\\pi}=1` })
  ];
  function logDerivative() {
    const t = choice(logDerivTemplates)();
    return {
      kind: "logDerivative",
      promptLatex: `Sigui $f(x)=${t.tex}$. Calculeu $f'(${t.x0})$.`,
      instructions: "Dona el valor numèric de la derivada en aquest punt (pots escriure ln(2), pi...).",
      checker: num0(t.val, Math.max(1e-3, Math.abs(t.val) * 0.01)),
      solutionLatex: t.sol,
      hint: "Derivació logarítmica: ln f = g·ln(base). Deriva tots dos costats: f'/f = g'·ln(base) + g·(base)'/base."
    };
  }

  /* ---------------- MÈTODE DE NEWTON (zeros de funcions, guia docent tema 2) ---------------- */
  const newtonTemplates = [
    () => { const c = choice([2, 3, 5, 7, 10]); const x0 = Math.ceil(Math.sqrt(c));
      return { tex: `x^{2}-${c}`, f: x => x * x - c, df: x => 2 * x, x0, what: `\\sqrt{${c}}` }; },
    () => ({ tex: "x^{3}-2x-5", f: x => x ** 3 - 2 * x - 5, df: x => 3 * x * x - 2, x0: 2 }),
    () => ({ tex: "\\cos x - x", f: x => Math.cos(x) - x, df: x => -Math.sin(x) - 1, x0: 1 }),
    () => ({ tex: "x^{3}+x-1", f: x => x ** 3 + x - 1, df: x => 3 * x * x + 1, x0: 1 }),
    () => ({ tex: "e^{x}+x-2", f: x => Math.exp(x) + x - 2, df: x => Math.exp(x) + 1, x0: 0 }),
    () => ({ tex: "x^{3}-3", f: x => x ** 3 - 3, df: x => 3 * x * x, x0: 1, what: "\\sqrt[3]{3}" })
  ];
  function newton() {
    const t = choice(newtonTemplates)();
    const x1 = t.x0 - t.f(t.x0) / t.df(t.x0);
    const x2 = x1 - t.f(x1) / t.df(x1);
    return {
      kind: "newton",
      promptLatex: `Apliqueu el mètode de Newton a $f(x)=${t.tex}$${t.what ? ` (per aproximar $${t.what}$)` : ""} amb $x_0=${t.x0}$. Calculeu $x_1$ i $x_2$.`,
      instructions: "Dona x1 i x2 (amb 4 decimals o com a fracció).",
      fields: [
        { label: "x₁ =", checker: num0(x1, 5e-4) },
        { label: "x₂ =", checker: num0(x2, 5e-4) }
      ],
      solutionLatex: `x_{n+1}=x_n-\\dfrac{f(x_n)}{f'(x_n)}:\\quad x_1\\approx ${fmtNum(x1, 6)},\\quad x_2\\approx ${fmtNum(x2, 6)}`,
      hint: "x_{n+1} = x_n - f(x_n)/f'(x_n). Calcula primer f'(x)."
    };
  }

  /* ---------------- EXTREMS ABSOLUTS EN [a,b] (Weierstrass; 2025 problema 1d) ---------------- */
  function absExtrema() {
    if (Math.random() < 0.5) {
      // cúbica amb punts crítics enters p<q (p+q parell): f = x³ - (3/2)(p+q)x² + 3pq x + d
      let p, q;
      do { p = ri(-3, 2); q = ri(p + 1, 4); } while ((p + q) % 2 !== 0);
      const B = -3 * (p + q) / 2, C = 3 * p * q, D = ri(-5, 5);
      const f = x => x ** 3 + B * x * x + C * x + D;
      const a = p - ri(1, 2), b = q + ri(0, 2);
      const cands = [a, p, q, b];
      const vals = cands.map(f);
      const mx = Math.max(...vals), mn = Math.min(...vals);
      const tex = `x^{3}${B === 0 ? "" : ` ${B > 0 ? "+" : "-"} ${Math.abs(B) === 1 ? "" : Math.abs(B)}x^{2}`}${C === 0 ? "" : ` ${C > 0 ? "+" : "-"} ${Math.abs(C) === 1 ? "" : Math.abs(C)}x`}${D === 0 ? "" : ` ${fmtSigned(D)}`}`;
      return {
        kind: "absExtrema",
        promptLatex: `Trobeu el màxim i el mínim absoluts de $f(x)=${tex}$ a l'interval $[${a},${b}]$.`,
        instructions: "Dona el VALOR màxim i el VALOR mínim de f a l'interval.",
        fields: [{ label: "màx =", checker: num0(mx, 1e-3) }, { label: "mín =", checker: num0(mn, 1e-3) }],
        solutionLatex: `f'(x)=3(x-(${p}))(x-(${q})).\\ \\text{Candidats: } ` + cands.map((c, i) => `f(${c})=${vals[i]}`).join(",\\ ") + `\\Rightarrow \\max=${mx},\\ \\min=${mn}`,
        hint: "Weierstrass: compara f als extrems de l'interval i als punts crítics (f'=0) de dins l'interval."
      };
    }
    // racional tipus 2025: (x² + c)/(x - d) en un interval a l'esquerra de d
    const d = ri(-1, 2), K = ri(1, 3), c = K * K - d * d;
    const f = x => (x * x + c) / (x - d);
    const a = d - K - ri(1, 2), b = d - ri(1, Math.max(1, K - 0)) ;
    const crit = d - K;
    const cands = [a, b]; if (crit > a && crit < b) cands.splice(1, 0, crit);
    const vals = cands.map(f);
    const mx = Math.max(...vals), mn = Math.min(...vals);
    return {
      kind: "absExtrema",
      promptLatex: `Trobeu el màxim i el mínim absoluts de $f(x)=\\dfrac{x^{2}${c === 0 ? "" : ` ${fmtSigned(c)}`}}{${lin(1, -d)}}$ a l'interval $[${a},${b}]$.`,
      instructions: "Dona el VALOR màxim i el VALOR mínim de f a l'interval (pots escriure fraccions, p.ex. -7/3).",
      fields: [{ label: "màx =", checker: num0(mx, 1e-3) }, { label: "mín =", checker: num0(mn, 1e-3) }],
      solutionLatex: `f'(x)=\\dfrac{(x-${d})^2-${K * K}}{(x-${d})^2}=0\\Rightarrow x=${d - K},\\ ${d + K}.\\ ` + cands.map((cc, i) => `f(${cc})=${fmtNum(vals[i], 4)}`).join(",\\ ") + `\\Rightarrow \\max=${fmtNum(mx)},\\ \\min=${fmtNum(mn)}`,
      hint: "f és contínua a [a,b] (no conté l'asímptota vertical), així que per Weierstrass té màxim i mínim: avalua als extrems i als punts crítics interiors."
    };
  }

  /* ---------------- ESTUDI DE FUNCIÓ COMPLET (2025 problema 1) ---------------- */
  function functionStudy() {
    let d, K, c;
    do { d = ri(-2, 2); K = ri(1, 3); c = K * K - d * d; } while (c === 0 && d === 0);
    const f = x => (x * x + c) / (x - d);
    const xMax = d - K, xMin = d + K;
    const num = `x^{2}${c === 0 ? "" : ` ${fmtSigned(c)}`}`;
    return {
      kind: "functionStudy",
      promptLatex: `Considereu $f(x)=\\dfrac{${num}}{${lin(1, -d)}}$. Trobeu les asímptotes, els extrems relatius i on és convexa.`,
      instructions: "Omple totes les caselles. Asímptota obliqua y = mx + n. Convexa (∪) a l'interval (p, +∞): dona p.",
      fields: [
        { label: "AV x =", checker: num0(d, 1e-3) },
        { label: "AO m =", checker: num0(1, 1e-3) },
        { label: "AO n =", checker: num0(d, 1e-3) },
        { label: "x màx rel =", checker: num0(xMax, 1e-3) },
        { label: "f(màx) =", checker: num0(f(xMax), 1e-3) },
        { label: "x mín rel =", checker: num0(xMin, 1e-3) },
        { label: "f(mín) =", checker: num0(f(xMin), 1e-3) },
        { label: "convexa per x >", checker: num0(d, 1e-3) }
      ],
      solutionLatex: `f(x)=x+${d === 0 ? "" : `(${d})+`}\\dfrac{${K * K}}{x-(${d})}.\\ \\text{AV } x=${d},\\ \\text{AO } y=x${d === 0 ? "" : ` ${fmtSigned(d)}`}.\\ f'(x)=1-\\dfrac{${K * K}}{(x-(${d}))^2}=0\\Rightarrow x=${xMax}\\ (\\max,\\ f=${fmtNum(f(xMax))}),\\ x=${xMin}\\ (\\min,\\ f=${fmtNum(f(xMin))}).\\ f''(x)=\\dfrac{${2 * K * K}}{(x-(${d}))^3}:\\ \\cap \\text{ si } x\\lt ${d},\\ \\cup \\text{ si } x>${d}`,
      hint: "Fes la divisió: f(x) = x + d + K/(x-d). Així surt l'asímptota obliqua directament i les derivades són molt fàcils."
    };
  }

  /* ---------------- PROBLEMA DE TAYLOR + FITA (2025 problema 2) ---------------- */
  const taylorProbFamilies = [
    // f^(n+1): per sinh és cosh si n+1 senar i sinh si parell; per cosh al revés.  0 ≤ ξ ≤ 1
    { name: "\\dfrac{e^{x}-e^{-x}}{2}", coeff: k => k % 2 ? 1 / fact(k) : 0, f: Math.sinh, M: n => ((n + 1) % 2 ? 2 : 1.5), Mtex: n => ((n + 1) % 2 ? "\\cosh\\xi\\le\\tfrac{e+1}{2}\\lt 2" : "\\sinh\\xi\\le \\tfrac{e}{2}\\lt 1.5") },
    { name: "\\dfrac{e^{x}+e^{-x}}{2}", coeff: k => k % 2 ? 0 : 1 / fact(k), f: Math.cosh, M: n => ((n + 1) % 2 ? 1.5 : 2), Mtex: n => ((n + 1) % 2 ? "\\sinh\\xi\\le \\tfrac{e}{2}\\lt 1.5" : "\\cosh\\xi\\le\\tfrac{e+1}{2}\\lt 2") },
    { name: "e^{x}", coeff: k => 1 / fact(k), f: Math.exp, M: () => 3, Mtex: () => "e^{\\xi}\\le e\\lt 3" },
    { name: "\\sin x", coeff: k => k % 2 ? Math.pow(-1, (k - 1) / 2) / fact(k) : 0, f: Math.sin, M: () => 1, Mtex: () => "|f^{(n+1)}|\\le 1" },
    { name: "\\cos x", coeff: k => k % 2 ? 0 : Math.pow(-1, k / 2) / fact(k), f: Math.cos, M: () => 1, Mtex: () => "|f^{(n+1)}|\\le 1" }
  ];
  function taylorProblem() {
    const fam = choice(taylorProbFamilies);
    const n = ri(4, 7);
    let P1 = 0;
    for (let k = 0; k <= n; k++) P1 += fam.coeff(k);
    const trueErr = Math.abs(fam.f(1) - P1);
    const ref = fam.M(n) / fact(n + 1);
    const terms = [];
    for (let k = 0; k <= n; k++) {
      const c = fam.coeff(k);
      if (c === 0) continue;
      const sgn = c < 0 ? "-" : "+";
      const body = k === 0 ? "1" : `\\dfrac{${pw("x", k)}}{${k === 1 ? "1" : k + "!"}}`;
      terms.push((terms.length === 0 ? (c < 0 ? "-" : "") : ` ${sgn} `) + (k === 1 ? "x" : body));
    }
    return {
      kind: "taylorProblem",
      promptLatex: `(a) Polinomi de Taylor de grau $${n}$ de $f(x)=${fam.name}$ al voltant de $a=0$, avaluat en $x=1$. (b) Fiteu l'error $|R_{${n}}(1)|$ (podeu usar $e\\lt 3$).`,
      instructions: "Dona P(1) i una fita vàlida de l'error (qualsevol fita correcta i raonable, ≤ 10 vegades la fita estàndard).",
      fields: [
        { label: `P${n}(1) =`, checker: num0(P1, 1e-4) },
        { label: "fita |R| ≤", checker: (s) => {
          let v; try { v = MathParser.compile(s)(0); } catch (e) { return { ok: false, error: e.message }; }
          if (!isFinite(v)) return { ok: false, error: "valor no numèric" };
          if (v < trueErr * 0.999) return { ok: false, error: "aquesta fita és MASSA petita: l'error real és més gran" };
          if (v > ref * 10) return { ok: false, error: "fita correcta però massa grollera; afina M o l'ordre" };
          return { ok: true };
        } }
      ],
      solutionLatex: `P_{${n}}(x)=${terms.join("")},\\ P_{${n}}(1)\\approx ${fmtNum(P1, 6)}.\\ |R_{${n}}(1)|=\\dfrac{|f^{(${n + 1})}(\\xi)|}{${n + 1}!}\\cdot 1^{${n + 1}},\\ ${fam.Mtex(n)}\\Rightarrow |R_{${n}}(1)|\\le\\dfrac{${fam.M(n)}}{${n + 1}!}\\approx ${ref.toExponential(3)}\\ (\\text{error real } ${trueErr.toExponential(3)})`,
      hint: "Coeficients f^(k)(0)/k!. Residu de Lagrange: R_n(x) = f^(n+1)(ξ)/(n+1)!·x^(n+1), amb ξ entre 0 i x. Fita |f^(n+1)(ξ)| pel seu màxim a [0,1]."
    };
  }


  /* ---------------- TAYLOR: GRAU NECESSARI PER A UN ERROR DONAT (Llista 5, 3–5) ---------------- */
  function taylorDegree() {
    const fam = choice([
      { name: "\\sin", f: Math.sin, coeff: k => k % 2 ? Math.pow(-1, (k - 1) / 2) / fact(k) : 0, M: 1, Mtex: "|f^{(n+1)}|\\le1" },
      { name: "\\cos", f: Math.cos, coeff: k => k % 2 ? 0 : Math.pow(-1, k / 2) / fact(k), M: 1, Mtex: "|f^{(n+1)}|\\le1" },
      { name: "e^", f: Math.exp, coeff: k => 1 / fact(k), M: 3, Mtex: "e^{\\xi}\\lt e\\lt3" }
    ]);
    const x = choice([0.1, 0.2, 0.3, 0.4, 0.5]);
    const k = choice([3, 4, 5]);
    const tol = Math.pow(10, -k);
    let n = 0;
    while (fam.M * Math.pow(x, n + 1) / fact(n + 1) >= tol) n++;
    let P = 0;
    for (let i = 0; i <= n; i++) P += fam.coeff(i) * Math.pow(x, i);
    const xs = String(x).replace(".", "{,}");
    const valTex = fam.name === "e^" ? `e^{${xs}}` : `${fam.name}(${xs})`;
    const nChk = (s) => {
      let v; try { v = MathParser.compile(s)(0); } catch (e) { return { ok: false, error: e.message }; }
      return { ok: Math.round(v) === v && v === n };
    };
    nChk.value = n;
    return {
      kind: "taylorDegree",
      promptLatex: `Obteniu, amb la fórmula de Taylor en $a=0$, una aproximació de $${valTex}$ amb error més petit que $10^{-${k}}$. Quin és el grau $n$ mínim (segons la fita de Lagrange${fam.M === 3 ? " amb $e\\lt3$" : ""}) i quina aproximació s'obté?`,
      instructions: "Dona el grau n mínim i el valor aproximat P_n (amb prou decimals).",
      fields: [
        { label: "n =", checker: nChk },
        { label: "P_n ≈", checker: num0(P, tol) }
      ],
      solutionLatex: `|R_n(${x})|\\le\\dfrac{M\\,(${x})^{n+1}}{(n+1)!},\\ ${fam.Mtex}.\\ ` +
        `n=${n - 1}:\\ ${(fam.M * Math.pow(x, n) / fact(n)).toExponential(2)}\\ \\text{✗};\\ n=${n}:\\ ${(fam.M * Math.pow(x, n + 1) / fact(n + 1)).toExponential(2)}\\lt10^{-${k}}\\ \\checkmark.\\ P_{${n}}(${x})\\approx${fmtNum(P, 7)}`,
      hint: "Prova n = 1, 2, 3... fins que M·x^(n+1)/(n+1)! sigui més petit que la tolerància. Després avalua P_n."
    };
  }

  /* ---------------- LÍMITS TIPUS 1^∞, 0^0 (Llista 4, Abril 2024 2c) ---------------- */
  const powLimitTemplates = [
    () => { const a = ri(1, 3); return { tex: `\\lim_{x\\to0}\\left(1+\\sin(${a === 1 ? "" : a}x^{2})\\right)^{\\frac{1}{1-\\cos x}}`, v: Math.exp(2 * a), sol: `e^{\\lim \\frac{\\ln(1+\\sin ${a === 1 ? "" : a}x^2)}{1-\\cos x}}=e^{${2 * a}}` }; },
    () => { const a = ri(1, 5); return { tex: `\\lim_{x\\to0^+}\\left(1+\\sin(${cx(a)})\\right)^{\\cot x}`, v: Math.exp(a), sol: `e^{\\lim \\cot x\\ln(1+\\sin ${cx(a)})}=e^{${a}}` }; },
    () => { const a = ri(1, 5), b = ri(1, 5); return { tex: `\\lim_{x\\to\\infty}\\left(\\dfrac{x+${a}}{x+${b}}\\right)^{x}`, v: Math.exp(a - b), sol: `e^{\\lim x\\ln\\frac{x+${a}}{x+${b}}}=e^{${a - b}}` }; },
    () => ({ tex: "\\lim_{x\\to0^+} x^{\\sin x}", v: 1, sol: "e^{\\lim \\sin x\\ln x}=e^{0}=1" }),
    () => ({ tex: "\\lim_{x\\to1}(2-x)^{\\tan(\\pi x/2)}", v: Math.exp(2 / Math.PI), sol: "e^{\\lim \\tan(\\pi x/2)\\ln(2-x)}=e^{2/\\pi}" }),
    () => ({ tex: "\\lim_{x\\to1}\\left(\\dfrac{1}{\\ln x}-\\dfrac{1}{x-1}\\right)", v: 0.5, sol: "\\lim \\dfrac{x-1-\\ln x}{(x-1)\\ln x}\\overset{H}{=}\\dots=\\tfrac12" }),
    () => { const a = ri(1, 4), b = ri(1, 3); return { tex: `\\lim_{x\\to0}\\dfrac{${a}(1-\\cos(${cx(b)}))}{x^{2}}`, v: a * b * b / 2, sol: `\\dfrac{${a}\\cdot ${b}^2}{2}=${fmtNum(a * b * b / 2)}` }; },
    () => ({ tex: "\\lim_{x\\to\\infty}\\left(\\dfrac{1+5x}{3+5x}\\right)^{2x-1}", v: Math.exp(-0.8), sol: "e^{\\lim (2x-1)\\ln\\frac{1+5x}{3+5x}}=e^{-4/5}" })
  ];
  function powLimit() {
    const t = choice(powLimitTemplates)();
    return {
      kind: "powLimit",
      promptLatex: t.tex,
      instructions: "Escriu el valor del límit (pots escriure e^2, e^(-4/5), e^(2/pi)...).",
      checker: num0(t.v, Math.max(1e-3, Math.abs(t.v) * 0.01)),
      solutionLatex: t.sol,
      hint: "Si és 1^∞, 0^0 o ∞^0: escriu f^g = e^(g·ln f), calcula el límit de l'exponent (sol ser 0·∞ → passa a quocient i aplica l'Hôpital o infinitèsims)."
    };
  }

  return {
    derivative, limit, equation, taylorValue, taylorError, interpolation, asymptote,
    expQuadratic, inequality, tangent, continuity, logDerivative, newton, absExtrema,
    functionStudy, taylorProblem, powLimit, taylorDegree
  };
})();
