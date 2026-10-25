/* ============================================================
   examsdata.js — Exàmens reals del 1r Parcial (del més recent al
   més antic) amb solucions completes, banc de preguntes de test
   en el format 2025 (5 opcions, +0.8 / -0.2) i Llista 4 resolta.
   Gràfiques: <div class="plot" data-f=".." data-xr="a,b" data-yr="c,d"
   data-va="x1,x2" data-lines="expr1;expr2"> es dibuixen a app.js.
   ============================================================ */

const REAL_EXAMS = [
  {
    id: "2025",
    title: "Primer Parcial — 3 de novembre de 2025",
    tag: "MÉS RECENT · PRIORITAT MÀXIMA",
    hot: true,
    format: "Test de 5 preguntes amb 5 opcions (4 punts: +0.8 encert, −0.2 error, en blanc 0) + 2 problemes de 3 punts. Es demana justificar-ho tot amb rigor.",
    test: [
      {
        q: "Sigui $f(x)=\\begin{cases}\\dfrac{(\\sin x^2)^2}{x^4}, & x\\neq0\\\\ k, & x=0\\end{cases}$. Per a quin valor de $k$ la funció és contínua en $x=0$?",
        options: ["$k=0$", "$k=\\sin(0)$", "No és possible fer-la contínua", "$k=-1$", "$k=1$"],
        correct: 4,
        exp: "$\\displaystyle\\lim_{x\\to0}\\frac{(\\sin x^2)^2}{x^4}=\\left(\\lim_{x\\to0}\\frac{\\sin x^2}{x^2}\\right)^2=1^2=1$. Cal $k=f(0)=1$."
      },
      {
        q: "Sigui $f(x)=\\dfrac{1000}{1+e^{-3(x-1)}}$. El valor de la funció $f$ en el punt d'inflexió és:",
        options: ["$250$", "$500$", "$0$", "$1000$", "$300$"],
        correct: 1,
        exp: "És una logística $\\frac{L}{1+e^{-k(x-x_0)}}$: $f''(x)=0 \\iff e^{-3(x-1)}=1\\iff x=1$, i $f(1)=\\frac{1000}{1+1}=500$ (la meitat de $L$)."
      },
      {
        q: "Sigui el conjunt de punts $(1,2),\\ (2,3),\\ (4,7)$. Es vol trobar el polinomi d'interpolació $P(x)$ que passa per aquests tres punts. Quina expressió és la correcta?",
        options: ["$P(x)=1+x$", "$P(x)=2+(x-1)$", "$P(x)=2x-1$", "$P(x)=\\frac13x^2+\\frac13x+\\frac43$", "$P(x)=1+2x+x^2$"],
        correct: -1,
        exp: "⚠️ <b>Errata a l'enunciat original:</b> cap opció és correcta. Diferències dividides: $f[1,2]=1$, $f[2,4]=2$, $f[1,2,4]=\\frac{2-1}{4-1}=\\frac13$. Llavors $P(x)=2+(x-1)+\\frac13(x-1)(x-2)=\\frac{x^2}{3}+\\frac53$. Comprova: $P(1)=2,\\ P(2)=3,\\ P(4)=7$. L'opció (d) només passa per $(1,2)$: $P(2)=\\frac{10}{3}\\neq3$. <b>Lliçó:</b> comprova sempre les opcions substituint els punts!"
      },
      {
        q: "S'aproxima $\\sin(0.1)$ amb el polinomi de Taylor d'ordre 3: $P(x)=x-\\frac{x^3}{6}$. El residu en forma de Lagrange és $R_5(x)=\\frac{f^{(5)}(\\xi)}{5!}x^5,\\ \\xi\\in(0,x)$. Quina acotació per a $5!\\,|R_5(0.1)|$ és la més precisa?",
        options: ["$\\lt 10^{-6}$", "$\\lt 10^{-7}$", "$\\lt 10^{-4}$", "$\\lt 10^{-8}$", "$\\lt 10^{-5}$"],
        correct: 4,
        exp: "$5!\\,|R_5(0.1)|=|f^{(5)}(\\xi)|\\cdot(0.1)^5=|\\cos\\xi|\\cdot10^{-5}\\lt 10^{-5}$ (i com que $\\cos\\xi\\approx 0.995$, no és menor que $10^{-6}$)."
      },
      {
        q: "Calculeu (si existeix) $\\displaystyle\\lim_{x\\to0}\\frac{a(1-\\cos(bx))}{x^2}$, on $a,b$ són constants reals.",
        options: ["$\\dfrac{ab^2}{2}$", "$ab^2$", "$\\dfrac{ab}{2}$", "$\\dfrac{2a}{b^2}$", "$0$"],
        correct: 0,
        exp: "$1-\\cos(bx)\\sim\\frac{(bx)^2}{2}$, o bé l'Hôpital dues vegades: $\\frac{ab\\sin bx}{2x}\\to\\frac{ab^2\\cos bx}{2}\\to\\frac{ab^2}{2}$."
      }
    ],
    problems: [
      {
        title: "Problema 1 (3 punts)",
        statement: "Considerem la funció $f(x)=\\dfrac{x^2+3}{x-1}$.",
        parts: [
          {
            q: "(a) Trobeu les asímptotes de $f$.",
            sol: "Domini: $\\mathbb{R}\\setminus\\{1\\}$. Dividint: $x^2+3=(x-1)(x+1)+4$, és a dir $f(x)=x+1+\\dfrac{4}{x-1}$.<br>" +
              "• <b>Vertical</b> $x=1$: $\\lim_{x\\to1^-}f=\\frac{4}{0^-}=-\\infty$, $\\lim_{x\\to1^+}f=+\\infty$.<br>" +
              "• <b>Horitzontal</b>: no n'hi ha ($\\lim_{x\\to\\pm\\infty}f=\\pm\\infty$).<br>" +
              "• <b>Obliqua</b>: $m=\\lim\\frac{f(x)}{x}=1$, $n=\\lim(f(x)-x)=\\lim\\frac{x+3}{x-1}=1$. Per tant $y=x+1$ (a $\\pm\\infty$)."
          },
          {
            q: "(b) Intervals de concavitat i convexitat, i de creixement i decreixement.",
            sol: "$f'(x)=\\dfrac{2x(x-1)-(x^2+3)}{(x-1)^2}=\\dfrac{x^2-2x-3}{(x-1)^2}=\\dfrac{(x-3)(x+1)}{(x-1)^2}$.<br>" +
              "<table class='sign-table'><tr><th></th><th>$(-\\infty,-1)$</th><th>$(-1,1)$</th><th>$(1,3)$</th><th>$(3,\\infty)$</th></tr><tr><td>$f'$</td><td>+</td><td>−</td><td>−</td><td>+</td></tr><tr><td>$f$</td><td>↗</td><td>↘</td><td>↘</td><td>↗</td></tr></table>" +
              "Màxim relatiu a $x=-1$: $f(-1)=-2$. Mínim relatiu a $x=3$: $f(3)=6$.<br>" +
              "$f''(x)=\\dfrac{8}{(x-1)^3}$: $f''\\lt 0$ a $(-\\infty,1)$ → <b>còncava</b> ($\\cap$); $f''>0$ a $(1,\\infty)$ → <b>convexa</b> ($\\cup$). No hi ha punts d'inflexió ($x=1$ no és del domini)."
          },
          {
            q: "(c) Representeu aproximadament el gràfic (cal fer l'estudi, no només unir punts).",
            sol: "Combinem: AV $x=1$, AO $y=x+1$, màx $(-1,-2)$, mín $(3,6)$, talla l'eix $Y$ a $(0,-3)$, no talla l'eix $X$ ($x^2+3>0$). A l'esquerra de $1$ és còncava i queda per sota de l'asímptota ($\\frac{4}{x-1}\\lt 0$); a la dreta, convexa i per sobre." +
              "<div class='plot' data-f='(x^2+3)/(x-1)' data-xr='-6,8' data-yr='-12,16' data-va='1' data-lines='x+1' data-pts='-1,-2;3,6;0,-3'></div>"
          },
          {
            q: "(d) Trobeu el màxim i el mínim de $f$ a l'interval $[-2,0]$.",
            sol: "$f$ és contínua a $[-2,0]$ (l'asímptota $x=1$ queda fora), així que pel <b>teorema de Weierstrass</b> té màxim i mínim absoluts. Candidats: extrems de l'interval i punts crítics interiors ($x=-1$).<br>" +
              "$f(-2)=-\\frac73\\approx-2.33$, $\\quad f(-1)=-2$, $\\quad f(0)=-3$.<br>" +
              "<b>Màxim absolut</b> $-2$ a $x=-1$; <b>mínim absolut</b> $-3$ a $x=0$."
          }
        ]
      },
      {
        title: "Problema 2 (3 punts)",
        statement: "Contesteu les següents qüestions (podeu fer servir que $e\\lt 3$ i la taula de $n!$ i $\\frac1{n!}$: $\\frac1{8!}\\approx2.480\\cdot10^{-5}$, $\\frac1{9!}\\approx2.755\\cdot10^{-6}$).",
        parts: [
          {
            q: "(a) Trobeu el polinomi de Taylor de grau 7 de $f(x)=\\dfrac{e^x-e^{-x}}{2}$ al voltant de $a=0$.",
            sol: "$f=\\sinh x$, $f'=\\frac{e^x+e^{-x}}{2}=\\cosh x$, $f''=\\sinh x$, ... Les derivades alternen: $f^{(k)}(0)=0$ si $k$ parell i $f^{(k)}(0)=1$ si $k$ senar.<br>" +
              "$$P_7(x)=x+\\frac{x^3}{3!}+\\frac{x^5}{5!}+\\frac{x^7}{7!}$$"
          },
          {
            q: "(b) Utilitzant l'expressió del residu, doneu una fita de l'error en calcular un valor aproximat de $f(1)$ amb el polinomi anterior.",
            sol: "$f(1)\\approx P_7(1)=1+\\frac16+\\frac1{120}+\\frac1{5040}\\approx1.175198$.<br>" +
              "Residu de Lagrange: $R_7(1)=\\dfrac{f^{(8)}(\\xi)}{8!}\\cdot1^8=\\dfrac{\\sinh\\xi}{8!}$ amb $0\\lt\\xi\\lt1$. Com $\\sinh$ és creixent: $\\sinh\\xi\\lt\\sinh1=\\frac{e-e^{-1}}{2}\\lt\\frac e2\\lt\\frac32$.<br>" +
              "$$|R_7(1)|\\lt\\frac{3/2}{8!}\\approx1.5\\cdot2.480\\cdot10^{-5}\\approx3.72\\cdot10^{-5}$$" +
              "<i>Millora (opcional):</i> com el terme de grau 8 és nul, $P_7=P_8$ i es pot usar $R_8$: $|R_8(1)|=\\frac{\\cosh\\xi}{9!}\\lt\\frac{2}{9!}\\approx5.5\\cdot10^{-6}$. (Error real: $\\approx2.78\\cdot10^{-6}$.)"
          }
        ]
      }
    ]
  },
  {
    id: "2024",
    title: "Primer Parcial — Abril 2024",
    tag: "RECENT",
    hot: true,
    format: "3 exercicis de 10 punts (3+3+4). Sense test.",
    problems: [
      {
        title: "Exercici 1",
        parts: [
          {
            q: "(a) Trobeu les solucions de l'equació $e^{4x}-5e^{2x}+6=0$.",
            sol: "Canvi $t=e^{2x}>0$: $t^2-5t+6=0\\Rightarrow t=2$ o $t=3$ (totes dues positives).<br>$e^{2x}=2\\Rightarrow x=\\frac{\\ln2}{2}$; $\\ e^{2x}=3\\Rightarrow x=\\frac{\\ln3}{2}$."
          },
          {
            q: "(b) Trobeu tots els valors de $x$ tals que $x^2+1\\lt x+3$.",
            sol: "$x^2-x-2\\lt 0\\iff(x-2)(x+1)\\lt 0$. Paràbola positiva fora de les arrels i negativa entre elles: $x\\in(-1,2)$."
          },
          {
            q: "(c) Calculeu la derivada de $f(x)=(2+\\sin(3x))^{\\cos x}$.",
            sol: "Derivació logarítmica: $\\ln f=\\cos x\\,\\ln(2+\\sin3x)$. Derivant:<br>" +
              "$$\\frac{f'}{f}=-\\sin x\\ln(2+\\sin3x)+\\cos x\\cdot\\frac{3\\cos3x}{2+\\sin3x}$$" +
              "$$f'(x)=(2+\\sin3x)^{\\cos x}\\left[-\\sin x\\ln(2+\\sin3x)+\\frac{3\\cos x\\cos3x}{2+\\sin3x}\\right]$$"
          }
        ]
      },
      {
        title: "Exercici 2",
        parts: [
          {
            q: "(a) Equació de la recta tangent a la gràfica de $f(x)=\\ln(1+x^2)$ en el punt $x=-2$.",
            sol: "$f(-2)=\\ln5$, $f'(x)=\\frac{2x}{1+x^2}\\Rightarrow f'(-2)=-\\frac45$.<br>$$y-\\ln5=-\\frac45(x+2)\\iff y=-\\frac45x-\\frac85+\\ln5$$"
          },
          {
            q: "(b) Demostreu que l'equació $3x+\\cos(2x)=3$ té una única solució a $[0,\\pi/2]$.",
            sol: "Sigui $g(x)=3x+\\cos2x-3$, contínua a $[0,\\pi/2]$.<br>" +
              "<b>Existència (Bolzano):</b> $g(0)=1-3=-2\\lt 0$, $g(\\pi/2)=\\frac{3\\pi}{2}-1-3\\approx0.71>0$ ⇒ existeix $c\\in(0,\\pi/2)$ amb $g(c)=0$.<br>" +
              "<b>Unicitat:</b> $g'(x)=3-2\\sin2x\\ge3-2=1>0$ ⇒ $g$ estrictament creixent ⇒ com a molt un zero. (O per Rolle: dos zeros donarien $g'(c)=0$, impossible.)"
          },
          {
            q: "(c) Calculeu $\\displaystyle\\lim_{x\\to0}(1+\\sin(x^2))^{\\frac{1}{1-\\cos x}}$.",
            sol: "Indeterminació $1^\\infty$: $L=e^{\\lim\\frac{\\ln(1+\\sin x^2)}{1-\\cos x}}$. A l'exponent ($\\frac00$): $\\ln(1+\\sin x^2)\\sim\\sin x^2\\sim x^2$ i $1-\\cos x\\sim\\frac{x^2}{2}$, així que tendeix a $\\frac{x^2}{x^2/2}=2$ (també surt amb l'Hôpital).<br>$$L=e^2$$"
          }
        ]
      },
      {
        title: "Exercici 3",
        statement: "Considereu la funció $f(x)=\\dfrac{e^{-x}}{x+2}$.",
        parts: [
          {
            q: "(a) Intervals de creixement i decreixement i extrems relatius.",
            sol: "Domini $\\mathbb{R}\\setminus\\{-2\\}$. $f'(x)=\\dfrac{-e^{-x}(x+2)-e^{-x}}{(x+2)^2}=\\dfrac{-e^{-x}(x+3)}{(x+2)^2}$.<br>" +
              "Signe de $f'$ = signe de $-(x+3)$: creixent a $(-\\infty,-3)$, decreixent a $(-3,-2)$ i a $(-2,\\infty)$.<br>" +
              "<b>Màxim relatiu</b> a $x=-3$: $f(-3)=\\frac{e^3}{-1}=-e^3\\approx-20.1$."
          },
          {
            q: "(b) Intervals de concavitat i convexitat i punts d'inflexió.",
            sol: "$f''(x)=\\dfrac{e^{-x}(x^2+6x+10)}{(x+2)^3}$. Com $x^2+6x+10=(x+3)^2+1>0$ sempre, el signe és el de $(x+2)^3$:<br>còncava ($\\cap$) a $(-\\infty,-2)$, convexa ($\\cup$) a $(-2,\\infty)$. <b>Sense punts d'inflexió</b> ($x=-2$ no és del domini)."
          },
          {
            q: "(c) Feu un esbós de la gràfica.",
            sol: "AV $x=-2$ ($f\\to-\\infty$ per l'esquerra, $+\\infty$ per la dreta). AH $y=0$ quan $x\\to+\\infty$. Quan $x\\to-\\infty$, $f\\to-\\infty$. Talla l'eix $Y$ a $(0,\\frac12)$; no talla l'eix $X$." +
              "<div class='plot' data-f='exp(-x)/(x+2)' data-xr='-7,4' data-yr='-35,8' data-va='-2' data-lines='0' data-pts='-3,-20.0855;0,0.5'></div>"
          }
        ]
      }
    ]
  },
  {
    id: "2023",
    title: "Primer Parcial — Abril 2023",
    tag: "RECENT",
    format: "2 exercicis de 10 punts (3+3+4). Sense test.",
    problems: [
      {
        title: "Exercici 1",
        parts: [
          {
            q: "(a) Recta tangent a la gràfica de $f(x)=(\\cos(2\\pi\\sqrt x)+1)^2$ en el punt $x=1$.",
            sol: "$f(1)=(\\cos2\\pi+1)^2=4$. $f'(x)=2(\\cos(2\\pi\\sqrt x)+1)\\cdot(-\\sin(2\\pi\\sqrt x))\\cdot\\frac{2\\pi}{2\\sqrt x}$; com $\\sin2\\pi=0$, $f'(1)=0$.<br>Recta tangent horitzontal: $$y=4$$"
          },
          {
            q: "(b) Trobeu les solucions de $e^{2x}-6e^{-2x}=-1$.",
            sol: "Multipliquem per $e^{2x}$ i fem $t=e^{2x}>0$: $t^2+t-6=0\\Rightarrow t=2$ o $t=-3$ (descartada, $e^{2x}>0$).<br>$e^{2x}=2\\Rightarrow x=\\frac{\\ln2}{2}$."
          },
          {
            q: "(c) Demostreu que l'equació $\\sin(\\frac{\\pi x}{2})=-x+1$ té una única solució a $[0,1]$.",
            sol: "$g(x)=\\sin(\\frac{\\pi x}{2})+x-1$, contínua. $g(0)=-1\\lt 0$, $g(1)=1>0$ ⇒ <b>Bolzano</b>: existeix solució a $(0,1)$.<br>$g'(x)=\\frac\\pi2\\cos(\\frac{\\pi x}{2})+1>0$ a $[0,1]$ (el cosinus és $\\ge0$ allà) ⇒ estrictament creixent ⇒ <b>única</b>."
          }
        ]
      },
      {
        title: "Exercici 2",
        statement: "Considereu la funció $f(x)=x^2e^{-x^2}$.",
        parts: [
          {
            q: "(a) Intervals de creixement i decreixement i extrems relatius.",
            sol: "$f'(x)=2xe^{-x^2}+x^2(-2x)e^{-x^2}=2x(1-x^2)e^{-x^2}$. Zeros: $x=-1,0,1$.<br>" +
              "<table class='sign-table'><tr><th></th><th>$(-\\infty,-1)$</th><th>$(-1,0)$</th><th>$(0,1)$</th><th>$(1,\\infty)$</th></tr><tr><td>$f'$</td><td>+</td><td>−</td><td>+</td><td>−</td></tr></table>" +
              "Màxims relatius a $x=\\pm1$ amb $f=\\frac1e$; mínim relatiu (i absolut) a $x=0$ amb $f=0$."
          },
          {
            q: "(b) Intervals de concavitat i convexitat i punts d'inflexió.",
            sol: "$f''(x)=e^{-x^2}(4x^4-10x^2+2)$. $2x^4-5x^2+1=0\\Rightarrow x^2=\\frac{5\\pm\\sqrt{17}}{4}$, és a dir $x\\approx\\pm0.47$ i $x\\approx\\pm1.51$.<br>" +
              "Convexa a $(-\\infty,-1.51)$, $(-0.47,0.47)$, $(1.51,\\infty)$; còncava a $(-1.51,-0.47)$ i $(0.47,1.51)$. <b>4 punts d'inflexió</b>."
          },
          {
            q: "(c) Esbós de la gràfica.",
            sol: "Funció parell (simètrica respecte l'eix $Y$), $f\\ge0$, AH $y=0$ a $\\pm\\infty$." +
              "<div class='plot' data-f='x^2*exp(-x^2)' data-xr='-3.5,3.5' data-yr='-0.1,0.5' data-lines='0' data-pts='-1,0.3679;1,0.3679;0,0'></div>"
          }
        ]
      }
    ]
  },
  {
    id: "2021",
    title: "Primer Parcial — 26 d'abril de 2021",
    tag: "FORMAT AMB TEST",
    format: "Test de 5 preguntes, 4 opcions (+2 / −0.65) + 2 exercicis.",
    test: [
      {
        q: "La recta tangent a $f(x)=\\ln(x^2+1)$ en el punt d'abscissa $x=-1$ és:",
        options: ["No hi ha recta tangent", "$y+x=\\ln2-1$", "$y-\\ln2=x+1$", "$y+x=\\ln2+1$"],
        correct: 1,
        exp: "$f(-1)=\\ln2$, $f'(-1)=\\frac{-2}{2}=-1$: $y-\\ln2=-(x+1)\\iff y+x=\\ln2-1$."
      },
      {
        q: "La derivada de $f(x)=(\\sin(\\sqrt x)+x)^{1/3}$ és:",
        options: ["$\\dfrac{\\cos\\sqrt x+1}{3(\\sin\\sqrt x+x)^{2/3}}$", "$\\dfrac{\\cos\\sqrt x+2\\sqrt x}{6\\sqrt x(\\sin\\sqrt x+x)^{2/3}}$", "$\\dfrac{\\frac{\\cos\\sqrt x}{\\sqrt x}+1}{3(\\sin\\sqrt x+x)^{2/3}}$", "$\\dfrac{\\cos\\sqrt x+1}{6\\sqrt x(\\sin\\sqrt x+x)^{2/3}}$"],
        correct: 1,
        exp: "$f'=\\frac13(\\sin\\sqrt x+x)^{-2/3}\\left(\\frac{\\cos\\sqrt x}{2\\sqrt x}+1\\right)=\\frac{\\cos\\sqrt x+2\\sqrt x}{6\\sqrt x(\\sin\\sqrt x+x)^{2/3}}$."
      },
      {
        q: "Totes les solucions de $\\log_3(1-9x^2)-\\log_3(1+3x)=-2$ són:",
        options: ["$x=\\frac49$", "No té solució als reals", "$x=\\frac{8}{27}$", "$x=\\frac{4}{27}$"],
        correct: 2,
        exp: "$\\frac{1-9x^2}{1+3x}=1-3x$, així que $\\log_3(1-3x)=-2\\Rightarrow1-3x=\\frac19\\Rightarrow x=\\frac{8}{27}$. Domini: $|x|\\lt\\frac13$ ✓."
      },
      {
        q: "Sigui $f$ dues vegades derivable amb un únic punt crític, amb $f'(0)=f''(0)=0$, $f'(1)=1$ i $f'(-1)=-1$. Llavors segur que:",
        options: ["$f$ és convexa", "$0$ és un punt d'inflexió", "$0$ és un mínim relatiu", "$f$ és creixent"],
        correct: 2,
        exp: "Com $0$ és l'únic zero de $f'$ (i $f'$ és contínua), $f'\\lt 0$ a l'esquerra ($f'(-1)=-1$) i $f'>0$ a la dreta ($f'(1)=1$): mínim relatiu. $f''(0)=0$ no decideix res."
      },
      {
        q: "El conjunt dels reals que compleixen $\\left|\\dfrac{2-x}{1+x}\\right|\\le4$ és:",
        options: ["$(-\\infty,-\\frac25]\\cup[2,\\infty)$", "$(-\\infty,-2]\\cup[-\\frac25,\\infty)$", "$(-\\infty,-2]\\cup[\\frac25,\\infty)$", "$(-\\infty,-2]\\cup[-\\frac52,\\infty)$"],
        correct: 1,
        exp: "$\\frac{2-x}{1+x}\\le4\\iff\\frac{5x+2}{x+1}\\ge0\\iff x\\lt-1$ o $x\\ge-\\frac25$. $\\frac{2-x}{1+x}\\ge-4\\iff\\frac{3x+6}{x+1}\\ge0\\iff x\\le-2$ o $x>-1$. Intersecció: $(-\\infty,-2]\\cup[-\\frac25,\\infty)$."
      }
    ],
    problems: [
      {
        title: "Exercici 1 (10 punts)",
        statement: "Sigui $f(x)=e^{-x}x^2$.",
        parts: [
          { q: "(a) Creixement, decreixement i extrems relatius.", sol: "$f'(x)=xe^{-x}(2-x)$: decreixent a $(-\\infty,0)$, creixent a $(0,2)$, decreixent a $(2,\\infty)$. Mínim a $(0,0)$, màxim a $(2,\\frac4{e^2})$." },
          { q: "(b) Concavitat i convexitat.", sol: "$f''(x)=e^{-x}(x^2-4x+2)=0\\Rightarrow x=2\\pm\\sqrt2$. Convexa a $(-\\infty,2-\\sqrt2)$ i $(2+\\sqrt2,\\infty)$; còncava entre ells. Inflexions a $x=2\\pm\\sqrt2$." },
          { q: "(c) Esbós.", sol: "AH $y=0$ a $+\\infty$; $f\\to+\\infty$ a $-\\infty$.<div class='plot' data-f='x^2*exp(-x)' data-xr='-1.5,8' data-yr='-0.3,2' data-lines='0' data-pts='0,0;2,0.5413'></div>" }
        ]
      },
      {
        title: "Exercici 2 (5+5 punts)",
        parts: [
          { q: "(a) Calculeu $\\displaystyle\\lim_{x\\to1}\\frac{1-x+\\ln x}{1+\\cos(\\pi x)}$.", sol: "$\\frac00$. L'Hôpital: $\\frac{-1+1/x}{-\\pi\\sin\\pi x}$, encara $\\frac00$. Un altre cop: $\\frac{-1/x^2}{-\\pi^2\\cos\\pi x}\\to\\frac{-1}{-\\pi^2\\cdot(-1)}=-\\frac{1}{\\pi^2}$." },
          { q: "(b) Proveu que $e^x=\\dfrac{e^2}{x^2}$ té una única solució a $(0,\\infty)$.", sol: "$g(x)=x^2e^x-e^2$. $g(1)=e-e^2\\lt 0$, $g(2)=3e^2>0$ ⇒ Bolzano. $g'(x)=e^x(x^2+2x)>0$ per $x>0$ ⇒ única (i està entre 1 i 2)." }
        ]
      }
    ]
  },
  {
    id: "2018",
    title: "Primer Parcial — 13 d'abril de 2018",
    tag: "ANTIC",
    format: "Test 5 preguntes, 4 opcions (+0.6 / −0.2) + 3 problemes. 2 hores, sense calculadora.",
    test: [
      { q: "Els punts d'inflexió de $f(x)=x^4-8x^3-12$ són:", options: ["$x=4$ i $x=0$", "$x=0$ i $x=12$", "$x=-4$ i $x=4$", "No hi ha punts d'inflexió"], correct: 0, exp: "$f''=12x^2-48x=12x(x-4)$, canvia de signe a $0$ i a $4$." },
      { q: "La derivada de $f(x)=\\ln(x^2+\\sqrt x)$ és:", options: ["$\\dfrac{4x\\sqrt x+1}{2x^2\\sqrt x+2x}$", "$\\dfrac{1}{x^2+\\sqrt x}$", "$\\dfrac{1}{2x^2\\sqrt x+2x^2}$", "$\\dfrac{4x\\sqrt x+1}{x^2+\\sqrt x}$"], correct: 0, exp: "$f'=\\frac{2x+\\frac{1}{2\\sqrt x}}{x^2+\\sqrt x}$; multiplicant dalt i baix per $2\\sqrt x$: $\\frac{4x\\sqrt x+1}{2x^2\\sqrt x+2x}$." },
      { q: "$f$ té derivades contínues amb $f'(1)=f''(1)=0$, $f'''(1)=-2$. Llavors:", options: ["$f$ té un punt d'inflexió en $x=1$", "$f$ té un mínim relatiu en $x=1$", "$f$ té un màxim relatiu en $x=1$", "$f$ no té un punt crític en $x=1$"], correct: 0, exp: "La primera derivada no nul·la a partir de la segona és d'ordre senar (3): punt d'inflexió." },
      { q: "$\\displaystyle\\lim_{x\\to0}\\frac{\\ln(x^4+1)}{x^3}$ val:", options: ["$0$", "$-\\frac43$", "$\\frac43$", "$1$"], correct: 0, exp: "$\\ln(1+x^4)\\sim x^4$, i $\\frac{x^4}{x^3}=x\\to0$." },
      { q: "La recta tangent a $f(x)=\\ln x$ en el punt $(e,1)$ és:", options: ["$y=\\frac1e x$", "$y=\\frac1e(x-e)$", "$y=\\frac1e x+1-e$", "$y=\\frac1e(x-1)+e$"], correct: 0, exp: "$f'(e)=\\frac1e$: $y-1=\\frac1e(x-e)\\iff y=\\frac xe$." }
    ],
    problems: [
      {
        title: "Problemes 1–3",
        parts: [
          { q: "P1 (4 punts) $f(x)=\\dfrac{1}{x^2-2x}$: creixement, extrems, convexitat, asímptotes i esbós.", sol: "Domini $\\mathbb{R}\\setminus\\{0,2\\}$. $f'=\\frac{-(2x-2)}{(x^2-2x)^2}$: creixent a $(-\\infty,0)\\cup(0,1)$, decreixent a $(1,2)\\cup(2,\\infty)$; màxim relatiu $(1,-1)$. $f''=\\frac{2(3x^2-6x+4)}{(x^2-2x)^3}$, numerador sempre $>0$: convexa a $(-\\infty,0)\\cup(2,\\infty)$, còncava a $(0,2)$. AV $x=0$, $x=2$; AH $y=0$.<div class='plot' data-f='1/(x^2-2*x)' data-xr='-3,5' data-yr='-5,5' data-va='0,2' data-lines='0' data-pts='1,-1'></div>" },
          { q: "P2 (1.5 punts) $\\displaystyle\\lim_{x\\to0}(1-\\cos x)^{x^2}$.", sol: "$0^0$: $e^{\\lim x^2\\ln(1-\\cos x)}$. Com $1-\\cos x\\sim\\frac{x^2}{2}$, l'exponent és $\\sim x^2\\ln\\frac{x^2}{2}\\to0$ (perquè $t\\ln t\\to0$). Resultat: $e^0=1$." }
        ]
      }
    ]
  }
];

/* ---------- Banc de preguntes de test en FORMAT 2025 (5 opcions) ---------- */
const EXAM_TEST_BANK = [
  // Reals 2025 (la 3 corregida)
  { src: "Parcial 2025", q: REAL_EXAMS[0].test[0].q, options: REAL_EXAMS[0].test[0].options, correct: 4, exp: REAL_EXAMS[0].test[0].exp },
  { src: "Parcial 2025", q: REAL_EXAMS[0].test[1].q, options: REAL_EXAMS[0].test[1].options, correct: 1, exp: REAL_EXAMS[0].test[1].exp },
  { src: "Parcial 2025 (corregida)", q: "Polinomi d'interpolació que passa per $(1,2),\\ (2,3),\\ (4,7)$:", options: ["$P(x)=1+x$", "$P(x)=2+(x-1)$", "$P(x)=2x-1$", "$P(x)=\\frac13x^2+\\frac53$", "$P(x)=1+2x+x^2$"], correct: 3, exp: "$f[1,2]=1$, $f[2,4]=2$, $f[1,2,4]=\\frac13$: $P=2+(x-1)+\\frac13(x-1)(x-2)=\\frac{x^2}{3}+\\frac53$. (A l'examen real cap opció era correcta.)" },
  { src: "Parcial 2025", q: REAL_EXAMS[0].test[3].q, options: REAL_EXAMS[0].test[3].options, correct: 4, exp: REAL_EXAMS[0].test[3].exp },
  { src: "Parcial 2025", q: REAL_EXAMS[0].test[4].q, options: REAL_EXAMS[0].test[4].options, correct: 0, exp: REAL_EXAMS[0].test[4].exp },
  // Reals 2021 i 2018 amb una 5a opció afegida
  { src: "Parcial 2021", q: REAL_EXAMS[3].test[0].q, options: REAL_EXAMS[3].test[0].options.concat(["$y=\\ln2$"]), correct: 1, exp: REAL_EXAMS[3].test[0].exp },
  { src: "Parcial 2021", q: REAL_EXAMS[3].test[2].q, options: REAL_EXAMS[3].test[2].options.concat(["$x=-\\frac{8}{27}$"]), correct: 2, exp: REAL_EXAMS[3].test[2].exp },
  { src: "Parcial 2021", q: REAL_EXAMS[3].test[3].q, options: REAL_EXAMS[3].test[3].options.concat(["$0$ és un màxim relatiu"]), correct: 2, exp: REAL_EXAMS[3].test[3].exp },
  { src: "Parcial 2021", q: REAL_EXAMS[3].test[4].q, options: REAL_EXAMS[3].test[4].options.concat(["$[-2,-\\frac25]$"]), correct: 1, exp: REAL_EXAMS[3].test[4].exp },
  { src: "Parcial 2018", q: REAL_EXAMS[4].test[0].q, options: REAL_EXAMS[4].test[0].options.concat(["Només $x=4$"]), correct: 0, exp: REAL_EXAMS[4].test[0].exp },
  { src: "Parcial 2018", q: REAL_EXAMS[4].test[2].q, options: REAL_EXAMS[4].test[2].options.concat(["No es pot dir res"]), correct: 0, exp: REAL_EXAMS[4].test[2].exp },
  { src: "Parcial 2018", q: REAL_EXAMS[4].test[3].q, options: REAL_EXAMS[4].test[3].options.concat(["No existeix"]), correct: 0, exp: REAL_EXAMS[4].test[3].exp },
  { src: "Parcial 2018", q: REAL_EXAMS[4].test[4].q, options: REAL_EXAMS[4].test[4].options.concat(["$y=x-e+1$"]), correct: 0, exp: REAL_EXAMS[4].test[4].exp },
  // Noves, imitant l'estil 2025
  { src: "Estil 2025", q: "Sigui $f(x)=\\dfrac{1-\\cos x}{x^2}$ si $x\\neq0$ i $f(0)=k$. Per a quin $k$ és contínua en $0$?", options: ["$k=0$", "$k=1$", "$k=\\frac12$", "$k=2$", "No és possible"], correct: 2, exp: "$1-\\cos x\\sim\\frac{x^2}{2}$, el límit és $\\frac12$." },
  { src: "Estil 2025", q: "Sigui $f(x)=\\dfrac{200}{1+e^{-2(x-3)}}$. On té el punt d'inflexió?", options: ["$x=0$", "$x=2$", "$x=3$", "$x=100$", "No en té"], correct: 2, exp: "Logística: la inflexió és on l'exponent s'anul·la, $x=3$ (allà $f=100$, la meitat de 200)." },
  { src: "Estil 2025", q: "Polinomi d'interpolació que passa per $(0,1),\\ (1,3),\\ (2,7)$:", options: ["$1+2x$", "$x^2+x+1$", "$2x^2+1$", "$x^3+x+1$", "$3x+1$"], correct: 1, exp: "Diferències dividides: $f[0,1]=2$, $f[1,2]=4$, $f[0,1,2]=1$: $P=1+2x+x(x-1)=x^2+x+1$. Comprova: $P(2)=7$ ✓." },
  { src: "Estil 2025", q: "S'aproxima $e^{0.5}$ amb $P_3$ de $e^x$ en $a=0$. Quina és la fita més precisa (vàlida) de $|R_3(0.5)|$? (useu $e\\lt3$)", options: ["$\\lt10^{-1}$", "$\\lt10^{-2}$", "$\\lt10^{-3}$", "$\\lt10^{-4}$", "$\\lt10^{-5}$"], correct: 1, exp: "$|R_3|=\\frac{e^\\xi}{4!}(0.5)^4\\lt\\frac{3}{24\\cdot16}\\approx0.0078\\lt10^{-2}$. L'error real és $\\approx0.0029$, que NO és $\\lt10^{-3}$." },
  { src: "Estil 2025", q: "$\\displaystyle\\lim_{x\\to0}\\frac{e^{ax}-1}{\\sin(bx)}$, amb $a,b\\neq0$:", options: ["$ab$", "$\\frac ab$", "$\\frac ba$", "$1$", "$0$"], correct: 1, exp: "$e^{ax}-1\\sim ax$ i $\\sin bx\\sim bx$." },
  { src: "Estil 2025", q: "$\\displaystyle\\lim_{x\\to0}(1+ax)^{1/x}$ val:", options: ["$1$", "$e$", "$e^a$", "$a$", "$\\infty$"], correct: 2, exp: "$1^\\infty$: $e^{\\lim\\frac{\\ln(1+ax)}{x}}=e^a$." },
  { src: "Estil 2025", q: "Quantes solucions reals té $x^3+x-1=0$ a l'interval $[0,1]$?", options: ["Cap", "Exactament una", "Exactament dues", "Tres", "Infinites"], correct: 1, exp: "$f(0)=-1\\lt0$, $f(1)=1>0$ (Bolzano: almenys una) i $f'(x)=3x^2+1>0$ (estrictament creixent: com a molt una)." },
  { src: "Estil 2025", q: "El coeficient de $x^4$ del polinomi de Taylor de $\\cos(2x)$ en $a=0$ és:", options: ["$\\frac1{24}$", "$\\frac23$", "$\\frac{16}{4}$", "$-\\frac23$", "$2$"], correct: 1, exp: "$\\cos t=1-\\frac{t^2}{2}+\\frac{t^4}{24}-\\dots$ amb $t=2x$: $\\frac{16x^4}{24}=\\frac23x^4$." },
  { src: "Estil 2025", q: "L'asímptota obliqua de $f(x)=\\dfrac{2x^2+x}{x+1}$ és:", options: ["$y=2x$", "$y=2x+1$", "$y=2x-1$", "$y=x-1$", "No en té"], correct: 2, exp: "$2x^2+x=(x+1)(2x-1)+1$, així que $f(x)=2x-1+\\frac1{x+1}$." },
  { src: "Estil 2025", q: "El màxim absolut de $f(x)=x^3-3x$ a $[0,2]$ és:", options: ["$-2$", "$0$", "$2$", "$1$", "No en té"], correct: 2, exp: "Candidats: $f(0)=0$, $f(1)=-2$ (crític), $f(2)=2$. Màxim $2$ (a $x=2$), mínim $-2$." },
  { src: "Estil 2025", q: "Mètode de Newton per a $f(x)=x^2-2$ amb $x_0=1$. Quant val $x_1$?", options: ["$1$", "$\\frac32$", "$\\frac43$", "$2$", "$\\frac{17}{12}$"], correct: 1, exp: "$x_1=x_0-\\frac{f(x_0)}{f'(x_0)}=1-\\frac{-1}{2}=\\frac32$. (I $x_2=\\frac{17}{12}$.)" },
  { src: "Estil 2025", q: "La derivada de $f(x)=x^x$ ($x>0$) és:", options: ["$x\\cdot x^{x-1}$", "$x^x\\ln x$", "$x^x(\\ln x+1)$", "$x^x$", "$\\ln x+1$"], correct: 2, exp: "$\\ln f=x\\ln x\\Rightarrow\\frac{f'}{f}=\\ln x+1$." },
  { src: "Estil 2025", q: "Per a $f(x)=x^2$ a $[0,2]$, el punt $c$ del teorema del valor mitjà és:", options: ["$c=0$", "$c=\\frac12$", "$c=1$", "$c=\\sqrt2$", "No existeix"], correct: 2, exp: "$f'(c)=\\frac{f(2)-f(0)}{2}=2\\Rightarrow2c=2\\Rightarrow c=1$." },
  { src: "Estil 2025", q: "Si $f'(a)=0$ i $f''(a)\\lt0$, llavors en $x=a$:", options: ["Hi ha un mínim relatiu", "Hi ha un màxim relatiu", "Hi ha un punt d'inflexió", "$f$ no és derivable", "No es pot dir res"], correct: 1, exp: "Criteri de la segona derivada: $f''(a)\\lt0$ (còncava) amb $f'(a)=0$ ⇒ màxim relatiu." },
  { src: "Estil 2025", q: "$\\displaystyle\\lim_{x\\to\\infty}\\left(\\frac{x+3}{x+1}\\right)^{x}$ val:", options: ["$1$", "$e$", "$e^2$", "$e^3$", "$\\infty$"], correct: 2, exp: "$1^\\infty$: $x\\ln\\frac{x+3}{x+1}=x\\ln\\left(1+\\frac{2}{x+1}\\right)\\to2$." },
  { src: "Estil 2025", q: "La solució de $x^2-3x\\lt 4$ és:", options: ["$(-1,4)$", "$(-4,1)$", "$(-\\infty,-1)\\cup(4,\\infty)$", "$(1,4)$", "$\\mathbb{R}$"], correct: 0, exp: "$x^2-3x-4=(x-4)(x+1)\\lt0\\iff -1\\lt x\\lt4$." }
];

/* ---------- Llista 4 (Hoja4) — problemes resolts ---------- */
const LLISTA4 = [
  {
    title: "1(a) $f(x)=\\dfrac{x^2+8}{x+1}$",
    sol: "$f(x)=x-1+\\frac{9}{x+1}$. AV $x=-1$, AO $y=x-1$. $f'=1-\\frac{9}{(x+1)^2}=0\\Rightarrow x=2,\\ x=-4$. Creixent a $(-\\infty,-4)\\cup(2,\\infty)$, decreixent a $(-4,-1)\\cup(-1,2)$. Màx $(-4,-8)$, mín $(2,4)$. $f''=\\frac{18}{(x+1)^3}$: còncava a $x\\lt-1$, convexa a $x>-1$, sense inflexió." +
      "<div class='plot' data-f='(x^2+8)/(x+1)' data-xr='-10,8' data-yr='-25,20' data-va='-1' data-lines='x-1' data-pts='-4,-8;2,4'></div>"
  },
  {
    title: "1(b) $f(x)=\\dfrac{x^2+12}{x-2}$",
    sol: "$f(x)=x+2+\\frac{16}{x-2}$. AV $x=2$, AO $y=x+2$. $f'=1-\\frac{16}{(x-2)^2}=0\\Rightarrow x=6,\\ x=-2$. Màx $(-2,-4)$, mín $(6,12)$. $f''=\\frac{32}{(x-2)^3}$: còncava a $x\\lt2$, convexa a $x>2$." +
      "<div class='plot' data-f='(x^2+12)/(x-2)' data-xr='-10,14' data-yr='-25,30' data-va='2' data-lines='x+2' data-pts='-2,-4;6,12'></div>"
  },
  {
    title: "1(c) $f(x)=\\dfrac{5-3x^2}{1-x^2}$",
    sol: "$f(x)=3+\\frac{2}{1-x^2}$. AV $x=\\pm1$, AH $y=3$. $f'=\\frac{4x}{(1-x^2)^2}$: decreixent a $x\\lt0$, creixent a $x>0$ (fora de $\\pm1$). Mínim relatiu $(0,5)$. $f''=\\frac{4(1+3x^2)}{(1-x^2)^3}$: convexa a $(-1,1)$, còncava a $|x|>1$. Simètrica (parell)." +
      "<div class='plot' data-f='(5-3*x^2)/(1-x^2)' data-xr='-4,4' data-yr='-8,14' data-va='-1,1' data-lines='3' data-pts='0,5'></div>"
  },
  {
    title: "1(f) $f(x)=\\dfrac{e^{-x}}{x-3}$ (molt semblant a l'examen d'Abril 2024)",
    sol: "$f'=\\frac{-e^{-x}(x-2)}{(x-3)^2}$: creixent a $(-\\infty,2)$, decreixent a $(2,3)\\cup(3,\\infty)$. Màxim relatiu $(2,-e^{-2})$. $f''=\\frac{e^{-x}((x-3)^2+2(x-3)+2)}{(x-3)^3}$ i el parèntesi és sempre $>0$: còncava a $x\\lt3$, convexa a $x>3$. AV $x=3$, AH $y=0$ a $+\\infty$." +
      "<div class='plot' data-f='exp(-x)/(x-3)' data-xr='-2,7' data-yr='-3,2' data-va='3' data-lines='0' data-pts='2,-0.1353'></div>"
  },
  {
    title: "4. Límits amb l'Hôpital",
    sol: "• $\\lim_{x\\to1}\\left(\\frac1{\\ln x}-\\frac1{x-1}\\right)=\\lim\\frac{x-1-\\ln x}{(x-1)\\ln x}\\overset{H}{=}\\lim\\frac{1-1/x}{\\ln x+1-1/x}\\overset{H}{=}\\frac{1/x^2}{1/x+1/x^2}\\to\\frac12$.<br>" +
      "• $\\lim_{x\\to0}\\frac{x}{\\arctan4x}=\\frac14$.<br>" +
      "• $\\lim_{x\\to\\infty}(xe^{1/x}-x)=\\lim\\frac{e^{1/x}-1}{1/x}=1$.<br>" +
      "• $\\lim_{x\\to0^+}(\\tan2x)^x=e^{\\lim x\\ln\\tan2x}=e^0=1$.<br>" +
      "• $\\lim_{x\\to\\infty}\\left(\\frac{x}{1+x}\\right)^x=e^{-1}$.<br>" +
      "• $\\lim_{x\\to\\pi/2}\\frac{\\tan x}{\\sec^2x}=\\lim\\sin x\\cos x=0$.<br>" +
      "• $\\lim_{x\\to0}\\frac{1-\\cos x}{x\\tan x}=\\frac12$."
  },
  {
    title: "5. Límits exponencials ($0^0$, $\\infty^0$, $1^\\infty$)",
    sol: "(a) $\\lim_{x\\to0^+}x^{2x}=e^{\\lim2x\\ln x}=e^0=1$.<br>(b) $\\lim_{x\\to\\infty}x^{1/x}=e^{\\lim\\frac{\\ln x}{x}}=1$.<br>(c) $\\lim_{x\\to0^+}x^{\\sin x}=e^{\\lim\\sin x\\ln x}=1$.<br>" +
      "(d) $\\lim_{x\\to\\infty}\\left(\\frac{1+5x}{3+5x}\\right)^{2x-1}=e^{\\lim(2x-1)\\cdot\\frac{-2}{3+5x}}=e^{-4/5}$.<br>" +
      "(e) $\\lim_{x\\to0^+}(1+\\sin4x)^{\\cot x}=e^{\\lim\\frac{\\ln(1+\\sin4x)}{\\tan x}}=e^4$.<br>" +
      "(f) $\\lim_{x\\to1}(2-x)^{\\tan(\\pi x/2)}=e^{\\lim\\frac{\\ln(2-x)}{\\cot(\\pi x/2)}}\\overset{H}{=}e^{\\lim\\frac{-1/(2-x)}{-\\frac\\pi2\\csc^2(\\pi x/2)}}=e^{2/\\pi}$."
  },
  {
    title: "6. Per a quins $a$ i $b$: $\\displaystyle\\lim_{x\\to0}\\left(\\frac{\\sin2x}{x^3}+a+\\frac{b}{x^2}\\right)=0$?",
    sol: "Taylor: $\\sin2x=2x-\\frac{8x^3}{6}+O(x^5)$, així que $\\frac{\\sin2x}{x^3}=\\frac{2}{x^2}-\\frac43+O(x^2)$. L'expressió és $\\frac{2+b}{x^2}+a-\\frac43+O(x^2)$. Cal $b=-2$ (si no, divergeix) i $a=\\frac43$."
  }
];
