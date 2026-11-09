const fs = require('fs');

const svgData = JSON.parse(fs.readFileSync('C:/Users/30433/.gemini/antigravity/brain/58eef1fb-17eb-48ac-b7f6-69a008768bb9/.system_generated/steps/145/output.txt', 'utf8'));
let template = fs.readFileSync('d:/Desktop/发薪竞品分析/shouye_template.html', 'utf8');

const svgMap = {};
svgData.svgs.forEach(s => {
  let cleanSvg = s.svg ? s.svg.replace(/<\?xml[^>]*\?>\s*/i, '').trim() : '';
  svgMap[s.id] = cleanSvg;
  svgMap[s.name] = cleanSvg;
});

const placeholderMap = {
  '@@SVG:S22#0@@': '<svg width="15" height="11" viewBox="0 0 16 12" fill="none"><path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-4.95-3.535a7 7 0 019.9 0l-1.414 1.414a5 5 0 00-7.072 0L3.05 5.965zM.222 3.136a11 11 0 0115.556 0l-1.414 1.414a9 9 0 00-12.728 0L.222 3.136z" fill="#000"/></svg>',
  '@@SVG:S6#0@@': svgMap['740:120035'] || '',
  '@@SVG:S7#0@@': svgMap['740:120048'] || '',
  '@@SVG:S7#1@@': svgMap['740:120045'] || '',
  '@@SVG:S7#2@@': '',
  '@@SVG:S11#3@@': svgMap['740:120017'] || svgMap['740:120001'] || '',
  '@@SVG:S12#2@@': svgMap['740:120482'] || '',
  '@@SVG:S12#3@@': svgMap['740:120486'] || '',
  '@@SVG:S12#4@@': svgMap['740:120487'] || '',
  '@@SVG:S13#0@@': svgMap['740:120329'] || '',
  '@@SVG:S14#0@@': svgMap['740:120299'] || '',
  '@@SVG:S16#0@@': svgMap['740:120061'] || svgMap['740:120067'] || '',
  '@@SVG:S18#0@@': svgMap['740:120320'] || '',
  '@@SVG:S19#0@@': '<svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#202536" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '@@SVG:S21#0@@': '<svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#202536" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '@@SVG:S20#0@@': '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#9497B1" stroke-width="1.5"/><path d="M9.5 9.5l3 3" stroke="#9497B1" stroke-width="1.5" stroke-linecap="round"/></svg>',
  '@@SVG:S3#0@@': svgMap['740:120138'] || '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="5" cy="10" r="1.5" fill="#6B6B86"/><circle cx="10" cy="10" r="1.5" fill="#6B6B86"/><circle cx="15" cy="10" r="1.5" fill="#6B6B86"/></svg>',
  '@@SVG:S4#0@@': svgMap['740:120138'] || '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="5" cy="10" r="1.5" fill="#6B6B86"/><circle cx="10" cy="10" r="1.5" fill="#6B6B86"/><circle cx="15" cy="10" r="1.5" fill="#6B6B86"/></svg>',
  '@@SVG:S5#1@@': svgMap['740:120128'] || '',
  '@@SVG:S5#2@@': svgMap['740:120117'] || '',
  '@@SVG:S2#1@@': svgMap['740:120394'] || '',
  '@@SVG:S2#2@@': svgMap['740:120344'] || '',
  '@@SVG:S2#3@@': svgMap['740:120427'] || ''
};

for (const [key, val] of Object.entries(placeholderMap)) {
  template = template.split(key).join(val);
}

fs.writeFileSync('d:/Desktop/发薪竞品分析/shouye.html', template, 'utf8');
console.log('Successfully wrote finalized shouye.html to disk!');
