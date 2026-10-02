# PAGE_TOPOLOGY

Ordem (topo → base), modelo de interação entre colchetes.

0. Overlays globais: Grain [static], Cursor dot+ring [mouse-driven], ScrollProgress [scroll-driven]
1. Nav fixa z220 [scroll-driven: is-scrolled; click: menu mobile]
2. HeroWrap (1.8vh) > Hero sticky [load timeline GSAP + scroll parallax/fade]
3. Marquee A (skills) [time-driven CSS]
4. Stats (3 cards, contadores) [scroll-triggered GSAP]
5. Work: PinWrap > PinStage sticky > PinHead + Htrack (3 hcards 100vw) + PinHint [scroll-driven, translateX]
6. Marquee B (clientes) [time-driven CSS]
7. Experience: StackWrap > StackStage sticky > StackHead + StackArea (3 cards) [scroll-driven, empilha com scale]
8. CtaBand (ghost word, 3 linhas, e-mail, links) [fade-up scroll-triggered]
9. Footer [static]

Camadas z: grain 9000 > cursor 9999/9998 > progress 300 > nav 220 > marquee/stats 5 > hero-inner 3.
Mobile (≤900): work/experience em fluxo vertical.
