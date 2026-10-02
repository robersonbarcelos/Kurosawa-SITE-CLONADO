# BEHAVIORS — rafaelkurosawa.com (extraído via DOM/CSSOM, 1009px viewport)

Stack original: vanilla JS (scroll engine por matemática de scroll) + GSAP/ScrollTrigger (revelações). Sem Lenis. Scroll nativo.

## Scroll engine (rAF-throttled, passive listener)
- **Nav**: `.is-scrolled` quando scrollY > 50 → bg rgba(6,6,6,.92), blur(12px), border-bottom #1a1a1a. Transição 0.4s.
- **Progress bar**: fixed top, 2px, fill #F5C518 `scaleX(scrollY / (docH - vh))`, origin left.
- **Hero** (desktop > 900px): wrapper altura 1.8×vh, `.hero` sticky top:0 height 100vh.
  - `hp = clamp((y - heroTop)/vh, 0, 1)`
  - `.hero-bg` translateY((y-heroTop)*0.18)
  - `.hero-inner` translateY(-(y-heroTop)*0.09)
  - `[data-hero-fade]` opacity = clamp(1 - hp*3.2, 0, 1)
- **Work (trilho horizontal pinado)**: `.pin-wrap` altura = vh*N + vh + vh*0.35 (N = nº cards). `.pin-stage` sticky 100vh. `.htrack` translateX(-p*(scrollWidth - vw)), p = into/runway. Card ativo = round(p*(N-1)) → `.on`; atualiza dots (`.pin-dots i.on` 26px de largura) e contador "01 / 03". `.pin-hint` visível só se p < 0.04.
- **Experience (cards empilhados)**: `.stack-wrap` altura = vh*((n-1)+0.35) + vh + vh*0.55. Para cada item i: raw=(sInto - i*vh)/vh.
  - raw <= -0.02 → translateY(105%), opacity 0
  - prog<0.35 → entra: e=outExpo(prog/0.35); translateY((1-e)*100%), opacity clamp(prog*4)
  - senão → atrás: behind=max(0, sInto/vh - i - 0.35); scale=max(.86, 1-behind*.05); translateY(-behind*30px)
  - item ativo = floor(sInto/vh) → `.on` (borda #222, número amarelo)
- **≤900px**: tudo vira fluxo normal (pin/stack desativados, cards `.on`).

## GSAP
- Body fade-in 0.45s. Hero load-in: kicker/name yPercent 110→0 (power4.out, 0.8/1s), tag/blurb/actions y:22 stagger .08, status/place/scroll fade.
- `[data-split]`: palavras em máscara `.reveal-line` yPercent 120→0, 0.9s, stagger .03, power4.out, start "top 88%".
- `.fade-up`: opacity 0/y 24 → 1/0, 0.85s power3.out, delay (i%3)*.06, start "top 90%".
- Contadores `[data-value]`: 0→alvo em 1s power2.out, once, start "top 92%".
- Botões `.btn`: magnético (quickTo x/y, fator .28, 0.4s power3.out).
- `.hero-rule`: scaleY 0→1 em 1.2s (ease .16,1,.3,1) delay .1s ao carregar.

## Cursor customizado (hover:hover + pointer:fine)
- Dot 9px #F5C518 mix-blend difference segue o mouse direto; ring 36px borda rgba(245,197,24,.35) com lerp .12.
- Sobre a/button/.case-gallery: dot 16px, ring 56px borda .6 alpha.

## CSS animations
- `marquee` 34s linear infinite translateX 0 → -50%, pausa no hover. Duas faixas amarelas (#F5C518): skills e clientes.
- `pulse` 2s infinite no dot verde (opacity 1 → .35).

## Hover
- .btn-primary opacity .85; .btn-ghost color+border → amarelo; nav links → amarelo; .hcard:hover .hcard-go i fundo amarelo, texto preto; .cta-mail e .cta-links a → amarelo.
- `.hcard.on .hcard-device` translateY(-10px); `.hcard.on .hcard-accent` height 100%; `.hcard.on .hcard-num` stroke #2b2b2b.

## Mobile nav (≤860px)
- Hambúrguer 3 barras → X; painel full-screen rgba(0,0,0,.97) blur 8px, fade .38s; Esc/resize fecham; trava scroll do body.

## Grain
- Overlay fixed, opacity .045, SVG feTurbulence 200px, z 9000.

## Breakpoints: 1024, 900 (pin/stack off), 860 (nav mobile, stats 1 col), 560.
