// Chuyển fragment HTML của template Printop sang JSX, giữ nguyên 100% tên class.
// Dùng cho bước "port giao diện" — không đụng tới nội dung.
import fs from 'node:fs';

const VOID = new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
const BOOL = new Set(['checked','disabled','selected','required','readonly','autoplay','controls','loop','muted','multiple','novalidate','open','playsinline','autofocus','default','reversed','async','defer','itemscope','allowfullscreen','formnovalidate','ismap','nomodule','scoped','hidden']);
const ATTR = {
  class:'className', for:'htmlFor', tabindex:'tabIndex', colspan:'colSpan', rowspan:'rowSpan',
  maxlength:'maxLength', minlength:'minLength', readonly:'readOnly', srcset:'srcSet',
  frameborder:'frameBorder', allowfullscreen:'allowFullScreen', autocomplete:'autoComplete',
  novalidate:'noValidate', enctype:'encType', crossorigin:'crossOrigin', datetime:'dateTime',
  contenteditable:'contentEditable', spellcheck:'spellCheck', usemap:'useMap', accesskey:'accessKey',
  autofocus:'autoFocus', playsinline:'playsInline', cellpadding:'cellPadding', cellspacing:'cellSpacing',
  'http-equiv':'httpEquiv', charset:'charSet', srclang:'srcLang', marginwidth:'marginWidth',
  marginheight:'marginHeight', formaction:'formAction', inputmode:'inputMode',
};

// Bản đồ URL: file .html của template -> route tiếng Việt của site mới
const ROUTES = {
  'index.html':'/', 'index-2.html':'/', 'index-3.html':'/', 'index-4.html':'/',
  'about.html':'/gioi-thieu',
  'service.html':'/dich-vu', 'service-details.html':'/dich-vu/in-offset',
  'shop.html':'/san-pham', 'shop-new.html':'/san-pham',
  'shop-details.html':'/san-pham', 'shop-details-new.html':'/san-pham',
  'cart.html':'/gio-hang', 'checkout.html':'/bao-gia',
  'blog.html':'/tin-tuc', 'blog-details.html':'/tin-tuc',
  'contact.html':'/lien-he', 'faq.html':'/cau-hoi-thuong-gap',
  'pricing-plan.html':'/bang-gia', 'team.html':'/doi-ngu',
};

function mapHref(v) {
  if (!v) return v;
  const [path, hash=''] = v.split('#');
  const clean = path.replace(/^\.\//, '');
  if (ROUTES[clean] !== undefined) return ROUTES[clean] + (hash ? '#'+hash : '');
  if (clean.startsWith('assets/')) return '/' + clean;
  return v;
}

function styleToObject(s) {
  const out = [];
  for (const decl of s.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    let prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop || !val) continue;
    const key = prop.startsWith('--') ? `'${prop}'` : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out.push(`${key}: ${JSON.stringify(val)}`);
  }
  return `{{ ${out.join(', ')} }}`;
}

function convertAttrs(raw) {
  const out = [];
  const re = /([:@a-zA-Z_][-:.\w]*)\s*(?:=\s*("([^"]*)"|'([^']*)'|[^\s"'>]+))?/g;
  let m;
  while ((m = re.exec(raw))) {
    const name = m[1];
    const hasVal = m[2] !== undefined;
    let val = m[3] !== undefined ? m[3] : (m[4] !== undefined ? m[4] : m[2]);
    const lower = name.toLowerCase();
    if (lower === 'style' && hasVal) { out.push(`style=${styleToObject(val)}`); continue; }
    if ((lower === 'href' || lower === 'action') && hasVal) val = mapHref(val);
    if (lower === 'src' && hasVal && val.startsWith('assets/')) val = '/' + val;
    if (lower === 'data-background-image' && hasVal && val.startsWith('assets/')) val = '/' + val;
    if (!hasVal) { out.push(BOOL.has(lower) ? `${ATTR[lower] || lower}={true}` : `${ATTR[lower] || lower}=""`); continue; }
    const jsxName = ATTR[lower] || (lower.startsWith('data-') || lower.startsWith('aria-') ? lower : name);
    out.push(`${jsxName}=${JSON.stringify(val)}`);
  }
  return out.length ? ' ' + out.join(' ') : '';
}

function escapeText(t) {
  return t.replace(/[{}]/g, (c) => `{'${c}'}`);
}

export function html2jsx(html, { linkify = true } = {}) {
  let out = '';
  let i = 0;
  const openStack = [];
  while (i < html.length) {
    const lt = html.indexOf('<', i);
    if (lt < 0) { out += escapeText(html.slice(i)); break; }
    out += escapeText(html.slice(i, lt));
    if (html.startsWith('<!--', lt)) {
      const end = html.indexOf('-->', lt);
      i = end < 0 ? html.length : end + 3;
      continue;
    }
    const gt = html.indexOf('>', lt);
    if (gt < 0) { out += escapeText(html.slice(lt)); break; }
    let tag = html.slice(lt + 1, gt);
    const selfClosed = tag.endsWith('/');
    if (selfClosed) tag = tag.slice(0, -1);
    if (tag.startsWith('/')) {
      const name = tag.slice(1).trim().toLowerCase();
      const opened = openStack.pop();
      out += `</${opened === 'Link' && name === 'a' ? 'Link' : name}>`;
      i = gt + 1;
      continue;
    }
    const sp = tag.search(/[\s]/);
    const name = (sp < 0 ? tag : tag.slice(0, sp)).toLowerCase();
    const rawAttrs = sp < 0 ? '' : tag.slice(sp);
    let attrs = convertAttrs(rawAttrs);
    let elName = name;
    if (linkify && name === 'a') {
      const hrefMatch = attrs.match(/ href="([^"]*)"/);
      const href = hrefMatch ? hrefMatch[1] : '';
      if (href.startsWith('/') && !href.startsWith('//')) elName = 'Link';
    }
    if (VOID.has(name) || selfClosed) { out += `<${elName}${attrs} />`; }
    else { out += `<${elName}${attrs}>`; openStack.push(elName); }
    i = gt + 1;
  }
  return out;
}

if (process.argv[2]) {
  const src = fs.readFileSync(process.argv[2], 'utf8');
  const res = html2jsx(src);
  if (process.argv[3]) fs.writeFileSync(process.argv[3], res);
  else process.stdout.write(res);
}
