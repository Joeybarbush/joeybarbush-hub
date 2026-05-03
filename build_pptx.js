// COM 100 Backup .pptx Builder
// Mirrors com100.html (10-slide deck, natural palette, open-source repo windows)
// Run via BUILD_PPTX.bat or:  npm install pptxgenjs && node build_pptx.js
// Output: COM100_Slides.pptx

const PptxGenJS = require('pptxgenjs');

const C = {
  paper:      'F4F1E8',
  paperWarm:  'FBF9F4',
  sage:       '5F7559',
  sageDeep:   '38483A',
  sageSoft:   '94A581',
  bronze:     'B58B4A',
  bronzeDeep: '8E6A33',
  ink:        '2D2A24',
  inkDeep:    '1A1916',
};

const FH = 'Times New Roman'; // Fraunces fallback for older PowerPoint
const FB = 'Calibri';
const FM = 'Consolas';

const pres = new PptxGenJS();
pres.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5
pres.title = 'Aiming AI at What Matters';
pres.author = 'Joey Barbush';

const W = 13.333, H = 7.5;

function num(slide, n) {
  slide.addText(`${n} / 10`, {
    x: 11.8, y: 7.05, w: 1.3, h: 0.3,
    fontFace: FM, fontSize: 9, color: '888888', align: 'right'
  });
}

function bar(slide, x, y, w = 0.7, h = 0.05) {
  slide.addShape(pres.ShapeType.rect, {
    x, y, w, h, fill: { color: C.bronze }, line: { type: 'none' }
  });
}

function source(slide, text) {
  slide.addText(text, {
    x: 7.5, y: 6.7, w: 5.5, h: 0.3,
    fontFace: FB, fontSize: 11, italic: true,
    color: C.sage, align: 'right'
  });
}

// ─── 1. TITLE ─────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.inkDeep };
  bar(s, 0.7, 1.2);
  s.addText('Aiming AI\nat What Matters', {
    x: 0.7, y: 1.4, w: 12, h: 3.2,
    fontFace: FH, fontSize: 68, bold: true,
    color: C.paper, valign: 'top'
  });
  s.addText('How we point the most powerful technology\never built at people and the planet.', {
    x: 0.7, y: 4.6, w: 11, h: 1.3,
    fontFace: FH, fontSize: 26, italic: true,
    color: C.sageSoft
  });
  s.addText('JOEY BARBUSH . COM 100 . PERSUASIVE SPEECH . APRIL 2026', {
    x: 0.7, y: 6.3, w: 12, h: 0.5,
    fontFace: FM, fontSize: 12, color: C.sageSoft, charSpacing: 4
  });
  num(s, 1);
}

// ─── 2. HOOK ──────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.paper };
  s.addText('Imagine an AI that...', {
    x: 0.7, y: 0.6, w: 12, h: 1.0,
    fontFace: FH, fontSize: 44, bold: true, color: C.sageDeep
  });

  const cards = [
    { icon: '◔', text: 'Predicts a hurricane 10 days out, in under a minute.' },
    { icon: '✚', text: 'Catches a tumor a tired doctor missed.' },
    { icon: '✦', text: 'Finds a battery material that makes clean energy cheap for everyone.' },
  ];
  const cardW = 3.7, gap = 0.4;
  const startX = (W - (cardW * 3 + gap * 2)) / 2;
  cards.forEach((c, i) => {
    const x = startX + i * (cardW + gap);
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.3, w: cardW, h: 2.8,
      fill: { color: C.paperWarm }, line: { color: 'D5CFC0', width: 1 },
      rectRadius: 0.08
    });
    s.addText(c.icon, {
      x: x + 0.3, y: 2.55, w: cardW - 0.6, h: 0.7,
      fontFace: FB, fontSize: 36, color: C.sage
    });
    s.addText(c.text, {
      x: x + 0.3, y: 3.4, w: cardW - 0.6, h: 1.5,
      fontFace: FH, fontSize: 17, italic: true, color: C.ink
    });
  });

  s.addText([
    { text: 'Not science fiction. ', options: { color: C.sageDeep, bold: true } },
    { text: 'Already exists.',        options: { color: C.bronzeDeep, bold: true } },
  ], {
    x: 0.7, y: 5.6, w: 12, h: 0.8,
    fontFace: FH, fontSize: 28
  });
  num(s, 2);
}

// ─── 3. TECH READY ───────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.paper };
  s.addText('The technology already works.', {
    x: 0.7, y: 0.6, w: 12, h: 1.0,
    fontFace: FH, fontSize: 40, bold: true, color: C.sageDeep
  });

  s.addText('10 days', {
    x: 0.7, y: 2.2, w: 6, h: 1.6,
    fontFace: FH, fontSize: 80, bold: true, color: C.sageDeep
  });
  s.addText('ACCURATE FORECAST IN UNDER A MINUTE', {
    x: 0.7, y: 3.7, w: 6, h: 0.5,
    fontFace: FM, fontSize: 11, charSpacing: 4, color: C.sageDeep
  });
  s.addText([
    { text: "Google's ", options: {} },
    { text: 'GraphCast',  options: { bold: true } },
    { text: ' beats traditional weather forecasting. Exactly what we need for stronger storms.', options: {} },
  ], {
    x: 0.7, y: 4.4, w: 6, h: 1.6,
    fontFace: FB, fontSize: 16, color: C.ink
  });

  s.addText('2.2M', {
    x: 7.0, y: 2.2, w: 5.6, h: 1.6,
    fontFace: FH, fontSize: 80, bold: true, color: C.sageDeep
  });
  s.addText('NEW CRYSTAL STRUCTURES DISCOVERED', {
    x: 7.0, y: 3.7, w: 5.6, h: 0.5,
    fontFace: FM, fontSize: 11, charSpacing: 4, color: C.sageDeep
  });
  s.addText([
    { text: "Google's ", options: {} },
    { text: 'GNoME',      options: { bold: true } },
    { text: ' unlocks materials for better batteries, cleaner energy storage, and solar at scale.', options: {} },
  ], {
    x: 7.0, y: 4.4, w: 5.6, h: 1.6,
    fontFace: FB, fontSize: 16, color: C.ink
  });

  source(s, 'Stanford HAI . 2024 AI Index Report');
  num(s, 3);
}

// ─── 4. 90% ──────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.sageDeep };

  s.addText('90%', {
    x: 0.5, y: 1.6, w: 5.8, h: 4.5,
    fontFace: FH, fontSize: 220, bold: true, color: C.bronze,
    align: 'center', valign: 'middle'
  });
  s.addText('of the most influential AI models in 2024 came from private companies.', {
    x: 6.5, y: 2.2, w: 6.3, h: 2.4,
    fontFace: FH, fontSize: 28, bold: true, color: C.paper, valign: 'top'
  });
  s.addText('Companies whose primary obligation is to investors. Not to solve the world\'s problems.', {
    x: 6.5, y: 4.4, w: 6.3, h: 1.4,
    fontFace: FB, fontSize: 17, color: C.paper, valign: 'top'
  });
  s.addText('Up from roughly 60% the year before.', {
    x: 6.5, y: 5.7, w: 6.3, h: 0.5,
    fontFace: FB, fontSize: 14, italic: true, color: C.sageSoft
  });

  source(s, 'Stanford HAI . 2024 AI Index Report');
  num(s, 4);
}

// ─── 5. WHY ──────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.paper };
  s.addText('Why is this happening?', {
    x: 0.7, y: 0.6, w: 12, h: 1.0,
    fontFace: FH, fontSize: 40, bold: true, color: C.sageDeep
  });

  const rows = [
    ['Not talent.', 'The best engineers in the world are American.'],
    ['Incentives.', 'Companies answer to investors, so they build what makes money fast.'],
    ['Result.',     'AI gets pointed at ads, engagement, content. Not at curing diseases or fixing the climate.'],
  ];
  rows.forEach(([head, body], i) => {
    s.addText([
      { text: head + '  ', options: { bold: true, color: C.sageDeep } },
      { text: body,         options: { color: C.ink } },
    ], {
      x: 0.7, y: 2.0 + i * 1.3, w: 12, h: 1.2,
      fontFace: FB, fontSize: 22
    });
  });

  source(s, 'Ahmed, Wahed, Thompson . Science (2023) . NITRD AI R&D 2024');
  num(s, 5);
}

// ─── 6. NASA PRECEDENT ──────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.sageDeep };
  s.addText('We have done this before.', {
    x: 0.7, y: 0.5, w: 12, h: 1.0,
    fontFace: FH, fontSize: 38, bold: true, color: C.bronze
  });

  s.addText('$257B', {
    x: 0.5, y: 2.2, w: 5.5, h: 2,
    fontFace: FH, fontSize: 110, bold: true, color: C.bronze, align: 'center'
  });
  s.addText('APOLLO PROGRAM IN 2023 DOLLARS', {
    x: 0.5, y: 4.1, w: 5.5, h: 0.5,
    fontFace: FM, fontSize: 11, charSpacing: 4, color: C.sageSoft, align: 'center'
  });

  s.addText('What public investment built:', {
    x: 6.5, y: 2.2, w: 6, h: 0.7,
    fontFace: FH, fontSize: 22, bold: true, color: C.paper
  });
  ['GPS', 'Satellite communications', 'Modern medical imaging', 'The technology economy itself'].forEach((t, i) => {
    s.addText('→  ' + t, {
      x: 6.5, y: 3.0 + i * 0.55, w: 6, h: 0.5,
      fontFace: FB, fontSize: 18, color: C.paper
    });
  });

  s.addText('"When America decides something matters, we fund it."', {
    x: 0.7, y: 5.6, w: 12, h: 0.7,
    fontFace: FH, fontSize: 22, italic: true, color: C.sageSoft
  });
  source(s, 'Dreier . Space Policy (2022) . CHIPS & Science Act, CRS (2023)');
  num(s, 6);
}

// ─── 7. PILLARS ─────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.paper };
  s.addText('What public AI investment could fund.', {
    x: 0.7, y: 0.5, w: 12, h: 1.0,
    fontFace: FH, fontSize: 36, bold: true, color: C.sageDeep
  });
  s.addText('A National AI Research Trust. NASA-modeled. Around 50 billion per year.', {
    x: 0.7, y: 1.4, w: 12, h: 0.5,
    fontFace: FH, fontSize: 18, italic: true, color: C.sage
  });

  const pillars = [
    'Climate modeling and clean energy',
    'Healthcare and affordable medicine',
    'Accessibility tools for disabilities',
    'Food and water security',
    'AI for under-resourced schools',
    'Mental health support tools',
  ];
  pillars.forEach((p, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.7 + col * 6.3, y = 2.4 + row * 1.4;
    s.addShape(pres.ShapeType.ellipse, {
      x, y, w: 0.7, h: 0.7,
      fill: { color: C.paperWarm }, line: { color: C.sage, width: 1.5 }
    });
    s.addText('○', {
      x, y: y + 0.05, w: 0.7, h: 0.6,
      fontFace: FB, fontSize: 18, color: C.sage, align: 'center'
    });
    s.addText(p, {
      x: x + 0.95, y, w: 5.3, h: 0.9,
      fontFace: FB, fontSize: 18, color: C.ink, valign: 'middle'
    });
  });
  num(s, 7);
}

// ─── 8. OPEN SOURCE WINDOWS ─────────────
{
  const s = pres.addSlide();
  s.background = { color: C.paper };
  s.addText("You don't have to wait. Fork it today.", {
    x: 0.7, y: 0.5, w: 12, h: 1.0,
    fontFace: FH, fontSize: 32, bold: true, color: C.sageDeep
  });
  s.addText('Real open-source projects. Real GitHub repos. Real contribution paths.', {
    x: 0.7, y: 1.35, w: 12, h: 0.5,
    fontFace: FH, fontSize: 16, italic: true, color: C.sage
  });

  const repos = [
    {
      url: 'github.com/google-deepmind/graphcast',
      name: 'google-deepmind / graphcast',
      what: '10-day weather forecasting AI',
      meta: 'The model from slide 3. Apache 2.0 licensed.'
    },
    {
      url: 'github.com/Project-MONAI/MONAI',
      name: 'Project-MONAI / MONAI',
      what: 'Medical imaging deep-learning framework',
      meta: 'Used by hospitals worldwide for tumor detection.'
    },
    {
      url: 'github.com/OpenMined/PySyft',
      name: 'OpenMined / PySyft',
      what: 'Privacy-preserving AI for sensitive data',
      meta: 'Train on healthcare data without ever seeing it.'
    },
    {
      url: 'github.com/google-deepmind/alphafold',
      name: 'google-deepmind / alphafold',
      what: 'Protein structure prediction for drug discovery',
      meta: '200M+ structures. Drives modern drug discovery.'
    },
  ];
  const repoW = 5.9, repoH = 2.35, gapX = 0.4, gapY = 0.3;
  repos.forEach((r, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.7 + col * (repoW + gapX);
    const y = 2.05 + row * (repoH + gapY);
    // window chrome bar
    s.addShape(pres.ShapeType.rect, {
      x, y, w: repoW, h: 0.32,
      fill: { color: 'E8E3D5' }, line: { color: 'D5CFC0', width: 0.5 }
    });
    // dots
    ['E36854','E8B23A','5DA75A'].forEach((color, di) => {
      s.addShape(pres.ShapeType.ellipse, {
        x: x + 0.10 + di * 0.15, y: y + 0.10, w: 0.12, h: 0.12,
        fill: { color }, line: { type: 'none' }
      });
    });
    // url
    s.addText(r.url, {
      x: x + 0.65, y: y + 0.04, w: repoW - 0.75, h: 0.24,
      fontFace: FM, fontSize: 9, color: C.sageDeep
    });
    // body box
    s.addShape(pres.ShapeType.rect, {
      x, y: y + 0.32, w: repoW, h: repoH - 0.32,
      fill: { color: C.paperWarm }, line: { color: 'D5CFC0', width: 0.5 }
    });
    // name
    s.addText(r.name, {
      x: x + 0.18, y: y + 0.4, w: repoW - 0.36, h: 0.32,
      fontFace: FM, fontSize: 11, color: C.bronzeDeep, bold: true
    });
    // what
    s.addText(r.what, {
      x: x + 0.18, y: y + 0.78, w: repoW - 0.36, h: 0.5,
      fontFace: FH, fontSize: 17, bold: true, color: C.ink
    });
    // meta
    s.addText(r.meta, {
      x: x + 0.18, y: y + 1.32, w: repoW - 0.36, h: 0.6,
      fontFace: FB, fontSize: 12, color: C.ink
    });
  });

  num(s, 8);
}

// ─── 9. CTA ─────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.paper };
  s.addText('What you can do.', {
    x: 0.7, y: 0.6, w: 12, h: 1.0,
    fontFace: FH, fontSize: 40, bold: true, color: C.sageDeep
  });
  s.addText('You are the next generation that builds this technology.', {
    x: 0.7, y: 1.7, w: 12, h: 0.7,
    fontFace: FH, fontSize: 22, italic: true, color: C.sage
  });

  const ctas = [
    'Build a class project that helps disabled classmates access learning materials.',
    'Contribute to an open-source healthcare or climate AI project.',
    'Choose a major or career that points your skills at problems worth solving.',
    'Use AI for the things that count, starting today.',
  ];
  ctas.forEach((c, i) => {
    s.addText('→', {
      x: 0.7, y: 2.7 + i * 0.95, w: 0.6, h: 0.7,
      fontFace: FB, fontSize: 26, bold: true, color: C.bronze
    });
    s.addText(c, {
      x: 1.4, y: 2.7 + i * 0.95, w: 11, h: 0.9,
      fontFace: FB, fontSize: 19, color: C.ink, valign: 'top'
    });
  });
  num(s, 9);
}

// ─── 10. CLOSE ──────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.inkDeep };
  bar(s, 0.7, 1.2);

  s.addText([
    { text: 'We ',                options: { color: C.paper } },
    { text: 'fund it.',           options: { color: C.bronze } },
    { text: '\nWe ',              options: { color: C.paper } },
    { text: 'build it.',          options: { color: C.bronze } },
    { text: '\nWe use it to ',    options: { color: C.paper } },
    { text: 'lift people up.',    options: { color: C.bronze } },
  ], {
    x: 0.7, y: 1.5, w: 12, h: 3.6,
    fontFace: FH, fontSize: 56, bold: true, valign: 'top'
  });

  s.addText('The next generation that does that, is sitting in this room.', {
    x: 0.7, y: 5.4, w: 12, h: 0.7,
    fontFace: FH, fontSize: 22, italic: true, color: C.sageSoft
  });
  s.addText('Thank you.', {
    x: 0.7, y: 6.2, w: 12, h: 0.7,
    fontFace: FB, fontSize: 20, color: C.paper
  });
  num(s, 10);
}

// ─── WRITE ──────────────────────────────
pres.writeFile({ fileName: 'COM100_Slides.pptx' }).then(name => {
  console.log('+ wrote ' + name);
}).catch(err => {
  console.error('build failed:', err);
  process.exit(1);
});
